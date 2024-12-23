import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    companyID: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
   
   teacherId: {
      type: String,
      // required: true,
    },
    year: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: 'teacher',
    },
  },
  { timestamps: true }
);

const studentSchema = new mongoose.Schema(
  {
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
    companyID: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    year: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
    section: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D'],
    },
    admissionNumber:{
      type: String,
      required: true,
      unique: true,
    },
    rollNumber:{
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: 'student',
    },
    attendance: [
      {
        date: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          required: true,
          enum: ['Present', 'Absent'],
        },
      },
    ],
  },
  { timestamps: true }
);


// Exporting the models
export const User = mongoose.models.User || mongoose.model("User", userSchema); 
export const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);