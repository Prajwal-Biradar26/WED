import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wedding',
      required: true,
    },
    url: {
      type: String,
      required: [true, 'Media URL is required'],
    },
    publicId: {
      type: String,
      default: '',
    },
    mediaType: {
      type: String,
      enum: ['image', 'video', 'audio'],
      default: 'image',
    },
    category: {
      type: String,
      enum: ['couple', 'pre-wedding', 'engagement', 'family', 'preparation', 'events', 'other'],
      default: 'couple',
    },
    title: {
      type: String,
      default: '',
      trim: true,
    },
    isHero: {
      type: Boolean,
      default: false,
    },
    isGallery: {
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

const Media = mongoose.model('Media', mediaSchema);
export default Media;
