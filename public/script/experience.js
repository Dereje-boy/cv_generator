console.log("experience js integrated successfully");

document.querySelector("#checkbox").addEventListener('change', (e) => {
    checked = e.srcElement.checked
    // if (checked) document.querySelector("#endDate").classList.add('d-none');
    // else document.querySelector("#endDate").classList.remove('d-none');
    if (checked)
        document.querySelector("#endDate").style.visibility = 'hidden';
    else
        document.querySelector("#endDate").style.visibility = 'visible';

})

document.querySelector("#endDate").style.visibility = 'show';