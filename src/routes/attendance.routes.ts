import { Router, Request, Response } from 'express';
import { AttendanceIngestor } from '../ingestion/attendanceIngestor';
import { AttendanceService } from '../services/attendanceService';
import { SummaryService } from '../services/summaryService';
import { StudentService } from '../services/studentService';
import { IngestAttendanceSchema, SummaryQuerySchema } from '../validation/attendanceValidation';

const router = Router();

/**
 * POST /api/v1/attendance/ingest
 * Process incoming event through validation, duplicate check, event creation, and automatic summary recalculation.
 * Returns 201 Created on success or 400 Bad Request on validation/duplicate/existence failure.
 */
router.post('/ingest', async (req: Request, res: Response) => {
  try {
    const parseResult = IngestAttendanceSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parseResult.error.errors,
      });
    }

    const event = await AttendanceIngestor.processIngestion(parseResult.data);
    return res.status(201).json({
      success: true,
      message: 'Attendance event ingested and summary recalculated successfully.',
      data: event,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Ingestion failed';
    return res.status(400).json({
      success: false,
      error: errorMessage,
    });
  }
});

/**
 * GET /api/v1/attendance/summary/:studentId
 * Return the recalculated subject-wise attendance percentage and shortage count for the given student.
 */
router.get('/summary/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const student = await StudentService.getStudentById(studentId);
    if (!student) {
      return res.status(400).json({
        success: false,
        error: `Student '${studentId}' not found`,
      });
    }

    const summaries = await SummaryService.getStudentSummaryWithShortage(studentId);
    return res.json({
      success: true,
      student_id: studentId,
      student_name: student.name,
      email: student.email,
      summaries,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/v1/attendance/summary
 * Query attendance summaries with optional student_id or course_code filter
 */
router.get('/summary', async (req: Request, res: Response) => {
  try {
    const parseResult = SummaryQuerySchema.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.errors });
    }

    const { student_id, course_code } = parseResult.data;
    const summaries = await SummaryService.getSummaries(student_id, course_code);
    return res.json({ success: true, data: summaries });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/v1/attendance/events
 * Retrieve attendance logs
 */
router.get('/events', async (req: Request, res: Response) => {
  try {
    const { student_id, session_id } = req.query;

    if (student_id) {
      const events = await AttendanceService.getEventsByStudent(student_id as string);
      return res.json({ success: true, data: events });
    }

    if (session_id) {
      const events = await AttendanceService.getEventsBySession(session_id as string);
      return res.json({ success: true, data: events });
    }

    const events = await AttendanceService.getAllEvents();
    return res.json({ success: true, data: events });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
