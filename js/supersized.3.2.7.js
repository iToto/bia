/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Site	: www.buildinternet.com/project/supersized

	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License

	Modified by
	Author	: Miroslav Varsky
	Company	: Dream-Theme (dream-theme.com)

*/

(function($){	
    $.supersized = function(options){

		/* Place Supersized Elements
		----------------------------*/

		$('body').append('<ul id="supersized"></ul>');
		$.dtLoading('show');
		
/*		if ($("#supercontrols").length < 1){
			$("body").append(' \
			<div id="supercontrols"> \
				<div id="controls-basic"> \
					<a href="#" class="slider-controls play-stop play"></a> \
					<!--<a href="#" class="slider-controls larr"></a> \
					<a href="#" class="slider-controls rarr"></a>--> \
					<div class="slider-controls info"> \
						<div class="info-box"> \
							<div class="info-box-t"></div> \
							<div class="info-box-bg"> \
								<!-- Slide information is dynamically loaded here --> \
							</div> \
							<div class="info-box-b"></div> \
						</div> \
					</div> \
					<a href="#" class="slider-controls show-hide show"></a> \
				</div>  \
				<div id="ps_slider" class="ps_slider"> \
					<div id="controls-advanced"> \
						<a href="#" class="slider-controls play-stop play"></a> \
						<a href="#" class="slider-controls show-hide hide"></a> \
					</div>  \
					<div class="ps_but"> \
						<a class="prev disabled"><span class="n-t"></span><span class="n-b"></span></a> \
						<a class="next disabled"><span class="n-t"></span><span class="n-b"></span></a> \
					</div> \
					<div id="ps_albums"> \
						<!-- Thumbnails are dynamically loaded here --> \
					</div> \
				</div> \
			</div> \
			');
		}*/
    	
    	/* Variables
		----------------------------*/
    	var el = '#supersized',
        	base = this;
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        vars = $.supersized.vars;
        // Add a reverse reference to the DOM object
        base.$el.data("supersized", base);
        api = base.$el.data('supersized');
		
		base.init = function(){
        	// Combine options and vars
        	$.supersized.vars = $.extend($.supersized.vars, $.supersized.themeVars);
        	$.supersized.vars.options = $.extend({},$.supersized.defaultOptions, $.supersized.themeOptions, options);
            base.options = $.supersized.vars.options;
            
            base._build();
        };
        
        
        /* Build Elements
		----------------------------*/
        base._build = function(){
        	// Add in slide markers
        	var thisSlide = 0,
        		slideSet = '',
				markers = '',
				markerContent,
				thumbMarkers = '',
				thumbImage,
				thumbnailsSet = '';
				
			while(thisSlide <= base.options.slides.length-1){
				
				//Determine slide link content
				switch(base.options.slide_links){
					case 'num':
						markerContent = thisSlide;
						break;
					case 'name':
						markerContent = base.options.slides[thisSlide].title;
						break;
					case 'blank':
						markerContent = '';
						break;
				}



				var slideDesc = "",
					slideLink = "";
				if (base.options.slides[thisSlide].title){
					slideDesc = slideDesc +'<h3>'+ base.options.slides[thisSlide].title +'</h3>';
				}
				if (base.options.slides[thisSlide].desc){
					slideDesc = slideDesc +'<p>'+ base.options.slides[thisSlide].desc +'</p>';
				}
				if (base.options.slides[thisSlide].url){
					slideDesc = slideDesc +'<a class="button" href="'+ base.options.slides[thisSlide].url +'"><span>Read more</span></a>';
					slideLink = '<a class="link-two" href="'+base.options.slides[thisSlide].url+'"></a>';
				}
				
				if (slideDesc) {
					slideDesc = ' \
						<div class="inner-desc"> \
							<div class="inners"> \
								<div class="arrow-t"></div> \
								<div class="ps_desc">'+slideDesc+'</div> \
								<div class="arrow-b"></div>	\
							</div> \
						</div> \
					';
				}
				
				base.options.slides[thisSlide].thumb ? thumbImage = base.options.slides[thisSlide].thumb : thumbImage = base.options.slides[thisSlide].image;
				
				thumbnailsSet = thumbnailsSet+' \
				\
					<div class="ps_album"> \
						<div class="ps_photo"> \
							<a class="this-photo" href="'+base.options.slides[thisSlide].image+'"><img src="'+thumbImage+'" alt="" height="90" width="130" class="thumb" /></a> \
							<span class="border" style="width: 126px; height: 86px;"></span><i></i> \
							'+slideLink+' \
							<a class="zoom-two highslide" onclick="return hs.expand(this)" href="'+base.options.slides[thisSlide].image+'"></a> \
						</div> \
						'+slideDesc+' \
					</div> \
				\
				';

				slideSet = slideSet+'<li class="slide-'+thisSlide+'"></li>';
				
				if(thisSlide == base.options.start_slide-1){
					// Slide links
					if (base.options.slide_links)markers = markers+'<li class="slide-link-'+thisSlide+' current-slide"><a>'+markerContent+'</a></li>';
					// Slide Thumbnail Links
					if (base.options.thumb_links){
						base.options.slides[thisSlide].thumb ? thumbImage = base.options.slides[thisSlide].thumb : thumbImage = base.options.slides[thisSlide].image;
						thumbMarkers = thumbMarkers+'<li class="thumb'+thisSlide+' current-thumb"><img src="'+thumbImage+'"/></li>';
					};
				}else{
					// Slide links
					if (base.options.slide_links) markers = markers+'<li class="slide-link-'+thisSlide+'" ><a>'+markerContent+'</a></li>';
					// Slide Thumbnail Links
					if (base.options.thumb_links){
						base.options.slides[thisSlide].thumb ? thumbImage = base.options.slides[thisSlide].thumb : thumbImage = base.options.slides[thisSlide].image;
						thumbMarkers = thumbMarkers+'<li class="thumb'+thisSlide+'"><img src="'+thumbImage+'"/></li>';
					};
				}
				
				thisSlide++;
			}


			setTimeout(function() {
				$("#ps_albums").html(thumbnailsSet);
				exposeThumbnails();
			}, 350);
			
			if (base.options.slide_links) $(vars.slide_list).html(markers);
			if (base.options.thumb_links && vars.thumb_tray.length){
				$(vars.thumb_tray).append('<ul id="'+vars.thumb_list.replace('#','')+'">'+thumbMarkers+'</ul>');
			}
			
			$(base.el).append(slideSet);
			
			// Add in thumbnails
			if (base.options.thumbnail_navigation){
				// Load previous thumbnail
				vars.current_slide - 1 < 0  ? prevThumb = base.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
				$(vars.prev_thumb).show().html($("<img/>").attr("src", base.options.slides[prevThumb].image));
				
				// Load next thumbnail
				vars.current_slide == base.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
				$(vars.next_thumb).show().html($("<img/>").attr("src", base.options.slides[nextThumb].image));
			}
			
            base._start(); // Get things started
        };
        
        
        /* Initialize
		----------------------------*/
    	base._start = function(){
			
			// Determine if starting slide random
			if (base.options.start_slide){
				vars.current_slide = base.options.start_slide - 1;
			}else{
				vars.current_slide = Math.floor(Math.random()*base.options.slides.length);	// Generate random slide number
			}
			
			// If links should open in new window
			var linkTarget = base.options.new_window ? ' target="_blank"' : '';
			
			// Set slideshow quality (Supported only in FF and IE, no Webkit)
			if (base.options.performance == 3){
				base.$el.addClass('speed'); 		// Faster transitions
			} else if ((base.options.performance == 1) || (base.options.performance == 2)){
				base.$el.addClass('quality');	// Higher image quality
			}
						
			// Shuffle slide order if needed		
			if (base.options.random){
				arr = base.options.slides;
				for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);	// Fisher-Yates shuffle algorithm (jsfromhell.com/array/shuffle)
			    base.options.slides = arr;
			}
			
			/*-----Load initial set of images-----*/
	
			if (base.options.slides.length > 1){
				if(base.options.slides.length > 2){
					// Set previous image
					vars.current_slide - 1 < 0  ? loadPrev = base.options.slides.length - 1 : loadPrev = vars.current_slide - 1;	// If slide is 1, load last slide as previous
					var imageLink = (base.options.slides[loadPrev].url) ? "href='" + base.options.slides[loadPrev].url + "'" : "";
				
					var imgPrev = $('<img src="'+base.options.slides[loadPrev].image+'"/>');
					var slidePrev = base.el+' li:eq('+loadPrev+')';
					imgPrev.appendTo(slidePrev).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading prevslide');
				
					imgPrev.load(function(){
						$(this).data('origWidth', $(this).width()).data('origHeight', $(this).height());
						base.resizeNow();	// Resize background image
					});	// End Load
				}
			} else {
				// Slideshow turned off if there is only one slide
				base.options.slideshow = 0;
			}
			
			// Set current image
			imageLink = (api.getField('url')) ? "href='" + api.getField('url') + "'" : "";
			var img = $('<img src="'+api.getField('image')+'"/>');
			
			var slideCurrent= base.el+' li:eq('+vars.current_slide+')';
			img.appendTo(slideCurrent).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading activeslide');
			
			img.load(function(){
				base._origDim($(this));
				base.resizeNow();	// Resize background image
				base.launch();
				if( typeof theme != 'undefined' && typeof theme._init == "function" ) theme._init();	// Load Theme
			});
			
			if (base.options.slides.length > 1){
				// Set next image
				vars.current_slide == base.options.slides.length - 1 ? loadNext = 0 : loadNext = vars.current_slide + 1;	// If slide is last, load first slide as next
				imageLink = (base.options.slides[loadNext].url) ? "href='" + base.options.slides[loadNext].url + "'" : "";
				
				var imgNext = $('<img src="'+base.options.slides[loadNext].image+'"/>');
				var slideNext = base.el+' li:eq('+loadNext+')';
				imgNext.appendTo(slideNext).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading');
				
				imgNext.load(function(){
					$(this).data('origWidth', $(this).width()).data('origHeight', $(this).height());
					base.resizeNow();	// Resize background image
				});	// End Load
			}

			base.refreshControls();

			/*-----End load initial images-----*/
			
			//  Hide elements to be faded in
			base.$el.css('visibility','hidden');
			$('.load-item').hide();
			
    	};
		
		
		/* Launch Supersized
		----------------------------*/
		base.launch = function(){
		
//			base.$el.css('visibility','visible');
//			setTimeout(function() {
				$.dtLoading('hide');		//Hide loading animation
//			}, 500);
			base.$el.hide().css('visibility','visible').fadeIn(500);
			
			// Call theme function for before slide transition
			if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('next');
			$('.load-item').show();
			
			// Keyboard Navigation
			if (base.options.keyboard_nav){
				$(document.documentElement).keyup(function (event) {
				
					if(vars.in_animation) return false;		// Abort if currently animating
					
					// Left Arrow or Down Arrow
					if ((event.keyCode == 37) || (event.keyCode == 40)) {
						clearTimeout(vars.slideshow_interval);	// Stop slideshow, prevent buildup
						base.prevSlide();
					
					// Right Arrow or Up Arrow
					} else if ((event.keyCode == 39) || (event.keyCode == 38)) {
						clearTimeout(vars.slideshow_interval);	// Stop slideshow, prevent buildup
						base.nextSlide();
					
					// Spacebar	
					} else if (event.keyCode == 32 && !vars.hover_pause) {
						clearTimeout(vars.slideshow_interval);	// Stop slideshow, prevent buildup
						base.playToggle();
					}
				
				});
			}
			
			// Pause when hover on image
			if (base.options.slideshow && base.options.pause_hover){
				$(base.el).hover(function() {
					if(vars.in_animation) return false;		// Abort if currently animating
			   			vars.hover_pause = true;	// Mark slideshow paused from hover
			   			if(!vars.is_paused){
			   				vars.hover_pause = 'resume';	// It needs to resume afterwards
			   				base.playToggle();
			   			}
			   	}, function() {
					if(vars.hover_pause == 'resume'){
						base.playToggle();
						vars.hover_pause = false;
					}
			   	});
			}
			
			if (base.options.slide_links){
				// Slide marker clicked
				$(vars.slide_list+'> li').click(function(){
				
					index = $(vars.slide_list+'> li').index(this);
					targetSlide = index + 1;
					
					base.goTo(targetSlide);
					return false;
					
				});
			}
			
			// Thumb marker clicked
			if (base.options.thumb_links){
				$(vars.thumb_list+'> li').click(function(){
				
					index = $(vars.thumb_list+'> li').index(this);
					targetSlide = index + 1;
					
					api.goTo(targetSlide);
					return false;
					
				});
			}
			
			// Start slideshow if enabled
			if (base.options.slideshow && base.options.slides.length > 1){
	    		
	    		// Start slideshow if autoplay enabled
	    		if (base.options.autoplay && base.options.slides.length > 1){
	    			vars.slideshow_interval = setTimeout(base.nextSlide, base.options.slide_interval);	// Initiate slide interval
				}else{
					vars.is_paused = true;	// Mark as paused
				}
				
				//Prevent navigation items from being dragged					
				$('.load-item img').bind("contextmenu mousedown",function(){
					return false;
				});
								
			}
			
			// Adjust image when browser is resized
			$(window).resize(function(){
	    		base.resizeNow();
			});
    		
    	};
        
        
        /* Resize Images
		----------------------------*/
		base.resizeNow = function(){
			
			return base.$el.each(function() {
		  		//  Resize each image seperately
		  		$('img', base.el).each(function(){
		  			
					thisSlide = $(this);
					var ratio = (thisSlide.data('origHeight')/thisSlide.data('origWidth')).toFixed(2);	// Define image ratio
					
					// Gather browser size
					var browserwidth = base.$el.width(),
						browserheight = base.$el.height(),
						offset;
					
					/*-----Resize Image-----*/
					if (base.options.fit_always){	// Fit always is enabled
						if ((browserheight/browserwidth) > ratio){
							resizeWidth();
						} else {
							resizeHeight();
						}
					}else{	// Normal Resize
						if ((browserheight <= base.options.min_height) && (browserwidth <= base.options.min_width)){	// If window smaller than minimum width and height
						
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight(true);	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth(true);		// If portraits are set to fit
							}
						
						} else if (browserwidth <= base.options.min_width){		// If window only smaller than minimum width
						
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight();	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth(true);		// If portraits are set to fit
							}
							
						} else if (browserheight <= base.options.min_height){	// If window only smaller than minimum height
						
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight(true);	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth();		// If portraits are set to fit
							}
						
						} else {	// If larger than minimums
							
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight();	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth();		// If portraits are set to fit
							}
							
						}
					}
					/*-----End Image Resize-----*/
					
					
					/*-----Resize Functions-----*/
					
					function resizeWidth(minimum){
						if (minimum){	// If minimum height needs to be considered
							if(thisSlide.width() < browserwidth || thisSlide.width() < base.options.min_width ){
								if (thisSlide.width() * ratio >= base.options.min_height){
									thisSlide.width(base.options.min_width);
						    		thisSlide.height(thisSlide.width() * ratio);
						    	}else{
						    		resizeHeight();
						    	}
						    }
						}else{
							if (base.options.min_height >= browserheight && !base.options.fit_landscape){	// If minimum height needs to be considered
								if (browserwidth * ratio >= base.options.min_height || (browserwidth * ratio >= base.options.min_height && ratio <= 1)){	// If resizing would push below minimum height or image is a landscape
									thisSlide.width(browserwidth);
									thisSlide.height(browserwidth * ratio);
								} else if (ratio > 1){		// Else the image is portrait
									thisSlide.height(base.options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								} else if (thisSlide.width() < browserwidth) {
									thisSlide.width(browserwidth);
						    		thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	// Otherwise, resize as normal
								thisSlide.width(browserwidth);
								thisSlide.height(browserwidth * ratio);
							}
						}
					};
					
					function resizeHeight(minimum){
						if (minimum){	// If minimum height needs to be considered
							if(thisSlide.height() < browserheight){
								if (thisSlide.height() / ratio >= base.options.min_width){
									thisSlide.height(base.options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								}else{
									resizeWidth(true);
								}
							}
						}else{	// Otherwise, resized as normal
							if (base.options.min_width >= browserwidth){	// If minimum width needs to be considered
								if (browserheight / ratio >= base.options.min_width || ratio > 1){	// If resizing would push below minimum width or image is a portrait
									thisSlide.height(browserheight);
									thisSlide.width(browserheight / ratio);
								} else if (ratio <= 1){		// Else the image is landscape
									thisSlide.width(base.options.min_width);
						    		thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	// Otherwise, resize as normal
								thisSlide.height(browserheight);
								thisSlide.width(browserheight / ratio);
							}
						}
					};
					
					/*-----End Resize Functions-----*/
					
					if (thisSlide.parents('li').hasClass('image-loading')){
						$('.image-loading').removeClass('image-loading');
					}
					
					// Horizontally Center
					if (base.options.horizontal_center){
						$(this).css('left', (browserwidth - $(this).width())/2);
					}
					
					// Vertically Center
					if (base.options.vertical_center){
						$(this).css('top', (browserheight - $(this).height())/2);
					}
					
				});
				
				// Basic image drag and right click protection
				if (base.options.image_protect){
					
					$('img', base.el).bind("contextmenu mousedown",function(){
						return false;
					});
				
				}
				
				return false;
				
			});
			
		};
        
        
        /* Next Slide
		----------------------------*/
		base.nextSlide = function(){
			
			if(vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
				else vars.in_animation = true;		// Otherwise set animation marker
				
		    clearTimeout(vars.slideshow_interval);	// Stop slideshow

		    var slides = base.options.slides,					// Pull in slides array
				liveslide = base.$el.find('.activeslide');		// Find active slide
				$('.prevslide').removeClass('prevslide');
				liveslide.removeClass('activeslide').addClass('prevslide');	// Remove active class & update previous slide
					
			// Get the slide number of new slide
			vars.current_slide + 1 == base.options.slides.length ? vars.current_slide = 0 : vars.current_slide++;
			
		    var nextslide = $(base.el+' li:eq('+vars.current_slide+')'),
		    	prevslide = base.$el.find('.prevslide');
			
			// If hybrid mode is on drop quality for transition
			if (base.options.performance == 1) base.$el.removeClass('quality').addClass('speed');
			

			var $actThumbnail = $(".ps_album[data-num='"+(vars.current_slide+1)+"']");
			highliteThumbnail($actThumbnail);
			
			if ($actThumbnail.is($("#ps_albums").children('div:eq(3)'))) {
				movePrev();
			}
			
			
			
			
			/*-----Load Image-----*/
			
			loadSlide = false;

			vars.current_slide == base.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;	// Determine next slide

			base.refreshControls();

			var targetList = base.el+' li:eq('+loadSlide+')';
			if (!$(targetList).html()){
				
				// If links should open in new window
				var linkTarget = base.options.new_window ? ' target="_blank"' : '';
				
				imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
				var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 
				
				img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');
				
				img.load(function(){
					base._origDim($(this));
					base.resizeNow();
				});	// End Load
			};
						
			// Update thumbnails (if enabled)
			if (base.options.thumbnail_navigation == 1){
			
				// Load previous thumbnail
				vars.current_slide - 1 < 0  ? prevThumb = base.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
				$(vars.prev_thumb).html($("<img/>").attr("src", base.options.slides[prevThumb].image));
			
				// Load next thumbnail
				nextThumb = loadSlide;
				$(vars.next_thumb).html($("<img/>").attr("src", base.options.slides[nextThumb].image));
				
			}
			
			
			
			/*-----End Load Image-----*/
			
			
			// Call theme function for before slide transition
			if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('next');
			
			//Update slide markers
			if (base.options.slide_links){
				$('.current-slide').removeClass('current-slide');
				$(vars.slide_list +'> li' ).eq(vars.current_slide).addClass('current-slide');
			}
		    
		    nextslide.css('visibility','hidden').addClass('activeslide');	// Update active slide
		    
	    	switch(base.options.transition){
	    		case 0: case 'none':	// No transition
	    		    nextslide.css('visibility','visible'); vars.in_animation = false; base.afterAnimation();
	    		    break;
	    		case 1: case 'fade':	// Fade
	    		    nextslide.animate({opacity : 0},0).css('visibility','visible').animate({opacity : 1, avoidTransforms : false}, base.options.transition_speed, function(){ base.afterAnimation(); });
	    		    break;
	    		case 2: case 'slideTop':	// Slide Top
	    		    nextslide.animate({top : -base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    		    break;
	    		case 3: case 'slideRight':	// Slide Right
	    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 4: case 'slideBottom': // Slide Bottom
	    			nextslide.animate({top : base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 5: case 'slideLeft':  // Slide Left
	    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 6: case 'carouselRight':	// Carousel Right
	    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({ left: -base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
	    			break;
	    		case 7: case 'carouselLeft':   // Carousel Left
	    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({ left: base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
	    			break;
	    	}
		    return false;	
		};
		
		
		/* Previous Slide
		----------------------------*/
		base.prevSlide = function(){
		
			if(vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
				else vars.in_animation = true;		// Otherwise set animation marker
			
			clearTimeout(vars.slideshow_interval);	// Stop slideshow
			
			var slides = base.options.slides,					// Pull in slides array
				liveslide = base.$el.find('.activeslide');		// Find active slide
				$('.prevslide').removeClass('prevslide');
				liveslide.removeClass('activeslide').addClass('prevslide');		// Remove active class & update previous slide
			
			// Get current slide number
			vars.current_slide == 0 ?  vars.current_slide = base.options.slides.length - 1 : vars.current_slide-- ;
				
		    var nextslide =  $(base.el+' li:eq('+vars.current_slide+')'),
		    	prevslide =  base.$el.find('.prevslide');
			
			// If hybrid mode is on drop quality for transition
			if (base.options.performance == 1) base.$el.removeClass('quality').addClass('speed');	
			
			
			/*-----Load Image-----*/
			
			loadSlide = vars.current_slide;
			
			base.refreshControls();
			
			var targetList = base.el+' li:eq('+loadSlide+')';
			if (!$(targetList).html()){
				// If links should open in new window
				var linkTarget = base.options.new_window ? ' target="_blank"' : '';
				imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
				var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 
				
				img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');
				
				img.load(function(){
					base._origDim($(this));
					base.resizeNow();
				});	// End Load
			};
			
			// Update thumbnails (if enabled)
			if (base.options.thumbnail_navigation == 1){
			
				// Load previous thumbnail
				//prevThumb = loadSlide;
				loadSlide == 0 ? prevThumb = base.options.slides.length - 1 : prevThumb = loadSlide - 1;
				$(vars.prev_thumb).html($("<img/>").attr("src", base.options.slides[prevThumb].image));
				
				// Load next thumbnail
				vars.current_slide == base.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
				$(vars.next_thumb).html($("<img/>").attr("src", base.options.slides[nextThumb].image));
			}
			
			/*-----End Load Image-----*/
			
			
			// Call theme function for before slide transition
			if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('prev');
			
			//Update slide markers
			if (base.options.slide_links){
				$('.current-slide').removeClass('current-slide');
				$(vars.slide_list +'> li' ).eq(vars.current_slide).addClass('current-slide');
			}
			
		    nextslide.css('visibility','hidden').addClass('activeslide');	// Update active slide
		    
		    switch(base.options.transition){
	    		case 0: case 'none':	// No transition
	    		    nextslide.css('visibility','visible'); vars.in_animation = false; base.afterAnimation();
	    		    break;
	    		case 1: case 'fade':	// Fade
	    		  	nextslide.animate({opacity : 0},0).css('visibility','visible').animate({opacity : 1, avoidTransforms : false}, base.options.transition_speed, function(){ base.afterAnimation(); });
	    		    break;
	    		case 2: case 'slideTop':	// Slide Top (reverse)
	    		    nextslide.animate({top : base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    		    break;
	    		case 3: case 'slideRight':	// Slide Right (reverse)
	    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 4: case 'slideBottom': // Slide Bottom (reverse)
	    			nextslide.animate({top : -base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 5: case 'slideLeft':  // Slide Left (reverse)
	    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 6: case 'carouselRight':	// Carousel Right (reverse)
	    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({left : 0}, 0 ).animate({ left: base.$el.width(), avoidTransforms : false}, base.options.transition_speed );
	    			break;
	    		case 7: case 'carouselLeft':   // Carousel Left (reverse)
	    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({left : 0}, 0 ).animate({ left: -base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
	    			break;
	    	}
		    return false;	
		};
		
		
		/* Play/Pause Toggle
		----------------------------*/
		base.playToggle = function(){
		
			if (/*vars.in_animation || */!api.options.slideshow) return false;		// Abort if currently animating
			
			if (vars.is_paused){
				
				vars.is_paused = false;
				
				// Call theme function for play
				if( typeof theme != 'undefined' && typeof theme.playToggle == "function" ) theme.playToggle('play');
				
				// Resume slideshow
				base.nextSlide();
	        	//vars.slideshow_interval = setTimeout(base.nextSlide, base.options.slide_interval);
	        	  
        	}else{
        		
        		vars.is_paused = true;
        		
        		// Call theme function for pause
        		if( typeof theme != 'undefined' && typeof theme.playToggle == "function" ) theme.playToggle('pause');
        		
        		// Stop slideshow
        		clearTimeout(vars.slideshow_interval);	
       		
       		}
		    
		    return false;
    		
    	};
    	
    	
    	/* Go to specific slide
		----------------------------*/
    	base.goTo = function(targetSlide){
			if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
			
			var totalSlides = base.options.slides.length;
			
			// If target outside range
			if(targetSlide < 0){
				targetSlide = totalSlides;
			}else if(targetSlide > totalSlides){
				targetSlide = 1;
			}
			targetSlide = totalSlides - targetSlide + 1;
			
			clearTimeout(vars.slideshow_interval);	// Stop slideshow, prevent buildup
			
			// Call theme function for goTo trigger
			if (typeof theme != 'undefined' && typeof theme.goTo == "function" ) theme.goTo();
			
			if (vars.current_slide == totalSlides - targetSlide){
				if(!(vars.is_paused)){
					vars.slideshow_interval = setTimeout(base.nextSlide, base.options.slide_interval);
				} 
				return false;
			}
			
			// If ahead of current position
			if(totalSlides - targetSlide > vars.current_slide ){
				
				// Adjust for new next slide
				vars.current_slide = totalSlides-targetSlide-1;
				vars.update_images = 'next';
				base._placeSlide(vars.update_images);
				
			//Otherwise it's before current position
			}else if(totalSlides - targetSlide < vars.current_slide){
				
				// Adjust for new prev slide
				vars.current_slide = totalSlides-targetSlide+1;
				vars.update_images = 'prev';
			    base._placeSlide(vars.update_images);
			    
			}
			
			// set active markers
			if (base.options.slide_links){
				$(vars.slide_list +'> .current-slide').removeClass('current-slide');
				$(vars.slide_list +'> li').eq((totalSlides-targetSlide)).addClass('current-slide');
			}
			
			if (base.options.thumb_links){
				$(vars.thumb_list +'> .current-thumb').removeClass('current-thumb');
				$(vars.thumb_list +'> li').eq((totalSlides-targetSlide)).addClass('current-thumb');
			}
			
		};
        
        
        /* Place Slide
		----------------------------*/
        base._placeSlide = function(place){
    			
			// If links should open in new window
			var linkTarget = base.options.new_window ? ' target="_blank"' : '';
			
			loadSlide = false;
			
			if (place == 'next'){
				
				vars.current_slide == base.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;	// Determine next slide
				
				var targetList = base.el+' li:eq('+loadSlide+')';
				
				if (!$(targetList).html()){
					// If links should open in new window
					var linkTarget = base.options.new_window ? ' target="_blank"' : '';
					
					imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
					var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 
					
					img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');
					
					img.load(function(){
						base._origDim($(this));
						base.resizeNow();
					});	// End Load
				};
				
				base.nextSlide();
				
			}else if (place == 'prev'){
			
				vars.current_slide - 1 < 0  ? loadSlide = base.options.slides.length - 1 : loadSlide = vars.current_slide - 1;	// Determine next slide
				
				var targetList = base.el+' li:eq('+loadSlide+')';
				
				if (!$(targetList).html()){
					// If links should open in new window
					var linkTarget = base.options.new_window ? ' target="_blank"' : '';
					
					imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
					var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 
					
					img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');
					
					img.load(function(){
						base._origDim($(this));
						base.resizeNow();
					});	// End Load
				};
				base.prevSlide();
			}
			
		};
		
		
		/* Get Original Dimensions
		----------------------------*/
		base._origDim = function(targetSlide){
			targetSlide.data('origWidth', targetSlide.width()).data('origHeight', targetSlide.height());
		};
		
		
		/* After Slide Animation
		----------------------------*/
		base.afterAnimation = function(){
			
			// If hybrid mode is on swap back to higher image quality
			if (base.options.performance == 1){
		    	base.$el.removeClass('speed').addClass('quality');
			}
			
			// Update previous slide
			if (vars.update_images){
				vars.current_slide - 1 < 0  ? setPrev = base.options.slides.length - 1 : setPrev = vars.current_slide-1;
				vars.update_images = false;
				$('.prevslide').removeClass('prevslide');
				$(base.el+' li:eq('+setPrev+')').addClass('prevslide');
			}
			
			vars.in_animation = false;
			
			// Resume slideshow
			if (!vars.is_paused && base.options.slideshow){

				vars.slideshow_interval = setTimeout(base.nextSlide, base.options.slide_interval);
				if (base.options.stop_loop && vars.current_slide == base.options.slides.length - 1 ) base.playToggle();
			}
			
			// Call theme function for after slide transition
			if (typeof theme != 'undefined' && typeof theme.afterAnimation == "function" ) theme.afterAnimation();
			
			return false;
		
		};
		
		base.getField = function(field){
			return base.options.slides[vars.current_slide][field];
		};
		
		base.destroy = function(callback){
			clearTimeout(vars.slideshow_interval);
			//$.dtLoading("hide");
			//$("supersized-loader").remove();
			$("#supersized").fadeOut(500, function() {
				$(this).remove();
		
				if (callback) {  
					callback();  
				}
			});
			$("#ps_albums").fadeOut(500);
		}
		
		base.refreshControls = function(){

			var slideDesc = "";
			if (base.options.slides[vars.current_slide].title){
				slideDesc = slideDesc +'<div class="header">'+ base.options.slides[vars.current_slide].title +'</div>';
			}
			if (base.options.slides[vars.current_slide].desc){
				slideDesc = slideDesc +'<p>'+ base.options.slides[vars.current_slide].desc +'</p>';
			}
			if (base.options.slides[vars.current_slide].url){
				slideDesc = slideDesc +'<p class="to-details"><a class="button" href="'+ base.options.slides[vars.current_slide].url +'"><span>Read more</span></a></p>';
			}

			if (base.options.slides.length < 2 && !slideDesc) {
				$(".slider-controls").stop().fadeOut(400);
			} else if (base.options.slides.length < 2 && slideDesc) {
				$(".slider-controls.info").stop().fadeOut(400);
			} else {
				$(".slider-controls:not(.show-hide, .info)").stop().fadeIn(400);
			}
			
			if (base.options.slides.length < 3){
				$(".slider-controls.show-hide").fadeOut(400);
			} else {
				$(".slider-controls.show-hide").fadeIn(400);
			}

			if (slideDesc) {
				$(".info-box-bg").html(slideDesc);
				$(".slider-controls.info").fadeIn(400);
			} else {
				$(".slider-controls.info").fadeOut(400);
			}
			
			refreshCufon();

		}
		
        // Make it go!
        base.init();
		

		// Thumbnails
function exposeThumbnails() {
		
		var nav	= false;
		var first		= 1;
		var positions 	= {
			'0'		: 0,
			'1' 	: 100,
			'2' 	: 200
		}
		var $ps_albums 		= $('#ps_albums');
		/**
		* number of thumbnails available
		*/
		var elems			= $ps_albums.children().length;
		var $ps_slider		= $('#ps_slider');
		
		/**
		* let's position all the albums on the bottom of the window
		*/
		var hiddenBottom	= $(window).height() - $ps_albums.offset().top;
		var hiddenTop		= $ps_albums.offset().top + 100;
		
		$ps_albums.children('div').each(function(i){
			$(this).attr("data-num", i+1).css({
				'top'		: hiddenBottom + 'px',
				'opacity'	: 0
			});
			if (i===vars.current_slide) {
				highliteThumbnail($(this));
			}
		});
		
		/**
		* position first 3 thumbnails to the viewport
		*/
		$ps_albums.children('div:lt(3)').each(
			function(i){
				var $elem = $(this);
				$elem.css({
					'top'		: positions[i] + 'px', 
					'opacity'	: 1
				});
			}
		);

		if (elems > 3) enableNav();
		else disableNav();
	
		/**
		* move to next thumbnails
		*/
		moveNext = function() {
			var hiddenBottom	= $(window).height() - $ps_albums.offset().top;
			var hiddenTop		= $ps_albums.offset().top + 100;
			
			var cnt = 0;
			
			$ps_albums.children('div:lt(3)').each(
	
				function(i){
					$(this).stop().delay(i*120).animate(
						{
							'top'		: - hiddenTop + 'px',
							'opacity'	:0
						},
						470,
						function() {
							var $this = $(this);
	
							$this.detach();
							$this.appendTo($ps_albums);
							
							$this.css({
								'top'		: hiddenBottom + 'px',
								'opacity'	: 0
							});
							
							cnt++;
							
							if (cnt == 3){
								$ps_albums.children('div:lt(3)').each(
									function(i){
										var $elem = $(this);
										$elem.stop().delay(i*120).animate({
											'top'		: positions[i] + 'px', 
											'opacity'	: 1
										}, 470);
									}
								);
								enableNav();
							}
						}
					);
				}
	
			);
		}
		
		/**
		* move to prev thumbnails
		*/
		movePrev = function () {
			var hiddenBottom	= $(window).height() - $ps_albums.offset().top;
			var hiddenTop		= $ps_albums.offset().top + 100;
			
			var cnt = 0;
			
			$ps_albums.children('div:lt(3)').each(
	
				function(i){
					$(this).stop().delay((-i+2)*120).animate(
						{
							'top'		: hiddenBottom + 'px',
							'opacity'	: 0
						},
						470,
						function() {
							var $this = $(this);
							
							cnt++;
							
							if (cnt >= 3){
								for(i=0; i < 3; i++){
									$ps_albums.children('div:last').detach().prependTo($ps_albums);
								}
								
								$ps_albums.children('div:lt(3)').each(
									function(i){
										var $elem = $(this);
										$elem.css({
											'top'		: -hiddenTop + 'px',
											'opacity'	: 0
										});
										$elem.stop().delay((-i+2)*120).animate({
											'top'		: positions[i] + 'px', 
											'opacity'	: 1
										}, 470);
									}
								);
								enableNav();
							}
						}
					);
				}
	
			);
		}
		
		/**
		* disable or enable navigation
		*/
		function disableNav() {
			nav = false;
			$('.prev, .next', $ps_slider).addClass('disabled');
		}
		function enableNav() {
			if(elems > 3) {
				nav = true;
				$('.prev, .next', $ps_slider).removeClass('disabled');
			}
		}
		
		
		$ps_slider.find('.prev, .next').off();
		/**
		* next album
		*/
		$ps_slider.find('.prev').bind('click',function(){				
			if(!nav) return;
			disableNav();
			moveNext();
		});
		
		/**
		* previous album
		*/
		$ps_slider.find('.next').bind('click',function(){
			if(!nav) return;
			disableNav();
			movePrev();
		});
	
	
	
		$(window).on("resize", function() {
			$('.ps_slider').css({
				height			: $(window).height()-6,
				'min-height'	: "650px"
			});
		}).trigger("resize");
		
		$('.ps_photo').each(function () {
			$('span.border', this).css({opacity: 0.3});
	
			var $span = $('> i', this);
	
			if ($.browser.msie && $.browser.version < 9)
				$span.hide();
			else
				$span.css('opacity', 0);
			
			if ($.browser.msie && $.browser.version < 9) {
				$(this).hover(
					function() {
						$span.show();
					}, 
					function() {
						if (!$(this).hasClass("current"))
							$span.hide();
					}
				);
			} else {
				$(this).children('span.border').hover(
					function() {
						$span.stop().fadeTo(300, 0.7);
					}, function() {
						if (!$(this).parents(".ps_album").hasClass("current"))
							$span.stop().fadeTo(300, 0);
					}
				);
			}
		});
		
	
		$(".ps_album").click(function(e){
			e.preventDefault();
			if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
	
			// Go to correspondent slide (suppersized)
			api.goTo($(this).attr('data-num'));
			highliteThumbnail($(this));
		});

		//-------------------------------------------------------

		$("#ps_albums").fadeIn(500, function() {
			$(".inner-desc").each(function() {
				var $this = $(this);
				$this.css({"top" : -($this.outerHeight()-90)/2+"px"})
			});
	
			$(".ps_album").hover(
				function() {
					$(".inner-desc", $(this)).stop().fadeTo(250, 1);
				} , 
				function() {
					$(".inner-desc", $(this)).stop().fadeOut(150);
				}
			);
			initHovers();
			refreshCufon();
			
		});
};

function highliteThumbnail(thumbnail) {
			var $this		= thumbnail,
				$siblings	= $this.siblings();
				
			$siblings.find("i").fadeOut(350);
			$('i', $this).fadeTo(350, 0.7);
			
			$this.addClass("current");
	
			$('a.zoom-two, a.link-two', $this).fadeIn(350);
			
			$siblings.find("a.zoom-two, a.link-two").fadeOut(350);
			
			setTimeout(
				function() {
					$siblings.removeClass("current")
				}
			, 500);
			
}

	};
	
	
	/* Global Variables
	----------------------------*/
	$.supersized.defaultVars = {
	
		// Elements							
		thumb_tray			:	'#thumb-tray',	// Thumbnail tray
		thumb_list			:	'#thumb-list',	// Thumbnail list
		slide_list          :   '#slide-list',	// Slide link list
		
		// Internal variables
		current_slide			:	0,			// Current slide number
		in_animation 			:	false,		// Prevents animations from stacking
		is_paused 				: 	false,		// Tracks paused on/off
		hover_pause				:	false,		// If slideshow is paused from hover
		slideshow_interval		:	false,		// Stores slideshow timer					
		update_images 			: 	false,		// Trigger to update images after slide jump
		options					:	{}			// Stores assembled options list
		
	};
	
	$.supersized.vars = {
	
		// Elements							
		thumb_tray			:	'#thumb-tray',	// Thumbnail tray
		thumb_list			:	'#thumb-list',	// Thumbnail list
		slide_list          :   '#slide-list',	// Slide link list
		
		// Internal variables
		current_slide			:	0,			// Current slide number
		in_animation 			:	false,		// Prevents animations from stacking
		is_paused 				: 	false,		// Tracks paused on/off
		hover_pause				:	false,		// If slideshow is paused from hover
		slideshow_interval		:	false,		// Stores slideshow timer					
		update_images 			: 	false,		// Trigger to update images after slide jump
		options					:	{}			// Stores assembled options list
		
	};
	
	
	/* Default Options
	----------------------------*/
	$.supersized.defaultOptions = {
    
    	// Functionality
		slideshow               :   1,			// Slideshow on/off
		autoplay				:	0,			// Slideshow starts playing automatically
		start_slide             :   1,			// Start slide (0 is random)
		stop_loop				:	0,			// Stops slideshow on last slide
		random					: 	0,			// Randomize slide order (Ignores start slide)
		slide_interval          :   3500,		// Length between transitions
		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	750,		// Speed of transition
		new_window				:	1,			// Image links open in new window/tab
		pause_hover             :   0,			// Pause slideshow on hover
		keyboard_nav            :   0,			// Keyboard navigation on/off
		performance				:	0,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed //  (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			// Disables image dragging and right click with Javascript
												   
		// Size & Position
		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_landscape			:   0,			// Landscape images will not exceed browser width
		fit_portrait         	:   1,			// Portrait images will not exceed browser height  			   
		min_width		        :   0,			// Min width allowed (in pixels)
		min_height		        :   0,			// Min height allowed (in pixels)
		horizontal_center       :   1,			// Horizontally center background
		vertical_center         :   1,			// Vertically center background
		
												   
		// Components							
		slide_links				:	1,			// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	1,			// Individual thumb links for each slide
		thumbnail_navigation    :   0			// Thumbnail navigation
    	
    };
	
	
	
	
    
    $.fn.supersized = function(options){
        return this.each(function(){
            (new $.supersized(options));
        });
    };
		
})(jQuery);

