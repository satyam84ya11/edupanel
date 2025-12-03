import { prisma } from '../app.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

// POST /students/add
export const addStudent = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const data = req.body;

    const student = await prisma.student.create({
      data: {
        ...data,
        schoolId,
      },
    });

    return res.status(201).json(student);
  } catch (error) {
    console.error('addStudent error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /students
export const getStudents = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const students = await prisma.student.findMany({
      where: { schoolId },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(students);
  } catch (error) {
    console.error('getStudents error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /students/:id
export const getStudentById = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;

    const student = await prisma.student.findFirst({
      where: { id, schoolId },
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.json(student);
  } catch (error) {
    console.error('getStudentById error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /students/:id
export const updateStudent = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;
    const data = req.body;

    const existing = await prisma.student.findFirst({
      where: { id, schoolId },
    });
    if (!existing) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const updated = await prisma.student.update({
      where: { id },
      data,
    });

    return res.json(updated);
  } catch (error) {
    console.error('updateStudent error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /students/:id
export const deleteStudent = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;

    const existing = await prisma.student.findFirst({
      where: { id, schoolId },
    });
    if (!existing) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await prisma.student.delete({ where: { id } });

    return res.json({ message: 'Student deleted' });
  } catch (error) {
    console.error('deleteStudent error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /students/:id/documents
export const uploadStudentDocuments = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;

    const student = await prisma.student.findFirst({
      where: { id, schoolId },
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const updates = {};

    if (req.files?.aadhaar?.[0]) {
      const result = await uploadToCloudinary(
        req.files.aadhaar[0].buffer,
        `edupanel/${schoolId}/students/${id}/aadhaar`,
      );
      updates.aadhaarUrl = result.secure_url;
    }

    if (req.files?.photo?.[0]) {
      const result = await uploadToCloudinary(
        req.files.photo[0].buffer,
        `edupanel/${schoolId}/students/${id}/photo`,
      );
      updates.photoUrl = result.secure_url;
    }

    if (req.files?.documents?.length) {
      const urls = [];
      for (const file of req.files.documents) {
        const result = await uploadToCloudinary(
          file.buffer,
          `edupanel/${schoolId}/students/${id}/documents`,
        );
        urls.push(result.secure_url);
      }
      updates.documentsUrl = JSON.stringify(urls);
    }

    const updated = await prisma.student.update({
      where: { id },
      data: updates,
    });

    return res.json(updated);
  } catch (error) {
    console.error('uploadStudentDocuments error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


