window.onload = function onload() {
  var scroll = $(window).scrollTop();
  				scroll= scroll+ 100;
  				$('html, body').animate({
  					scrollTop: scroll
  				}, 2500);
}

$('#countries a').click(function(){
    $('#selected').text($(this).text());
  });

$('#variables a').click(function(){
    $('#selected2').text($(this).text());
  });
