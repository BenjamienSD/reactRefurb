const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Registration = require('../../models/Registration');

// @route   POST api/registrations
// @desc    Post a registration
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('naam', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('datum', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('startTime', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('endTime', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('soortVraag', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('vraag', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('antwoord', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('tijd', 'Gelieve dit veld in te vullen').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // populate registration object with user input
    const newRegistration = new Registration({
      naam: req.body.naam,
      datum: req.body.datum,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      soortVraag: req.body.soortVraag,
      vraag: req.body.vraag,
      antwoord: req.body.antwoord,
      tijd: req.body.tijd,
    });

    // Save form
    try {
      const registration = await newRegistration.save();
      res.json(registration);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server Error: can not save registration' });
    }
  }
);

module.exports = router;
