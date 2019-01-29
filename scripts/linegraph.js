function showLineGraph (data, attacks, dataMap, country) {
  d3.select('#linegraph').remove();
  data2 = Object.values(data)
  attacks = Object.values(attacks)
  kw = makeDict(data2, attacks, country)
    attacksCountry = kw[2]
    kwcountry = kw[1]
    kw = kw[0]

  var margin = {top: 50, right: 20, bottom: 60, left: 50},
      width = 700 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  var duration = 500;

  var lineOpacity = '0.25';
  var lineOpacityHover = '0.85';
  var otherLinesOpacityHover = '0.1';
  var lineStroke = '1.5px';
  var lineStrokeHover = '2.5px';

  var circleOpacity = '0.85';
  var circleOpacityOnLineHover = '0.25'
  var circleRadius = 3;
  var circleRadiusHover = 6;

  /* Scale */

  var xScale = d3.scaleLinear()
                  .range([0, width]);


  var yScale = d3.scaleLinear()
                  .range([height, 0]);

  /* Add Axis into SVG */
  var xAxis = d3.axisBottom(xScale)
                .tickFormat(function(d){ return d })
                .ticks(14);
  var yAxis = d3.axisLeft(yScale);

  /* Add SVG */
  var svg = d3.select('#line').append('svg')
              // .attr('id', function() { if (/\s/.test(country)) {
              //       return country.replace(/\s/g,''); } else { return country; }})
              .attr('id', 'linegraph')
              .attr('viewBox', [0, 0, (width + margin.right + margin.left),
              (height + margin.top + margin.bottom)].join(' '))
              .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var color = ['#583aa5', '#a57e3a', '#a53a87'];

  tooltipText = ['Fatalities', 'Non-fatal injuries', 'Terrorist attacks']

  /* Add line into SVG */
  var line = d3.line()
  .curve(d3.curveMonotoneX)
    .x(d => xScale(d.date))
    .y(d => yScale(d.value));

  let lines = svg.append('g')
    .attr('class', 'lineholder');

  function drawLineGraph2 (data, kwcountry, attacksCountry, country) {
      // define domain x- and yscale
      xScale
      .domain(d3.extent(attacksCountry, function(d) { return d.iyear; }));

      yScale
      .clamp(true)
      // .domain([0, max])
      .domain([0, d3.max(kwcountry, function(d) { return Math.max(d.sum_nkill, d.sum_nwound); })])
      .nice();

      // draw lines
      lines.selectAll('.line-group')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'line-group')
        .on('mouseover', function(d, i) {
            svg.append('text')
              .attr('class', 'title-text')
              .style('fill', color[i])
              .style('opacity', 0.5)
              .text(tooltipText[i])
              .attr('text-anchor', 'middle')
              .attr('x', width / 2)
              .attr('y', 15);
          })
        .on('mouseout', function(d) {
            svg.select('.title-text').remove();
          })
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.values))
        .attr('id', function(d, i){ return d.type; })
        .style('stroke', (d, i) => color[i])
        .style('opacity', lineOpacity)
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
        .on('mouseout', function(d) {
            d3.selectAll('.line')
      					.style('opacity', lineOpacity);
            d3.selectAll('.circle')
      					.style('opacity', circleOpacity);
            d3.select(this)
              .style('stroke-width', lineStroke)
              .style('cursor', 'none');
          });


      // add circles to each line
      lines.selectAll('circle-group')
        .data(data).enter()
        .append('g')
        .attr('class', 'circle-group')
        .style('fill', (d, i) => color[i])
        .selectAll('circle')
        .data(d => d.values).enter()
        .append('g')
        .attr('class', 'circle')
        .on('mouseover', function(d) {
            d3.select(this)
              .style('cursor', 'pointer')
              .append('text')
              .attr('class', 'text')
              .text(`${d.value}`)
              .attr('x', d => xScale(d.date) + 5)
              .attr('y', d => yScale(d.value) - 10);
          })
        .on('mouseout', function(d) {
            d3.select(this)
              .style('cursor', 'none')
              .transition()
              .duration(duration)
              .selectAll('.text').remove();
          })
        .append('circle')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.value))
        .attr('r', circleRadius)
        .style('opacity', circleOpacity)
        .on('mouseover', function(d) {
              d3.select(this)
                .transition()
                .duration(duration)
                .attr('r', circleRadiusHover);
            })
          .on('mouseout', function(d) {
              d3.select(this)
                .transition()
                .duration(duration)
                .attr('r', circleRadius);
            })
            .on('mousedown', function(d, i) {
              window.year = d.date
              showDonut(window.variable, window.currentCountry, window.year, 1)
              // drawSlider(attacks, dataMap, data, window.currentCountry, window.year)
              // showHeatMap(attacks, dataMap, data, window.currentCountry, window.year)
              document.getElementById('currentYear').textContent = window.year;
              console.log(d.date)
            });

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

      svg.append('g')
        .attr('class', 'y axis')
        .transition()
        .duration(1000)
        .call(yAxis);

        // add axis labels
          svg.append('g').append('text')
          .attr('class', 'axis-label')
          .attr('y', height + 30)
          .attr('x', width / 2)
          .attr('fill', 'black')
          .attr('text-anchor', 'middle')
          .text('Year');

          svg.append('g')
          .append('text')
          .attr('class', 'axis-label')
          .attr('y', - 40)
          .attr('x', - height / 2)
          .attr('fill', 'black')
          .attr('transform', 'rotate(-90)')
          .attr('text-anchor', 'middle')
          .text('Number of (non)fatalities')

      // add title
      svg.append('g')
      .append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', -30)
      .style('text-anchor', 'middle')
      .text('Incidence, fatality and injury from terrorist attacks ')

      svg.append('g')
      .append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', -10)
      .style('text-anchor', 'middle')
      .text('in ' + country)
  }

  function drawLegend(){

    // draw legend for line graph
   var legend = svg.selectAll('.legend')
       .data(kw)
       .enter().append('g')
       .attr('class', 'legend')
       .attr('transform', function(d, i) { if (i == 0) { return 'translate(70,20)'; }
                                          else if (i == 1){ return 'translate(' + i * 150 + ',20)'; }
                                          else { return 'translate(' + i * 140 + ',20)';} });

       // draw legend rects with 3 colors
       legend.append('rect')
         .attr('x', width / 6)
         .attr('y', height + 15)
         .attr('width', 18)
         .attr('height', 18)
         .style('fill', function(d, i) { return color[i] })
         .on('mouseover', function(d, i){
              d3.selectAll('.line')
        					.style('opacity', otherLinesOpacityHover);
              d3.selectAll('.circle')
        					.style('opacity', circleOpacityOnLineHover);
                  d3.select('#' + d.type)
                     .style('opacity', lineOpacityHover)
                     .style('stroke-width', lineStrokeHover)
                     .style('cursor', 'pointer');
            d3.select(this)
              .style('stroke', 'white')
              .style('stroke-width', lineStrokeHover)
              .style('cursor', 'pointer');
         })
         .on('mouseout', function(d) {
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

         // add text to legend
         legend.append('text')
           .attr('x', width / 6 + 20)
           .attr('y', height + 30)
           .text(function(d, i){ return tooltipText[i]; })
          .attr('font-family', 'sans-serif')
          .attr('font-size', '14px')
  }

  function updateGraph2 (data, kwcountry, country) {
    svg.selectAll('.line').remove();
    svg.selectAll('.circle').remove();
    svg.selectAll('.text').remove();

      xScale
      .domain(d3.extent(kwcountry, function(d) { return d.iyear; }));


      yScale
      .clamp(true)
      .domain([0, d3.max(kwcountry, function(d) { return Math.max(d.sum_nkill, d.sum_nwound); })])
      .nice();

      var state = lines.selectAll('.line-group')
        .data(data);

        // console.log(d3.selectAll('.test-group'));

      state.enter()
      .append('g')
      .merge(state)
      .attr('class', 'line-group');

      var lineupdates = d3
      .select('.line-group')
      .selectAll('.line')
      .data(data);

      lineupdates.enter()
      .append('path')
      .merge(lineupdates)
      .attr('class', 'line');

      d3.selectAll('.line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => color[i])
      .style('opacity', lineOpacity)
      .on('mouseover', function(d, i) {
        svg.append('text')
          .attr('class', 'title-text')
          .style('fill', color[i])
          .text(tooltipText[i])
          .attr('text-anchor', 'middle')
          .attr('x', (width) / 2)
          .attr('y', 5);
          d3.selectAll('.line')
              .style('opacity', otherLinesOpacityHover);
          d3.selectAll('.circle')
              .style('opacity', circleOpacityOnLineHover);
          d3.select(this)
            .style('opacity', lineOpacityHover)
            .style('stroke-width', lineStrokeHover)
            .style('cursor', 'pointer');
        })
      .on('mouseout', function(d) {
        svg.select('.title-text').remove();
          d3.selectAll('.line')
              .style('opacity', lineOpacity);
          d3.selectAll('.circle')
              .style('opacity', circleOpacity);
          d3.select(this)
            .style('stroke-width', lineStroke)
            .style('cursor', 'none');
        })
        .transition()
        .duration(1000);

      state.exit().remove();
      lineupdates.exit().remove();

        var circle = d3.selectAll('.test-group')
          .data(data);

        circle.enter()
        // .append('g')
        .style('fill', (d, i) => color[i])
        .merge(circle)
        .attr('class', 'test-group');


        var circleupdates = d3.selectAll('.test-group').selectAll('.circle')
        .data(d => d.values);

        // circleupdates.enter()
        // .append('circle')
        // // .merge(circleupdates)
        // .attr('class', 'circle');

        d3.selectAll('.circle')
        .on('mouseover', function(d) {
            d3.select(this)
              .style('cursor', 'pointer')
              .append('text')
              .attr('class', 'text')
              .text(`${d.value}`)
              .attr('x', d => xScale(d.date) + 5)
              .attr('y', d => yScale(d.value) - 10);
          })
        .on('mouseout', function(d) {
            d3.select(this)
              .style('cursor', 'none')
              .transition()
              .duration(duration)
              .selectAll('.text').remove();
          })



          // .append('circle')
          // // .merge(circleupdates)
          // .attr('class', 'circle');
          circleupdates.enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.value))
        .attr('r', circleRadius)
        .style('opacity', circleOpacity)
        .on('mouseover', function(d) {
              d3.select(this)
                .transition()
                .duration(duration)
                .attr('r', circleRadiusHover);
            })
          .on('mouseout', function(d) {
              d3.select(this)
                .transition()
                .duration(duration)
                .attr('r', circleRadius);
            });

            circle.exit().remove()
            circleupdates.exit().remove()


        // remove axes and title
        svg.selectAll('.axis').remove();
        svg.selectAll('.title').remove();

        svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

      svg.append('g')
        .transition()
        .duration(duration)
        .attr('class', 'y axis')
        .call(yAxis);

          // add title
      svg.append('g')
      .append('text')
      .attr('class', 'title')
      .attr('x', margin.left)
      .attr('y', -10)
      .text('Number of fatalities and non-fatal injuries from terrorist attacks in ' + country)

  }
    if (kwcountry.length != 0) {
      drawLineGraph2(kw, kwcountry, attacksCountry, country)
      drawLegend()
    } else {
      svg.append('g')
      .append('text')
      .attr('class', 'no-data')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .text('No data available for ' + window.currentCountry)
    }

  }



function makeDict (data, data2, country) {
  var dict = []
  var kills = []
  var wounded = []
  var kwcountry = []
  var country2;
  data.forEach(function(d) { if (d.country_txt == country) { kwcountry.push(d); }})
  kwcountry.forEach(function(d) {
      country2 = d.country_txt
      kills.push({date: d.iyear, value: d.sum_nkill})
      wounded.push({date: d.iyear, value: d.sum_nwound})
  });
    dict.push({
    country: country2,
    type: 'kills',
    values: kills
  });
  dict.push({
    country: country2,
    type: 'wounded',
    values: wounded
  });
  var attacksList = []
  var valuesList = []
  data2.forEach(function(d){
    if (d.country_txt == country) { attacksList.push(d); }
  })
  attacksList.forEach(function(d) {
      country2 = d.country_txt
      valuesList.push({date: d.iyear, value: d.count})
  });
  dict.push({
    country: country2,
    type: 'attacks',
    values: valuesList
  })
  return [dict, kwcountry, attacksList];
  }
