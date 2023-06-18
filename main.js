// VARIABLES
let user = document.getElementById('addUser');
let deleteModal = document.getElementById('deleteForm')
let profileImage = document.getElementById('profileImage');
let selectedImage = document.getElementById('selectedImage');
let chatList = document.getElementById('chatList');
let userName = document.getElementById('userName');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let errorMessage = document.getElementById('error');
let closeButton = document.getElementById('closeButton');
let selectedButtons;
let newProfilePic;
let friends;
let data;

function newUser() {
  user.style.display = 'block';
}

function displayDeleteModal() {
  deleteModal.style.display = 'block'
}

function closeDeleteModal(){
  deleteModal.style.display = 'none'
}

function closeModal() {
  user.style.display = 'none';
}

function changePic() {
  const reader = new FileReader();
  reader.onload = (event) => {
    profileImage.src = event.target.result;
    newProfilePic = profileImage.src;
  };
  reader.readAsDataURL(selectedImage.files[0]);
}

window.onload = (e) => {
  e.preventDefault();
  data = JSON.parse(localStorage.getItem('DATA'));
  let friendStructure = '';
  for (let i = 0; i < data.length; i++) {
    friendStructure += `<div class="friends" onmousedown="selectFriend()" onmouseup="unselectFriend()" ontouchstart="unselectFriend()" ontouchend="unselectFriend()" id="friends">
                          <input type="checkbox" value="${data[i].name}" name="${data[i].name}" class="deleteButton" id="deleteButton">
                          <img src="${data[i].userImage}" alt="${data[i].name}" class="userImage">
                          <label for="deleteButton">
                            <div>
                            <p class="friendName">${data[i].name}</p>
                            <p class="friendFirstName">${data[i].userFirstName}</p>
                            <p class="friendLastName">${data[i].userLastName}</p>
                            <p class="friendMessage">You are now connected on Messeng...</p>
                            </div>
                          </label>
                          
                        </div>`;
  }
  chatList.innerHTML += friendStructure; 
  selectedButtons = document.querySelectorAll('#deleteButton');
};

function addFriend(event) {
  event.preventDefault();
  closeModal();
  let friendStructure = `<div class="friends" onmousedown="selectFriend()" onmouseup="unselectFriend()" id="friends">
                            <input type="checkbox" value="${userName.value}" name="${userName.value}" class="deleteButton" id="deleteButton">
                            <img src="${profileImage.src}" alt="${userName.value}" class="userImage">
                            <label for="deleteButton">
                              <div>
                              <p class="friendName">${userName.value}</p>
                              <p class="friendMessage">You are now connected on Messeng...</p>
                              </div>
                            </label>
                          </div>`;
                          
  chatList.innerHTML += friendStructure;

  let personalData = {
    name: userName.value,
    userFirstName: firstName.value,
    userLastName: lastName.value,
    userImage: profileImage.src,
  };
  data = JSON.parse(localStorage.getItem('DATA')) || [];
  data.push(personalData);
  localStorage.setItem('DATA', JSON.stringify(data));

  selectedButtons = document.querySelectorAll('#deleteButton');
  friends = document.querySelectorAll('#friends');
  userName.value = '';
  firstName.value = '';
  profileImage.src = '/images/no image.jpg';
  lastName.value = '';
  errorMessage.innerText = '';
}

function validateUser(event){
  if (firstName.value === '' || lastName.value === '' || userName.value === '') {
    errorMessage.innerText = 'Please fill in all the fields';
    event.preventDefault();
    newUser();
  } else {
    addFriend(event);
  }
}

function deleteUser() {
  
}

function searchEngine(event) {
  let value = event.target.value.toLowerCase();
  let users = document.querySelectorAll('.friends');
  users.forEach((user) => {
    let friendUserName = user.querySelector('.friendName').textContent.toLowerCase();
    if (friendUserName.includes(value)) {
      user.style.display = 'flex';
    } else {
      user.style.display = 'none';
    }
  });
}

let timer

function displaySelectButton(){
  selectedButtons.forEach((selectedButton) => {
    selectedButton.style.display = 'block';
  })
}

function selectFriend(){
  timer = setTimeout(displaySelectButton, 300)
}

function unselectFriend(){
  clearTimeout(timer)
  
}

function clearSelect(){
  selectedButtons.forEach((selectedButton) => {
    selectedButton.style.display = 'none';
  })
}



