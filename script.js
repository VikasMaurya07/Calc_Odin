const upper_disp = document.querySelector('#upper_display');
const lower_disp = document.querySelector('#lower_display');
const controls = document.querySelectorAll('.con');
const operators = document.querySelectorAll('.op');
const numbers = document.querySelectorAll('.num');
function display(string) {
    if (lower_disp.textContent.trim().length < 8) {
        lower_disp.textContent += string;
    }
}
function operate(string) {

}
function displayValue() {
    numbers.forEach(function (element) {
        element.addEventListener('click', function () {
            display(element.id);
        });
    })
    operators.forEach(function (element) {
        element.addEventListener('click', function () {
            lower_disp.textContent += element.id;
            upper_disp.textContent += lower_disp.textContent;
            lower_disp.textContent = '';
        });
    })
    controls.forEach(function(element) {
        if (element.id=='AC') {
            element.addEventListener('click', function () {
                upper_disp.textContent = '';
                lower_disp.textContent = '';
            })
        }
        if (element.id=='C') {
            element.addEventListener('click', function () {
            const lastIndex = lower_disp.textContent.length;
                lower_disp.textContent = lower_disp.textContent.slice(0,lastIndex-1);
            })
        }
    })
}
displayValue();