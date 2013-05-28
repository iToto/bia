// JavaScript Document

/* Define iOS devices */
jQuery.extend(jQuery.browser,
	{SafariMobile : navigator.userAgent.toLowerCase().match(/iP(hone|ad)/i) }
);

/* Basic functions: begin */
/* ---------------------------------------------------------------------------------------- */

/* Scrolling in content area: begin */
	//Init
	function initScroll1() {
		$(".scroll-pane").jScrollPane({
			contentWidth : 1010,
			verticalGutter : 0,
			verticalDragMinHeight : 42,
			verticalDragMaxHeight : 462,
			autoReinitialise: true,
			autoReinitialiseDelay: 1000
		});
	}
	//Refresh
	function refreshScroll1() {
		var jspApi = $(".scroll-pane").data('jsp');
		jspApi.reinitialise();
	}
/* Scrolling in content area: end */

/* Scrolling in highslide window: begin */
	//Init
	function initScroll2() {
		$(".scroll-pane-2").jScrollPane({
			contentWidth : 740,
			verticalGutter : 0,
			verticalDragMinHeight : 42,
			verticalDragMaxHeight : 462,
			autoReinitialise: true,
			autoReinitialiseDelay: 1000
		});
	}

	//Refresh
	function refreshScroll2() {
		var jspApi = $(".scroll-pane-2").data('jsp');
		jspApi.reinitialise();
	}
/* Scrolling in highslide window: end */

/* Service tooltips (tags, categories, social links, etc.): begin */
	function initTooltips() {
		$('.ico-l').each(function () {
			var $tip = $('> .info-block', this);
			var $span = $('> span', this);
			if (!$span.length) {
				var $span = $('> a', this);
			};
			var $old_html = $tip.html();
			var $new_html = '<div class="box-i-l"><div class="box-i-r"><span class="box-i">' + $tip.html() + '</span></div></div>';
			$(this).hover(function () {
				$span.addClass('act');
				$tip.html($new_html);			
				if ($.browser.msie && $.browser.version < 9) {
					$tip.show();
				} else {
					$tip.css('display', 'none');
					$tip.stop().fadeTo(250, 1);}
			}, function () {
				$span.removeClass('act');
				if ($.browser.msie && $.browser.version < 9) {
					$tip.hide();
					$tip.html($old_html);
				} else {
					$tip.css('display', 'block');
					$tip.stop().fadeTo(150, 0, function() {$tip.css('display', 'none'); $tip.html($old_html);});
				}
			});
		});
	}
/* Service tooltips (tags, categories, social links, etc.): end */

/* Skitter slider: begin */
	function initSkitter() {
		// Slider images border
		$(".box_skitter_large").each(function () {
			var img = $(this).find('img');
			/*var im_h = $('.box_skitter_large').height()-4;
			var im_w = $('.box_skitter_large').width()-4;*/
			var im_h = img.attr('height');
			var im_w = img.attr('width');
			$(this).css({
				width:im_w,
				height:im_h
			})
			$('.desc', this).css({
				width:im_w-74
			})
			$(this).append('<span class="border"></span>');
			$('span.border', this).css({'width': im_w-4, 'height': im_h-4, opacity: 0.3});
		});
	
		$(".box_skitter_small").each(function () {
			var img = $(this).find('img');
			/*var im_h = $('.box_skitter_large').height()-4;
			var im_w = $('.box_skitter_large').width()-4;*/
			var im_h = img.attr('height');
			var im_w = img.attr('width');
			$(this).css({
				width:im_w,
				height:im_h
			})
		/*	var ims_h = $('.box_skitter_small').height()-4;
			var ims_w = $('.box_skitter_small').width()-4;*/
			$(this).append('<span class="border"></span>');
			$('span.border', this).css({'width': im_w-4, 'height': im_h-4, opacity: 0.3});
		});
		
		// Skitter inint
		var options1 = {};
		$('.box_skitter_large').skitter(options1);		
	
		var options2 = {};
		$('.box_skitter_small').skitter(options2);
	}
/* Skitter slider: end */

/* Portfolio scroll initialize: begin */
	function inintSmoothDivScroll() {
		$("#makeMeScrollable").smoothDivScroll("option","destroy");
		$("#makeMeScrollable").smoothDivScroll({ 
			mousewheelScrolling: true,
			manualContinuousScrolling: false,
			autoScrollingMode: "",
			visibleHotSpotBackgrounds: "always"
		});
	}
