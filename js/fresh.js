// JavaScript Document
	
		
(function( $ ){

/*$.fn.dtLoaderS = function( action, callback ) {
	return this.each(function(){

		var $this = $(this),
			dtLoaderAction = action || "show",
			dtLoaderData = $this.data('dtLoaderData');

		if ( !dtLoaderData ){
			console.log("init")
			var $dtLoader = $('<div id="dt-loader"><div></div></div>').css( "display" , "none" ).appendTo($this);
			dtLoaderData = $this.data('dtLoaderData', {
				loader : $dtLoader,
				display : $dtLoader.css('display')
			});
		} else {
			$dtLoader = dtLoaderData.loader;
		}

		switch( dtLoaderAction ){
			case 'show':
				$dtLoader.stop().show(dtCallback());
			break;
			case 'hide':
				$dtLoader.stop().hide(dtCallback());
			break;
			case 'destroy':
				dtLoaderData.loader.remove();
				$this.removeData('dtLoaderData');

				console.log( dtLoaderData )
				dtCallback();
			break;
		}
		
		function dtCallback(){
			dtLoaderData.display = $dtLoader.css('display');
			if (typeof callback === "function") callback.call();
		}

	});
	
};*/

/*$.fn.dtLoader = function( action, callback ){
	var $this = $("body"),
		dtLoaderAction = action || "show";

	if ( typeof dtLoaderData === "undefined" ){
		var $dtLoader = $('<div id="dt-loader"><div></div></div>').css( "display" , "none" ).appendTo($this);
		$this.data('dtLoaderData', {
			loader : $dtLoader,
			display : $dtLoader.css('display')
		});
		dtLoaderData = $this.data('dtLoaderData')
	} else {
		$dtLoader = dtLoaderData.loader;
	}

	switch( dtLoaderAction ){
		case 'show':
			$dtLoader.stop().show(dtCallback());
		break;
		case 'hide':
			$dtLoader.stop().hide(dtCallback());
		break;
		case 'destroy':
			dtLoaderData.loader.remove();
			$this.removeData('dtLoaderData');
			dtCallback();
		break;
	}
	
	function dtCallback(){
		dtLoaderData.display = $dtLoader.css('display');
		if (typeof callback === "function") callback.call();
	}
}*/

$.fn.dtLoader = function( action, callback ){
	var $this = $("body"),
		dtLoaderAction = action || "show";

	if ( typeof dtLoaderData === "undefined" ){
		var $dtLoader = $('<div id="dt-loader"><div></div></div>').css( "display" , "none" ).appendTo($this);
		$this.data('dtLoaderData', {
			loader : $dtLoader,
			display : $dtLoader.css('display')
		});
		dtLoaderData = $this.data('dtLoaderData')
	} else {
		$dtLoader = dtLoaderData.loader;
	}

	switch( dtLoaderAction ){
		case 'show':
			$dtLoader.stop().show(dtCallback());
		break;
		case 'hide':
			$dtLoader.stop().hide(dtCallback());
		break;
		case 'destroy':
			dtLoaderData.loader.remove();
			$this.removeData('dtLoaderData');
			dtCallback();
		break;
	}
	
	function dtCallback(){
		dtLoaderData.display = $dtLoader.css('display');
		if (typeof callback === "function") callback.call();
	}
}

})( jQuery );