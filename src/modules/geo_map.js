const createMap = (parkingLocations) => {
  console.log(parkingLocations);
  const url =
    "https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=GEBIED_STADSDELEN_EXWATER&THEMA=gebiedsindeling";
  const outsideParkingSpaces =
    "https://map.data.amsterdam.nl/maps/parkeervakken?REQUEST=Getfeature&VERSION=1.1.0&SERVICE=wfs&TYPENAME=alle_parkeervakken&outputformat=geojson";
  const width = 1200;
  const height = 1000;
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const projection = d3
    .geoMercator()
    .scale(200000)
    .center([4.89, 52.35])
    .translate([width / 2, height / 2]);

  const pathGenerator = d3.geoPath().projection(projection);

  const map = d3
    .select("#parkinglocations")
    .append("svg")
    .call(
      d3.zoom().on("zoom", function () {
        map.attr("transform", d3.event.transform);
      })
    )
    .attr("width", width)
    .attr("height", height)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const mapG = map.append("g");
  const dotG = map.append("g");

  const divTooltip = d3
    .select("#parkinglocations")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  const totalCapacity = d3
    .select("#parkinglocations")
    .append("div")
    .attr("class", "totalamount");

  totalCapacity.append("h1").text("Total Capacity: ");

  d3.json(url, (data) => {
    const district = mapG.selectAll("path").data(data.features);
    district
      .enter()
      .append("path")
      .attr("d", (d) => pathGenerator(d))
      .attr("transform", `translate(0, 20)`)
      .attr("fill", (d, i) => {
        return color(i);
      })
      .attr("stroke", "white")
      .attr("stroke-width", "2");
  });

  const dots = dotG.selectAll("circle");

  dots
    .data(parkingLocations)
    .enter()
    .append("circle")
    .attr("transform", `translate(0, 20)`)
    .attr("cx", (d) => {
      return projection([
        d.areaidlocation.location.longitude,
        d.areaidlocation.location.latitude,
      ])[0];
    })
    .attr("cy", (d) => {
      return projection([
        d.areaidlocation.location.longitude,
        d.areaidlocation.location.latitude,
      ])[1];
    })
    .attr("r", '14')
    .attr("opacity", "1")
    .attr("stroke", "white")
    .attr("fill", "black")
    .attr("fill-opacity", "0.4")
    .attr("cursor", "pointer")

    .on("click", (d) => {
      divTooltip.transition().duration(200).style("opacity", 0.9);
      divTooltip
        .html("Name: " + d.areaidlocation.areadesc)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    
    // d => { return d.capacity / 40}
  

};

export default createMap;
