const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        isAdmin: {
            type: Boolean,
            default: false,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        ecoScore: {
            type: Number,
            default: 50,
        },
        transactions: [
            {
                contest_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Transaction",
                },
            },
        ],
        rewards: [
            {
                question_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Reward",
                },
            },
        ],
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        profile_pic: {
            type: String,
            default: "https://freesvg.org/img/abstract-user-flat-3.png",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
