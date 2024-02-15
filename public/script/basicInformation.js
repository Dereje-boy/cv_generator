console.log("basic information js integrated successfully");

const imageInput = document.getElementById('imageinput');
const image = document.getElementById('image');

imageInput.addEventListener('change', function () {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});