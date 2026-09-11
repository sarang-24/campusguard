import { Router, Request, Response } from 'express';
import { SessionService } from '../services/sessionService';
import { CreateSessionSchema } from '../validation/sessionValidation';

const router = Router();

// GET /api/v1/sessions
router.get('/', async (req: Request, res: Response) => {
  try {
    const courseCode = req.query.course_code as string | undefined;
    if (courseCode) {
      const sessions = await SessionService.getSessionsByCourseCode(courseCode);
      return res.json({ success: true, data: sessions });
    }
    const sessions = await SessionService.getAllSessions();
    return res.json({ success: true, data: sessions });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/sessions/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const session = await SessionService.getSessionById(req.params.id);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }
    return res.json({ success: true, data: session });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/sessions
router.post('/', async (req: Request, res: Response) => {
  try {
    const parseResult = CreateSessionSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.errors });
    }
    const session = await SessionService.createSession(parseResult.data);
    return res.status(201).json({ success: true, data: session });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
