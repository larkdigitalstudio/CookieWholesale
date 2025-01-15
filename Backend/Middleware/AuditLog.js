import AuditLog from '../Models/AuditLog.Model.js';

const logAuditEventAsync = (event, userId, details) => {
    setImmediate(async () => {
        try {
            const auditLog = new AuditLog({
                event,
                userId,
                details: JSON.stringify(details),
            });
            await auditLog.save();
            console.log('Audit log saved successfully');
        } catch (error) {
            console.error('Error logging audit event:', error);
        }
    });
};

export default logAuditEventAsync;