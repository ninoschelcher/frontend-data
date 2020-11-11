//Import required modules //
import getParkingAmsterdamLocations from "./modules/amsterdamlocations.js";
import getParkingData from "./modules/fetchparkingdata.js";
import combineDataSets from "./modules/combinedata.js";
import makeMap from "./modules/map.js";
import makeCircularBarPlot from "./modules/circularchart.js";
import makeBarChart from './modules/barchart.js';

//Variables for datasets and filtering rows //
const parkingSpecifications = "https://opendata.rdw.nl/resource/b3us-f26s.json";
const geoLocations = "https://opendata.rdw.nl/resource/t5pc-eb34.json?$limit=123456789";
const row2 = "areaid";
const cityCode = "363";

//Function that starts the proces, from fetching data, to filtering and combining data to making the charts with d3 //
const allParkingData = async () => {
  const parkingSpotSpecification = await getParkingData(parkingSpecifications);
  const parkingLocations = await getParkingData(geoLocations);
  const amsterdamLocations = getParkingAmsterdamLocations(
    parkingSpotSpecification,
    row2,
    cityCode
  );

  const combinedData = combineDataSets(amsterdamLocations, parkingLocations);

  makeBarChart(combinedData)
  makeMap(combinedData);
  makeCircularBarPlot(combinedData);
};

//Start the process :) //
allParkingData();
