//  API GET ACTIVITY

const buttonGetActivity = document.getElementById("get-data-activity").addEventListener("click", getActivity);

async function getActivity() {
    renderLoadingState("activities");
    try {
      const response = await fetch("https://bored.api.lewagon.com/api/activity");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data = await response.json();
    renderActivity(data);
    
    const resultsPActivity = document.querySelector(".activities .results");
    resultsPActivity.innerHTML= ""
      
    } catch (error) {
      renderErrorState("activities");
    }
  }

  const renderActivity = (data) => {
    const containerActivity = document.querySelector(".activity");
    containerActivity.innerHTML = "";

    const activityContent = document.createElement("div");
    activityContent.className = "activity-content";
    activityContent.innerHTML = `
        <h4><b>Name:</b> ${data?.activity}</h4>
        <p><b>Type:</b> ${data?.type}</p>
        <p><b>Participants:</b> ${data?.participants}</p>
        <p><b>Price:</b> ${data?.price}</p>
    `;
    containerActivity.appendChild(activityContent);
}



// API FACTS CAT

const buttonGetCatFact = document.getElementById("get-data-fact").addEventListener("click", getCatFact);

async function getCatFact() {
    renderLoadingState("facts");
    try {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data = await response.json();
    renderCatFact(data);
    const resultsPFact = document.querySelector(".facts .results");
    resultsPFact.innerHTML= ""
      
    } catch (error) {
      renderErrorState("facts");
    }
  }

  const renderCatFact = (data) => {
    const containerFact = document.querySelector(".fact");
    containerFact.innerHTML = "";

    const factText = document.createElement("h4");
    factText.className = "fact-text";
    factText.textContent = `${data?.fact}`;
    containerFact.appendChild(factText);
}


// API ANIME

const buttonAnime = document.getElementById("get-data-anime").addEventListener("click", getDataAnime);

async function getDataAnime() {
    
    const type = document.getElementById('type').value
    const status = document.getElementById('status').value
    const limit = document.getElementById('limit').value
    renderLoadingState("anime")

    const url = `https://api.jikan.moe/v4/anime?type=${type}&duration=${status}&limit=${limit}`
    
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        renderDataAnime(data)
        const resultsPAnime = document.querySelector(".anime .results");
        resultsPAnime.innerHTML= ""
    } catch (error) {
        console.error("Error en la solicitud:", error);
        renderErrorState("anime")
    }
}

function renderLoadingState(section) {
    const resultsP = document.querySelector(`.${section} .results`);
    resultsP.innerHTML= ""
    resultsP.innerHTML = "Loading...";
}
function renderErrorState(section) {
    const resultsP = document.querySelector(`.${section} .results`);
    resultsP.innerHTML= ""
    resultsP.innerHTML = "Failed to load data";
}

const renderDataAnime = (data) => {
    const containerCards = document.querySelector(".cards-anime");
    containerCards.innerHTML = "";

    data.data.forEach((anime) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="image">
          <img src="${anime?.images.jpg.image_url}" alt="${anime?.title}">
        </div>
        <div class="content-anime">
          <h2>${anime?.title}</h2>
          <p><b>Year:</b> ${anime?.year}</p>
          <p><b>Type:</b> ${anime?.type}</p>
          <p><b><Status:/b> ${anime?.status}</p>
          <p><b>Episodes:</b> ${anime?.episodes}</p>
          <p><b>Duration:</b> ${anime?.duration}</p>
          <p><b>Rating:</b> ${anime?.rating}</p>
        </div>
        `;
        containerCards.appendChild(card);
    });
}