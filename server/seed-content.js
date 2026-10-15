import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Project from './models/Project.js';
import Post from './models/Post.js';

dotenv.config();

const projects = [
  {
    title: 'Sample Project: 10 kW Residential Solar, Faisalabad',
    slug: 'sample-10kw-residential-solar-faisalabad',
    capacity: '10 kW',
    sector: 'Residential',
    systemType: 'On-grid',
    city: 'Faisalabad',
    images: [],
    description: 'Sample content. A rooftop on-grid solar system sized to a household load. Replace with a real project when available.',
  },
  {
    title: 'Sample Project: 250 kW Factory Rooftop Solar, Lahore',
    slug: 'sample-250kw-factory-rooftop-solar-lahore',
    capacity: '250 kW',
    sector: 'Industrial',
    systemType: 'On-grid',
    city: 'Lahore',
    images: [],
    description: 'Sample content. A factory rooftop system designed to cut daytime grid consumption. Replace with a real project when available.',
  },
  {
    title: 'Sample Project: EV Charging Hub with BESS, Islamabad',
    slug: 'sample-ev-charging-hub-bess-islamabad',
    capacity: '120 kW',
    sector: 'EV',
    systemType: 'Hybrid',
    city: 'Islamabad',
    images: [],
    description: 'Sample content. AC and DC chargers supported by battery storage for peak shaving. Replace with a real project when available.',
  },
];

const posts = [
  {
    title: 'What is Net Metering and How Does It Work?',
    slug: 'what-is-net-metering',
    category: 'Solar',
    coverImage: '',
    content: 'Net metering lets a solar owner send extra electricity to the grid and receive credit for it. The meter tracks what you export and what you import, and your bill reflects the difference. Rules, rates and approval steps are set by the authorities and can change, so always check the current policy before you design or buy a system.',
  },
  {
    title: 'AC vs DC EV Charging: Which Do You Need?',
    slug: 'ac-vs-dc-ev-charging',
    category: 'EV Charging',
    coverImage: '',
    content: 'AC chargers, usually 7 to 22 kW, are slower and suit homes, offices and parking areas where a car stays for hours. DC fast chargers deliver much more power and suit fuel stations, highways and fleets that need quick turnaround. The right choice depends on how long vehicles stay and how much grid capacity you have.',
  },
  {
    title: 'What is BESS and Why Add Batteries to Solar?',
    slug: 'what-is-bess',
    category: 'BESS',
    coverImage: '',
    content: 'A Battery Energy Storage System stores energy and releases it when needed. It can give backup power, store extra solar energy for the evening, and reduce peak demand charges. Sizing depends on your load pattern and what you want the battery to do.',
  },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  await Project.deleteMany({});
  await Post.deleteMany({});
  await Project.insertMany(projects);
  await Post.insertMany(posts);
  console.log('Content seed done: 3 projects, 3 posts');
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});