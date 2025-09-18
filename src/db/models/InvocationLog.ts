import mongoose from "mongoose";

const InvocationLogSchema = new mongoose.Schema({
  // Request details
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  requestBody: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },

  // Response details
  statusCode: { type: Number, required: true },
  responseBody: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  timestamp: { type: Date, default: Date.now },

  // Error details (if any)
  errorMessage: String,
  category: String, // pre-call, post-call, patient-lookup, appointment-booking
});

const InvocationLog =
  mongoose.models.InvocationLog ||
  mongoose.model("InvocationLog", InvocationLogSchema);

export default InvocationLog;
