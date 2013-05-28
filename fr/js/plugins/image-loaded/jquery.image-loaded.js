// JavaScript Document

jQuery(document).ready(function($){
	$.fn.imageLoaded = function( callback ){
		var $this = this[0];

		var timer  = setInterval(function(){
			if($this.complete == true) {
				clearInterval(timer);
				callback.call($this);
			}
		},200);

		return $this;
	};



});


function preloadImages() {

	var $my_images = $('.item-blog img, .work img, .img-frame img, .shad_dark img, .alignleft-f img');
	$my_images.wrap('<div class="loading-image" />').css({'opacity':'0','visibility':'visible'});

	$my_images.each( function() {
		$(this).imageLoaded(function(){

			$(this).animate({'opacity':'1'}, 500, function(){
				$(this)
			});

		});
	});

};