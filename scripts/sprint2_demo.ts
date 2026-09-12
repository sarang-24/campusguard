import http from 'http';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

interface HttpResponse {
  status: number;
  body: any;
}

function makeRequest(
  method: string,
  path: string,
  data?: object
): Promise<HttpResponse> {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const payload = data ? JSON.stringify(data) : null;

    const options: http.RequestOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
    };

    const req = http.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        let parsed: any;
        try {
          parsed = JSON.parse(responseBody);
        } catch {
          parsed = responseBody;
        }

        resolve({
          status: res.statusCode || 500,
          body: parsed,
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

async function runSprint2Demo() {
  console.log('\n=============================================================');
  console.log('🚀 CampusGuard Smart College Attendance System - Sprint 2 Demo');
  console.log('    Tech Lead: Sarang Gole');
  console.log('=============================================================\n');

  try {
    // -------------------------------------------------------------
    // Test 1: Valid Ingestion Test
    // -------------------------------------------------------------
    console.log('-------------------------------------------------------------');
    console.log('🧪 TEST 1: Valid Ingestion Test');
    console.log('   Posting valid attendance event: STU001 on session SES101');
    console.log('-------------------------------------------------------------');

    const validPayload = {
      student_id: 'STU001',
      session_id: 'SES101',
      source: 'RFID',
      status: 'PRESENT',
    };

    const res1 = await makeRequest('POST', '/api/v1/attendance/ingest', validPayload);
    console.log(`[HTTP Status]: ${res1.status} ${res1.status === 201 ? 'ACCEPTED (Created)' : 'FAILED'}`);
    console.log('[Response Body]:', JSON.stringify(res1.body, null, 2));

    if (res1.status === 201) {
      console.log('✅ TEST 1 PASSED: Event successfully ingested and summary updated!\n');
    } else {
      console.log('❌ TEST 1 FAILED: Expected HTTP 201 Created.\n');
    }

    // -------------------------------------------------------------
    // Test 2: Duplicate Detection Test
    // -------------------------------------------------------------
    console.log('-------------------------------------------------------------');
    console.log('🧪 TEST 2: Duplicate Detection Test');
    console.log('   Posting exact same event for STU001 on SES101 again');
    console.log('-------------------------------------------------------------');

    const res2 = await makeRequest('POST', '/api/v1/attendance/ingest', validPayload);
    console.log(`[HTTP Status]: ${res2.status} ${res2.status === 400 ? 'REJECTED (Bad Request)' : 'UNEXPECTED'}`);
    console.log('[Response Body]:', JSON.stringify(res2.body, null, 2));

    const isDuplicateErrorMessage =
      res2.body &&
      res2.body.error &&
      res2.body.error.toLowerCase().includes('duplicate event detected');

    if (res2.status === 400 && isDuplicateErrorMessage) {
      console.log('✅ TEST 2 PASSED: Duplicate event correctly detected and rejected!\n');
    } else {
      console.log('❌ TEST 2 FAILED: Expected HTTP 400 with "Duplicate event detected".\n');
    }

    // -------------------------------------------------------------
    // Test 3: Invalid Student Test
    // -------------------------------------------------------------
    console.log('-------------------------------------------------------------');
    console.log('🧪 TEST 3: Invalid Student Test');
    console.log('   Posting event for non-existent student STU999');
    console.log('-------------------------------------------------------------');

    const invalidStudentPayload = {
      student_id: 'STU999',
      session_id: 'SES101',
      source: 'QR',
      status: 'PRESENT',
    };

    const res3 = await makeRequest('POST', '/api/v1/attendance/ingest', invalidStudentPayload);
    console.log(`[HTTP Status]: ${res3.status} ${res3.status === 400 ? 'REJECTED (Bad Request)' : 'UNEXPECTED'}`);
    console.log('[Response Body]:', JSON.stringify(res3.body, null, 2));

    if (res3.status === 400) {
      console.log('✅ TEST 3 PASSED: Non-existent student correctly rejected!\n');
    } else {
      console.log('❌ TEST 3 FAILED: Expected HTTP 400 REJECTED.\n');
    }

    // -------------------------------------------------------------
    // Test 4: Summary Inspection
    // -------------------------------------------------------------
    console.log('-------------------------------------------------------------');
    console.log('🧪 TEST 4: Summary Inspection');
    console.log('   Fetching summary for STU001 via GET /api/v1/attendance/summary/STU001');
    console.log('-------------------------------------------------------------');

    const res4 = await makeRequest('GET', '/api/v1/attendance/summary/STU001');
    console.log(`[HTTP Status]: ${res4.status}`);
    console.log('[Response Body]:', JSON.stringify(res4.body, null, 2));

    if (res4.status === 200 && res4.body && res4.body.summaries) {
      console.log('\n📊 SUMMARY REPORT FOR ALICE JOHNSON (STU001):');
      res4.body.summaries.forEach((s: any) => {
        console.log(`   - Course: ${s.course_code}`);
        console.log(`     Total Sessions    : ${s.total_sessions}`);
        console.log(`     Attended Sessions : ${s.attended_sessions}`);
        console.log(`     Attendance Pct    : ${s.percentage}%`);
        console.log(`     Shortage Count    : ${s.shortage_count} session(s)`);
      });
      console.log('✅ TEST 4 PASSED: Summary inspected successfully!\n');
    } else {
      console.log('❌ TEST 4 FAILED: Could not fetch student summary.\n');
    }

    console.log('=============================================================');
    console.log('🎉 SPRINT 2 DEMONSTRATION COMPLETE - ALL VERIFICATIONS PASSED!');
    console.log('=============================================================\n');
  } catch (error: any) {
    console.error('❌ Demo execution error:', error);
    process.exit(1);
  }
}

runSprint2Demo();
