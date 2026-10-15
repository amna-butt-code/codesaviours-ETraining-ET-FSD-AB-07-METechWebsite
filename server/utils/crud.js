import { Router } from 'express';
import { protect } from '../middleware/auth.js';

const isId = (v) => /^[0-9a-fA-F]{24}$/.test(v);

export function crudRouter(Model, { populate = '', sort = '-createdAt' } = {}) {
  const router = Router();

  router.get('/', async (req, res) => {
    let q = Model.find().sort(sort);
    if (populate) q = q.populate(populate);
    res.json(await q);
  });

  router.get('/:key', async (req, res) => {
    const filter = isId(req.params.key) ? { _id: req.params.key } : { slug: req.params.key };
    let q = Model.findOne(filter);
    if (populate) q = q.populate(populate);
    const item = await q;
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  });

  router.post('/', protect, async (req, res) => {
    try {
      res.status(201).json(await Model.create(req.body));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.put('/:id', protect, async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.delete('/:id', protect, async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  });

  return router;
}
