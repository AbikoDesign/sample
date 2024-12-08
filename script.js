function calculateSum() {
    const number1 = parseFloat(document.getElementById('number1').value);
    const number2 = parseFloat(document.getElementById('number2').value);
    const sum = number1 + number2;
    document.getElementById('result').innerText = sum;
}
