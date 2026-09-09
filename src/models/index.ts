import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export type {
  Student,
  CourseSession,
  AttendanceEvent,
  AttendanceSummary,
} from '@prisma/client';
