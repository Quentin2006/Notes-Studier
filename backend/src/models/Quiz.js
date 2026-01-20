import mongoose from 'mongoose';

// 1 - make schema
// 2 - create model off schema
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answers: {
      type: [String],
      required: true,
    },
    // index in answer array
    correctAnswer: {
      type: Number,
      required: true,
    }

  }
)

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
    }
  },
  { timestamps: true } // createdAt and updatedAt feild
)


const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
