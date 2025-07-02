const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".calc.base button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = this.textContent;

            if (this.classList.contains("clear")) {
                clearDisplay();
            } else if (this.classList.contains("equal")) {
                calculate();
            } else if (this.classList.contains("backspace")) {
                backspace();
            } else {
                appendToDisplay(value);
            }
        });
    });

    function appendToDisplay(value) {
        display.value += value;
    }

    function clearDisplay() {
        display.value = "";
    }

    function backspace() {
        display.value = display.value.slice(0, -1);
    }

    function calculate() {
        try {
            if (display.value === "800815") {
                display.value = "BOOBIES";
            } else if (display.value === "80085") {
                display.value = "You pervert...";
            } else if (display.value === "8008") {
                display.value = "Childish...";
            } else if (display.value === "69") {
                display.value = "Nice...";
            } else if (display.value === "420") {
                display.value = "Drugs are bad for you...";
            }
            else {
                display.value = math.evaluate(display.value);
            }
        } catch (error) {
            display.value = "Invalid Expression";
        }
    }
