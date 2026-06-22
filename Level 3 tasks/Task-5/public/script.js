// ==========================
// GLOBAL VARIABLES
// ==========================

const applicationForm =
    document.getElementById(
        "applicationForm"
    );

const applicationList =
    document.getElementById(
        "applicationList"
    );

const editModal =
    document.getElementById(
        "editModal"
    );

const editName =
    document.getElementById(
        "editName"
    );

const editEmail =
    document.getElementById(
        "editEmail"
    );

const editCourse =
    document.getElementById(
        "editCourse"
    );

const editYear =
    document.getElementById(
        "editYear"
    );

const updateBtn =
    document.getElementById(
        "updateBtn"
    );

const closeBtn =
    document.getElementById(
        "closeBtn"
    );

let currentApplicationId = null;

// ==========================
// SIDEBAR NAVIGATION
// ==========================

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(
            ".content-section"
        );

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });

    document
        .getElementById(sectionId)
        .classList.add(
            "active-section"
        );

}

// ==========================
// LOAD DASHBOARD STATS
// ==========================

async function loadStats() {

    try {

        const response =
            await fetch("/stats");

        const stats =
            await response.json();

        document.getElementById(
            "totalApplications"
        ).innerText =
            stats.total;

        document.getElementById(
            "approvedApplications"
        ).innerText =
            stats.approved;

        document.getElementById(
            "pendingApplications"
        ).innerText =
            stats.pending;

        document.getElementById(
            "rejectedApplications"
        ).innerText =
            stats.rejected;

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================
// LOAD APPLICATIONS
// ==========================

async function loadApplications() {

    try {

        const response =
            await fetch(
                "/applications"
            );

        const applications =
            await response.json();

        applicationList.innerHTML = "";

        applications.forEach(app => {

            let badgeClass =
                "pending-badge";

            if (
                app.status ===
                "Approved"
            ) {

                badgeClass =
                    "approved-badge";

            }

            if (
                app.status ===
                "Rejected"
            ) {

                badgeClass =
                    "rejected-badge";

            }

            const card =
                document.createElement(
                    "div"
                );

            card.classList.add(
                "application-card"
            );

            card.innerHTML = `

                <h3>
                    ${app.name}
                </h3>

                <p>
                    <strong>Email:</strong>
                    ${app.email}
                </p>

                <p>
                    <strong>Course:</strong>
                    ${app.course}
                </p>

                <p>
                    <strong>Year:</strong>
                    ${app.year}
                </p>

                <p>
                    <strong>Applied:</strong>
                    ${app.createdAt}
                </p>

                <span class="badge ${badgeClass}">
                    ${app.status}
                </span>

                <div class="card-actions">

                    <button
                        class="edit-btn"
                        onclick="openEditModal(
                            ${app.id},
                            '${app.name}',
                            '${app.email}',
                            '${app.course}',
                            '${app.year}'
                        )"
                    >
                        Edit
                    </button>

                    <button
                        class="approve-btn"
                        onclick="approveApplication(
                            ${app.id}
                        )"
                    >
                        Approve
                    </button>

                    <button
                        class="reject-btn"
                        onclick="rejectApplication(
                            ${app.id}
                        )"
                    >
                        Reject
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteApplication(
                            ${app.id}
                        )"
                    >
                        Delete
                    </button>

                </div>

            `;

            applicationList.appendChild(
                card
            );

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================
// CREATE APPLICATION
// ==========================

applicationForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const name =
            document.getElementById(
                "name"
            ).value;

        const email =
            document.getElementById(
                "email"
            ).value;

        const course =
            document.getElementById(
                "course"
            ).value;

        const year =
            document.getElementById(
                "year"
            ).value;

        if (
            !name ||
            !email ||
            !course ||
            !year
        ) {

            alert(
                "Please fill all fields."
            );

            return;

        }

        try {

            await fetch(
                "/applications",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            name,
                            email,
                            course,
                            year

                        })

                }
            );

            applicationForm.reset();

            loadApplications();

            loadStats();

            showSection(
                "applications"
            );

        }

        catch (error) {

            console.error(error);

        }

    }
);

// ==========================
// EDIT MODAL
// ==========================

function openEditModal(
    id,
    name,
    email,
    course,
    year
) {

    currentApplicationId = id;

    editName.value = name;

    editEmail.value = email;

    editCourse.value = course;

    editYear.value = year;

    editModal.style.display =
        "flex";

}

// ==========================
// CLOSE MODAL
// ==========================

closeBtn.addEventListener(
    "click",
    () => {

        editModal.style.display =
            "none";

    }
);

// ==========================
// UPDATE APPLICATION
// ==========================

updateBtn.addEventListener(
    "click",
    async () => {

        try {

            await fetch(
                `/applications/${currentApplicationId}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            name:
                                editName.value,

                            email:
                                editEmail.value,

                            course:
                                editCourse.value,

                            year:
                                editYear.value

                        })

                }
            );

            editModal.style.display =
                "none";

            loadApplications();

        }

        catch (error) {

            console.error(error);

        }

    }
);

// ==========================
// APPROVE APPLICATION
// ==========================

async function approveApplication(
    id
) {

    try {

        await fetch(
            `/applications/${id}/approve`,
            {
                method: "PATCH"
            }
        );

        loadApplications();

        loadStats();

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================
// REJECT APPLICATION
// ==========================

async function rejectApplication(
    id
) {

    try {

        await fetch(
            `/applications/${id}/reject`,
            {
                method: "PATCH"
            }
        );

        loadApplications();

        loadStats();

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================
// DELETE APPLICATION
// ==========================

async function deleteApplication(
    id
) {

    const confirmDelete =
        confirm(
            "Delete this application?"
        );

    if (!confirmDelete)
        return;

    try {

        await fetch(
            `/applications/${id}`,
            {
                method: "DELETE"
            }
        );

        loadApplications();

        loadStats();

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================
// INITIAL LOAD
// ==========================

loadApplications();

loadStats();