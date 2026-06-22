const API_URL = "http://localhost:3000/api";

// =====================
// REGISTER
// =====================

const registerForm =
document.getElementById("registerForm");

if(registerForm){

    registerForm.addEventListener(
        "submit",
        async (e)=>{

            e.preventDefault();

            const name =
            document.getElementById("name").value;

            const email =
            document.getElementById("email").value;

            const password =
            document.getElementById("password").value;

            try{

                const response =
                await fetch(
                    `${API_URL}/auth/register`,
                    {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            name,
                            email,
                            password
                        })
                    }
                );

                const data =
                await response.json();

                alert(data.message);

                if(response.ok){

                    window.location.href =
                    "login.html";

                }

            }
            catch(error){

                console.error(error);

            }

        }
    );

}


// =====================
// LOGIN
// =====================

const loginForm =
document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener(
        "submit",
        async (e)=>{

            e.preventDefault();

            const email =
            document.getElementById("loginEmail").value;

            const password =
            document.getElementById("loginPassword").value;

            try{

                const response =
                await fetch(
                    `${API_URL}/auth/login`,
                    {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            email,
                            password
                        })
                    }
                );

                const data =
                await response.json();

                if(response.ok){

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                    window.location.href =
                    "dashboard.html";

                }
                else{

                    alert(data.message);

                }

            }
            catch(error){

                console.error(error);

            }

        }
    );

}


// =====================
// DASHBOARD
// =====================

const token =
localStorage.getItem("token");

if(
    window.location.pathname.includes(
        "dashboard.html"
    )
){

    if(!token){

        window.location.href =
        "login.html";

    }

}


// =====================
// LOAD STATS
// =====================

