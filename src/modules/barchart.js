const makeBarChart = (parkingData) => {
  //Define margins and radius
  const margin = { top: 20, right: 30, bottom: 40, left: 220 };
  const width = 1500 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  // Tooltip initialization
  const tooltip = d3
    .select("#barchart")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  const svg = d3
    .select("#barchart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(parkingData.map((parking) => parking.capacity))])
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  const y = d3
    .scaleBand()
    .range([0, height])
    .domain(
      parkingData.map(function (d) {
        return d.name;
      })
    )
    .padding(0.1);
  svg.append("g").call(d3.axisLeft(y));

  //Define capacity amounts that are at the bottom of the chart
  const potentialCapacity = d3.select("#barchart").append("div");
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

  //Make a group inside the svg
  const group = svg
    .append("g")
    .attr(
      "transform",
      "translate(" + width / 2 + "," + (height / 2 - 100) + ")"
    );

  //Draw the arcs + tooltip
  svg
    .selectAll("myRect")
    .data(parkingData)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d) {
      return y(d.name);
    })
    .attr("width", function (d) {
      return x(d.capacity);
    })
    .attr("height", y.bandwidth())
    .attr("fill", "lightgreen")
    .on("click", (d) => {
      tooltip.transition().duration(800).style("opacity", 0.9);
      tooltip
        .text("Name: " + d.name)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    });

  //Function that changes the data from normal capacity -> electric charging points
  function updateValues() {
    const checkInput = this ? this.checked : false;
    const dataSelection = checkInput
      ? parkingData.filter((parking) => parking.chargingpoints > 0)
      : parkingData;

    console.log(dataSelection);

    x.domain(dataSelection.map((parking) => parking.name));
    y.domain([0, d3.max(dataSelection.map((parking) => parking.capacity))]);

    const newBars = group.selectAll("rect").data(dataSelection);

    newBars
      .append("rect")
      .attr("x", x(0))
      .attr("y", function (d) {
        return y(d.name);
      })
      .attr("width", function (d) {
        return x(d.capacity);
      })
      .attr("height", y.bandwidth())
      .attr("fill", "lightgreen");

    newBars
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", function (d) {
        return y(d.name);
      })
      .attr("width", function (d) {
        return x(d.capacity);
      })
      .attr("height", y.bandwidth())
      .attr("fill", "lightgreen");

    newBars.exit().remove();
  }

  //Function that filters capacity based on input
  function filterCapacity() {
    const input = parseInt(this.value);

    let carCountCapacity = 0;
    let bikeCountCapacity = 0;

    //Filter data based on user input
    const dataSelect = parkingData.filter((parking) => {
      if (parking.capacity >= input) {
        carCountCapacity += parseInt(parking.capacity);
        bikeCountCapacity += parseInt(parking.capacity) * 6;
        return parking;
      }
    });

    //Update domains on the filtered data from user input
    x.domain(dataSelect.map((parking) => parking.name));
    y.domain([0, d3.max(parkingData.map((parking) => parking.capacity)) / 0.4]);

    //Select all paths(bars) and join with filtered data
    const filteredBars = group.selectAll("rect").data(dataSelect);

    //Update the current bars
    filteredBars
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d) {
      return y(d.name);
    })
    .attr("width", function (d) {
      return x(d.capacity);
    })
    .attr("height", y.bandwidth())
    .attr("fill", "lightgreen")
    

    //Add the new bars with the appriopriate attributes
    filteredBars
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", function (d) {
        return y(d.name);
      })
      .attr("width", function (d) {
        return x(d.capacity);
      })
      .attr("height", y.bandwidth())
      .attr("fill", "lightgreen")
      .on("mouseover", (d) => {
        tooltip.transition().duration(800).style("opacity", 0.9);
        tooltip
          .text("Name: " + d.name)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseexit", function (d) {
        div.transition().duration(500).style("opacity", 0);
      });

    //Update the counter under the chart based on current shown charts.
    d3.select(".carcap").text(carCountCapacity + " car spots");
    d3.select(".bikecap").text(bikeCountCapacity + " bike spots");

    filteredBars.exit().remove();
  }

  function sortParkingCapacity() {
    const checkSortInput = this ? this.checked : false;

    if (checkSortInput) {
      group
        .selectAll("path")
        .sort((a, b) => d3.descending(a.capacity, b.capacity));
    }
  }

  // Input declarations in chart.
  const chargingCheckbox = d3.select("#charging").on("click", updateValues);
  const minCapacity = d3.select("#mincapacity").on("change", filterCapacity);
  const sortingCheckbox = d3.select("#sort").on("change", sortParkingCapacity);
};

export default makeBarChart;
