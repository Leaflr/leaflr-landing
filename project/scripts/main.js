$(document).ready(function(){
	$(window).scroll(function(){
	  parallax();
	});

	function parallax(){
	  var scrolled = $(window).scrollTop();
	  $('.hero').css('background-position-y', scrolled*0.15 + 'px');
	}

	var bigbrother = -1;

    $('.team section').each(function() {
      bigbrother = bigbrother > $('.team section').height() ? bigbrother : $('.team section').height();
    });

    $('.team section').each(function() {
      $('.team section').height(bigbrother);
    });
	
});



