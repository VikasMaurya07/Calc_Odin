const upper_disp = document.querySelector('#upper_display');
const lower_disp = document.querySelector('#lower_display');
const controls = document.querySelectorAll('.con');
const operators = document.querySelectorAll('.op');
const numbers = document.querySelectorAll('.num');
var store = '';
var resultOnDisplay = false;
var hyperResult = false;
var endResult = false;
var evalArray = [];
function handleRogue(op) {
    evalArray.splice(2);
    var temp = upper_disp.textContent.split('').reverse();
    var index = temp.indexOf(op);
    if(index == 0) {
        temp.shift();
        index = temp.indexOf(op);
        temp.splice(0,index);
    }
    else{
        temp.splice(0,index);
    }
    temp.reverse();
    var straight = temp.join('');
    upper_disp.textContent = straight;
}
function display() {
    if (endResult) {
        resultOnDisplay = false;
        upper_disp.textContent = '';
        evalArray = [];
        endResult = false;
    }
    else if (resultOnDisplay) {
        lower_disp.textContent = '';
        resultOnDisplay = false;
    }
}
function handleHyperValue(number) {
    if (number) {
        alert('result out of bounds');
        let RogueOnes = evalArray.splice(-2);
        let joined = RogueOnes.join('');
        var reverseUpper = upper_disp.textContent.split('').reverse().join('');
        var reverseRogue = joined.split('').reverse().join('');
        var reversedMod = reverseUpper.replace(reverseRogue, "");
        var straight = reversedMod.split('').reverse().join('');
        upper_disp.textContent = straight;
        lower_disp.textContent = evalArray[0];
        resultOnDisplay = true;

    }
}
function evalFunc(Array) {
    let num1 = Array[0];
    let opr1 = Array[1];
    let num2 = Array[2];
    let opr2 = Array[3];
    var result;
    switch (opr1) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 == 0) {
                alert("Don't divide by zero!😡");
                handleRogue('/');
            }
            else {
                result = num1 / num2;
            }
            break;
        case '%':
            if (num2 == 0) {
                alert("Don't divide by zero!😡");
                handleRogue('%');
            }
            else {
                result = num1 % num2;
            }
            break;
        default:
            alert("Math error!🫠");
            handleRogue('=');
    }
    if (opr2 !== '=') {
        var strResult = result.toString();
        if (strResult.length < 12) {
            console.log(Array);
            Array[0] = result;
            Array[1] = opr2;
            console.log(Array);
            Array.splice(2);
            console.log(Array);
            lower_disp.textContent = Array[0];
            resultOnDisplay = true;
        }
        else if ((strResult.length) > 12 && (result < 99999999999 && result > -9999999999)) {
            let decIndex = strResult.indexOf('.');
            let n = strResult.length - (strResult.length - 12) - decIndex - 1;
            result = Math.round(result * 10 ** n) / 10 ** n;
            console.log(Array);
            Array[0] = result;
            Array[1] = opr2;
            console.log(Array);
            Array.splice(2);
            console.log(Array);
            lower_disp.textContent = Array[0];
            resultOnDisplay = true;
        }
        else if (result > 99999999999 || result < -9999999999) {
            console.log(evalArray);
            hyperResult = true;
            handleHyperValue(hyperResult);
        }
    }
    else if (opr2 == '=') {
        var strResult = result.toString();
        if (strResult.length < 12) {
            console.log(Array);
            Array[0] = result;
            console.log(Array);
            Array.splice(1);
            console.log(Array);
            lower_disp.textContent = Array[0];
            resultOnDisplay = true;
            endResult = true;
        }
        else if ((strResult.length) > 12 && (result < 99999999999 && result > -9999999999)) {
            let decIndex = strResult.indexOf('.');
            let n = strResult.length - (strResult.length - 12) - decIndex - 1;
            result = Math.round(result * 10 ** n) / 10 ** n;
            console.log(Array);
            Array[0] = result;
            console.log(Array);
            Array.splice(1);
            console.log(Array);
            lower_disp.textContent = Array[0];
            resultOnDisplay = true;
            endResult = true
        }
        else if (result > 99999999999 || result < -9999999999) {
            console.log(evalArray);
            hyperResult = true;
            endResult = true;
            handleHyperValue(hyperResult);
        }
        display();
    }
}
function operate() {
    const string = store;
    const operand = parseFloat(string.slice(0, string.length - 1))
    const opr = string[string.length - 1];
    evalArray.push(operand);
    evalArray.push(opr);
    store = '';
    if (evalArray.length == 4) {
        evalFunc(evalArray);
    }
}
function displayValue() {
    lower_disp.textContent = '';
    upper_disp.textContent = '';
    numbers.forEach(function (element) {
        if (element.id == '.') {
            element.addEventListener('click', function () {
                display();
                if (!(lower_disp.textContent.includes('.'))) {
                    if (lower_disp.textContent.trim().length < 12) {
                        lower_disp.textContent += element.id;
                    }
                }
            })
        }
        else {
            element.addEventListener('click', function () {
                display();
                if (lower_disp.textContent.trim().length < 12) {
                    lower_disp.textContent += element.id;
                }
            });
        }
    })
    operators.forEach(function (element) {
        if (element.id == 'sign') {
            element.addEventListener('click', function () {
                if (lower_disp.textContent.trim().length == 12 && lower_disp.textContent.startsWith('-')) {
                    lower_disp.textContent = lower_disp.textContent.slice(1)
                }
                else if (lower_disp.textContent.trim().length < 12) {
                    lower_disp.textContent = lower_disp.textContent.startsWith('-') ? lower_disp.textContent.slice(1) : '-' + lower_disp.textContent;
                }
                else if (!(lower_disp.textContent.startsWith('-')) && lower_disp.textContent.trim().length >= 12) {
                    alert('Max char limit reached');
                }
            });
        }
        else {
            element.addEventListener('click', function () {
                var lastChar = upper_disp.textContent[upper_disp.textContent.trim().length - 1];
                if ((lastChar !== '-' && lastChar !== '+' && lastChar !== '/' && lastChar !== '*' && lastChar !== '%' && lastChar !== '=') || (lower_disp.textContent.trim().length !== 0) && (lower_disp.textContent !== '-')) {
                    lower_disp.textContent += element.id;
                    if (upper_disp.textContent.trim().length < 15) {
                        upper_disp.textContent += lower_disp.textContent;
                        store += lower_disp.textContent;
                        lower_disp.textContent = '';
                        operate();
                    }
                    else if (upper_disp.textContent.trim().length >= 15) {
                        let joined2 = evalArray.join('');
                        upper_disp.textContent = joined2;
                        upper_disp.textContent += lower_disp.textContent;
                        store += lower_disp.textContent;
                        lower_disp.textContent = '';
                        operate();
                    }
                }
                else if (lower_disp.textContent.trim().length === 0 && element.id !== '=') {
                    if (upper_disp.textContent.trim().length < 15) {
                        console.log('yes');
                        evalArray[1] = element.id;
                        console.log(evalArray);
                        var temp = upper_disp.textContent.split('');
                        temp[temp.length - 1] = element.id;
                        var straight = temp.join('');
                        upper_disp.textContent = straight;
                    }
                    else if (upper_disp.textContent.trim().length >= 15) {
                        let joined2 = evalArray.join('');
                        upper_disp.textContent = joined2;
                        console.log('yes');
                        evalArray[1] = element.id;
                        console.log(evalArray);
                        var temp = upper_disp.textContent.split('');
                        temp[temp.length - 1] = element.id;
                        var straight = temp.join('');
                        upper_disp.textContent = straight;
                    }

                }

            });
        };
    });
    controls.forEach(function (element) {
        if (element.id == 'AC') {
            element.addEventListener('click', function () {
                upper_disp.textContent = '';
                lower_disp.textContent = '';
                store = '';
                evalArray = [];
            })
        }
        if (element.id == 'C') {
            element.addEventListener('click', function () {
                const lastIndex = lower_disp.textContent.length;
                lower_disp.textContent = lower_disp.textContent.slice(0, lastIndex - 1);
            })
        }
    })
}
displayValue();
