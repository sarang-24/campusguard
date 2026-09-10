import { prisma, CourseSession } from '../models';
import { CreateSessionDTO } from '../validation/sessionValidation';

export class SessionService {
  static async getAllSessions(): Promise<CourseSession[]> {
    return prisma.courseSession.findMany({
      orderBy: { scheduled_time: 'desc' },
    });
  }

  static async getSessionById(session_id: string): Promise<CourseSession | null> {
    return prisma.courseSession.findUnique({
      where: { session_id },
    });
  }

  static async getSessionsByCourseCode(course_code: string): Promise<CourseSession[]> {
    return prisma.courseSession.findMany({
      where: { course_code },
      orderBy: { scheduled_time: 'desc' },
    });
  }

  static async createSession(data: CreateSessionDTO): Promise<CourseSession> {
    const existing = await prisma.courseSession.findUnique({
      where: { session_id: data.session_id },
    });

    if (existing) {
      throw new Error(`Course session with ID ${data.session_id} already exists`);
    }

    return prisma.courseSession.create({
      data: {
        session_id: data.session_id,
        course_code: data.course_code,
        scheduled_time: new Date(data.scheduled_time),
      },
    });
  }
}
