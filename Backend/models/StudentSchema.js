import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
 ID:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  address: {
    house: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  contact: {
     type: String, required: true 
  
  },
  fatherName:{type: String, required: true},
  motherName:{type: String, required: true},

  guardian: {
    name: { type: String, required: true },
    relation: { type: String, required: true },
    phone: { type: String, required: true },
    
  }
});

export default mongoose.model('Student', studentSchema);