async function loadStats(){

    if(!token) return;

    try{

        const response =
        await fetch(
            `${API_URL}/internships/stats/dashboard`,
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        const stats =
        await response.json();

        document.getElementById(
            "totalCount"
        ).innerText =
        stats.total || 0;

        document.getElementById(
            "appliedCount"
        ).innerText =
        stats.applied || 0;

        document.getElementById(
            "assessmentCount"
        ).innerText =
        stats.assessment || 0;

        document.getElementById(
            "interviewCount"
        ).innerText =
        stats.interview || 0;

        document.getElementById(
            "selectedCount"
        ).innerText =
        stats.selected || 0;

        document.getElementById(
            "rejectedCount"
        ).innerText =
        stats.rejected || 0;

    }
    catch(error){

        console.error(error);

    }

}


// =====================
// LOAD INTERNSHIPS
// =====================

async function loadInternships(){


    if(!token) return;

    const appliedColumn =
    document.getElementById(
        "appliedColumn"
    );

    if(!appliedColumn) return;

    const assessmentColumn =
    document.getElementById(
        "assessmentColumn"
    );

    const interviewColumn =
    document.getElementById(
        "interviewColumn"
    );

    const selectedColumn =
    document.getElementById(
        "selectedColumn"
    );

    const rejectedColumn =
    document.getElementById(
        "rejectedColumn"
    );

    const emptyMessage = `
<div class="empty-column">
    🚀 Start your journey
    <br><br>
    Add your first internship
</div>
`;

appliedColumn.innerHTML = emptyMessage;
assessmentColumn.innerHTML = emptyMessage;
interviewColumn.innerHTML = emptyMessage;
selectedColumn.innerHTML = emptyMessage;
rejectedColumn.innerHTML = emptyMessage;

    try{

        const response =
        await fetch(
            `${API_URL}/internships`,
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        const internships =
        await response.json();

        internships.forEach(
            internship=>{

                const card =
                createCard(
                    internship
                );

                if(
                    internship.status ===
                    "Applied"
                ){

                    appliedColumn.appendChild(
                        card
                    );

                }

                else if(
                    internship.status ===
                    "Assessment"
                ){

                    assessmentColumn.appendChild(
                        card
                    );

                }

                else if(
                    internship.status ===
                    "Interview"
                ){

                    interviewColumn.appendChild(
                        card
                    );

                }

                else if(
                    internship.status ===
                    "Selected"
                ){

                    selectedColumn.appendChild(
                        card
                    );

                }

                else{

                    rejectedColumn.appendChild(
                        card
                    );

                }

            }
        );

    }
    catch(error){

        console.error(error);

    }

}


// =====================
// CREATE CARD
// =====================

function createCard(
    internship
){

    const card =
    document.createElement("div");

    card.className =
    "internship-card";

    card.innerHTML = `

        <h3>
            ${internship.company}
        </h3>

        <p>
            ${internship.role}
        </p>

        <p>
            📍 ${internship.location}
        </p>

        <div class="card-actions">

            <select
                onchange="updateStatus(
                    '${internship._id}',
                    this.value
                )"
            >

                <option
                ${internship.status==="Applied"?"selected":""}>
                Applied
                </option>

                <option
                ${internship.status==="Assessment"?"selected":""}>
                Assessment
                </option>

                <option
                ${internship.status==="Interview"?"selected":""}>
                Interview
                </option>

                <option
                ${internship.status==="Selected"?"selected":""}>
                Selected
                </option>

                <option
                ${internship.status==="Rejected"?"selected":""}>
                Rejected
                </option>

            </select>

            <button
                class="delete-btn"
                onclick="deleteInternship(
                    '${internship._id}'
                )"
            >
                Delete
            </button>

        </div>

    `;

    return card;

}


// =====================
// ADD INTERNSHIP
// =====================

const internshipForm =
document.getElementById(
    "internshipForm"
);

if(internshipForm){

    internshipForm.addEventListener(
        "submit",
        async (e)=>{

            e.preventDefault();

            const company =
            document.getElementById(
                "company"
            ).value;

            const role =
            document.getElementById(
                "role"
            ).value;

            const location =
            document.getElementById(
                "location"
            ).value;

            try{

                await fetch(
                    `${API_URL}/internships`,
                    {
                        method:"POST",

                        headers:{
                            "Content-Type":
                            "application/json",

                            Authorization:
                            `Bearer ${token}`
                        },

                        body:JSON.stringify({
                            company,
                            role,
                            location
                        })
                    }
                );

                internshipForm.reset();

                document.getElementById(
                    "internshipModal"
                ).style.display =
                "none";

                loadInternships();
                loadStats();

            }
            catch(error){

                console.error(error);

            }

        }
    );

}


// =====================
// UPDATE STATUS
// =====================

async function updateStatus(
    id,
    status
){

    await fetch(
        `${API_URL}/internships/${id}`,
        {
            method:"PUT",

            headers:{
                "Content-Type":
                "application/json",

                Authorization:
                `Bearer ${token}`
            },

            body:JSON.stringify({
                status
            })
        }
    );

    loadInternships();
    loadStats();

}


// =====================
// DELETE
// =====================

async function deleteInternship(
    id
){

    await fetch(
        `${API_URL}/internships/${id}`,
        {
            method:"DELETE",

            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    loadInternships();
    loadStats();

}


// =====================
// MODAL
// =====================

const addBtn =
document.getElementById(
    "addInternshipBtn"
);

const modal =
document.getElementById(
    "internshipModal"
);

const closeBtn =
document.getElementById(
    "closeModal"
);

if(addBtn){

    addBtn.onclick = ()=>{

        modal.style.display =
        "flex";

    };

}

if(closeBtn){

    closeBtn.onclick = ()=>{

        modal.style.display =
        "none";

    };

}


// =====================
// LOGOUT
// =====================

const logoutBtn =
document.getElementById(
    "logoutBtn"
);

if(logoutBtn){

    logoutBtn.onclick = ()=>{

        localStorage.removeItem(
            "token"
        );

        window.location.href =
        "login.html";

    };

}


// =====================
// INITIAL LOAD
// =====================

loadStats();
loadInternships();