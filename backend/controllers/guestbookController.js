import GuestbookMessage from '../models/GuestbookMessage.js';
import Wedding from '../models/Wedding.js';

// @desc    Submit guest blessing
// @route   POST /api/guestbook
// @access  Public
export const submitBlessing = async (req, res) => {
  try {
    const { weddingId, name, message } = req.body;

    if (!weddingId || !name || !message) {
      return res.status(400).json({ success: false, message: 'Wedding ID, Name, and Blessing message are required' });
    }

    const wedding = await Wedding.findById(weddingId);
    if (!wedding) {
      return res.status(404).json({ success: false, message: 'Wedding invitation not found' });
    }

    const blessing = await GuestbookMessage.create({
      weddingId,
      name: name.trim(),
      message: message.trim(),
      status: 'approved', // Auto-approved by default for great guest experience; admin can moderate anytime
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your warm blessing and wishes! ✨🙏',
      data: blessing,
    });
  } catch (error) {
    console.error('Guestbook submission error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get approved guest blessings (for public invitation)
// @route   GET /api/wedding/:weddingId/guestbook
// @access  Public
export const getPublicBlessings = async (req, res) => {
  try {
    const blessings = await GuestbookMessage.find({
      weddingId: req.params.weddingId,
      status: 'approved',
    }).sort({ createdAt: -1 });

    res.json({ success: true, count: blessings.length, data: blessings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all blessings for admin moderation
// @route   GET /api/wedding/:weddingId/guestbook/admin
// @access  Private
export const getAdminBlessings = async (req, res) => {
  try {
    const { weddingId } = req.params;
    const wedding = await Wedding.findOne({ _id: weddingId, userId: req.user._id });
    if (!wedding) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const blessings = await GuestbookMessage.find({ weddingId }).sort({ createdAt: -1 });
    res.json({ success: true, count: blessings.length, data: blessings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Moderate guestbook message (Approve, Hide, Delete)
// @route   PATCH /api/guestbook/:id
// @access  Private
export const updateBlessingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'pending', 'hidden'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const blessing = await GuestbookMessage.findById(req.params.id);
    if (!blessing) {
      return res.status(404).json({ success: false, message: 'Blessing not found' });
    }

    const wedding = await Wedding.findOne({ _id: blessing.weddingId, userId: req.user._id });
    if (!wedding) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    blessing.status = status;
    await blessing.save();

    res.json({ success: true, message: `Blessing marked as ${status}`, data: blessing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete blessing
// @route   DELETE /api/guestbook/:id
// @access  Private
export const deleteBlessing = async (req, res) => {
  try {
    const blessing = await GuestbookMessage.findById(req.params.id);
    if (!blessing) {
      return res.status(404).json({ success: false, message: 'Blessing not found' });
    }

    const wedding = await Wedding.findOne({ _id: blessing.weddingId, userId: req.user._id });
    if (!wedding) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await GuestbookMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Blessing deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
