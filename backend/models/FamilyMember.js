import mongoose from 'mongoose';

const familyMemberSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wedding',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Family member name is required'],
      trim: true,
    },
    relationship: {
      type: String,
      required: [true, 'Relationship is required'],
      trim: true,
    },
    side: {
      type: String,
      enum: ['bride', 'groom', 'both'],
      default: 'both',
    },
    photo: {
      type: String,
      default: '',
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

const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);
export default FamilyMember;
