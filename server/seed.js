import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Service from './models/Service.js';
import Course from './models/Course.js';
import Batch from './models/Batch.js';

dotenv.config();

const services = [
  { title: 'Electrical Engineering', slug: 'electrical-engineering', icon: 'zap', shortText: 'Power system design, load studies and electrical drawings.', description: 'We design and review electrical systems for homes, offices and industry, including load assessment, protection and documentation.', order: 1 },
  { title: 'Solar PV', slug: 'solar-pv', icon: 'sun', shortText: 'Solar system design, simulation and installation support.', description: 'From site survey to PVsyst simulation and installation guidance, we size solar systems that fit your load and budget.', order: 2 },
  { title: 'BESS', slug: 'bess', icon: 'battery', shortText: 'Battery energy storage for backup and peak shaving.', description: 'Battery Energy Storage Systems that cut peak demand, give backup power and work with solar.', order: 3 },
  { title: 'EV Charging', slug: 'ev-charging', icon: 'plug', shortText: 'Complete EV charging setups from grid to charger.', description: 'Load assessment, grid upgrades, BESS, solar integration and AC/DC chargers built to IEC 61851.', order: 4 },
  { title: 'Architecture and Building Design', slug: 'architecture-building-design', icon: 'building', shortText: 'Building design and planning.', description: 'Architectural planning and building design that works together with the engineering systems.', order: 5 },
  { title: 'Civil and Structural Engineering', slug: 'civil-structural-engineering', icon: 'hard-hat', shortText: 'Structural design and civil works.', description: 'Structural analysis and civil engineering for rooftops, foundations and buildings.', order: 6 },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany({ email: 'admin@metech.com' });
  await User.create({
    name: 'Admin',
    email: 'admin@metech.com',
    passwordHash: await bcrypt.hash('Admin@12345', 10),
    role: 'admin',
  });

  await Service.deleteMany({});
  await Service.insertMany(services);

  await Batch.deleteMany({});
  await Course.deleteMany({});
  const course = await Course.create({
    title: 'Online Solar Design Training Program',
    slug: 'solar-design-training',
    tools: ['PVsyst', 'SketchUp'],
    duration: '6 weeks',
    fee: 15000,
    outline: [
      'Solar PV basics and components',
      'System sizing and load analysis',
      'PVsyst simulation and performance analysis',
      'SketchUp 3D modeling and structural design',
      'Final design project',
    ],
    image: '',
  });
  await Batch.create({
    course: course._id,
    startDate: new Date('2026-11-02'),
    mode: 'Online',
    totalSeats: 30,
    seatsTaken: 0,
  });

  console.log('Seed done. Admin: admin@metech.com / Admin@12345');
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
