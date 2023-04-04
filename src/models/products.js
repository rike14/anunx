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
    description: {
        type: String,
        required: [true, 'Please enter a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price'],
    },
    category: {
        type: String,
        required: [true, 'Please enter a category'],
    },
    user: {
        id: String,
        name: String,
        email: String,
        phone: String,
        Image: String,
    },
    files: {
        type: [filesSchema],
        default: undefined,
        required: [true, 'Please add at least one file'],
    }
});

export default mongoose.models.products || mongoose.model('products', schema);