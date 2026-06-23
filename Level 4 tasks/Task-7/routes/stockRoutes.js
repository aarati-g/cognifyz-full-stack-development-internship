const express =
require("express");

const axios =
require("axios");

const apiLimiter =
require("../middleware/rateLimiter");

const router =
express.Router();


// ==========================
// SEARCH GITHUB USER
// ==========================

router.get(
"/user/:username",
apiLimiter,
async (req,res)=>{

    try{

        const username =
        req.params.username;

        const response =
        await axios.get(

            `https://api.github.com/users/${username}`

        );

        res.json(
            response.data
        );

    }

    catch(error){

        res.status(404).json({

            message:
            "GitHub user not found"

        });

    }

});


// ==========================
// USER REPOSITORIES
// ==========================

router.get(
"/repos/:username",
apiLimiter,
async (req,res)=>{

    try{

        const username =
        req.params.username;

        const response =
        await axios.get(

            `https://api.github.com/users/${username}/repos`

        );

        res.json(
            response.data
        );

    }

    catch(error){

        res.status(404).json({

            message:
            "Repositories not found"

        });

    }

});

module.exports =
router;