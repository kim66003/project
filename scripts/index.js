/* Javascript helpers file for index page
   Name: Kimberley Boersma
   Student no.: 11003464 */

// Scroll index page down onload
window.onload = function onload() {
  var scroll = $(window).scrollTop();
  				scroll= scroll+ 100;
  				$('html, body').animate({
  					scrollTop: scroll
  				}, 2500);
}
