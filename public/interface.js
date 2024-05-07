export let pseudo = '';
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const inputElement = document.getElementById('pseudo');
    pseudo = inputElement.value;
});