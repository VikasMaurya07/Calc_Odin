const upper_disp = document.querySelector('#upper_display');
const lower_disp = document.querySelector('#lower_display');
const buttons = document.querySelector('.con');
function display (string) {
    upper_disp.textContent = string;
    lower_disp.textContent = string;
}
function displayValue(button) {
    button.addEventListener('click', display(button.className))
}
displayValue(buttons);