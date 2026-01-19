import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import quizesRoutes from './routes/quizesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// middleware to parse JSON bodies
app.use(express.json());

app.use("/api/notes", notesRoutes);
app.use("/api/quizes", quizesRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});
