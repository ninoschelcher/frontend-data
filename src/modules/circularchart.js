const circularChart = (parkingData) => {
  const margin = { top: 0, right: 10, bottom: 10, left: 10 };
  const width = 1400 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;
  const innerRadius = 100;
  const outerRadius = Math.min(width, height) / 1.5;
  const scale = d3.scaleOrdinal(d3.schemeCategory20);

  const tooltip = d3
    .select("#garagecapacity")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  const x = d3
    .scaleBand()
    .range([0, 2 * Math.PI])
    .domain(parkingData.map((parking) => parking.areaidlocation.areadesc));

  const y = d3
    .scaleRadial()
    .range([innerRadius, outerRadius])
    .domain([0, d3.max(parkingData.map((parking) => parking.capacity)) / 0.6]);

  const svg = d3
    .select("#garagecapacity")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const potentialCapacity = d3.select("#garagecapacity").append("div");
  const carCapacity = potentialCapacity
    .append("h3")
    .text("Car Capacity: ")
    .append("p")
    .attr("class", "carcap");

  const bikeCapacity = potentialCapacity
    .append("h3")
    .text("Bike Capacity: ")
    .append("p")
    .attr("class", "bikecap");

  const group = svg
    .append("g")
    .attr(
      "transform",
      "translate(" + width / 2 + "," + (height / 2 + 50) + ")"
    );

  const bars = group
    .append("g")
    .selectAll("path")
    .data(parkingData)
    .enter()
    .append("path")
    .attr("stroke", "white")
    .attr("stroke-width", "2")
    .attr("cursor", "pointer")
    .attr("fill", (d, i) => scale(i))
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius((d) => y(d["capacity"]))
        .startAngle((d) => x(d.areaidlocation.areadesc))
        .endAngle((d) => x(d.areaidlocation.areadesc) + x.bandwidth())
        .padAngle(0.05)
        .padRadius(innerRadius)
    )
    .on("click", (d) => {
      tooltip.transition().duration(800).style("opacity", 0.9);
      tooltip
        .text("Name: " + d.areaidlocation.areadesc)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    });

  function updateValues() {
    const checkInput = this ? this.checked : false;
    const dataSelection = checkInput
      ? parkingData.filter((parking) => parking.chargingpointcapacity > 0)
      : parkingData;

    x.domain(dataSelection.map((parking) => parking.areaidlocation.areadesc));
    y.domain([
      0,
      d3.max(dataSelection.map((parking) => parking.chargingpointcapacity)),
    ]);

    const newBars = group.selectAll("path").data(dataSelection);

    newBars.attr(
      "d",
      d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius((d) => y(d["chargingpointcapacity"]))
        .startAngle((d) => x(d.areaidlocation.areadesc))
        .endAngle((d) => x(d.areaidlocation.areadesc) + x.bandwidth())
        .padAngle(0.05)
        .padRadius(innerRadius)
    );

    newBars
      .enter()
      .append("path")
      .attr("fill", (d, i) => scale(i))
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius((d) => y(d["chargingpointcapacity"]))
          .startAngle((d) => x(d.areaidlocation.areadesc))
          .endAngle((d) => x(d.areaidlocation.areadesc) + x.bandwidth())
          .padAngle(0.05)
          .padRadius(innerRadius)
      );

    newBars.exit().remove();
  }

  function filterCapacity() {
    const input = parseInt(this.value);

    let carCountCapacity = 0;
    let bikeCountCapacity = 0;
    const dataSelect = parkingData.filter((parking) => {
      if (parking.capacity >= input) {
        carCountCapacity += parseInt(parking.capacity);
        bikeCountCapacity += parseInt(parking.capacity) * 6;
        return parking;
      }
    });

    x.domain(dataSelect.map((parking) => parking.areaidlocation.areadesc));
    y.domain([0, d3.max(dataSelect.map((parking) => parking.capacity))]);

    const updatedBars = group.selectAll("path").data(dataSelect);

    updatedBars.attr(
      "d",
      d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius((d) => y(d["capacity"]))
        .startAngle((d) => x(d.areaidlocation.areadesc))
        .endAngle((d) => x(d.areaidlocation.areadesc) + x.bandwidth())
        .padAngle(0.05)
        .padRadius(innerRadius)
    );

    updatedBars
      .enter()
      .append("path")
      .attr("cursor", "pointer")
      .attr("stroke", "white")
      .attr("stroke-width", "2")
      .attr("fill", (d, i) => scale(i))
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius((d) => y(d["capacity"]))
          .startAngle((d) => x(d.areaidlocation.areadesc))
          .endAngle((d) => x(d.areaidlocation.areadesc) + x.bandwidth())
          .padAngle(0.05)
          .padRadius(innerRadius)
      )
      .on("click", (d) => {
        tooltip.transition().duration(800).style("opacity", 0.9);
        tooltip
          .text("Name: " + d.areaidlocation.areadesc)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      });

    d3.select(".carcap").text(carCountCapacity + " car spots");
    d3.select(".bikecap").text(bikeCountCapacity + " bike spots");

    updatedBars.exit().remove();
  }

  function sortParkingCapacity() {
    const checkSortInput = this ? this.checked : false;

    if (checkSortInput) {
      group
        .selectAll("path")
        .sort((a, b) => d3.descending(a.capacity, b.capacity));
    }


  }

  const chargingCheckbox = d3.select("#charging").on("click", updateValues);
  const minCapacity = d3.select("#mincapacity").on("change", filterCapacity);
  const sortingCheckbox = d3.select("#sort").on("change", sortParkingCapacity);
};

export default circularChart;
