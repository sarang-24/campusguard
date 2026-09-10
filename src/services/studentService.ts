import { prisma, Student } from '../models';
import { CreateStudentDTO, UpdateStudentDTO } from '../validation/studentValidation';

export class StudentService {
  static async getAllStudents(): Promise<Student[]> {
    return prisma.student.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  static async getStudentById(student_id: string): Promise<Student | null> {
    return prisma.student.findUnique({
      where: { student_id },
      include: {
        summaries: true,
      },
    });
  }

  static async createStudent(data: CreateStudentDTO): Promise<Student> {
    const existing = await prisma.student.findFirst({
      where: {
        OR: [{ student_id: data.student_id }, { email: data.email }],
      },
    });

    if (existing) {
      throw new Error(`Student with ID ${data.student_id} or email ${data.email} already exists`);
    }

    return prisma.student.create({
      data,
    });
  }

  static async updateStudent(student_id: string, data: UpdateStudentDTO): Promise<Student> {
    await this.getStudentById(student_id);
    return prisma.student.update({
      where: { student_id },
      data,
    });
  }

  static async deleteStudent(student_id: string): Promise<Student> {
    return prisma.student.delete({
      where: { student_id },
    });
  }
}
