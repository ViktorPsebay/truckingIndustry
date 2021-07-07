let auth = document.querySelector('.signin');

auth.addEventListener("submit", sendRequest);
 

async function sendRequest(event){
    event.preventDefault(auth);
    if (!auth.username.value) {
        alert("Логин не может быть пустым");
        return
    }
    const users = { 
        username: auth.username.value,
        password: auth.password.value
    };
    let json = JSON.stringify(users);
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4000/login");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    request.send(json);
    
    request.onload = () => {
        if (request.status == 200) {
            localStorage.setItem('userToken', request.response.slice(1, -1));
        localStorage.setItem('userName', users.username);
        //alert(localStorage.getItem('userToken') );
        alert("Hello, " + localStorage.getItem('userName') );
        document.location.href = 'http://localhost:4000/userPage/userPage.html';
        }
        else {
            alert(JSON.parse(request.response).message);
        }
        
    } 
    
}

