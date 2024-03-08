// console.log($('.delete-language-btn'))

Array.from($('.delete-language-btn')).forEach(thisDeleteButton => {
    $(thisDeleteButton).on('click', deleteLanguage);
});

function deleteLanguage(e) {
    let id = e.target.id;
    $.ajax({
        type: "DELETE",
        url: "/languages",
        contentType: "application/json",
        data: JSON.stringify({ id }),
        success: function (response) {
            // Handle the response from the backend if needed
            // console.log(response);
            if (response.deleted) hideFromList(id)
            else console.log(reason)
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error("Request failed with status: " + status + ", error: " + error);
            alert('It seems you are offline, please try again later')
        }
    });
}

function hideFromList(id) {
    $('#' + id).parent().parent().css('opacity', '0')
    setTimeout(() => {
        $('#' + id).parent().parent().css('display', 'none')
    }, 1000);
}