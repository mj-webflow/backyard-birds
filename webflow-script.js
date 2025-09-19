"use strict"

window.Webflow ||= [];
window.Webflow.push(() => {
    const sightingsSection = document.getElementById("sightingsList");

    const baseUrl = "https://api.ebird.org/v2/data/obs/geo/recent?lat=34.08&lng=-118.20&sort=species";
    const apiKey = "kpf4t1mcqhee";

    const fetchSightings = async () => {
        const response = await fetch(baseUrl, {
            method: "GET",
            headers: {
                "X-eBirdApiToken": apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

       const data = await response.json();
       console.log(data)
    }
    console.log(data)
    sightingsSection.innerHTML = data.map((sighting) => `
        <div class="sighting">
            <h3>${sighting.species}</h3>
            <p>${sighting.location}</p>
        </div>
    `).join("");

    fetchSightings();
});
