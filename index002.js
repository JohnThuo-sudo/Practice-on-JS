    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('keyup', function () {
      const query = searchInput.value.toLowerCase();

      list.innerHTML = '';

      const filtered = tasks.filter(task => 
      task.text.toLowerCase().includes(query)
      );

      filtered.forEach(createTaskElement);
    });

    let tasks = [];

    // Load saved tasks from localStorage
    window.addEventListener('DOMContentLoaded', () => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            tasks = JSON.parse(saved);
            tasks.forEach(createTaskElement);
        }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const taskText = input.value.trim();
      if (taskText === '') return;

      const task = {
        text: taskText,
        completed: false
      };

      tasks.push(task);
      saveTasks();
      createTaskElement(task);
      input.value = '';

    });

    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(task) {
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = task.text;
      span.style.cursor = 'pointer';

      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = task.completed;

      if (task.completed) {
        span.classList.add('done');
        check.checked = true;
      }

      check.addEventListener('change', () => {
        task.completed = check.checked;
        span.classList.toggle('done', task.completed);
        saveTasks();
      });

      const editBtn = document.createElement('button');
      editBtn.textContent = '✏️';
      editBtn.style.marginLeft = '10px';

      editBtn.addEventListener('click', () => {
        const newText = prompt('Edit task:', task.text);

        if (newText && newText.trim() !== '') {
          task.text = newText.trim();
          span.textContent = task.text;
          saveTasks();
        }
      });

      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑️';
      delBtn.style.marginLeft = '10px';

      span.addEventListener('click', () => {
        span.classList.toggle('done');
        task.completed = !task.completed;
        saveTasks();
      });

      li.appendChild(check);
      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(delBtn);
      list.appendChild(li);
    }