var text = "";

function showDonut (data, country, year, bool) {

  if (bool === 1) {
    d3.select("#donutchart").remove();
  }

    var margin_D = {top: 5, right: 5, bottom: 5, left: 5},
        width_D = 400 - margin_D.left - margin_D.right,
        height_D = 400 - margin_D.top - margin_D.bottom;
      var thickness = 50;
      var duration_D = 750;
      var radius = Math.min(width_D, height_D) / 2;
      var color_D = d3.scaleOrdinal(d3.schemeSet3);

      var svg2 = d3.select("#donut")
                   .append("svg")
                   // .attr("id", function() { if (/\s/.test(country)) {
                  //       return country.replace(/\s/g,''); } else { return country; }})
                   .attr("id", "donutchart")
                   .attr("class", "pie")
                   .attr("viewBox", [0, 0, (width_D + margin_D.right + margin_D.left),
                                 (height_D + margin_D.top + margin_D.bottom)].join(' '));

       var g = svg2.append("g")
               .attr("transform", "translate(" + (width_D/2) + "," + (height_D/2) + ")");


    function drawDonut (data, events, country) {

      if (typeof events === 'string') {
        g.append("text")
        .attr("class", "country-text")
        .text(events)
        .attr("text-anchor", "middle")
        .attr("dy", "1em");
      }

      var arc = d3.arc()
                  .innerRadius(radius - thickness)
                  .outerRadius(radius);

      var pie = d3.pie()
                  .value(function(d) { if (d.country_txt == country) {
                    return (d.percentage); }})
                  .sort(null);

      // d3.select('#inds')
      //     .on("change", function () {
      //       var sect = document.getElementById("inds");
      //       var section = sect.options[sect.selectedIndex].value;
      //       newData = getData(data, section, year)
      //
      //       //debugger
      //       updateDonut(newData, section, year);
      //
      //       jQuery('h1.page-header').html(section);
      //     });

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
        .style("fill", color_D(this._current))
        .select(".text-group").remove();

      })
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color_D(i))
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
    .attr("dy", "-2em");

    g.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .text(text);

    }

    events = getData(data, country, year)

    drawDonut(data, events, country)

    function updateDonut (data, country, year) {
      // d3.select("#donutchart").remove()

          var arc = d3.arc()
                      .innerRadius(radius - thickness)
                      .outerRadius(radius);

          var pie = d3.pie()
                      .value(function(d) { if (d.country_txt == country) {
                        return (d.percentage); }})
                      .sort(null);

          var g_arcs = g.selectAll("g")
                      .data(pie(data));

          g_arcs.enter()
          .append("g")
          .merge(g_arcs)
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
          .style("fill", color_D(this._current))
          .select(".text-group").remove();

          })
          .append("path")
          .attr("d", arc)
          .attr("fill", (d, i) => color_D(i))
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

          g_arcs.exit().remove()
          d3.select(".country-text").remove()
          d3.select(".text-group").remove()

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
}

function getData (data, country, year) {
  values = Object.values(data)
  events = []
  values.forEach(function(d) {
    if (d.iyear == year && d.country_txt == country) { events.push(d) }});

  events.sort(function(a, b) { return a.percentage - b.percentage})
  if (events.length === 0) {
    return "No data available for"
  }
  return events;
}
