import mongoose from 'mongoose';

const LibraryHistorySchema = new mongoose.Schema({
  studentID: {
    type: String, 
    required: true
  },
  bookId: {
    type: String,
    required: true
  },
  borrowedDate: {
    type: Date,
    default: Date.now
  },
  returnDate: {
    type: Date,
    default: null 
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned'],
    required: true
  }
}, {
  timestamps: true 
});

export default mongoose.model('LibraryHistory', LibraryHistorySchema);
