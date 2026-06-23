const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const stockRoutes =
require("./routes/stockRoutes");

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(
    express.static(
        path.join(
            __dirname,
            "public"
        )
    )
);

app.use(
    "/api/github",
    stockRoutes
);

// Error Handler

app.use(
    (err, req, res, next) => {

        console.error(err);

        res.status(500).json({

            message:
            "Something went wrong"

        });

    }
);

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `🚀 Server Running on Port ${PORT}`
    );

});