"use strict";function Delegate(e){this.listenerMap=[{},{}],e&&this.root(e),this.handle=Delegate.prototype.handle.bind(this)}function matchesTag(e,t){return e.toLowerCase()===t.tagName.toLowerCase()}function matchesRoot(e,t){return this.rootElement===window?t===document:this.rootElement===t}function matchesId(e,t){return e===t.id}Delegate.prototype.root=function(e){var t=this.listenerMap,n;if("string"==typeof e&&(e=document.querySelector(e)),this.rootElement){for(n in t[1])t[1].hasOwnProperty(n)&&this.rootElement.removeEventListener(n,this.handle,!0);for(n in t[0])t[0].hasOwnProperty(n)&&this.rootElement.removeEventListener(n,this.handle,!1)}if(!e||!e.addEventListener)return this.rootElement&&delete this.rootElement,this;this.rootElement=e;for(n in t[1])t[1].hasOwnProperty(n)&&this.rootElement.addEventListener(n,this.handle,!0);for(n in t[0])t[0].hasOwnProperty(n)&&this.rootElement.addEventListener(n,this.handle,!1);return this},Delegate.prototype.captureForType=function(e){return-1!==["error","blur","focus","scroll","resize"].indexOf(e)},Delegate.prototype.on=function(e,t,n,r){var i,a,o,s;if(!e)throw new TypeError("Invalid event type: "+e);if("function"==typeof t&&(r=n,n=t,t=null),void 0===r&&(r=this.captureForType(e)),"function"!=typeof n)throw new TypeError("Handler must be a type of Function");return i=this.rootElement,a=this.listenerMap[r?1:0],a[e]||(i&&i.addEventListener(e,this.handle,r),a[e]=[]),t?/^[a-z]+$/i.test(t)?(s=t,o=matchesTag):/^#[a-z0-9\-_]+$/i.test(t)?(s=t.slice(1),o=matchesId):(s=t,o=matches):(s=null,o=matchesRoot.bind(this)),a[e].push({selector:t,handler:n,matcher:o,matcherParam:s}),this},Delegate.prototype.off=function(e,t,n,r){var i,a,o,s,l;if("function"==typeof t&&(r=n,n=t,t=null),void 0===r)return this.off(e,t,n,!0),this.off(e,t,n,!1),this;if(o=this.listenerMap[r?1:0],!e){for(l in o)o.hasOwnProperty(l)&&this.off(l,t,n);return this}if(s=o[e],!s||!s.length)return this;for(i=s.length-1;i>=0;i--)a=s[i],t&&t!==a.selector||n&&n!==a.handler||s.splice(i,1);return s.length||(delete o[e],this.rootElement&&this.rootElement.removeEventListener(e,this.handle,r)),this},Delegate.prototype.handle=function(e){var t,n,r=e.type,i,a,o,s,l=[],c,u="ftLabsDelegateIgnore";if(e[u]!==!0){switch(c=e.target,3===c.nodeType&&(c=c.parentNode),i=this.rootElement,a=e.eventPhase||(e.target!==e.currentTarget?3:2)){case 1:l=this.listenerMap[1][r];break;case 2:this.listenerMap[0]&&this.listenerMap[0][r]&&(l=l.concat(this.listenerMap[0][r])),this.listenerMap[1]&&this.listenerMap[1][r]&&(l=l.concat(this.listenerMap[1][r]));break;case 3:l=this.listenerMap[0][r]}for(n=l.length;c&&n;){for(t=0;n>t&&(o=l[t],o);t++)if(o.matcher.call(c,o.matcherParam,c)&&(s=this.fire(e,c,o)),s===!1)return e[u]=!0,void e.preventDefault();if(c===i)break;n=l.length,c=c.parentElement}}},Delegate.prototype.fire=function(e,t,n){return n.handler.call(t,e,t)};var matches=function(e){if(e){var t=e.prototype;return t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector}}(Element);Delegate.prototype.destroy=function(){this.off(),this.root()};var smoothScroll=function(){function e(e,t,n){function r(e){return.5>e?2*e*e:-1+(4-2*e)*e}function i(){l+=u,d=l/t,d=d>1?1:d,f=s+c*r(d),window.scrollTo(0,Math.floor(f)),a(f,e,h)}function a(e,t,r){(1===d||window.innerHeight+f>=document.height)&&(clearInterval(r),n&&n())}function o(){h=setInterval(i,u)}var s=window.pageYOffset,l=0,c=e-s,u=16,f,d,h;o()}return{scroll:e}}(),viewportUnitsBuggyfill=function(){function e(e){h||!e&&!b||(h=!0,y=document.createElement("style"),y.id="patched-viewport",document.head.appendChild(y),c(function(){window.addEventListener("orientationchange",n,!0),n()}))}function t(){y.textContent=a()}function n(){h&&(r(),t())}function r(){return v=[],p.call(document.styleSheets,function(e){"patched-viewport"!==e.ownerNode.id&&e.cssRules&&(!e.media.mediaText||window.matchMedia(e.media.mediaText).matches)&&p.call(e.cssRules,i)}),v}function i(e){if(7===e.type){var t=e.cssText;return g.lastIndex=0,void(g.test(t)&&v.push([e,null,t]))}if(!e.style){if(!e.cssRules)return;return void p.call(e.cssRules,function(e){i(e)})}p.call(e.style,function(t){var n=e.style.getPropertyValue(t);g.lastIndex=0,g.test(n)&&v.push([e,t,n])})}function a(){w=l();var e=[],t=[],n,r;return v.forEach(function(i){var a=o.apply(null,i),s=a.selector.length?a.selector.join(" {\n")+" {\n":"",l=new Array(a.selector.length+1).join("\n}");return s&&s===n?(s&&!n&&(n=s,r=l),void t.push(a.content)):(t.length&&(e.push(n+t.join("\n")+r),t.length=0),void(s?(n=s,r=l,t.push(a.content)):(e.push(a.content),n=null,r=null)))}),t.length&&e.push(n+t.join("\n")+r),e.join("\n\n")}function o(e,t,n){var r=n.replace(g,s),i=[];t&&(i.push(e.selectorText),r=t+": "+r+";");for(var a=e.parentRule;a;)i.unshift("@media "+m.call(a.media,", ")),a=a.parentRule;return{selector:i,content:r}}function s(e,t,n){var r=w[n],i=parseFloat(t)/100;return i*r+"px"}function l(){var e=window.innerHeight,t=window.innerWidth;return{vh:e,vw:t,vmax:Math.max(t,e),vmin:Math.min(t,e)}}function c(e){var t=0,n=function(){t--,t||e()};p.call(document.styleSheets,function(e){e.href&&u(e.href)!==u(location.href)&&(t++,f(e.ownerNode,n))}),t||e()}function u(e){return e.slice(0,e.indexOf("/",e.indexOf("://")+3))}function f(e,t){d(e.href,function(){var n=document.createElement("style");n.media=e.media,n.setAttribute("data-href",e.href),n.textContent=this.responseText,e.parentNode.replaceChild(n,e),t()},t)}function d(e,t,n){var r=new XMLHttpRequest;if("withCredentials"in r)r.open("GET",e,!0);else{if("undefined"==typeof XDomainRequest)throw new Error("cross-domain XHR not supported");r=new XDomainRequest,r.open("GET",e)}return r.onload=t,r.onerror=n,r.send(),r}var h=!1,g=/([0-9.-]+)(vh|vw|vmin|vmax)/g,p=[].forEach,m=[].join,w,v,y,b=/(iPhone|iPod|iPad).+AppleWebKit/i.test(window.navigator.userAgent);return{version:"0.3.1",findProperties:r,getCss:a,init:e,refresh:n}}(),glassApp=function($){var e=function(){function e(){var e=$(".glass-post-content",!0);if(e){var t=e.lastElementChild,n=document.createElement("hr");if(n.className="endpost","P"===t.nodeName){var r=document.createTextNode(" ∎");t.appendChild(r)}e.appendChild(n)}}function t(){d&&window.cancelAnimationFrame(d),n()}function n(){d=window.requestAnimationFrame(n);var e=$(".glass-header-wrapper",!0),t=$("#glass-scroll-button",!0),r=window.innerWidth,i=Math.abs(window.pageYOffset),a=((r-2*i)/r).toFixed(2),o=.4;if(a=0>a?0:a,r>i){var s=(o*i).toFixed(2);e.style.transform="translate3d(0,"+s+"px,0)",e.style.webkitTransform="translate3d(0,"+s+"px,0)",e.style.opacity=a,t.style.transform="translate3d(0,"+s+"px,0)",t.style.webkitTransform="translate3d(0,"+s+"px,0)",t.style.opacity=a}}function r(){var e=$('img[src$="#cover"]',!0);e&&($("#glass-cover-image",!0).style.backgroundImage='url("'+e.src+'")',e.parentNode.removeChild(e))}function i(){var e=$("#subtitle",!0);e&&$(".glass-header-wrapper",!0).appendChild(e)}function a(){var e=$(".glass-header-wrapper",!0),t=$(".glass-header",!0).offsetHeight;e.style.marginTop=(t-e.offsetHeight)/2+"px"}function o(e){var t=e[0].offsetWidth,n=e[0].parentNode.offsetWidth;if(t!==n)for(var r=0;r<e.length;r++){var i=e[r],a=i.dataset?i.dataset.aspectRatio:i.getAttribute("data-aspect-ratio");i.style.width=n+"px",i.style.height=n*a+"px"}}function s(){var e=document.querySelectorAll('iframe[src*="//www.youtube.com"], iframe[src*="//player.vimeo.com"]');if(e.length){for(var t=0;t<e.length;t++){var n=e[t],r=n.height/n.width;n.dataset?n.dataset.aspectRatio=r:n.setAttribute("data-aspect-ratio",r),n.removeAttribute("height"),n.removeAttribute("width"),n.style.height=n.offsetWidth*r+"px"}f=window.setInterval(function(){o(e)},500)}else window.clearInterval(f)}function l(){function e(e){var n=t[e];n.getElementsByTagName("img")[0].onload=function(){n.style.width=n.getElementsByTagName("img")[0].offsetWidth+"px"}}var t=document.getElementsByClassName("caption");if(t.length)for(var n=0;n<t.length;n++)e(n)}function c(){e(),i(),a(),r(),s(),l(),window.innerWidth>768&&t()}function u(){c(),Prism.highlightAll(),"object"==typeof MathJax&&MathJax.Hub.Queue(["Typeset",MathJax.Hub])}var f,d;return{init:c,reload:u}}(),t=function(){function e(){var e=window.pageYOffset,t=20,n=$(".glass-header",!0).offsetHeight,r=$(".glass-nav");Math.abs(o-e)<=t||(e>o&&e>n?r.classList.add("glass-nav-up"):e+n<document.body.offsetHeight&&r.classList.remove("glass-nav-up"),o=e)}function t(e){e.preventDefault();var t=e.target.href.split("#")[1],n=document.getElementById(t);n&&smoothScroll.scroll(r.findPosition(n),800)}function i(){var e=new Delegate(document.body),r=document.location.origin,i=':not([href^="#"]):not(.older-posts):not(.newer-posts)',a='a[href^="'+r+'"]'+i+',a[href^="/"]'+i+',a[href^="./"]'+i+',a[href^="../"]'+i;e.on("click",'a[href^="#"]',t),e.on("click",a,function(e){var t=e.target;if(!e.metaKey&&!e.ctrlKey){for(e.preventDefault();t&&"A"!==t.nodeName;)t=t.parentNode;n.loadPage(t.href)}}),e.on("click",".older-posts, .newer-posts",function(e){e.preventDefault(),n.loadPage(e.target.href,!1,$("#glass-posts-ajax"),!0)})}function a(){var t;i(),window.onpopstate=function(){n.loadPage(window.location.href,!0)},window.onscroll=function(){t=!0},setInterval(function(){t&&(e(),t=!1)},200)}var o=0;return{init:a}}(),n=function(){function t(e,t){history.pushState({slug:location.pathname.replace("/","")},t,e)}function n(t,n){var r=t.responseXML.body.getAttribute("class");document.title=t.responseXML.title,document.body.setAttribute("class",r),n.innerHTML=t.responseXML.getElementById(n.id).innerHTML,e.reload()}function i(e,i,a,o){var s=new XMLHttpRequest;a=a||$("#glass-ajax-container");var l=r.findPosition(a);"undefined"==typeof history.pushState&&(location.href=e),s.onreadystatechange=function(){4===s.readyState&&200===s.status&&(i?n(s,a):(t(e,s.responseXML.title),r.fade("out",100,a,function(){o?smoothScroll.scroll(l,400,function(){n(s,a),r.fade("in",300,a)}):(n(s,a),window.setTimeout(function(){window.scrollTo(0,l),r.fade("in",300,a)},400))})))},s.open("GET",e,!0),s.responseType="document",s.send()}function a(){"undefined"!=typeof history.replaceState&&history.replaceState({slug:location.pathname.replace("/","")},null,null)}return{init:a,loadPage:i}}(),r=function(){function e(e,t,n,r){function i(){o=a?o+l:o-l,n.style.opacity=o,(0>=o||o>=1)&&window.clearInterval(c)}r&&window.setTimeout(r,t+100);var a="in"===e,o=a?0:1,s=30,l=s/t;a&&(n.style.opacity=o);var c=window.setInterval(i,s)}function t(e){var t=0;do isNaN(e.offsetTop)||(t+=e.offsetTop);while(e=e.offsetParent);return t}return{fade:e,findPosition:t}}();return{init:function(){viewportUnitsBuggyfill.init(),e.init(),n.init(),t.init()}}}(function(){var e={};return function(t,n){if(n)return document.querySelector(t);var r=e[t];return r||(r=document.querySelector(t),e[t]=r),r}}());glassApp.init(),"document"in self&&("classList"in document.createElement("_")?!function(){var e=document.createElement("_");if(e.classList.add("c1","c2"),!e.classList.contains("c2")){var t=function(e){var t=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(e){var n,r=arguments.length;for(n=0;r>n;n++)e=arguments[n],t.call(this,e)}};t("add"),t("remove")}if(e.classList.toggle("c3",!1),e.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(e,t){return 1 in arguments&&!this.contains(e)==!t?t:n.call(this,e)}}e=null}():!function(e){if("Element"in e){var t="classList",n="prototype",r=e.Element[n],i=Object,a=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[n].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1},s=function(e,t){this.name=e,this.code=DOMException[e],this.message=t},l=function(e,t){if(""===t)throw new s("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(t))throw new s("INVALID_CHARACTER_ERR","String contains an invalid character");return o.call(e,t)},c=function(e){for(var t=a.call(e.getAttribute("class")||""),n=t?t.split(/\s+/):[],r=0,i=n.length;i>r;r++)this.push(n[r]);this._updateClassName=function(){e.setAttribute("class",this.toString())}},u=c[n]=[],f=function(){return new c(this)};if(s[n]=Error[n],u.item=function(e){return this[e]||null},u.contains=function(e){return e+="",-1!==l(this,e)},u.add=function(){var e=arguments,t=0,n=e.length,r,i=!1;do r=e[t]+"",-1===l(this,r)&&(this.push(r),i=!0);while(++t<n);i&&this._updateClassName()},u.remove=function(){var e=arguments,t=0,n=e.length,r,i=!1,a;do for(r=e[t]+"",a=l(this,r);-1!==a;)this.splice(a,1),i=!0,a=l(this,r);while(++t<n);i&&this._updateClassName()},u.toggle=function(e,t){e+="";var n=this.contains(e),r=n?t!==!0&&"remove":t!==!1&&"add";return r&&this[r](e),t===!0||t===!1?t:!n},u.toString=function(){return this.join(" ")},i.defineProperty){var d={get:f,enumerable:!0,configurable:!0};try{i.defineProperty(r,t,d)}catch(h){-2146823252===h.number&&(d.enumerable=!1,i.defineProperty(r,t,d))}}else i[n].__defineGetter__&&r.__defineGetter__(t,f)}}(self)),function(){for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-e)),i=window.setTimeout(function(){t(n+r)},r);return e=n+r,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}();var self="undefined"!=typeof window?window:{},Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content)):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var a=i[e],o={};for(var s in a)if(a.hasOwnProperty(s)){if(s==n)for(var l in r)r.hasOwnProperty(l)&&(o[l]=r[l]);o[s]=a[s]}return i[e]=o},DFS:function(e,n){for(var r in e)n.call(e,r,e[r]),"Object"===t.util.type(e)&&t.languages.DFS(e[r],n)}},highlightAll:function(e,n){for(var r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),i=0,a;a=r[i++];)t.highlightElement(a,e===!0,n)},highlightElement:function(r,i,a){for(var o,s,l=r;l&&!e.test(l.className);)l=l.parentNode;if(l&&(o=(l.className.match(e)||[,""])[1],s=t.languages[o]),s){r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o,l=r.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var c=r.textContent;if(c){var u={element:r,language:o,grammar:s,code:c};if(t.hooks.run("before-highlight",u),i&&self.Worker){var f=new Worker(t.filename);f.onmessage=function(e){u.highlightedCode=n.stringify(JSON.parse(e.data),o),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,a&&a.call(u.element),t.hooks.run("after-highlight",u)},f.postMessage(JSON.stringify({language:u.language,code:u.code}))}else u.highlightedCode=t.highlight(u.code,u.grammar,u.language),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,a&&a.call(r),t.hooks.run("after-highlight",u)}}},highlight:function(e,r,i){var a=t.tokenize(e,r);return n.stringify(t.util.encode(a),i)},tokenize:function(e,n,r){var i=t.Token,a=[e],o=n.rest;if(o){for(var s in o)n[s]=o[s];delete n.rest}e:for(var s in n)if(n.hasOwnProperty(s)&&n[s]){var l=n[s],c=l.inside,u=!!l.lookbehind,f=0;l=l.pattern||l;for(var d=0;d<a.length;d++){var h=a[d];if(a.length>e.length)break e;if(!(h instanceof i)){l.lastIndex=0;var g=l.exec(h);if(g){u&&(f=g[1].length);var p=g.index-1+f,g=g[0].slice(f),m=g.length,w=p+m,v=h.slice(0,p+1),y=h.slice(w+1),b=[d,1];v&&b.push(v);var k=new i(s,c?t.tokenize(g,c):g);b.push(k),y&&b.push(y),Array.prototype.splice.apply(a,b)}}}}return a},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[],r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(r&&r.length)for(var i=0,a;a=r[i++];)a(n)}}},n=t.Token=function(e,t){this.type=e,this.content=t};if(n.stringify=function(e,r,i){if("string"==typeof e)return e;if("[object Array]"==Object.prototype.toString.call(e))return e.map(function(t){return n.stringify(t,r,e)}).join("");var a={type:e.type,content:n.stringify(e.content,r,i),tag:"span",classes:["token",e.type],attributes:{},language:r,parent:i};"comment"==a.type&&(a.attributes.spellcheck="true"),t.hooks.run("wrap",a);var o="";for(var s in a.attributes)o+=s+'="'+(a.attributes[s]||"")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'" '+o+">"+a.content+"</"+a.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.tokenize(i,t.languages[r]))),self.close()},!1),self.Prism):self.Prism;var r=document.getElementsByTagName("script");return r=r[r.length-1],r&&(t.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),Prism.languages.markup={comment:/<!--[\w\W]*?-->/g,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/\&#?[\da-z]{1,8};/gi},Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/gi,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,punctuation:/[\{\};:]/g,"function":/[-a-z0-9]+(?=\()/gi},Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/gi,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}}),Prism.languages.clike={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/gi,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g},Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/gi,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}}),Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi,constant:/\b[A-Z0-9_]{2,}\b/g,comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,lookbehind:!0}}),Prism.languages.insertBefore("php","keyword",{delimiter:/(\?>|<\?php|<\?)/gi,variable:/(\$\w+)\b/gi,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/g,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/g,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&(e.tokenStack=[],e.code=e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,function(t){return e.tokenStack.push(t),"{{{PHP"+e.tokenStack.length+"}}}"}))}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language){for(var t=0,n;n=e.tokenStack[t];t++)e.highlightedCode=e.highlightedCode.replace("{{{PHP"+(t+1)+"}}}",Prism.highlight(n,e.grammar,"php"));e.element.innerHTML=e.highlightedCode}}),Prism.hooks.add("wrap",function(e){"php"===e.language&&"markup"===e.type&&(e.content=e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/<[^?]\/?(.*?)>/g,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/g})),Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},atrule:/@[\w-]+(?=\s+(\(|\{|;))/gi,url:/([-a-z]+-)*url(?=\()/gi,selector:/([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm}),Prism.languages.insertBefore("scss","atrule",{keyword:/@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i}),Prism.languages.insertBefore("scss","property",{variable:/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i}),Prism.languages.insertBefore("scss","ignore",{placeholder:/%[-_\w]+/i,statement:/\B!(default|optional)\b/gi,"boolean":/\b(true|false)\b/g,"null":/\b(null)\b/g,operator:/\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g}),Prism.languages.ruby=Prism.languages.extend("clike",{comment:/#[^\r\n]*(\r?\n|$)/g,keyword:/\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,builtin:/\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,constant:/\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g}),Prism.languages.insertBefore("ruby","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0},variable:/[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,symbol:/:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g});