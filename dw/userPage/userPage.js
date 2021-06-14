// получаем объект формы
let form = document.forms.getCargo;

// прикрепляем обработчик кнопки
form.submit.addEventListener("click", sendRequest);
 
// обработчик нажатия
async function sendRequest(event){
    event.preventDefault(getCargo);
    // const posts = { 
    //     pointOfDeparture: document.forms.getCargo.pointOfDeparture.value,
    //     pointOfDestination: document.forms.getCargo.pointOfDestination.value,
    //     dateOfDepartureFrom: document.forms.getCargo.dateOfDepartureFrom.value,
    //     dateOfDepartureTo: document.forms.getCargo.dateOfDepartureTo.value,
    //     typeOfCargo: document.forms.getCargo.typeOfCargo.value,
    //     weightOfCargo: document.forms.getCargo.weightOfCargo.value,
    //     volumeOfCargo: document.forms.getCargo.volumeOfCargo.value
    // };
    let token = "Bearer " + localStorage.getItem('userToken');
    let response = await fetch("http://localhost:4000/users",  {
        headers: {
            authorization: token
        }
    });

    // let request = new XMLHttpRequest();
    // request.open("GET", "http://localhost:4000/users");
    // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // request.setRequestHeader('authorization', token);
    // request.send();
    
    // request.onload = () => {
    //     //localStorage.setItem('Vik', request.response);
    //     alert(request.response);
    // } 
    

    let commits = await response.json();
    document.getElementById("output").innerHTML='<h1>Результаты поиска:</h1>';
    for(let item of commits) {
        //let value = JSON.parse(item);
        let { 
            username,
            password,
            role,
            _id
        } = item;
        // if (weightOfCargo <= posts.weightOfCargo && 
        //     volumeOfCargo <= posts.volumeOfCargo && 
        //     dateOfDeparture >= posts.dateOfDepartureFrom &&
        //     dateOfDeparture <= posts.dateOfDepartureTo && 
        //     pointOfDeparture === posts.pointOfDeparture &&
        //     pointOfDestination === posts.pointOfDestination)
        document.getElementById("output").innerHTML+='<div class="containerForOutput"><span id="' + 
        _id + '" ' + 'class="outputOfCargo">владелец:' + username + '; груз: ' + role
         + '; дата:' + password + '</span><button classs="buttonForBooking">Забронировать</button></div>';
    }
    
    
}