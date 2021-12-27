const mongoose = require('mongoose');

const vmsSchema = new mongoose.Schema({
  cluster_name: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  total_disk: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  location_name: {
    type: String,
    required: false,
  },
});
// The model function takes 2 properties(name of the DB, schema name)
// This model enables us to interact directly with the DB

// module.exports = mongoose.model('Vms', vmsSchema);

// I need to use the Object destructuring syntax on line 33, to test the schema object specifically
// Line 33 is therefore replaced with lines 37, 38 & 39
//module.exports = {
//  model: mongoose.model('Vms', vmsSchema),
//  schema: vmsSchema
//}

// Lines 37 to 39 are refactored even further as to extract the relevant objects.
const Vms = mongoose.model('Vms', vmsSchema);

module.exports = Vms;

// exports.vmsSchema = vmsSchema;
// exports.Vms = Vms;
