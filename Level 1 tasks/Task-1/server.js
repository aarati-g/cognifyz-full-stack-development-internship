const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// Show Form
app.get("/", (req, res) => {
    res.render("form");
});

// Handle Form Submission
app.post("/submit", (req, res) => {

    const { name, email, message } = req.body;

    res.render("result", {
        name,
        email,
        message
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
    console.log("Open: http://localhost:3000");
});