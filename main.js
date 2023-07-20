// fetch a user and display them one at a time.
window.onload = function() {
    addressBook()
}

let people = [];
const container = document.getElementById('container')

const API = 'https://randomuser.me/api/?results=5'

const addressBook = () => {
  fetch(API)
    .then(res => {
        if(!res.ok) {
            throw Error(res.statusText)
        }return res.json()
    })
    .then(data => {
        console.log(data)
        people = data.results
    })
    .catch(err => console.log(`Error, ${err}`))
    .then(() => {
        people.forEach((person) => {
            let content = document.createElement("div")

            content.classList.add("content-container")

            content.innerHTML = `
            <h4>${person.name.first} ${person.name.last}</h4>
            <img src="${person.picture.large}"/>

            <button id="${person.login.uuid}" onclick="showHide(this)">More Info/Less Info</button>

            <div class="moreInfo" id="${person.login.uuid}-person">
            Email: ${person.email} <br>
            Phone: ${person.phone} <br>
            Address: ${person.location.street.number} ${person.location.street.name}, 
            ${person.location.city}, ${person.location.state} ${person.location.postcode}
            </div>
            `

            container.appendChild(content)
        })
    })    
}


const showHide = (button) => {
    console.log(button)
    let x = document.getElementById(button.id+"-person")
    console.log(x,'this is the clicked')
    console.log(x.style.display,'current style')
    if(x.style.display === "none" || !x.style.display) {
        x.style.display = "block";
    } else {
        x.style.display = "none"
    }
}
