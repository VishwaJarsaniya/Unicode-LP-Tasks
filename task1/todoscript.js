const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

//fetch todo data
async function getToDoData(){
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    const todos = await response.json()
    console.log(todos);
    return todos;
  }

  function lottieAnimation() {
    const animationContainer1 = document.getElementById('lottie-animation1');
    const animationContainer2 = document.getElementById('lottie-animation2');
    const animData1 = {
      container: animationContainer1,
      renderer: 'svg',
      loop: true,
      autoplay: true, 
      path: 'waveAnimation.json', 
    };
    const anim1 = bodymovin.loadAnimation(animData1);
    const animData2 = {
      container: animationContainer2,
      renderer: 'svg',
      loop: true, 
      autoplay: true, 
      path: 'waveAnimation.json',
    };
    const anim2 = bodymovin.loadAnimation(animData2);
  }


  //display todo data
  async function displayTodo(todos){
  const todoTableBody = document.getElementById('todoTableBody')
  todoTableBody.innerHTML='';

  //console.log('hi');

    for (const todo of todos) {
      //console.log('forloop');
        if (parseInt(todo.userId) == parseInt(userId)) {

      const row = document.createElement('tr');
      
      const taskCell = document.createElement('td');
      taskCell.textContent = todo.title;
      taskCell.className = 'px-12 py-1';
      taskCell.style.cursor = 'pointer';
      taskCell.addEventListener('click', () => {
        taskCell.classList.toggle('checked');
      });
      row.appendChild(taskCell);

      const editCell = document.createElement('td');
      const editIcon = document.createElement('img');
      editIcon.src = 'images/pencil.png';
      editIcon.width = 32;
      editIcon.height = 32;
      editCell.className = 'pl-12';
      editIcon.style.cursor = 'pointer';
      editIcon.addEventListener('click', () => {
        editTodo(taskCell , todo.id);
      })
      editCell.appendChild(editIcon);
      row.appendChild(editCell);

      const deleteCell = document.createElement('td');
      const deleteIcon = document.createElement('img');
      deleteIcon.src = 'images/delete.png';
      deleteIcon.width = 24;
      deleteIcon.height = 24;
      deleteIcon.style.cursor = 'pointer';
      deleteIcon.addEventListener('click', () => {
        deleteTodo(todo.id , row);
      });
      deleteCell.className = 'pl-16';
      deleteCell.appendChild(deleteIcon);
      row.appendChild(deleteCell);


      todoTableBody.appendChild(row);
        }
    }
    }

document.addEventListener('DOMContentLoaded', () => {
  getToDoData().then(displayTodo);
  lottieAnimation(); 
  });

async function deleteTodo(todoId , row){
  // console.log('delete');
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to delete this task?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'No, cancel',
  });
  if(result.isConfirmed){
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}` , {
    method: 'DELETE',
  });

  if(response.ok){
    // console.log('todo deleted');
    row.remove();
    Swal.fire('Deleted!', 'The task has been deleted.', 'success');
  }
  else{
    console.error('error deleting');
    Swal.fire('Error', 'An error occurred while deleting the task.', 'error');
  }}
}

const inputBox = document.getElementById('inputBox');
const todoTableBody = document.getElementById('todoTableBody');

function addTask() {
    if (inputBox.value == ''){
      alert("No task added!");
    }
    else{
      const row = document.createElement('tr');

      const taskCell = document.createElement('td');
      taskCell.textContent = inputBox.value;
      taskCell.className = 'px-12 py-1';
      taskCell.style.cursor = 'pointer';
      taskCell.addEventListener('click', () => {
        taskCell.classList.toggle('checked');
      });
      row.appendChild(taskCell);

      const editCell = document.createElement('td');
      const editIcon = document.createElement('img');
      editIcon.src = 'images/pencil.png';
      editIcon.width = 28;
      editIcon.height = 28;
      editCell.className = 'pl-12';
      editIcon.style.cursor = 'pointer';
      editIcon.addEventListener('click', () => {
        editTodo(taskCell , todo.id);
      })
      editCell.appendChild(editIcon);
      row.appendChild(editCell);

      const deleteCell = document.createElement('td');
      const deleteIcon = document.createElement('img');
      deleteIcon.src = 'images/delete.png';
      deleteIcon.width = 20;
      deleteIcon.height = 20;
      deleteCell.className = 'pl-16';
      deleteIcon.style.cursor = 'pointer';
      deleteCell.appendChild(deleteIcon);
      row.appendChild(deleteCell);

      deleteIcon.addEventListener('click' , () => {
        const yes = confirm("Are you sure you want to delete this task?");
        if(yes){
        row.remove();
        }
      });

      todoTableBody.appendChild(row);
    }
    inputBox.value='';
  }

  function editTodo(cell , todoId){
    const originalText = cell.textContent;
    const input = document.createElement('input');
    input.value = originalText;
    input.classList.add('editBox');

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'SAVE';
    saveBtn.classList.add('saveButton');
    saveBtn.addEventListener('click' , () => {
      // console.log('save');
      saveText(todoId , input.value , cell);
    });

    cell.textContent='';
    cell.appendChild(input);
    cell.appendChild(saveBtn);
    cell.classList.add('editing');
  }

  async function saveText(todoId , newText , cell) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}` , {
    method:'PUT',
    body: JSON.stringify({
      title: newText,
    }),
    });
    if(response.ok){
      cell.textContent = newText;
      cell.classList.remove('editing');
    }
    else{
      console.log('error in editing');
    }
  }