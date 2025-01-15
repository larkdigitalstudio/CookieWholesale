import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    costPrice: { type: Number},
    imageURL: { type: String },
    created: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

export default mongoose.model('Product', ProductSchema);
