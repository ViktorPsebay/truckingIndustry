// получаем объект формы
let form = document.forms.getCargo;

// прикрепляем обработчик кнопки
form.submit.addEventListener("click", sendRequest);
 
// обработчик нажатия
async function sendRequest(event){
    event.preventDefault(getCargo);

    // let exp = //d{/;
    if (!document.forms.getCargo.dateOfDepartureFrom.value) {
        alert("Заполните дату отправления");
        return
    }

    if (!document.forms.getCargo.dateOfDepartureTo.value) {
        alert("Заполните дату отправления");
        return
    }

    if (!document.forms.getCargo.pointOfDeparture.value) {
        alert("Заполните пункт отправления");
        return
    }

    if (!document.forms.getCargo.volumeOfCargo.value) {
        alert("Заполните объем");
        return
    }

    if (!document.forms.getCargo.weightOfCargo.value) {
        alert("Заполните вес");
        return
    }

    if (!validateDate(document.forms.getCargo.dateOfDepartureFrom.value)) {
        alert("неправильный формат даты");
        return
    }
    if (!validateDate(document.forms.getCargo.dateOfDepartureTo.value)) {
        alert("неправильный формат даты");
        return
    }

    if (document.forms.getCargo.weightOfCargo.value<0) {
        alert("Вес не может быть отрицательным");
        return
    }

    if (document.forms.getCargo.volumeOfCargo.value<0) {
        alert("Объем не может быть отрицательным");
        return
    }

    function validateDate(date){ 
        const regex=new RegExp("([0-9]{4}[.](0[1-9]|1[0-2])[.]([0-2]{1}[0-9]{1}|3[0-1]{1}))"); 
        let dateOk=regex.test(date);
        return dateOk;
    }

    // validateDate(document.forms.getCargo.dateOfDepartureFrom.value);    

    const posts = { 
        pointOfDeparture: document.forms.getCargo.pointOfDeparture.value,
        //pointOfDestination: document.forms.getCargo.pointOfDestination.value,
        dateOfDepartureFrom: document.forms.getCargo.dateOfDepartureFrom.value,
        dateOfDepartureTo: document.forms.getCargo.dateOfDepartureTo.value,
        //typeOfCargo: document.forms.getCargo.typeOfCargo.value,
        weightOfCargo: document.forms.getCargo.weightOfCargo.value,
        volumeOfCargo: document.forms.getCargo.volumeOfCargo.value
    };
   
    let response = await fetch("http://localhost:4000/posts");

    

    let commits = await response.json();
    document.getElementById("output").innerHTML='<h1>Результаты поиска:</h1>';
    for(let item of commits) {
        //let value = JSON.parse(item);
        let { 
            ownerOfCargo,
            cargoName,
            pointOfDeparture,
            pointOfDestination,
            dateOfDeparture,
            weightOfCargo,
            volumeOfCargo,
            driverName="",
            _id
        } = item;
        if (weightOfCargo <= posts.weightOfCargo && 
            volumeOfCargo <= posts.volumeOfCargo && 
            dateOfDeparture >= posts.dateOfDepartureFrom &&
            dateOfDeparture <= posts.dateOfDepartureTo && 
            pointOfDeparture === posts.pointOfDeparture &&
            driverName == "")
        document.getElementById("output").innerHTML+='<div class="containerForOutput"><span id="' + 
        _id + '" ' + 'class="outputOfCargo">владелец:' + ownerOfCargo + '; груз: ' + cargoName
         + '; дата:' + dateOfDeparture + '; От:' + pointOfDeparture + '; До:' + pointOfDestination + 
         '</span><button class="buttonForBooking">Забронировать</button></div>';
    }
    
    
}