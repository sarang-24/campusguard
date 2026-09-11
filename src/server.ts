import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 CampusGuard Backend Server listening on port ${PORT}`);
  console.log(`📡 Healthcheck available at http://localhost:${PORT}/health`);
  console.log(`🔗 Base API endpoint available at http://localhost:${PORT}/api/v1`);
});
