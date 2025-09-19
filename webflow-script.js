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
        console.log(data);
        
        sightingsSection.innerHTML = data.map((sighting) => `
           <div class="w-layout-cell">
                <div class="yellow-card">
                <strong class="orange-text">${sighting.comName}</strong><em class="light-grey">(${sighting.sciName})</em>
                <br>
                <small class="paragraph">Location: ${sighting.locName}</small>
                <br>
                Date: ${sighting.obsDt}</p>
                <br>
                Count: ${sighting.howMany || 'Not specified'}</p>
                </div>
            </div>
        `).join("");
    }

    fetchSightings();
});
