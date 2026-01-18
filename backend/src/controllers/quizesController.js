
export const getAllQuizes = (req, res) => {
  res.status(200).json({ message: "getting quizes" });
}

export const createQuiz = (req, res) => {
  res.status(201).json({ message: "posting quiz" });
}

export const updateQuiz = (req, res) => {
  res.status(200).json({ message: "updating quiz" });
}

export const deleteQuiz = (req, res) => {
  res.status(200).json({ message: "deleting quiz" });
}
