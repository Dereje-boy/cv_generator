const loginButton = document.querySelector("#login");
const dialogContainer = document.querySelector('.dialog-container')
const closeButton = document.querySelector('#close-button');

const form = document.querySelector('#form');

const email = document.querySelector("#email");
const password = document.querySelector("#password");

loginButton.addEventListener('click', (e) => {
    //console.log("logging in");
    dialogContainer.style.top = "20%";
    dialogContainer.style.zIndex = "5";

})

closeButton.addEventListener('click', (e) => {
    dialogContainer.style.top = "-80%";
})

dialogContainer.style.top = "-80%";

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    //console.log(email.value);
    // console.log(password.value);

    $.post('/login', { email: email.value, password: password.value }, (data, status) => {
        console.log(data);

        //checking status response and then redirecting
        if (status === 'success') {
            window.location.href = "/login"
        }
    })

})
