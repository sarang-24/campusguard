import { z } from 'zod';

export const AttendanceSourceEnum = z.enum(['RFID', 'QR', 'BIOMETRIC', 'APP', 'MANUAL']);
export const AttendanceStatusEnum = z.enum(['PRESENT', 'LATE', 'ABSENT', 'FLAGGED']);

export const IngestAttendanceSchema = z.object({
  student_id: z.string().min(1, 'student_id is required'),
  session_id: z.string().min(1, 'session_id is required'),
  timestamp: z.string().datetime().optional(),
  source: AttendanceSourceEnum.default('APP'),
  status: AttendanceStatusEnum.optional(),
});

export const SummaryQuerySchema = z.object({
  student_id: z.string().optional(),
  course_code: z.string().optional(),
});

export type IngestAttendanceDTO = z.infer<typeof IngestAttendanceSchema>;
export type SummaryQueryDTO = z.infer<typeof SummaryQuerySchema>;
