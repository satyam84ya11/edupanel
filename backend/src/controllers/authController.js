import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../app.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// POST /auth/register-school
// Creates a school and an initial admin user
export const registerSchool = async (req, res) => {
  try {
    const { schoolName, schoolCode, adminName, adminUserid, password } = req.body;

    if (!schoolName || !schoolCode || !adminName || !adminUserid || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingSchool = await prisma.school.findUnique({
      where: { schoolCode },
    });

    if (existingSchool) {
      return res.status(400).json({ message: 'School code already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const school = await prisma.school.create({
      data: {
        name: schoolName,
        schoolCode,
        users: {
          create: {
            userid: adminUserid,
            password: hashedPassword,
            role: 'ADMIN',
            name: adminName,
          },
        },
      },
      include: {
        users: true,
      },
    });

    return res.status(201).json({
      message: 'School and admin created successfully',
      schoolId: school.id,
    });
  } catch (error) {
    console.error('registerSchool error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /auth/login
// Login with school_code + userid + password
export const login = async (req, res) => {
  try {
    const { schoolCode, userid, password } = req.body;

    if (!schoolCode || !userid || !password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    const school = await prisma.school.findUnique({
      where: { schoolCode },
    });

    if (!school) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = await prisma.user.findFirst({
      where: {
        userid,
        schoolId: school.id,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        schoolId: user.schoolId,
        role: user.role,
        userid: user.userid,
      },
      JWT_SECRET,
      { expiresIn: '8h' },
    );

    return res.json({
      token,
      user: {
        id: user.id,
        userid: user.userid,
        name: user.name,
        role: user.role,
        schoolId: user.schoolId,
      },
      school: {
        id: school.id,
        name: school.name,
        schoolCode: school.schoolCode,
      },
    });
  } catch (error) {
    console.error('login error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


