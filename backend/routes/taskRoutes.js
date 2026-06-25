const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const authMiddleware = require("../middleware/authMiddleware");



const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await fs.readFile(
            path.join(__dirname, "../db.json"), "utf-8"
        );

        const db = JSON.parse(data);

        res.json(db.tasks);
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            message: "server error",
        });
    }
});



router.post("/", authMiddleware, async (req, res) => {
  try {
    const { description, clearanceRequired } = req.body;

    const data = await fs.readFile(
      path.join(__dirname, "../db.json"),
      "utf-8"
    );

    const db = JSON.parse(data);

    const task = {
      id: uuidv4(),
      description,
      clearanceRequired,
      expirationTimestamp: Date.now() + 10 * 60 * 1000,
    };

    db.tasks.push(task);

    await fs.writeFile(
      path.join(__dirname, "../db.json"),
      JSON.stringify(db, null, 2)
    );

    res.status(201).json(task);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../db.json"),
      "utf-8"
    );

    const db = JSON.parse(data);

    db.tasks = db.tasks.filter(
      (tasks) => tasks.id !== req.params.id
    );

    await fs.writeFile(
      path.join(__dirname, "../db.json"),
      JSON.stringify(db, null, 2)
    );

    res.json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});




module.exports = router;