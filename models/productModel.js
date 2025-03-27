const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    product_id:{
        type:String,
        required:[true,"Product id is required"],
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
    category:{
        type: String,
        required: [true, "Product category is required"],
    },
    price: {
        type: Number,
        required: [true, "Product Price is required"],
    },
    image: [{
            type: String,
            required: [true, "Product Image is required"]
    
    }],
    isFeatured: { 
        type: Boolean, 
        default: false 
    },
    isCorouseled:{
        type: Boolean, 
        default: false 
    },
    isAddedToFemale:{
        type: Boolean, 
        default: false 
    },
    isAddedToMale:{
        type: Boolean, 
        default: false 
    },
    isAddedToBoth:{
        type: Boolean, 
        default: false 
    }
});

module.exports = mongoose.model("Product", productSchema);
