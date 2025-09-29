"use strict"

window.Webflow ||= [];
window.Webflow.push(() => {
    const yellowBirdCard = document.getElementById("la-bird-card");
    const commonName = document.getElementById("sighting-common");
    const sciName = document.getElementById("sighting-scientific");
    const location = document.getElementById("sighting-location");
    const date = document.getElementById("sighting-date");
    const count = document.getElementById("sighting-count");

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

        data.forEach((sighting) => {
            commonName.innerHTML = sighting.comName;
            sciName.innerHTML = sighting.sciName;
            location.innerHTML = sighting.locName;
            date.innerHTML = sighting.obsDt;
            count.innerHTML = sighting.howMany || 'Not specified';  
        }).appendChild(yellowBirdCard);
     }

    const populateDropdown = () => {
        const dropdown = document.getElementById("state-dropdown");
        dropdown.innerHTML = `
         <form id="stateForm" class="space-y-4" role="search" aria-label="Search for notable birds by state">
            <div class="form-group"> 
        <label for="stateSelect" class="dark-grey">Select a U.S. State:</label>
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
                    <button type="submit" id="bird-button"class="button w-button" style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
                            Find Notable Birds
                        </button>
                    <div id="birdState"></div>
                    <div id="stateBirdsList" class="mt-6" role="region" aria-live="polite" aria-label="Notable birds search results"></div>
        `;
    }

    const fetchNotableBirdsByState = async (stateCode, selectedStateName) => {
        const stateBirdsList = document.getElementById('stateBirdsList');
        const birdState = document.getElementById("bird-state");
        
        console.log("State Code: ", stateCode);
        console.log("Selected State Name: ", selectedStateName);
        if (!stateBirdsList) {
            console.error('stateBirdsList element not found');
            return;
        }

        // Show loading message
        stateBirdsList.innerHTML = '<div class=""><p class=" text-center">Loading notable birds for your state...</p></div>';

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
            birdState.innerHTML = `<h4 class="heading-h4" id="bird-state">Notable Birds in ${selectedStateName} (${data.length} found)</h4>`;

            if (data && data.length > 0) {
                stateBirdsList.innerHTML = data.slice(0, 50).map((bird) => `
                <div class="yellow-card small">
                    <div class="div-block-7">
                        <div class="div-block-8">
                    <h6 class="heading-h6">${bird.comName}</h6>
                <p class="paragraph-3">${bird.sciName}</p>
                <div>
                <p class="notable-card-paragraph">${bird.locName}</p>
                <p class="notable-card-paragraph">${new Date(bird.obsDt).toLocaleDateString()}</p>
                <p class="notable-card-paragraph">Count: ${bird.howMany || 'Not specified'}</p>
                </div>
                </div>
                <div class="div-block-9 style="text-align: right;">
                <div>
                <p class="notable">Notable</p>
                <p class="notable-card-paragraph">By. ${bird.userDisplayName}</p>
                </div>
                </div>
                </div>
                </div>
                `).join("");
            } else {
                stateBirdsList.innerHTML = '<div class=""><p class="text-center">No notable birds found for this state.</p></div>';
            }
        } catch (error) {
            console.error('Error fetching notable birds:', error);
            stateBirdsList.innerHTML = `<div class=""><p class="">Error loading birds: ${error.message}</p></div>`;
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
                        stateBirdsList.innerHTML = '<div class=""><p class="">Please select a state first.</p></div>';
                    }
                }
            });
        }
    }

    populateDropdown();
    fetchSightings();
    setupStateForm();
});
