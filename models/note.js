const mongoose = require('mongoose')
const Schema = mongoose.Schema;



// Note structure
const NoteSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})


const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;