import Story from '../models/Story.js';
import Wedding from '../models/Wedding.js';

export const getStoryMilestones = async (req, res) => {
  try {
    const story = await Story.find({ weddingId: req.params.weddingId }).sort({ order: 1 });
    res.json({ success: true, count: story.length, data: story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createStoryMilestone = async (req, res) => {
  try {
    const { weddingId } = req.params;
    const wedding = await Wedding.findOne({ _id: weddingId, userId: req.user._id });
    if (!wedding) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const { title, date, description, photo, video, order } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const milestone = await Story.create({
      weddingId,
      title,
      date,
      description,
      photo,
      video,
      order: order || 0,
    });

    res.status(201).json({ success: true, message: 'Milestone created', data: milestone });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStoryMilestone = async (req, res) => {
  try {
    const milestone = await Story.findById(req.params.id);
    if (!milestone) return res.status(404).json({ success: false, message: 'Milestone not found' });

    const wedding = await Wedding.findOne({ _id: milestone.weddingId, userId: req.user._id });
    if (!wedding) return res.status(403).json({ success: false, message: 'Unauthorized' });

    const updated = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Milestone updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStoryMilestone = async (req, res) => {
  try {
    const milestone = await Story.findById(req.params.id);
    if (!milestone) return res.status(404).json({ success: false, message: 'Milestone not found' });

    const wedding = await Wedding.findOne({ _id: milestone.weddingId, userId: req.user._id });
    if (!wedding) return res.status(403).json({ success: false, message: 'Unauthorized' });

    await Story.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Milestone deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
