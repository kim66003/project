window.onload = function() {

var format = d3.format(",");

// Set tooltips
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, -50])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Terrorist attacks: </strong><span class='details'>" + format(d.attacks) +"</span>";
            })

var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 1300 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

var path = d3.geoPath();

var svg = d3.select("#heatmap")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

var projection = d3.geoMercator()
                   .scale(140)
                  .translate( [width / 2, height / 1.4]);

var path = d3.geoPath().projection(projection);

svg.call(tip);


  input = "../data/country.json"
  input2 = "../data/world_countries.json"
  input3 = "../data/world_attacks.tsv"
  var requests = [d3.json(input), d3.json(input2), d3.tsv(input3), svg, path, tip];

  Promise.all(requests).then(function(response) {
      country = response[0]
      data = response[1]
      attacks = response[2]
      svg = response[3]
      path = response[4]
      tip = response[5]

      // console.log(country)
      keys = Object.keys(country)
      counts = []
      events = []
      for (i in keys) {
          events.push(country[i])
      }

      events.forEach(function(d) { if (d.iyear == 2003){ counts.push(d.count)}})
      var min = 0;
      var max = Math.max.apply(null, counts)
      console.log(max)

      var color = d3.scaleSequential(d3.interpolateOrRd)
          .clamp(true)
          .domain([min, max]);


    ready(data, attacks, svg, path, color, tip, events, 2003)

  }).catch(function(e){
      throw(e);
  });
};

function ready(data, attacks, svg, path, color, tip, events, year) {

  var attacksById = {};
  var countries = []
  var uniqueNames = []
  events.forEach(function(d) { if (d.iyear == year) { attacksById[d.iyear + d.country_txt] = +d.count
  countries.push(d.country_txt)}});
  $.each(countries, function(i, el){
    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
});
  console.log(attacksById)
  console.log(uniqueNames)

  // attacks.forEach(function(d) { attacksById[d.id] = +d.attacks; });
  data.features.forEach(function(d) {
    if (uniqueNames.includes(d.properties.name)) {d.attacks = attacksById[year + d.properties.name]}
    else {d.attacks = 0} });
  console.log(data.features)

  svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { return color(d.attacks); })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on('mouseout', function(d){
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });

      svg.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);
}
