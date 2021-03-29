function fetchPlanet() {
  fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
    response.json().then(function (json) {
      indexPlanet = Math.floor(Math.random() * 6);
      targetPlanet = json[indexPlanet];
      document.getElementById("missionTarget").innerHTML = `<h2>Mission Destination</h2>
      <ol>
        <li>Name: ${targetPlanet.name}</li>
        <li>Diameter: ${targetPlanet.diameter}</li>
        <li>Star: ${targetPlanet.star}</li>
        <li>Distance from Earth: ${targetPlanet.distance}</li>
        <li>Number of Moons: ${targetPlanet.moons}</li>
      </ol>
      <img src="${targetPlanet.image}">`;
    });
  });
}


window.addEventListener("load", function () {
  fetchPlanet();
  let form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let pilotNameInput = document.querySelector("input[name=pilotName]");
    let copilotNameInput = document.querySelector("input[name=copilotName]");
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    let cargoMassInput = document.querySelector("input[name=cargoMass]");
    let launchStatus = document.getElementById("launchStatus");
    if (
      pilotNameInput.value === "" ||
      copilotNameInput.value === "" ||
      fuelLevelInput.value === "" ||
      cargoMassInput.value === ""
    ) {
      alert("All fields are required!");
    } else if (
      !isNaN(pilotNameInput.value) ||
      !isNaN(copilotNameInput.value) ||
      isNaN(fuelLevelInput.value) ||
      isNaN(cargoMassInput.value)
    ) {
      alert("Make sure to enter valid information for each field!");
    } else if (fuelLevelInput.value < 10000 || cargoMassInput.value > 10000) {
      document.getElementById("faultyItems").style.visibility = "visible";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
      document.getElementById("pilotStatus").innerHTML = `${pilotNameInput.value} is ready for launch`;
      document.getElementById("copilotStatus").innerHTML = `${copilotNameInput.value} is ready for launch`;
      if (fuelLevelInput.value < 10000) {
        document.getElementById("fuelStatus").innerHTML = "Fuel is too low for launch";
      }
      if (cargoMassInput.value > 10000) {
        document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
      }
    } else {
      launchStatus.innerHTML = "Shuttle is ready for launch";
      launchStatus.style.color = "green";
    }
  });
});
