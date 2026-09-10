import { prisma, AttendanceSummary } from '../models';

export class SummaryService {
  static async recalculateStudentSummary(
    student_id: string,
    course_code: string
  ): Promise<AttendanceSummary> {
    // 1. Get total sessions for the course
    const totalSessions = await prisma.courseSession.count({
      where: { course_code },
    });

    // 2. Get attended sessions (PRESENT or LATE)
    const attendedEvents = await prisma.attendanceEvent.count({
      where: {
        student_id,
        session: { course_code },
        status: { in: ['PRESENT', 'LATE'] },
      },
    });

    // 3. Compute percentage
    const percentage =
      totalSessions > 0
        ? parseFloat(((attendedEvents / totalSessions) * 100).toFixed(2))
        : 0.0;

    // 4. Upsert summary record
    return prisma.attendanceSummary.upsert({
      where: {
        student_id_course_code: {
          student_id,
          course_code,
        },
      },
      update: {
        total_sessions: totalSessions,
        attended_sessions: attendedEvents,
        percentage,
      },
      create: {
        student_id,
        course_code,
        total_sessions: totalSessions,
        attended_sessions: attendedEvents,
        percentage,
      },
    });
  }

  static async getSummaries(student_id?: string, course_code?: string): Promise<AttendanceSummary[]> {
    const whereClause: Record<string, any> = {};
    if (student_id) whereClause.student_id = student_id;
    if (course_code) whereClause.course_code = course_code;

    return prisma.attendanceSummary.findMany({
      where: whereClause,
      include: {
        student: {
          select: { name: true, email: true },
        },
      },
    });
  }

  static async getStudentSummaryWithShortage(student_id: string) {
    const summaries = await prisma.attendanceSummary.findMany({
      where: { student_id },
      include: {
        student: { select: { name: true, email: true } },
      },
    });

    return summaries.map((s) => {
      const shortage_count = Math.max(0, s.total_sessions - s.attended_sessions);
      const target75 = Math.ceil(s.total_sessions * 0.75);
      const shortage_for_75_percent = Math.max(0, target75 - s.attended_sessions);

      return {
        id: s.id,
        student_id: s.student_id,
        course_code: s.course_code,
        total_sessions: s.total_sessions,
        attended_sessions: s.attended_sessions,
        percentage: s.percentage,
        shortage_count,
        shortage_for_75_percent,
        updated_at: s.updated_at,
        student: s.student,
      };
    });
  }
}
