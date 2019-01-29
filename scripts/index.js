window.onload = function onload() {
  var scroll = $(window).scrollTop();
  				scroll= scroll+ 100;
  				$('html, body').animate({
  					scrollTop: scroll
  				}, 2500);
}
