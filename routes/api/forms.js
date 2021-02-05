const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Form = require('../../models/Form');

// @route   GET api/forms/success
// @desc    Success route
// @access  Private
router.get('/success', (req, res) => res.json({ msg: 'Success works...' }));

// @route   POST api/form
// @desc    Post a form
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('doorverwijs', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('betaalWijze', 'Gelieve dit veld in te vullen').not().isEmpty(),
      // check('andereBetaalWijze', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('infoProviders', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('infoWifi', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('prijsKlasse', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('softwarePakket', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('digiLocatie', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('medeWerker', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('doelGroep', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('klant', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('dossierNummer', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('contactPersoon', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('product', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('kopie', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('infoMap', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('infoHardware', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('infoGarantie', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('infoSoftware', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('infoBeego', 'Gelieve dit veld in te vullen').not().isEmpty(),
      check('werkingDigipunt', 'Gelieve dit veld in te vullen').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.body.betaalWijze !== 'Andere'
      ? (andereBetaalWijze = 'nvt')
      : (andereBetaalWijze = req.body.andereBetaalWijze);

    // populate form object with user input
    const newForm = new Form({
      doorverwijs: req.body.doorverwijs,
      betaalWijze: req.body.betaalWijze,
      andereBetaalWijze: andereBetaalWijze,
      infoProviders: req.body.infoProviders,
      infoWifi: req.body.infoWifi,
      prijsKlasse: req.body.prijsKlasse,
      softwarePakket: req.body.softwarePakket,
      datum: req.body.datum,
      digiLocatie: req.body.digiLocatie,
      medeWerker: req.body.medeWerker,
      doelGroep: req.body.doelGroep,
      klant: req.body.klant,
      dossierNummer: req.body.dossierNummer,
      contactPersoon: req.body.contactPersoon,
      product: req.body.product,
      kopie: req.body.kopie,
      infoMap: req.body.infoMap,
      infoHardware: req.body.infoHardware,
      infoGarantie: req.body.infoGarantie,
      infoSoftware: req.body.infoSoftware,
      infoBeego: req.body.infoBeego,
      werkingDigipunt: req.body.werkingDigipunt,
    });

    // Save form
    try {
      const form = await newForm.save();
      res.json(form);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server Error: can not save form' });
    }
  }
);

module.exports = router;
