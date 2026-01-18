import mongoose from 'mongoose';


// 1 - make schema
// 2 - create model off schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    }
  },
  { timestamps: true } // createdAt and updatedAt feild
)


const Note = mongoose.model('Note', noteSchema);

export default Note;
