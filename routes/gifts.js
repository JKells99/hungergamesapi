const express = require('express');
const router = express.Router();
const db = require("../db");

router.get('/', (req, res) => {
    const sql = "SELECT * FROM gifts";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

router.post('/sendGift', (req, res) => {
    const { giftname, giftprice,giftdescription,giftrecipient} = req.body;
    db.query("INSERT INTO gifts (giftname, giftprice,giftdescription,giftrecipient) VALUES (?,?,?,?)", [giftname,giftprice,giftdescription,giftrecipient], (err, result) => {
        if (err) throw err;

        res.json({ id: result.insertId, giftname, giftprice,giftrecipient});
    })
})

router.get('/getgiftfortribute/:id', (req, res) => {
    const tributeId = req.params.id;
    db.query("SELECT * FROM gifts WHERE giftrecipient = ?", [tributeId], (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

module.exports = router;