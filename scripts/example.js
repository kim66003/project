// set the dimensions and margins of the graph
var margin = {top: 30, right: 20, bottom: 50, left: 60},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var lineOpacity = "0.25";
var lineOpacityHover = "0.85";
var otherLinesOpacityHover = "0.1";
var lineStroke = "1.5px";
var lineStrokeHover = "2.5px";

var circleOpacity = '0.85';
var circleOpacityOnLineHover = "0.25"
var circleRadius = 3;
var circleRadiusHover = 6;

// set the ranges
var xScale = d3.scaleLinear()
                .range([0, width]);

var yScale = d3.scaleLinear()
                .range([height, 0])
                .clamp(true);

// append the svg obgect to the body of the page
// appends a "group" element to "svg"
// moves the "group" element to the top left margin
var svg = d3.select("#line").append("svg")
            .attr("viewBox", [0, 0, (width + margin.right + margin.left),
            (height + margin.top + margin.bottom)].join(' '))
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// define the line
var valueline = d3.line()
    .x(d => xScale(d.iyear))
    .y(d => yScale(d.sum_nkill))
    .curve(d3.curveMonotoneX);

var valueline2 = d3.line()
    .x(d => xScale(d.iyear))
    .y(d => yScale(d.sum_wound))
    .curve(d3.curveMonotoneX);

let lines = svg.append('g')
  .attr('class', 'lines');

function draw(data, country) {

  kwcountry = []
  data.forEach(function(d) { if (d.country_txt == country) { kwcountry.push(d); }})

  console.log(kwcountry)

  // Scale the range of the data
  xScale
  .domain(d3.extent(kwcountry, function(d) { return d.iyear; }));
  yScale
  .domain([0, d3.max(kwcountry, function(d) { return Math.max(d.sum_nkill, d.sum_wound); })])
  .nice();

  // Add the valueline path.
  svg.append("g").append("path")
      .data([kwcountry])
      .attr("class", "line")
      .attr("d", valueline)
      .attr("id", "kills")
      // tooltip hover function
      .on("mouseover", function(){
          d3.select(this)
          .attr("opacity", 0.4)
            // tooltip.style("display", null);
      })
      .on("mouseout", function(){
          d3.select(this)
          .attr("opacity", 1)
          // tooltip.style("display", "none");
      })
      .on("mousemove", function(d){
            var xPos = d3.mouse(this)[0];
            var yPos = d3.mouse(this)[1];
            tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
            tooltip.select("text")
            .attr("class", "tooltip-text")
            .text("hoi"); });;

  // Add the valueline path.
  svg.append("g").append("path")
      .data([kwcountry])
      .attr("class", "line")
      .attr("d", valueline2)
      .attr("id", "wounded")
      // tooltip hover function
      .on("mouseover", function(){
          d3.select(this)
          .attr("opacity", 0.4)
            // tooltip.style("display", null);
      })
      .on("mouseout", function(){
          d3.select(this)
          .attr("opacity", 1)
          // tooltip.style("display", "none");
      })
      .on("mousemove", function(d){
            var xPos = d3.mouse(this)[0];
            var yPos = d3.mouse(this)[1];
            tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
            tooltip.select("text")
            // .attr("class", "tooltip-text")
            .text("hoi"); });

            var tooltip = svg.append("g")
                             .attr("class", "tooltip")
                             // .style("display", "none");
           tooltip.append("text")
                           .attr("x", 15)
                           .attr("dy", "1em")
                           .attr("class", "tooltip-text")
                           .text("hallo");

  // Add the X Axis
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
  // Add the Y Axis
  svg.append("g")
  .call(d3.axisLeft(yScale));

      // add axis labels
        svg.append("g").append('text')
        .attr('class', 'axis-label')
        .attr('y', height + 40)
        .attr('x', width / 2 - 20)
        .attr('fill', 'black')
        .text("Year");

        svg.append("g")
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', - 50)
        .attr('x', - height / 2)
        .attr('fill', 'black')
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text("Number of kills and wounded")

        // add title
    svg.append("g")
    .append('text')
    .attr('class', 'title')
    .attr('x', margin.left)
    .attr('y', -10)
    .text("Number of fatalities and non-fatal injuries from terrorist attacks in " + country)
  }
