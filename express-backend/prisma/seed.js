const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const password = 'Admin@123';
  const hash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { userid: 'admin@school' },
    update: {},
    create: {
      userid: 'admin@school',
      passwordHash: hash,
      role: 'admin',
      name: 'System Administrator',
      email: 'admin@school.com',
      phone: '+911234567890',
      aadhaar: null
    }
  });

  console.log('Created admin user:', admin.userid, 'password:', password);

  // Create sample faculty
  const fpass = await bcrypt.hash('Faculty@123', 10);
  const facultyUser = await prisma.user.create({
    data: {
      userid: 'f1@school',
      passwordHash: fpass,
      role: 'faculty',
      name: 'Prof. Anjali',
      email: 'anjali@school.com',
      phone: '+911111111111'
    }
  });
  await prisma.faculty.create({ data: { userId: facultyUser.id, subjects: ['Math'], classAssigned: ['10A'], totalLectures: 120 } });

  // Create sample student
  const spass = await bcrypt.hash('Student@123', 10);
  const studentUser = await prisma.user.create({
    data: {
      userid: 's1@school',
      passwordHash: spass,
      role: 'student',
      name: 'Rahul Sharma',
      email: 'rahul@school.com',
      phone: '+919999999999'
    }
  });
  await prisma.student.create({ data: { userId: studentUser.id, admissionNo: 'ADM001', class: '10', section: 'A', rollNo: 12 } });

  console.log('Seed data created');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
