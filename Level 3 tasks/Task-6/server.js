const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const internshipRoutes =
require("./routes/internshipRoutes");

const authMiddleware =
require("./middleware/authMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/internships",
    internshipRoutes
);

app.get(
    "/api/profile",
    authMiddleware,
    (req, res) => {

        res.json({

            message:
            "Protected Route Accessed",

            userId:
            req.user.id

        });

    }
);

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Server Running on Port ${PORT}`
    );

});