import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import leadRoutes from './routes/leads.js';
import { crudRouter } from './utils/crud.js';
import Service from './models/Service.js';
import Course from './models/Course.js';
import Batch from './models/Batch.js';
import Project from './models/Project.js';
import Post from './models/Post.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/services', crudRouter(Service, { sort: 'order' }));
app.use('/api/courses', crudRouter(Course));
app.use('/api/batches', crudRouter(Batch, { populate: 'course', sort: 'startDate' }));
app.use('/api/projects', crudRouter(Project));
app.use('/api/posts', crudRouter(Post, { sort: '-publishedAt' }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('DB error:', err.message));
