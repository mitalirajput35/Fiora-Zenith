const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        overall: {
            type: String,
            required: [true, "Product Description is required"],
        },
        note: {
            topNote: [{ type: String, required: true }], // Array of strings
            heartNote: [{ type: String, required: true }],
            baseNote: [{ type: String, required: true }],
        },
    },
    price: {
        type: Number,
        required: [true, "Product Price is required"],
    },
    imageURL: [{
            type: String,
            required: [true, "Product Image is required"]
    }],
});

module.exports = mongoose.model("Product", productSchema);
