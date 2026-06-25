const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const data = await fs.readFile(
            path.join(__dirname, "../db.json"),
            "utf-8"
        );
        const db = JSON.parse(data);



        const user = db.users.find(
            (u) =>
                u.username === username &&
                u.password === password
        );


        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        req.session.user = {
            username: user.username,
            clearance: user.clearance,
        };

        res.status(200).json({
            message: "Login successful",
            user: req.session.user,
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            messgae: "server error",
        });
    }
});


router.get("/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: "not authenticated",
        });
    }

    res.status(200).json({
        user: req.session.user,
    });
})


router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "logout failed",
            });
        }

        res.clearCookie("connect.sid");

        res.json({
            message: "logged out",
        });
    });
});

router.get("/me",(req,res) => {

    if(!req.session.user){
        return res.status(401).json({
            message: "Not logged in",
        });
    }

    res.json({
        user: req.session.user,
    });
});


module.exports = router;