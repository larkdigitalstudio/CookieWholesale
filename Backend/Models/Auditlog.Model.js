import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
    event: { type: String, required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    details: { type: String }, // Additional information about the event
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('AuditLog', AuditLogSchema);