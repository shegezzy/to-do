let todos = [];
let idCounter = 1;

exports.getTodos = (req, res) => {
  res.json(todos);
};

exports.createTodo = (req, res) => {
  const { text } = req.body;
  const timestamp = new Date().toLocaleString();
  const newTodo = { id: idCounter++, text, timestamp };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const todo = todos.find(t => t.id == id);
  if (todo) {
    todo.text = text;
    res.json(todo);
  } else {
    res.status(404).json({ message: "To-Do not found" });
  }
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t.id == id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.json({ message: "To-Do deleted" });
  } else {
    res.status(404).json({ message: "To-Do not found" });
  }
};
