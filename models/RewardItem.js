const mongoose = require("mongoose");

const RewardItemSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const RewardItem = mongoose.model("RewardItem", RewardItemSchema);

module.exports = RewardItem;
