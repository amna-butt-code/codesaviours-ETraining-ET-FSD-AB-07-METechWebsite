import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    city: { type: String, default: '' },
    service: { type: String, default: '' },
    message: { type: String, default: '' },
    source: { type: String, enum: ['contact', 'quote'], default: 'contact' },
    status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
