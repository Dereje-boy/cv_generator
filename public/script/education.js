Array.from($('.card-body button')).forEach(thisButton => {
    $(`#${thisButton.id}`).on('click', deleteEdu);

})

function deleteEdu(e) {
    const _id = e.target.id;
    $.ajax({
        type: "DELETE",
        url: "/education",
        contentType: "application/json",
        data: JSON.stringify({ _id }),
        success: function (response) {
            // Handle the response from the backend if needed
            //console.log(response);
            if (response.success) hideFromList(_id)
            else console.log('unable to delete', response)
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error("Request failed with status: " + status + ", error: " + error);
            alert('It seems you are offline, please try again later')
        }
    });
}

function hideFromList(_id) {
    $(`#${_id}`).parent().parent().css('opacity', '0');
    setTimeout(() => {
        $(`#${_id}`).parent().parent().css('display', 'none');
    }, 1000);
}