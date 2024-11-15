const mongoose = require("mongoose");

const RewardSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        cost:{
            type: Number,
            required: true
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RewardItem",
        }
    },
    { timestamps: true }
);

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;
