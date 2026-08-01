import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseId: { type: String, required: true, unique: true },
  fullName: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  whatsappNumber: String,
  profilePicture: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
  businessName: String,
  businessCategory: String,
  bio: String,
  address: String,
  city: String,
  state: String,
  country: String,
  socialLinks: {
    website: String,
    instagram: String,
    facebook: String,
    linkedin: String,
    youtube: String,
    telegram: String,
    github: String,
    portfolio: String
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);