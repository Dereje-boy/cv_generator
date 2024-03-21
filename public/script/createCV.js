console.log("script integrated successfully")
/*
$('#pdf-download-form').on('click',(event)=>{
    event.preventDefault();
    console.log(event)
    $.post({
        url: '/',
        success: function (Data) {
            // Display response in the 'message' paragraph
            console.log(Data)

            let message = Data.message;
            let status = Data.status;

            //status === false if there isno error, > error.status === false
            if (status === false)
                window.location.href = '/dashboard'

            $('#result-message').text(message);

            //returning back the button to work
            document.querySelector('#submit-button').disabled = false;
        },

        error: function (xhr, status, error) {

            //returning back the button to work
            document.querySelector('#submit-button').disabled = false;
        }
    });
})

 */