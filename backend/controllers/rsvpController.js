import RSVP from '../models/RSVP.js';
import Wedding from '../models/Wedding.js';

// @desc    Submit public RSVP response
// @route   POST /api/rsvp
// @access  Public
export const submitRSVP = async (req, res) => {
  try {
    const { weddingId, name, phone, attending, guestsCount, foodPreference, eventsAttending, message } = req.body;

    if (!weddingId || !name || !phone || !attending) {
      return res.status(400).json({
        success: false,
        message: 'Wedding ID, Name, Phone, and Attendance status are required',
      });
    }

    // Check if wedding exists
    const wedding = await Wedding.findById(weddingId);
    if (!wedding) {
      return res.status(404).json({ success: false, message: 'Wedding invitation not found' });
    }

    // Upsert or update RSVP by phone number to handle duplicate submissions gracefully
    let rsvp = await RSVP.findOne({ weddingId, phone: phone.trim() });
    if (rsvp) {
      rsvp.name = name.trim();
      rsvp.attending = attending;
      rsvp.guestsCount = attending === 'attending' ? Number(guestsCount) || 1 : 1;
      rsvp.foodPreference = foodPreference || 'vegetarian';
      rsvp.eventsAttending = eventsAttending || [];
      rsvp.message = message || '';
      await rsvp.save();
      return res.json({
        success: true,
        message: 'Your RSVP response has been updated. Thank you! 🙏',
        data: rsvp,
      });
    }

    rsvp = await RSVP.create({
      weddingId,
      name: name.trim(),
      phone: phone.trim(),
      attending,
      guestsCount: attending === 'attending' ? Number(guestsCount) || 1 : 1,
      foodPreference: foodPreference || 'vegetarian',
      eventsAttending: eventsAttending || [],
      message: message || '',
    });

    res.status(201).json({
      success: true,
      message: 'Your RSVP has been joyfully received! We look forward to celebrating together. 🙏❤️',
      data: rsvp,
    });
  } catch (error) {
    console.error('RSVP submission error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all RSVPs for admin dashboard
// @route   GET /api/wedding/:weddingId/rsvps
// @access  Private
export const getAdminRSVPs = async (req, res) => {
  try {
    const { weddingId } = req.params;
    const wedding = await Wedding.findOne({ _id: weddingId, userId: req.user._id });
    if (!wedding) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const { attending, food, search } = req.query;
    const query = { weddingId };

    if (attending) query.attending = attending;
    if (food) query.foodPreference = food;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const rsvps = await RSVP.find(query).sort({ createdAt: -1 });

    // Aggregate stats across all RSVPs for this wedding
    const allRsvps = await RSVP.find({ weddingId });
    const stats = {
      total: allRsvps.length,
      attending: allRsvps.filter((r) => r.attending === 'attending').length,
      declined: allRsvps.filter((r) => r.attending === 'declined').length,
      expectedGuests: allRsvps
        .filter((r) => r.attending === 'attending')
        .reduce((sum, r) => sum + (r.guestsCount || 1), 0),
      foodPreferences: {
        vegetarian: allRsvps.filter((r) => r.foodPreference === 'vegetarian').length,
        nonVegetarian: allRsvps.filter((r) => r.foodPreference === 'non-vegetarian').length,
        jain: allRsvps.filter((r) => r.foodPreference === 'jain').length,
        other: allRsvps.filter((r) => r.foodPreference === 'other').length,
      },
    };

    res.json({
      success: true,
      stats,
      count: rsvps.length,
      data: rsvps,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Export RSVPs as CSV
// @route   GET /api/wedding/:weddingId/rsvps/export
// @access  Private
export const exportRSVPsCSV = async (req, res) => {
  try {
    const { weddingId } = req.params;
    const wedding = await Wedding.findOne({ _id: weddingId, userId: req.user._id });
    if (!wedding) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const rsvps = await RSVP.find({ weddingId }).sort({ createdAt: -1 });

    const headers = ['Name', 'Phone', 'Attending', 'Guests Count', 'Food Preference', 'Events Attending', 'Message', 'Submitted At'];
    const rows = rsvps.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.phone.replace(/"/g, '""')}"`,
      r.attending,
      r.guestsCount,
      r.foodPreference,
      `"${(r.eventsAttending || []).join(', ').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      r.createdAt ? new Date(r.createdAt).toISOString() : '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="wedding-rsvps-${wedding.slug || 'export'}.csv"`
    );
    res.status(200).send(csvContent);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete an RSVP
// @route   DELETE /api/rsvps/:id
// @access  Private
export const deleteRSVP = async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.id);
    if (!rsvp) return res.status(404).json({ success: false, message: 'RSVP not found' });

    const wedding = await Wedding.findOne({ _id: rsvp.weddingId, userId: req.user._id });
    if (!wedding) return res.status(403).json({ success: false, message: 'Unauthorized' });

    await RSVP.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'RSVP deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
