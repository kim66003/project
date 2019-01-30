/* Javascript file to draw linegraph
   Name: Kimberley Boersma
   Student no.: 11003464 */

// Source: https://codepen.io/zakariachowdhury/pen/JEmjwq

function showLineGraph (mainData, attacks, dataMap, country) {
  // This function contains the variables needed in drawLineGraph()
  // and in drawLegend() and executes these functions at the end

  // Removes linegraph when function is called after the first time
  d3.select('#linegraph').remove();

  // Get data ready for lines
  dataValues = Object.values(mainData)
  attacks = Object.values(attacks)
  kw = makeDict(dataValues, attacks, country)
  attacksCountry = kw[2]
  kwcountry = kw[1]
  kw = kw[0]

  // Set margins, width and height and duration
  var margin = {top: 50, right: 40, bottom: 60, left: 50},
      width = 700 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  var duration = 500;

  // Define opacity and stroke for lines and circles
  var lineOpacity = '0.25';
  var lineOpacityHover = '0.85';
  var otherLinesOpacityHover = '0.1';
  var lineStroke = '1.5px';
  var lineStrokeHover = '2.5px';

  var circleOpacity = '0.85';
  var circleOpacityOnLineHover = '0.25'
  var circleRadius = 3;
  var circleRadiusHover = 6;

  // Define range of x and y scales
  var xScale = d3.scaleLinear()
                  .range([0, width]);

  var yScale = d3.scaleLinear()
                  .range([height, 0]);

  // Set x and y axes
  var xAxis = d3.axisBottom(xScale)
                .tickFormat(function(d){ return d })
                .ticks(14);
  var yAxis = d3.axisLeft(yScale);

  // Add svg to line column and set viewbox
  var svg = d3.select('#line').append('svg')
              .attr('id', 'linegraph')
              .attr('viewBox', [0, 0, (width + margin.right + margin.left),
              (height + margin.top + margin.bottom)].join(' '))
              .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // 3 colors for 3 lines
  var color = ['#583aa5', '#a57e3a', '#a53a87'];

  // Tooltiptext for 3 lines
  var tooltipText = ['Fatalities', 'Non-fatal injuries', 'Terrorist attacks']

  // Define line with scaled x and y values
  var line = d3.line()
               .curve(d3.curveMonotoneX)
               .x(d => xScale(d.date))
               .y(d => yScale(d.value));

  // Add lineholder to svg
  let lines = svg.append('g')
    .attr('class', 'lineholder');

  function drawLineGraph (data, kwcountry, attacksCountry, country) {
  // Draw linegraph and add title and axis labels

      // Define domain of x- and y scales
      xScale
      .domain(d3.extent(attacksCountry, function(d) { return d.iyear; }));

      yScale
      .clamp(true)
      .domain([0, d3.max(kwcountry, function(d) { return Math.max(d.sum_nkill, d.sum_nwound); })])
      .nice();

      // Make linegroups for #kills, #wounded and #attacks with hover function
      var lineGroup = lines.selectAll('.line-group')
                           .data(data)
                           .enter()
                           .append('g')
                           .attr('class', 'line-group')
                           // Show data type on mouseover
                           .on('mouseover', function(d, i) {
                                svg.append('text')
                                   .attr('class', 'tooltip-text')
                                   .style('fill', color[i])
                                   .text(tooltipText[i])
                                   .attr('x', width / 2)
                                   .attr('y', 15);
                             })
                           // Remove text on mouseout
                           .on('mouseout', function(d) {
                               svg.select('.tooltip-text').remove();
                             });
        // Append line to each linegroup
        lineGroup.append('path')
                 .attr('class', 'line')
                 .attr('d', d => line(d.values))
                 .attr('id', function(d, i){ return d.type; })
                 .style('stroke', (d, i) => color[i])
                 .style('opacity', lineOpacity)
                 // Change opacity and stroke of lines on mouseover
                 .on('mouseover', function(d) {
                     d3.selectAll('.line')
              				 .style('opacity', otherLinesOpacityHover);
                     d3.selectAll('.circle')
              				 .style('opacity', circleOpacityOnLineHover);
                     d3.select(this)
                       .style('opacity', lineOpacityHover)
                       .style('stroke-width', lineStrokeHover)
                       .style('cursor', 'pointer');
                  })
                 // Back to original opacity and stroke on mouseout
                 .on('mouseout', function(d) {
                     d3.selectAll('.line')
              				 .style('opacity', lineOpacity);
                     d3.selectAll('.circle')
              				 .style('opacity', circleOpacity);
                     d3.select(this)
                       .style('stroke-width', lineStroke)
                       .style('cursor', 'none');
                  });


      // Make circle-groups for each line
      var circleGroup = lines.selectAll('circle-group')
                             .data(data).enter()
                             .append('g')
                             .attr('class', 'circle-group')
                             .style('fill', (d, i) => color[i])
                             .selectAll('circle')
                             .data(d => d.values).enter()

      // Append circles to each circle-group for every datapoint
      circleGroup.append('g')
                 .attr('class', 'circle')
                 // Show value of circle on mouseover
                 .on('mouseover', function(d) {
                    d3.select(this)
                      .style('cursor', 'pointer')
                      .append('text')
                      .attr('class', 'circle-text')
                      .text(`${d.value}`)
                      .attr('x', d => xScale(d.date) + 5)
                      .attr('y', d => yScale(d.value) - 10);
                  })
                  // Remove value on mouseout
                 .on('mouseout', function(d) {
                    d3.select(this)
                      .style('cursor', 'none')
                      .transition()
                      .duration(duration)
                      .selectAll('.circle-text').remove();
                  })
                 .append('circle')
                 .attr('cx', d => xScale(d.date))
                 .attr('cy', d => yScale(d.value))
                 .attr('r', circleRadius)
                 .style('opacity', circleOpacity)
                 // Make circle radius larger on mouseover
                 .on('mouseover', function(d) {
                      d3.select(this)
                        .transition()
                        .duration(duration)
                        .attr('r', circleRadiusHover);
                  })
                  // Return to normal radius with delay
                 .on('mouseout', function(d) {
                      d3.select(this)
                        .transition()
                        .duration(duration)
                        .attr('r', circleRadius);
                  })
                  // Change current year onclick and update donut, heatmap and slider
                 .on('mousedown', function(d, i) {
                      d3.select('#timeslider').remove()
                      window.year = d.date
                      document.getElementById('currentYear').textContent = window.year;
                      showDonut(window.variable, window.currentCountry, window.year, 1)
                      showHeatMap(attacks, dataMap, mainData, window.currentCountry, window.year)
                  });

      // Draw x and y axis
      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

      svg.append('g')
        .attr('class', 'y axis')
        .transition()
        .duration(1000)
        .call(yAxis);

      // Add axis labels
      svg.append('g')
      .append('text')
      .attr('class', 'axis-label')
      .attr('y', height + 30)
      .attr('x', width / 2)
      .text('Year');

      svg.append('g')
      .append('text')
      .attr('class', 'axis-label')
      .attr('y', - 40)
      .attr('x', - height / 2)
      .attr('transform', 'rotate(-90)')
      .text('Number of (non)fatalities')

      // Add title for specific country
      svg.append('g')
      .append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', -30)
      .text('Incidence, fatality and injury from terrorist attacks ')

      svg.append('g')
      .append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', -10)
      .text('in ' + country)
  }

  function drawLegend (){
  // Draw legend for line graph

    // Append legend to svg
    var legend = svg.selectAll('.legend')
                    .data(kw)
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d, i) {
                       // Spacing between rects based on text width
                       if (i == 0) {
                         return 'translate(70,20)';
                       } else if (i == 1){
                          return 'translate(' + i * 150 + ',20)';
                        } else {
                            return 'translate(' + i * 140 + ',20)';
                          };
                        });

      // Define rectangle width and height
      var rectWidth = 18;
      var rectHeight = 18;

     // Draw legend rects with 3 colors
     legend.append('rect')
           .attr('x', width / 6)
           .attr('y', height + 15)
           .attr('width', rectWidth)
           .attr('height', rectHeight)
           .style('fill', function(d, i) { return color[i] })
           // Add same mouseover function as for lines
           .on('mouseover', function(d, i){
             // Show data type
             svg.append('text')
               .attr('class', 'tooltip-text')
               .style('fill', color[i])
               .text(tooltipText[i])
               .attr('x', width / 2)
               .attr('y', 15);
            // Change opacity and stroke of lines
            d3.selectAll('.line')
      				.style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
      				.style('opacity', circleOpacityOnLineHover);
            d3.select('#' + d.type)
              .style('opacity', lineOpacityHover)
              .style('stroke-width', lineStrokeHover)
              .style('cursor', 'pointer');
            // Give rect a white border on hover
            d3.select(this)
              .style('stroke', 'white')
              .style('stroke-width', lineStrokeHover)
              .style('cursor', 'pointer');
           })
           // Return opacity, stroke and rects back to normal on mouseout
           .on('mouseout', function(d) {
             svg.select('.tooltip-text').remove();
             d3.selectAll('.line')
       					.style('opacity', lineOpacity);
             d3.selectAll('.circle')
       				 .style('opacity', circleOpacity);
             d3.select('#' + d.type)
               .style('stroke-width', lineStroke)
               .style('cursor', 'none');
             d3.select(this)
               .style('stroke', 'none')
               .style('stroke-width', 'none')
               .style('cursor', 'none');
             });

     // Add text to legend
     legend.append('text')
           .attr('class', 'legend-text')
           .attr('x', width / 6 + 20)
           .attr('y', height + 30)
           .text(function(d, i){
             return tooltipText[i];
           });
  }

  // If data exists, draw linegraph
  if (kwcountry.length != 0) {
    drawLineGraph(kw, kwcountry, attacksCountry, country)
    drawLegend()
  }
  // If there is no data available (for this year)
  // Don't execute functions
  // Show text 'no data available'
  else {
    svg.append('g')
    .append('text')
    .attr('class', 'no-data')
    .attr('x', width / 2)
    .attr('y', height / 2)
    .text('No data available for ' + window.currentCountry)
  }
}

