//fetch user data
async function getData(){
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  const data = await response.json()
  console.log(data)
  displayUsers(data);
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

//display user data in a table

function displayUsers(users){
const userTableBody = document.getElementById('userTableBody')

users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="py-4 pl-8">${user.id}</td>
      <td class="py-4 pl-8">${user.name}</td>
      <td class="py-4 pl-8">${user.email}</td>
      <td class="py-4 pl-8"><button class="todoBtn" userid="${user.id}" onclick="displayTodo(this.getAttribute('userid'))">To-Do</button></td>
      <td class="py-4 pl-8"><button class="albumBtn" userid="${user.id}" onclick="displayAlbum(this.getAttribute('userid'))">View</button></td>
    `;

    userTableBody.appendChild(row);
    row.classList.add('border-b');
  });
}

function displayTodo(userId){
  console.log('todo');
  location.href = `todo.html?userId=${userId}`;
}

function displayAlbum(albumId){
  console.log('album');
  location.href = `albums.html?albumId=${albumId}`;
}

document.addEventListener('DOMContentLoaded', () => {
  getData();
  lottieAnimation(); 
  });
  