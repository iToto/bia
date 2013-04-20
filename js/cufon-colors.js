function initCufon(){
	Cufon('h1, h2, h3, h4, h5, h6', {
	  color: '-linear-gradient(#101010, #464646)'
	});
	Cufon('#nav > ul > li > a', {
	  color: '-linear-gradient(#c3c3c3, #ffffff)'
	});
	Cufon('#nav > ul > li.act > a', {
	  color: '-linear-gradient(#969696, #737373)'
	});
	
	Cufon('.header, .bread-nav a', {
	  color: '-linear-gradient(#101010, #464646)'
	});
	Cufon('.com-info', {
	  color: '-linear-gradient(#c3c3c3, #ffffff)'
	});
	Cufon('.work .head', {
	  color: '-linear-gradient(#c3c3c3, #fff)'
	});
}

function refreshCufon(){
	Cufon('.info-box .header', {
	  color: '-linear-gradient(#101010, #464646)'
	});
	Cufon('.ps_desc h3', {
	  color: '-linear-gradient(#101010, #464646)'
	});
}

jQuery(document).ready(function($){
	initCufon();
});

function cufonComments() {
	Cufon('#form_holder .header', {
		color: '-linear-gradient(#000000, #3b3b3b)'
	});
}

function cufonModal() {
	
	Cufon('.highslide-html .highslide-body:not(.hs-cached) .header', {
		color: '-linear-gradient(#000000, #3b3b3b)'
	});
	Cufon('.highslide-html .highslide-body:not(.hs-cached) h1, .highslide-html .highslide-body:not(.hs-cached) h2, .highslide-html .highslide-body:not(.hs-cached) h3, .highslide-html .highslide-body:not(.hs-cached) h4, .highslide-html .highslide-body:not(.hs-cached) h5, .highslide-html .highslide-body:not(.hs-cached) h6', {
		color: '-linear-gradient(#000000, #3b3b3b)'
	});
}