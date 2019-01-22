window.onload = function() {

  var input = "../data/country.json"
  var input2 = "../data/world_countries.json"
  var input3 = "../data/group.json"
  var input4 = "../data/killsandwound.json"

  var requests = [d3.json(input), d3.json(input2), d3.json(input3), d3.json(input4)]

  Promise.all(requests).then(function(response) {
      var attacks = response[0]
      var world_countries = response[1]
      var group = response[2]
      var kw = response[3]

      country = "Iraq"
      year = 2005

      // load javascripts here
      showHeatMap(attacks, world_countries, group, kw, country, year)
      showDonut(group, country, year)
      showLineGraph(kw, country)
      // showLineGraph(kw, "Syria")

  }).catch(function(e){
      throw(e);
  });

};
