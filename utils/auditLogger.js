import AuditLog from '../models/AuditLogs.js';

export const logActivity = async ({ action, entity, entityId, user, details = {} }) => {
  try {
    await AuditLog.create({
      action,
      entity,
      entityId,
      performedBy: user,
      details
    });
  } catch (err) {
    console.error("Audit log failed:", err.message);
  }
};
