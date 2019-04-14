// Listen for submit
document
  .getElementById("loan-form")
  .addEventListener("submit", calculateResults);
const pensijosKaupimas = document.getElementById("pensijosKaupimas");
const atlyginimoTipas = document.getElementById("atlyginimo-tipas");

// atlyginimoTipas.addEventListener("change", turnOff);

// // Išjungti pensijos pasirinkimą
// function turnOff() {
//   if (atlyginimoTipas.options[atlyginimoTipas.selectedIndex].value == "1") {
//     pensijosKaupimas.disabled = true;
//     pensijosKaupimas.value = "0";
//   } else if (
//     atlyginimoTipas.options[atlyginimoTipas.selectedIndex].value == "2"
//   ) {
//     pensijosKaupimas.disabled = false;
//   }
// }

// Calculate Results
function calculateResults(e) {
  console.log("Calculating...");
  // UI Vars
  const atlyginimas = document.getElementById("atlyginimas");
  const poilsioValandos = document.getElementById("poilsioValandos");
  const virsvalandziai = document.getElementById("virsvalandziai");
  // const menuo = document.getElementById("menuo");
  // const valandosVerte = document.getElementById("valandos-verte");
  // const poilsioValandosVerte = document.getElementById(
  //   "poilsio-valandos-verte"
  // );
  // const bendraPoilsioVerte = document.getElementById("bendra-poilsio-verte");
  // const virsvalandziuVerte = document.getElementById("virsvalandziu-verte");
  // const bendraVirsvalandziuVerte = document.getElementById(
  //   "bendra-virsvalandziu-verte"
  // );
  const ismoketasAtlyginimas = document.getElementById("ismoketas-atlyginimas");
  const darboDienos = document.getElementById("darbo-dienos");

  //Paskaičiuoti valandas iš viso

  let valandosIsViso =
    Number(darboDienos.value) * 8 +
    Number(poilsioValandos.value) +
    Number(virsvalandziai.value);

  //Paskaičiuoti kiekvieną vlandų rušį atskirai

  let valandinis =
    ((atlyginimas.value / (darboDienos.value * 8)) * valandosIsViso) /
    valandosIsViso;

  let poilsioAtlyginimas = (poilsioValandos.value * valandinis * 2).toFixed(2);

  let virsvalandziuAtlyginimas = (
    virsvalandziai.value *
    valandinis *
    1.5
  ).toFixed(2);

  //Paskaičiuoti bendrą atlyginimą

  let bendrasAtlyginimas =
    Number(atlyginimas.value) +
    Number(poilsioAtlyginimas) +
    Number(virsvalandziuAtlyginimas);

  // Paskaičiuoti neapmokestinamą pajamų dydi (NPD)
  let npd = 0;
  if (bendrasAtlyginimas <= 555) {
    npd = 300;
  } else if (300 - 0.15 * (bendrasAtlyginimas - 555) > 0) {
    npd = 300 - 0.15 * (bendrasAtlyginimas - 555);
  } else {
    npd = 0;
  }

  //Atlyginimas atėmus NPD
  let atlyginimasPoNpd = 0;

  if (npd <= bendrasAtlyginimas) {
    atlyginimasPoNpd = bendrasAtlyginimas - npd;
  } else {
    atlyginimasPoNpd = bendrasAtlyginimas - bendrasAtlyginimas;
  }

  //Atlyginimas atėmus Mokesčius

  const gpm = atlyginimasPoNpd * 0.2;
  const sodra = bendrasAtlyginimas * 0.0698;
  const vsd = bendrasAtlyginimas * 0.1252;

  atlyginimasPoMokesciu = bendrasAtlyginimas - gpm - sodra - vsd;

  //Atlyginimas atėmus pensija

  let pensija = 0;
  if (pensijosKaupimas.options[pensijosKaupimas.selectedIndex].value == "1") {
    pensija = 0.018;
  } else if (
    pensijosKaupimas.options[pensijosKaupimas.selectedIndex].value == "2"
  ) {
    pensija = 0.03;
  }

  const galutinisAtlyginimas =
    atlyginimasPoMokesciu - bendrasAtlyginimas * pensija;

  //Išmokamas altyginimas į rankas

  ismoketasAtlyginimas.value = galutinisAtlyginimas.toFixed(2);

  //Parodyti error jeigu jeigu skaičius yra didesnis arba mažesnis nei nustatytas intervalas

  if (darboDienos.value > 23 || darboDienos.value < 19) {
    showError(
      "Darbo dienų skaičius negali buti didesnis nei 23, arba mažesnis nei 19"
    );
    ismoketasAtlyginimas.value = "";
  }

  // if (atlyginimoTipas.options[atlyginimoTipas.selectedIndex].value == "2") {

  // } else {

  // }

  e.preventDefault();
}

// Show Error
function showError(error) {
  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 6000);
}

// Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
