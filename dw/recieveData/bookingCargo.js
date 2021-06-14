output.onclick = async function(event) {
    alert(event.target);
    alert(event);
    alert(event.target.previousElementSibling);
    alert(event.target.previousElementSibling.id);
    let id = event.target.previousElementSibling.id;
    let url = "http://localhost:4000/update/" + id;
    let response = await fetch(url, {});
    let commits = await response.json();
    // for (let elem of commits) {
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
            driverName: localStorage.getItem('userName')
        };
        let json = JSON.stringify(posts);
        let header = {'Content-type': 'application/json'};
        let request = new XMLHttpRequest();
        request.open("PUT", "http://localhost:4000/update", true);
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
        await request.send(json); 
        request.onload = () => {
            alert(request.response);
        } 
    // }
    
    
    let Method = 'PUT' 
    //let response = await fetch("http://localhost:4000/update", {method: Method, body: id});

    

    //let commits = await response.json();
    alert(typeof id);
  };