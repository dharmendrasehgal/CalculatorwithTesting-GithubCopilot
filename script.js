document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('digit')) {
                handleDigit(value);
            } else if (button.classList.contains('decimal')) {
                handleDecimal();
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('clear')) {
                clear();
            } else if (button.classList.contains('delete')) {
                deleteLast();
            } else if (button.classList.contains('equals')) {
                calculate();
            }

            updateDisplay();
        });
    });

    function handleDigit(digit) {
        if (shouldResetDisplay) {
            currentInput = digit;
            shouldResetDisplay = false;
        } else {
            currentInput = currentInput === '0' ? digit : currentInput + digit;
        }
    }

    function handleDecimal() {
        if (shouldResetDisplay) {
            currentInput = '0';
            shouldResetDisplay = false;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function handleOperator(op) {
        if (currentInput === '' && previousInput === '') return;
        if (currentInput === '') {
            operation = op;
            return;
        }
        if (previousInput !== '') {
            calculate();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        if (previousInput === '' || currentInput === '' || operation === null) return;

        let result;
        const prev = Number.parseFloat(previousInput);
        const current = Number.parseFloat(currentInput);

        if (Number.isNaN(prev) || Number.isNaN(current)) return;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operation = null;
        previousInput = '';
        shouldResetDisplay = true;
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operation = null;
        shouldResetDisplay = false;
    }

    function deleteLast() {
        if (shouldResetDisplay) return;
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') currentInput = '0';
    }

    function updateDisplay() {
        display.value = currentInput || '0';
    }

    // Initialize display
    updateDisplay();
});