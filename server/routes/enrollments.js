import { Router } from 'express';
import { z } from 'zod';
import Enrollment from '../models/Enrollment.js';
import Batch from '../models/Batch.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const idField = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id');

const enrollSchema = z.object({
  name: z.string().trim().min(2, 'Name is required'),
  phone: z.string().trim().min(7, 'A valid phone number is required'),
  email: z.string().trim().email('Invalid email'),
  university: z.string().trim().optional(),
  course: idField,
  batch: idField.optional(),
});

router.post('/', async (req, res) => {
  const parsed = enrollSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues.map((i) => i.message).join(', ') });
  }
  const data = parsed.data;
  if (data.batch) {
    const batch = await Batch.findOneAndUpdate(
      { _id: data.batch, $expr: { $lt: ['$seatsTaken', '$totalSeats'] } },
      { $inc: { seatsTaken: 1 } }
    );
    if (!batch) return res.status(400).json({ message: 'This batch is full or not found' });
  }
  const enrollment = await Enrollment.create(data);
  res.status(201).json({ message: 'Enrollment received! We will contact you soon.', id: enrollment._id });
});

router.get('/', protect, async (req, res) => {
  const { status, q } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (q) {
    const rx = new RegExp(String(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [{ name: rx }, { phone: rx }, { email: rx }, { university: rx }];
  }
  res.json(await Enrollment.find(filter).populate('course batch').sort('-createdAt'));
});

router.put('/:id', protect, async (req, res) => {
  const parsed = z.object({ status: z.enum(['New', 'Contacted', 'Closed']) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid status' });
  const item = await Enrollment.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

router.delete('/:id', protect, async (req, res) => {
  const item = await Enrollment.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;