function makeDict (killsandwound, attacks, country) {
  // Makes dictionary of #kills, #wounded and #attacks data
  // for three lines in linegraph

  var dict = [];
  var kills = [];
  var wounded = [];
  var kwcountry = [];
  var countryName;

  // List with #kills and #wounded data for selected country
  killsandwound.forEach(function(d) {
    if (d.country_txt == country) {
      kwcountry.push(d);
    };
  });

  kwcountry.forEach(function(d) {
      // Save countryname
      countryName = d.country_txt;
      // List with years and values for #kills and #wounded
      kills.push({
        date: d.iyear,
        value: d.sum_nkill
      });
      wounded.push({
        date: d.iyear,
        value: d.sum_nwound
      });
  });

  // Save countryname, type of data and list of values in dictionary
  dict.push({
    country: countryName,
    type: 'kills',
    values: kills
  });

  dict.push({
    country: countryName,
    type: 'wounded',
    values: wounded
  });

  var attacksList = [];
  var valuesList = [];

  // Do the same for #attacks data
  // Make a list of attacks for selected country
  attacks.forEach(function(d){
    if (d.country_txt == country) {
      attacksList.push(d);
    };
  });

  // Save countryname and make list of date and values for #attacks
  attacksList.forEach(function(d) {
      countryName = d.country_txt;
      valuesList.push({
        date: d.iyear,
        value: d.count
      });
  });

  // Add countryname, type of data and list of linedata to dictionary
  dict.push({
    country: countryName,
    type: 'attacks',
    values: valuesList
  })

  // Returns:
  // list with 3 dictionaries
  // list of #kills and #wounded in original format
  // list of #attacks in original format
  return [dict, kwcountry, attacksList];
  }
