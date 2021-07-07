// получаем объект формы
let registration = document.querySelector('.signup');
//let owner = document.forms.cargo.ownerOfCargo;
// прикрепляем обработчик кнопки
registration.addEventListener("submit", sendRequest);
 
// обработчик нажатия
async function sendRequest(event){
    
    event.preventDefault(registration);
    
    const users = { 
        username: registration.username.value, 
        password: registration.password.value,
        role: registration.role.value
    };
    
    if (users.password !== registration.passwordAgain.value) {
        alert("Пароли не совпадают");
        registration.password.value = registration.passwordAgain.value = '';
        return
    }
    if (users.password.length <= 3) {
        alert("Пароль должен быть не менее четырех символов");
        registration.password.value = registration.passwordAgain.value = '';
        return
    }

    if (!registration.username.value) {
        alert("Логин не может быть пустым");
        return
    }

    let json = JSON.stringify(users);
    
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4000/registration");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    request.send(json);
    
    request.onload = () => {
        alert(JSON.parse(request.response).message);
    } 
    
}

