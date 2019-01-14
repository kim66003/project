window.onload = function() {

  input = "../data/group.json"
  var requests = [d3.json(input)];

  Promise.all(requests).then(function(response) {
      group = response[0]


      donutChart(group, "United States")

  }).catch(function(e){
      throw(e);
  });

  function donutChart (data, country) {
    keys = Object.keys(data)
    events = []
    for (i in keys) {
      if (data[i].iyear == 2014) {
        events.push(data[i])

      }
    }

var text = "";

    var width = 450
    var height = 450
    var thickness = 50;
    var duration = 750;

    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeSet3);

    var svg = d3.select("#donut")
            .append("svg")
            .attr("class", "pie")
            .attr("width", width)
            .attr("height", height);

    var g = svg.append('g')
            .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

    var arc = d3.arc()
                .innerRadius(radius - thickness)
                .outerRadius(radius);

    var pie = d3.pie()
                .value(function(d) { if (d.country_txt == country) {
                  return (d.percentage); }})
                .sort(null);

    var path = g.selectAll('path')
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
        .attr('text-anchor', 'middle')
        .attr('dy', '-1.2em');

      g.append("text")
        .attr("class", "value-text")
        .text(`${(d.data.percentage * 100).toFixed(2)}%`)
        .attr('text-anchor', 'middle')
        .attr('dy', '.6em');
    })
  .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")
        .style("fill", color(this._current))
        .select(".text-group").remove();
    })
  .append('path')
  .attr('d', arc)
  .attr('fill', (d, i) => color(i))
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


g.append('text')
  .attr('text-anchor', 'middle')
  .attr('dy', '.35em')
  .text(text);
  }
};
