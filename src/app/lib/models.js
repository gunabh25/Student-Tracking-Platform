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
    admissionNumber:{
      type: String,
      required: true,
      unique: true,
    },
    rollNumber:{
      type: Number,
      required: true,
      unique: true,
    },
    branch: {
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
  },
  { timestamps: true }
);

// Exporting the models
export const User = mongoose.models.User || mongoose.model("User", userSchema); 
// export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
// export const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
// export const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);