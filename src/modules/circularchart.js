const makeCircularBarPlot = (parkingData) => {
  //Define margins and radius
  const margin = { top: 0, right: 10, bottom: 10, left: 10 };
  const width = 1400 - margin.left - margin.right;
  const height = 1000 - margin.top - margin.bottom;
  const innerRadius = 80;
  const outerRadius = Math.min(width, height) / 1;

  // Tooltip initialization
  const tooltip = d3
    .select("#garagecapacity")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  const title = d3
    .select("#garagecapacity")
    .append("h2")
    .html("Amsterdam" +  "<br />" + "Garages")


  //Define x scale and base it uponn name
  const x = d3
    .scaleBand()
    .range([0, 2 * Math.PI])
    .domain(parkingData.map((parking) => parking.name));

  //Define y scale and base it on capacity and divide it otherwise the bars were way too big
  const y = d3
    .scaleRadial()
    .range([innerRadius, outerRadius])
    .domain([0, d3.max(parkingData.map((parking) => parking.capacity)) / 0.4]);

  //Append svg to div and give it a width and height
  const svg = d3
    .select("#garagecapacity")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  //Select div from page
  const potentialCapacity = d3.select("#garagecapacity").append("div");

  // Add a h3 to div for car capacity
  const carCapacity = potentialCapacity
    .append("h3")
    .text("Car Capacity: ")
    .append("p")
    .attr("class", "carcap");

  // Add a h3 to div for bike capacity
  const bikeCapacity = potentialCapacity
    .append("h3")
    .text("Bike Capacity: ")
    .append("p")
    .attr("class", "bikecap");

  //Make a group inside the svg and translate the position
  const group = svg
    .append("g")
    .attr(
      "transform",
      "translate(" + width / 2 + "," + (height / 2 - 150) + ")"
    );

  //Draw the arcs from the chart + add the transition tooltips
  const bars = group
    .append("g")
    .selectAll("path")
    .data(parkingData)
    .enter()
    .append("path")
    .attr("stroke", "white")
    .attr("stroke-width", "2")
    .attr("cursor", "pointer")
    .attr("fill", "#A5D878")
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius((d) => y(d["capacity"]))
        .startAngle((d) => x(d.name))
        .endAngle((d) => x(d.name) + x.bandwidth())
        .padAngle(0.05)
        .padRadius(innerRadius)
    )
    .on("mouseover", (d) => {
      tooltip.transition().duration(800).style("opacity", 0.9);
      tooltip
        .html("Name: " + d.name + "<br />" + "Capacity: " + d.capacity)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseexit", (d) => {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  //Function that changes the data from normal capacity -> electric charging points
  function updateValues(sortedData = null) {
    const checkInput = this ? this.checked : false;

    // let dataSelection = sortedData == null ? parkingData : sortedData;
    // dataSelection = checkInput
    //   ? parkingData.filter((parking) => parking.chargingpoints > 0)
    //   : dataSelection;

    //check if input checked is true and filter the data based on that
    const dataSelection = checkInput
      ? parkingData.filter((parking) => parking.chargingpoints > 0)
      : parkingData;

    //Update the domains
    x.domain(dataSelection.map((parking) => parking.name));
    y.domain([
      0,
      d3.max(dataSelection.map((parking) => parking.capacity)) / 0.4,
    ]);

    // Select all bars and put the new filtered data in.
    const newBars = group.selectAll("path").data(dataSelection);
    // const color = sortedData == null ? "red" : "#A5D878";

    newBars
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius((d) => y(d["capacity"]))
          .startAngle((d) => x(d.name))
          .endAngle((d) => x(d.name) + x.bandwidth())
          .padAngle(0.05)
          .padRadius(innerRadius)
      )
      .attr("fill", "red");

    newBars
      .enter()
      .append("path")
      .attr("fill", "red")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius((d) => y(d["chargingcapacity"]))
          .startAngle((d) => x(d.name))
          .endAngle((d) => x(d.name) + x.bandwidth())
          .padAngle(0.05)
          .padRadius(innerRadius)
      )
      .attr("stroke", "white")
      .attr("stroke-width", "2")
      .attr("cursor", "pointer")
      .attr("fill", "#A5D878");

    newBars.exit().remove();
  }

  //Function that filters capacity based on user input
  function filterCapacity() {
    //Check the value from the input field
    const input = parseInt(this.value);

    //Make 2 variables that are being updated on every new input
    let carCountCapacity = 0;
    let bikeCountCapacity = 0;

    //Filter the dataset based on user input + add up the capacity from the entries that are left
    // Source: https://vizhub.com/Razpudding/c2a9c9b4fde84816931c404951c79873
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
    const filteredBars = group.selectAll("path").data(dataSelect);

    //Update the current bars
    filteredBars.attr(
      "d",
      d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius((d) => y(d["capacity"]))
        .startAngle((d) => x(d.name))
        .endAngle((d) => x(d.name) + x.bandwidth())
        .padAngle(0.05)
        .padRadius(innerRadius)
    );

    // //Add the new bars with the appriopriate attributes
    filteredBars
      .enter()
      .append("path")
      .attr("cursor", "pointer")
      .attr("stroke", "white")
      .attr("stroke-width", "2")
      .attr("fill", "#A5D878")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius((d) => y(d["capacity"]))
          .startAngle((d) => x(d.name))
          .endAngle((d) => x(d.name) + x.bandwidth())
          .padAngle(0.05)
          .padRadius(innerRadius)
      )
      .on("mouseover", (d) => {
        tooltip.transition().duration(800).style("opacity", 0.9);
        tooltip
          .html("Name: " + d.name + "<br />" + "Capacity: " + d.capacity)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      });

    //Update the counter under the chart based on current shown charts.
    d3.select(".carcap").text(carCountCapacity + " car spots");
    d3.select(".bikecap").text(bikeCountCapacity + " bike spots");

    //Remove all bars that didnt meet the filter
    filteredBars.exit().remove();
  }

  function sortParkingCapacity() {
    //Check if input is checked
    const checkSortInput = this ? this.checked : false;

    if (checkSortInput) {
      group
        .selectAll("path")
        .sort((a, b) => d3.descending(a.capacity, b.capacity));
    }

    // if (checkSortInput) {
    //   const sorted = [...parkingData].sort((a, b) => {
    //     return d3.descending(a.capacity, b.capacity);
    //   });
    //   updateValues(sorted);
    // } else {
    //   updateValues(parkingData);
    // }
  }

  // Input declarations in chart.
  const chargingCheckbox = d3.select("#charging").on("click", updateValues);
  const minCapacity = d3.select("#mincapacity").on("change", filterCapacity);
  const sortingCheckbox = d3.select("#sort").on("change", sortParkingCapacity);
};

export default makeCircularBarPlot;
