import { Router, Request, Response } from 'express';
import { StudentService } from '../services/studentService';
import { CreateStudentSchema, UpdateStudentSchema } from '../validation/studentValidation';

const router = Router();

// GET /api/v1/students
router.get('/', async (req: Request, res: Response) => {
  try {
    const students = await StudentService.getAllStudents();
    return res.json({ success: true, data: students });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/students/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const student = await StudentService.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }
    return res.json({ success: true, data: student });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/students
router.post('/', async (req: Request, res: Response) => {
  try {
    const parseResult = CreateStudentSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.errors });
    }
    const student = await StudentService.createStudent(parseResult.data);
    return res.status(201).json({ success: true, data: student });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// PUT /api/v1/students/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const parseResult = UpdateStudentSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.errors });
    }
    const student = await StudentService.updateStudent(req.params.id, parseResult.data);
    return res.json({ success: true, data: student });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE /api/v1/students/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await StudentService.deleteStudent(req.params.id);
    return res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
