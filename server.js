const express = require('express');
const path = require('path');
const app = express();
const todoRoutes = require('./routes/todoRoutes');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/todos', todoRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
