import 'regenerator-runtime/runtime';

// Variable Declaration for endpoints.
const parkingSpecifications = 'https://opendata.rdw.nl/resource/b3us-f26s.json';
const geoLocations = 'https://opendata.rdw.nl/resource/t5pc-eb34.json';
const row1 = 'chargingpointcapacity';
const row2 = 'areaid';
const cityCode = '363';

//Fetches the endpoint and returns it as json so it's usable in other functions.
const getParkingData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//Function with all the function calls where data gets cleaned up.
const allParkingData = async () => {
  const parkingSpotSpecification = await getParkingData(parkingSpecifications);
  const parkingLocations = await getParkingData(geoLocations);
  const chargingPoints = getChargingPoints(parkingSpotSpecification, row1, row2, cityCode);
  const getParkingAmsterdamLocations = getParkingAmsterdamLocation(parkingLocations, row2, cityCode);
  const filteredLocations = getLocationandArea(getParkingAmsterdamLocations);
  
  const correctLocations = getCorrectLocations(filteredLocations, chargingPoints, row2);

  console.log(parkingLocations);
}

// Returns an array with parking garages from the specifications dataset that are in Amsterdam and have a charging point available.
const getChargingPoints = (data, row1, row2, city) => {
  return data.filter(data => data[row1] !== '0' && data[row2].startsWith(city));
}

//Returns an array with only the parking garages that are available in Amsterdam.
const getParkingAmsterdamLocation  = (data, row, cityCode) => {
  return data.filter(data => data[row].startsWith(cityCode));
}

// Returns an array with 
const getLocationandArea = (data) => {
  return data.map(data => ({areaid: data.areaid, location: data.location}));
}

//Returns the array with values that exists in the other array, it almost compares the 2 different datasets.
const getCorrectLocations = (location, chargingpoint, row) => {
  return chargingpoint.map(element => location.includes(element[row]));
}

allParkingData();


// 4. Combine the 2 functions to know where the parking garages with a charging point are


