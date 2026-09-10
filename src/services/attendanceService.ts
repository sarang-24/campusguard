import { prisma, AttendanceEvent } from '../models';

export class AttendanceService {
  static async getAllEvents(): Promise<AttendanceEvent[]> {
    return prisma.attendanceEvent.findMany({
      orderBy: { timestamp: 'desc' },
      include: {
        student: { select: { name: true, email: true } },
        session: { select: { course_code: true, scheduled_time: true } },
      },
    });
  }

  static async getEventsByStudent(student_id: string): Promise<AttendanceEvent[]> {
    return prisma.attendanceEvent.findMany({
      where: { student_id },
      orderBy: { timestamp: 'desc' },
      include: {
        session: { select: { course_code: true, scheduled_time: true } },
      },
    });
  }

  static async getEventsBySession(session_id: string): Promise<AttendanceEvent[]> {
    return prisma.attendanceEvent.findMany({
      where: { session_id },
      orderBy: { timestamp: 'desc' },
      include: {
        student: { select: { name: true, email: true } },
      },
    });
  }
}
