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
         <form id="stateForm" class="space-y-4" role="search" aria-label="Search for notable birds by state">
            <div class="form-group"> 
        <select id="stateSelect" name="stateSelect" style="padding: 8px 4px; border: 1px solid #d1d5dc; width: 100%; border-radius: 8px;">    
            </div>
            <option style="color: #3f52b5;" value="">Choose a state...</option>
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
                    <button type="submit" class="button w-button">
                            Find Notable Birds
                        </button>
                    <div id="birdState"></div>
                    <div id="stateBirdsList" class="mt-6" role="region" aria-live="polite" aria-label="Notable birds search results"></div>
        `;
    }

    const fetchNotableBirdsByState = async (stateCode, selectedStateName) => {
        const stateBirdsList = document.getElementById('stateBirdsList');
        const birdState = document.getElementById("birdState");
        
        console.log("State Code: ", stateCode);
        console.log("Selected State Name: ", selectedStateName);
        if (!stateBirdsList) {
            console.error('stateBirdsList element not found');
            return;
        }

        // Show loading message
        stateBirdsList.innerHTML = '<div class="mt-4 p-4 bg-blue-50 rounded-lg"><p class="text-blue-700 text-center">Loading notable birds for your state...</p></div>';

        try {
            const response = await fetch(`https://api.ebird.org/v2/data/obs/US-${stateCode}/recent/notable?detail=full`, {
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
                birdState.innerHTML = `Notable Birds in ${selectedStateName} (${data.length} found)`;

                stateBirdsList.innerHTML = data.slice(0, 50).map((bird) => `
                <h4 class="heading-h4" id="bird-state">Notable Birds in ${selectedStateName} (${bird.length} found)</h4>
                <div class="yellow-card">
                    <div class="div-block-7">
                        <div class="div-block-8">
                    <h6 class="heading-h6">${bird.comName}</h6>
                <p class="paragraph-3">${bird.sciName}</p>
                <div>
                <p class="notable-card-paragraph">${bird.locName}</p>
                <p class="notable-card-paragraph">${new Date(bird.obsDt).toLocaleDateString()}</p>
                <p class="notable-card-paragraph">${bird.howMany || 'Not specified'}</p>
                </div>
                </div>
                <div class="div-block-9">
                <div>
                <p class="notable">Notable</p>
                <p class="notable-card-paragraph">By.${bird.userDisplayName}</p>
                </div>
                </div>
                </div>
                </div>
                `).join("");
            } else {
                stateBirdsList.innerHTML = '<div class="mt-4 p-4 bg-gray-50 rounded-lg"><p class="text-gray-600 text-center">No notable birds found for this state.</p></div>';
            }
        } catch (error) {
            console.error('Error fetching notable birds:', error);
            stateBirdsList.innerHTML = `<div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"><p class="text-red-700">Error loading birds: ${error.message}</p></div>`;
        }
    }

    const setupStateForm = () => {
        const stateForm = document.getElementById('stateForm');
        
        if (stateForm) {
            stateForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const stateSelect = document.getElementById('stateSelect');
                const stateCode = stateSelect.value;
                const selectedOption = stateSelect.querySelector(`option[value="${stateCode}"]`);
                const selectedStateName = selectedOption ? selectedOption.textContent : stateCode;
                
                if (stateCode && stateCode.trim()) {
                    fetchNotableBirdsByState(stateCode.trim(), selectedStateName);
                } else {
                    const stateBirdsList = document.getElementById('stateBirdsList');
                    if (stateBirdsList) {
                        stateBirdsList.innerHTML = '<div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"><p class="text-red-700">Please select a state first.</p></div>';
                    }
                }
            });
        }
    }

    populateDropdown();
    fetchSightings();
    setupStateForm();
});
