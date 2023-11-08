import mongoose from "mongoose";

const filesSchema = new mongoose.Schema({
    name: String,
    path: String,
})

const schema = new mongoose.Schema({
   title: {
        type: String,
        required: [true, 'Please enter a title'],
    },
    category: {
        type: String,
        required: [true, 'Please enter a category'],
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price'],
    },
    user: {
        id: String,
        name: String,
        email: String,
        phone: String,
        image: String,
        city: String,
    },
    files: {
        type: [filesSchema],
        default: undefined,
        required: [true, 'Please add at least one file'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.products || mongoose.model('products', schema);