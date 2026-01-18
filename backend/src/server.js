import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import quizesRoutes from './routes/quizesRoutes.js';

const app = express();

app.use("/api/notes", notesRoutes);
app.use("/api/quizes", quizesRoutes);

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
