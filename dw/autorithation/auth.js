let auth = document.querySelector('.signin');
//let owner = document.forms.cargo.ownerOfCargo;
// прикрепляем обработчик кнопки
auth.addEventListener("submit", sendRequest);
 
// обработчик нажатия
async function sendRequest(event){
    //let currentCargo = document.getElementsByName('cargo'); 
    //alert("Введите Вес груза");
    event.preventDefault(auth);
    let method = 'POST';
    const users = { 
        username: auth.username.value,
        password: auth.password.value
    };
    let json = JSON.stringify(users);
    let header = {'Content-type': 'application/json'};
    //const response = await fetch("http://localhost:4000/send", {method, header, json});    
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4000/login");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    request.send(json);
    
    request.onload = () => {
        localStorage.setItem('userToken', request.response.slice(1, -1));
        localStorage.setItem('userName', users.username);
        alert(localStorage.getItem('userToken') );
        alert(localStorage.getItem('userName') );
    } 
    
}