/* Portfolio scroll initialize: end */

/* Adds inside-border to images: begin */
	function initBorders(){
		$(".img-frame, ul#thumb-list li, .shad_dark, .avatar, .work, .gallery-item a").each(function () {
			var img = $(this).find('img');
			var img_h = img.attr('height')-4;
			var img_w = img.attr('width')-4;
			$(this).append('<span class="border"></span>');
			$('span.border', this).css({'width': img_w, 'height': img_h, opacity: 0.3});
			
		});
	
	}
/* Adds inside-border to images: end */

/* Borders and hovers on images (portfolio, blog, etc.): begin */
	function initHovers() {
	/* Portfolio info hover: begin */
		$('.pholio-info').hide();		
		$(".work").hover(function () {										 
			  $(this).children('.pholio-info').stop().css({visibility: "visible",display: "none"}).fadeIn(1000);
		  }, function () {
			  $('.pholio-info', this).stop().css({visibility: "hidden"}).fadeOut(1000);
		  });
		$(".work").each(function(){
			var img = $(this).find('img');
			var img_w = img.attr('width');
			var img_h = img.attr('height');
			$('.pholio-info', this).css({
				width:img_w-40,
				height:img_h
			});
		});
	/* Portfolio info hover: end */
	
	/* Hover animate link and zoom: begin */
		$('.item-blog div.img-frame, .work').hover(function(){
			$(this).find('a.zoom').animate({
				top: "0",
				right: "0"
			},{queue:false,duration:500});
		}, function(){
			$(this).find('a.zoom').animate({
				top: "-61",
				right: "-61"
			},{queue:false,duration:500});
		});
	
		$('.item-blog div.img-frame, .work').hover(function(){
			$(this).find('a.link').animate({
				bottom: "0",
				left: "0"
			},{queue:false,duration:500});
		}, function(){
			$(this).find('a.link').animate({
				bottom: "-61",
				left: "-61"
			},{queue:false,duration:500});
		});
	/* Hover animate link and zoom: end */
	
	/* Fade hover effect: begin */
		$('div.img-frame, .work').append('<i></i>').each(function () {
		  var $span = $('> i', this);
		 if ($.browser.msie && $.browser.version < 9)
			$span.hide();
		 else
			$span.css('opacity', 0);
		  $(this).hover(function () {
			if ($.browser.msie && $.browser.version < 9)
			  $span.show();
			else
			$span.stop().fadeTo(300, 1);
		  }, function () {
			if ($.browser.msie && $.browser.version < 9)
			  $span.hide();
			else
			  $span.stop().fadeTo(300, 0);
		  });
			var img = $(this).find('img');
			var img_h = img.attr('height');
			var img_w = img.attr('width');
			$('i', this).css({'width': img_w, 'height': img_h});
				
		});
		
		$('.gallery-item a').append('<i></i>').each(function () {
			var $span = $('> i', this);
			if ($.browser.msie && $.browser.version < 9)
				$span.hide();
			else
				$span.css('opacity', 0);
			
			if ($.browser.msie && $.browser.version < 9) {
				
				$(this).hover(function () {
						$span.show();
			}, function () {
				if ($.browser.msie && $.browser.version < 9)
					$span.hide();
				else
					$span.stop().fadeTo(300, 0);
			});
			}
			else {
			
				$(this).children('span.border').hover(function () {
					if ($.browser.msie && $.browser.version < 9)
						$span.show();
					else
						$span.stop().fadeTo(300, 1);
				}, function () {
					if ($.browser.msie && $.browser.version < 9)
						$span.hide();
					else
						$span.stop().fadeTo(300, 0);
				});
			}
		});
		
		$('.gallery-item').each(function(){
			var img = $(this).find('img');
			var img_w = img.attr('width');
			var img_h = img.attr('height');
			$('i', this).css({
				width:img_w,
				height:img_h
			})
		})
		
		$('.prev_button').hover(function(){
			$(this).find('span.n-t').animate({				
				left: "-2px"
			},{queue:false,duration:200});
			$(this).find('span.n-b').animate({				
				left: "2px"
			},{queue:false,duration:200});
		}, function(){
			$(this).find('span.n-t').animate({				
				left: "0px"
			},{queue:false,duration:200});
			$(this).find('span.n-b').animate({				
				left: "0"
			},{queue:false,duration:200});
		});
		$('.next_button').hover(function(){
			$(this).find('span.n-t').animate({				
				left: "2px"
			},{queue:false,duration:200});
			$(this).find('span.n-b').animate({				
				left: "-2px"
			},{queue:false,duration:200});
		}, function(){
			$(this).find('span.n-t').animate({				
				left: "0px"
			},{queue:false,duration:200});
			$(this).find('span.n-b').animate({				
				left: "0"
			},{queue:false,duration:200});
		});
		
		$('.ps_but .prev:not(.disabled)').hover(function(){
			$(this).find('span.n-t').animate({				
				top: "-2px"
			},{queue:false,duration:200}, function(){});
			$(this).find('span.n-b').animate({				
				top: "2px"
			},{queue:false,duration:200});
		}, function(){
			$(this).find('span.n-t').animate({				
				top: "0px"
			},{queue:false,duration:200});
			$(this).find('span.n-b').animate({				
				top: "0"
			},{queue:false,duration:200});
		});
		$('.ps_but .next:not(.disabled)').hover(function(){
			$(this).find('span.n-t').animate({				
				top: "2px"
			},{queue:false,duration:200});
			$(this).find('span.n-b').animate({				
				top: "-2px"
			},{queue:false,duration:200});
		}, function(){
			$(this).find('span.n-t').animate({				
				top: "0px"
			},{queue:false,duration:200});
			$(this).find('span.n-b').animate({				
				top: "0"
			},{queue:false,duration:200});
		});
	/* Fade hover effect: end */
	
	 	var deviceAgent = navigator.userAgent.toLowerCase();
		var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
		if (agentID) {
	 
		   $('#mask').css({
				display: 'none'
				
			})
		}
		
	}
