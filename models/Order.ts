import mongoose, { Schema, model, models } from 'mongoose';

const OrderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String },
});

const OrderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        orderItems: [OrderItemSchema],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, default: false },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
            default: 'Pending',
        },
    },
    { timestamps: true }
);

const Order = models.Order || model('Order', OrderSchema);

export default Order;
