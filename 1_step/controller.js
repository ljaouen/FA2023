"use strict"; // special Javascript directive to avoid trouble with undefined variables

const P0 = 2e-5; // Reference pressure in Pascal

let soundPressureLevels = [50, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Sound pressure levels of 10 uncorrelated sound source in deciBel
let result_div;
let result = 0; 


// Convert pressure from Pascal to deciBel
function convertPressureFromPaTodB(pressure) {
    return 20 * Math.log10(pressure / P0);
}

// Convert pressure from deciBel to Pascal
function convertPressureFromDBToPa(pressure) {
    return Math.pow(10, pressure / 20) * P0;
}

// Compute the global sound pressure level from the sound pressure level of each uncorrelated sound source
function computeGlobalSoundPressureLevel(soundPressureLevels) {
    return 10 * Math.log10(
        soundPressureLevels.reduce((sum, soundPressureLevel) => {
            return sum + Math.pow(10, soundPressureLevel / 10);
        }, 0)
    );
}

// When the page and all related files are loaded, call the init function and start listening
// to the input text boxes for changes
document.addEventListener("DOMContentLoaded", init, false);

function init() {

    // Initialize the Numscrubber library
    Numscrubber.init();

    result_div = document.getElementById("result");

    document.getElementById("L0").value = 50;
    document.getElementById("L0").style.background = "linear-gradient(to right,#ccc 0%,#ccc 50%,#fff 50%,#fff 100%)";

    document.getElementById("L1").value = 0;
    document.getElementById("L1").style.background = "#fff";

    document.getElementById("L2").value = 0;
    document.getElementById("L2").style.background = "#fff";

    document.getElementById("L3").value = 0;
    document.getElementById("L3").style.background = "#fff";

    document.getElementById("L4").value = 0;
    document.getElementById("L4").style.background = "#fff";

    document.getElementById("L5").value = 0;
    document.getElementById("L5").style.background = "#fff";

    document.getElementById("L6").value = 0;
    document.getElementById("L6").style.background = "#fff";

    document.getElementById("L7").value = 0;
    document.getElementById("L7").style.background = "#fff";

    document.getElementById("L8").value = 0;
    document.getElementById("L8").style.background = "#fff";

    document.getElementById("L9").value = 0;
    document.getElementById("L9").style.background = "#fff";

    // Catch any change in the input boxes and update their 2-color backgrounds to reflect their values
    for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        document.getElementById('L' + i).oninput = function() {
            this.style.background = "linear-gradient(to right,#ccc 0%,#ccc " + parseInt(this.value) + "%,#fff " + parseInt(this.value) + "%,#fff 100%)";
            soundPressureLevels[i] = parseInt(this.value);
            updateResult();
        }
    }

    // The default value for the global sound pressure level is 50 dB (one source at 50 dB)
    result_div.innerHTML = "50";
}

// Convert integer from 60 to 100 to a percentage scale
function convertIntToPercentage(int) {
    return (int - 60) / 40 * 100;
}

// Modify the result displayed on the page
function updateResult() {
    result = computeGlobalSoundPressureLevel(soundPressureLevels).toFixed(0);
    result_div.innerHTML = result;
}
