// update donuts


function updateDonut2 (data, country, year) {
  // d3.select("#donutchart").remove()

      var arc = d3.arc()
                  .innerRadius(radius - thickness)
                  .outerRadius(radius);

      var pie = d3.pie()
                  .value(function(d) { if (d.country_txt == country) {
                    return (d.percentage); }})
                  .sort(null);

      var g_arcs = g_D.selectAll("g")
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

      g_D.append("text")
      .attr("class", "country-text")
      .text(country)
      .attr("text-anchor", "middle")
      .attr("dy", "3em");

      g_D.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .text(text);
}

// d3.selectAll('#countries a')
//     .on("click", function () {
//       section = this.getAttribute("value")
//       // origData = Object.values(kw)
//       // data = Object.values(group)
//       // newData = makeDict(origData, section)
//       // newDataCountry = newData[1]
//       // newData = newData[0]
//       //
//       // newDataDonut = getData(data, section, window.year)
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
//       jQuery('h1.page-header').html(section);
//     });
