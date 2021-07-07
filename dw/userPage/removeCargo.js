let outputForm = document.getElementById("output");
outputForm.addEventListener('click', async function(event) {
    const className = event.target.getAttribute('class');
    if (className !== 'removeCargo') return;
    let id = event.target.previousElementSibling.id;
    let url = "http://localhost:4000/update/" + id;
    const request = new XMLHttpRequest();
    request.open("DELETE", url);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
    request.onload = () => {
        alert(JSON.parse(request.response).message);
    }
    
})