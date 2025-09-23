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

    const populateDropdown = () => {
        const dropdown = document.getElementById("state-dropdown");
        dropdown.innerHTML = `
         <select id="stateSelect" name="stateSelect" style="padding: 8px 4px; ">    
            <option value="">Choose a state...</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                    </form>
                    <div id="stateBirdsList" class="mt-6" role="region" aria-live="polite" aria-label="Notable birds search results"></div>
        `;
    }

    const fetchNotableBirdsByState = async () => {
        const response = await fetch(baseUrl, {
            method: "GET",
            headers: {
                "X-eBirdApiToken": apiKey
            }
        });
    }

    populateDropdown();
    fetchSightings();
});
