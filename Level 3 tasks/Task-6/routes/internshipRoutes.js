const express = require("express");

const Internship =
require("../models/Internship");

const authMiddleware =
require("../middleware/authMiddleware");

const router =
express.Router();


// ==========================
// CREATE INTERNSHIP
// ==========================

router.post(
"/",
authMiddleware,
async (req,res)=>{

    try{

        const internship =
        await Internship.create({

            company:
            req.body.company,

            role:
            req.body.role,

            location:
            req.body.location,

            user:
            req.user.id

        });

        res.status(201).json(
            internship
        );

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


// ==========================
// GET ALL INTERNSHIPS
// ==========================

router.get(
"/",
authMiddleware,
async (req,res)=>{

    try{

        const internships =
        await Internship.find({

            user:req.user.id

        });

        res.json(
            internships
        );

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


// ==========================
// DASHBOARD STATS
// ==========================

router.get(
"/stats/dashboard",
authMiddleware,
async (req,res)=>{

    try{

        const internships =
        await Internship.find({

            user:req.user.id

        });

        const stats = {

            total:
            internships.length,

            applied:
            internships.filter(
                i => i.status === "Applied"
            ).length,

            assessment:
            internships.filter(
                i => i.status === "Assessment"
            ).length,

            interview:
            internships.filter(
                i => i.status === "Interview"
            ).length,

            selected:
            internships.filter(
                i => i.status === "Selected"
            ).length,

            rejected:
            internships.filter(
                i => i.status === "Rejected"
            ).length

        };

        res.json(stats);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


// ==========================
// UPDATE STATUS
// ==========================

router.put(
"/:id",
authMiddleware,
async (req,res)=>{

    try{

        const internship =
        await Internship.findOne({

            _id:req.params.id,

            user:req.user.id

        });

        if(!internship){

            return res.status(404)
            .json({

                message:
                "Internship not found"

            });

        }

        internship.status =
        req.body.status;

        await internship.save();

        res.json(
            internship
        );

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


// ==========================
// DELETE INTERNSHIP
// ==========================

router.delete(
"/:id",
authMiddleware,
async (req,res)=>{

    try{

        const internship =
        await Internship.findOne({

            _id:req.params.id,

            user:req.user.id

        });

        if(!internship){

            return res.status(404)
            .json({

                message:
                "Internship not found"

            });

        }

        await internship.deleteOne();

        res.json({

            message:
            "Deleted Successfully"

        });

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});

module.exports = router;