/* Borders and hovers on images (portfolio, blog, etc.): end */



/* Flickr widget rollovers: begin */
	function initFlickr() {
		// Fix me in IE
	   $(".flickr").parent().hover(function() {},
	   function () {
		  $(".flickr i").animate({
			 opacity: 0
		  }, {
			 duration: 300,
			 queue: false
		  });
	   });
	
	   $(".flickr i").hover(function () {
		  $(this).animate({
			 opacity: 0
		  }, {
			 duration: 300,
			 queue: false
		  });      
		  jQuery(".flickr i").not( $(this) ).animate({
			 opacity: 0.4
		  }, {
			 duration: 300,
			 queue: false
		  });
		  }, function () {
	   }); 
	}
/* Flickr widget rollovers: end */

/* Show comments: begin */
	function initCommentsCaption() {
		$(".img-frame").hover(function () {
			$(this).children('.com-info').stop().css({visibility: "visible",display: "none"}).fadeIn(1200);
		}, function () {
			$('.com-info', this).stop().css({visibility: "hidden"}).fadeOut(1000);
		});
		
		
	}
/* Show comments: end */


/* Highslide expand: begin  ORIGINAL 
	function expandModals() {
		$('.button.highslide, .link.highslide, .pholio-info, h3 a, .com-info').click(function (event) {
			event.preventDefault();
			var h_wind = $(window).height() - 60;
			return hs.htmlExpand(this, { 
				objectType: 'ajax',
				width: 822,
				height: h_wind,
				allowHeightReduction: false,
				cacheAjax: false
			});
		});
		
		
	}
	
/* Highslide expand: end */

/* Highslide expand: begin */
	function expandModals() {
		$('.button.highslide, .link.highslide, h3 a, .com-info').click(function (event) {
			event.preventDefault();
			var h_wind = $(window).height() - 60;
			return hs.htmlExpand(this, { 
				objectType: 'ajax',
				width: 822,
				height: h_wind,
				allowHeightReduction: false,
				cacheAjax: false
			});
		});
		
		
	}
	
/* Highslide expand: end */

