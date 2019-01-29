/* Javascript file to draw heatmap
   Name: Kimberley Boersma
   Student no.: 11003464 */

// Format values shown in tooltip
var format = d3.format(",");

// Set tooltips for worldmap
var tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([0, 50])
            .html(function(d) {
              // Show county and number of attacks
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Terrorist attacks: </strong><span class='details'>" + format(d.attacks) +"</span>";
            })

// Set margins, width and height
var margin = {top: 0, right: 0, bottom: 0, left: 0},
     width = 1300 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Define path
var path = d3.geoPath();

// Append svg to heatmap column
var svg = d3.select("#heatmap")
            .append("svg")
            .attr("viewBox", [0, 0, (width + margin.right + margin.left),
                      (height + margin.top + margin.bottom)].join(' '))
            .append("g")
            .attr("class", "map");

// Scale worldmap
var projection = d3.geoMercator()
                   .scale(140)
                   .translate( [width / 2, height / 1.4]);

// Define path with projection
var path = d3.geoPath().projection(projection);

// Call tooltip
svg.call(tip);


  function showHeatMap (data, dataMap, lineData, country, year) {
    // Function that executes functions to draw worldmap, legend and timeslider

    // Get data ready to draw heatmap
    multiData = getData2(data, year)
    events = multiData[0]
    max = multiData[1]
    color = multiData[2]

    // Execute functions to draw map, slider and legend
    drawMap(data, dataMap, events, color, lineData, country, year)
    drawSlider(data, dataMap, lineData, country, window.year)
    drawLegend(color, max)
}

function getData2(data, year) {
  // Returns list of #attacks values, rounded max value of #attacks and colorscale

// Make list of data values
counts = []
events = Object.values(data)

// Determine max and round
events.forEach(function(d) {
  counts.push(d.count) ;
});
var max = Math.max.apply(null, counts)
max = Math.round(max / 1000) * 1000 + 1000

// Define color
var color = d3.scaleThreshold()
              .domain([0,1,10,25,50,100,250,500,1000,2500,max])
              .range(["#eeeeee", "#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#990000", "#7f0000"])

return [events, max, color]

}

function formatData (events, year, dataMap) {
  // Get data in right format for worldmap

  var attacksById = {};
  var countries = [];
  var uniqueNames = [];

  events.forEach(function(d) {
     if (d.iyear == year) {
        attacksById[d.iyear + d.country_txt] = +d.count;
        countries.push(d.country_txt);
    };
  });

  $.each(countries, function(i, el){
    if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });

  dataMap.features.forEach(function(d) {
    if (uniqueNames.includes(d.properties.name)) {
      d.attacks = attacksById[year + d.properties.name];
    } else {
      d.attacks = 0;
    };
  });

  return [attacksById, dataMap]
}

function drawMap(attackData, data, events, color, lineData, country, year) {
  // Draws worldmap with colors according to number of attacks

  // Remove countries when map is drawn again
  d3.selectAll(".countries").remove()

  multiData2 = formatData(events, year, data)
  attacksById = multiData2[0]
  data = multiData2[1]


  svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) {
          return color(d.attacks)
      })
      .style("stroke", "white")
      .style("stroke-width", 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style("stroke-width", 0.3)
        .on("mouseover",function(d){
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on("mouseout", function(d){
          tip.hide(d)

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        })
        .on("mousedown", function(d) {
          window.currentCountry = d.properties.name
          showDonut(window.variable, d.properties.name, year, 1)
          showLineGraph(lineData, attackData, data, d.properties.name)
          document.getElementById('currentCountry').textContent = window.currentCountry;

          var scroll = $(window).scrollTop();
          				scroll= scroll+ 700;
          				$('html, body').animate({
          					scrollTop: scroll
          				}, 300);

          $('#selected').text(window.currentCountry);

        });

      svg.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);
}

function drawLegend(color, max) {

  width = 20;
  height = 550;

      var color = d3.scaleThreshold()
                    .domain([0,5,10,25,50,100,250,500,1000,2500,5000])
                    .range(["#7f0000", "#7f0000", "#990000", "#b30000", "#d7301f", "#ef6548", "#fc8d59", "#fdbb84", "#fdd49e", "#fee8c8", "#fff7ec", "#eeeeee"])

      var legend = svg.selectAll(".legend")
                      .data(color.domain())
                      .enter()
                      .append("g")
                      .attr("class", "legend")
                      .attr("transform", function(d, i) { return "translate(120," + ((i * (height / 11)) + 20) + ")"; });

// draw legend colored rectangles
legend.append("rect")
    .attr("x", 0)
    .attr("width", width)
    .attr("height", (height / 11))
    .style("fill", color);

    height2 = height / 11

    var yScale = d3.scaleLinear()
            .range([0, height2, (height2 * 2), (height2 * 3), (height2 * 4), (height2 * 5), (height2 * 6), (height2 * 7), (height2 * 8), (height2 * 9), (height2 * 10), height])
            .domain([5000,2500,1000,500, 250, 100,50,25,10,5, 1,0]);
    // yaxis scaled
    var yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(11)
            .tickValues([0,1, 5,10,25,50,100,250,500,1000,2500,5000]);

    // add axis
    svg.append("g")
      .attr("class", "yAxis")
      .attr("transform", "translate(120, 20)")
      .call(yAxis)
}

function drawSlider(data, dataMap, lineData, country, sliderYear) {

// Time
var dataTime = d3.range(0, 28).map(function(d) {
  return new Date(1990 + d, 10, 4);
});

var sliderTime = d3
  .sliderBottom()
  .min(d3.min(dataTime))
  .max(d3.max(dataTime))
  .step(1000 * 60 * 60 * 24 * 365)
  .width(900)
  .tickFormat(d3.timeFormat('%Y'))
  .tickValues(dataTime)
  .default(new Date(sliderYear, 10, 4))
  .on('onchange', val => {
    // d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
    window.year = d3.timeFormat('%Y')(val)
    multiData = getData2(data, window.year)
    events = multiData[0]
    max = multiData[1]
    color = multiData[2]
    drawMap(data, dataMap, events, color, lineData, country, window.year)
    showDonut(window.variable, window.currentCountry, window.year, 1)
    document.getElementById('currentYear').textContent = window.year;
  });

var gTime = d3
  .select('div#slider-time')
  .append('svg')
  .attr('id', 'timeslider')
  .attr('width', 1000)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(30,30)');

gTime.call(sliderTime);

// d3.select('p#value-time')
// .text(d3.timeFormat('%Y')(sliderTime.value()))
// .attr('text-anchor', 'middle');
}
