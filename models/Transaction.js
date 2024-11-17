const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        clothing: {
            type: String,
            required: true,
        },
        carbonScore: {
            type: Number,
            required: true,
        },
        tag: {
            type: String,
            required: true,
            default: "No Tag"
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
