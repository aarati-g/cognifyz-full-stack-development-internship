const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware

app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);



// Temporary Storage

let applications = [];




// ==========================
// GET ALL APPLICATIONS
// ==========================

app.get("/applications", (req, res) => {

    res.json(applications);

});

// ==========================
// CREATE APPLICATION
// ==========================

app.post("/applications", (req, res) => {

    console.log(req.body);

    const {
        name,
        email,
        course,
        year
    } = req.body;

    if (
        !name ||
        !email ||
        !course ||
        !year
    ) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }

    const application = {

        id: Date.now(),

        name,

        email,

        course,

        year,

        status: "Pending",

        createdAt:
            new Date()
                .toLocaleDateString()

    };

    applications.push(application);

    res.status(201).json(application);

});

// ==========================
// UPDATE APPLICATION
// ==========================

app.put(
    "/applications/:id",
    (req, res) => {

        const id =
            Number(req.params.id);

        const application =
            applications.find(
                app =>
                    app.id === id
            );

        if (!application) {

            return res.status(404).json({
                message:
                    "Application not found"
            });

        }

        application.name =
            req.body.name;

        application.email =
            req.body.email;

        application.course =
            req.body.course;

        application.year =
            req.body.year;

        res.json(application);

    }
);

// ==========================
// APPROVE APPLICATION
// ==========================

app.patch(
    "/applications/:id/approve",
    (req, res) => {

        const id =
            Number(req.params.id);

        const application =
            applications.find(
                app =>
                    app.id === id
            );

        if (!application) {

            return res.status(404).json({
                message:
                    "Application not found"
            });

        }

        application.status =
            "Approved";

        res.json(application);

    }
);

// ==========================
// REJECT APPLICATION
// ==========================

app.patch(
    "/applications/:id/reject",
    (req, res) => {

        const id =
            Number(req.params.id);

        const application =
            applications.find(
                app =>
                    app.id === id
            );

        if (!application) {

            return res.status(404).json({
                message:
                    "Application not found"
            });

        }

        application.status =
            "Rejected";

        res.json(application);

    }
);

// ==========================
// DELETE APPLICATION
// ==========================

app.delete(
    "/applications/:id",
    (req, res) => {

        const id =
            Number(req.params.id);

        applications =
            applications.filter(
                app =>
                    app.id !== id
            );

        res.json({
            message:
                "Application deleted successfully"
        });

    }
);

// ==========================
// DASHBOARD STATS
// ==========================

app.get("/stats", (req, res) => {

    const total =
        applications.length;

    const approved =
        applications.filter(
            app =>
                app.status ===
                "Approved"
        ).length;

    const rejected =
        applications.filter(
            app =>
                app.status ===
                "Rejected"
        ).length;

    const pending =
        applications.filter(
            app =>
                app.status ===
                "Pending"
        ).length;

    res.json({

        total,

        approved,

        rejected,

        pending

    });

});

console.log("SERVER FILE LOADED SUCCESSFULLY");
// SERVER START

app.listen(PORT, () => {

    console.log(
        `🚀 University Admission Portal Running at http://localhost:${PORT}`
    );

});