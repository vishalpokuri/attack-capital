import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  medicalId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number },
  contact: { phone: String, email: String },
});

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

export default Patient;
