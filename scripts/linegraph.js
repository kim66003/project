function showLineGraph (data, attacks, country) {
  d3.select("#linegraph").remove();

  data = Object.values(data)
  // data2 = Object.values(data2)
  kw = makeDict(data, country)
  kwcountry = kw[1]
  kw = kw[0]
  // successData = makeDict2(data2)
  // console.log(successData)

  var margin = {top: 30, right: 20, bottom: 50, left: 60},
      width = 700 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  var duration = 500;

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
                  .range([0, width]);


  var yScale = d3.scaleLinear()
                  .range([height, 0]);

  /* Add Axis into SVG */
  var xAxis = d3.axisBottom(xScale)
                .tickFormat(function(d){ return d })
                .ticks(14);
  var yAxis = d3.axisLeft(yScale);

  /* Add SVG */
  var svg = d3.select("#line").append("svg")
              // .attr("id", function() { if (/\s/.test(country)) {
              //       return country.replace(/\s/g,''); } else { return country; }})
              .attr("id", "linegraph")
              .attr("viewBox", [0, 0, (width + margin.right + margin.left),
              (height + margin.top + margin.bottom)].join(' '))
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var color = ["#583aa5", "#a57e3a", "#87a53a", "#a53a87"];

  tooltipText = ["Fatalities", "Non-fatal injuries"]

  /* Add line into SVG */
  var line = d3.line()
  .curve(d3.curveMonotoneX)
    .x(d => xScale(d.date))
    .y(d => yScale(d.nkw));

  let lines = svg.append('g')
    .attr('class', 'lineholder');


  function drawLineGraph2 (origData, data, kwcountry, country) {

        // update graph on change
        // d3.selectAll('.dropdown-item')
        //     .on("click", function () {
        //       section = this.getAttribute("value")
        //       newData = makeDict(origData, section)
        //       newDataCountry = newData[1]
        //       newData = newData[0]
        //
        //       //debugger
        //       updateGraph2(origData, newData, newDataCountry, section);
        //
        //       jQuery('h1.page-header').html(section);
        //     });

      // define domain x- and yscale
      xScale
      .domain(d3.extent(kwcountry, function(d) { return d.iyear; }));

      yScale
      .clamp(true)
      .domain([0, d3.max(kwcountry, function(d) { return Math.max(d.sum_nkill, d.sum_nwound); })])
      .nice();

      // draw lines
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


      // add circles to each line
      lines.selectAll("circle-group")
        .data(data).enter()
        .append("g")
        .attr("class", "test-group")
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
            })
            .on("mousedown", function(d, i) {
              window.year = d.date
              console.log(d.date)
              showDonut(window.variable, window.currentCountry, window.year, 1)
              document.getElementById('currentYear').textContent = window.year;
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
      var lineAbv = getAbv(window.currentCountry)
          // add title
      svg.append("g")
      .append('text')
      .attr('class', 'title')
      .attr('x', margin.left)
      .attr('y', -10)
      .text("Number of fatalities and non-fatal injuries from terrorist attacks in " + lineAbv)

  }

  function updateGraph2 (origData, data, kwcountry, country) {
    svg.selectAll(".line").remove();
    svg.selectAll(".circle").remove();
    svg.selectAll(".text").remove();

      xScale
      .domain(d3.extent(kwcountry, function(d) { return d.iyear; }));


      yScale
      .clamp(true)
      .domain([0, d3.max(kwcountry, function(d) { return Math.max(d.sum_nkill, d.sum_nwound); })])
      .nice();

      var state = lines.selectAll('.line-group')
        .data(data);

        // console.log(d3.selectAll(".test-group"));

      state.enter()
      .append('g')
      .merge(state)
      .attr('class', 'line-group');

      var lineupdates = d3
      .select(".line-group")
      .selectAll(".line")
      .data(data);

      lineupdates.enter()
      .append('path')
      .merge(lineupdates)
      .attr('class', 'line');

      d3.selectAll(".line")
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => color[i])
      .style('opacity', lineOpacity)
      .on("mouseover", function(d, i) {
        svg.append("text")
          .attr("class", "title-text")
          .style("fill", color[i])
          .text(tooltipText[i])
          .attr("text-anchor", "middle")
          .attr("x", (width) / 2)
          .attr("y", 5);
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
        svg.select(".title-text").remove();
          d3.selectAll(".line")
              .style('opacity', lineOpacity);
          d3.selectAll('.circle')
              .style('opacity', circleOpacity);
          d3.select(this)
            .style("stroke-width", lineStroke)
            .style("cursor", "none");
        })
        .transition()
        .duration(1000);

      state.exit().remove();
      lineupdates.exit().remove();

        var circle = d3.selectAll(".test-group")
          .data(data);

        circle.enter()
        // .append('g')
        .style("fill", (d, i) => color[i])
        .merge(circle)
        .attr('class', 'test-group');


        var circleupdates = d3.selectAll(".test-group").selectAll(".circle")
        .data(d => d.values);

        // circleupdates.enter()
        // .append('circle')
        // // .merge(circleupdates)
        // .attr('class', 'circle');

        d3.selectAll(".circle")
        .on("mouseover", function(d) {
          console.log("hoi")
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



          // .append('circle')
          // // .merge(circleupdates)
          // .attr('class', 'circle');
          circleupdates.enter()
        .append("circle")
        .attr('class', "circle")
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

            circle.exit().remove()
            circleupdates.exit().remove()


        // remove axes and title
        svg.selectAll(".axis").remove();
        svg.selectAll(".title").remove();

        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

      svg.append("g")
        .transition()
        .duration(duration)
        .attr("class", "y axis")
        .call(yAxis);

          // add title
      svg.append("g")
      .append('text')
      .attr('class', 'title')
      .attr('x', margin.left)
      .attr('y', -10)
      .text("Number of fatalities and non-fatal injuries from terrorist attacks in " + country)

  }
  drawLineGraph2(data, kw, kwcountry, country)

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
      wounded.push({date: d.iyear, nkw: d.sum_nwound})
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

function makeDict2(data) {
  successList = []
  successList2 = []
  xyList = []
  xyList2 = []
  successDict = []
  data.forEach(function(d) {
    if (d.country_txt == window.currentCountry && d.success == 1) { successList.push(d); }
    else if (d.country_txt == window.currentCountry && d.success == 0) { successList2.push(d); } });
  successList.forEach(function(d) {
      country2 = d.country_txt
      xyList.push({date: d.iyear, success: d.frequency})
  });
  successList2.forEach(function(d) {
      country3 = d.country_txt
      xyList2.push({date: d.iyear, success: d.frequency})
  })
    successDict.push({
    country: country2,
    type: "success",
    values: xyList
  });
  successDict.push({
    country: country3,
    type: "fail",
    values: xyList2
  })
  return successDict;
}
