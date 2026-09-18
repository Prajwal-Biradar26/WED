import FamilyMember from '../models/FamilyMember.js';
import Wedding from '../models/Wedding.js';

export const getFamilyMembers = async (req, res) => {
  try {
    const family = await FamilyMember.find({ weddingId: req.params.weddingId }).sort({ order: 1 });
    res.json({ success: true, count: family.length, data: family });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createFamilyMember = async (req, res) => {
  try {
    const { weddingId } = req.params;
    const wedding = await Wedding.findOne({ _id: weddingId, userId: req.user._id });
    if (!wedding) return res.status(403).json({ success: false, message: 'Unauthorized' });

    const { name, relationship, side, photo, order } = req.body;
    if (!name || !relationship) {
      return res.status(400).json({ success: false, message: 'Name and relationship are required' });
    }

    const member = await FamilyMember.create({
      weddingId,
      name,
      relationship,
      side: side || 'both',
      photo: photo || '',
      order: order || 0,
    });

    res.status(201).json({ success: true, message: 'Family member added', data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFamilyMember = async (req, res) => {
  try {
    const member = await FamilyMember.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Family member not found' });

    const wedding = await Wedding.findOne({ _id: member.weddingId, userId: req.user._id });
    if (!wedding) return res.status(403).json({ success: false, message: 'Unauthorized' });

    const updated = await FamilyMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Family member updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFamilyMember = async (req, res) => {
  try {
    const member = await FamilyMember.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Family member not found' });

    const wedding = await Wedding.findOne({ _id: member.weddingId, userId: req.user._id });
    if (!wedding) return res.status(403).json({ success: false, message: 'Unauthorized' });

    await FamilyMember.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Family member deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
