const express = require('express');
//const uuid = require('uuid');
const {check, validationResult} = require('express-validator');

let Players = require('../models/Players');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//route Get api/Players
//desc Get all Players
//access public
router.get('/', async (req, res) => {
  try {
    const PlayerDB = await Players.find();
    res.send(PlayerDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/Players/:id
//desc Get Player by id
//access public
router.get('/:id', async (req, res) => {
  try {    
    const Player = await Players.findById(req.params.id);
    if (!Player) {
      return res.status(404).send('Player not found');
    }
    res.send(Player);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Post api/Players
//desc Add a Player
//access public
router.post(
  '/',   
  [
    check('name', 'name cannot be empty').not().isEmpty(),
    check('speciality', 'speciality cannot be empty').not().isEmpty(),
  ], 
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
      return res.status(400).json({errors: errors.array()});
    }
    const newPlayer = await Players.create({          
      name: req.body.name,
      speciality: req.body.speciality
    });
    res.send(newPlayer);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

//route Delete api/Players/
//desc delete Player by id
//access public
router.delete(
  '/', 
  async (req, res) => {
  //find the element
  try {
    const Player = await Players.findOneAndRemove({ _id: req.body.id });
    if (!Player) {
      return res.status(404).send('Player not found');
    }
    res.send('Player deleted');
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route PUT api/Players/
//desc update Player by id
//access public
router.put('/', async (req, res) => {
  try {
    const Player = await Players.findById(req.body.id);

    if (!Player) {
      return res.status(404).send('Player not found');
    }

    Player.name = req.body.name;
    Player.speciality = req.body.speciality;    
    await Player.save();
    res.send(Player);
    
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
