// Import all models to ensure they're registered with Mongoose
import "./Patient";
import "./Doctor";
import "./Appointment";
import "./CallLog";
import "./InvocationLog";
import "./MedicalRecord";

// Re-export for convenience
export { default as Patient } from "./Patient";
export { default as Doctor } from "./Doctor";
export { default as Appointment } from "./Appointment";
export { default as CallLog } from "./CallLog";
export { default as InvocationLog } from "./InvocationLog";
export { default as MedicalRecord } from "./MedicalRecord";
