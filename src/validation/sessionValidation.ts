import { z } from 'zod';

export const CreateSessionSchema = z.object({
  session_id: z.string().min(1, 'Session ID is required'),
  course_code: z.string().min(1, 'Course code is required'),
  scheduled_time: z.string().datetime({ message: 'scheduled_time must be a valid ISO 8601 string' }),
});

export type CreateSessionDTO = z.infer<typeof CreateSessionSchema>;
