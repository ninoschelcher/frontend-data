import { select, arc } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const g = svg.append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

const circle = g.append('circle');

circle.attr('r', height / 2);
circle.attr('fill', 'red');
circle.attr('stroke', 'black');

const eyeSpacing = 101;
const eyeYOffset = -89;
const eyeRadius = 40;
const eyebrowWidth = 100;
const eyebrowHeight = 20;
const eyebrowYOffset = -70;
const mouthOffset = 430;

const eyesG = g
  .append('g')
    .attr('transform', `translate(0, ${eyeYOffset})`);

const leftEye = eyesG
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', -eyeSpacing);

const rightEye = eyesG
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', eyeSpacing);

const eyebrowsG = eyesG
  .append('g')
    .attr('transform', `translate(0, -50)`);

const leftEyebrow = eyebrowsG
  .append('rect')
    .attr('x', -100)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight)
		.attr('transform', 'rotate(40)');

const rightEyebrow = eyebrowsG
  .append('rect')
    .attr('x', 0)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight)
		.attr('transform', 'rotate(310)');

const mouthG = svg
	.append('g')
  	.attr('transform', `translate(${width / 2}, ${mouthOffset})`);

const mouth = mouthG
  .append('path')
    .attr('d', arc()({
      innerRadius: 170,
      outerRadius: 150,
      startAngle: Math.PI / 2.6,
      endAngle: Math.PI * -.4
    }));









