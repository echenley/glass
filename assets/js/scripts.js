// @codekit-prepend "modules/dom-delegate.js"
// @codekit-prepend "modules/smooth-scroll.js"
// @codekit-prepend "modules/viewport-units-buggyfill.js"
// @codekit-append "modules/classlist-shim.js"
// @codekit-append "modules/requestAnimationFrame-shim.js"
// @codekit-append "modules/prism.js"


var glassApp = glassApp || {};


/* ============================
 *  Initialize App
 * ============================ */


glassApp.init = function() {
    // 100vh fix for mobile safari...
    viewportUnitsBuggyfill.init();
    // page setup
    glassApp.pageSetup.init();
    // history management
    glassApp.history.init();
    // event binding
    glassApp.events.init();
};


/* ============================
 *  App-wide Variables
 * ============================ */


glassApp.dom = {
    navbar: function() {
        return document.getElementsByClassName('glass-nav')[0];
    },
    header: function() {
        return document.getElementsByClassName('glass-header')[0];
    },
    headerWrapper: function() {
        return document.getElementsByClassName('glass-header-wrapper')[0];
    },
    scrollButton: function() {
        return document.getElementById('glass-scroll-button');
    },
    ajaxContainer: function() {
        return document.getElementById('glass-ajax-container');
    },
    coverImage: function() {
        return document.getElementById('glass-cover-image');
    },
    postContent: function() {
        return document.getElementsByClassName('glass-post-content')[0];
    }
};

glassApp.vars = {
    // used for navbar behavior
    lastScrollTop: 0,
    // navbar height
    navbarHeight: glassApp.dom.navbar().offsetHeight,
    // stores interval timer ID for video resize
    resizeVideosLoop: undefined,
    // stores animationFrame ID for header animation
    animateHeaderLoop: undefined
};


/* ============================
 *  Page Setup
 * ============================ */


glassApp.pageSetup = {

    addEndMark: function() {
        // appends a tombstone to the article
        var postContent = glassApp.dom.postContent();

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
    },

    setAnimateHeader: function() {
        if (glassApp.vars.animateHeaderLoop) {
            window.cancelAnimationFrame(glassApp.vars.animateHeaderLoop);
        }
        glassApp.pageSetup.animateHeader();
    },

    animateHeader: function() {
        // sets up the fade effect on scroll
        // via requestAnimationFrame loop
        glassApp.vars.animateHeaderLoop = window.requestAnimationFrame(this.animateHeader.bind(this));

        var headerWrapper = glassApp.dom.headerWrapper(),
            scrollButton = glassApp.dom.scrollButton(),
            coverFilter = document.getElementById('glass-cover-filter'),
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

            // animate the cover images
            coverFilter.style.opacity = alpha * 0.4;
        }
    },

    setCoverImage: function() {
        // Glass-theme specific - gets first image with #cover in the src
        var newImage = document.querySelector('img[src$="#cover"]');
        if (newImage) {
            glassApp.dom.coverImage().style.backgroundImage = 'url("' + newImage.src + '")';
            newImage.parentNode.removeChild(newImage);
        }
    },

    setSubtitle: function() {
        // grabs #subtitle from post content and moves it to the header
        var subtitle = document.getElementById('subtitle');
        if (subtitle) {
            glassApp.dom.headerWrapper().appendChild(subtitle);
        }
    },

    centerTitle: function() {
        // vertically centers .glass-header-wrapper
        var headerWrapper = glassApp.dom.headerWrapper(),
            headerHeight = glassApp.dom.header().offsetHeight;
        // set top margin
        headerWrapper.style.marginTop = (headerHeight - headerWrapper.offsetHeight) / 2 + 'px';
    },

    resizeVideos: function(videos) {
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
    },

    setResponsiveVideo: function() {
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
            // check if videos need resize (global glassApp.vars.resizeVideosLoop needed)
            glassApp.vars.resizeVideosLoop = window.setInterval(function() {
                glassApp.pageSetup.resizeVideos(videos);
            }, 500);
        } else {
            // cancel previous animations
            window.clearInterval(glassApp.vars.resizeVideosLoop);
        }
    },

    resizeCaptions: function() {
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
                // closure to protect variables
                // and prevent memory leaks/utter chaos
                update(i);
            }
        }
    },

    init: function() {
        glassApp.pageSetup.addEndMark();
        // set subtitle before centering, otherwise it'll be too low
        glassApp.pageSetup.setSubtitle();
        glassApp.pageSetup.centerTitle();
        glassApp.pageSetup.setCoverImage();
        glassApp.pageSetup.setResponsiveVideo();
        glassApp.pageSetup.resizeCaptions();
        if (window.innerWidth > 768) {
            glassApp.pageSetup.setAnimateHeader();
        }
    },

    reload: function() {
        glassApp.pageSetup.init();
        // re-scans for code blocks
        Prism.highlightAll();
        // Refresh MathJax
        if (typeof MathJax === 'object') {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        }
    }

};


/* ============================
 *  Events
 * ============================ */


