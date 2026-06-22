const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;


const users = [];


app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("form");
});


app.post("/submit", (req, res) => {

    const { name, email, age, phone } = req.body;

  

    if (!name || !email || !age || !phone) {

        return res.render("error", {
            message: "All fields are required!"
        });

    }

    if (age < 18) {

        return res.render("error", {
            message: "Age must be 18 or above!"
        });

    }

   

    users.push({
        name,
        email,
        age,
        phone
    });

    console.log("Stored Users:");
    console.log(users);

    res.render("success", {
        name
    });
});


app.get("/users", (req, res) => {
    res.json(users);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});