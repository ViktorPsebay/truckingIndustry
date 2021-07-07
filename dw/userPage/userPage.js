// получаем объект формы
let form = document.querySelector('.buttonInForm');

// прикрепляем обработчик кнопки
form.addEventListener("click", sendRequest);
 
// обработчик нажатия
async function sendRequest(event){
    event.preventDefault(getCargo);
    const userName = localStorage.getItem('userName');
    let json = JSON.stringify({username: userName});
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4000/lk", true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    let token = "Bearer " + localStorage.getItem('userToken');
    request.setRequestHeader('authorization', token);
    request.send(json); 
    request.onload = async () => {
        if (request.status != 200) {
            alert(JSON.parse(request.response).message);
            return
        }
        let role = JSON.parse(request.response).role;
        // alert(role);
        // alert(typeof role);


        let response = await fetch("http://localhost:4000/posts");    

        let commits = await response.json();
        document.getElementById("output").innerHTML='<h1>Результаты поиска:</h1>';
        for(let item of commits) {
        let { 
            ownerOfCargo,
            cargoName,
            pointOfDeparture,
            pointOfDestination,
            dateOfDeparture,
            driverName = "",
            _id
        } = item;
        if (role == 'Driver') {
            if (driverName === userName)
            document.getElementById("output").innerHTML+='<div class="containerForOutput"><span id="' + 
            _id + '" ' + 'class="outputOfCargo">владелец:' + ownerOfCargo + '; перевозчик:' + driverName +
             '; груз: ' + cargoName + '; дата:' + dateOfDeparture + '; От:' + pointOfDeparture + '; До:' +
              pointOfDestination + 
             '</span><button class="refuseBooking">Снять бронирование</button></div>';
            
        }
        if (role == 'Customer') {
            if (ownerOfCargo === userName)
            document.getElementById("output").innerHTML+='<div class="containerForOutput"><span id="' + 
            _id + '" ' + 'class="outputOfCargo">владелец:' + ownerOfCargo + '; перевозчик:' + driverName +
             '; груз: ' + cargoName + '; дата:' + dateOfDeparture + '; От:' + pointOfDeparture + '; До:' +
              pointOfDestination + 
             '</span><button class="removeCargo">удалить груз</button></div>';
            
        }
    }
    
    }
}