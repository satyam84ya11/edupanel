const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'change_this';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';

router.post('/login', async (req, res) => {
  try {
    const { userid, password } = req.body;
    if (!userid || !password) return res.status(400).json({ error: 'userid and password required' });

    const user = await prisma.user.findUnique({ where: { userid } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
    return res.json({ token, user: { id: user.id, userid: user.userid, role: user.role, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
