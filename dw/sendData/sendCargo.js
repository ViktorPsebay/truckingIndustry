//import post from '../../post.';

// получаем объект формы
let form = document.forms.cargo;
//let owner = document.forms.cargo.ownerOfCargo;
// прикрепляем обработчик кнопки
form.submit.addEventListener("click", sendRequest);
 
// обработчик нажатия
async function sendRequest(event){
    //let currentCargo = document.getElementsByName('cargo'); 
    //alert("Введите Вес груза");
    event.preventDefault(cargo);

    function validateDate(date){ 
        const regex=new RegExp("([0-9]{4}[.](0[1-9]|1[0-2])[.]([0-2]{1}[0-9]{1}|3[0-1]{1}))"); 
        let dateOk=regex.test(date);
        return dateOk;
    }


    if (!form.dateOfDeparture.value) {
        alert("Заполните дату отправления");
        return
    }

    if (!form.pointOfDeparture.value) {
        alert("Заполните пункт отправления");
        return
    }

    if (!form.pointOfDestination.value) {
        alert("Заполните пункт прибытия");
        return
    }

    if (!form.volumeOfCargo.value) {
        alert("Заполните объем");
        return
    }

    if (!form.weightOfCargo.value) {
        alert("Заполните вес");
        return
    }

    if (!form.cargoName.value) {
        alert("Заполните наименование груза");
        return
    }

    if (!validateDate(form.dateOfDeparture.value)) {
        alert("неправильный формат даты");
        return
    }
        

    if (form.weightOfCargo.value<0) {
        alert("Вес не может быть отрицательным");
        return
    }

    if (form.volumeOfCargo.value<0) {
        alert("Объем не может быть отрицательным");
        return
    }

    const posts = { 
        ownerOfCargo: localStorage.getItem('userName'),
        cargoName: document.forms.cargo.cargoName.value,
        pointOfDeparture: document.forms.cargo.pointOfDeparture.value,
        pointOfDestination: document.forms.cargo.pointOfDestination.value,
        dateOfDeparture: document.forms.cargo.dateOfDeparture.value,
        typeOfCargo: document.forms.cargo.typeOfCargo.value || 'ordinary',
        weightOfCargo: document.forms.cargo.weightOfCargo.value,
        volumeOfCargo: document.forms.cargo.volumeOfCargo.value,
        id: document.forms.cargo.id.value || "",
        driverName: ""
    };
    let json = JSON.stringify(posts);
    let header = {'Content-type': 'application/json'};
    //const response = await fetch("http://localhost:4000/send", {method, json, header});    
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4000/send", true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    let token = "Bearer " + localStorage.getItem('userToken');
    request.setRequestHeader('authorization', token);
    request.send(json); 
    request.onload = () => {
        alert(JSON.parse(request.response).message);
    } 
}

