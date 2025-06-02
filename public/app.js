document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
  
    const input = document.getElementById('todoInput');
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTodo();
    });
  });
  
  function fetchTodos() {
    fetch('/todos')
      .then(res => res.json())
      .then(data => {
        const list = document.getElementById('todoList');
        list.innerHTML = '';
        data.forEach(todo => {
          const li = document.createElement('li');
          li.setAttribute('data-id', todo.id);
  
          const textSpan = document.createElement('span');
          textSpan.textContent = todo.text;
          textSpan.className = 'todo-text';
  
          const timestamp = document.createElement('small');
          timestamp.textContent = `Added: ${todo.timestamp}`;
  
          const editBtn = document.createElement('button');
          editBtn.textContent = 'Edit';
          editBtn.onclick = () => startEdit(todo.id, textSpan, editBtn);
  
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.onclick = () => deleteTodo(todo.id);
  
          const content = document.createElement('div');
          content.appendChild(textSpan);
          content.appendChild(document.createElement('br'));
          content.appendChild(timestamp);
  
          li.appendChild(content);
          li.appendChild(editBtn);
          li.appendChild(deleteBtn);
          document.getElementById('todoList').appendChild(li);
        });
      });
  }
  
  function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (!text) return;
  
    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    }).then(() => {
      input.value = '';
      fetchTodos();
    });
  }
  
  function deleteTodo(id) {
    fetch(`/todos/${id}`, {
      method: 'DELETE'
    }).then(fetchTodos);
  }
  
  function startEdit(id, textSpan, editBtn) {
    const currentText = textSpan.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
  
    textSpan.replaceWith(input);
    editBtn.textContent = 'Save';
  
    editBtn.onclick = () => {
      const updatedText = input.value.trim();
      if (!updatedText) return;
  
      fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: updatedText })
      }).then(() => {
        fetchTodos();
      });
    };
  }
  