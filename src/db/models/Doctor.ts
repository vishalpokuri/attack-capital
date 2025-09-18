import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: String,
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);

export default Doctor;
