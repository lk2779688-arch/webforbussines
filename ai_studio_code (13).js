import User from '../models/User.js';

export const getMe = async (req, res) => {
  try {
    let user = await User.findOne({ firebaseId: req.user.uid });
    if (!user) {
      // Create profile if first time
      user = await User.create({
        firebaseId: req.user.uid,
        email: req.user.email || '',
        fullName: req.user.name || 'New User',
        profilePicture: req.user.picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { firebaseId: req.user.uid },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};