/* AW-Showcase - variable height slider: begin */
	function initAW($this) {
		var $highBody = $this;
	
		$(".showcase", $highBody).each(function() {
			$(this).awShowcase({
				content_width:			740,
				fit_to_parent:			false,
				auto:					false,
				interval:				3000,
				continuous:				false,
				loading:				true,
				tooltip_width:			200,
				tooltip_icon_width:		32,
				tooltip_icon_height:	32,
				tooltip_offsetx:		18,
				tooltip_offsety:		0,
				arrows:					true,
				buttons:				true,
				btn_numbers:			false,
				keybord_keys:			true,
				mousetrace:				false, /* Trace x and y coordinates for the mouse */
				pauseonover:			true,
				stoponclick:			true,
				transition:				'fade', /* hslide/vslide/fade */
				transition_speed:		500,
				transition_delay:		300,
				show_caption:			'onhover', /* onload/onhover/show */
				thumbnails:				true,
				thumbnails_position:	'outside-last', /* outside-last/outside-first/inside-last/inside-first */
				thumbnails_direction:	'horizontal', /* vertical/horizontal */
				thumbnails_slidex:		0, /* 0 = auto / 1 = slide one thumbnail / 2 = slide two thumbnails / etc. */
				dynamic_height:			true, /* For dynamic height to work in webkit you need to set the width and height of images in the source. Usually works to only set the dimension of the first slide in the showcase. */
				speed_change:			false, /* Set to true to prevent users from swithing more then one slide at once. */
				viewline:				false /* If set to true content_width, thumbnails, transition and dynamic_height will be disabled. As for dynamic height you need to set the width and height of images in the source. */
			});
		});
		$('.showcase-thumbnail', $highBody).each(function(){
			var this_thumb = $('img', this);
			var this_src = this_thumb.attr('src');
			var this_w = this_thumb.attr('width')-4;
			var this_h = this_thumb.attr('height')-4;
			$(this).append('<span class="border"></span>');
			$('span.border', this).css({'width': this_w, 'height': this_h, opacity: 0.3});
		})
		
	}
/* AW-Showcase - variable height slider: end */

/* Images inner borders in modal windows: begin */
	function initModalBorders($this) {
		var $highBody = $this;
		$("ul#thumb-list li, .work, .shad_dark , .thumbNav li a, .img-frame", $highBody).each(function () {
			var img = $(this).find('img');
			var img_h = img.attr('height')-4;
			var img_w = img.attr('width')-4;
			$(this).append('<span class="border"></span>');
			$('span.border', this).css({'width': img_w, 'height': img_h, opacity: 0.3});
		});
	}
/* Images inner borders in modal windows: end */

/* comments form */
	function initCommentsForm() {
		function move_form_to(ee) {
			var $moveTo = ee,
				$commentsHolder = $moveTo.parent().parent(),
				e = $("#form_holder", $commentsHolder).html(),
				tt = $("#form_holder .header", $commentsHolder).text(),
				sb =$("#form_holder .go_button", $commentsHolder).attr("title"),
				to_slide_up = ($(".comment_bg #form_holder", $commentsHolder).length ? $("#form_holder", $commentsHolder) : $(".share_com", $commentsHolder));
		
			to_slide_up.slideUp(500, function () {
				$("#form_holder", $commentsHolder).remove();
				
				$moveTo.append('<div id="form_holder">'+e+'</div>');
				$("#form_holder .header", $commentsHolder).html(tt);
				$("#form_holder [valed]", $commentsHolder).removeAttr('valed');
				$("#form_holder .do-clear", $commentsHolder).attr('remove', 1);
				
				/*	$("#form_holder .go_button cufon").remove();*/
				$("#form_holder .go_button span :not(i)", $commentsHolder).remove();
				/*	$("#form_holder .go_button i").after( sb );*/
				
				//alert(sb);
				cufonComments();
				
				$(".formError", $commentsHolder).remove();
				
				$("#form_holder", $commentsHolder).hide();
				
				to_slide_up = ($(".comment_bg #form_holder", $commentsHolder).length ? $("#form_holder", $commentsHolder) : $(".share_com", $commentsHolder));
				if (to_slide_up.hasClass('share_com', $commentsHolder)) $("#form_holder", $commentsHolder).show();
				
				to_slide_up.slideDown(500);
				
				if ($moveTo.attr("id") != "form_prev_holder")
				{
				var eid = $moveTo.parent().attr("id");
				if (!eid)
				   eid = "";
				$("#comment_parent", $commentsHolder).val( eid.replace('comment-', '') );
				}
				else
				{
				$("#comment_parent", $commentsHolder).val("0");
				}
				
				$("form .do-clear", $commentsHolder).unbind().click(function (e) {
					$(this).parents("form").find("input, textarea").each(function () {
						$(this).val("").unbind()//.placeholder();
					});
					$(".formError", $commentsHolder).remove();
					if ($(this).attr("remove") && !$(this).parents("#form_prev_holder", $commentsHolder).length)	{
						move_form_to( $("#form_prev_holder", $commentsHolder) );
						$("#form_holder .do-clear", $commentsHolder).removeAttr('remove');
					}  
					return false;
				});
			});
		}
		$(".comment .comments").click(function (event) {
			event.preventDefault();
			move_form_to( $(this).parents(".comment"));
		});
	}
