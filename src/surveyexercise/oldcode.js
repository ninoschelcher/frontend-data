
fetch('survey_data.json')
  .then(response => {
    return response.json();
  })
  .then(surveyData => {
    console.log(typeof surveyData)
    surveyData.forEach(element => {
        if (element.lievelingskleur == "" || element.lievelingskleur == 0 || element.lievelingskleur == "/") {
            delete element.lievelingskleur;
        }
        console.log(element.lievelingskleur)});
  });


  const surveyData = 'survey_data.json'
  let favouriteColour = [];

  const fetchSurveyData = () => {
    fetch(surveyData)
    .then(response => response.json())
    .then(allData => getAllEntries(allData))
  }

  const getAllEntries = (allData) => {
      const favouriteColourEntries = allData.map(entry => entry.lievelingskleur);
      favouriteColour.push(favouriteColourEntries);
      console.log(favouriteColour);
  }

  const filterFaultyEntries = (allEntries) => {
      const favouriteColourFaulty = allEntries.filter(entry => entry.includes("" || "0" || "/"))
     favouriteColour.push(favouriteColourFaulty);
     console.log(favouriteColourFaulty);
  }

    if(answer.charAt(0) != '#') {
      let hash = '#';
      answer = hash + answer;
    }
    answer = answer.replace('Incorrect Value');
    answer = answer.toLowerCase();
    correctedAnswers.push(answer);
    console.log(correctedAnswers);
  

  fetchSurveyData();

  surveyData.map(entry => specificAnswers.push(entry[surveyQuestion]));
  removeFaultyAnswers(specificAnswers);




  const fetchSpecifData = () => {
  fetch(parkingSpecifications)
    .then(response => response.json())
    .then(specifData => callFunctions(specifData))  
}

const fetchGeoData = () => {
  fetch(geoLocations)
    .then(response => response.json())
    .then(geoData => geoFunctions(geoData))
}


const callFunctions = (specifData, geoData) => {
  const specificRow = getSpecificRow(specifData, row1, row2);
}

const geoFunctions = (geoData) => {
  const geoLocations = getGeoLocations(geoData, row2)
  const specificLocation = getSpecificLocations(geoLocations);
  console.log(specificLocation);
}

const getSpecificRow = (data, row1, row2) => {
  return data.filter(data => data[row1] !== '0' && data[row2].startsWith(cityCode));
}

const getGeoLocations = (data, row) => {
  return data.filter(data => data[row].startsWith(cityCode));
}

const getSpecificLocations = (data) => {
  return data.map(data => ({areaid: data.areaid, location: data.location}))
}

fetchSpecifData();
fetchGeoData();