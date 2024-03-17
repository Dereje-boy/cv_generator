// console.log()
Array.from($('.card-body button')).forEach(thisButton => {
    $(thisButton).on('click', deleteExperience);
})

function deleteExperience(e) {
    const id = e.target.id
    console.log(id)
    $.ajax({
        type: "DELETE",
        url: "/experience",
        contentType: "application/json",
        data: JSON.stringify({ id }),
        success: function (response) {
            // Handle the response from the backend if needed
            console.log(response);
            if (response.success) hideFromList(id)
            else console.log('unable to delete')
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error("Request failed with status: " + status + ", error: " + error);
            alert('It seems you are offline, please try again later')
        }
    });
}

function hideFromList(id) {
    $(`#${id}`).parent().parent().css('border', '1px solid green')
    $(`#${id}`).parent().parent().css('opacity', '0')
    setTimeout(() => {
        $(`#${id}`).parent().parent().css('display', 'none')
    }, 1000);
}