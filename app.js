// Listen for submit
document
  .getElementById("Salary-form")
  .addEventListener("submit", calculateResults);

// Calculate Results
function calculateResults(e) {
  // UI Vars
  const atlyginimas = document.getElementById("atlyginimas");
  const pensijosKaupimas = document.getElementById("pensijosKaupimas");
  const darboDienos = document.getElementById("darbo-dienos");
  const poilsioValandos = document.getElementById("poilsioValandos");
  const virsvalandziai = document.getElementById("virsvalandziai");
  const ismoketasAtlyginimas = document.getElementById("ismoketas-atlyginimas");

  //Paskaičiuoti valandas iš viso

  const valandosIsViso =
    Number(darboDienos.value) * 8 +
    Number(poilsioValandos.value) +
    Number(virsvalandziai.value);

  //Paskaičiuoti kiekvieną vlandų rušį atskirai

  const valandinis =
    ((atlyginimas.value / (darboDienos.value * 8)) * valandosIsViso) /
    valandosIsViso;

  const poilsioAtlyginimas = (poilsioValandos.value * valandinis * 2).toFixed(
    2
  );

  const virsvalandziuAtlyginimas = (
    virsvalandziai.value *
    valandinis *
    1.5
  ).toFixed(2);

  //Paskaičiuoti bendrą atlyginimą

  const bendrasAtlyginimas =
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

  //Išmokamas altyginimas į rankas

  ismoketasAtlyginimas.value = (
    atlyginimasPoMokesciu -
    bendrasAtlyginimas * pensija
  ).toFixed(2);

  //Parodyti error jeigu jeigu skaičius yra didesnis arba mažesnis nei nustatytas intervalas

  if (darboDienos.value > 23 || darboDienos.value < 19) {
    showError(
      "Darbo dienų skaičius negali buti didesnis nei 23, arba mažesnis nei 19"
    );
    window.scrollTo(0, 0);

    ismoketasAtlyginimas.value = "";
  }

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

  // Clear error after 6 seconds
  setTimeout(clearError, 6000);
}

// Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
