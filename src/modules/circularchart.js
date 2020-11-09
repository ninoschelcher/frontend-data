
const circularChart = (data) => {
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const width = 1400 - margin.left - margin.right;
  const height = 1200 - margin.top - margin.bottom;
  const innerRadius = 50;
  const outerRadius = Math.min(width, height) / 1.5;
  const scale = d3.scaleOrdinal(d3.schemeCategory20);

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
    .domain([0, 3000]);

  const svg = d3
    .select("#garagecapacity")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + width / 2 + "," + (height / 2 - 300) + ")"
    );

  const bars = svg
    .append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("fill", (d, i) => {
      return scale(i);
    })
    .attr(
      "d",
      d3
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


    d3.select("#sort").on("change", change);

    function change() {
      
      if (d3.select("#sort").attr('checked')) {
       const descendingsort = bars.sort(function(a,b) { console.log(b['capacity'] - a['capacity']); });
      } else {
        bars.sort(function(a,b) { return d3.ascending(a.areaidlocation.areadesc, b.areaidlocation.areadesc); });
      }; 
  
      bars.transition().duration(2000).delay(100)
  
    }
  


  
};

export default circularChart;