/* end comments form */
//colums
function initCollums() {
	if ($.browser.msie && $.browser.version < 8){
		$(".col").each(function(){
			var	_width = $(this).width(),
				_outer_width = $(this).outerWidth();
			_width = 2*_width -_outer_width - 1;
			
			$(this).css({"width":_width});
		});
	}
	if ($.browser.opera){
		$(".w_1-3").each(function(){
			var _width = $(this).parent().width()/3;
				$(this).css({"width":_width});
		});
		$(".w_2-3").each(function(){
			var _width = $(this).parent().width()/3*2;
				$(this).css({"width":_width});
		});
	}



	//width header in comments ie7
	$('.head-com').each(function(){
		var full_w = $(this).width();
		var meta_w = $('.comment_meta').width();
		$('.head', this).css({
			'width':full_w-meta_w
		})
	})
	
	$('.control li').each(function(){
		var li_go = $(this).find('.go');
		var li_play = $(this).find('.go.play');
		var li_pause = $(this).find('.go.pause');
		var li_mute = $(this).find('.get.mute');
		var li_stop = $(this).find('.stop');

		li_go.click(function(){
			if($(this).hasClass('play')){
				$(this).removeClass("play");
				$(this).addClass("pause");
			}
			else{
				$(this).removeClass("pause");
				$(this).addClass("play");
			}
			
		})
		li_stop.click(function(){
						
			var parent_pause = $(this).parent('li').next();
			var pause = parent_pause.children('.go.pause')
			pause.removeClass("pause").addClass("play");
				
			}
		);
		
		li_mute.toggle(
			function(){
				$(this).removeClass("mute");
				$(this).addClass("unmute");
				
			},
			function(){
				$(this).removeClass("unmute");
				$(this).addClass("mute");
			}
		);
	})
	$('.control li.desc-info').hover(
		function() {
			$(this).children('.info-box').stop().css({visibility: "visible",display: "none"}).fadeIn(600);
		}, function () {
			$('.info-box', this).stop().css({visibility: "hidden"}).fadeOut(600);
		}
	);
};
/* ---------------------------------------------------------------------------------------- */

/* Init Supersized: begin */
	function initSupersized() {

		$superslides = $("#superslides").hide();

		//var superslides = eval("["+$superslides.text()+"]");
		var superslides = [];
		$superslides.find("a").each(function(){
			superslides.push({
				image	: $(this).attr("data-image"),
				title	: $(this).text(),
				thumb	: $(this).attr("data-thumb"),
				url		: $(this).attr("href"),
				desc	: $(this).attr("data-desc")
			});
		});

		if (superslides.length > 0) {

			if (typeof api !== 'undefined') {
				if($.supersized.vars.is_paused == true){
					$.supersized.defaultOptions.autoplay = 0;
				} else {
					$.supersized.defaultOptions.autoplay = 1;
				}
				api.destroy( function() {
					$.supersized({ slides : superslides	});
				});
				$(".slider-controls:not(.show-hide)").off();
			} else {
				$.supersized({ slides : superslides	});
			}

			if($.supersized.defaultOptions.autoplay == 1){
				$(".play-stop").addClass("stop").removeClass("play");
			} else {
				$(".play-stop").addClass("play").removeClass("stop");
			}

			$("#controls-basic a").on("click", function(event) {
				event.preventDefault();
				var $this = $(this);

				if ($this.hasClass("larr")) {
					api.prevSlide();
				} else if ($this.hasClass("rarr")) {
					api.nextSlide();
				} 
			});

			$(".slider-controls.play-stop").on("click", function(event){
				event.preventDefault();
				var $this = $(this);

				if ($this.hasClass("play")) {
					api.playToggle('play');
					$(".slider-controls.play-stop").addClass("stop").removeClass("play");
				} else if ($this.hasClass("stop")) {
					api.playToggle('pause');
					$(".slider-controls.play-stop").addClass("play").removeClass("stop");
				}
			});

			$("#controls-basic .info").hover(
				function() {
					$(".info-box", $(this)).stop().fadeTo(250, 1);
				} , 
				function() {
					$(".info-box", $(this)).stop().fadeOut(150);
				}
			);

		} else {
			if (typeof api !== 'undefined') {
				clearTimeout(vars.slideshow_interval);
				$.supersized.vars.is_paused = true;
				$.supersized.defaultOptions.autoplay = 0;
			}
			$.dtLoading('hide');
		}
	}
