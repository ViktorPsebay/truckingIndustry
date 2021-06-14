//import post from '../../post.';

// получаем объект формы
let registration = document.querySelector('.signup');
//let owner = document.forms.cargo.ownerOfCargo;
// прикрепляем обработчик кнопки
registration.addEventListener("submit", sendRequest);
 
// обработчик нажатия
async function sendRequest(event){
    //let currentCargo = document.getElementsByName('cargo'); 
    //alert("Введите Вес груза");
    event.preventDefault(registration);
    let method = 'POST';
    const users = { 
        username: registration.username.value,
        password: registration.password.value,
        role: registration.role.value
    };
    let json = JSON.stringify(users);
    let header = {'Content-type': 'application/json'};
    //const response = await fetch("http://localhost:4000/send", {method, header, json});    
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4000/registration");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    request.send(json);
    
    request.onload = () => {
        alert(request.response);
    } 
    
}

