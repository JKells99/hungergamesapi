const express = require('express');
const router = express.Router();
const db = require("../db");

router.get('/', (req, res) => {
    const sql = "SELECT * FROM tributes";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

router.post('/addTribute', (req, res) => {
    const { age,name, district_id,kills,status } = req.body;
    db.query("INSERT INTO tributes (age,name, district_id,kills,status) VALUES (?,?,?,?,?)", [age,name, district_id,kills,status], (err, result) => {
        if (err) throw err;

        res.json({ id: result.insertId, name, district_id });
    })
})

module.exports = router;

