import { Router } from 'express';
import studentRoutes from './studentRoutes';
import sessionRoutes from './sessionRoutes';
import attendanceRoutes from './attendance.routes';

const router = Router();

router.use('/students', studentRoutes);
router.use('/sessions', sessionRoutes);
router.use('/attendance', attendanceRoutes);

export default router;
