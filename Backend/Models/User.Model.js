import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    companyType: {
        type: String,
        enum: ['cafe', 'general store', 'hotel', 'supermarket', 'restaurant'],
        required: true
    },
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ['customer', 'owner'], default: 'customer' },
    ABN: { type: String, required: true }, 
    notes: { type: String },
    lastLogin: { type: Date },
    deliveryAddresses: [
        {
            address: { type: String, required: true },
            city: { type: String },
            state: { type: String },
            postalCode: { type: String },
            country: { type: String, default: 'Australia' },
            isPrimary: { type: Boolean, default: false }
        }
    ],
    companyContacts: [
        {
            name: { type: String, required: true },
            phoneNumber: { type: String },
            email: { type: String },
            position: { type: String }
        }
    ],
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
});

// Middleware to automatically update the 'modified' field on save
UserSchema.pre('save', function (next) {
    this.modified = Date.now();
    next();
});

export default mongoose.model('User', UserSchema);
