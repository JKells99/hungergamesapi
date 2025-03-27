const express = require('express');
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
    const sql = "SELECT * FROM districts";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })

})

router.post("/add", async (req, res) => {
    const { name ,specialty} = req.body;
    db.query("INSERT INTO districts (name,specialty) VALUES (?,?)", [name,specialty], (err, result) => {
        if (err) throw err;

        res.json({id: result.insertId, name,specialty});
    })
})
module.exports = router;