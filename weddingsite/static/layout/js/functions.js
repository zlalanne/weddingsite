// =============== Scroll functions =============== //

	// menu elements scroll evens
		function menuElementsScrollListener(){
			$('.navigation_main ul.nav a, .scroll_to').click(function(e){
				var item = $(this);
				var targetID = item.attr('href')
				scrollToPage(item);
				
				var menu_collapsed = item.parents('.menu_collapsed').eq(0);
				if( menu_collapsed.size() > 0 && !item.hasClass('mobile_menu_logo_a')){
					$('#collapse_button').click();
				}
				
				e.preventDefault();
				//return false;
			});
			
			$('.header_arrow_button').click(function(e){		
				scrollToPage($(this));
				e.preventDefault();
			});
			
		}

	// init_menuScrollAutoCheck - creates array of page location (offset). Used only for correct menu selection. 
		//ScrollToPage uses its own offset values.
		function init_menuScrollAutoCheck(){
			$('.page-item-class').each(function(i){
				var item = $(this);
				page_items_array[i] = [];
				page_items_array[i][0] = item.attr('id');
				page_items_array[i][1] = item.offset().top;
			});
		}

	// hashLinkScrollTo - checks if page hash exists and scroll to the page
		function hashLinkScrollTo(){		
			var containerW = $('.container').width();
			var hash = location.hash;
			if( hash ){
				if( !page_start_hash ){
					hash = getPageID(getPageID);
				}else{
					hash = page_start_hash;
				}
				if( containerW > 940 && !$userScrolledPage ){
					scrollToPage('' , $('#' + hash));
				}
			}
		}

	// getPageID - extract page ID from hash
		function getPageID(){
			var hash = location.hash;
			if( page_start_hash ) hash = page_start_hash;
			hash = hash.slice(1);
			hash = hash.split('=');
			return hash[1];
		}
		
	// setPageID - adds page ID to hash string. Supports "#page1" and "page1" formats.
		function setPageID(id){
			if(id){
				if( id.indexOf('#') != -1 ){
					id = id.slice(1);
				}
				location.hash = '#page_id=' + id;
				return location.hash;
			}else{
				return 'No ID given';
			}
		}
		
	// pageHashID - Toggle formats page ID. Adds # if ID has no. Or remove if it has.
		function pageHashID(id){
			if(id){
				if( id.indexOf('#') != -1){ // # exisits, remove it
					return id.slice(1);
				}else{ // add #
					return '#' + id;
				}
			}
		}
		
	// scrollToPage - scrolls window to selected page. Recount its own offset value.
		function scrollToPage( link_item , target_id ){
			if( link_item || target_id){	
				if( link_item && !link_item.hasClass('dropdown-toggle') || target_id){
					if(link_item){
						target_id = link_item.attr('href');
					}else{
						target_id = target_id;
					}
					var the_offset = $(target_id).offset();
					if( the_offset ){
						var scrollSpeed = 0;
						var containerW = $('.container').width();
						var offset_minus_value = 66;
						
						if( containerW > 940 ){
							scrollSpeed = 500;
						}
						
						var menu_collapsed = $('.menu_collapsed').eq(0);
						if( menu_collapsed.size() > 0){
							offset_minus_value = 50;
						}
					
						var top_offset = the_offset.top;
						top_offset = top_offset - offset_minus_value;
						if(top_offset <= 0 ){
							top_offset = 0;
						}
						$(window).scrollTo( top_offset , scrollSpeed);
					}
				}
			}
		}
		
	// Menu auto select for scrolling
		function menuScrollAutoCheck(){
			var item = $(this);
			var scrollTop = item.scrollTop();
			var pages = $(page_items_array);
			var active_state_set = '';
			var this_page_is_set = '';
			
			pages.each(function(i, val){
				if(scrollTop <= 0 ) scrollTop = 0;
				
				//if( scrollTop >= (val[1] - 132)){
				if( scrollTop >= (val[1] - 232)){
					$('.navbar-inner .active').removeClass();
					$( 'a[href="#' + val[0] + '"]' , $('.navbar-inner') ).parent().addClass('active');
					active_state_set = true;
					this_page_is_set = val[0];			
				}
			});
			if( this_page_is_set ){
				setPageID(this_page_is_set);
			}
			if(!active_state_set){
				$('.navbar-inner .active').removeClass();
				$('.navbar-inner li:first').addClass('active');
			}
			
		}// Menu auto select for scrolling END

	// Check user scrolled page
		function userScrolledPage(){
			$(window)
				.bind('mousewheel', function(event, delta) {
					$userScrolledPage = true;
				});
		}
		
// =============== Scroll functions END =============== //


