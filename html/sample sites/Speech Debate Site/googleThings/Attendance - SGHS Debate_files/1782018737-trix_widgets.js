var h,m=this,p=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},q=function(a){return"array"==p(a)},aa=function(a){var b=p(a);return"array"==b||"object"==b&&"number"==typeof a.length},r=function(a){return"string"==typeof a},ba=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},s=function(a){return a[ca]||(a[ca]=++da)},ca="closure_uid_"+(1E9*Math.random()>>>0),da=0,ea=function(a,b,c){return a.call.apply(a.bind,arguments)},fa=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=
Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},v=function(a,b,c){v=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ea:fa;return v.apply(null,arguments)},w=function(a,b){function c(){}c.prototype=b.prototype;a.w=b.prototype;a.prototype=new c;a.prototype.constructor=a};
Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return v.apply(null,c)}return v(this,a)};var la=function(a,b){if(b)return a.replace(ga,"&amp;").replace(ha,"&lt;").replace(ia,"&gt;").replace(ja,"&quot;");if(!ka.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(ga,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(ha,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(ia,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(ja,"&quot;"));return a},ga=/&/g,ha=/</g,ia=/>/g,ja=/\"/g,ka=/[&<>\"]/;var x=Array.prototype,ma=x.indexOf?function(a,b,c){return x.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(r(a))return r(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},na=x.forEach?function(a,b,c){x.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=r(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},y=function(a,b){var c=ma(a,b),d;(d=0<=c)&&x.splice.call(a,c,1);return d},z=function(a){var b=a.length;if(0<
b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]},oa=function(a,b,c){return 2>=arguments.length?x.slice.call(a,b):x.slice.call(a,b,c)};var pa=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)},qa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),ra=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<qa.length;f++)c=qa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var A,B,C,D,sa=function(){return m.navigator?m.navigator.userAgent:null};D=C=B=A=!1;var E;if(E=sa()){var ta=m.navigator;A=0==E.lastIndexOf("Opera",0);B=!A&&(-1!=E.indexOf("MSIE")||-1!=E.indexOf("Trident"));C=!A&&-1!=E.indexOf("WebKit");D=!A&&!C&&!B&&"Gecko"==ta.product}var ua=A,F=B,G=D,H=C,va=function(){var a=m.document;return a?a.documentMode:void 0},wa;
t:{var I="",J;if(ua&&m.opera)var xa=m.opera.version,I="function"==typeof xa?xa():xa;else if(G?J=/rv\:([^\);]+)(\)|;)/:F?J=/\b(?:MSIE|rv)\s+([^\);]+)(\)|;)/:H&&(J=/WebKit\/(\S+)/),J)var ya=J.exec(sa()),I=ya?ya[1]:"";if(F){var za=va();if(za>parseFloat(I)){wa=String(za);break t}}wa=I}
var Aa=wa,Ba={},K=function(a){var b;if(!(b=Ba[a])){b=0;for(var c=String(Aa).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",l=RegExp("(\\d*)(\\D*)","g"),n=RegExp("(\\d*)(\\D*)","g");do{var t=l.exec(g)||["","",""],u=n.exec(k)||["","",""];if(0==t[0].length&&0==u[0].length)break;b=((0==t[1].length?0:parseInt(t[1],10))<(0==u[1].length?0:parseInt(u[1],10))?-1:(0==t[1].length?
0:parseInt(t[1],10))>(0==u[1].length?0:parseInt(u[1],10))?1:0)||((0==t[2].length)<(0==u[2].length)?-1:(0==t[2].length)>(0==u[2].length)?1:0)||(t[2]<u[2]?-1:t[2]>u[2]?1:0)}while(0==b)}b=Ba[a]=0<=b}return b},Ca=m.document,Da=Ca&&F?va()||("CSS1Compat"==Ca.compatMode?parseInt(Aa,10):5):void 0;var L,Ea=!F||F&&9<=Da;!G&&!F||F&&F&&9<=Da||G&&K("1.9.1");F&&K("9");var Fa=function(a,b){var c;c=a.className;c=r(c)&&c.match(/\S+/g)||[];for(var d=oa(arguments,1),e=c.length+d.length,f=c,g=0;g<d.length;g++)0<=ma(f,d[g])||f.push(d[g]);a.className=c.join(" ");return c.length==e};var Ha=function(a,b){pa(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:d in Ga?a.setAttribute(Ga[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},Ga={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"},Ia=function(a,b,c,d){function e(c){c&&b.appendChild(r(c)?
a.createTextNode(c):c)}for(;d<c.length;d++){var f=c[d];if(!aa(f)||ba(f)&&0<f.nodeType)e(f);else{var g;t:{if(f&&"number"==typeof f.length){if(ba(f)){g="function"==typeof f.item||"string"==typeof f.item;break t}if("function"==p(f)){g="function"==typeof f.item;break t}}g=!1}na(g?z(f):f,e)}}},Ja=function(a){for(var b;b=a.firstChild;)a.removeChild(b)},Ka=function(a){return 9==a.nodeType?a:a.ownerDocument||a.document},M=function(a){this.q=a||m.document||document};h=M.prototype;
h.a=function(a,b,c){var d=this.q,e=arguments,f=e[0],g=e[1];if(!Ea&&g&&(g.name||g.type)){f=["<",f];g.name&&f.push(' name="',la(g.name),'"');if(g.type){f.push(' type="',la(g.type),'"');var k={};ra(k,g);delete k.type;g=k}f.push(">");f=f.join("")}f=d.createElement(f);g&&(r(g)?f.className=g:q(g)?Fa.apply(null,[f].concat(g)):Ha(f,g));2<e.length&&Ia(d,f,e,2);return f};h.createElement=function(a){return this.q.createElement(a)};h.createTextNode=function(a){return this.q.createTextNode(String(a))};
h.$=function(){return this.q.parentWindow||this.q.defaultView};h.appendChild=function(a,b){a.appendChild(b)};h.append=function(a,b){Ia(Ka(a),a,arguments,1)};h.canHaveChildren=function(a){if(1!=a.nodeType)return!1;switch(a.tagName){case "APPLET":case "AREA":case "BASE":case "BR":case "COL":case "COMMAND":case "EMBED":case "FRAME":case "HR":case "IMG":case "INPUT":case "IFRAME":case "ISINDEX":case "KEYGEN":case "LINK":case "NOFRAMES":case "NOSCRIPT":case "META":case "OBJECT":case "PARAM":case "SCRIPT":case "SOURCE":case "STYLE":case "TRACK":case "WBR":return!1}return!0};
h.removeNode=function(a){return a&&a.parentNode?a.parentNode.removeChild(a):null};h.contains=function(a,b){if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};var La=function(a){La[" "](a);return a};La[" "]=function(){};var Ma=!F||F&&9<=Da,Na=F&&!K("9");!H||K("528");G&&K("1.9b")||F&&K("8")||ua&&K("9.5")||H&&K("528");G&&!K("8")||F&&K("9");var N=function(){};N.prototype.ka=!1;N.prototype.K=function(){this.ka||(this.ka=!0,this.e())};N.prototype.e=function(){if(this.la)for(;this.la.length;)this.la.shift()()};var O=function(a,b){this.type=a;this.currentTarget=this.target=b};h=O.prototype;h.e=function(){};h.K=function(){};h.j=!1;h.defaultPrevented=!1;h.aa=!0;h.stopPropagation=function(){this.j=!0};h.preventDefault=function(){this.defaultPrevented=!0;this.aa=!1};var P=function(a,b){a&&this.Ga(a,b)};w(P,O);h=P.prototype;h.target=null;h.relatedTarget=null;h.offsetX=0;h.offsetY=0;h.clientX=0;h.clientY=0;h.screenX=0;h.screenY=0;h.button=0;h.keyCode=0;h.charCode=0;h.ctrlKey=!1;h.altKey=!1;h.shiftKey=!1;h.metaKey=!1;h.p=null;
h.Ga=function(a,b){var c=this.type=a.type;O.call(this,c);this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(G){var e;t:{try{La(d.nodeName);e=!0;break t}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=H||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=H||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:
a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;this.p=a;a.defaultPrevented&&this.preventDefault();delete this.j};h.stopPropagation=function(){P.w.stopPropagation.call(this);this.p.stopPropagation?this.p.stopPropagation():this.p.cancelBubble=!0};
h.preventDefault=function(){P.w.preventDefault.call(this);var a=this.p;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Na)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};h.e=function(){};var Oa="closure_listenable_"+(1E6*Math.random()|0),Q=function(a){return!(!a||!a[Oa])},Pa=0;var Qa=function(a,b,c,d,e,f){this.c=a;this.ba=b;this.src=c;this.type=d;this.capture=!!e;this.k=f;this.key=++Pa;this.g=this.o=!1};Qa.prototype.J=function(){this.g=!0;this.k=this.src=this.ba=this.c=null};var Ra={},R={},S={},T={},U=function(a,b,c,d,e){if(q(b)){for(var f=0;f<b.length;f++)U(a,b[f],c,d,e);return null}c=V(c);return Q(a)?a.d(b,c,d,e):Sa(a,b,c,!1,d,e)},Sa=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");e=!!e;var g=R;b in g||(g[b]={l:0});g=g[b];e in g||(g[e]={l:0},g.l++);var g=g[e],k=s(a),l;if(g[k]){l=g[k];for(var n=0;n<l.length;n++)if(g=l[n],g.c==c&&g.k==f){if(g.g)break;d||(l[n].o=!1);return l[n]}}else l=g[k]=[],g.l++;n=Ta();g=new Qa(c,n,a,b,e,f);g.o=d;n.src=a;n.c=g;l.push(g);
S[k]||(S[k]=[]);S[k].push(g);a.addEventListener?a.addEventListener(b,n,e):a.attachEvent(b in T?T[b]:T[b]="on"+b,n);return Ra[g.key]=g},Ta=function(){var a=Ua,b=Ma?function(c){return a.call(b.src,b.c,c)}:function(c){c=a.call(b.src,b.c,c);if(!c)return c};return b},Va=function(a,b,c,d,e){if(q(b)){for(var f=0;f<b.length;f++)Va(a,b[f],c,d,e);return null}c=V(c);return Q(a)?a.V(b,c,d,e):Sa(a,b,c,!0,d,e)},Wa=function(a,b,c,d,e){if(q(b)){for(var f=0;f<b.length;f++)Wa(a,b[f],c,d,e);return null}c=V(c);if(Q(a))return a.R(b,
c,d,e);d=!!d;a=Xa(a,b,d);if(!a)return!1;for(f=0;f<a.length;f++)if(a[f].c==c&&a[f].capture==d&&a[f].k==e)return W(a[f]);return!1},W=function(a){if("number"==typeof a||!a||a.g)return!1;var b=a.src;if(Q(b))return b.Z(a);var c=a.type,d=a.ba,e=a.capture;b.removeEventListener?b.removeEventListener(c,d,e):b.detachEvent&&b.detachEvent(c in T?T[c]:T[c]="on"+c,d);b=s(b);S[b]&&(d=S[b],y(d,a),0==d.length&&delete S[b]);a.J();if(d=R[c][e][b])y(d,a),0==d.length&&(delete R[c][e][b],R[c][e].l--),0==R[c][e].l&&(delete R[c][e],
R[c].l--),0==R[c].l&&delete R[c];delete Ra[a.key];return!0},Xa=function(a,b,c){var d=R;return b in d&&(d=d[b],c in d&&(d=d[c],a=s(a),d[a]))?d[a]:null},Za=function(a,b,c,d,e){c=1;b=s(b);if(a[b])for(a=z(a[b]),b=0;b<a.length;b++)(d=a[b])&&!d.g&&(c&=!1!==Ya(d,e));return Boolean(c)},Ya=function(a,b){var c=a.c,d=a.k||a.src;a.o&&W(a);return c.call(d,b)},Ua=function(a,b){if(a.g)return!0;var c=a.type,d=R;if(!(c in d))return!0;d=d[c];if(!Ma){var e;if(!(e=b))t:{e=["window","event"];for(var f=m,g;g=e.shift();)if(null!=
f[g])f=f[g];else{e=null;break t}e=f}g=e;e=new P(g,this);f=!0;if(!(0>g.keyCode||void 0!=g.returnValue)){t:{var k=!1;if(0==g.keyCode)try{g.keyCode=-1;break t}catch(l){k=!0}if(k||void 0==g.returnValue)g.returnValue=!0}g=[];for(k=e.currentTarget;k;k=k.parentNode)g.push(k);var n=d[!0];if(n)for(k=g.length-1;!e.j&&0<=k;k--)e.currentTarget=g[k],f&=Za(n,g[k],c,!0,e);if(d=d[!1])for(k=0;!e.j&&k<g.length;k++)e.currentTarget=g[k],f&=Za(d,g[k],c,!1,e)}return f}return Ya(a,new P(b,this))},$a="__closure_events_fn_"+
(1E9*Math.random()>>>0),V=function(a){return"function"==p(a)?a:a[$a]||(a[$a]=function(b){return a.handleEvent(b)})};var X=function(a){this.N=a};X.prototype.za=function(a){var b=[];this.W(a,b);return b.join("")};X.prototype.W=function(a,b){switch(typeof a){case "string":this.ja(a,b);break;case "number":this.Da(a,b);break;case "boolean":b.push(a);break;case "undefined":b.push("null");break;case "object":if(null==a){b.push("null");break}if(q(a)){this.Ca(a,b);break}this.Ea(a,b);break;case "function":break;default:throw Error("Unknown type: "+typeof a);}};
var ab={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},bb=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;X.prototype.ja=function(a,b){b.push('"',a.replace(bb,function(a){if(a in ab)return ab[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return ab[a]=e+b.toString(16)}),'"')};X.prototype.Da=function(a,b){b.push(isFinite(a)&&!isNaN(a)?a:"null")};
X.prototype.Ca=function(a,b){var c=a.length;b.push("[");for(var d="",e=0;e<c;e++)b.push(d),d=a[e],this.W(this.N?this.N.call(a,String(e),d):d,b),d=",";b.push("]")};X.prototype.Ea=function(a,b){b.push("{");var c="",d;for(d in a)if(Object.prototype.hasOwnProperty.call(a,d)){var e=a[d];"function"!=typeof e&&(b.push(c),this.ja(d,b),b.push(":"),this.W(this.N?this.N.call(a,d,e):e,b),c=",")}b.push("}")};var cb=function(a){this.src=a;this.b={}};h=cb.prototype;h.add=function(a,b,c,d,e){var f=this.b[a];f||(f=this.b[a]=[]);var g=db(f,b,d,e);-1<g?(a=f[g],c||(a.o=!1)):(a=new Qa(b,null,this.src,a,!!d,e),a.o=c,f.push(a));return a};h.remove=function(a,b,c,d){if(!(a in this.b))return!1;var e=this.b[a];b=db(e,b,c,d);return-1<b?(e[b].J(),x.splice.call(e,b,1),0==e.length&&delete this.b[a],!0):!1};
h.Ba=function(a){var b=a.type;if(!(b in this.b))return!1;var c=y(this.b[b],a);c&&(a.J(),0==this.b[b].length&&delete this.b[b]);return c};h.U=function(a){var b=0,c;for(c in this.b)if(!a||c==a){for(var d=this.b[c],e=0;e<d.length;e++)++b,d[e].J();delete this.b[c]}return b};h.Q=function(a,b,c,d){a=this.b[a];var e=-1;a&&(e=db(a,b,c,d));return-1<e?a[e]:null};var db=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.g&&f.c==b&&f.capture==!!c&&f.k==d)return e}return-1};var Y=function(){this.h=new cb(this);this.xa=this};w(Y,N);Y.prototype[Oa]=!0;h=Y.prototype;h.S=null;h.addEventListener=function(a,b,c,d){U(this,a,b,c,d)};h.removeEventListener=function(a,b,c,d){Wa(this,a,b,c,d)};
h.dispatchEvent=function(a){var b,c=this.S;if(c){b=[];for(var d=1;c;c=c.S)b.push(c),++d}c=this.xa;d=a.type||a;if(r(a))a=new O(a,c);else if(a instanceof O)a.target=a.target||c;else{var e=a;a=new O(d,c);ra(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.j&&0<=g;g--)f=a.currentTarget=b[g],e=f.M(d,!0,a)&&e;a.j||(f=a.currentTarget=c,e=f.M(d,!0,a)&&e,a.j||(e=f.M(d,!1,a)&&e));if(b)for(g=0;!a.j&&g<b.length;g++)f=a.currentTarget=b[g],e=f.M(d,!1,a)&&e;return e};
h.e=function(){Y.w.e.call(this);this.ya();this.S=null};h.d=function(a,b,c,d){return this.h.add(a,b,!1,c,d)};h.V=function(a,b,c,d){return this.h.add(a,b,!0,c,d)};h.R=function(a,b,c,d){return this.h.remove(a,b,c,d)};h.Z=function(a){return this.h.Ba(a)};h.ya=function(a){return this.h?this.h.U(a):0};h.M=function(a,b,c){a=this.h.b[a];if(!a)return!0;a=z(a);for(var d=!0,e=0;e<a.length;++e){var f=a[e];if(f&&!f.g&&f.capture==b){var g=f.c,k=f.k||f.src;f.o&&this.Z(f);d=!1!==g.call(k,c)&&d}}return d&&!1!=c.aa};
h.Q=function(a,b,c,d){return this.h.Q(a,b,c,d)};var Z=function(a,b){Y.call(this);this.i=a;this.wa=!!b;this.ga=this.fa();if(!this.ga){var c=F&&!K("7")?"readystatechange":"load";this.I=U(this.i,c,this.ha,!1,this);this.T=window.setInterval(v(this.ha,this),100)}};w(Z,Y);h=Z.prototype;h.I=null;h.ea=function(){this.T&&(window.clearInterval(this.T),this.T=null)};h.e=function(){delete this.i;this.ea();W(this.I);Z.w.e.call(this)};
h.fa=function(){var a=!1;try{a=F?"complete"==this.i.readyState:!!(this.i.contentDocument||this.i.contentWindow.document).body&&(!this.wa||!!(this.i.contentDocument||this.i.contentWindow.document).body.firstChild)}catch(b){}return a};h.ha=function(){this.fa()&&(this.ea(),W(this.I),this.I=null,this.ga=!0,this.dispatchEvent("ifload"))};var fb=function(a,b,c,d,e,f,g,k){this.f=a?new M(Ka(a)):L||(L=new M);this.ra=k;this.u=this.G=null;var l=this.f;f=l.a("table",{style:"position:relative;left:"+c+"px;top:"+d+"px;width:"+e+";height:"+f+";",cellpadding:0,cellspacing:0},c=l.a("tbody",null,l.a("tr",null,l.a("td",null,e=l.a("div",{style:"left:0px;top:0px;width:100%;height:100%;overflow:auto"}))),l.a("tr",null,d=l.a("td",{style:"height:26px;background-color:#eee"}))));l.appendChild(b,f);this.H=e;this.P=a=new eb(a,d,0,0,"100%","100%",v(this.ua,
this));k&&(k=l.a("div","element-link","\u00a0"),l.appendChild(c,l.a("tr",null,l.a("td","element-link-container",k))),U(k,"click",function(){window.open("http://www.google.com/webelements/")}));for(l=0;l<g.length;l++)a.sa(g[l]);U(this.f.$(),"message",v(this.ta,this))};h=fb.prototype;h.ua=function(a){a=v(this.L,this,a);if("function"!=p(a))if(a&&"function"==typeof a.handleEvent)a=v(a.handleEvent,a);else throw Error("Invalid listener argument");m.setTimeout(a,20)};
h.L=function(a){var b=a.pageUrl;a=this.H;Ja(a);this.u=null;var c=this.f,b=c.a("iframe",{id:"pageswitcher-content",style:"display: block; width: 100%; height:100%;",frameBorder:"0",marginHeight:"0",marginWidth:"0",src:b}),d=new Z(b,!0);Va(d,"ifload",v(this.va,this));c.appendChild(a,b)};h.va=function(a){a=a.target;this.u=a.i;a.K();this.G&&this.ca()};
h.ta=function(a){a=a.p;var b=a.origin,c=b.length-11;0<=c&&b.indexOf(".google.com",c)==c&&"SendKeyboardEvents"==a.data&&(this.G=a.origin,this.da(this.f.q),this.ca())};h.ca=function(){this.u&&this.da(this.u.contentDocument||this.u.contentWindow.document)};h.da=function(a){U(a,["keydown","keyup","keypress"],v(this.Fa,this))};
h.Fa=function(a){if(this.G){var b=this.f.$().parent;b&&b.postMessage&&b.postMessage((new X(void 0)).za({type:a.type,ctrlKey:a.ctrlKey,altKey:a.altKey,shiftKey:a.shiftKey,metaKey:a.metaKey,keyCode:a.keyCode}),this.G)}};h.resize=function(a,b){var c=this.H.style;c.width=a+"px";c.height=b-26-(this.ra?24:0)+"px";this.P.Aa()};h.cleanup=function(){this.P.cleanup();this.P=null;Ja(this.H);this.H=null};var $=function(a){this.m=a;this.v={}};w($,N);var gb=[];h=$.prototype;h.d=function(a,b,c,d,e){q(b)||(gb[0]=b,b=gb);for(var f=0;f<b.length;f++){var g=U(a,b[f],c||this,d||!1,e||this.m||this);this.v[g.key]=g}return this};h.V=function(a,b,c,d,e){if(q(b))for(var f=0;f<b.length;f++)this.V(a,b[f],c,d,e);else a=Va(a,b,c||this,d,e||this.m||this),this.v[a.key]=a;return this};
h.R=function(a,b,c,d,e){if(q(b))for(var f=0;f<b.length;f++)this.R(a,b[f],c,d,e);else{t:if(e=e||this.m||this,d=!!d,c=V(c||this),Q(a))a=a.Q(b,c,d,e);else{if(a=Xa(a,b,d))for(b=0;b<a.length;b++)if(!a[b].g&&a[b].c==c&&a[b].capture==d&&a[b].k==e){a=a[b];break t}a=null}a&&(W(a),delete this.v[a.key])}return this};h.U=function(){pa(this.v,W);this.v={}};h.e=function(){$.w.e.call(this);this.U()};h.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};var eb=function(a,b,c,d,e,f,g){this.m=g;this.X=this.B=null;this.n=1;this.ma=c;this.f=a?new M(Ka(a)):L||(L=new M);this.A=new $(this);a=this.f;d=a.a("div",{className:"switcherOuter",style:"left:"+c+"px;top:"+d+"px;width:"+e+";height:"+f+";"});a.appendChild(b,d);this.O=d;b=d.offsetWidth-13-2;this.F=a.a("div",{className:"switcherContent",style:"left:"+c+"px;top:0;width:"+(b-7-c)+"px;height:80%;"},a.a("table","switcherTable",a.a("tbody",null,this.D=a.a("tr"))));d.appendChild(this.F);this.t=a.a("div",{className:"switcherArrows",
style:"left:"+b+"px;top:0;width:13px;height:50%;"},a.a("b",null,">"));d.appendChild(this.t);this.s=a.a("div",{className:"switcherArrows",style:"left:"+b+"px;top:"+d.offsetHeight/2+"px;width:13px;height:50%;"},a.a("b",null,"<"));d.appendChild(this.s);this.A.d(this.s,"mouseover",this.pa).d(this.t,"mouseover",this.qa).d(this.s,"mouseout",this.na).d(this.t,"mouseout",this.oa).d(this.s,"mousedown",this.Y).d(this.t,"mousedown",this.Y);this.r=0;this.C=null};h=eb.prototype;
h.clear=function(a){if(a){a=this.D.cells.length;for(var b=0;b<a;b++)this.D.deleteCell(0)}else this.O.innerHTML="",this.O=null};h.sa=function(a,b,c){var d=this.D.cells.length,e=this.D;e.insertCell(d);var f=e.cells[d];f.innerHTML="";f.appendChild(this.f.createTextNode(a.name));f.item=a;b&&(f.className=b);c&&1<d+1?(e.insertCell(d),e.cells[d].innerHTML="|",f=e.cells[d+1]):f=e.cells[d];f.className="switcherItem";(null==this.B||a.initialSheet)&&this.L(a,f);this.A.d(f,"click",v(this.L,this,a,f));return f};
h.L=function(a,b){if(a!=this.B){null!=this.B&&(this.X.className="switcherItem");this.B=a;this.X=b;b.className="switcherItemActive";var c=this.m;null!=c&&c(a)}};h.Aa=function(){var a=this.O.offsetWidth-13-2;this.F.style.width=a-7-this.ma+"px";this.t.style.left=a+"px";this.s.style.left=a+"px"};h.ia=function(){this.F.scrollLeft+=1*this.n*this.r};h.pa=function(){this.n=1;this.r=-1;this.C=window.setInterval(v(this.ia,this),10)};
h.qa=function(){this.r=this.n=1;this.C=window.setInterval(v(this.ia,this),10)};h.na=function(){window.clearInterval(this.C);this.r=0};h.oa=function(){window.clearInterval(this.C);this.r=0};h.Y=function(){4>this.n?this.n++:this.n=1};h.cleanup=function(){this.m=null;var a=this.A;a&&"function"==typeof a.K&&a.K();this.A=null};function _getWGTPageSwitcher(a,b,c,d,e,f,g,k,l){return new fb(b,c,d,e,f,g,k,l)};
