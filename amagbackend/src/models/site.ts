const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  update: {
    type: Date,
    required: true,
    default: new Date()
  },
  history: {
    type: Array,
    require: true,
    default: []
  }
})

export default model('Site', schema)
