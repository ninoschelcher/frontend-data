import 'regenerator-runtime/runtime';
import * as d3 from 'd3';

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

  const amsterdamLocations = getParkingAmsterdamLocations(parkingSpotSpecification, row2, cityCode);
  const combinedData = combineDataSets(amsterdamLocations, parkingLocations);

  placeDots(combinedData);
  stackedBar(amsterdamLocations);
}

// Returns an array with parking garages from the specifications dataset that are in Amsterdam and have a charging point available.
const getParkingAmsterdamLocations = (data, row2, city) => {
  return data.filter(data => data[row2].startsWith(city));
}

const combineDataSets = (specifications, geolocations) => {
  const result = specifications.map((specification) => {
    const geolocation = geolocations.find(geolocation =>
      specification.areaid === geolocation.areaid
    );

    specification.areaidlocation = geolocation;
    return specification;

  });
  return result;
}


allParkingData();


//----------- d3 starts here -------------//
const url = 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=GEBIED_STADSDELEN_EXWATER&THEMA=gebiedsindeling';
const width = 800;
const height = 500;
const color = d3.scaleOrdinal(d3.schemeCategory10);

const title = d3.select('#overlay')
  .append('h1')
  .text('Charging your electric car in Amsterdam, is it accessible?')

const projection = d3.geoMercator()
  .scale(100000)
  .center([4.95, 52.35])

const pathGenerator = d3.geoPath()
  .projection(projection);


const map = d3.select("body")
  .append('svg')
  .attr('width', width)
  .attr('height', height)


const mapG = map.append('g')
const dotG = map.append('g')

const placeDots = (parkingLocations) => {
  console.log(parkingLocations)
  const dots = dotG.selectAll('circle')
    .data(parkingLocations)
    dots.enter()
    .append('circle')
    .attr('r', '10')
    .attr('transform', `translate(0, 20)`)
    .attr("cx", d => { if(d.areaidlocation) {
      return projection([d.areaidlocation.location.longitude, d.areaidlocation.location.latitude])[0]
    }})
    .attr("cy", d => { if(d.areaidlocation) {
      return projection([d.areaidlocation.location.longitude, d.areaidlocation.location.latitude])[1]
    }})
    .attr('stroke', 'white')
    .attr('fill', 'black')
    .attr('fill-opacity', '0.4')
    .attr('cursor', 'pointer')
  }

const stackedBar = (data) => {

}

const geodata = d3.json(url)
  .then(data => {
    const district = mapG.selectAll('path')
      .data(data.features)
      district.enter()
      .append('path')
      .attr('d', d => pathGenerator(d))
      .attr('transform', `translate(0, 20)`)
      .attr('fill', (d, i) => {return color(i)})
      .attr('stroke', 'white')
      .attr('stroke-width', '2')
})

stackedBar();


//Create a stacked bar chart
//Zoom function?
//Split up functionality in modules