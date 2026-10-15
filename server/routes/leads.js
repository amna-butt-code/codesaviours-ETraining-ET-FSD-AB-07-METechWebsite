import { Router } from 'express';
import { z } from 'zod';
import Lead from '../models/Lead.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name is required'),
  phone: z.string().trim().min(7, 'A valid phone number is required'),
  email: z.string().trim().email('Invalid email').optional().or(z.literal('')),
  city: z.string().trim().optional(),
  service: z.string().trim().optional(),
  message: z.string().trim().max(1000, 'Message is too long').optional(),
  source: z.enum(['contact', 'quote']).optional(),
});

router.post('/', async (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues.map((i) => i.message).join(', ') });
  }
  const lead = await Lead.create(parsed.data);
  res.status(201).json({ message: 'Thank you! We will contact you soon.', id: lead._id });
});

router.get('/', protect, async (req, res) => {
  const { status, q } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (q) {
    const rx = new RegExp(String(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [{ name: rx }, { phone: rx }, { email: rx }, { city: rx }];
  }
  res.json(await Lead.find(filter).sort('-createdAt'));
});

router.put('/:id', protect, async (req, res) => {
  const parsed = z.object({ status: z.enum(['New', 'Contacted', 'Closed']) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid status' });
  const lead = await Lead.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!lead) return res.status(404).json({ message: 'Not found' });
  res.json(lead);
});

router.delete('/:id', protect, async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;