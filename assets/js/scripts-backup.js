(function($) {

var $window = $(window),
	window_height = $window.height(),
	$glass_posts = $('#glass-posts'),
	$page_number = $('.page-number'),
	$prev = $('.older-posts'),
	$next = $('.newer-posts'),
	$navbar = $('.glass-nav'),
	$header_wrapper = $('.glass-header-wrapper'),
	$captions = $('.caption'),
	$all_videos = $('iframe[src*="//www.youtube.com"], iframe[src*="//player.vimeo.com"]'),
	navbar_height = $navbar.outerHeight(),
	scrolled = false,
	last_scroll_top = 0,
	required_scroll = 20,
	window_width = $window.width();



/* Page Setup
============================================== */

// adds end mark to end of posts
function add_end_mark() {
	var $wrapper = $('.glass-post-content'),
		$last_element = $wrapper.children().last();

	if ($last_element.is('p')) {
		$last_element.append(' &#8718;');
	} else {
		$wrapper.append('<hr class="endpost">');
	}
}

function set_subtitle() {
	var $subtitle = $('#subtitle'),
		$headline = $('.glass-headline');

	$subtitle.remove();
	$headline.after($subtitle);

}

function center_title() {
	// reset header wrapper css, then re-center the header wrapper
	$header_wrapper.css({
		margin: 0,
		width: 'auto',
		left: 'auto',
		bottom: 'auto'
	}).css({
		top: Math.floor((navbar_height + window_height - $header_wrapper.outerHeight()) / 2),
		left: Math.floor((window_width - $header_wrapper.outerWidth()) / 2)
	});
}

// set header height
function set_header_height() {
	// set cover height to window height
	$('.glass-header').height(window_height);
}

// sets up cover image
function set_cover_image() {
	var $cover = $('img[src$="#cover"]');

	set_header_height();

	if ($cover.length) {
		var cover_url = $cover.attr('src');
		// remove <p> tags
		$cover.parent().remove();
		// set the new cover image
		$('.glass-cover-image, .glass-cover-image-back').css('backgroundImage', 'url(' + cover_url + ')');
	}
}


/* Responsivity
============================================== */

// strips iframes of their height/width attributes
function responsive_video_setup() {
	$all_videos.each(function() {
	    var $el = $(this);
	    $el.data('aspectRatio', $el.attr('height') / $el.attr('width'))
	    	.height($el.width() * $el.data('aspectRatio'));
	});
	// check if videos need resize
	window.requestAnimationFrame(resize_videos);
}

/* MAIN FUNCTIONS
============================================== */

// when down arrow (.glass-scroll-button) is clicked
// when navigating to a new page
function page_scroll(scrollto, speed, callback) {
	$('html,body').stop().animate({ scrollTop: scrollto }, speed, callback);
}

function toggle_navbar() {
	var top = $window.scrollTop();

	// return if less than required_scroll
	if (Math.abs(last_scroll_top - top) <= required_scroll) {
		return;
	}

	// if current position > last position AND scrolled past cover page...
	if (top > last_scroll_top && top > window_height - navbar_height){
		// scroll Down
		$navbar.addClass('glass-nav-up');
	} else if (top + window_height < $(document).height()) { 
		$navbar.removeClass('glass-nav-up');
	}

	last_scroll_top = top;
}

// animates the header, not called on mobile
function animate_header() {
	// call this function whenever the browser has a sec
    window.requestAnimationFrame(animate_header);

	var pos = Math.abs($window.scrollTop()),
		alpha = ((window_height - 1.5 * pos) / window_height).toFixed(2),
		speed = 0.3;

	if (alpha < 0) {
		alpha = 0;
	}

	if (pos < window_height) {
		$('.glass-header-wrapper, .glass-scroll-button').css({
			'transform': 'translate3d(0,' + (speed * pos).toFixed(2) + 'px,0)',
			'opacity': alpha
		});
		$('.glass-cover-image').css('opacity', alpha);
	}
}


// resizes iframes to fit container
function resize_videos() {

	window.requestAnimationFrame(resize_videos);

	var old_vid_width = $all_videos.first().width(),
		new_vid_width = $('.glass-post-body .glass-wrapper').width();

	if (new_vid_width !== old_vid_width) {
		$all_videos.each(function() {
		    var $el = $(this);
		    $el.width(new_vid_width).height(new_vid_width * $el.data('aspect_ratio'));
		});
	}

}

function resize_captions() {

	if ($captions.length) {
		$captions.each(function() {
			var $this = $(this);

			$this.find('img').on('load', function() {
				var new_caption_width = $(this).width();
				$this.width(new_caption_width);
			});
		});
	}
}

function update_pagination($new_page) {
		// get html of new page
	var new_page_links = $new_page.find('.pagination'),
		// get new previous link
	 	$new_page_prev = $('.older-posts', new_page_links),
		// get new next link
		$new_page_next = $('.newer-posts', new_page_links),
		// get new page number
		new_page_number = $('.page-number', new_page_links).html(),
		$new_href_prev = $new_page_prev.attr('href'),
		$new_href_next = $new_page_next.attr('href');


	if ( ! $new_page_prev.attr('href') ) {
		$prev.addClass('hidden');
	} else {
		$prev.removeClass('hidden');
	}

	if ( ! $new_page_next.attr('href') ) {
		$next.addClass('hidden');
	} else {
		$next.removeClass('hidden');
	}

	$page_number.html(new_page_number);
	$prev.attr('href', $new_href_prev);
	$next.attr('href', $new_href_next);
}

function update_title(new_title) {
	$('title').html(new_title);
}

function update_history(link, new_title) {
	history.pushState({
		slug: location.pathname.replace('/', '')
	}, new_title, link);
}

function update_page(new_title, $new_page, new_page_body) {

	// update title w/ page number
	update_title(new_title);
	// update pagination
	update_pagination($new_page);
	// change page body
	$glass_posts.html(new_page_body);

}

function page_transition(link, scrollto, popstate) {

	// default popstate is false
	if(typeof(popstate) === 'undefined') {
		popstate = false;
	}

	$.get(link, function(new_page) {
		var $new_page = $(new_page),
			new_posts = $('#glass-posts', $new_page).first().html(),
			new_title = $new_page.filter('title').text();

		// if not reached via browser back/forward
		if (!popstate) {

			// update the browser history
			update_history(link, new_title);

			// scroll to top, then load new page content
			$glass_posts.animate({ 'opacity': 0 }, 200, function() {
				page_scroll(scrollto, 500, function() {

					update_page(new_title, $new_page, new_posts);

					$glass_posts.animate({ 'opacity': 1 }, 200);
				});
			});

		} else {
			update_page(new_title, $new_page, new_posts);
		}
	});
}

function glass_smooth_scroll() {
	// Smooth scrolling hash links
	// via http://css-tricks.com/snippets/jquery/smooth-scrolling/
	$('a[href*=#]:not([href=#])').click(function(e) {
		e.preventDefault();
	    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				page_scroll(target.offset().top, 1000);
				update_history(this.hash,document.title);
			}
	    }
	});
}