glassApp.events = {

    toggleNavbar: function() {
        var scrollPosition = window.pageYOffset,
            requiredScroll = 20,
            lastScrollTop = glassApp.vars.lastScrollTop,
            headerHeight = glassApp.dom.header().offsetHeight,
            navbar = glassApp.dom.navbar();

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

        glassApp.vars.lastScrollTop = scrollPosition;
    },

    scrollHashlinks: function(e) {
        e.preventDefault();

        var targetId = e.target.href.split('#')[1], // gets hash value w/o the leading "#"
            targetEl = document.getElementById(targetId);
        
        // if target exists, animate it
        if (targetEl) {
            smoothScroll.scroll(glassApp.utility.findPosition(targetEl), 800);
        }
    },

    delegateSetup: function() {
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
        delegate.on('click', 'a[href^="#"]', glassApp.events.scrollHashlinks);

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
            glassApp.hijax.loadPage(eventTarget.href);
        });

        // delegate for pagination
        delegate.on('click', '.older-posts, .newer-posts', function(e) {
            e.preventDefault();
            // load the new page
            glassApp.hijax.loadPage(e.target.href, false, document.getElementById('glass-posts-ajax'), true);
        });
    },

    init: function() {

        var scrolled;

        // set up event delegation
        glassApp.events.delegateSetup();

        // event handler for back/forward
        window.onpopstate = function() {
            // load the new page
            glassApp.hijax.loadPage(window.location.href, true);
        };

        // toggle navbar on scroll
        window.onscroll = function() {
            scrolled = true;
        };

        // checks navbar every 200ms for changes
        setInterval(function() {
            if (scrolled) {
                glassApp.events.toggleNavbar();
                scrolled = false;
            }
        }, 200);

    }

};


/* ============================
 *  History Management
 * ============================ */


glassApp.history = {

    update: function(link, new_title) {
        history.pushState({
            slug: location.pathname.replace('/', '')
        }, new_title, link);
    },

    init: function() {
        // set history state if there isn't one
        if (typeof history.replaceState !== 'undefined') {
            history.replaceState({
                slug: location.pathname.replace('/', '')
            }, null, null);
        }
    }

};


/* ============================
 *  Ajax
 * ============================ */


glassApp.hijax = {

    updateContent: function(xhr, ajaxContainer) {
        var bodyClass = xhr.responseXML.body.getAttribute('class');
        // update title
        document.title = xhr.responseXML.title;
        // update body class
        document.body.setAttribute('class', bodyClass);
        // load the content
        ajaxContainer.innerHTML = xhr.responseXML.getElementById(ajaxContainer.id).innerHTML;
        // reinitialize page setup
        glassApp.pageSetup.reload();
    },

    loadPage: function(url, popstate, ajaxContainer, smooth) {

        var xhr = new XMLHttpRequest();
        
        ajaxContainer = ajaxContainer || glassApp.dom.ajaxContainer();
        var scrollto = glassApp.utility.findPosition(ajaxContainer);

        // Refresh the page to the new URL if pushState not supported
        if (typeof history.pushState === 'undefined') {
            location.href = url;
        }

        xhr.onreadystatechange = function() {

            if (xhr.readyState === 4 && xhr.status === 200) {

                // if reached via back/forward
                if (popstate) {
                    // just load the stuff
                    glassApp.hijax.updateContent(xhr, ajaxContainer);
                } else {
                    // update the history
                    glassApp.history.update(url, xhr.responseXML.title);
                    // fade out w/ callback
                    glassApp.utility.fade('out', 100, ajaxContainer, function() {

                        // scroll to top                        
                        if (smooth) {

                            // callbacks galore
                            smoothScroll.scroll(scrollto, 400, function() {

                                // load the stuff
                                glassApp.hijax.updateContent(xhr, ajaxContainer);
                                // fade it in
                                glassApp.utility.fade('in', 300, ajaxContainer);

                            });

                        } else {

                            // load the stuff
                            glassApp.hijax.updateContent(xhr, ajaxContainer);
                            // fade it in
                            window.setTimeout(function() {
                                window.scrollTo(0, scrollto);
                                glassApp.utility.fade('in', 300, ajaxContainer);
                            }, 400);

                        }

                    });
                }
            }
        };

        xhr.open('GET', url, true);
        xhr.responseType = "document";
        xhr.send();

    },

    init: function() {}
};


/* ============================
 *  Utility Functions
 * ============================ */


 glassApp.utility = {

    // Fade function by Todd Motto, altered slightly
    // http://toddmotto.com/raw-javascript-jquery-style-fadein-fadeout-functions-hugo-giraudel/
    fade: function(type, duration, el, callback) {

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

    },

    // Finds the offset of an element from the top of the document
    // http://www.quirksmode.org/js/findpos.html
    findPosition: function(elem) {
        var offsetTop = 0;
        do {
            if (!isNaN(elem.offsetTop)) {
                offsetTop += elem.offsetTop;
            }
        } while(elem = elem.offsetParent);
        return offsetTop;
    }
 };


// DO IT
glassApp.init();

