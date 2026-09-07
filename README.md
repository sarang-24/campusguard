# CampusGuard - Smart College Attendance System (Sprint 2 Backend)

CampusGuard is a smart attendance backend service for higher education campuses. It provides ingestion of attendance events across multi-source terminals (RFID, QR scans, Biometrics, Mobile App), real-time calculation of course attendance percentages, and RESTful APIs for managing students, course sessions, events, and summaries.

---

## 📁 Repository Architecture

```
campusguard/
├── package.json               # Project dependencies and script runner
├── tsconfig.json              # TypeScript compiler settings
├── .env                       # Environment variables
├── .env.example               # Environment template
├── prisma/
│   ├── schema.prisma          # Database schema (SQLite)
│   └── seed.ts                # Seed script (5 Students, 3 Course Sessions)
└── src/
    ├── models/                # Prisma client singleton & model exports
    │   └── index.ts
    ├── validation/            # Zod validation schemas
    │   ├── studentValidation.ts
    │   ├── sessionValidation.ts
    │   └── attendanceValidation.ts
    ├── ingestion/             # Ingestion pipeline
    │   └── attendanceIngestor.ts
    ├── services/              # Core business logic
    │   ├── studentService.ts
    │   ├── sessionService.ts
    │   ├── attendanceService.ts
    │   └── summaryService.ts
    ├── routes/                # REST API Endpoint Routers
    │   ├── studentRoutes.ts
    │   ├── sessionRoutes.ts
    │   ├── attendanceRoutes.ts
    │   └── index.ts
    ├── app.ts                 # Express application middleware configuration
    └── server.ts              # HTTP server entrypoint
```

---

## 🗄️ Database Models

1. **Student** (`students`)
   - `student_id`: String (Primary Key, e.g., `STU001`)
   - `name`: String
   - `email`: String (Unique)

2. **CourseSession** (`course_sessions`)
   - `session_id`: String (Primary Key, e.g., `SES101`)
   - `course_code`: String (e.g., `CS101`)
   - `scheduled_time`: DateTime

3. **AttendanceEvent** (`attendance_events`)
   - `event_id`: UUID
   - `student_id`: Foreign key -> Student
   - `session_id`: Foreign key -> CourseSession
   - `timestamp`: DateTime
   - `source`: String (`RFID`, `QR`, `BIOMETRIC`, `APP`, `MANUAL`)
   - `status`: String (`PRESENT`, `LATE`, `ABSENT`, `FLAGGED`)

4. **AttendanceSummary** (`attendance_summaries`)
   - `id`: UUID
   - `student_id`: Foreign key -> Student
   - `course_code`: String
   - `total_sessions`: Int
   - `attended_sessions`: Int
   - `percentage`: Float

---

## 🚀 Quickstart & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client & Initialize Database
```bash
npm run prisma:generate
npm run prisma:db:push
```

### 3. Seed Database (5 Students, 3 Sessions)
```bash
npm run seed
```

### 4. Start Development Server
```bash
npm run dev
```
The server will run at `http://localhost:3000`.

---

## 🧪 API Endpoint Reference & Sample Commands

### Health Check
- `GET /health`

### 1. Students Endpoint
- **Get All Students**: `GET /api/v1/students`
  ```bash
  curl http://localhost:3000/api/v1/students
  ```
- **Get Student By ID**: `GET /api/v1/students/STU001`
  ```bash
  curl http://localhost:3000/api/v1/students/STU001
  ```
- **Create Student**: `POST /api/v1/students`
  ```bash
  curl -X POST http://localhost:3000/api/v1/students \
    -H "Content-Type: application/json" \
    -d '{"student_id": "STU006", "name": "Fiona Apple", "email": "fiona.apple@campus.edu"}'
  ```

### 2. Course Sessions Endpoint
- **Get All Sessions**: `GET /api/v1/sessions`
- **Create Session**: `POST /api/v1/sessions`
  ```bash
  curl -X POST http://localhost:3000/api/v1/sessions \
    -H "Content-Type: application/json" \
    -d '{"session_id": "SES103", "course_code": "CS101", "scheduled_time": "2026-09-12T10:00:00.000Z"}'
  ```

### 3. Attendance Ingestion & Summaries
- **Ingest Attendance Event**: `POST /api/v1/attendance/ingest`
  ```bash
  curl -X POST http://localhost:3000/api/v1/attendance/ingest \
    -H "Content-Type: application/json" \
    -d '{"student_id": "STU002", "session_id": "SES102", "source": "QR"}'
  ```
- **Get All Events**: `GET /api/v1/attendance/events`
- **Get Summaries**: `GET /api/v1/attendance/summary`
  ```bash
  curl http://localhost:3000/api/v1/attendance/summary?student_id=STU002
  ```
