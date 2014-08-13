"use strict";function Delegate(e){this.listenerMap=[{},{}],e&&this.root(e),this.handle=Delegate.prototype.handle.bind(this)}function matchesTag(e,t){return e.toLowerCase()===t.tagName.toLowerCase()}function matchesRoot(e,t){return this.rootElement===window?t===document:this.rootElement===t}function matchesId(e,t){return e===t.id}Delegate.prototype.root=function(e){var t=this.listenerMap,n;if("string"==typeof e&&(e=document.querySelector(e)),this.rootElement){for(n in t[1])t[1].hasOwnProperty(n)&&this.rootElement.removeEventListener(n,this.handle,!0);for(n in t[0])t[0].hasOwnProperty(n)&&this.rootElement.removeEventListener(n,this.handle,!1)}if(!e||!e.addEventListener)return this.rootElement&&delete this.rootElement,this;this.rootElement=e;for(n in t[1])t[1].hasOwnProperty(n)&&this.rootElement.addEventListener(n,this.handle,!0);for(n in t[0])t[0].hasOwnProperty(n)&&this.rootElement.addEventListener(n,this.handle,!1);return this},Delegate.prototype.captureForType=function(e){return-1!==["error","blur","focus","scroll","resize"].indexOf(e)},Delegate.prototype.on=function(e,t,n,a){var i,r,s,o;if(!e)throw new TypeError("Invalid event type: "+e);if("function"==typeof t&&(a=n,n=t,t=null),void 0===a&&(a=this.captureForType(e)),"function"!=typeof n)throw new TypeError("Handler must be a type of Function");return i=this.rootElement,r=this.listenerMap[a?1:0],r[e]||(i&&i.addEventListener(e,this.handle,a),r[e]=[]),t?/^[a-z]+$/i.test(t)?(o=t,s=matchesTag):/^#[a-z0-9\-_]+$/i.test(t)?(o=t.slice(1),s=matchesId):(o=t,s=matches):(o=null,s=matchesRoot.bind(this)),r[e].push({selector:t,handler:n,matcher:s,matcherParam:o}),this},Delegate.prototype.off=function(e,t,n,a){var i,r,s,o,l;if("function"==typeof t&&(a=n,n=t,t=null),void 0===a)return this.off(e,t,n,!0),this.off(e,t,n,!1),this;if(s=this.listenerMap[a?1:0],!e){for(l in s)s.hasOwnProperty(l)&&this.off(l,t,n);return this}if(o=s[e],!o||!o.length)return this;for(i=o.length-1;i>=0;i--)r=o[i],t&&t!==r.selector||n&&n!==r.handler||o.splice(i,1);return o.length||(delete s[e],this.rootElement&&this.rootElement.removeEventListener(e,this.handle,a)),this},Delegate.prototype.handle=function(e){var t,n,a=e.type,i,r,s,o,l=[],c,u="ftLabsDelegateIgnore";if(e[u]!==!0){switch(c=e.target,3===c.nodeType&&(c=c.parentNode),i=this.rootElement,r=e.eventPhase||(e.target!==e.currentTarget?3:2)){case 1:l=this.listenerMap[1][a];break;case 2:this.listenerMap[0]&&this.listenerMap[0][a]&&(l=l.concat(this.listenerMap[0][a])),this.listenerMap[1]&&this.listenerMap[1][a]&&(l=l.concat(this.listenerMap[1][a]));break;case 3:l=this.listenerMap[0][a]}for(n=l.length;c&&n;){for(t=0;n>t&&(s=l[t],s);t++)if(s.matcher.call(c,s.matcherParam,c)&&(o=this.fire(e,c,s)),o===!1)return e[u]=!0,void e.preventDefault();if(c===i)break;n=l.length,c=c.parentElement}}},Delegate.prototype.fire=function(e,t,n){return n.handler.call(t,e,t)};var matches=function(e){if(e){var t=e.prototype;return t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector}}(Element);Delegate.prototype.destroy=function(){this.off(),this.root()};var smoothScroll=function(){function e(e,t,n){function a(e){return.5>e?2*e*e:-1+(4-2*e)*e}function i(){l+=u,g=l/t,g=g>1?1:g,p=o+c*a(g),window.scrollTo(0,Math.floor(p)),r(p,e,d)}function r(e,t,a){(1===g||window.innerHeight+p>=document.height)&&(clearInterval(a),n&&n())}function s(){d=setInterval(i,u)}var o=window.pageYOffset,l=0,c=e-o,u=16,p,g,d;s()}return{scroll:e}}(),viewportUnitsBuggyfill=function(){function e(e){d||!e&&!b||(d=!0,y=document.createElement("style"),y.id="patched-viewport",document.head.appendChild(y),c(function(){window.addEventListener("orientationchange",n,!0),n()}))}function t(){y.textContent=r()}function n(){d&&(a(),t())}function a(){return v=[],f.call(document.styleSheets,function(e){"patched-viewport"!==e.ownerNode.id&&e.cssRules&&(!e.media.mediaText||window.matchMedia(e.media.mediaText).matches)&&f.call(e.cssRules,i)}),v}function i(e){if(7===e.type){var t=e.cssText;return h.lastIndex=0,void(h.test(t)&&v.push([e,null,t]))}if(!e.style){if(!e.cssRules)return;return void f.call(e.cssRules,function(e){i(e)})}f.call(e.style,function(t){var n=e.style.getPropertyValue(t);h.lastIndex=0,h.test(n)&&v.push([e,t,n])})}function r(){w=l();var e=[],t=[],n,a;return v.forEach(function(i){var r=s.apply(null,i),o=r.selector.length?r.selector.join(" {\n")+" {\n":"",l=new Array(r.selector.length+1).join("\n}");return o&&o===n?(o&&!n&&(n=o,a=l),void t.push(r.content)):(t.length&&(e.push(n+t.join("\n")+a),t.length=0),void(o?(n=o,a=l,t.push(r.content)):(e.push(r.content),n=null,a=null)))}),t.length&&e.push(n+t.join("\n")+a),e.join("\n\n")}function s(e,t,n){var a=n.replace(h,o),i=[];t&&(i.push(e.selectorText),a=t+": "+a+";");for(var r=e.parentRule;r;)i.unshift("@media "+m.call(r.media,", ")),r=r.parentRule;return{selector:i,content:a}}function o(e,t,n){var a=w[n],i=parseFloat(t)/100;return i*a+"px"}function l(){var e=window.innerHeight,t=window.innerWidth;return{vh:e,vw:t,vmax:Math.max(t,e),vmin:Math.min(t,e)}}function c(e){var t=0,n=function(){t--,t||e()};f.call(document.styleSheets,function(e){e.href&&u(e.href)!==u(location.href)&&(t++,p(e.ownerNode,n))}),t||e()}function u(e){return e.slice(0,e.indexOf("/",e.indexOf("://")+3))}function p(e,t){g(e.href,function(){var n=document.createElement("style");n.media=e.media,n.setAttribute("data-href",e.href),n.textContent=this.responseText,e.parentNode.replaceChild(n,e),t()},t)}function g(e,t,n){var a=new XMLHttpRequest;if("withCredentials"in a)a.open("GET",e,!0);else{if("undefined"==typeof XDomainRequest)throw new Error("cross-domain XHR not supported");a=new XDomainRequest,a.open("GET",e)}return a.onload=t,a.onerror=n,a.send(),a}var d=!1,h=/([0-9.-]+)(vh|vw|vmin|vmax)/g,f=[].forEach,m=[].join,w,v,y,b=/(iPhone|iPod|iPad).+AppleWebKit/i.test(window.navigator.userAgent);return{version:"0.3.1",findProperties:a,getCss:r,init:e,refresh:n}}(),glassApp=glassApp||{};glassApp.init=function(){viewportUnitsBuggyfill.init(),glassApp.pageSetup.init(),glassApp.history.init(),glassApp.events.init()},glassApp.dom={navbar:function(){return document.getElementsByClassName("glass-nav")[0]},header:function(){return document.getElementsByClassName("glass-header")[0]},headerWrapper:function(){return document.getElementsByClassName("glass-header-wrapper")[0]},scrollButton:function(){return document.getElementById("glass-scroll-button")},ajaxContainer:function(){return document.getElementById("glass-ajax-container")},coverImage:function(){return document.getElementById("glass-cover-image")},postContent:function(){return document.getElementsByClassName("glass-post-content")[0]}},glassApp.vars={lastScrollTop:0,navbarHeight:glassApp.dom.navbar().offsetHeight,resizeVideosLoop:void 0,animateHeaderLoop:void 0},glassApp.pageSetup={addEndMark:function(){var e=glassApp.dom.postContent();if(e){var t=e.lastElementChild,n=document.createElement("hr");if(n.className="endpost","P"===t.nodeName){var a=document.createTextNode(" ∎");t.appendChild(a)}e.appendChild(n)}},setAnimateHeader:function(){glassApp.vars.animateHeaderLoop&&window.cancelAnimationFrame(glassApp.vars.animateHeaderLoop),glassApp.pageSetup.animateHeader()},animateHeader:function(){glassApp.vars.animateHeaderLoop=window.requestAnimationFrame(this.animateHeader.bind(this));var e=glassApp.dom.headerWrapper(),t=glassApp.dom.scrollButton(),n=document.getElementById("glass-cover-filter"),a=window.innerWidth,i=Math.abs(window.pageYOffset),r=((a-2*i)/a).toFixed(2),s=.4;if(r=0>r?0:r,a>i){var o=(s*i).toFixed(2);e.style.transform="translate3d(0,"+o+"px,0)",e.style.webkitTransform="translate3d(0,"+o+"px,0)",e.style.opacity=r,t.style.transform="translate3d(0,"+o+"px,0)",t.style.webkitTransform="translate3d(0,"+o+"px,0)",t.style.opacity=r,n.style.opacity=.4*r}},setCoverImage:function(){var e=document.querySelector('img[src$="#cover"]');e&&(glassApp.dom.coverImage().style.backgroundImage='url("'+e.src+'")',e.parentNode.removeChild(e))},setSubtitle:function(){var e=document.getElementById("subtitle");e&&glassApp.dom.headerWrapper().appendChild(e)},centerTitle:function(){var e=glassApp.dom.headerWrapper(),t=window.innerHeight;e.style.marginTop=(t-e.offsetHeight)/2+"px"},resizeVideos:function(e){var t=e[0].offsetWidth,n=e[0].parentNode.offsetWidth;if(t!==n)for(var a=0;a<e.length;a++){var i=e[a],r=i.dataset?i.dataset.aspectRatio:i.getAttribute("data-aspect-ratio");i.style.width=n+"px",i.style.height=n*r+"px"}},setResponsiveVideo:function(){var e=document.querySelectorAll('iframe[src*="//www.youtube.com"], iframe[src*="//player.vimeo.com"]');if(e.length){for(var t=0;t<e.length;t++){var n=e[t],a=n.height/n.width;n.dataset?n.dataset.aspectRatio=a:n.setAttribute("data-aspect-ratio",a),n.removeAttribute("height"),n.removeAttribute("width"),n.style.height=n.offsetWidth*a+"px"}glassApp.vars.resizeVideosLoop=window.setInterval(function(){glassApp.pageSetup.resizeVideos(e)},500)}else window.clearInterval(glassApp.vars.resizeVideosLoop)},resizeCaptions:function(){function e(e){var n=t[e];n.getElementsByTagName("img")[0].onload=function(){n.style.width=n.getElementsByTagName("img")[0].offsetWidth+"px"}}var t=document.getElementsByClassName("caption");if(t.length)for(var n=0;n<t.length;n++)e(n)},init:function(){glassApp.pageSetup.addEndMark(),glassApp.pageSetup.setSubtitle(),glassApp.pageSetup.centerTitle(),glassApp.pageSetup.setCoverImage(),glassApp.pageSetup.setResponsiveVideo(),glassApp.pageSetup.resizeCaptions(),window.innerWidth>768&&glassApp.pageSetup.setAnimateHeader()},reload:function(){glassApp.pageSetup.init(),Prism.highlightAll(),"object"==typeof MathJax&&MathJax.Hub.Queue(["Typeset",MathJax.Hub])}},glassApp.events={toggleNavbar:function(){var e=window.pageYOffset,t=20,n=glassApp.vars.lastScrollTop,a=window.innerHeight,i=glassApp.dom.navbar();Math.abs(n-e)<=t||(e>n&&e>a?i.classList.add("glass-nav-up"):e+a<document.body.offsetHeight&&i.classList.remove("glass-nav-up"),glassApp.vars.lastScrollTop=e)},scrollHashlinks:function(e){e.preventDefault();var t=e.target.href.split("#")[1],n=document.getElementById(t);n&&smoothScroll.scroll(glassApp.utility.findPosition(n),800)},delegateSetup:function(){var e=new Delegate(document.body),t=document.location.origin,n=':not([href^="#"]):not(.older-posts):not(.newer-posts)',a='a[href^="'+t+'"]'+n+',a[href^="/"]'+n+',a[href^="./"]'+n+',a[href^="../"]'+n;e.on("click",'a[href^="#"]',glassApp.events.scrollHashlinks),e.on("click",a,function(e){var t=e.target;if(!e.metaKey&&!e.ctrlKey){for(e.preventDefault();t&&"A"!==t.nodeName;)t=t.parentNode;glassApp.hijax.loadPage(t.href)}}),e.on("click",".older-posts, .newer-posts",function(e){e.preventDefault(),glassApp.hijax.loadPage(e.target.href,!1,document.getElementById("glass-posts-ajax"),!0)})},init:function(){var e;glassApp.events.delegateSetup(),window.onpopstate=function(){glassApp.hijax.loadPage(window.location.href,!0)},window.onscroll=function(){e=!0},setInterval(function(){e&&(glassApp.events.toggleNavbar(),e=!1)},200)}},glassApp.history={update:function(e,t){history.pushState({slug:location.pathname.replace("/","")},t,e)},init:function(){"undefined"!=typeof history.replaceState&&history.replaceState({slug:location.pathname.replace("/","")},null,null)}},glassApp.hijax={updateContent:function(e,t){var n=e.responseXML.body.getAttribute("class");document.title=e.responseXML.title,document.body.setAttribute("class",n),t.innerHTML=e.responseXML.getElementById(t.id).innerHTML,glassApp.pageSetup.reload()},loadPage:function(e,t,n,a){var i=new XMLHttpRequest;n=n||glassApp.dom.ajaxContainer();var r=glassApp.utility.findPosition(n);"undefined"==typeof history.pushState&&(location.href=e),i.onreadystatechange=function(){4===i.readyState&&200===i.status&&(t?glassApp.hijax.updateContent(i,n):(glassApp.history.update(e,i.responseXML.title),glassApp.utility.fade("out",100,n,function(){a?smoothScroll.scroll(r,400,function(){glassApp.hijax.updateContent(i,n),glassApp.utility.fade("in",300,n)}):(glassApp.hijax.updateContent(i,n),window.setTimeout(function(){window.scrollTo(0,r),glassApp.utility.fade("in",300,n)},400))})))},i.open("GET",e,!0),i.responseType="document",i.send()},init:function(){}},glassApp.utility={fade:function(e,t,n,a){function i(){s=r?s+l:s-l,n.style.opacity=s,(0>=s||s>=1)&&window.clearInterval(c)}a&&window.setTimeout(a,t+100);var r="in"===e,s=r?0:1,o=30,l=o/t;r&&(n.style.opacity=s);var c=window.setInterval(i,o)},findPosition:function(e){var t=0;do isNaN(e.offsetTop)||(t+=e.offsetTop);while(e=e.offsetParent);return t}},glassApp.init(),"document"in self&&("classList"in document.createElement("_")?!function(){var e=document.createElement("_");if(e.classList.add("c1","c2"),!e.classList.contains("c2")){var t=function(e){var t=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(e){var n,a=arguments.length;for(n=0;a>n;n++)e=arguments[n],t.call(this,e)}};t("add"),t("remove")}if(e.classList.toggle("c3",!1),e.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(e,t){return 1 in arguments&&!this.contains(e)==!t?t:n.call(this,e)}}e=null}():!function(e){if("Element"in e){var t="classList",n="prototype",a=e.Element[n],i=Object,r=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},s=Array[n].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1},o=function(e,t){this.name=e,this.code=DOMException[e],this.message=t},l=function(e,t){if(""===t)throw new o("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(t))throw new o("INVALID_CHARACTER_ERR","String contains an invalid character");return s.call(e,t)},c=function(e){for(var t=r.call(e.getAttribute("class")||""),n=t?t.split(/\s+/):[],a=0,i=n.length;i>a;a++)this.push(n[a]);this._updateClassName=function(){e.setAttribute("class",this.toString())}},u=c[n]=[],p=function(){return new c(this)};if(o[n]=Error[n],u.item=function(e){return this[e]||null},u.contains=function(e){return e+="",-1!==l(this,e)},u.add=function(){var e=arguments,t=0,n=e.length,a,i=!1;do a=e[t]+"",-1===l(this,a)&&(this.push(a),i=!0);while(++t<n);i&&this._updateClassName()},u.remove=function(){var e=arguments,t=0,n=e.length,a,i=!1,r;do for(a=e[t]+"",r=l(this,a);-1!==r;)this.splice(r,1),i=!0,r=l(this,a);while(++t<n);i&&this._updateClassName()},u.toggle=function(e,t){e+="";var n=this.contains(e),a=n?t!==!0&&"remove":t!==!1&&"add";return a&&this[a](e),t===!0||t===!1?t:!n},u.toString=function(){return this.join(" ")},i.defineProperty){var g={get:p,enumerable:!0,configurable:!0};try{i.defineProperty(a,t,g)}catch(d){-2146823252===d.number&&(g.enumerable=!1,i.defineProperty(a,t,g))}}else i[n].__defineGetter__&&a.__defineGetter__(t,p)}}(self)),function(){for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var n=(new Date).getTime(),a=Math.max(0,16-(n-e)),i=window.setTimeout(function(){t(n+a)},a);return e=n+a,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}();var self="undefined"!=typeof window?window:{},Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content)):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var a={};for(var i in e)e.hasOwnProperty(i)&&(a[i]=t.util.clone(e[i]));return a;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var a=t.util.clone(t.languages[e]);for(var i in n)a[i]=n[i];return a},insertBefore:function(e,n,a,i){i=i||t.languages;var r=i[e],s={};for(var o in r)if(r.hasOwnProperty(o)){if(o==n)for(var l in a)a.hasOwnProperty(l)&&(s[l]=a[l]);s[o]=r[o]}return i[e]=s},DFS:function(e,n){for(var a in e)n.call(e,a,e[a]),"Object"===t.util.type(e)&&t.languages.DFS(e[a],n)}},highlightAll:function(e,n){for(var a=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),i=0,r;r=a[i++];)t.highlightElement(r,e===!0,n)},highlightElement:function(a,i,r){for(var s,o,l=a;l&&!e.test(l.className);)l=l.parentNode;if(l&&(s=(l.className.match(e)||[,""])[1],o=t.languages[s]),o){a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+s,l=a.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+s);var c=a.textContent;if(c){var u={element:a,language:s,grammar:o,code:c};if(t.hooks.run("before-highlight",u),i&&self.Worker){var p=new Worker(t.filename);p.onmessage=function(e){u.highlightedCode=n.stringify(JSON.parse(e.data),s),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),t.hooks.run("after-highlight",u)},p.postMessage(JSON.stringify({language:u.language,code:u.code}))}else u.highlightedCode=t.highlight(u.code,u.grammar,u.language),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(a),t.hooks.run("after-highlight",u)}}},highlight:function(e,a,i){var r=t.tokenize(e,a);return n.stringify(t.util.encode(r),i)},tokenize:function(e,n,a){var i=t.Token,r=[e],s=n.rest;if(s){for(var o in s)n[o]=s[o];delete n.rest}e:for(var o in n)if(n.hasOwnProperty(o)&&n[o]){var l=n[o],c=l.inside,u=!!l.lookbehind,p=0;l=l.pattern||l;for(var g=0;g<r.length;g++){var d=r[g];if(r.length>e.length)break e;if(!(d instanceof i)){l.lastIndex=0;var h=l.exec(d);if(h){u&&(p=h[1].length);var f=h.index-1+p,h=h[0].slice(p),m=h.length,w=f+m,v=d.slice(0,f+1),y=d.slice(w+1),b=[g,1];v&&b.push(v);var A=new i(o,c?t.tokenize(h,c):h);b.push(A),y&&b.push(y),Array.prototype.splice.apply(r,b)}}}}return r},hooks:{all:{},add:function(e,n){var a=t.hooks.all;a[e]=a[e]||[],a[e].push(n)},run:function(e,n){var a=t.hooks.all[e];if(a&&a.length)for(var i=0,r;r=a[i++];)r(n)}}},n=t.Token=function(e,t){this.type=e,this.content=t};if(n.stringify=function(e,a,i){if("string"==typeof e)return e;if("[object Array]"==Object.prototype.toString.call(e))return e.map(function(t){return n.stringify(t,a,e)}).join("");var r={type:e.type,content:n.stringify(e.content,a,i),tag:"span",classes:["token",e.type],attributes:{},language:a,parent:i};"comment"==r.type&&(r.attributes.spellcheck="true"),t.hooks.run("wrap",r);var s="";for(var o in r.attributes)s+=o+'="'+(r.attributes[o]||"")+'"';return"<"+r.tag+' class="'+r.classes.join(" ")+'" '+s+">"+r.content+"</"+r.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(e){var n=JSON.parse(e.data),a=n.language,i=n.code;self.postMessage(JSON.stringify(t.tokenize(i,t.languages[a]))),self.close()},!1),self.Prism):self.Prism;var a=document.getElementsByTagName("script");return a=a[a.length-1],a&&(t.filename=a.src,document.addEventListener&&!a.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),Prism.languages.markup={comment:/<!--[\w\W]*?-->/g,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/\&#?[\da-z]{1,8};/gi},Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/gi,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,punctuation:/[\{\};:]/g,"function":/[-a-z0-9]+(?=\()/gi},Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/gi,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}}),Prism.languages.clike={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/gi,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g},Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/gi,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}}),Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi,constant:/\b[A-Z0-9_]{2,}\b/g,comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,lookbehind:!0}}),Prism.languages.insertBefore("php","keyword",{delimiter:/(\?>|<\?php|<\?)/gi,variable:/(\$\w+)\b/gi,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/g,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/g,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&(e.tokenStack=[],e.code=e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,function(t){return e.tokenStack.push(t),"{{{PHP"+e.tokenStack.length+"}}}"}))}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language){for(var t=0,n;n=e.tokenStack[t];t++)e.highlightedCode=e.highlightedCode.replace("{{{PHP"+(t+1)+"}}}",Prism.highlight(n,e.grammar,"php"));e.element.innerHTML=e.highlightedCode}}),Prism.hooks.add("wrap",function(e){"php"===e.language&&"markup"===e.type&&(e.content=e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/<[^?]\/?(.*?)>/g,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/g})),Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},atrule:/@[\w-]+(?=\s+(\(|\{|;))/gi,url:/([-a-z]+-)*url(?=\()/gi,selector:/([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm}),Prism.languages.insertBefore("scss","atrule",{keyword:/@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i}),Prism.languages.insertBefore("scss","property",{variable:/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i}),Prism.languages.insertBefore("scss","ignore",{placeholder:/%[-_\w]+/i,statement:/\B!(default|optional)\b/gi,"boolean":/\b(true|false)\b/g,"null":/\b(null)\b/g,operator:/\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g}),Prism.languages.ruby=Prism.languages.extend("clike",{comment:/#[^\r\n]*(\r?\n|$)/g,keyword:/\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,builtin:/\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,constant:/\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g}),Prism.languages.insertBefore("ruby","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0},variable:/[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,symbol:/:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g});
//# sourceMappingURL=./scripts-min.map