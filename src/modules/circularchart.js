const circularChart = (data) => {
  const margin = { top: 0, right: 10, bottom: 10, left: 10 };
  const width = 700 - margin.left - margin.right;
  const height = 700 - margin.top - margin.bottom;
  const innerRadius = 50;
  const outerRadius = Math.min(width, height) / 1.5;

  const scale = d3.scaleOrdinal(d3.schemeCategory20);

  const tooltip = d3
    .select('#garagecapacity')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  const x = d3
    .scaleBand()
    .range([0, 2 * Math.PI])
    .domain(
      data.map(function (d) {
        return d.areaidlocation.areadesc;
      })
    );

  const y = d3
    .scaleLinear()
    .range([innerRadius, outerRadius])
    .domain([0, 3000]);

  const svg = d3
    .select('#garagecapacity')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr(
      'transform',
      'translate(' + width / 2 + ',' + (height / 2 - 150) + ')'
    );

  const bars = svg
    .append('g')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('cursor', 'pointer')
    .attr('fill', (d, i) => {
      return scale(i);
    })
    .attr(
      'd',
      d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius((d) => {
          return y(d['capacity']);
        })
        .startAngle((d) => {
          return x(d.areaidlocation.areadesc);
        })
        .endAngle((d) => {
          return x(d.areaidlocation.areadesc) + x.bandwidth();
        })
        .padAngle(0.01)
        .padRadius(innerRadius)
    )
    .on('click', (d) => {
      tooltip.transition().duration(800).style('opacity', 0.9);
      tooltip
        .html('Name: ' + d.areaidlocation.areadesc)
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY - 28 + 'px');
      bar
        .style('stroke', 'black')
    })
};

export default circularChart;
