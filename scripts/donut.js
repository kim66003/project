function showDonut (data, country, year, bool) {

  if (bool === 1) {
    d3.select('#donutchart').remove();
  }

      window.margin_D = {top: 5, right: 5, bottom: 5, left: 5},
          window.width_D = 500 - margin_D.left - margin_D.right,
          window.height_D = 500 - margin_D.top - margin_D.bottom;
      window.thickness = 50;
      window.duration_D = 750;
      window.radius = Math.min(width_D, height_D) / 2;
      window.color_D = d3.scaleOrdinal(d3.schemeSet3);

      window.svg2 = d3.select('#donut')
                   .append('svg')
                   .attr('id', 'donutchart')
                   .attr('class', 'pie')
                   .attr('viewBox', [0, 0, (window.width_D + window.margin_D.right + window.margin_D.left),
                                 (window.height_D + window.margin_D.top + window.margin_D.bottom)].join(' '));

       window.g_D = window.svg2.append('g')
               .attr('transform', 'translate(' + (window.width_D/2) + ',' + (window.height_D/2) + ')');

      window.text = '';

    events = getData(data, country, year)
    drawDonut(data, events, country)
}

function drawDonut (data, events, country) {

  var countryAbv = getAbv(window.currentCountry)

  if (typeof events === 'string') {
    window.g_D.append('text')
    .attr('class', 'no-data')
    .text(events)
    .attr('text-anchor', 'middle')
    .attr('dy', '1em');

    window.g_D.append('text')
    .attr('class', 'no-data')
    .text(' for ' + countryAbv)
    .attr('text-anchor', 'middle')
    .attr('dy', '2em');

    return;
  }
    keys = Object.keys(events[0])

    donutDict = []
    events.forEach(function(d){
      if (keys.includes('attacktype1_txt')) {
        var arcName = d.attacktype1_txt
      } else if (keys.includes('gname')) {
        var arcName = d.gname
      } else if (keys.includes('targtype1_txt')) {
        var arcName = d.targtype1_txt
      } else if (keys.includes('weaptype1_txt')) {
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
              .padAngle(0.0015);

  var pie = d3.pie()
              .value(function(d) { if (d.country_txt == country) {
                return (d.percentage); }})
              .sort(null);

  var path = window.g_D.selectAll('path')
              .data(pie(donutDict))
              .enter()
              .append('g')
              .on('mouseover', function(d) {

    let g = d3.select(this)
      .style('cursor', 'pointer')
      .style('fill', 'pink')
      .append('g')
      .attr('class', 'text-group');

    g.append('text')
      .attr('class', 'name-text')
      .text(`${d.data.varname}`)
      .attr('text-anchor', 'middle')
      .attr('dy', '-1.2em');

    g.append('text')
      .attr('class', 'value-text')
      .text(`${(d.data.percentage * 100).toFixed(2)}%`)
      .attr('text-anchor', 'middle')
      .attr('dy', '.6em');

  })
.on('mouseout', function(d) {
  d3.select(this)
    .style('cursor', 'none')
    .style('fill', window.color_D(this._current))
    .select('.text-group').remove();

  })
.append('path')
.attr('d', arc)
.attr('fill', (d, i) => window.color_D(i))
.on('mouseover', function(d) {
    d3.select(this)
      .style('cursor', 'pointer')
      .style('opacity', 0.5);
  })
.on('mouseout', function(d) {
    d3.select(this)
      .style('cursor', 'none')
      .style('opacity', 1.0);
  })
.each(function(d, i) { this._current = i; });

window.g_D.append('text')
.attr('class', 'country-text')
.text(countryAbv)
.attr('text-anchor', 'middle')
.attr('dy', '-1.5em');

window.g_D.append('text')
.attr('text-anchor', 'middle')
.attr('dy', '.35em')
.text(window.text);

}

function getData (data, country, year) {
  values = Object.values(data)
  events = []
  values.forEach(function(d) {
    if (d.iyear == year && d.country_txt == country) { events.push(d) }});

  events.sort(function(a, b) { return a.percentage - b.percentage})
  if (events.length === 0) {
    return 'No data available'
  }
  return events;
}

function getAbv(country) {
  var count = 0;
  var answer = null;
  window.countryID.forEach(function(d){
      if (d.name.includes(country)){
        for (i in country){
          if (country[i] == ' ') {
              count += 1; }
          if (count == 2 || count > 2) {
            answer = d.id;
            break; }
        }}});
  if (count < 2){
   answer = country; }
  return answer;
}
