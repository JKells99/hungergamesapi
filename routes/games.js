const express = require('express');
const router = express.Router();
const db = require("../db");

router.get('/', (req, res) => {
    const sql = "SELECT * FROM games";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

router.post('/createGame', (req, res) => {
    const { year, winner_id } = req.body;
    db.query("INSERT INTO games ( year, winner_id) VALUES (?,?)", [year, winner_id], (err, result) => {
        if (err) throw err;

        res.json({ id: result.insertId, year, winner_id });
    })
})


router.put('/declareWinner/:id', (req, res) => {
    const gameId = req.params.id;
    const { winner_id } = req.body;
    db.query("UPDATE games SET winner_id = ? WHERE id = ?", [winner_id, gameId], (err, result) => {
        if (err) throw err;
        res.json("Winner declared Congrats to the winner!");
    })
})

router.put('/killTribute/:id', (req, res) => {
    const tributeId = req.params.id;
    db.query('Update tributes SET status = "Deceased" WHERE id = ?', [tributeId], (err, result) => {
        if (err) throw err;
        res.json("Tribute has been killed");
    })
})
module.exports = router;