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
        if (data && data.length > 0) {
            // First 12 sightings
            sightings(data.slice(0, 12));
        } else {
            sightings([]);
        }
        
        sightingsSection.innerHTML = data.map((sighting) => `
           <div class="w-layout-cell">
                <div class="yellow-card">
                <strong class="orange">${sighting.comName}</strong> <em class="light-grey">(${sighting.sciName})</em>
                <br><br>
                <small class="">Location: ${sighting.locName}
                <br><br>
                Date: ${sighting.obsDt}</p>
                <br><br>
                Count: ${sighting.howMany || 'Not specified'}</small>
                <br>
                </div>
            </div>
        `).join("");
    }

    fetchSightings();
});
