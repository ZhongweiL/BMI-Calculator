let standard = true;
const calculateBtn = document.querySelector("#calculate");
const stdBtn = document.querySelector("#standard");
const mtcBtn = document.querySelector("#metric");
const heightLabel = document.querySelector("#ft-label");
const weightLabel = document.querySelector("#pounds-label");
const height = document.querySelector("#feet");
const heightInches = document.querySelector("#inches");
const weight = document.querySelector("#pounds");
const inputs = document.querySelectorAll("input");
const resetBtn = document.querySelector("#reset");

//use different versions of calculations in standard and metric mode
calculateBtn.addEventListener("click", () => {
    if (checkEmpty(inputs)) {
        alert("Please enter every required field.");
        return;
    }
    document.querySelector("#BMI").setAttribute("readonly", "no");
    if (standard) {
        document.querySelector("#BMI").value = calculateInStandard();
    } else {
        document.querySelector("#BMI").value = calculateInMetric();
    }
    document.querySelector("#BMI").setAttribute("readonly", "yes");
});

//turning on metric mode
mtcBtn.addEventListener("click", () => {
    if (!standard) {
        return;
    }
    standard = false;
    reset();
    heightLabel.innerHTML = "centimeters";
    weightLabel.innerHTML = "kilograms";
    heightInches.parentElement.classList.add("disappear");
    stdBtn.classList.remove("chosen");
    mtcBtn.classList.add("chosen");
});

//turning back to standard mode
stdBtn.addEventListener("click", () => {
    if (standard) {
        return;
    }
    standard = true;
    reset();
    heightLabel.innerHTML = "feet";
    weightLabel.innerHTML = "pounds";
    heightInches.parentElement.classList.remove("disappear");
    mtcBtn.classList.remove("chosen");
    stdBtn.classList.add("chosen");
});

//reset all input data
resetBtn.addEventListener("click", reset);

//standard mode calculation
function calculateInStandard() {
    if (
        height.value > 15 ||
        height.value < 0 ||
        heightInches.value > 11 ||
        heightInches.value < 0 ||
        weight.value > 1000 ||
        weight.value < 0
    ) {
        alert("Please enter accurate information.");
        return "";
    }
    let inch = Number(12 * height.value) + Number(heightInches.value);
    let pounds = Number(weight.value);
    let result = 703 * (pounds / (inch * inch));
    return result.toFixed(2);
}

//metric mode calculation
function calculateInMetric() {
    if (
        height.value > 300 ||
        height.value < 0 ||
        weight.value > 500 ||
        weight.value < 0
    ) {
        alert("Please enter accurate information.");
        return "";
    }
    let meter = Number(height.value) / 100;
    let kg = Number(weight.value);
    let result = kg / (meter * meter);
    return result.toFixed(2);
}

//helper function that checks if any of the input fields is left empty
function checkEmpty(inputs) {
    for (let i = 0; i < inputs.length - 1; i++) {
        if (inputs[i].value === "") {
            return true;
        }
    }
    return false;
}

//reset all inputs
function reset() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    if (!standard) {
        //place holder, so checkEmpty function don't detect it as empty
        heightInches.value = 0;
    }
}
