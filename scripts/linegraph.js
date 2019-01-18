function showLineGraph () {

  var input = "../data/killsandwound.json"
  var requests = [d3.json(input)];

  Promise.all(requests).then(function(response) {
      kw = response[0]
      kw = Object.values(kw)

      // trigger render
      data = makeDict(kw, "Iraq")
      kwcountry = data[1]
      data = data[0]
      drawLineGraph(kw, data, kwcountry, "Iraq")

  }).catch(function(e){
      throw(e);
  });

}

function drawLineGraph(origData, data, kwcountry, country) {

  var margin = {top: 30, right: 20, bottom: 50, left: 60},
      width = 700 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  var duration = 250;

  var lineOpacity = "0.25";
  var lineOpacityHover = "0.85";
  var otherLinesOpacityHover = "0.1";
  var lineStroke = "1.5px";
  var lineStrokeHover = "2.5px";

  var circleOpacity = '0.85';
  var circleOpacityOnLineHover = "0.25"
  var circleRadius = 3;
  var circleRadiusHover = 6;

  /* Scale */

  var xScale = d3.scaleLinear()
                  .range([0, width])
    .domain(d3.extent(kwcountry, function(d) { return d.iyear; }));


  var yScale = d3.scaleLinear()
                  .range([height, 0])
                  .clamp(true)
    .domain([0, d3.max(kwcountry, function(d) { return Math.max(d.sum_nkill, d.sum_wound); })])
    .nice();

  /* Add Axis into SVG */
  var xAxis = d3.axisBottom(xScale)
                .tickFormat(function(d){ return d })
                .ticks(18);
  var yAxis = d3.axisLeft(yScale);

  var color = ["#583aa5", "#a57e3a", "#87a53a", "#a53a87"];

  /* Add SVG */
    var svg = d3.select("#line").append("svg")
                .attr("id", function() { if (/\s/.test(country)) {
                      return country.replace(/\s/g,''); } else { return country; }})
                .attr("viewBox", [0, 0, (width + margin.right + margin.left),
                (height + margin.top + margin.bottom)].join(' '))
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.select('#inds')
    			.on("change", function () {
    				var sect = document.getElementById("inds");
    				var section = sect.options[sect.selectedIndex].value;
            newData = makeDict(origData, section)
            newDataCountry = newData[1]
            newData = newData[0]

    		    //debugger
    				updateGraph(origData, newData, newDataCountry, country, section);

    				jQuery('h1.page-header').html(section);
    			});

    tooltipText = ["Fatalities", "Non-fatal injuries"]

  /* Add line into SVG */
  var line = d3.line()
    .curve(d3.curveMonotoneX)
    .x(d => xScale(d.date))
    .y(d => yScale(d.nkw));

  let lines = svg.append('g')
    .attr('class', 'lines');

  lines.selectAll('.line-group')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'line-group')
    .on("mouseover", function(d, i) {
        svg.append("text")
          .attr("class", "title-text")
          .style("fill", color[i])
          .text(tooltipText[i])
          .attr("text-anchor", "middle")
          .attr("x", (width) / 2)
          .attr("y", 5);
      })
    .on("mouseout", function(d) {
        svg.select(".title-text").remove();
      })
    .append('path')
    .attr('class', 'line')
    .attr('d', d => line(d.values))
    .style('stroke', (d, i) => color[i])
    .style('opacity', lineOpacity)
    .on("mouseover", function(d) {
        d3.selectAll('.line')
  					.style('opacity', otherLinesOpacityHover);
        d3.selectAll('.circle')
  					.style('opacity', circleOpacityOnLineHover);
        d3.select(this)
          .style('opacity', lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
    .on("mouseout", function(d) {
        d3.selectAll(".line")
  					.style('opacity', lineOpacity);
        d3.selectAll('.circle')
  					.style('opacity', circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });


  /* Add circles in the line */
  lines.selectAll("circle-group")
    .data(data).enter()
    .append("g")
    .style("fill", (d, i) => color[i])
    .selectAll("circle")
    .data(d => d.values).enter()
    .append("g")
    .attr("class", "circle")
    .on("mouseover", function(d) {
        d3.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.nkw}`)
          .attr("x", d => xScale(d.date) + 5)
          .attr("y", d => yScale(d.nkw) - 10);
      })
    .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")
          .transition()
          .duration(duration)
          .selectAll(".text").remove();
      })
    .append("circle")
    .attr("cx", d => xScale(d.date))
    .attr("cy", d => yScale(d.nkw))
    .attr("r", circleRadius)
    .style('opacity', circleOpacity)
    .on("mouseover", function(d) {
          d3.select(this)
            .transition()
            .duration(duration)
            .attr("r", circleRadiusHover);
        })
      .on("mouseout", function(d) {
          d3.select(this)
            .transition()
            .duration(duration)
            .attr("r", circleRadius);
        });

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

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

function updateGraph (origData, data, kwcountry, oldcountry, country) {
    if (/\s/.test(oldcountry)) {
      oldcountry = oldcountry.replace(/\s/g,''); }

    d3.select("#" + oldcountry).remove();

    drawLineGraph(origData, data, kwcountry, country)

}

function makeDict (data, country) {
  var dict = []
  var kills = []
  var wounded = []
  var kwcountry = []
  var country2;
  data.forEach(function(d) { if (d.country_txt == country) { kwcountry.push(d); }})
  kwcountry.forEach(function(d) {
      country2 = d.country_txt
      kills.push({date: d.iyear, nkw: d.sum_nkill})
      wounded.push({date: d.iyear, nkw: d.sum_wound})
  });
    dict.push({
    country: country2,
    type: "kills",
    values: kills
  });
  dict.push({
    country: country2,
    type: "wounded",
    values: wounded
  });
  return [dict, kwcountry];
  }
