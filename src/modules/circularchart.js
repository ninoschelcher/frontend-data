const circularChart = (data) => {
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const width = 900 - margin.left - margin.right;
  const height = 700 - margin.top - margin.bottom;
  const innerRadius = 100;
  const outerRadius = Math.min(width, height) / 2;

  const x = d3
    .scaleBand()
    .range([0, 2 * Math.PI])
    .align(0)
    .domain(
      data.map((d) => {
        return d.areaidlocation.areadesc;
      })
    );

  const y = d3
    .scaleLinear()
    .range([innerRadius, outerRadius])
    .domain([0, 2600]);

  const svg = d3
    .select("#garagecapacity")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + width / 2 + "," + (height / 2 - 50) + ")"
    );

  svg
    .append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("fill", "#69b3a2")
    .attr("d", d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius((d) => {
          return y(d["capacity"]);
        })
        .startAngle((d) => {
          return x(d.areaidlocation.areadesc);
        })
        .endAngle((d) => {
          return x(d.areaidlocation.areadesc) + x.bandwidth();
        })
        .padAngle(0.01)
        .padRadius(innerRadius)
    );
};

export default circularChart;
