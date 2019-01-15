function makeDonutChart () {

  input = "../data/group.json"
  var requests = [d3.json(input)];

  Promise.all(requests).then(function(response) {
      group = response[0]


      drawDonut(group, "Indonesia")

  }).catch(function(e){
      throw(e);
  });

}

function drawDonut (data, country) {
  values = Object.values(data)
  events = []
  values.forEach(function(d) {
    if (d.iyear == 2005 && d.country_txt == "Indonesia") { events.push(d) }});

    events.sort(function(a, b) { return a.percentage - b.percentage})
    console.log(events)

var text = "";

var margin = {top: 5, right: 5, bottom: 5, left: 5},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  var thickness = 50;
  var duration = 750;

  var radius = Math.min(width, height) / 2;
  var color = d3.scaleOrdinal(d3.schemeSet3);

  var svg = d3.select("#donut")
          .append("svg")
          .attr("class", "pie")
          .attr("viewBox", [0, 0, (width + margin.right + margin.left),
                        (height + margin.top + margin.bottom)].join(' '));
          // .attr("width", width)
          // .attr("height", height);

  var g = svg.append("g")
          .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

  var arc = d3.arc()
              .innerRadius(radius - thickness)
              .outerRadius(radius);

  var pie = d3.pie()
              .value(function(d) { if (d.country_txt == country) {
                return (d.percentage); }})
              .sort(null);

  var path = g.selectAll("path")
              .data(pie(events))
              .enter()
              .append("g")
              .on("mouseover", function(d) {

    let g = d3.select(this)
      .style("cursor", "pointer")
      .style("fill", "pink")
      .append("g")
      .attr("class", "text-group");

    g.append("text")
      .attr("class", "name-text")
      .text(`${d.data.gname}`)
      .attr("text-anchor", "middle")
      .attr("dy", "-1.2em");

    g.append("text")
      .attr("class", "value-text")
      .text(`${(d.data.percentage * 100).toFixed(2)}%`)
      .attr("text-anchor", "middle")
      .attr("dy", ".6em");

  })
.on("mouseout", function(d) {
  d3.select(this)
    .style("cursor", "none")
    .style("fill", color(this._current))
    .select(".text-group").remove();

  })
.append("path")
.attr("d", arc)
.attr("fill", (d, i) => color(i))
.on("mouseover", function(d) {
    d3.select(this)
      .style("cursor", "pointer")
      .style("opacity", 0.5);
  })
.on("mouseout", function(d) {
    d3.select(this)
      .style("cursor", "none")
      .style("opacity", 1.0);
  })
.each(function(d, i) { this._current = i; });

g.append("text")
.attr("class", "country-text")
.text(country)
.attr("text-anchor", "middle")
.attr("dy", "3em");

g.append("text")
.attr("text-anchor", "middle")
.attr("dy", ".35em")
.text(text);
}
