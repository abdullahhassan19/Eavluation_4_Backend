const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
  taskname: { type: String, required: true },
  status: { type: String, required: true },
  tag: { type: String, required: true },
  userId: { type: String, required: true },
});

const TodosModel = mongoose.model("Todos", TodoSchema);

module.exports = { TodosModel };
