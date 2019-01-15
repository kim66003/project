function makeLineGraph () {

  input = "../data/killsandwound.json"
  input2 = "../data/data.json"
  var requests = [d3.json(input), d3.json(input2)];

  Promise.all(requests).then(function(response) {
      kw = response[0]
      kw = Object.values(kw)
      kwyear = []
      kw.forEach(function(d) { if (d.iyear == 2005) { kwyear.push(d); }})

      data = response[1]
      // trigger render
      draw(data, "Afghanistan");

  }).catch(function(e){
      throw(e);
  });

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// parse the date / time
var parseTime = d3.timeParse("%Y");
// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Imports); });

// define the line
var valueline2 = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Exports); });

// append the svg obgect to the body of the page
// appends a "group" element to "svg"
// moves the "group" element to the top left margin
var svg = d3.select("#line").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function draw(data, country) {

  var data = data[country];

  // format the data
  data.forEach(function(d) {
      d.Date = parseTime(d.Date);
      d.Imports = +d.Imports;
      d.Exports = +d.Exports;
  });

  // sort years ascending
  data.sort(function(a, b){
    return a["Date"]-b["Date"];
	})

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Date; }));
  y.domain([0, d3.max(data, function(d) {
	  return Math.max(d.Imports, d.Exports); })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline)
      // tooltip hover function
      .on("mouseover", function(){
          d3.select(this)
          .attr("opacity", 0.4)
            tooltip.style("display", null);
      })
      .on("mouseout", function(){
          d3.select(this)
          .attr("opacity", 1)
          tooltip.style("display", "none");
      })
      // show correct text according to line id
      .on("mousemove", function(d){
          var xPos = d3.mouse(this)[0] - 15;
          var yPos = d3.mouse(this)[1] - 35;
          tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
          tooltip.select("text")
          .attr("class", "tooltip-text")
          .text("line1");});

      var tooltip = svg.append("g")
                      .attr("class", "tooltip")
                      .style("display", "none");
      tooltip.append("text")
              .attr("x", 15)
              .attr("dy", "1em");

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline2)
      // tooltip hover function
      .on("mouseover", function(){
          d3.select(this)
          .attr("opacity", 0.4)
            tooltip.style("display", null);
      })
      .on("mouseout", function(){
          d3.select(this)
          .attr("opacity", 1)
          tooltip.style("display", "none");
      });
  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
  }

}
