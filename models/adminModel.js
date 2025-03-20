const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    adminEmail:{
        type: String,
        required: [true, "ENTER EMAIL"]
    },
    adminPassword:{
        type: String,
        required: [true, "ENTER PASSWORD"]
    }
})

module.exports = mongoose.model("admin", adminSchema);