// =============== Tablets functions =============== //

	// hide menu elements for tablets - hides .hide-me-in-drop-down-for-tablets in dropdown menu.
		function hide_menu_elements_for_tablets(){
			
			var tablet_drop_down = $('.tablet_drop_down');
			var containerW = $('.container').width();
			
			if(tablet_drop_down.size() > 0){
				var elements_to_hide = $('li:has(a.hide-me-in-drop-down-for-tablets)');
				if( containerW <= 940 && containerW >= 724){ //put elements into dropdown
				
					if(elements_to_hide.size() > 0){
						if( tablet_drop_down.find('.hide-me-in-drop-down-for-tablets').size() == 0 ){ // hide-dropdown is empty
							tablet_drop_down.show().find('.dropdown-menu').html(elements_to_hide);
						}
					}		
				}else{ // put them back
					if(elements_to_hide.size() > 0){
						if( tablet_drop_down.find('.hide-me-in-drop-down-for-tablets').size() > 0 ){ // hide-dropdown is empty
							$('.navbar ul.nav').append(elements_to_hide);
							tablet_drop_down.hide().find('.dropdown-menu').html('<li>&nbsp;</li>');
						}
					}	
				}
			}
			
			if( containerW < 724 ){ // collapse menu
				$('#collapse_element').addClass('nav-collapse').css({height: '0'});
				$('#collapse_button').show();
				$('.navbar_container').parents('.navigation_main_wrapper').addClass('menu_collapsed');
			}else{ //expand menu
				$('#collapse_element').removeClass('nav-collapse').css({height: 'auto'});
				$('#collapse_button').hide();
				$('.navbar_container').parents('.navigation_main_wrapper').removeClass('menu_collapsed');
			}
		}

// =============== Tablets functions END =============== //

// =============== Pretty photo functions =============== //

	function initPrettyPhoto(){
		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
			deeplinking : false,
			hook: 'data-rel',
			keyboard_shortcuts : true,
			social_tools: ''
		});
	}
// =============== Pretty photo functions END =============== //


// =============== Menu setup =============== //

	// checks if menu should be fixed
		function setup_menu(){

            if(!$menu) $menu = $(".navigation_main");
            if(typeof window.static_navbar === "undefined" || window.static_navbar === false) {

                if ( $(window).scrollTop() > 945 && !$menu.hasClass("navbar-fixed-top") ){
                    $menu.addClass("navbar-fixed-top");
                } else if($(window).scrollTop() <= 945 && $menu.hasClass("navbar-fixed-top")) {
                    $menu.removeClass("navbar-fixed-top");
                }
            } else {
                $menu.addClass("navbar-fixed-top");
            }
        }
		
// =============== Menu setup END =============== //

// =============== Flex slider functions =============== //

	function flexSliderCaption(){
		$('.flexslider .slides li')
			.mouseenter(function(){
				$(this).find('.flex-caption').stop().animate({
						opacity : 1
					} , 500);
			})
			.mouseleave(function(){
				$(this).find('.flex-caption').stop().animate({
						opacity : 0
					} , 500);
			});	
	}
	
	function setupFlexSlider(){
		 $('.flexslider').flexslider({
			animation: "slide",                
			slideshow: false,
			startAt: 0
		  });
	}
	
// =============== Flex slider functions END =============== //

// =============== Contact form functions =============== //

	function contactFormCloseElements(){
		$('.form_close_elements').click(function(){
			var parentElement = $(this).parents('.form_container');
			if( parentElement.hasClass('is_closed') ){
				parentElement.animate({
						left : '0'
					}, 500, function(){
						parentElement.removeClass('is_closed');
					}
				);
			}else{
				parentElement.animate({
						left : '-370px'
					}, 500, function(){
						parentElement.addClass('is_closed');
					}
				);
			}
		});
	}

// =============== Contact form functions END =============== //

