import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tools: [String],
    duration: { type: String, default: '' },
    fee: { type: Number, default: 0 },
    outline: [String],
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
