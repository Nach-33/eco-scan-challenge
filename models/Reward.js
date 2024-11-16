const mongoose = require("mongoose");

const RewardSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RewardItem",
        },
        cost:{
            type: Number,
            required: true
        },
    },
    { timestamps: true }
);

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;
