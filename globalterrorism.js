window.onload = function() {

  input = "data/globalterrorism.json"
  var requests = [d3.json(input)];

  Promise.all(requests).then(function(response) {
      globterr = response[0]
      keys = Object.keys(globterr)
      // console.log(keys)
      values = Object.values(globterr)
      // console.log(values)
      // keys.forEach(function(d){
      //   console.log("hoi")
      //   // console.log(globterr[d]["iyear"])
      // })
      for (key in globterr) {
        columns = []
        events = globterr[key]
        for (column in events) {
          columns.push(column)
        }
      }
      console.log(columns)
  }).catch(function(e){
      throw(e);
  });
};