const createMap = (parkingLocations) => {
  const url =
    "https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=GEBIED_STADSDELEN_EXWATER&THEMA=gebiedsindeling";
  const width = 800;
  const height = 575;
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const projection = d3
    .geoMercator()
    .scale(130000)
    .center([4.88, 52.35])
    .translate([width / 2, height / 2]);

  const pathGenerator = d3.geoPath().projection(projection);

  const map = d3
    .select("#parkinglocations")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const mapG = map.append("g");
  const dotG = map.append("g");

  d3.json(url, data => {
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

  const dots = dotG.selectAll("circle").data(parkingLocations);
  dots
    .enter()
    .append("circle")
    .attr("r", "10")
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
    .attr("stroke", "white")
    .attr("fill", "black")
    .attr("fill-opacity", "0.4")
    .attr("cursor", "pointer");
};

export default createMap;
