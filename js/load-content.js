// JavaScript Document

// Dream-Theme GLOBAL data container
 window.DT		= {}; // Container
		DT.fn	= {}; // Functions
		DT.$	= {}; // Links for jQuery objects
		DT.v	= {}; // Variables

// Core functions
DT.fn.hideContent = function(callback) {
	DT.$.holder.addClass("content-hidden").stop().animate({
		"height" : 0
	}, {
		duration: 500,
		complete: function() {
			$(".plus-min a").removeClass("act");
			if (callback) {  
				callback();  
			}
		}
	});
}

DT.fn.showContent = function(delay) {
	var delay = delay || 0;

	DT.$.holder.removeClass("content-hidden").stop().delay(delay).animate({
		"height" : 350
	}, {
		duration: 500,
		complete: function() {
			$(".plus-min a").addClass("act");
		}
	});
}

DT.fn.showBasic = function(delay) {
	var delay = delay || 0;

	DT.$.controlsBasic.stop().delay(delay).animate({
		"top" : 0
	}, 500);
	DT.$.controlsAdvanced.stop().delay(delay).animate({
		"right" : DT.v.controlsAdvancedRight
	}, 500);
}

DT.fn.showAdvanced = function(delay) {
	var delay = delay || 0;

	DT.$.controlsBasic.stop().delay(delay).animate({
		"top" : DT.v.controlsBasicTop
	}, 500);
	DT.$.controlsAdvanced.stop().delay(delay).animate({
		"right" : 0
	}, 500);
}

DT.fn.hideControls = function(delay) {
	var delay = delay || 0;
	
	DT.$.controlsBasic.stop().delay(delay).animate({
		"top" : DT.v.controlsBasicTop
	}, 500);
	
	DT.$.controlsAdvanced.stop().delay(delay).animate({
		"right" : DT.v.controlsAdvancedRight
	}, 500);
}

DT.fn.toggleContent = function() {
	if (DT.$.holder.hasClass("content-hidden")) {
		DT.fn.showContent();
		DT.fn.showBasic();
	} else {
		DT.$.holder.addClass("content-hidden");
		DT.fn.hideContent();
		//DT.fn.showAdvanced();
	}
}

DT.fn.showAll = function(delay) {
	var delay = delay || 0;
	
	DT.$.superslides	= $("#superslides");
	DT.v.doContent		= DT.$.superslides.attr("data-content")	|| "auto";
	DT.v.doControls		= DT.$.superslides.attr("data-controls") || "auto";
	
/*	console.log(DT.$.superslides)
	console.log("content: "+DT.v.doContent)
	console.log("controls: "+DT.v.doControls)
	console.log("-------------------------")*/

	if (DT.v.doContent == "show"){
		DT.fn.showContent(delay);
	} else if (DT.v.doContent == "hide") {
		DT.$.holder.addClass("content-hidden");
	} else {
		if (DT.v.doControls == "advanced") {
			DT.$.holder.addClass("content-hidden");
		} else {
			DT.fn.showContent(delay);
		}
	}
	
	if (DT.v.doControls == "basic") {
		DT.fn.showBasic(delay);
	} 
	else if (DT.v.doControls == "advanced"){
		DT.fn.showAdvanced(delay);
	} else {
		if (DT.$.superslides.find("a").length <= 1){
			DT.fn.hideControls(delay);
		} else if ( (DT.$.superslides.find("a").length > 1) && (DT.v.doContent != "hide") ) {
			DT.fn.showBasic(delay);
		} else if ( (DT.$.superslides.find("a").length > 1) && (DT.v.doContent == "hide") ) {
			DT.fn.showAdvanced(delay);
		}
	}
}

DT.fn.loadContent = function() {
	$(window).hashchange(function(){
		var winHash = location.hash;

		if (/#!\//.test(winHash) || !winHash){
			var page_path = winHash.replace(/#!\//,"") || location.href,
				ajax_url = page_path+" #content";

			$.dtLoading('show');

			$("#nav > ul li").removeClass("act");

			$("#nav > ul li").find("a[href='"+page_path+"']").parents("li").addClass("act");

			DT.fn.hideContent(function() {
				$("#content-holder").load(ajax_url, function(data){
					dtInit();
					DT.fn.showAll();
					//DT.fn.showContent();
					//DT.fn.showBasic();
				});
			});
		}
	});
}

jQuery(document).ready(function($){
	
	var winHash = location.hash;
	if (/#!\//.test(winHash)){
		location.href = winHash.replace(/#!\//,"");
	}

	DT.fn.loadContent();
	
	DT.$.holder = $("#holder");

	DT.$.controlsBasic		= $("#controls-basic");
	DT.v.controlsBasicTop	= DT.$.controlsBasic.css("top");

	DT.$.controlsAdvanced 		= $("#ps_slider"),
	DT.v.controlsAdvancedRight	= DT.$.controlsAdvanced.css("right");

	DT.$.supercontrols	= $("#supercontrols");

/* on Document load: begin */
	DT.fn.showAll(1000);
/* on Document load: end */
	
	$(".show-hide.show").on("click", function(e) {
		e.preventDefault();
		DT.fn.showAdvanced();
		DT.fn.hideContent();
	});
	
	$(".show-hide.hide").on("click", function(e) {
		e.preventDefault();
		DT.fn.showBasic();
		//DT.fn.showContent();
	});

	$(".plus-min a").on("click", function(e) {
		e.preventDefault();
		DT.fn.toggleContent();
	});
	
	/* Ajax content loader: begin */
	/* Loads a page from a "href" and pushes "#content" to "#content-holder" */
	$("#nav:not(.ignore-ajax) ul a:not(.ignore-ajax)").click(function(e){
		e.preventDefault();
	
		var $this = $(this),
			page_path = $this.attr("href");
		
		$this.trigger("mouseleave");

		location.hash = "!/"+page_path;
	
//		$this.parents("ul").find("li").removeClass("act");
//		$this.parents("li").addClass("act");

/*		DT.fn.hideContent(function() {
			$("#content-holder").load(ajax_url, function(data){
				dtInit();
				DT.fn.showAll();
				//DT.fn.showContent();
				//DT.fn.showBasic();
			});
		});
*/
	});

});