// получаем объект формы
let form = document.forms.getCargo;

// прикрепляем обработчик кнопки
form.submit.addEventListener("click", sendRequest);
 
// обработчик нажатия
async function sendRequest(event){
    event.preventDefault(getCargo);
    const posts = { 
        pointOfDeparture: document.forms.getCargo.pointOfDeparture.value,
        pointOfDestination: document.forms.getCargo.pointOfDestination.value,
        dateOfDepartureFrom: document.forms.getCargo.dateOfDepartureFrom.value,
        dateOfDepartureTo: document.forms.getCargo.dateOfDepartureTo.value,
        typeOfCargo: document.forms.getCargo.typeOfCargo.value,
        weightOfCargo: document.forms.getCargo.weightOfCargo.value,
        volumeOfCargo: document.forms.getCargo.volumeOfCargo.value
    };
   
    let response = await fetch("http://localhost:4000/posts");

    

    let commits = await response.json();
    document.getElementById("output").innerHTML='';
    for(let item of commits) {
        //let value = JSON.parse(item);
        let { 
            ownerOfCargo,
            cargoName,
            pointOfDeparture,
            pointOfDestination,
            dateOfDeparture,
            typeOfCargo,
            weightOfCargo,
            volumeOfCargo,
            id
        } = item;
        if (weightOfCargo <= posts.weightOfCargo && 
            volumeOfCargo <= posts.volumeOfCargo && 
            dateOfDeparture >= posts.dateOfDepartureFrom &&
            dateOfDeparture <= posts.dateOfDepartureTo && 
            pointOfDeparture === posts.pointOfDeparture &&
            pointOfDestination === posts.pointOfDestination)
        document.getElementById("output").innerHTML+='<a href="#" class="outputCargo">владелец:' + ownerOfCargo + '; груз: ' + cargoName
         + '; дата:' + dateOfDeparture + '; От:' + pointOfDeparture + '; До:' + pointOfDestination + '</a><br/>';
    }
    
    
}
