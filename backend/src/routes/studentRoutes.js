import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  uploadStudentDocuments,
} from '../controllers/studentController.js';

const router = express.Router();
const upload = multer(); // memory storage

router.use(protect);

router.post('/add', addStudent);
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

router.post(
  '/:id/documents',
  upload.fields([
    { name: 'aadhaar', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'documents', maxCount: 5 },
  ]),
  uploadStudentDocuments,
);

export default router;


