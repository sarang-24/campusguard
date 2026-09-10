import { prisma, AttendanceEvent } from '../models';
import { IngestAttendanceDTO } from '../validation/attendanceValidation';
import { SummaryService } from '../services/summaryService';

export class AttendanceIngestor {
  static async processIngestion(payload: IngestAttendanceDTO): Promise<AttendanceEvent> {
    const { student_id, session_id, source } = payload;
    const timestamp = payload.timestamp ? new Date(payload.timestamp) : new Date();

    // 1. Verify Student Exists
    const student = await prisma.student.findUnique({
      where: { student_id },
    });
    if (!student) {
      throw new Error(`Student with ID '${student_id}' does not exist.`);
    }

    // 2. Verify Session Exists
    const session = await prisma.courseSession.findUnique({
      where: { session_id },
    });
    if (!session) {
      throw new Error(`Course session with ID '${session_id}' does not exist.`);
    }

    // 3. Determine Attendance Status if not explicitly set
    let status = payload.status;
    if (!status) {
      const scheduledTime = session.scheduled_time.getTime();
      const eventTime = timestamp.getTime();
      const minutesDiff = (eventTime - scheduledTime) / (1000 * 60);

      if (minutesDiff <= 15) {
        status = 'PRESENT';
      } else if (minutesDiff <= 45) {
        status = 'LATE';
      } else {
        status = 'FLAGGED';
      }
    }

    // 4. Duplicate Check
    const existingEvent = await prisma.attendanceEvent.findUnique({
      where: {
        student_id_session_id: {
          student_id,
          session_id,
        },
      },
    });

    if (existingEvent) {
      throw new Error(`Duplicate event detected: Attendance record already exists for student ${student_id} on session ${session_id}`);
    }

    // 5. Create Attendance Event
    const event = await prisma.attendanceEvent.create({
      data: {
        student_id,
        session_id,
        timestamp,
        source,
        status,
      },
    });

    // 6. Trigger Summary Recalculation for this student and course
    await SummaryService.recalculateStudentSummary(student_id, session.course_code);

    return event;
  }
}
