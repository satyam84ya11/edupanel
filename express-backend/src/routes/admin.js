const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

// Admin-only create user (auto generate userid and password)
router.post('/users', auth, requireRole('admin'), async (req, res) => {
  try {
    const { role, name, phone, email, aadhaar, extra } = req.body;
    if (!role || !name) return res.status(400).json({ error: 'role and name required' });

    // generate simple userid and password
    const uidPrefix = role === 'student' ? 's' : role === 'faculty' ? 't' : role === 'staff' ? 'st' : role === 'parent' ? 'p' : 'u';
    const random = Math.floor(Math.random() * 9000) + 1000;
    const userid = `${uidPrefix}${random}@${email ? email.split('@')[1] : 'school'}`;
    const password = `${role}@${random}`;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        userid,
        passwordHash,
        role,
        name,
        phone,
        email,
        aadhaar: aadhaar || null,
        meta: extra || null
      }
    });

    // create profile rows as needed
    if (role === 'student') {
      await prisma.student.create({ data: { userId: user.id, admissionNo: `ADM${random}`, class: (extra && extra.class) || '1' } });
    }
    if (role === 'faculty') {
      await prisma.faculty.create({ data: { userId: user.id, subjects: (extra && extra.subjects) || [], classAssigned: (extra && extra.classAssigned) || [] } });
    }
    if (role === 'staff') {
      await prisma.staff.create({ data: { userId: user.id, designation: (extra && extra.designation) || 'peon' } });
    }

    // audit log
    await prisma.auditLog.create({ data: { actorId: req.user.id, action: 'create_user', targetType: 'user', targetId: user.id, meta: { createdUserid: userid } } });

    res.status(201).json({ user: { id: user.id, userid: user.userid, role: user.role, name: user.name }, credentials: { userid, password } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin reset password
router.post('/users/:id/reset-password', auth, requireRole('admin'), async (req, res) => {
  try {
    const userId = req.params.id;
    const { newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ error: 'newPassword required' });

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });

    await prisma.auditLog.create({ data: { actorId: req.user.id, action: 'reset_password', targetType: 'user', targetId: userId } });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
