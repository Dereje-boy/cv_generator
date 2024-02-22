const userForm = document.querySelector('#user-form');



//required to check the input data is valid or not
//if valid redirecting to homepage or design page by saving cookies on client browser
//if not valid, writing the reason and expected solution on p tag with id message,
userForm.addEventListener('submit', (e) => {
    console.log('sending data to backend');
    e.preventDefault();

    const email = document.querySelector('#emailInput').value
    const password = document.querySelector('#passwordInput').value
    const passwordRepeat = document.querySelector('#passwordRepeatInput').value

    data = { email, password, passwordRepeat }

    console.log(data)

    $.post({
        url: '/signup', // Replace with your backend URL
        data: data,
        success: function (response) {
            // Display response in the 'message' paragraph
            console.log(response)
            message = '';
            if (typeof response == 'string') message = response;
            else
                (Object.keys(response)).forEach(r => {
                    message += response[r] + " ";
                    return message
                })
            $('#message').text(message);

            console.log();
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error(xhr.responseText);
            $('#message').text('Error: ' + xhr.responseText);
        }
    });
})

/*
$(document).ready(function () {
    $('#myForm').submit(function (event) {
        // Prevent default form submission
        event.preventDefault();

        // Get form data
        var formData = $(this).serialize();

        // Send POST request
        $.post({
            url: 'your_backend_url_here', // Replace with your backend URL
            data: formData,
            success: function (response) {
                // Display response in the 'message' paragraph
                $('#message').text(response);
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(xhr.responseText);
                $('#message').text('Error: ' + xhr.responseText);
            }
        });
    });
});
*/
console.log("Welcome to sign up page.....");