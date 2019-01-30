/* Javascript file to draw heatmap
   Name: Kimberley Boersma
   Student no.: 11003464 */

// Source of worldmap: http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f

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
var legendMargin = 120;

// Define path
var path = d3.geoPath();

// Append svg to heatmap column
var svg = d3.select("#heatmap")
            .append("svg")
            .attr("viewBox", [0, 0, (width + margin.right + margin.left),
                      (height + margin.top + margin.bottom)].join(' '))
            .append("g")
            .attr("class", "map")
            .attr('transform', 'translate(0,0)');

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
  var multiData = getData2(data, year)
  var events = multiData[0]
  var max = multiData[1]
  var color = multiData[2]

  // Execute functions to draw map, slider and legend
  drawMap(data, dataMap, events, color, lineData, country, year)
  drawSlider(data, dataMap, lineData, country, window.year)
  drawLegend(max)
}

function getData2(data, year) {
  // Returns list of #attacks values, rounded max value of #attacks and colorscale

// Make list of data values
var counts = []
var events = Object.values(data)

// Determine max and round
events.forEach(function(d) {
  counts.push(d.count) ;
});
var max = Math.max.apply(null, counts)
max = Math.round(max / 1000) * 1000 + 1000

// Define color
var color = d3.scaleThreshold()
              .domain([0, 1, 10, 25, 50, 100, 250, 500, 1000, 2500, max])
              .range(["#eeeeee", "#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#990000", "#7f0000"])

return [events, max, color]

}

function formatData (events, year, dataMap) {
  // Get data in right format for worldmap

  var attacksById = {};
  var countries = [];
  var uniqueNames = [];

  // Make dictionary for attacks with unique ID
  events.forEach(function(d) {
     if (d.iyear == year) {
        attacksById[d.iyear + d.country_txt] = +d.count;
        // Make list of countries
        countries.push(d.country_txt);
    };
  });

  // Remove duplicates in countries list
  $.each(countries, function(i, el){
    if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });

  // Change worldmap data from source to match own data (previously contained population per country)
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

  // Remove old countries when map is drawn again
  d3.selectAll(".countries").remove()

  // Get data in right format
  var multiData2 = formatData(events, year, data)
  var attacksById = multiData2[0]
  var data = multiData2[1]

  // Draw countries on map
  svg.append("g")
     .attr("class", "countries")
     .selectAll("path")
     .data(data.features)
     .enter().append("path")
     .attr("d", path)
     // Give country color according to colorscale
     .style("fill", function(d) {
          return color(d.attacks)
      })
     .style("stroke", "white")
     .style("stroke-width", 1.5)
     .style("opacity",0.8)
     // Mouseover functions
     .style("stroke","white")
     .style("stroke-width", 0.3)
     .on("mouseover",function(d){
          // Show tooltip
          tip.show(d);
          // Highlight country
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
      // Update donut and linegraph onclick
     .on("mousedown", function(d) {
          // Update current country
          window.currentCountry = d.properties.name
          // Update donut and linegraph
          showDonut(window.variable, d.properties.name, year, 1)
          showLineGraph(lineData, attackData, data, d.properties.name)
          // Update country in navbar
          document.getElementById('currentCountry').textContent = window.currentCountry;
          // Scroll page down when country is clicked
          var scroll = $(window).scrollTop();
          				scroll= scroll+ 700;
          				$('html, body').animate({
          					scrollTop: scroll
          				}, 300);
          // Display current country in dropdown
          $('#selected').text(window.currentCountry);

        });
   // Give names to countries
   svg.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);
}

function drawLegend(max) {
// Draw legend for worldmap

  // Set width and height
  var width = 20;
  var height = 550;
  var rectHeight = height / 11

  // Define legend color
  var color = d3.scaleThreshold()
                .domain([0, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, max])
                .range(["#7f0000", "#7f0000", "#990000", "#b30000", "#d7301f", "#ef6548", "#fc8d59", "#fdbb84", "#fdd49e", "#fee8c8", "#fff7ec", "#eeeeee"])

  // Append legend to svg
  var legend = svg.selectAll(".legend")
                  .data(color.domain())
                  .enter()
                  .append("g")
                  .attr("class", "legend")
                  .attr("transform", function(d, i) { return "translate(" + legendMargin + ',' + ((i * (rectHeight)) + 20) + ")"; });

  // Draw legend colored rectangles
  legend.append("rect")
        .attr("x", 0)
        .attr("width", width)
        .attr("height", rectHeight)
        .style("fill", color);

  // Set y scale
  var yScale = d3.scaleLinear()
          // Set range manually because scale is not linear
          .range([0, rectHeight, (rectHeight * 2), (rectHeight * 3), (rectHeight * 4), (rectHeight * 5), (rectHeight * 6), (rectHeight * 7), (rectHeight * 8), (rectHeight * 9), (rectHeight * 10), height])
          .domain([max, 2500, 1000, 500, 250, 100, 50, 25, 10, 5, 1, 0]);

  // Scale y axis
  var yAxis = d3.axisLeft()
          .scale(yScale)
          // Set ticks and tick values for these specific values
          .ticks(11)
          .tickValues([0, 1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, max]);

  // Draw axis next to legend
  svg.append("g")
     .attr("class", "y axis")
     .attr("transform", "translate(120, 20)")
     .call(yAxis)

  // Add text to legend
  svg.append('g')
     .append('text')
     .attr('class', 'legend-text-map')
     .attr('y', 75)
     .attr('x', - height / 2)
     .attr('transform', 'rotate(-90)')
     .text('More terrorist attacks →')

}

function drawSlider(data, dataMap, lineData, country, sliderYear) {
  // Draws time slider for period 1990-2017
  // Source: https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518

  // Set margins, width and height
  var margin = {top: 5, right: 20, bottom: 5, left: 20},
       width = 1000 - margin.left - margin.right,
      height = 100 - margin.top - margin.bottom;
  var sliderWidth = width - 200;

  // Define time
  var dataTime = d3.range(0, 28)
                   .map(function(d) {
                     return new Date(1990 + d, 10, 4);
                   });

  // Define slider
  var sliderTime = d3.sliderBottom()
                     .min(d3.min(dataTime))
                     .max(d3.max(dataTime))
                     .step(1000 * 60 * 60 * 24 * 365)
                     .width(sliderWidth)
                     .tickFormat(d3.timeFormat('%Y'))
                     .tickValues(dataTime)
                     // Set default year
                     .default(new Date(sliderYear, 10, 4))
                     // Update worldmap and donut when year is changed
                     .on('onchange', val => {
                        // Update current year
                        window.year = d3.timeFormat('%Y')(val)
                        // Get data for worldmap
                        multiData = getData2(data, window.year)
                        events = multiData[0]
                        max = multiData[1]
                        color = multiData[2]
                        // Draw worldmap and donut
                        drawMap(data, dataMap, events, color, lineData, country, window.year)
                        showDonut(window.variable, window.currentCountry, window.year, 1)
                        // Update current year in navbar text
                        document.getElementById('currentYear').textContent = window.year;
                      });

  // Append timeslider
  var gTime = d3.select('#slider-time')
                .append('svg')
                .attr('id', 'timeslider')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                // Put timeslider 50px to the right of legend
                .attr('transform', 'translate(' + (legendMargin + 50) + ',30)');

  // Draw timeslider
  gTime.call(sliderTime);
}
