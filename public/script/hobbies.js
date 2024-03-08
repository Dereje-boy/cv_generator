console.log('hobby script added successfully')

const hobbyButtons = $('.single-hobby button')

for (let i = 0; i < $('.single-hobby button').length; i++) {
    thisElement = $('.single-hobby button')[i]
    //console.log(thisElement);
    thisElement.addEventListener('click', (e) => {
        sendDeleteHobby(e)
    })
}

function sendDeleteHobby(e) {
    // Send the AJAX request with PUT method
    //console.log(e)
    $.ajax({
        type: "PUT",
        url: "/hobbies",
        contentType: "application/json",
        data: JSON.stringify({ theHobby: e.target.id }),
        success: function (response) {
            // Handle the response from the backend if needed
            //console.log(response);
            if (response.success) deleteFromList(e)
            else console.log('unable to delete')
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error("Request failed with status: " + status + ", error: " + error);
            alert('It seems you are offline, please try again later')
        }
    });
}

function deleteFromList(e) {
    let parentDiv = $(e.target).parent();
    parentDiv.addClass('bg-success text-white');
    parentDiv.css('opacity', '0');

}
