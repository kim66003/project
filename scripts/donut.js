function showDonut (data, country, year, bool) {

  if (bool === 1) {
    d3.select("#donutchart").remove();
  }

  // d3.selectAll('#countries a')
  //     .on("click", function () {
  //       section = this.getAttribute("value")
  //
  //       window.currentCountry = section
  //       console.log(window.currentCountry)
  //       document.getElementById('currentCountry').textContent = window.currentCountry;
  //
  //
  //       // showDonut(group, section, window.year, 1)
  //
  //       // showLineGraph(kw, section)
  //       events = getData(data, window.currentCountry, window.year)
  //       // updateDonut(events, window.currentCountry, window.year)
  //       updateTest(data, events, window.currentCountry)
  //
  //     });

      window.margin_D = {top: 5, right: 5, bottom: 5, left: 5},
          window.width_D = 400 - margin_D.left - margin_D.right,
          window.height_D = 400 - margin_D.top - margin_D.bottom;
      window.thickness = 50;
      window.duration_D = 750;
      window.radius = Math.min(width_D, height_D) / 2;
      window.color_D = d3.scaleOrdinal(d3.schemeSet3);

      window.svg2 = d3.select("#donut")
                   .append("svg")
                   // .attr("id", function() { if (/\s/.test(country)) {
                  //       return country.replace(/\s/g,''); } else { return country; }})
                   .attr("id", "donutchart")
                   .attr("class", "pie")
                   .attr("viewBox", [0, 0, (window.width_D + window.margin_D.right + window.margin_D.left),
                                 (window.height_D + window.margin_D.top + window.margin_D.bottom)].join(' '));

       window.g_D = window.svg2.append("g")
               .attr("transform", "translate(" + (window.width_D/2) + "," + (window.height_D/2) + ")");

      window.text = "";

    events = getData(data, country, year)
    drawDonut(data, events, country)
}

function drawDonut (data, events, country) {

  if (typeof events === 'string') {
    window.g_D.append("text")
    .attr("class", "country-text")
    .text(events)
    .attr("text-anchor", "middle")
    .attr("dy", "1em");

    window.g_D.append("text")
    .attr("class", "country-text")
    .text(" for " + window.currentCountry)
    .attr("text-anchor", "middle")
    .attr("dy", "2em");

    return;
  }
    keys = Object.keys(events[0])

    donutDict = []
    events.forEach(function(d){
      if (keys.includes("attacktype1_txt")) {
        var arcName = d.attacktype1_txt
      } else if (keys.includes("gname")) {
        var arcName = d.gname
      } else if (keys.includes("targtype1_txt")) {
        var arcName = d.targtype1_txt
      } else if (keys.includes("weaptype1_txt")) {
        var arcName = d.weaptype1_txt
      }
      donutDict.push({
        iyear: d.iyear,
        country_txt: d.country_txt,
        varname: arcName,
        frequency: d.frequency,
        percentage: d.percentage
      })
    })

  var arc = d3.arc()
              .innerRadius(window.radius - window.thickness)
              .outerRadius(window.radius)
              .cornerRadius(3)
              .padAngle(0.015);

  var pie = d3.pie()
              .value(function(d) { if (d.country_txt == country) {
                return (d.percentage); }})
              .sort(null);

  var path = window.g_D.selectAll("path")
              .data(pie(donutDict))
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
      .text(`${d.data.varname}`)
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
    .style("fill", window.color_D(this._current))
    .select(".text-group").remove();

  })
.append("path")
.attr("d", arc)
.attr("fill", (d, i) => window.color_D(i))
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

window.g_D.append("text")
.attr("class", "country-text")
.text(country)
.attr("text-anchor", "middle")
.attr("dy", "-2em");

window.g_D.append("text")
.attr("text-anchor", "middle")
.attr("dy", ".35em")
.text(window.text);

}

function updateDonut(events, country) {
  if (typeof events === 'string') {
    window.g_D.append("text")
    .attr("class", "country-text")
    .text(events)
    .attr("text-anchor", "middle")
    .attr("dy", "1em");
  }

  var arc = d3.arc()
              .innerRadius(window.radius - window.thickness)
              .outerRadius(window.radius);

  var pie = d3.pie()
              .value(function(d) { if (d.country_txt == country) {
                return (d.percentage); }})
              .sort(null);

  var path = window.g_D.selectAll("path")
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
      .text(`${d.data.gname}`+" group")
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
    .style("fill", window.color_D(this._current))
    .select(".text-group").remove();

  })
.append("path")
.attr("d", arc)
.attr("fill", (d, i) => window.color_D(i))
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

window.g_D.append("text")
.attr("class", "country-text")
.text(country)
.attr("text-anchor", "middle")
.attr("dy", "-2em");

window.g_D.append("text")
.attr("text-anchor", "middle")
.attr("dy", ".35em")
.text(window.text);

}



function updateTest (data, events, country) {
  var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto
  var arc = d3.arc()
              .innerRadius(window.radius - window.thickness)
              .outerRadius(window.radius)
              .startAngle(0);

  // Add the background arc, from 0 to 100% (tau).
  var background = g.append("path")
      .datum({endAngle: tau})
      .style("fill", "#ddd")
      .attr("d", arc);

      // Add the foreground arc in orange, currently showing 12.7%.
      var foreground = g.append("path")
          .datum({endAngle: 0.127 * tau})
          .style("fill", "orange")
          .attr("d", arc);

          // Every so often, start a transition to a new random angle. The attrTween
          // definition is encapsulated in a separate function (a closure) below.
          // d3.interval(function() {
          //   foreground.transition()
          //       .duration(750)
          //       .attrTween("d", arcTween(Math.random() * tau));
          // }, 1500);

  var pie = d3.pie()
              .value(function(d) { if (d.country_txt == country) {
                return (d.percentage); }})
              .sort(null);

              var u = window.g_D.selectAll('path')
            .data(pie(events));

          u.enter()
            .append('g')
            .append("path")
            .attrTween("d", function(d) { arcTween(d)})
            .attr("fill", (d, i) => color_D(i))
            .on("mouseover", function(d) {

  let g = d3.select(this)
    .style("cursor", "pointer")
    .style("fill", "pink")
    .append("g")
    .attr("class", "text-group");

  g.append("text")
    .attr("class", "name-text")
    .text(`${d.data.gname}`+" group")
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
  .style("fill", color_D(this._current))
  .select(".text-group").remove();

})
            .merge(u)
            .transition()
            .duration(50000)
            .text(function(d) {
              return d;
            });

          u.exit().remove();
}



function getData (data, country, year) {
  values = Object.values(data)
  events = []
  values.forEach(function(d) {
    if (d.iyear == year && d.country_txt == country) { events.push(d) }});

  events.sort(function(a, b) { return a.percentage - b.percentage})
  if (events.length === 0) {
    return "No data available"
  }
  return events;
}

function arcTween(newAngle) {
  var arc = d3.arc()
              .innerRadius(window.radius - window.thickness)
              .outerRadius(window.radius)
              .startAngle(0);
  return function(d) {

    var interpolate = d3.interpolate(d.endAngle, newAngle);

    return function(t) {

      d.endAngle = interpolate(t);

      return arc(d);
    };
  };
}
