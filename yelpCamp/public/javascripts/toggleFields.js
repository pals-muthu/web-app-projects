
const toggleFields = document.querySelectorAll('.toggle-userLogin');

console.log("toggleFields", currentUser, toggleFields);
if (currentUser == '') {
    console.log('setting attribute');
    for (field of toggleFields) {
        field.setAttribute('disabled', 'true');
    }
}
else {
    for (field of toggleFields) {
        field.removeAttribute('disabled');
    }
}
