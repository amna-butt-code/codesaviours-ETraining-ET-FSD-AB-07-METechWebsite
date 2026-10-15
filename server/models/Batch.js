import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    startDate: { type: Date, required: true },
    mode: { type: String, default: 'Online' },
    totalSeats: { type: Number, required: true },
    seatsTaken: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Batch', batchSchema);
