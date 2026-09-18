import Wedding from '../models/Wedding.js';
import Event from '../models/Event.js';
import Story from '../models/Story.js';
import Media from '../models/Media.js';
import FamilyMember from '../models/FamilyMember.js';
import GuestbookMessage from '../models/GuestbookMessage.js';
import RSVP from '../models/RSVP.js';

// Helper to create a URL-friendly slug
const generateSlug = (brideName, groomName) => {
  const base = `${brideName}-and-${groomName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base || 'wedding'}-${Date.now().toString().slice(-4)}`;
};

// @desc    Get public wedding by slug (for guest invitation page)
// @route   GET /api/wedding/public/:slug
// @access  Public
export const getPublicWeddingBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const wedding = await Wedding.findOne({ slug });

    if (!wedding || wedding.status !== 'published') {
      return res.status(404).json({ success: false, message: 'Wedding invitation not found' });
    }

    // Fetch related components concurrently
    const [events, story, media, familyMembers, guestbookMessages] = await Promise.all([
      Event.find({ weddingId: wedding._id, isVisible: true }).sort({ order: 1, date: 1 }),
      Story.find({ weddingId: wedding._id }).sort({ order: 1 }),
      Media.find({ weddingId: wedding._id }).sort({ order: 1 }),
      FamilyMember.find({ weddingId: wedding._id }).sort({ order: 1 }),
      GuestbookMessage.find({ weddingId: wedding._id, status: 'approved' }).sort({ createdAt: -1 }),
    ]);

    res.json({
      success: true,
      data: {
        wedding,
        events,
        story,
        media,
        familyMembers,
        guestbookMessages,
      },
    });
  } catch (error) {
    console.error('Error fetching public wedding:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user's weddings
// @route   GET /api/wedding/my
// @access  Private
export const getMyWeddings = async (req, res) => {
  try {
    const weddings = await Wedding.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: weddings.length, data: weddings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get wedding details by ID (Private/Admin)
// @route   GET /api/wedding/:id
// @access  Private
export const getWeddingById = async (req, res) => {
  try {
    const wedding = await Wedding.findOne({ _id: req.params.id, userId: req.user._id });
    if (!wedding) {
      return res.status(404).json({ success: false, message: 'Wedding not found or unauthorized' });
    }

    const [events, story, media, familyMembers, rsvps, guestbookMessages] = await Promise.all([
      Event.find({ weddingId: wedding._id }).sort({ order: 1, date: 1 }),
      Story.find({ weddingId: wedding._id }).sort({ order: 1 }),
      Media.find({ weddingId: wedding._id }).sort({ order: 1 }),
      FamilyMember.find({ weddingId: wedding._id }).sort({ order: 1 }),
      RSVP.find({ weddingId: wedding._id }).sort({ createdAt: -1 }),
      GuestbookMessage.find({ weddingId: wedding._id }).sort({ createdAt: -1 }),
    ]);

    // Calculate RSVP Stats
    const rsvpStats = {
      total: rsvps.length,
      attending: rsvps.filter((r) => r.attending === 'attending').length,
      declined: rsvps.filter((r) => r.attending === 'declined').length,
      totalGuests: rsvps
        .filter((r) => r.attending === 'attending')
        .reduce((sum, r) => sum + (r.guestsCount || 1), 0),
      foodPreferences: {
        vegetarian: rsvps.filter((r) => r.foodPreference === 'vegetarian').length,
        nonVegetarian: rsvps.filter((r) => r.foodPreference === 'non-vegetarian').length,
        jain: rsvps.filter((r) => r.foodPreference === 'jain').length,
        other: rsvps.filter((r) => r.foodPreference === 'other').length,
      },
    };

    res.json({
      success: true,
      data: {
        wedding,
        events,
        story,
        media,
        familyMembers,
        rsvps,
        rsvpStats,
        guestbookMessages,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new wedding invitation
// @route   POST /api/wedding
// @access  Private
export const createWedding = async (req, res) => {
  try {
    const {
      brideName,
      groomName,
      brideParents,
      groomParents,
      brideBio,
      groomBio,
      bridePhoto,
      groomPhoto,
      couplePhoto,
      weddingDate,
      weddingTime,
      city,
      state,
      country,
      weddingHashtag,
      weddingDescription,
      language,
      template,
      welcomeMessage,
      closingMessage,
      musicUrl,
      musicTitle,
      musicAutoplay,
      cinematicVideoUrl,
      liveStreamUrl,
      giftInfo,
      themeSettings,
    } = req.body;

    if (!brideName || !groomName || !weddingDate || !city) {
      return res.status(400).json({
        success: false,
        message: 'Bride Name, Groom Name, Wedding Date, and City are required',
      });
    }

    let slug = generateSlug(brideName, groomName);
    let existing = await Wedding.findOne({ slug });
    let counter = 1;
    while (existing) {
      slug = `${generateSlug(brideName, groomName)}-${counter}`;
      existing = await Wedding.findOne({ slug });
      counter++;
    }

    const wedding = await Wedding.create({
      userId: req.user._id,
      brideName,
      groomName,
      brideParents,
      groomParents,
      brideBio,
      groomBio,
      bridePhoto,
      groomPhoto,
      couplePhoto,
      weddingDate,
      weddingTime,
      city,
      state: state || 'Karnataka',
      country: country || 'India',
      weddingHashtag,
      weddingDescription,
      language: language || 'en',
      template: template || 'traditional-royal',
      status: 'draft',
      slug,
      welcomeMessage,
      closingMessage,
      musicUrl,
      musicTitle,
      musicAutoplay,
      cinematicVideoUrl,
      liveStreamUrl,
      giftInfo,
      themeSettings,
    });

    res.status(201).json({ success: true, message: 'Wedding created successfully', data: wedding });
  } catch (error) {
    console.error('Error creating wedding:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update wedding
// @route   PUT /api/wedding/:id
// @access  Private
export const updateWedding = async (req, res) => {
  try {
    let wedding = await Wedding.findOne({ _id: req.params.id, userId: req.user._id });
    if (!wedding) {
      return res.status(404).json({ success: false, message: 'Wedding not found' });
    }

    wedding = await Wedding.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: 'Wedding updated successfully', data: wedding });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Publish / Unpublish wedding
// @route   PATCH /api/wedding/:id/publish
// @access  Private
export const publishWedding = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['draft', 'published', 'unpublished'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const wedding = await Wedding.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true }
    );

    if (!wedding) {
      return res.status(404).json({ success: false, message: 'Wedding not found' });
    }

    res.json({
      success: true,
      message: `Wedding is now ${status}`,
      data: wedding,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete wedding
// @route   DELETE /api/wedding/:id
// @access  Private
export const deleteWedding = async (req, res) => {
  try {
    const wedding = await Wedding.findOne({ _id: req.params.id, userId: req.user._id });
    if (!wedding) {
      return res.status(404).json({ success: false, message: 'Wedding not found' });
    }

    await Promise.all([
      Wedding.findByIdAndDelete(wedding._id),
      Event.deleteMany({ weddingId: wedding._id }),
      Story.deleteMany({ weddingId: wedding._id }),
      Media.deleteMany({ weddingId: wedding._id }),
      FamilyMember.deleteMany({ weddingId: wedding._id }),
      RSVP.deleteMany({ weddingId: wedding._id }),
      GuestbookMessage.deleteMany({ weddingId: wedding._id }),
    ]);

    res.json({ success: true, message: 'Wedding and all related data deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
