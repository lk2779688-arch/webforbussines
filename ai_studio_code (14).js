import Requirement from '../models/Requirement.js';
import { improveDescription, detectSpam } from '../utils/aiHelper.js';

export const createRequirement = async (req, res) => {
  try {
    const { title, description, category, budget, location, aiEnhance } = req.body;
    const user = await User.findOne({ firebaseId: req.user.uid });

    let finalDescription = description;
    if (aiEnhance) {
        finalDescription = await improveDescription(description);
    }

    const isSpam = await detectSpam(title + " " + description);

    const requirement = new Requirement({
      user: user._id,
      title,
      description: finalDescription,
      category,
      budget,
      location,
      isSpam
    });

    await requirement.save();
    res.status(201).json(requirement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequirements = async (req, res) => {
  try {
    const { category, search, location } = req.query;
    let query = { isSpam: false, status: 'open' };

    if (category) query.category = category;
    if (location) query.location = new RegExp(location, 'i');
    if (search) query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
    ];

    const requirements = await Requirement.find(query).populate('user', 'fullName profilePicture city businessName').sort({ createdAt: -1 });
    res.json(requirements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};