/* Init Supersized: end */
/* Basic functions: end */


/* Init functions in modal windows: begin */
	function dtModalsInit() {
		// Define NEW modal window
		$(".highslide-html .highslide-body:not(.hs-cached)").each(function() {

			/*$('.highslide-body').each(function () {
				$('.highslide-wrapper').append('<a href="" class="arrow-l"></a><a href="" class="arrow-r"></a>');
			});*/
		
			// This modal window
			var $highBody = $(this);

			// Append masks
			$highBody.append('<div class="cont-t"></div><div class="cont-b"></div>');
			
			// AW-Showcase
			initAW($highBody);
			

			// Images inner borders
			initModalBorders($highBody);
			
			// Preload Images
			preloadImages();

			// Initialise scrolling in modal window
			initScroll2();
			
			// Enable moving of comment form
			initCommentsForm();
	
			//Enable Cufon
			cufonModal();
			
			// Mark this modal window as initialised
			$highBody.addClass("hs-cached");
			//Initialize shortcode Slideshow
				initSkitter()
			//Initialize shortcode Toggle
				initToggle();
			//Initialize shortcode Tooltip
				 simple_tooltip(".tooltip","tooltip_cont");
			//Initialize shortcode Accordion
				initAccordion();
			//Initialize shortcode Tabs
				initTabs();
			//Initialize shortcode Carousel
				initCarousel();
			//Initialize shortcode Collums	
				initCollums()
		});
	}
/* Init functions in modal windows: end */

/* Init functions in main content area: begin */
	function dtInit() {
		
		$("a.ajax-me, .ajax-me a").click(function(e){
			e.preventDefault();
		
			var $this = $(this),
				page_path = $this.attr("href");
			
			$this.trigger("mouseleave");
	
			location.hash = "!/"+page_path;
		
			//$("#nav ul").find("li").removeClass("act");

		});
	
		preloadImages();

	// Init/refresh Supersized
		initSupersized();
	
	// Service tooltips (tags, categories, social links, etc.)
		initTooltips();
	
	// Cufon init
		initCufon();
		
	// Skitter slider
		initSkitter();
	
	// Portfolio scroller
		inintSmoothDivScroll();
	// Add inside-border to other images
		initBorders();
	// Clickable images inside-borders and hovers 
		initHovers();
	// Hover on flickr widget
		initFlickr();
	
	// Comments caption
		initCommentsCaption();
	
	// Scrolling
		initScroll1();
	
	// Initialize modal windows
		expandModals();
	//Initialize shortcode Toggle
		initToggle();
	//Initialize shortcode Tooltip
		 simple_tooltip(".tooltip","tooltip_cont");
	//Initialize shortcode Accordion
		initAccordion();
	//Initialize shortcode Tabs
		initTabs();
	//Initialize shortcode Carousel
		initCarousel();
	//Initialize shortcode Collums	
		initCollums()
		
	}
/* Init functions in main content area: end */

