const btn = document.querySelector("button[type='submit']");



const form = document.querySelector('#searchBar');
const cityInput = document.querySelector('#cityInput');
const imgMeteo = document.querySelectorAll("#secondBloc img");
console.log(imgMeteo)


form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const inputName = cityInput.value;
    console.log(inputName)

    fetch('https://www.prevision-meteo.ch/services/json/' + inputName)
        .then(response => response.json())
        .then(data => {
            const cityTitle = document.querySelector('h1');
            cityTitle.textContent = data.city_info.name
            const sun = document.querySelector("#temp")
            sun.textContent = data.current_condition.tmp + "°C"
            const wind = document.querySelector("#wind")
            wind.textContent = data.current_condition.wnd_spd + "Km/h"
            imgMeteo.forEach((element, index) => {
                conditions(data[`fcst_day_${index}`].condition, element)
                console.log(index, data[`fcst_day_${index}`].condition);
            })
            console.log(data)
            cityTitle.textContent = "" + data.city_info.name;
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données météo", error);
        });
});


btn.addEventListener("click", () => {

    if (window.innerWidth < 1024) {

        let voile = document.createElement("div");
        let modal = document.createElement('div');
        voile.id = "voile";
        modal.id = "modal";
        let parag = document.createElement('p');
        parag.textContent = "De quelle ville souhaitez vous connaitre la météo ?";
        let input = document.createElement("input");
        input.type = "text";
        document.body.appendChild(voile);
        voile.appendChild(modal);
        modal.appendChild(parag);
        parag.appendChild(input);
        let btnVoile = document.createElement("button");
        btnVoile.id = "buttonVoile";
        btnVoile.textContent = "X";
        voile.appendChild(btnVoile);
        btnVoile.addEventListener("click", () => {
            voile.remove();
            modal.remove();
        })
    }
}
)
function conditions(condition, pictureID) {
    switch (condition) {
        case "Ensoleillé":
            pictureID.src = "src/Soleil.png";
            break;
        case "Eclaircies":
            pictureID.src = "src/Journée Nuageux.png";
            break;
        case "Nuageux":
            pictureID.src = "src/Nuage.png";
            break;
        // Ajoutez d'autres cas pour les conditions météorologiques supplémentaires
        case "Orage":
            pictureID.src = "src/Orageux.svg";
            break;
        case "Pluie":
            pictureID.src = "src/Pluvieux 1.png";
            break;
        case "Vent":
            pictureID.src = "src/VentNuages.png";
            break;
    }
}

