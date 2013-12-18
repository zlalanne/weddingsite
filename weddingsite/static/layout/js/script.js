var page_items_array = [];
var page_start_hash = '';
var $menu = '';
var $userScrolledPage = '';
	
jQuery(document).ready(function($){
		page_start_hash = getPageID();
			
		hide_menu_elements_for_tablets();
	// pretty Photo
		initPrettyPhoto();
		userScrolledPage();
	
	$(window).scroll(function(){
	
		setup_menu();
		init_menuScrollAutoCheck();
		menuScrollAutoCheck();	
		
	});//scroll

	menuElementsScrollListener();

	contactFormCloseElements();

	flexSliderCaption();
	
	decorative_line();
	
	ajaxForm();
	
	touch_init();

}); // document.ready END

$(window).load(function() {

	// Script setup
		init_menuScrollAutoCheck();		
		
		menuScrollAutoCheck();
		
		hashLinkScrollTo();
	// Script setup END
	
		setupFlexSlider();
  
	// Masonry
		//masonryInit();			
		masonry_tablets_init();
		
		setup_menu();
}); // window.load END

jQuery(window).resize(function() {
	
	hide_menu_elements_for_tablets();
	masonry_tablets_init();

}); // window.resize END

// Masonry code
	masonryEventsListeners();