// =============== Masonry functions =============== //

	function masonry_tablets_init(){
		var isotop_item_parent = $('.isotop_item');
		var iso_container = $('#iso_container');
		var containerW = $('.container').width();
		
		if(isotop_item_parent.size() > 0){		
			if( containerW <= 940 ){ // make masonry vertical			
				if( !isotop_item_parent.hasClass('vertical') ){ // check if is not vertical yet
				
					if( iso_container.hasClass('isotope') ){ // if isotope is on - then destroy it
						iso_container.isotope( 'destroy' );
					}
					
					// reinstall masonry vertical
					isotop_item_parent.removeClass('horizontal').addClass('vertical');
					iso_container.isotope({
					  // options
						itemSelector : '.item', 						
						resizesContainer: true,						
						animationEngine: 'jquery'
					}).css({ left : 0});
					
				}				
			}else{ // make masonry horizontal				
				if( !isotop_item_parent.hasClass('horizontal') ){// check if is not horizontal yet
				
					if( iso_container.hasClass('isotope') ){ // if isotope is on - then destroy it
						iso_container.isotope( 'destroy' );
					}
				
					// reinstall masonry horizontal
					isotop_item_parent.removeClass('vertical').addClass('horizontal');
					iso_container.isotope({
					  // options
						itemSelector : '.item', 
						layoutMode: 'masonryHorizontal',
						
						resizesContainer: true,
						
						animationEngine: 'jquery'
					});
				}				
			}
		}
		
	}
	
	function masonryEventsListeners(){
		$('.isotop_item_inner .item.isotope-item')
			.live('mousedown' , function(e){
				e.preventDefault();
			})
			.live('mouseenter' , function(e){
				var item = $(this);
				//var itemLeft = item.offset().left;
				//var itemTop = item.offset().top;
				var imageHoverElement = item.find('.image_hover_zoom_element');
				var itemW = item.width();
				var itemH = item.height();
			
				$('.iso_item_hovered' , $('.isotop_item_inner')).removeClass('iso_item_hovered');
				item.addClass('iso_item_hovered');
				imageHoverElement			
					.css({
						width: itemW - 22,
						height: itemH - 22
					})
					.show();
					//.offset({ top: itemTop, left: itemLeft })
				
			}).live('mouseleave', function(e){
				var item = $(this);
				var imageHoverElement = item.find('.image_hover_zoom_element');
				
				imageHoverElement.hide();
			});
			
		$('.isotop_item_inner')			
			.live('mousedown' , function(e){
				var containerW = $('.container').width();
				
				if( containerW > 940 ){
					var item = $(this);
					var startOffset = e.pageX;
					var itemLeft = parseInt(item.css('left'));
					var parentWidth = item.parents('.isotop_item.horizontal').width();
					
					item.bind('mousemove' , function(event){
						if(!itemLeft) itemLeft = 0;
						
						var containerOffsetLeft = $('.isotop_item.horizontal').offset().left;
						var leftPosition = ((startOffset - event.pageX) * -1) + itemLeft;
						var rightBorderValue = (item.width() - parentWidth) * -1;
						
						// Check drag borders
						if( leftPosition > 0 ) leftPosition = 0;
						if( leftPosition < rightBorderValue) leftPosition = rightBorderValue;
						// Check drag borders END
						item.stop().css({
							left : leftPosition
						});
					});
				}
			}).live('mouseup' , function(e){
				var item = $(this);
				item.unbind('mousemove');
			}).live('mouseleave' , function(e){
				//var item = $(this);
				//item.unbind('mousemove');
			});
			
			$(document).live('mouseup' , function(e){
				$('.isotop_item_inner').unbind('mousemove');
			});
	}

	function masonryInit(){
		$('#iso_container').isotope({
		  // options
			itemSelector : '.item', 
			layoutMode: 'masonryHorizontal',
			
			resizesContainer: true,
			
			animationEngine: 'jquery'
		});
	}
	
// =============== Masonry functions END =============== //


// =============== Other elements =============== //
	function decorative_line(){
		$('.decorative_line').each(function(){
			var item = $(this);
			var parent = item.parent();
			var itemW = item.width();
			var itemH = item.height();
			var parentW = parent.width();
			var lineW = ((parentW - itemW) - 80) / 2;
			var lineL = lineW + 40;
			var lineR = lineW + 40;
			var lineTop = itemH / 2;
			
			item.append('<div class="decorative_line_pre" style="width:' + lineW + 'px;left:-' + lineL + 'px;top:' + lineTop + 'px"></div><div class="decorative_line_after" style="width:' + lineW + 'px;left:auto;right:-' + lineR + 'px;top:' + lineTop + 'px"></div>');
		});
	}
// =============== Other elements END =============== //

// =============== Ajax form =============== //

		function ajaxForm () {
			jQuery('#contact_form').ajaxForm(function() { 
				alert('Your message has been sent!');
				jQuery('#contact_form').resetForm();
			});
		}

// =============== Ajax form END =============== //


// =============== Touch handlers =============== //
	
	function touchHandler(event){
		var touches = event.changedTouches,
			first = touches[0],
			type = "";
			
		var node = first.target;
		var jNode = $(node);
		
			 switch(event.type)
		{
			case "touchstart": type = "mousedown"; break;
			case "touchmove":  type="mousemove"; break;        
			case "touchend":   type="mouseup"; break;
			default: return;
		}

				 //initMouseEvent(type, canBubble, cancelable, view, clickCount,
		//           screenX, screenY, clientX, clientY, ctrlKey,
		//           altKey, shiftKey, metaKey, button, relatedTarget);
		
		var simulatedEvent = document.createEvent("MouseEvent");
		simulatedEvent.initMouseEvent(type, true, true, window, 1,
								  first.screenX, first.screenY,
								  first.clientX, first.clientY, false,
								  false, false, false, 0/*left*/, null);

		first.target.dispatchEvent(simulatedEvent);		
		
	}

	function touch_init(){
		document.addEventListener("touchstart",   touchHandler, true);
		document.addEventListener("touchmove",  touchHandler, true);
		document.addEventListener("touchend",     touchHandler, true);
		document.addEventListener("touchcancel", touchHandler, true);    
	}

// =============== Touch handlers END =============== //