import mongoose from "mongoose";
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  reason: String,
});

// auto-set endTime = startTime + 60 mins
AppointmentSchema.pre("validate", function (next) {
  if (this.startTime && !this.endTime) {
    this.endTime = new Date(this.startTime.getTime() + 60 * 60 * 1000);
  }
  next();
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
