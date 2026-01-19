import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import quizesRoutes from './routes/quizesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// middleware to parse JSON bodies
// NOTE: Middleware is code that interseps requests to do processing before sending to future methods
app.use(express.json());
app.use(rateLimiter)

app.use("/api/notes", notesRoutes);
app.use("/api/quizes", quizesRoutes);


// connect to db then run server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
  });
})

