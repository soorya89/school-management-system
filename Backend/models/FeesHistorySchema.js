import mongoose from "mongoose";

const FeesHistorySchema = new mongoose.Schema({
  studentID: {
    type: String, 
    required: true,
  },
  feeType: {
    type: String,
    enum: ['Tuition', 'Library', 'Lab', 'Sports', 'Other'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Overdue'],
    default: 'Paid',
  },

}, { timestamps: true });

export default mongoose.model('FeeHistory',FeesHistorySchema);
