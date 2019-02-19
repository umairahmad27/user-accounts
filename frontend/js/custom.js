// NavBar
var elems = document.querySelectorAll('.sidenav');
var instances = M.Sidenav.init(elems);

// Tool Tip
var elems = document.querySelectorAll('.tooltipped');
var instances = M.Tooltip.init(elems);

// Modal
var elems = document.querySelectorAll('.modal');
var instances = M.Modal.init(elems);


// Server Site
function signup() {
    let userID = Math.floor(Math.random() * 1000000) + 1;
    let options = {
        method: 'POST',
        body: JSON.stringify({ id: userID, username: fullName.value, email: email.value, password: password.value }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch('/signup', options)
        .then((res) => res.json())
        .then((message) => console.log('Success', message))
        .catch((error) => console.log('Error', error))
}

function login() {
    let options = {
        method: 'POST',
        body: JSON.stringify({ username: email.value, password: password.value }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch('/login', options)
        .then((res) => res.text())
        .then((text) => {
            if (text === 'success') {
                window.location.href = 'http://localhost:3000/dashboard'
            } else {
                alert('Wrong')
            }
        })
        .catch((error) => console.log('Error', error))
}
