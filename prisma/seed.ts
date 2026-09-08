import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting CampusGuard Database Seeding...');

  // Clean existing data
  await prisma.attendanceSummary.deleteMany();
  await prisma.attendanceEvent.deleteMany();
  await prisma.courseSession.deleteMany();
  await prisma.student.deleteMany();

  // 1. Seed 5 Students
  const students = await Promise.all([
    prisma.student.create({
      data: {
        student_id: 'STU001',
        name: 'Alice Johnson',
        email: 'alice.johnson@campus.edu',
      },
    }),
    prisma.student.create({
      data: {
        student_id: 'STU002',
        name: 'Bob Smith',
        email: 'bob.smith@campus.edu',
      },
    }),
    prisma.student.create({
      data: {
        student_id: 'STU003',
        name: 'Charlie Brown',
        email: 'charlie.brown@campus.edu',
      },
    }),
    prisma.student.create({
      data: {
        student_id: 'STU004',
        name: 'Diana Prince',
        email: 'diana.prince@campus.edu',
      },
    }),
    prisma.student.create({
      data: {
        student_id: 'STU005',
        name: 'Evan Wright',
        email: 'evan.wright@campus.edu',
      },
    }),
  ]);

  console.log(`✅ Seeded ${students.length} Students.`);

  // 2. Seed 3 Course Sessions
  const now = new Date();
  const sessions = await Promise.all([
    prisma.courseSession.create({
      data: {
        session_id: 'SES101',
        course_code: 'CS101',
        scheduled_time: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
      },
    }),
    prisma.courseSession.create({
      data: {
        session_id: 'SES102',
        course_code: 'CS101',
        scheduled_time: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
    }),
    prisma.courseSession.create({
      data: {
        session_id: 'SES201',
        course_code: 'MATH201',
        scheduled_time: new Date(now.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
      },
    }),
  ]);

  console.log(`✅ Seeded ${sessions.length} Course Sessions.`);

  // 3. Seed Initial Attendance Events (STU001 on SES101 left un-ingested for demo test)
  const events = await Promise.all([
    prisma.attendanceEvent.create({
      data: {
        student_id: 'STU001',
        session_id: 'SES102',
        source: 'QR',
        status: 'PRESENT',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000 + 2 * 60 * 1000),
      },
    }),
    prisma.attendanceEvent.create({
      data: {
        student_id: 'STU002',
        session_id: 'SES101',
        source: 'BIOMETRIC',
        status: 'LATE',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000 + 25 * 60 * 1000),
      },
    }),
    prisma.attendanceEvent.create({
      data: {
        student_id: 'STU003',
        session_id: 'SES201',
        source: 'APP',
        status: 'PRESENT',
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000 + 1 * 60 * 1000),
      },
    }),
  ]);

  console.log(`✅ Seeded ${events.length} Attendance Events.`);

  // 4. Seed Initial Attendance Summaries
  await prisma.attendanceSummary.createMany({
    data: [
      {
        student_id: 'STU001',
        course_code: 'CS101',
        total_sessions: 2,
        attended_sessions: 1,
        percentage: 50.0,
      },
      {
        student_id: 'STU002',
        course_code: 'CS101',
        total_sessions: 2,
        attended_sessions: 1,
        percentage: 50.0,
      },
      {
        student_id: 'STU003',
        course_code: 'MATH201',
        total_sessions: 1,
        attended_sessions: 1,
        percentage: 100.0,
      },
    ],
  });

  console.log('✅ Seeded Attendance Summaries.');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
