
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const logger = require("./middleware/logger");
const cacheMiddleware = require("./middleware/cache");
const errorHandler = require("./middleware/errorHandler");
const newsRoutes = require("./routes/newsRoutes");
const startNewsFetcher = require("./jobs/newsFetcher");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(logger);

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.use(
    "/api/news",
    newsRoutes
);

app.get("/api/health", (req, res) => {

    res.json({

        status: "Healthy",

        uptime: process.uptime(),

        serverTime: new Date()

    });

});

app.use(errorHandler);

startNewsFetcher();

app.listen(PORT, () => {

    console.log(
        `🚀 Neural News Engine running on http://localhost:${PORT}`
    );

});

