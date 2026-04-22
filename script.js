let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let modalListenerAdded = false;

function formatDateTime(dateTimeString) {
  if (!dateTimeString) return "";
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

function toggleDateTime() {
  const type = document.getElementById('taskType').value;
  const dateInput = document.getElementById('taskDateTime');

  dateInput.style.display = (type === "scheduled") ? "inline-block" : "none";
}

function addTask() {
  const taskText = document.getElementById('taskInput').value;
  const priority = document.getElementById('prioritySelect').value;
  const taskType = document.getElementById('taskType').value;
  const taskDateTime = document.getElementById('taskDateTime').value;

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const task = { text: taskText, priority, type: taskType, dateTime: taskDateTime };
  tasks.push(task);
  saveTasks();
  displayTask(task);

  // Clear input fields
  document.getElementById('taskInput').value = "";
  document.getElementById('prioritySelect').value = "Medium";
  document.getElementById('taskType').value = "anytime";
  toggleDateTime();
}

function displayTask(task) {
  const taskList = document.getElementById('taskList');
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  taskItem.classList.add('priority-' + task.priority.toLowerCase());

  let content = `<strong>${task.text}</strong> - Priority: ${task.priority}`;
  if (task.type === "scheduled") {
    content += ` - Scheduled: ${formatDateTime(task.dateTime)}`;
  } else {
    content += " - Anytime";
  }

  taskItem.innerHTML = content;

  const finishButton = document.createElement('button');
  finishButton.textContent = 'Mark as Finished';
  finishButton.onclick = () => finishTask(task, taskItem);
  taskItem.appendChild(finishButton);

  taskList.appendChild(taskItem);
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  tasks.forEach(displayTask);
}

function finishTask(task, taskItem) {
  taskItem.remove();
  const index = tasks.indexOf(task);
  if (index > -1) {
    tasks.splice(index, 1);
    saveTasks();
  }
  const trashbin = JSON.parse(localStorage.getItem('trashbin') || '[]');
  let content = `<strong>${task.text}</strong> - Priority: ${task.priority}`;
  if (task.type === "scheduled") {
    content += ` - Scheduled: ${formatDateTime(task.dateTime)}`;
  } else {
    content += " - Anytime";
  }
  const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days in ms
  trashbin.push({content, expiry});
  localStorage.setItem('trashbin', JSON.stringify(trashbin));
  loadTrash();
}

function loadTrash() {
  const trashContent = document.getElementById('trashContent');
  trashContent.innerHTML = '';
  const trashbin = JSON.parse(localStorage.getItem('trashbin') || '[]');
  const now = Date.now();
  const activeTrash = trashbin.filter(item => now < item.expiry);
  localStorage.setItem('trashbin', JSON.stringify(activeTrash)); // update storage
  activeTrash.forEach(item => {
    const trashItem = document.createElement('li');
    trashItem.classList.add('trash-item');
    trashItem.innerHTML = item.content;
    trashContent.appendChild(trashItem);
  });
}

function openTrashModal() {
  loadTrash();
  const modal = document.getElementById('trashModal');
  modal.style.display = 'block';
  
  // Add click outside listener only once
  if (!modalListenerAdded) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeTrashModal();
      }
    });
    modalListenerAdded = true;
  }
}

function closeTrashModal() {
  document.getElementById('trashModal').style.display = 'none';
}

window.onload = function() {
  loadTasks();
  loadTrash();
};
