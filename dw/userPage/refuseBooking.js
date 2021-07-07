output.onclick = async function(event) {
    const className = event.target.getAttribute('class');
    if (className !== 'refuseBooking') return;
    let id = event.target.previousElementSibling.id;
 
    let url = "http://localhost:4000/update/" + id;
    let response = await fetch(url, {});
    let commits = await response.json();
    
        const posts = { 
            ownerOfCargo: commits.ownerOfCargo,
            cargoName: commits.cargoName,
            pointOfDeparture: commits.pointOfDeparture,
            pointOfDestination: commits.pointOfDestination,
            dateOfDeparture: commits.dateOfDeparture,
            typeOfCargo: commits.typeOfCargo,
            weightOfCargo: commits.weightOfCargo,
            volumeOfCargo: commits.volumeOfCargo,
            id: commits.id,
            _id: id,
            driverName: ""
        };
        let json = JSON.stringify(posts);

        let token = "Bearer " + localStorage.getItem('userToken');


        let header = {'Content-type': 'application/json'};
        let request = new XMLHttpRequest();
        request.open("PUT", "http://localhost:4000/refuse", true);
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.setRequestHeader('authorization', token);
        request.send(json); 
        request.onload = () => {
            //if (request.status==200) return;
            alert(JSON.parse(request.response).message);
        } 
        
}