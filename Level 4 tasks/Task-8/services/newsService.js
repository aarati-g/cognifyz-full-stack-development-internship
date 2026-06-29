
const axios = require("axios");

const newsCache =
require("../cache/newsCache");

async function fetchLatestNews() {

    try {

        const response =
        await axios.get(

            "https://hn.algolia.com/api/v1/search?query=AI&tags=story"

        );

        const articles = response.data.hits.map(article => ({

            title:
                article.title,

            author:
                article.author,

            url:
                article.url,

            createdAt:
                article.created_at

        }));

        newsCache.data =
        articles;

        newsCache.lastUpdated =
        new Date();

        console.log(
            "📰 News Cache Updated"
        );

    }

    catch (error) {

        console.log(
            "News Fetch Error:",
            error.message
        );

    }

}

module.exports =
fetchLatestNews;