// called if window is resized
function resize_window() {
	var new_window_width = $window.width(),
		new_window_height = $window.height();

	if (new_window_width === window_width && new_window_height === window_height) {
		return;
	}

	// set new window width variable
	window_width = new_window_width;
	window_height = new_window_height;

	// reset header height and center the title
	set_header_height();
	center_title();
}

function init() {

	// sets the initial app state if there isn't one set (e.g. after reload)
	if (typeof history.replaceState !== 'undefined') {
		history.replaceState({
			slug: location.pathname.replace('/', '')
		}, null, null);
	}

	// set the cover image
	set_cover_image();
	// set subtitle
	set_subtitle();
	// center title
	center_title();
	// append end marks to posts
	add_end_mark();
	// resize captions to img width...
	resize_captions();
	// set smooth scrolling
	glass_smooth_scroll();
	// setup responsive videos
	responsive_video_setup();

	// prevent aminations on mobile
	if (window_width > 768) {

		// animate the header on scroll
		window.requestAnimationFrame(animate_header);

		// used to toggle navbar on scroll
		$window.scroll(function() {
			scrolled = true;
		});

		// checks navbar every 200ms for changes
		setInterval(function() {
			if (scrolled) {
				toggle_navbar();
				scrolled = false;
			}
		}, 200);
	}


	$window.resize(function() {
		resize_window();
	});

	$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function() {
		resize_window();
	});

	// next and previous page action
	$prev.add($next).click(function(e) {
		var scrollto = window_height - navbar_height;
		e.preventDefault();
		// page_transition WIHTOUT popstate
		page_transition(e.target.href, scrollto);
	});

	// browser's back/forward buttons
	window.onpopstate = function() {
		var link = location.href;
		// page_transition WITH popstate (only triggered with browser back/forward buttons)
		page_transition(link, null, true);
	};
}

init();

})(jQuery);



/* Plugins/Shims
============================================== */

// window.requestAnimationFrame() Shim
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
  	}
 
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

// END window.requestAnimationFrame() Shim
