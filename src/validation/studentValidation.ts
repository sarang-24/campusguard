import { z } from 'zod';

export const CreateStudentSchema = z.object({
  student_id: z.string().min(1, 'Student ID is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export const UpdateStudentSchema = CreateStudentSchema.partial();

export type CreateStudentDTO = z.infer<typeof CreateStudentSchema>;
export type UpdateStudentDTO = z.infer<typeof UpdateStudentSchema>;
