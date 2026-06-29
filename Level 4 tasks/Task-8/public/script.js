
const newsContainer =
document.getElementById("newsContainer");

const totalArticles =
document.getElementById("totalArticles");

const cacheHits =
document.getElementById("cacheHits");

const lastUpdated =
document.getElementById("lastUpdated");

const serverStatus =
document.getElementById("serverStatus");

const healthStatus =
document.getElementById("healthStatus");

const uptime =
document.getElementById("uptime");

const hits =
document.getElementById("hits");

const misses =
document.getElementById("misses");

const refreshBtn =
document.getElementById("refreshBtn");


// ===================================
// LOAD NEWS
// ===================================

async function loadNews() {

    try {

        newsContainer.innerHTML =

        `
        <div class="loading-card">

            Loading Latest AI News...

        </div>
        `;

        const response =
        await fetch("/api/news");

        const data =
        await response.json();

        newsContainer.innerHTML = "";

        totalArticles.innerText =
        data.totalArticles;

        cacheHits.innerText =
        data.cacheHits;

        hits.innerText =
        data.cacheHits;

        misses.innerText =
        data.cacheMisses;

        if(data.lastUpdated){

            lastUpdated.innerText =
            new Date(
                data.lastUpdated
            ).toLocaleTimeString();

        }

        data.articles.forEach(article => {

            const card =
            document.createElement("div");

            card.className =
            "news-card";

            card.innerHTML = `

                <h3>

                    ${article.title}

                </h3>

                <p>

                    <strong>Author :</strong>

                    ${article.author}

                </p>

                <a
                    href="${article.url}"
                    target="_blank"
                >

                    Read Full Article

                </a>

            `;

            newsContainer.appendChild(card);

        });

    }

    catch(error){

        console.log(error);

        newsContainer.innerHTML =

        `
        <div class="error-card">

            Failed To Load News

        </div>
        `;

    }

}


// ===================================
// LOAD SERVER HEALTH
// ===================================

async function loadHealth(){

    try{

        const response =
        await fetch("/api/health");

        const data =
        await response.json();

        serverStatus.innerText =
        data.status;

        healthStatus.innerText =
        data.status;

        uptime.innerText =
        Math.floor(data.uptime)
        + " sec";

    }

    catch(error){

        console.log(error);

    }

}


// ===================================
// REFRESH BUTTON
// ===================================

refreshBtn.addEventListener(

    "click",

    ()=>{

        loadNews();

        loadHealth();

    }

);


// ===================================
// AUTO REFRESH
// ===================================

setInterval(()=>{

    loadNews();

    loadHealth();

},30000);


// ===================================
// SIDEBAR NAVIGATION
// ===================================

const navItems =
document.querySelectorAll(".nav-item");

navItems.forEach(item=>{

    item.addEventListener("click",()=>{

        navItems.forEach(nav=>{

            nav.classList.remove("active");

        });

        item.classList.add("active");

        const target =
        document.getElementById(
            item.dataset.target
        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});


// ===================================
// ACTIVE NAV WHILE SCROLLING
// ===================================

const sections = [

    "dashboard",

    "newsSection",

    "serverSection",

    "cacheSection"

];

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(id=>{

        const section =
        document.getElementById(id);

        if(section){

            const top =
            section.offsetTop;

            if(

                pageYOffset >=
                top - 150

            ){

                current = id;

            }

        }

    });

    navItems.forEach(item=>{

        item.classList.remove("active");

        if(

            item.dataset.target ===
            current

        ){

            item.classList.add("active");

        }

    });

});


// ===================================
// INITIAL LOAD
// ===================================

loadNews();

loadHealth();

