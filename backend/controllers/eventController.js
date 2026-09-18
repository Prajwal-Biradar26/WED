import Event from '../models/Event.js';
import Wedding from '../models/Wedding.js';
import { generateGoogleMapsUrl, generateGoogleDirectionsUrl } from '../utils/mapsUtils.js';

// @desc    Get all events for a wedding
// @route   GET /api/wedding/:weddingId/events
// @access  Public
export const getEventsByWedding = async (req, res) => {
  try {
    const events = await Event.find({ weddingId: req.params.weddingId }).sort({ order: 1, date: 1 });
    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create an event
// @route   POST /api/wedding/:weddingId/events
// @access  Private
export const createEvent = async (req, res) => {
  try {
    const { weddingId } = req.params;
    const wedding = await Wedding.findOne({ _id: weddingId, userId: req.user._id });
    if (!wedding) {
      return res.status(403).json({ success: false, message: 'Unauthorized to add events to this wedding' });
    }

    const {
      name,
      description,
      date,
      startTime,
      endTime,
      dressCode,
      venueName,
      venueAddress,
      image,
      video,
      isVisible,
      order,
    } = req.body;

    if (!name || !date) {
      return res.status(400).json({ success: false, message: 'Event name and date are required' });
    }

    const googleMapsUrl = generateGoogleMapsUrl(venueName, venueAddress) || '';
    const googleDirectionsUrl = generateGoogleDirectionsUrl(venueName, venueAddress) || '';

    const event = await Event.create({
      weddingId,
      name,
      description,
      date,
      startTime,
      endTime,
      dressCode,
      venueName,
      venueAddress,
      googleMapsUrl,
      googleDirectionsUrl,
      image,
      video,
      isVisible: isVisible !== undefined ? isVisible : true,
      order: order || 0,
    });

    res.status(201).json({ success: true, message: 'Event added successfully', data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Verify ownership
    const wedding = await Wedding.findOne({ _id: event.weddingId, userId: req.user._id });
    if (!wedding) {
      return res.status(403).json({ success: false, message: 'Unauthorized to edit this event' });
    }

    const updates = { ...req.body };
    if (updates.venueName !== undefined || updates.venueAddress !== undefined) {
      const venueName = updates.venueName !== undefined ? updates.venueName : event.venueName;
      const venueAddress = updates.venueAddress !== undefined ? updates.venueAddress : event.venueAddress;
      updates.googleMapsUrl = generateGoogleMapsUrl(venueName, venueAddress) || '';
      updates.googleDirectionsUrl = generateGoogleDirectionsUrl(venueName, venueAddress) || '';
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: 'Event updated successfully', data: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const wedding = await Wedding.findOne({ _id: event.weddingId, userId: req.user._id });
    if (!wedding) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