jQuery(document).ready(function($) {

/* droup-down menu: begin */
	$("#nav li").each(function () {
		if ($(this).find("div").length > 0) {
			$(this).hover(function() {
				$(this).children('div').stop(true, true).slideDown('normal');/*.css({visibility: "visible",display: "none"}).slideDown('normal');*/
				
				$(this).children('div').addClass('act');
					$("#nav li div").each(function(){
						if($("#nav li div").hasClass('act')){
							var deviceAgent = navigator.userAgent.toLowerCase();
							var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
							if (agentID) {					
								jwplayer("video-wrap").pause()
							}					
						}
					})
			}, function () {
				$('div', this).stop(true, true).slideUp('normal')/*.css({visibility: "hidden"})*/;
				$(this).children('div').removeClass('act')
			});
		}
	})
	
	// Nav li hover
	$('#nav > ul > li > a').hover(function (){
		$(this).parent('li').addClass('hover');
	} , function () {
		$(this).parent('li').removeClass('hover');
	});
/* droup-down menu: end */

/* loading indicator: begin */
	$.dtLoading = function(action) {		
		var action = action || "show";

		if ( typeof dtLoadingData === "undefined" ) {
			var $body = $('body');
			$body.data('dtLoadingData', {
				body : $body,
				loading : $('<div id="supersized-loader" style="display: none;"><div></div></div>').appendTo($body)
			});
			dtLoadingData = $body.data('dtLoadingData');
		}

		switch(action){
			case 'show':
				dtLoadingData.loading.fadeIn(300);
				return;
			break;
			case 'hide':
				dtLoadingData.loading.delay(200).fadeOut(300);
				return;
			break;
			case 'kill':
				dtLoadingData.loading.remove();
				dtLoadingData.body.removeData('dtLoadingData');
				delete dtLoadingData;
				return;
			break;
		}
	}
/* loading indicator: end */

/* social icons hover: begin */
	var $socIco = $('.soc-ico a');
	$socIco.each(function () {
		var newHtml = '<div class="soc-info"><span class="soc-cont"><span class="soc-b">' + $(this).html(); + '</span></span></div>';
		$(this).html(newHtml);
	});

	$socIco.hover(
		function() {
			$("> .soc-info", $(this)).stop().fadeTo(250, 1);
		} , function() {
			$("> .soc-info", $(this)).stop().fadeOut(150);
		}
	);

	//max-width social ico block
	$('.soc-ico').css({
		'max-width' : $('#nav').width() - $('#nav ul').width() - 52 +'px'
	});
/* social icons hover: end */

/* copyrigth hover: begin */

	var $copyIco = $('.copy');
	$copyIco.each(function () {
		var newHtml = '<div class="copy-cont"><span class="copy-info">' + $(this).html(); + '</span></div>';
		$(this).html(newHtml);
	});

	$copyIco.hover(
		function() {
			
			$('#brand .copy span').css('display', 'block');
			$("> .copy-cont", $(this)).stop().fadeTo(250, 1);
			
		} , function() {
			$("> .copy-cont", $(this)).stop().fadeOut(150, 0);
			
		}
	);

/* copyrigth hover: end */



// Ajax content
	dtInit();

/* Safari mobile: begin */
	if ($.browser.SafariMobile){
		$("html, body").css({
			"overflow" : "hidden"
		});
		window.scrollTo(0, 1);
	}
/* Safari mobile: end */

});


//-------------------------------------------------------------------------------------

/*custom-menu*/
jQuery(function(){
	$('.custom-menu li').each(function(){
		$('.custom-menu > li > ul').parent('li').addClass('level2');
	
	})
})
//------------------------------------------------------------------------------------

// form validation
/*function update_form_validation() {
   $("[placeholder]").each(function () {
	  $(this).val( $(this).val().replace( $(this).attr("placeholder"), '' ) );
	  $(this).unbind()//.placeholder();
   });
   $("form .go_button, form .do_add_comment").unbind().click(function () {
   
	  $(this).parents("form").find("input, textarea").each(function () {
		 $(this).val( $(this).val().replace( $(this).attr("placeholder"), '' ) ).unbind()//.placeholder();
	  });
	  $(".formError").remove();
	  
	  var e=$(this).parents("form");
	  e.find("input, textarea").each(function () {
		 $(this).unbind();
		 $(this).val( $(this).val().replace( $(this).attr("placeholder"), "" ) );
	  });
	  if (!e.attr("valed"))
	  {
		 if ( e.hasClass("ajaxing") )
		 {
			e.validationEngine({
			   ajaxSubmit: true,
			   ajaxSubmitFile: e.attr("action")
			});
		 }
		 else
		 {
			e.validationEngine();
		 }
	  }
	  e.attr("valed", "1");
	  e.submit(); 
	  e.find("input, textarea").each(function () {
		 $(this)//.placeholder();
	  });      
	  return false;
   });
}

$(update_form_validation);*/
// end form validation