$('.one-added-ref #delete-button').on('click', (e) => {
    //console.log('button clicked edit button')
    deleteReference(e)
})

function deleteReference(e) {
    let objectIDElement = $(e.target).next()
    hideFromList(objectIDElement)
    //console.log(e)

    //delete method to delete
    // Send the AJAX request with PUT method
    //console.log(e)
    $.ajax({
        type: "DELETE",
        url: "/reference",
        contentType: "application/json",
        data: JSON.stringify({ id: objectIDElement.text() }),
        success: function (response) {
            // Handle the response from the backend if needed
            //console.log(response);
            if (response.success) hideFromList(objectIDElement)
            else console.log('unable to delete')
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error("Request failed with status: " + status + ", error: " + error);
            alert('It seems you are offline, please try again later')
        }
    });
}

function hideFromList(objectIDElement) {
    $(objectIDElement).parent().parent().css('border', '1px solid green')
    $(objectIDElement).parent().parent().css('opacity', '0')
    setTimeout(() => {
        $(objectIDElement).parent().parent().css('display', 'none')
    }, 1000);
}