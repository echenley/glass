// @codekit-prepend "modules/dom-delegate.js"
// @codekit-prepend "modules/smooth-scroll.js"
// @codekit-prepend "modules/viewport-units-buggyfill.js"
// @codekit-append "modules/classlist-shim.js"
// @codekit-append "modules/requestAnimationFrame-shim.js"
// @codekit-append "modules/prism.js"


var glassApp = (function($) {

    /* ============================
     *  Page Setup
     * ============================ */

    var pageSetup = (function() {

        // stores interval timer ID for video resize
        var resizeVideosLoop;
        // stores animationFrame ID for header animation
        var animateHeaderLoop;

        function addEndMark() {
            // appends a tombstone to the article
            var postContent = $('.glass-post-content', true);

            if (postContent) {
                var lastElement = postContent.lastElementChild,
                    endPost = document.createElement('hr');
                endPost.className = 'endpost';

                if (lastElement.nodeName === 'P') {
                    var text = document.createTextNode(' \u220E');
                    lastElement.appendChild(text);
                }

                postContent.appendChild(endPost);
            }
        }

        function setAnimateHeader() {
            if (animateHeaderLoop) {
                window.cancelAnimationFrame(animateHeaderLoop);
            }
            animateHeader();
        }

        function animateHeader() {
            // sets up the fade effect on scroll
            // via requestAnimationFrame loop
            animateHeaderLoop = window.requestAnimationFrame(animateHeader);

            var headerWrapper = $('.glass-header-wrapper', true),
                scrollButton = $('#glass-scroll-button', true),
                windowHeight = window.innerWidth,
                pos = Math.abs(window.pageYOffset),
                alpha = ((windowHeight - 2 * pos) / windowHeight).toFixed(2),
                speed = 0.4;

            alpha = alpha < 0 ? 0 : alpha;

            if (pos < windowHeight) {
                var newPos = (speed * pos).toFixed(2);

                // animate the header wrapper
                headerWrapper.style.transform = 'translate3d(0,' + newPos + 'px,0)';
                headerWrapper.style.webkitTransform = 'translate3d(0,' + newPos + 'px,0)';
                headerWrapper.style.opacity = alpha;

                // animate the scroll button
                scrollButton.style.transform = 'translate3d(0,' + newPos + 'px,0)';
                scrollButton.style.webkitTransform = 'translate3d(0,' + newPos + 'px,0)';
                scrollButton.style.opacity = alpha;
            }
        }

        function setCoverImage() {
            // Glass-theme specific - gets first image with #cover in the src
            var newImage = $('img[src$="#cover"]', true);
            if (newImage) {
                $('#glass-cover-image', true).style.backgroundImage = 'url("' + newImage.src + '")';
                newImage.parentNode.removeChild(newImage);
            }
        }

        function setSubtitle() {
            // grabs #subtitle from post content and moves it to the header
            var subtitle = $('#subtitle', true);
            if (subtitle) {
                $('.glass-header-wrapper', true).appendChild(subtitle);
            }
        }

        function centerTitle() {
            // vertically centers .glass-header-wrapper
            var headerWrapper = $('.glass-header-wrapper', true),
                headerHeight = $('.glass-header', true).offsetHeight;
            // set top margin
            headerWrapper.style.marginTop = (headerHeight - headerWrapper.offsetHeight) / 2 + 'px';
        }

        function resizeVideos(videos) {
            var oldWidth = videos[0].offsetWidth,
                newWidth = videos[0].parentNode.offsetWidth;

            if (oldWidth !== newWidth) {
                for (var i = 0; i < videos.length; i++) {
                    var video = videos[i],
                        aspectRatio = video.dataset ? video.dataset.aspectRatio : video.getAttribute('data-aspect-ratio');

                    video.style.width = newWidth + 'px';
                    video.style.height = newWidth * aspectRatio + 'px';
                }
            }
        }

        function setResponsiveVideo() {
            // get all the videos
            var videos = document.querySelectorAll('iframe[src*="//www.youtube.com"], iframe[src*="//player.vimeo.com"]');

            // strip iframes of their height/width attributes
            if (videos.length) {
                for (var i = 0; i < videos.length; i++) {
                    var video = videos[i],
                        aspectRatio = video.height / video.width;

                    // store aspect ratio using dataset with fallback
                    // there are shims for this, but this is all I really need it for
                    if (video.dataset) {
                        video.dataset.aspectRatio = aspectRatio;
                    } else {
                        video.setAttribute('data-aspect-ratio', aspectRatio);
                    }

                    video.removeAttribute('height');
                    video.removeAttribute('width');
                    video.style.height = video.offsetWidth * aspectRatio + 'px';
                }
                // check if videos need resize
                resizeVideosLoop = window.setInterval(function() {
                    resizeVideos(videos);
                }, 500);
            } else {
                // cancel previous animations
                window.clearInterval(resizeVideosLoop);
            }
        }

        function resizeCaptions() {
            var captions = document.getElementsByClassName('caption');

            function update(j) {
                var caption = captions[j];
                // set onload handler for image within caption div
                caption.getElementsByTagName('img')[0].onload = function() {
                    caption.style.width = caption.getElementsByTagName('img')[0].offsetWidth + 'px';
                };
            }

            if (captions.length) {
                for (var i = 0; i < captions.length; i++) {
                    // closure necessary
                    update(i);
                }
            }
        }

        function init() {
            addEndMark();
            // set subtitle before centering, otherwise it'll be too low
            setSubtitle();
            centerTitle();
            setCoverImage();
            setResponsiveVideo();
            resizeCaptions();
            if (window.innerWidth > 768) {
                setAnimateHeader();
            }
        }

        function reload() {
            init();
            // re-scans for code blocks
            Prism.highlightAll();
            // Refresh MathJax
            if (typeof MathJax === 'object') {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            }
        }

        return {
            init: init,
            reload: reload
        };

    }());


    /* ============================
     *  Events
     * ============================ */

    var events = (function() {

        // used for navbar behavior
        var lastScrollTop = 0;

        function toggleNavbar() {
            var scrollPosition = window.pageYOffset,
                requiredScroll = 20,
                headerHeight = $('.glass-header', true).offsetHeight,
                navbar = $('.glass-nav');

            // return if less than required_scroll
            if (Math.abs(lastScrollTop - scrollPosition) <= requiredScroll) {
                return;
            }

            // if current position > last position AND scrolled past cover page...
            if (scrollPosition > lastScrollTop && scrollPosition > headerHeight){
                // scroll Down
                navbar.classList.add('glass-nav-up');
            } else if (scrollPosition + headerHeight < document.body.offsetHeight) { 
                navbar.classList.remove('glass-nav-up');
            }

            lastScrollTop = scrollPosition;
        }

        function scrollHashlinks(e) {
            e.preventDefault();

            var targetId = e.target.href.split('#')[1], // gets hash value w/o the leading "#"
                targetEl = document.getElementById(targetId);
            
            // if target exists, animate it
            if (targetEl) {
                smoothScroll.scroll(utility.findPosition(targetEl), 800);
            }
        }

        function delegateSetup() {
            // instantiate event delegation object
            var delegate = new Delegate(document.body);

            var siteUrl = document.location.origin,
                // these links have separate handlers
                not = ':not([href^="#"]):not(.older-posts):not(.newer-posts)',
                // get all internal links
                internalLinks = 'a[href^="' + siteUrl + '"]' + not + ',' +
                    'a[href^="/"]' + not + ',' +
                    'a[href^="./"]' + not + ',' +
                    'a[href^="../"]' + not;

            // delegate for smooth-scrolling hashlinks (say that 5 times fast)
            delegate.on('click', 'a[href^="#"]', scrollHashlinks);

            // delegate for internal links
            delegate.on('click', internalLinks, function(e) {
                var eventTarget = e.target;

                // allow command-click and control-click to open new tab
                if (e.metaKey || e.ctrlKey) {
                    return;
                } else {
                    e.preventDefault();
                }

                // make sure target is an anchor tag, not some nested element
                while (eventTarget && eventTarget.nodeName !== 'A') {
                    eventTarget = eventTarget.parentNode;
                }
                // load the new page
                hijax.loadPage(eventTarget.href);
            });

            // delegate for pagination
            delegate.on('click', '.older-posts, .newer-posts', function(e) {
                e.preventDefault();
                // load the new page
                hijax.loadPage(e.target.href, false, $('#glass-posts-ajax'), true);
            });
        }

        function init() {
            var scrolled;

            // set up event delegation
            delegateSetup();

            // event handler for back/forward
            window.onpopstate = function() {
                // load the new page
                hijax.loadPage(window.location.href, true);
            };

            // toggle navbar on scroll
            window.onscroll = function() {
                scrolled = true;
            };

            // checks navbar every 200ms for changes
            setInterval(function() {
                if (scrolled) {
                    toggleNavbar();
                    scrolled = false;
                }
            }, 200);
        }

        return {
            init: init
        };

    }());


    /* ============================
     *  Ajax
     * ============================ */

    var hijax = (function() {

        function updateHistory(link, new_title) {
            history.pushState({
                slug: location.pathname.replace('/', '')
            }, new_title, link);
        }

        function updateContent(xhr, ajaxContainer) {
            var bodyClass = xhr.responseXML.body.getAttribute('class');
            // update title
            document.title = xhr.responseXML.title;
            // update body class
            document.body.setAttribute('class', bodyClass);
            // load the content
            ajaxContainer.innerHTML = xhr.responseXML.getElementById(ajaxContainer.id).innerHTML;
            // reinitialize page setup
            pageSetup.reload();
        }

        function loadPage(url, popstate, ajaxContainer, smooth) {

            var xhr = new XMLHttpRequest();
            
            ajaxContainer = ajaxContainer || $('#glass-ajax-container');
            var scrollto = utility.findPosition(ajaxContainer);

            // Refresh the page to the new URL if pushState not supported
            if (typeof history.pushState === 'undefined') {
                location.href = url;
            }

            xhr.onreadystatechange = function() {

                if (xhr.readyState === 4 && xhr.status === 200) {

                    // if reached via back/forward
                    if (popstate) {
                        // just load the stuff
                        updateContent(xhr, ajaxContainer);
                    } else {
                        // update the history
                        updateHistory(url, xhr.responseXML.title);
                        // fade out w/ callback
                        utility.fade('out', 100, ajaxContainer, function() {

                            // scroll to top                        
                            if (smooth) {
                                smoothScroll.scroll(scrollto, 400, function() {
                                    updateContent(xhr, ajaxContainer);
                                    utility.fade('in', 300, ajaxContainer);
                                });
                            } else {
                                updateContent(xhr, ajaxContainer);
                                window.setTimeout(function() {
                                    window.scrollTo(0, scrollto);
                                    utility.fade('in', 300, ajaxContainer);
                                }, 400);
                            }

                        });
                    }
                }
            };

            xhr.open('GET', url, true);
            xhr.responseType = "document";
            xhr.send();

        }

        function init() {
            // set history state if there isn't one
            if (typeof history.replaceState !== 'undefined') {
                history.replaceState({
                    slug: location.pathname.replace('/', '')
                }, null, null);
            }
        }

        return {
            init: init,
            loadPage: loadPage
        };

    }());


    /* ============================
     *  Utility Functions
     * ============================ */

     var utility = (function() {

        function fade(type, duration, el, callback) {

            if (callback) {
                window.setTimeout(callback, duration + 100);
            }

            var isIn = type === 'in',
                opacity = isIn ? 0 : 1,
                interval = 30,
                gap = interval / duration;

            if (isIn) {
                el.style.opacity = opacity;
            }

            function func() {
                opacity = isIn ? opacity + gap : opacity - gap;
                el.style.opacity = opacity;

                if (opacity <= 0 || opacity >= 1) {
                    window.clearInterval(fading);
                }
            }

            var fading = window.setInterval(func, interval);

        }

        // Finds the offset of an element from the top of the document
        // http://www.quirksmode.org/js/findpos.html
        function findPosition(elem) {
            var offsetTop = 0;
            do {
                if (!isNaN(elem.offsetTop)) {
                    offsetTop += elem.offsetTop;
                }
            } while(elem = elem.offsetParent);
            return offsetTop;
        }

        return {
            fade: fade,
            findPosition: findPosition
        };

     }());

    return {
        init: function() {
            // 100vh fix for mobile safari...
            viewportUnitsBuggyfill.init();
            // page setup
            pageSetup.init();
            // hijax/history management
            hijax.init();
            // event binding
            events.init();
        }
    };

}((function() {
    // simple dom retrieval function
    // maps to $, limited to querySelector
    var cache = {};
    return function(el, skipCache) {
        if (skipCache) {
            return document.querySelector(el);
        } else {
            var cachedEl = cache[el];
            if (!cachedEl) {
                cachedEl = document.querySelector(el);
                cache[el] = cachedEl;
            }
            return cachedEl;
        }
    };
}())));


// DO IT
glassApp.init();

