		// Thumbnails
		
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
	
		enableNav();
	
		/**
		* move to next thumbnails
		*/
		function moveNext () {
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
		function movePrev () {
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
				'min-height'	: "618px"
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
						if ($.browser.msie && $.browser.version < 9)
							$span.hide();
						else
							$span.stop().fadeTo(300, 0);
					}
				);
			} else {
				$(this).children('span.border').hover(
					function() {
						if ($.browser.msie && $.browser.version < 9)
							$span.show();
						else
							$span.stop().fadeTo(300, 0.7);
					}, function() {
						if ($.browser.msie && $.browser.version < 9)
							$span.hide();
						else
							$span.stop().fadeTo(300, 0);
					}
				);
			}
		});
		
		function highliteThumbnail(thumbnail) {
			var $this		= thumbnail,
				$siblings	= $this.siblings();
	
			$this.addClass("current");
			$siblings.removeClass("current");
			
			$siblings.find("a.zoom-two, a.link-two").fadeOut(350);
			$('a.zoom-two, a.link-two', $this).fadeIn(350);
		}
	
		$(".ps_album").click(function(e){
			e.preventDefault();
			if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
	
			// Go to correspondent slide (suppersized)
			api.goTo($(this).attr('data-num'));
			highliteThumbnail($(this));
		});
		
		$(".ps_album").hover(
			function() {
				$(".inner-desc", $(this)).stop().fadeTo(250, 1);
			} , 
			function() {
				$(".inner-desc", $(this)).stop().fadeOut(150);
			}
		);
		//-------------------------------------------------------