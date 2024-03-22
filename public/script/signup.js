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

    //console.log(data)

    document.querySelector('#user-submit-button').disabled = true;

    $.post({
        url: '/signup',
        data: data,
        success: function (Data) {
            // Display response in the 'message' paragraph
            console.log(Data)

            let message = Data.message;
            let status = Data.status;

            //status === false if there isno error, > error.status === false
            if (status === false)
                window.location.href = '/'

            $('#result-message').text(message);

            //returning back the button to work
            document.querySelector('#user-submit-button').disabled = false;
        },

        error: function (xhr, status, error) {
            // Handle errors
            let errorMessage = '';

            try {
                errorMessage = xhr.responseText;
            } catch (error) {
                $('#result-message').text('Error: No Internet Connection');
            }
            console.error(errorMessage);
            $('#result-message').text('Error: ' + errorMessage.length > 0 ? errorMessage : '');

            //returning back the button to work
            document.querySelector('#user-submit-button').disabled = false;
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