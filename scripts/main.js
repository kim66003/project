/* Javascript main file that loads webpage
   Name: Kimberley Boersma
   Student no.: 11003464 */

window.onload = function() {

  // Import files
  var input = "../data/json/country.json"
  var input2 = "../data/json/world_countries.json"
  var input3 = "../data/json/group.json"
  var input4 = "../data/json/killsandwound.json"
  var input5 = "../data/json/attacktypes.json"
  var input6 = "../data/json/targettypes.json"
  var input7 = "../data/json/weapontypes.json"
  var input8 = "../data/world_attacks.tsv"

  var requests = [d3.json(input), d3.json(input2), d3.json(input3), d3.json(input4), d3.json(input5), d3.json(input6), d3.json(input7), d3.tsv(input8)]

  // Load requests first
  Promise.all(requests).then(function(response) {
      // Save response in variables
      var attacks = response[0]
      var world_countries = response[1]
      var group = response[2]
      var kw = response[3]
      var attacktype = response[4]
      var targets = response[5]
      var weapons = response[6]
      window.countryID = response[7]

      // Set country, year and variable to load initial page
      window.currentCountry = "Iraq";
      window.year = 2000;
      window.variable = group;
      window.start = true;

      // Draw worldmap
      showHeatMap(attacks, world_countries, kw, window.currentCountry, window.year)

      // Update visualisations onclick dropdowns
      countryDrop(group, kw, attacks, world_countries)
      catDrop(group, attacktype, targets, weapons, kw, attacks, world_countries)

  }).catch(function(e){
      throw(e);
  });

};
