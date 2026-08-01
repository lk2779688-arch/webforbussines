import mongoose from 'mongoose';

const requirementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: String, required: true },
  location: { type: String, required: true },
  deadline: Date,
  images: [String],
  contactNumber: String,
  whatsappNumber: String,
  status: { type: String, enum: ['open', 'closed', 'flagged'], default: 'open' },
  isSpam: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Requirement', requirementSchema);