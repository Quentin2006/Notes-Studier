import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import quizesRoutes from './routes/quizesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  )
}
// middleware to parse JSON bodies
// NOTE: Middleware is code that interseps requests to do processing before sending to future methods
app.use(express.json());
app.use(rateLimiter)

app.use("/api/notes", notesRoutes);
app.use("/api/quizes", quizesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  })
}

// connect to db then run server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
  });
})

