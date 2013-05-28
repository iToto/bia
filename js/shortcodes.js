// JavaScript Document

/*Toogle*/

function initToggle() {
  if (!('.toggle a.question').length){
	return false;
} else
	$(".toggle a.question").click(function (event) {
		event.preventDefault();
		$(this).toggleClass("act");
		$(this).next("div.answer").slideToggle("fast");

	});
}

function initAccordion() {
	// simple accordion
	jQuery('#list1a').accordion();
	jQuery('#list1b').accordion({
		autoheight: false
	});

	// second simple accordion with special markup
	jQuery('#navigation').accordion({
		active: false,
		header: '.head',
		navigation: true,
		event: 'mouseover',
		fillSpace: true,
		animated: 'easeslide'
	});

	//width for accordion span
	$('.accord a').each(function(){
		var w_a = $(this).width();

		if ($.browser.msie && $.browser.version < 8)
			$('span', this).css({
				width:w_a-60
			})
		else{
			$('span', this).css({
				width:w_a-30
			})
		}
	})



}

/*Tabs*/
function initTabs() {
  $("#tab").organicTabs({
	  "speed": 200
  });

}

  /*Tooltip*/

 function simple_tooltip(target_items, name){
 $(target_items).each(function(i){
		$("body").append("<div class='"+name+"' id='"+name+i+"'>"+$(this).find('span.tooltip_c').html()+"</div>");
		var my_tooltip = $("#"+name+i);

		$(this).removeAttr("title").mouseover(function(){
					my_tooltip.css({opacity:1, display:"none"}).fadeIn(400);
		}).mousemove(function(kmouse){
				var border_top = $(window).scrollTop();
				var border_right = $(window).width();
				var left_pos;
				var top_pos;
				var offset = 15;
				if(border_right - (offset *2) >= my_tooltip.width() + kmouse.pageX){
					left_pos = kmouse.pageX+offset;
					} else{
					left_pos = border_right-my_tooltip.width()-offset;
					}

				if(border_top + (offset *2)>= kmouse.pageY - my_tooltip.height()){
					top_pos = border_top +offset;
					} else{
					top_pos = kmouse.pageY-my_tooltip.height()-2.2*offset;
					}

				my_tooltip.css({left:left_pos, top:top_pos});
		}).mouseout(function(){
				my_tooltip.css({left:"-9999px"});
		});
	});
}


	/* $(".cont_butt").click(function ()
	 {
	    //$("#order_form").submit();
	    return false;
	 });
      if ($.validationEngine) {
         $(".valForm, .uniform").each(function () {
            return;
            if ( $(this).attr("valed") ) return;
            $(this).attr("valed", "1").validationEngine({
               ajaxSubmit: true,
               ajaxSubmitFile: window.location.href
            });
         });
      }*/


/*Carousel*/
function initCarousel() {


	$(".carouFredSel_1").each(function(){
		$(this).carouFredSel({
			prev: $(this).next(),
			next: $(this).next().next(),
			pagination: false,
			auto: false,
			scroll: 1
		});
	});


};
