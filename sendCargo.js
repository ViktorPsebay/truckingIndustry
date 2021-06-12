//import post from '../../post.';

// получаем объект формы
let form = document.forms.cargo;
//let owner = document.forms.cargo.ownerOfCargo;
// прикрепляем обработчик кнопки
form.submit.addEventListener("click", sendRequest);
 
// обработчик нажатия
async function sendRequest(event){
    //let currentCargo = document.getElementsByName('cargo'); 
    event.preventDefault(cargo);
    let method = 'POST';
    const posts = new post({ 
        ownerOfCargo: document.forms.cargo.ownerOfCargo.value,
        cargoName: document.forms.cargo.cargoName.value,
        pointOfDeparture: document.forms.cargo.pointOfDeparture.value,
        pointOfDestination: document.forms.cargo.pointOfDestination.value,
        dateOfDeparture: document.forms.cargo.dateOfDeparture.value,
        typeOfCargo: document.forms.cargo.typeOfCargo.value,
        weightOfCargo: document.forms.cargo.weightOfCargo.value,
        volumeOfCargo: document.forms.cargo.volumeOfCargo.value,
        id: document.forms.cargo.id.value
    })
    let json = JSON.stringify(posts);
    //let owner = ;
    //let owner = document.forms.cargo.ownerOfCargo.value;
    let header = {'Content-type': 'application/json'};
    const response = await fetch("http://localhost:4000/send", {method, header, json});    
    //let request = new XMLHttpRequest();
    //request.open("POST", "http://localhost:4000/send");
    //request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    //request.onreadystatechange = function () {
    //         if (request.readyState == 4 && request.status == 200)
    //             document.getElementById("output").innerHTML=request.responseText;
    // }
    //request.send(json);
    
}

