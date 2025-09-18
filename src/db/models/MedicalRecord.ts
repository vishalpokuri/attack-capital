import mongoose from "mongoose";
const { Schema } = mongoose;

const MedicalRecordSchema = new mongoose.Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  visitDate: { type: Date, default: Date.now },
  assignedDoctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  notes: String,
});

const MedicalRecord =
  mongoose.models.MedicalRecord ||
  mongoose.model("MedicalRecord", MedicalRecordSchema);

export default MedicalRecord;
