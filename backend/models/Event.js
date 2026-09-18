import mongoose from 'mongoose';
import { generateGoogleMapsUrl, generateGoogleDirectionsUrl } from '../utils/mapsUtils.js';

const eventSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wedding',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    startTime: {
      type: String,
      default: '',
      trim: true,
    },
    endTime: {
      type: String,
      default: '',
      trim: true,
    },
    dressCode: {
      type: String,
      default: 'Traditional Indian Festive',
      trim: true,
    },
    venueName: {
      type: String,
      default: '',
      trim: true,
    },
    venueAddress: {
      type: String,
      default: '',
      trim: true,
    },
    googleMapsUrl: {
      type: String,
      default: '',
    },
    googleDirectionsUrl: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    video: {
      type: String,
      default: '',
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically generate Google Maps and Directions URLs before saving
eventSchema.pre('save', function (next) {
  if (this.venueName || this.venueAddress) {
    this.googleMapsUrl = generateGoogleMapsUrl(this.venueName, this.venueAddress) || '';
    this.googleDirectionsUrl = generateGoogleDirectionsUrl(this.venueName, this.venueAddress) || '';
  } else {
    this.googleMapsUrl = '';
    this.googleDirectionsUrl = '';
  }
  next();
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
