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

    //showing loader animator
    $('.loader').removeClass('d-none')
    $('.loader').addClass('d-flex')

    //hiding submit button
    $('#submit-button').addClass('d-none')

    $.post('/login', { email: email.value, password: password.value }, (data, status) => {
        //console.log(data);

        //hiding loading animator
        $('.loader').removeClass('d-flex')
        $('.loader').addClass('d-none')

        //showing submit button
        $('#submit-button').removeClass('d-none')
        $('#submit-button').removeClass('d-block')

        //checking status response and then redirecting
        if (status === 'success' && data.success) {
            dialogContainer.style.top = "-80%";
            return window.location.href = "/login"
        }

        let errorMessage = data != undefined ? data.error : null
        console.log(errorMessage);
        $('#message').removeClass('text-primary');
        $('#message').addClass('text-danger');
        $("#message").text(errorMessage)

    })
})



//working with loading animation
// const loadingContainer = document.querySelector('.index-loading-container');
// console.log(loadingContainer);
// setTimeout(() => {
//     loadingContainer.style.zIndex = "0";
//     loadingContainer.style.opacity = "0";
//     console.log('running time out');
// }, 3000);

//working with loading animation of IMAGE
const imagePlaceholder = document.querySelector('#image-placeholder');
setTimeout(() => {
    if (imagePlaceholder) imagePlaceholder.style.opacity = "0";
}, 3000);

const indexContainerImages = $('.index-container img');

indexContainerImages.toArray().forEach(thisImage => {
    console.log(thisImage);
});