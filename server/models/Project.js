import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    capacity: { type: String, default: '' },
    sector: { type: String, default: '' },
    systemType: { type: String, default: '' },
    city: { type: String, default: '' },
    images: [String],
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
