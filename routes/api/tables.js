const express = require('express');
const router = express.Router();
const Form = require('../../models/Form');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   GET api/tables
// @desc    Get the full table
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const forms = await Form.find().sort({ datum: -1 });
    if (forms.length === 0) {
      console.error();
      res.status(404);
    }
    res.json(forms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error: can not get forms');
  }
});

/*
// @route   GET api/tables/ocmw
// @desc    Get the abreviated table
// @access  Private
router.get('/ocmw', (req, res) => res.json({ msg: 'ocmw tabel...' }));
*/

// @route   PUT api/tables/formulier/:id
// @desc    Update a single form
// @access  Private
router.put('/formulier/:id', auth, async (req, res) => {
  const {
    doorverwijs,
    betaalWijze,
    andereBetaalWijze,
    infoProviders,
    infoWifi,
    prijsKlasse,
    softwarePakket,
    datum,
    digiLocatie,
    medeWerker,
    doelGroep,
    klant,
    dossierNummer,
    contactPersoon,
    product,
    kopie,
    infoMap,
    infoHardware,
    infoGarantie,
    infoSoftware,
    infoBeego,
    werkingDigipunt,
  } = req.body;

  // build form object
  const formFields = {};
  if (doorverwijs) formFields.doorverwijs = doorverwijs;
  if (betaalWijze) formFields.betaalWijze = betaalWijze;
  if (andereBetaalWijze) formFields.andereBetaalWijze = andereBetaalWijze;
  if (infoProviders) formFields.infoProviders = infoProviders;
  if (infoWifi) formFields.infoWifi = infoWifi;
  if (prijsKlasse) formFields.prijsKlasse = prijsKlasse;
  if (softwarePakket) formFields.softwarePakket = softwarePakket;
  if (datum) formFields.datum = datum;
  if (digiLocatie) formFields.digiLocatie = digiLocatie;
  if (medeWerker) formFields.medeWerker = medeWerker;
  if (doelGroep) formFields.doelGroep = doelGroep;
  if (klant) formFields.klant = klant;
  if (dossierNummer) formFields.dossierNummer = dossierNummer;
  if (contactPersoon) formFields.contactPersoon = contactPersoon;
  if (product) formFields.product = product;
  if (kopie) formFields.kopie = kopie;
  if (infoMap) formFields.infoMap = infoMap;
  if (infoHardware) formFields.infoHardware = infoHardware;
  if (infoGarantie) formFields.infoGarantie = infoGarantie;
  if (infoSoftware) formFields.infoSoftware = infoSoftware;
  if (infoBeego) formFields.infoBeego = infoBeego;
  if (werkingDigipunt) formFields.werkingDigipunt = werkingDigipunt;
  try {
    // find form
    let form = await Form.findById({ _id: req.params.id });
    if (!form) {
      return res.status(404).json({ msg: 'Form not found' });
    }

    // get user by id, then check if admin
    let user = await User.findById(req.user.id);
    if (!user.admin) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // update form
    form = await Form.findByIdAndUpdate(
      req.params.id,
      { $set: formFields },
      { new: true }
    );
    res.json(form);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ form: 'Server Error' });
  }
});

// @route   DELETE api/tables/formulier/:id
// @desc    Delete a single form
// @access  Private
router.delete('/formulier/:id', auth, async (req, res) => {
  try {
    // find form
    let form = await Form.findById({ _id: req.params.id });
    if (!form) {
      return res.status(404).json({ msg: 'Form not found' });
    }

    // get user by id, then check if admin
    let user = await User.findById(req.user.id);
    if (!user.admin) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    await Form.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Form removed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ form: 'Server Error' });
  }
});

module.exports = router;
