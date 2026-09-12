# 🛡️ CampusGuard — Smart College Attendance System
> **Sprint 2 Backend Architecture & Demonstration Manual**  
> *Tech Lead:* **Sarang Gole**

CampusGuard is an enterprise-grade smart attendance backend service designed for higher education institutions. It enables seamless attendance ingestion across multi-source terminals (**RFID Readers, QR Scans, Biometric Terminals, Mobile Apps**), enforces real-time duplicate check-in prevention, and automatically computes course attendance metrics and analytical summaries for academic faculty.

---

## 📑 Table of Contents
1. [Sprint 2 Objectives & Scope](#-sprint-2-objectives--scope)
2. [Tech Stack & Architecture](#-tech-stack--architecture)
3. [Repository Directory Structure](#-repository-directory-structure)
4. [Database Models & Schema](#-database-models--schema)
5. [Quickstart & Setup Instructions](#-quickstart--setup-instructions)
6. [Automated Sprint 2 Live Demo](#-automated-sprint-2-live-demo)
7. [REST API Endpoint Reference](#-rest-api-endpoint-reference)
8. [Teacher & Evaluation Presentation Guide](#-teacher--evaluation-presentation-guide)

---

## 🎯 Sprint 2 Objectives & Scope

In **Sprint 2**, the backend foundation and core business services were fully developed and validated:
- ✅ **Type-Safe Backend Server**: Built with **Node.js, TypeScript, and Express.js**.
- ✅ **Relational ORM Persistence**: Powered by **Prisma ORM** with SQLite database.
- ✅ **Strict Payload Validation**: Runtime data sanitization using **Zod** validation schemas.
- ✅ **Ingestion Engine**: Ingests scans from RFID/QR/Biometrics with **duplicate detection** and non-existent student/session error handling.
- ✅ **Summary Calculation Engine**: Dynamic real-time calculation of student attendance percentages per course session.
- ✅ **Automated Demo Runner**: One-command interactive CLI test script (`npm run demo`) verifying all 4 key Sprint 2 test scenarios.

---

## 🛠️ Tech Stack & Architecture

- **Runtime & Environment**: Node.js (v18+) & TypeScript
- **Web Framework**: Express.js
- **Database & ORM**: SQLite + Prisma ORM (v5+)
- **Data Validation**: Zod Schema Validation
- **CLI Demo & Scripting**: `tsx` runner with native `http` module testing

---

## 📁 Repository Directory Structure

```
campusguard/
├── package.json               # Project dependencies and CLI script definitions
├── tsconfig.json              # TypeScript strict mode configuration
├── .env                       # Local environment variables
├── .env.example               # Environment template
├── prisma/
│   ├── schema.prisma          # Prisma ORM Database Models
│   └── seed.ts                # Database Seeding Script (5 Students, 3 Sessions)
├── scripts/
│   └── sprint2_demo.ts        # Automated Sprint 2 Demonstration Runner
└── src/
    ├── models/                # Prisma client singleton instance
    │   └── index.ts
    ├── validation/            # Zod Validation Schemas
    │   ├── studentValidation.ts
    │   ├── sessionValidation.ts
    │   └── attendanceValidation.ts
    ├── ingestion/             # Attendance Event Ingestion Pipeline
    │   └── attendanceIngestor.ts
    ├── services/              # Core Domain Business Logic
    │   ├── studentService.ts
    │   ├── sessionService.ts
    │   ├── attendanceService.ts
    │   └── summaryService.ts
    ├── routes/                # Express REST Routers
    │   ├── studentRoutes.ts
    │   ├── sessionRoutes.ts
    │   ├── attendance.routes.ts
    │   ├── attendanceRoutes.ts
    │   └── index.ts
    ├── app.ts                 # Express Application Middleware & Error Handlers
    └── server.ts              # HTTP Server Entrypoint
```

---

## 🗄️ Database Models & Schema

The relational schema is defined in [`prisma/schema.prisma`](file:///Users/saranggole24/Downloads/campusguard/prisma/schema.prisma):

```prisma
model Student {
  student_id String              @id
  name       String
  email      String              @unique
  events     AttendanceEvent[]
  summaries  AttendanceSummary[]

  @@map("students")
}

model CourseSession {
  session_id     String            @id
  course_code    String
  scheduled_time DateTime
  events         AttendanceEvent[]

  @@map("course_sessions")
}

model AttendanceEvent {
  event_id   String        @id @default(uuid())
  student_id String
  session_id String
  timestamp  DateTime      @default(now())
  source     String        // RFID | QR | BIOMETRIC | APP | MANUAL
  status     String        // PRESENT | LATE | ABSENT | FLAGGED
  student    Student       @relation(fields: [student_id], references: [student_id])
  session    CourseSession @relation(fields: [session_id], references: [session_id])

  @@map("attendance_events")
}

model AttendanceSummary {
  id                String   @id @default(uuid())
  student_id        String
  course_code       String
  total_sessions    Int
  attended_sessions Int
  percentage        Float
  student           Student  @relation(fields: [student_id], references: [student_id])

  @@map("attendance_summaries")
}
```

---

## 🚀 Quickstart & Setup Instructions

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client & Push Database Schema
```bash
npm run prisma:generate
npm run prisma:db:push
```

### 3. Seed Database with Initial Data
Seeds **5 test students** (`STU001` - `STU005`) and **3 course sessions** (`SES101` - `SES103`).
```bash
npm run seed
```

### 4. Launch Development Server
```bash
npm run dev
```
The server will start listening at `http://localhost:3000`.

---

## 🧪 Automated Sprint 2 Live Demo

CampusGuard includes an automated presentation script that executes **4 live test cases** against the running HTTP server.

1. Ensure the development server is running in Terminal 1:
   ```bash
   npm run dev
   ```
2. Run the demo runner in Terminal 2:
   ```bash
   npm run demo
   ```

### Demo Test Suite Verification Matrix:
- 🟢 **Test 1: Valid Ingestion**: Posts a valid RFID scan for `STU001` on session `SES101` $\rightarrow$ **HTTP 201 Created**.
- 🟢 **Test 2: Duplicate Detection**: Re-submits the identical scan for `STU001` on `SES101` $\rightarrow$ **HTTP 400 Bad Request ("Duplicate event detected")**.
- 🟢 **Test 3: Invalid Student Guard**: Submits scan for non-existent student `STU999` $\rightarrow$ **HTTP 400 Bad Request**.
- 🟢 **Test 4: Real-Time Summary Inspection**: Fetches attendance analytics for `STU001` $\rightarrow$ Returns updated total sessions, attended count, and percentage.

---

## 📡 REST API Endpoint Reference

### 1. System Health
- **`GET /health`**
  - **Response (200 OK)**:
    ```json
    { "status": "OK", "timestamp": "2026-09-12T12:00:00.000Z" }
    ```

### 2. Student Management
- **`GET /api/v1/students`** — Retrieve list of all registered students.
- **`GET /api/v1/students/:id`** — Get student details by ID (e.g. `STU001`).
- **`POST /api/v1/students`** — Register a new student.
  - **Sample Request**:
    ```bash
    curl -X POST http://localhost:3000/api/v1/students \
      -H "Content-Type: application/json" \
      -d '{"student_id": "STU006", "name": "Fiona Apple", "email": "fiona.apple@campus.edu"}'
    ```

### 3. Course Session Management
- **`GET /api/v1/sessions`** — Retrieve all scheduled course sessions.
- **`POST /api/v1/sessions`** — Schedule a new course session.
  - **Sample Request**:
    ```bash
    curl -X POST http://localhost:3000/api/v1/sessions \
      -H "Content-Type: application/json" \
      -d '{"session_id": "SES104", "course_code": "CS101", "scheduled_time": "2026-09-15T09:00:00.000Z"}'
    ```

### 4. Attendance Ingestion & Summaries
- **`POST /api/v1/attendance/ingest`** — Ingest attendance scan event.
  - **Sample Request**:
    ```bash
    curl -X POST http://localhost:3000/api/v1/attendance/ingest \
      -H "Content-Type: application/json" \
      -d '{"student_id": "STU001", "session_id": "SES101", "source": "RFID", "status": "PRESENT"}'
    ```
- **`GET /api/v1/attendance/events`** — List raw attendance events log.
- **`GET /api/v1/attendance/summary`** — Fetch attendance percentage summaries.
  - **Sample Request**:
    ```bash
    curl http://localhost:3000/api/v1/attendance/summary?student_id=STU001
    ```

---

## 👩‍🏫 Teacher & Evaluation Presentation Guide

### Key Highlights for Academic Evaluation:
1. **Architecture Decoupling**: Express routers pass validated payloads to domain services ([`studentService.ts`](file:///Users/saranggole24/Downloads/campusguard/src/services/studentService.ts), [`sessionService.ts`](file:///Users/saranggole24/Downloads/campusguard/src/services/sessionService.ts), [`attendanceService.ts`](file:///Users/saranggole24/Downloads/campusguard/src/services/attendanceService.ts)), ensuring high testability and clean separation of concerns.
2. **Double-Check-In Prevention**: Ingestion engine automatically rejects duplicate scans within the same session.
3. **Data Integrity**: Enforces Zod schemas at API boundary and Foreign Key relationships in SQLite database.
4. **Calculated Analytics**: Summaries compute real-time attendance percentage:
   $$\text{Percentage} = \left(\frac{\text{Attended}}{\text{Total Sessions}}\right) \times 100$$
