const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const dbConnect = require("./db/connect");
const { rateLimit } = require("express-rate-limit");
require("dotenv").config();

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    limit: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(
    cors({
        origin: "http://localhost:3000"
    })
);

app.use(express.json());

app.use(limiter);

app.use("/api", require("./routes"));

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
    await dbConnect(MONGO_URI);
    app.listen(PORT, () => {
        console.log("Server Running on Port ", PORT);
    });
};

startServer();
