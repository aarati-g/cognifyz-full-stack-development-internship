
const express =
require("express");

const router =
express.Router();

const newsCache =
require("../cache/newsCache");

router.get("/", (req, res) => {

    newsCache.cacheHits++;

    res.json({

        success: true,

        source: "Memory Cache",

        totalArticles:
            newsCache.data.length,

        lastUpdated:
            newsCache.lastUpdated,

        cacheHits:
            newsCache.cacheHits,

        cacheMisses:
            newsCache.cacheMisses,

        articles:
            newsCache.data

    });

});

router.get("/stats", (req, res) => {

    res.json({

        totalArticles:
            newsCache.data.length,

        cacheHits:
            newsCache.cacheHits,

        cacheMisses:
            newsCache.cacheMisses,

        lastUpdated:
            newsCache.lastUpdated

    });

});

module.exports =
router;

