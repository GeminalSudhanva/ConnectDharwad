const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old public data...');
  await prisma.trainer.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.client.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.event.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.job.deleteMany();
  await prisma.galleryItem.deleteMany();

  console.log('Seeding statistics...');
  await prisma.stat.createMany({
    data: [
      { key: 'students', value: 228984, suffix: '+', label: 'Students', order: 1 },
      { key: 'employees', value: 523197, suffix: '+', label: 'Employees Trained', order: 2 },
      { key: 'teachers', value: 44607, suffix: '+', label: 'Teachers', order: 3 },
      { key: 'placement', value: 30231, suffix: '+', label: 'Placements', order: 4 },
      { key: 'udyog_utsavs', value: 61, suffix: '+', label: 'Udyog Utsavs / Melas', order: 5 },
      { key: 'companies', value: 113, suffix: '+', label: 'Companies', order: 6 },
      { key: 'csr', value: 20623, suffix: '+', label: 'CSR', order: 7 },
      { key: 'rural_reach', value: 1647, suffix: '+', label: 'Under Rural Reach', order: 8 },
    ],
  });

  console.log('Seeding trainers...');
  await prisma.trainer.createMany({
    data: [
      { name: 'Girish Angadi', role: 'Founder & MD, Human Resource Expert & Corporate Trainer', order: 1, bio: 'Human Resource Expert and veteran Corporate Trainer leading Connect Dharwad.' },
      { name: 'Nagendrappa S', role: 'Co-founder & Executive Director, Soft Skill Trainer', order: 2, bio: 'Co-founder and lead Soft Skill Trainer.' },
      { name: 'J Reghupathi', role: 'Co-Founder, Soft Skill Trainer', order: 3 },
      { name: 'Mahesh Masal', role: 'Life Coach', order: 4 },
      { name: 'Mrs. Smitha Angadi', role: 'Soft Skill Trainer', order: 5 },
      { name: 'Om Kulkarni', role: 'Soft Skill Trainer', order: 6 },
      { name: 'Mrs. Shashikala Hiremath', role: 'Soft Skill Trainer', order: 7 },
      { name: 'Dr. Shobhana S S', role: 'Soft Skill Trainer', order: 8 },
      { name: 'Satya Sagar', role: 'Corporate Trainer', order: 9 },
      { name: 'Chidanand Sanyappagol', role: 'Soft Skill Trainer', order: 10 },
      { name: 'Mrs. Renuka S Masur', role: 'Soft Skill Trainer', order: 11 },
      { name: 'Dr. N. Aiyavoo', role: 'Ex Director of ISRO, Advisory Board', order: 12 },
      { name: 'Mrs. Deepa G Khot', role: 'Language Trainer', order: 13 },
      { name: 'Tejal Naik', role: 'Language Trainer', order: 14 },
      { name: 'Ajit Kakati', role: 'Behavioural Trainer', order: 15 },
      { name: 'Dr. M. Mahanthgoudar', role: 'Ex Director HESCOM, Advisor Power sector', order: 16 },
      { name: 'Mrs. Rohini S', role: 'Soft Skill Trainer', order: 17 },
      { name: 'S. S. Mulay', role: 'Soft Skill Trainer', order: 18 },
      { name: 'Augustin A. D\'souza', role: 'Language Trainer', order: 19 },
    ],
  });

  console.log('Seeding testimonials...');
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Dr. Purushottam Bung',
        role: 'Professor & Director, RVIM Bengaluru',
        quote: 'CONNECT profiling of our MBA students truly mirrors their current standing which wakes them up to standardize their skills.',
        rating: 5,
        type: 'Student',
      },
      {
        name: 'Dr. Pushkar Singh Kanwal',
        role: 'Legal Officer at Agri-industry',
        quote: 'Workshops was excellent for enhancing my skills and abilities regarding seed business in India. It is highly informative for crop failures and its management. It is very useful and required to all employees of the company etc. And, I personally feel that whoever is in Agri-business or seed business must attend this workshop.',
        rating: 5,
        type: 'Corporate',
      },
      {
        name: 'Dr. Chandrashekar Hunsihal',
        role: 'Academician',
        quote: 'Wonderful Outbound Training Programme by Connect. Amazing Learning with Fun & Adventure. Well organized & managed by Team Connect.',
        rating: 5,
        type: 'Corporate',
      },
      {
        name: 'Mr. T Jayaram',
        role: 'Senior Manager, Tata Motors',
        quote: 'Kats off to YOU & YOUR team for inspiring OUR students and staff.',
        rating: 5,
        type: 'Student',
      },
      {
        name: 'Mr. MADIVALAPPA',
        role: 'IR Manager, Toyota Auto Parts Ltd',
        quote: 'CONNECT through its ODU-GKY program, has transformed many youths & injected Soft Skills in a very interesting way. It has transformed my life.',
        rating: 5,
        type: 'Corporate',
      },
    ],
  });

  console.log('Seeding clients...');
  await prisma.client.createMany({
    data: [
      { name: 'Toyota Kirloskar Motors Ltd', order: 1 },
      { name: 'Honda', order: 2 },
      { name: 'Tata Marcopolo Ltd', order: 3 },
      { name: 'Toyota Auto Parts', order: 4 },
      { name: 'TDPS', order: 5 },
      { name: 'NTTF', order: 6 },
      { name: 'LIC', order: 7 },
      { name: 'JSW', order: 8 },
      { name: 'PwC', order: 9 },
      { name: 'Cargill', order: 10 },
      { name: 'Societe Generale', order: 11 },
      { name: 'DLF', order: 12 },
    ],
  });

  console.log('Seeding events...');
  await prisma.event.createMany({
    data: [],
  });

  console.log('Seeding announcements...');
  await prisma.announcement.createMany({
    data: [
      { title: 'CONNECT Udyog Utsav 2026', date: 'Jul 2026', description: 'Bridging the gap between North Karnataka\'s talent and leading companies. Registrations starting soon.', pinned: true },
      { title: 'Soft Skills Training Launch', date: 'Aug 2026', description: 'New batch starting for communication skills, team building, and leadership training.', pinned: false },
    ],
  });

  console.log('Seeding jobs...');
  await prisma.job.createMany({
    data: [
      { title: 'Graduate Trainee', company: 'Toyota Kirloskar Motors', location: 'Karnataka', type: 'Full-time', experience: 'Freshers', description: 'Manpower requirements for fresh engineering graduates.', active: true },
      { title: 'Associate Technical Representative', company: 'Tata Marcopolo', location: 'Dharwad', type: 'Full-time', experience: '0-2 years', description: 'Manpower recruitment for manufacturing sector.', active: true },
    ],
  });

  console.log('Seeding gallery items...');
  await prisma.galleryItem.createMany({
    data: [],
  });

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
