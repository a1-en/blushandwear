import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        images: [{ type: String }],
        inStock: { type: Boolean, default: true },
        stockCount: { type: Number, default: 0 },
        brand: { type: String },
    },
    { timestamps: true }
);

const Product = models.Product || model('Product', ProductSchema);

export default Product;
