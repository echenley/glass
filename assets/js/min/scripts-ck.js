!function(t){function e(e,a,n){t("html,body").stop().animate({scrollTop:e},a,n)}function a(){var e=p.scrollTop();Math.abs(D-e)<=M||(e>D&&e>g-k?b.addClass("glass-nav-up"):e+g<t(document).height()&&b.removeClass("glass-nav-up"),D=e)}function n(){C.length&&C.each(function(){var e=t(this),a=e.find("img").width();e.width(a)})}function i(){var e=t(".glass-post-content"),a=e.children().last();a.is("p")?a.append(" &#8718;"):e.append('<hr class="endpost">')}function o(){var e=t("#subtitle"),a=t(".glass-headline");e.remove(),a.after(e)}function r(){q.css({top:(k+g-q.outerHeight())/2,left:(p.width()-q.outerWidth())/2})}function s(){var e=t('img[src$="#cover"]');if(t(".glass-header").height(g),e.length){var a=e.attr("src");e.parent().remove(),t(".glass-cover-image, .glass-cover-image-back").css("backgroundImage","url("+a+")")}}function c(){window.requestAnimationFrame(c);var e=Math.abs(p.scrollTop()),a=((g-1.5*e)/g).toFixed(2),n=.3;0>a&&(a=0),g>e&&(t(".glass-header-wrapper, .glass-scroll-button").css({transform:"translate3d(0,"+(n*e).toFixed(2)+"px,0)",opacity:a}),t(".glass-cover-image").css("opacity",a))}function l(){T.each(function(){var e=t(this);e.data("aspect_ratio",t(this).attr("height")/t(this).attr("width")).height(e.width()*e.data("aspect_ratio"))}),window.requestAnimationFrame(d)}function d(){window.requestAnimationFrame(d);var e=T.first().width(),a=t(".glass-post-body .glass-wrapper").width();a!==e&&T.each(function(){var e=t(this);e.width(a).height(a*e.data("aspect_ratio"))})}function u(e){var a=e.find(".pagination"),n=t(".older-posts",a),i=t(".newer-posts",a),o=t(".page-number",a).html(),r=n.attr("href"),s=i.attr("href");n.attr("href")?y.removeClass("hidden"):y.addClass("hidden"),i.attr("href")?A.removeClass("hidden"):A.addClass("hidden"),F.html(o),y.attr("href",r),A.attr("href",s)}function h(e){t("title").html(e)}function m(t,e,a){h(t),u(e),v.html(a)}function f(a,n,i){"undefined"==typeof i&&(i=!1),t.get(a,function(o){var r=t(o),s=t("#glass-posts",r).first().html(),c=r.filter("title").text();i?m(c,r,s):(history.pushState({slug:location.pathname.replace("/","")},c,a),v.animate({opacity:0},200,function(){e(n,500,function(){m(c,r,s),v.animate({opacity:1},200)})}))})}function w(){"undefined"!=typeof history.replaceState&&history.replaceState({slug:location.pathname.replace("/","")},null,null),s(),o(),r(),i(),n(),l(),p.width()>768&&(window.requestAnimationFrame(c),t(window).scroll(function(){x=!0}),setInterval(function(){x&&(a(),x=!1)},200)),t(".glass-scroll-button").click(function(t){t.preventDefault(),e(g,1e3)}),y.add(A).click(function(t){var e=g-k;t.preventDefault(),f(t.target.href,e)}),window.onpopstate=function(){var t=location.href;f(t,null,!0)}}var p=t(window),g=p.height(),v=t("#glass-posts"),F=t(".page-number"),y=t(".older-posts"),A=t(".newer-posts"),b=t(".glass-nav"),q=t(".glass-header-wrapper"),C=t(".caption"),T=t('iframe[src*="//www.youtube.com"], iframe[src*="//player.vimeo.com"]'),k=b.outerHeight(),x=!1,D=0,M=20;!function(){for(var t=0,e=["ms","moz","webkit","o"],a=0;a<e.length&&!window.requestAnimationFrame;++a)window.requestAnimationFrame=window[e[a]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[a]+"CancelAnimationFrame"]||window[e[a]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e){var a=(new Date).getTime(),n=Math.max(0,16-(a-t)),i=window.setTimeout(function(){e(a+n)},n);return t=a+n,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}(),w()}(jQuery);