const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  doorverwijs: {
    type: Boolean,
    required: true,
  },
  betaalWijze: {
    type: String,
    required: true,
  },
  andereBetaalWijze: {
    type: String,
    required: true,
    default: 'nvt',
  },
  infoProviders: {
    type: Boolean,
    required: true,
  },
  infoWifi: {
    type: Boolean,
    required: true,
  },
  prijsKlasse: {
    type: Boolean,
    required: true,
  },
  softwarePakket: {
    type: Boolean,
    required: true,
  },
  datum: {
    type: Date,
  },
  digiLocatie: {
    type: String,
    required: true,
  },
  medeWerker: {
    type: String,
    required: true,
  },
  doelGroep: {
    type: String,
    required: true,
  },
  klant: {
    type: String,
    required: true,
  },
  dossierNummer: {
    type: String,
    required: true,
    default: 'nvt',
  },
  contactPersoon: {
    type: String,
    required: true,
    default: 'nvt',
  },
  product: {
    type: String,
    required: true,
  },
  kopie: {
    type: Boolean,
    required: true,
  },
  infoMap: {
    type: Boolean,
    required: true,
  },
  infoHardware: {
    type: Boolean,
    required: true,
  },
  infoGarantie: {
    type: Boolean,
    required: true,
  },
  infoSoftware: {
    type: Boolean,
    required: true,
  },
  infoBeego: {
    type: Boolean,
    required: true,
  },
  werkingDigipunt: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('form', FormSchema);
