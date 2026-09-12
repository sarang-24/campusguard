// Mock data types and data for CampusGuard prototype

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'faculty' | 'management' | 'admin';
  avatar: string;
  department?: string;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  department: string;
  year: number;
  attendancePercentage: number;
  warningStatus: 'safe' | 'warning' | 'critical';
  lastAttendance: string;
  courses: string[];
  classesAttended: number;
  totalClasses: number;
}

export interface Faculty {
  id: string;
  facultyId: string;
  name: string;
  email: string;
  department: string;
  courses: string[];
  totalSessions: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  faculty: string;
  semester: string;
  totalStudents: number;
  attendancePercentage: number;
  status: 'active' | 'inactive';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  method: 'rfid' | 'biometric' | 'manual';
}

export interface Warning {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  attendancePercentage: number;
  severity: 'warning' | 'critical';
  coursesAffected: string[];
  issuedDate: string;
  status: 'active' | 'resolved' | 'acknowledged';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'critical' | 'success';
  recipient: string;
  timestamp: string;
  read: boolean;
}

export interface Exception {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  reason: string;
  dates: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userName: string;
  role: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

// ─── Demo Users ───────────────────────────────────────────────────────────────
export const DEMO_USERS: User[] = [
  { id: 'u1', email: 'student@campusguard.edu', name: 'Aryan Sharma', role: 'student', avatar: 'AS', department: 'Computer Science' },
  { id: 'u2', email: 'faculty@campusguard.edu', name: 'Dr. Priya Mehta', role: 'faculty', avatar: 'PM', department: 'Computer Science' },
  { id: 'u3', email: 'management@campusguard.edu', name: 'Prof. Rajan Gupta', role: 'management', avatar: 'RG', department: 'Administration' },
  { id: 'u4', email: 'admin@campusguard.edu', name: 'Sanjay Kumar', role: 'admin', avatar: 'SK', department: 'IT Administration' },
];

// ─── Students ─────────────────────────────────────────────────────────────────
export const STUDENTS: Student[] = [
  { id: 's1', studentId: 'CS2401', name: 'Aryan Sharma', email: 'aryan@college.edu', department: 'Computer Science', year: 2, attendancePercentage: 72, warningStatus: 'warning', lastAttendance: '2026-09-11', courses: ['CS301', 'CS302', 'MA201'], classesAttended: 86, totalClasses: 119 },
  { id: 's2', studentId: 'CS2402', name: 'Neha Patel', email: 'neha@college.edu', department: 'Computer Science', year: 2, attendancePercentage: 88, warningStatus: 'safe', lastAttendance: '2026-09-12', courses: ['CS301', 'CS302', 'MA201'], classesAttended: 105, totalClasses: 119 },
  { id: 's3', studentId: 'CS2403', name: 'Rohan Verma', email: 'rohan@college.edu', department: 'Computer Science', year: 2, attendancePercentage: 64, warningStatus: 'critical', lastAttendance: '2026-09-10', courses: ['CS301', 'CS303'], classesAttended: 76, totalClasses: 119 },
  { id: 's4', studentId: 'EC2401', name: 'Siya Kapoor', email: 'siya@college.edu', department: 'Electronics', year: 2, attendancePercentage: 91, warningStatus: 'safe', lastAttendance: '2026-09-12', courses: ['EC301', 'EC302'], classesAttended: 108, totalClasses: 119 },
  { id: 's5', studentId: 'ME2401', name: 'Vikram Singh', email: 'vikram@college.edu', department: 'Mechanical', year: 2, attendancePercentage: 68, warningStatus: 'critical', lastAttendance: '2026-09-09', courses: ['ME301', 'ME302'], classesAttended: 81, totalClasses: 119 },
  { id: 's6', studentId: 'CS2404', name: 'Ananya Roy', email: 'ananya@college.edu', department: 'Computer Science', year: 2, attendancePercentage: 79, warningStatus: 'safe', lastAttendance: '2026-09-12', courses: ['CS301', 'CS302'], classesAttended: 94, totalClasses: 119 },
  { id: 's7', studentId: 'CS2405', name: 'Dev Chaudhary', email: 'dev@college.edu', department: 'Computer Science', year: 2, attendancePercentage: 74, warningStatus: 'warning', lastAttendance: '2026-09-11', courses: ['CS301', 'CS303'], classesAttended: 88, totalClasses: 119 },
  { id: 's8', studentId: 'CS2406', name: 'Megha Joshi', email: 'megha@college.edu', department: 'Computer Science', year: 3, attendancePercentage: 82, warningStatus: 'safe', lastAttendance: '2026-09-12', courses: ['CS401', 'CS402'], classesAttended: 98, totalClasses: 119 },
];

// ─── Faculty ──────────────────────────────────────────────────────────────────
export const FACULTY: Faculty[] = [
  { id: 'f1', facultyId: 'FAC001', name: 'Dr. Priya Mehta', email: 'priya.mehta@college.edu', department: 'Computer Science', courses: ['CS301', 'CS302'], totalSessions: 48, status: 'active', joinDate: '2019-07-15' },
  { id: 'f2', facultyId: 'FAC002', name: 'Prof. Alok Sharma', email: 'alok.sharma@college.edu', department: 'Computer Science', courses: ['CS303', 'CS401'], totalSessions: 42, status: 'active', joinDate: '2017-08-01' },
  { id: 'f3', facultyId: 'FAC003', name: 'Dr. Sunita Rao', email: 'sunita.rao@college.edu', department: 'Electronics', courses: ['EC301', 'EC302'], totalSessions: 38, status: 'active', joinDate: '2020-01-10' },
  { id: 'f4', facultyId: 'FAC004', name: 'Prof. Rakesh Tiwari', email: 'rakesh.tiwari@college.edu', department: 'Mechanical', courses: ['ME301', 'ME302'], totalSessions: 44, status: 'active', joinDate: '2016-06-20' },
];

// ─── Courses ──────────────────────────────────────────────────────────────────
export const COURSES: Course[] = [
  { id: 'c1', code: 'CS301', name: 'Data Structures & Algorithms', department: 'Computer Science', faculty: 'Dr. Priya Mehta', semester: 'Semester 5', totalStudents: 50, attendancePercentage: 78, status: 'active' },
  { id: 'c2', code: 'CS302', name: 'Database Management Systems', department: 'Computer Science', faculty: 'Dr. Priya Mehta', semester: 'Semester 5', totalStudents: 45, attendancePercentage: 82, status: 'active' },
  { id: 'c3', code: 'CS303', name: 'Operating Systems', department: 'Computer Science', faculty: 'Prof. Alok Sharma', semester: 'Semester 5', totalStudents: 48, attendancePercentage: 71, status: 'active' },
  { id: 'c4', code: 'CS401', name: 'Software Engineering', department: 'Computer Science', faculty: 'Prof. Alok Sharma', semester: 'Semester 7', totalStudents: 42, attendancePercentage: 85, status: 'active' },
  { id: 'c5', code: 'EC301', name: 'Digital Electronics', department: 'Electronics', faculty: 'Dr. Sunita Rao', semester: 'Semester 5', totalStudents: 40, attendancePercentage: 90, status: 'active' },
  { id: 'c6', code: 'ME301', name: 'Thermodynamics', department: 'Mechanical', faculty: 'Prof. Rakesh Tiwari', semester: 'Semester 5', totalStudents: 44, attendancePercentage: 74, status: 'active' },
];

// ─── Attendance Records ────────────────────────────────────────────────────────
export const ATTENDANCE_RECORDS: AttendanceRecord[] = [
  { id: 'a1', studentId: 'CS2401', studentName: 'Aryan Sharma', courseId: 'CS301', courseName: 'Data Structures', date: '2026-09-12', status: 'present', method: 'rfid' },
  { id: 'a2', studentId: 'CS2402', studentName: 'Neha Patel', courseId: 'CS301', courseName: 'Data Structures', date: '2026-09-12', status: 'present', method: 'rfid' },
  { id: 'a3', studentId: 'CS2403', studentName: 'Rohan Verma', courseId: 'CS301', courseName: 'Data Structures', date: '2026-09-12', status: 'absent', method: 'rfid' },
  { id: 'a4', studentId: 'CS2404', studentName: 'Ananya Roy', courseId: 'CS302', courseName: 'Database Systems', date: '2026-09-12', status: 'present', method: 'biometric' },
  { id: 'a5', studentId: 'CS2405', studentName: 'Dev Chaudhary', courseId: 'CS302', courseName: 'Database Systems', date: '2026-09-12', status: 'late', method: 'biometric' },
  { id: 'a6', studentId: 'EC2401', studentName: 'Siya Kapoor', courseId: 'EC301', courseName: 'Digital Electronics', date: '2026-09-12', status: 'present', method: 'biometric' },
];

// ─── Warnings ─────────────────────────────────────────────────────────────────
export const WARNINGS: Warning[] = [
  { id: 'w1', studentId: 'CS2401', studentName: 'Aryan Sharma', department: 'Computer Science', attendancePercentage: 72, severity: 'warning', coursesAffected: ['CS301', 'CS303'], issuedDate: '2026-09-10', status: 'active' },
  { id: 'w2', studentId: 'CS2403', studentName: 'Rohan Verma', department: 'Computer Science', attendancePercentage: 64, severity: 'critical', coursesAffected: ['CS301', 'CS302', 'CS303'], issuedDate: '2026-09-08', status: 'active' },
  { id: 'w3', studentId: 'ME2401', studentName: 'Vikram Singh', department: 'Mechanical', attendancePercentage: 68, severity: 'critical', coursesAffected: ['ME301', 'ME302'], issuedDate: '2026-09-07', status: 'acknowledged' },
  { id: 'w4', studentId: 'CS2405', studentName: 'Dev Chaudhary', department: 'Computer Science', attendancePercentage: 74, severity: 'warning', coursesAffected: ['CS303'], issuedDate: '2026-09-11', status: 'active' },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Attendance Warning', message: 'Your attendance in CS301 has dropped below 75%.', type: 'warning', recipient: 'CS2401', timestamp: '2026-09-12T09:00:00', read: false },
  { id: 'n2', title: 'Critical Alert', message: 'Rohan Verma attendance is critically low at 64%.', type: 'critical', recipient: 'FAC001', timestamp: '2026-09-12T08:30:00', read: false },
  { id: 'n3', title: 'Exception Approved', message: 'Your medical leave exception has been approved.', type: 'success', recipient: 'CS2403', timestamp: '2026-09-11T14:00:00', read: true },
  { id: 'n4', title: 'Session Reminder', message: 'CS302 lecture starts in 30 minutes.', type: 'info', recipient: 'CS2402', timestamp: '2026-09-12T09:30:00', read: false },
  { id: 'n5', title: 'Attendance Below Threshold', message: 'Vikram Singh has attendance of 68% in ME301.', type: 'critical', recipient: 'FAC004', timestamp: '2026-09-12T08:00:00', read: true },
];

// ─── Exceptions ───────────────────────────────────────────────────────────────
export const EXCEPTIONS: Exception[] = [
  { id: 'e1', studentId: 'CS2403', studentName: 'Rohan Verma', courseId: 'CS301', courseName: 'Data Structures', reason: 'Medical leave - Fever', dates: ['2026-09-05', '2026-09-06', '2026-09-07'], status: 'approved', submittedDate: '2026-09-08', reviewedBy: 'Dr. Priya Mehta', reviewedDate: '2026-09-09' },
  { id: 'e2', studentId: 'ME2401', studentName: 'Vikram Singh', courseId: 'ME301', courseName: 'Thermodynamics', reason: 'National sports event participation', dates: ['2026-09-01', '2026-09-02', '2026-09-03'], status: 'pending', submittedDate: '2026-09-10' },
  { id: 'e3', studentId: 'CS2401', studentName: 'Aryan Sharma', courseId: 'CS303', courseName: 'Operating Systems', reason: 'Family emergency', dates: ['2026-09-08', '2026-09-09'], status: 'pending', submittedDate: '2026-09-11' },
  { id: 'e4', studentId: 'CS2405', studentName: 'Dev Chaudhary', courseId: 'CS303', courseName: 'Operating Systems', reason: 'Medical leave - Dental surgery', dates: ['2026-09-03'], status: 'rejected', submittedDate: '2026-09-04', reviewedBy: 'Prof. Alok Sharma', reviewedDate: '2026-09-06' },
];

// ─── Audit Logs ───────────────────────────────────────────────────────────────
export const AUDIT_LOGS: AuditLog[] = [
  { id: 'al1', action: 'Attendance Updated', userId: 'u2', userName: 'Dr. Priya Mehta', role: 'Faculty', details: 'Manual attendance correction for CS301 - 2026-09-12', timestamp: '2026-09-12T10:15:00', ipAddress: '192.168.1.12' },
  { id: 'al2', action: 'Exception Approved', userId: 'u2', userName: 'Dr. Priya Mehta', role: 'Faculty', details: 'Exception e1 approved for Rohan Verma', timestamp: '2026-09-09T14:30:00', ipAddress: '192.168.1.12' },
  { id: 'al3', action: 'Warning Generated', userId: 'u4', userName: 'System', role: 'System', details: 'Auto warning generated for Aryan Sharma - 72% attendance', timestamp: '2026-09-10T08:00:00', ipAddress: '127.0.0.1' },
  { id: 'al4', action: 'User Login', userId: 'u1', userName: 'Aryan Sharma', role: 'Student', details: 'Successful login from web browser', timestamp: '2026-09-12T09:00:00', ipAddress: '192.168.1.50' },
  { id: 'al5', action: 'Report Downloaded', userId: 'u3', userName: 'Prof. Rajan Gupta', role: 'Management', details: 'Monthly attendance report downloaded - August 2026', timestamp: '2026-09-12T11:00:00', ipAddress: '192.168.1.8' },
];

// ─── Chart Data ───────────────────────────────────────────────────────────────
export const ATTENDANCE_TREND = [
  { month: 'Jun', percentage: 84 },
  { month: 'Jul', percentage: 81 },
  { month: 'Aug', percentage: 78 },
  { month: 'Sep', percentage: 76 },
];

export const DEPARTMENT_STATS = [
  { department: 'Computer Science', attendance: 78, students: 180, atRisk: 12 },
  { department: 'Electronics', attendance: 88, students: 120, atRisk: 5 },
  { department: 'Mechanical', attendance: 72, students: 150, atRisk: 18 },
  { department: 'Civil', attendance: 81, students: 100, atRisk: 8 },
];

export const WEEKLY_ATTENDANCE = [
  { day: 'Mon', present: 420, absent: 55, late: 25 },
  { day: 'Tue', present: 410, absent: 60, late: 30 },
  { day: 'Wed', present: 445, absent: 40, late: 15 },
  { day: 'Thu', present: 430, absent: 50, late: 20 },
  { day: 'Fri', present: 400, absent: 70, late: 30 },
];
