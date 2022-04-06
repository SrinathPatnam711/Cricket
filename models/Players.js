const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  speciality: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Player', PlayerSchema);
