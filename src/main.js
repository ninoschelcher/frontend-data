import getParkingAmsterdamLocations from './modules/amsterdamlocations.js';
import getParkingData from './modules/endpointfetch.js';
import combineDataSets from './modules/combinedata.js';
import createMap from './modules/geo_map.js';
import circularChart from './modules/circularchart.js'

const parkingSpecifications = 'https://opendata.rdw.nl/resource/b3us-f26s.json';
const geoLocations = 'https://opendata.rdw.nl/resource/t5pc-eb34.json';
const row2 = 'areaid';
const cityCode = '363';

const allParkingData = async () => {
  const parkingSpotSpecification = await getParkingData(parkingSpecifications);
  const parkingLocations = await getParkingData(geoLocations);
  const amsterdamLocations = getParkingAmsterdamLocations(parkingSpotSpecification, row2, cityCode);
  const combinedData = combineDataSets(amsterdamLocations, parkingLocations);
  
  createMap(combinedData);
  circularChart(combinedData);
}

allParkingData();
circularChart();
