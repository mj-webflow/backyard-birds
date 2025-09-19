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
        
        sightingsSection.innerHTML = data.slice(0, 12).map((sighting) => `
           <div class="w-layout-cell">
                <div class="yellow-card" style="width: 100%; height: 100%;">
                    <strong class="heading-h5">${sighting.comName}</strong> <em class="dark-grey" style="font-size: 14px;">(${sighting.sciName})</em>
                    <br>                
                    <small class="light-grey" style="font-size: 12.8px;">Location: ${sighting.locName}
                    <br>
                    Date: ${sighting.obsDt}
                    <br>
                    Count: ${sighting.howMany || 'Not specified'}</small>
                    <br>
                </div>
            </div>
        `).join("");
    }

    fetchSightings();
});
