const { Schema, model } = require('mongoose')

const DevSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  bio: String,
  likes: [{
    type: Schema.Types.ObjectId, // Referencia o ID
    ref: 'Dev' // da tabela (Schema) Dev 
  }],
  dislikes: []
}, { timestamps: true })

module.exports = model('Dev', DevSchema)