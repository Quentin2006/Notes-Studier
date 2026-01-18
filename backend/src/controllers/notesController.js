
export const getAllNotes = (req, res) => {
  res.status(200).json({ message: "getting note" });
}

export const createNote = (req, res) => {
  res.status(201).json({ message: "posting note" });
}

export const updateNote = (req, res) => {
  res.status(200).json({ message: "updating note" });
}

export const deleteNote = (req, res) => {
  res.status(200).json({ message: "deleting note" });
}
