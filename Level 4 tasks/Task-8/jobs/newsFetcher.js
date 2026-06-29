
const fetchLatestNews =
require("../services/newsService");

function startNewsFetcher() {

    fetchLatestNews();

    setInterval(() => {

        fetchLatestNews();

    }, 300000);

}

module.exports =
startNewsFetcher;

