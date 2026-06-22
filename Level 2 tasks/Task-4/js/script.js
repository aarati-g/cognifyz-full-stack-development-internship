// =========================
// CLIENT SIDE ROUTING
// =========================

function showSection(sectionId) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    document
        .getElementById(sectionId)
        .classList.add("active");
}

// =========================
// ELEMENTS
// =========================

const form = document.getElementById("studentForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

const about =
    document.getElementById("about");

const charCount =
    document.getElementById("charCount");

const strengthText =
    document.getElementById("strengthText");

const matchText =
    document.getElementById("matchText");

const emailMessage =
    document.getElementById("emailMessage");

const studentCards =
    document.getElementById("studentCards");

// =========================
// EMAIL VALIDATION
// =========================

email.addEventListener("keyup", () => {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value === "") {

        emailMessage.innerText = "";

    } else if (emailPattern.test(email.value)) {

        emailMessage.innerText =
            "✓ Valid Email";

        emailMessage.style.color = "green";

    } else {

        emailMessage.innerText =
            "✗ Invalid Email";

        emailMessage.style.color = "red";
    }

});

// =========================
// PASSWORD STRENGTH
// =========================

password.addEventListener("keyup", () => {

    const value = password.value;

    let strength = 0;

    if (value.length >= 8) strength++;

    if (/[A-Z]/.test(value)) strength++;

    if (/[a-z]/.test(value)) strength++;

    if (/[0-9]/.test(value)) strength++;

    if (/[^A-Za-z0-9]/.test(value)) strength++;

    if (value.length === 0) {

        strengthText.innerText =
            "Password Strength";

        strengthText.className = "";

    }

    else if (strength <= 2) {

        strengthText.innerText =
            "Weak Password";

        strengthText.className = "weak";
    }

    else if (strength <= 4) {

        strengthText.innerText =
            "Medium Password";

        strengthText.className = "medium";
    }

    else {

        strengthText.innerText =
            "Strong Password";

        strengthText.className = "strong";
    }

});

// =========================
// PASSWORD MATCH
// =========================

confirmPassword.addEventListener("keyup", () => {

    if (confirmPassword.value === "") {

        matchText.innerText = "";

        return;
    }

    if (
        password.value ===
        confirmPassword.value
    ) {

        matchText.innerText =
            "✓ Password Matched";

        matchText.className = "match";

    } else {

        matchText.innerText =
            "✗ Password Not Matched";

        matchText.className = "not-match";
    }

});

// =========================
// CHARACTER COUNTER
// =========================

about.addEventListener("input", () => {

    charCount.innerText =
        about.value.length;

});

// =========================
// FORM SUBMISSION
// =========================

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const emailValue =
        email.value.trim();

    const passwordValue =
        password.value;

    const confirmValue =
        confirmPassword.value;

    const aboutValue =
        about.value;

    // Required Fields

    if (
        name === "" ||
        emailValue === "" ||
        passwordValue === "" ||
        confirmValue === ""
    ) {

        alert(
            "Please fill all required fields."
        );

        return;
    }

    // Email Validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        !emailPattern.test(emailValue)
    ) {

        alert(
            "Please enter a valid email."
        );

        return;
    }

    // Password Rules

    const strongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (
        !strongPassword.test(
            passwordValue
        )
    ) {

        alert(
            "Password must contain:\n\nMinimum 8 characters\nOne Uppercase\nOne Lowercase\nOne Number\nOne Special Character"
        );

        return;
    }

    // Password Match

    if (
        passwordValue !== confirmValue
    ) {

        alert(
            "Passwords do not match."
        );

        return;
    }

    // =========================
    // CREATE STUDENT CARD
    // =========================

    const card =
        document.createElement("div");

    card.classList.add(
        "student-card"
    );

    card.innerHTML = `

        <h3>${name}</h3>

        <p>
            <strong>Email:</strong>
            ${emailValue}
        </p>

        <p>
            <strong>About:</strong>
            ${aboutValue || "No information provided"}
        </p>

    `;

    studentCards.appendChild(card);

    // Success Message

    alert(
        "Student Registered Successfully!"
    );

    // Clear Form

    form.reset();

    charCount.innerText = "0";

    strengthText.innerText =
        "Password Strength";

    strengthText.className = "";

    matchText.innerText = "";

    emailMessage.innerText = "";

    // Automatically show Students page

    showSection("students");

});