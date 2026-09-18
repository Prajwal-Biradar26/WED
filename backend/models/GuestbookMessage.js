import mongoose from 'mongoose';

const guestbookMessageSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wedding',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please enter your wedding blessing / message'],
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'hidden'],
      default: 'approved', // Auto-approved by default, couple can moderate/hide/delete
    },
  },
  {
    timestamps: true,
  }
);

const GuestbookMessage = mongoose.model('GuestbookMessage', guestbookMessageSchema);
export default GuestbookMessage;
