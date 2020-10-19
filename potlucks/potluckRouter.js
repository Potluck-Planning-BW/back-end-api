const router = require('express').Router();
const Potlucks = require('./potluckModel.js');

router.get("/", (req, res) => {
    Potlucks.findPotlucks()
    .then(potlucks => {
        res.status(201).json(potlucks)
    })
    .catch(error => {
        res.status(500).json({message: "Error fetching potlucks"})
    })
})

router.get("/:id", (req, res) => {

    const { id } = req.params

    Potlucks.findPotluckById(id)
        .then(potluck => {
            if(potluck) {
                res.status(200).json(potluck)
            } else {
                res.status(404).json({ message: "Could not find potluck with that ID"})
            }
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
})

router.get("/:id/items", (req, res) => {
    const {id} = req.params

    Potlucks.findItemsByPotluckId(id)
    .then(items => {
        if(items) {
            res.status(200).json(items)
        }
        else {
            res.status(404).json({message: "Could not find any items associated with the given Potluck ID"})
        }
    })
    .catch(error => {
        res.status(500).json({message: error.message})
    })
})

module.exports = router;