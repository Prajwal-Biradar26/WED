import mongoose from 'mongoose';

const weddingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Couple Details
    brideName: {
      type: String,
      required: [true, 'Bride name is required'],
      trim: true,
    },
    groomName: {
      type: String,
      required: [true, 'Groom name is required'],
      trim: true,
    },
    brideParents: {
      type: String,
      default: '',
      trim: true,
    },
    groomParents: {
      type: String,
      default: '',
      trim: true,
    },
    brideBio: {
      type: String,
      default: '',
      trim: true,
    },
    groomBio: {
      type: String,
      default: '',
      trim: true,
    },
    bridePhoto: {
      type: String,
      default: '',
    },
    groomPhoto: {
      type: String,
      default: '',
    },
    couplePhoto: {
      type: String,
      default: '',
    },

    // Wedding Details
    weddingDate: {
      type: Date,
      required: [true, 'Wedding date is required'],
    },
    weddingTime: {
      type: String,
      default: '10:30 AM',
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      default: 'Karnataka',
      trim: true,
    },
    country: {
      type: String,
      default: 'India',
      trim: true,
    },
    weddingHashtag: {
      type: String,
      default: '',
      trim: true,
    },
    weddingDescription: {
      type: String,
      default: 'Two souls, one sacred journey. Join us as we tie the knot surrounded by the blessings of family, friends, and elders.',
    },
    language: {
      type: String,
      enum: ['en', 'hi', 'kn'],
      default: 'en',
    },

    // Template Selection
    template: {
      type: String,
      enum: [
        'traditional-royal',
        'south-indian-temple',
        'marigold-celebration',
        'royal-rajasthani',
        'elegant-floral',
        'minimal-traditional',
      ],
      default: 'traditional-royal',
    },

    // Publishing and URL
    status: {
      type: String,
      enum: ['draft', 'published', 'unpublished'],
      default: 'draft',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Content
    welcomeMessage: {
      type: String,
      default: 'With the blessings of our parents and elders, we invite you to join us as we begin a beautiful new chapter of our lives.',
    },
    closingMessage: {
      type: String,
      default: 'Your love, prayers, and gracious presence will make our wedding day truly memorable and blessed.',
    },

    // Background Music
    musicUrl: {
      type: String,
      default: '/audio/traditional-shehnai.mp3',
    },
    musicTitle: {
      type: String,
      default: 'Auspicious Shehnai Melodies',
    },
    musicAutoplay: {
      type: Boolean,
      default: true,
    },

    // Cinematic Video & Live Stream
    cinematicVideoUrl: {
      type: String,
      default: '',
    },
    liveStreamUrl: {
      type: String,
      default: '',
    },

    // Optional Digital Gift / Shagun
    giftInfo: {
      enabled: { type: Boolean, default: false },
      title: { type: String, default: 'Your Presence Is Our Greatest Gift' },
      message: { type: String, default: 'No presents please, only your blessings and love are requested.' },
      upiId: { type: String, default: '' },
      qrCodeImage: { type: String, default: '' },
      bankDetails: { type: String, default: '' },
    },

    // Theme Customization
    themeSettings: {
      primaryColor: { type: String, default: '#580D1A' }, // Royal Maroon
      accentColor: { type: String, default: '#D4AF37' },  // Antique Gold
      fontStyle: { type: String, default: 'serif' },
      decorativeStyle: { type: String, default: 'mandala' },
    },
  },
  {
    timestamps: true,
  }
);

const Wedding = mongoose.model('Wedding', weddingSchema);
export default Wedding;
