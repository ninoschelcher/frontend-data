import { select, scaleLinear, max, scaleBand, axisLeft, axisBottom, ascending } from 'd3';

const data = [
    {
        country: "China",
        population: "237421"
    },
    {
        country: "India",
        population: "543812"
    },
    {
        country: "United States",
        population: "692734"
    },
    {   
        country: "Indonesia",
        population: "978231"
    },
    {
        country: "Brazil",
        population: "189232"
    },
    {
        country: "Pakistan",
        population: "572983"
    },
    {
        country: "Nigeria",
        population: "182371"
    }
]

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {

    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = {top:20, right: 40, bottom: 20, left:120}
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])

    const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.2)

    const yAxis = axisLeft(yScale)

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);  

    g.append('g').call(axisLeft(yScale));
    g.append('g').call(axisBottom(xScale))
        .attr('transform', `translate(0, ${innerHeight})`);  
    
    g.selectAll('circle').data(data)
      .enter().append('circle')
        .attr('cy', d => yScale(yValue(d)) + yScale.bandwidth() / 2)
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', yScale.bandwidth() / 4)
        .attr('fill', 'darkgreen')
}

data.forEach(data => {
    data.population = +data.population * 1000;
})

render(data);


