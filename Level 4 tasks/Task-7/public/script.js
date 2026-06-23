const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("username");
const profileContainer = document.getElementById("profileContainer");
const repoContainer = document.getElementById("repoContainer");

async function searchDeveloper() {
    const username = usernameInput.value.trim();

    if (!username) {
        alert("Please enter a GitHub username");
        return;
    }

    await fetchUser(username);
    await fetchRepos(username);
}

async function fetchUser(username) {
    try {
        profileContainer.innerHTML =
            '<div class="loading-card">Loading Profile...</div>';

        const response = await fetch(`/api/github/user/${username}`);
        const user = await response.json();

        if (!response.ok) {
            throw new Error(user.message);
        }

        profileContainer.innerHTML = `
            <div class="profile-card">
                <img
                    src="${user.avatar_url}"
                    alt="${user.login}"
                    class="avatar"
                >

                <div class="profile-info">
                    <h2>${user.name || user.login}</h2>

                    <p>@${user.login}</p>

                    <p>${user.bio || "No bio available"}</p>

                    <div class="profile-stats">
                        <div>
                            <h3>${user.public_repos}</h3>
                            <span>Repositories</span>
                        </div>

                        <div>
                            <h3>${user.followers}</h3>
                            <span>Followers</span>
                        </div>

                        <div>
                            <h3>${user.following}</h3>
                            <span>Following</span>
                        </div>
                    </div>

                    <a
                        href="${user.html_url}"
                        target="_blank"
                        class="github-btn"
                    >
                        Visit GitHub
                    </a>
                </div>
            </div>
        `;
    } catch (error) {
        profileContainer.innerHTML = `
            <div class="error-card">
                ❌ ${error.message}
            </div>
        `;
    }
}

async function fetchRepos(username) {
    try {
        repoContainer.innerHTML =
            '<div class="loading-card">Loading Repositories...</div>';

        const response = await fetch(`/api/github/repos/${username}`);
        const repos = await response.json();

        if (!response.ok) {
            throw new Error(repos.message);
        }

        repoContainer.innerHTML = "";

        repos
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 12)
            .forEach(repo => {
                const card = document.createElement("div");

                card.className = "repo-card";

                card.innerHTML = `
                    <h3>${repo.name}</h3>

                    <p>${repo.description || "No description available"}</p>

                    <div class="repo-stats">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>

                    <a
                        href="${repo.html_url}"
                        target="_blank"
                    >
                        View Repository
                    </a>
                `;

                repoContainer.appendChild(card);
            });
    } catch (error) {
        repoContainer.innerHTML = `
            <div class="error-card">
                ❌ ${error.message}
            </div>
        `;
    }
}

if (searchBtn) {
    searchBtn.addEventListener("click", searchDeveloper);
}

if (usernameInput) {
    usernameInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchDeveloper();
        }
    });
}

if (
    window.location.pathname === "/" ||
    window.location.pathname.includes("index.html")
) {
    fetchUser("torvalds");
    fetchRepos("torvalds");
}