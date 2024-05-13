document.addEventListener("DOMContentLoaded", function() {
document.getElementById('popup').style.display = 'block';
});

function closePopup() {
    const nameInput = document.getElementById('pseudo')
    const name = nameInput.value.trim();
    if(name !== ''){
        console.log(name);
        document.getElementById('popup').style.display = 'none'; 
    }else{
            alert('Please enter a Pseudo !');
        }
}
// export {name};