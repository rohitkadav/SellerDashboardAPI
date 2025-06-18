import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: String,            // e.g., CREATE_SALE
  entity: String,            // e.g., "Sale"
  entityId: mongoose.Schema.Types.ObjectId,
  performedBy: String,       // user ID or role
  timestamp: { type: Date, default: Date.now },
  details: mongoose.Schema.Types.Mixed // additional data
});

export default mongoose.model('AuditLog', auditLogSchema);
