!function(t){function e(e,n,a){t("html,body").stop().animate({scrollTop:e},n,a)}function n(){var e=F.scrollTop();Math.abs(_-e)<=D||(e>_&&e>b-z?k.addClass("glass-nav-up"):e+b<t(document).height()&&k.removeClass("glass-nav-up"),_=e)}function a(){var e=t(".glass-post-content"),n=e.children().last();n.is("p")?n.append(" &#8718;"):e.append('<hr class="endpost">')}function i(){var e=t("#subtitle"),n=t(".glass-headline");e.remove(),n.after(e)}function o(){T.css({margin:0,width:"auto",left:"auto",bottom:"auto"}).css({top:Math.floor((z+b-T.outerHeight())/2),left:Math.floor((H-T.outerWidth())/2)})}function r(){t(".glass-header").height(b)}function s(){var e=t('img[src$="#cover"]');if(r(),e.length){var n=e.attr("src");e.parent().remove(),t(".glass-cover-image, .glass-cover-image-back").css("backgroundImage","url("+n+")")}}function c(){window.requestAnimationFrame(c);var e=Math.abs(F.scrollTop()),n=((b-1.5*e)/b).toFixed(2),a=.3;0>n&&(n=0),b>e&&(t(".glass-header-wrapper, .glass-scroll-button").css({transform:"translate3d(0,"+(a*e).toFixed(2)+"px,0)",opacity:n}),t(".glass-cover-image").css("opacity",n))}function l(){M.each(function(){var e=t(this);e.data("aspect_ratio",t(this).attr("height")/t(this).attr("width")).height(e.width()*e.data("aspect_ratio"))}),window.requestAnimationFrame(h)}function h(){window.requestAnimationFrame(h);var e=M.first().width(),n=t(".glass-post-body .glass-wrapper").width();n!==e&&M.each(function(){var e=t(this);e.width(n).height(n*e.data("aspect_ratio"))})}function u(){x.length&&x.each(function(){var e=t(this);e.find("img").on("load",function(){var n=t(this).width();e.width(n)})})}function f(e){var n=e.find(".pagination"),a=t(".older-posts",n),i=t(".newer-posts",n),o=t(".page-number",n).html(),r=a.attr("href"),s=i.attr("href");a.attr("href")?q.removeClass("hidden"):q.addClass("hidden"),i.attr("href")?C.removeClass("hidden"):C.addClass("hidden"),A.html(o),q.attr("href",r),C.attr("href",s)}function m(e){t("title").html(e)}function d(t,e,n){m(t),f(e),y.html(n)}function p(n,a,i){"undefined"==typeof i&&(i=!1),t.get(n,function(o){var r=t(o),s=t("#glass-posts",r).first().html(),c=r.filter("title").text();i?d(c,r,s):(history.pushState({slug:location.pathname.replace("/","")},c,n),y.animate({opacity:0},200,function(){e(a,500,function(){d(c,r,s),y.animate({opacity:1},200)})}))})}function w(){t("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var n=t(this.hash);if(n=n.length?n:t("[name="+this.hash.slice(1)+"]"),n.length)return e(n.offset().top,1e3),!1}})}function g(){var t=F.width(),e=F.height();(t!==H||e!==b)&&(H=t,b=e,r(),o())}function v(){"undefined"!=typeof history.replaceState&&history.replaceState({slug:location.pathname.replace("/","")},null,null),s(),i(),o(),a(),u(),w(),l(),H>768&&(window.requestAnimationFrame(c),F.scroll(function(){S=!0}),setInterval(function(){S&&(n(),S=!1)},200)),F.resize(function(){g()}),t(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange",function(){g()}),q.add(C).click(function(t){var e=b-z;t.preventDefault(),p(t.target.href,e)}),window.onpopstate=function(){var t=location.href;p(t,null,!0)}}var F=t(window),b=F.height(),y=t("#glass-posts"),A=t(".page-number"),q=t(".older-posts"),C=t(".newer-posts"),k=t(".glass-nav"),T=t(".glass-header-wrapper"),x=t(".caption"),M=t('iframe[src*="//www.youtube.com"], iframe[src*="//player.vimeo.com"]'),z=k.outerHeight(),S=!1,_=0,D=20,H=F.width();!function(){for(var t=0,e=["ms","moz","webkit","o"],n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e){var n=(new Date).getTime(),a=Math.max(0,16-(n-t)),i=window.setTimeout(function(){e(n+a)},a);return t=n+a,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}(),v()}(jQuery);