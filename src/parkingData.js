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
  circularChart(combinedData);
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

  const filter = result.filter(data => data.areaidlocation !== undefined)
  return filter;
}

allParkingData();

//----------- d3 starts here -------------//
const url = 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=GEBIED_STADSDELEN_EXWATER&THEMA=gebiedsindeling';
const width = 800;
const height = 575;
const color = d3.scaleOrdinal(d3.schemeCategory10);

const projection = d3.geoMercator()
  .scale(130000)
  .center([4.88, 52.35])
  .translate([width / 2, height / 2]);

const pathGenerator = d3.geoPath()
  .projection(projection)
  

const map = d3.select("#parkinglocations")
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${width} ${height}`)

const mapG = map.append('g')
const dotG = map.append('g')

const placeDots = (parkingLocations) => {
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


const circularChart = (data) => {

const margin = {top: 10, right: 10, bottom: 10, left: 10};
const width = 900 - margin.left - margin.right;
const height = 700 - margin.top - margin.bottom;
const innerRadius = 100;
const outerRadius = Math.min(width, height) / 2;

const x = d3.scaleBand()
  .range([0, 2 * Math.PI])    
  .align(0)                  
  .domain(data.map(d => { return d.areaidlocation.areadesc }) ); 

const y = d3.scaleRadial()
  .range([innerRadius, outerRadius])   
   .domain([0, 2600]); 

const svg = d3.select("#garagecapacity")
  .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + width / 2 + "," + ( height/2-50 )+ ")");

  svg.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", "#69b3a2")
      .attr("d", d3.arc()     
          .innerRadius(innerRadius)
          .outerRadius(d => { return y(d['capacity']); })
          .startAngle(d => { return x(d.areaidlocation.areadesc); })
          .endAngle(d=> { return x(d.areaidlocation.areadesc) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))

 
}