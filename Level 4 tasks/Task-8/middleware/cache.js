
const newsCache =
require("../cache/newsCache");

function cacheMiddleware(req, res, next) {

    if (

        newsCache.data &&
        newsCache.data.length > 0

    ) {

        console.log(
            "⚡ Served From Cache"
        );

        return res.json({

            source: "cache",

            articles:
            newsCache.data,

            lastUpdated:
            newsCache.lastUpdated

        });

    }

    next();

}

module.exports =
cacheMiddleware;

