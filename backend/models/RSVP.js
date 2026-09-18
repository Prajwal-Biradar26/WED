import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wedding',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      trim: true,
    },
    attending: {
      type: String,
      enum: ['attending', 'declined'],
      required: [true, 'Please select your attendance status'],
    },
    guestsCount: {
      type: Number,
      default: 1,
      min: 1,
    },
    foodPreference: {
      type: String,
      enum: ['vegetarian', 'non-vegetarian', 'jain', 'other'],
      default: 'vegetarian',
    },
    eventsAttending: [
      {
        type: String,
      },
    ],
    message: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate RSVP for same wedding with same phone
rsvpSchema.index({ weddingId: 1, phone: 1 }, { unique: true });

const RSVP = mongoose.model('RSVP', rsvpSchema);
export default RSVP;
