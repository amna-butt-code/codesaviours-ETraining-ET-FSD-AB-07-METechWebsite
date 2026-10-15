import { Router } from 'express';
import Lead from '../models/Lead.js';
import Enrollment from '../models/Enrollment.js';
import Post from '../models/Post.js';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, async (req, res) => {
  const [newLeads, enrollments, posts, projects] = await Promise.all([
    Lead.countDocuments({ status: 'New' }),
    Enrollment.countDocuments(),
    Post.countDocuments(),
    Project.countDocuments(),
  ]);
  res.json({ newLeads, enrollments, posts, projects });
});

export default router;