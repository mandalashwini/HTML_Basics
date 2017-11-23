var h,k=this,m=function(a){return"string"==typeof a},n=function(a,b){a=a.split(".");var c=k;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c=c[d]&&c[d]!==Object.prototype[d]?c[d]:c[d]={}:c[d]=b},p=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&
"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},q=function(a){var b=p(a);return"array"==b||"object"==b&&"number"==typeof a.length},r=function(a,b){function c(){}c.prototype=b.prototype;a.H=
b.prototype;a.prototype=new c;a.prototype.constructor=a;a.G=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var t=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,t);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};r(t,Error);t.prototype.name="CustomError";var aa=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},u=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},v=function(a,b){return a<b?-1:a>b?1:0};var w=function(a,b){b.unshift(a);t.call(this,aa.apply(null,b));b.shift()};r(w,t);w.prototype.name="AssertionError";var ba=function(a,b,c,d){var e="Assertion failed";if(c){e+=": "+c;var f=d}else a&&(e+=": "+a,f=b);throw new w(""+e,f||[]);},x=function(a,b,c){a||ba("",null,b,Array.prototype.slice.call(arguments,2))},z=function(a,b,c){"number"==typeof a||ba("Expected number but got %s: %s.",[p(a),a],b,Array.prototype.slice.call(arguments,2));return a};var ca=Array.prototype.forEach?function(a,b,c){x(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=m(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},da=function(a){return Array.prototype.concat.apply([],arguments)},ea=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var A;a:{var fa=k.navigator;if(fa){var ha=fa.userAgent;if(ha){A=ha;break a}}A=""}var B=function(a){return-1!=A.indexOf(a)};var ia=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},ja=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b};var la=function(a,b){var c=ka;Object.prototype.hasOwnProperty.call(c,a)||(c[a]=b(a))};var ma=B("Opera"),C=B("Trident")||B("MSIE"),na=B("Edge"),D=B("Gecko")&&!(-1!=A.toLowerCase().indexOf("webkit")&&!B("Edge"))&&!(B("Trident")||B("MSIE"))&&!B("Edge"),oa=-1!=A.toLowerCase().indexOf("webkit")&&!B("Edge"),pa=oa&&B("Mobile"),qa=function(){var a=k.document;return a?a.documentMode:void 0},E;
a:{var F="",G=function(){var a=A;if(D)return/rv:([^\);]+)(\)|;)/.exec(a);if(na)return/Edge\/([\d\.]+)/.exec(a);if(C)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(oa)return/WebKit\/(\S+)/.exec(a);if(ma)return/(?:Version)[ \/]?(\S+)/.exec(a)}();G&&(F=G?G[1]:"");if(C){var H=qa();if(null!=H&&H>parseFloat(F)){E=String(H);break a}}E=F}
var ra=E,ka={},sa=function(a){la(a,function(){for(var b=0,c=u(String(ra)).split("."),d=u(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",l=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];l=/(\d*)(\D*)(.*)/.exec(l)||["","","",""];if(0==g[0].length&&0==l[0].length)break;b=v(0==g[1].length?0:parseInt(g[1],10),0==l[1].length?0:parseInt(l[1],10))||v(0==g[2].length,0==l[2].length)||v(g[2],l[2]);g=g[3];l=l[3]}while(0==b)}return 0<=b})},ta;var ua=k.document;
ta=ua&&C?qa()||("CSS1Compat"==ua.compatMode?parseInt(ra,10):5):void 0;var I;if(!(I=!D&&!C)){var J;if(J=C)J=9<=Number(ta);I=J}I||D&&sa("1.9.1");C&&sa("9");var va=B("Safari")&&!((B("Chrome")||B("CriOS"))&&!B("Edge")||B("Coast")||B("Opera")||B("Edge")||B("Silk")||B("Android"))&&!(B("iPhone")&&!B("iPod")&&!B("iPad")||B("iPad")||B("iPod"));var ya=function(a){var b=window;if(pa&&va&&a){a.focus();var c=0,d=null;d=a.setInterval(function(){b.closed||5==c?(a.clearInterval(d),xa(b)):(b.close(),c++)},150)}else b.close(),xa(b)},xa=function(a){if(!a.closed&&a.document&&a.document.body)if(a=a.document.body,x(null!=a,"goog.dom.setTextContent expects a non-null value for node"),"textContent"in a)a.textContent="Please close this window.";else if(3==a.nodeType)a.data="Please close this window.";else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=
a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data="Please close this window."}else{for(var b;b=a.firstChild;)a.removeChild(b);x(a,"Node cannot be null or undefined.");a.appendChild((9==a.nodeType?a:a.ownerDocument||a.document).createTextNode("Please close this window."))}};var za="StopIteration"in k?k.StopIteration:{message:"StopIteration",stack:""},K=function(){};K.prototype.next=function(){throw za;};K.prototype.D=function(){return this};var L=function(a,b){this.j={};this.c=[];this.B=this.b=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.addAll(a)};h=L.prototype;h.h=function(){M(this);for(var a=[],b=0;b<this.c.length;b++)a.push(this.j[this.c[b]]);return a};h.o=function(){M(this);return this.c.concat()};h.A=function(a){return N(this.j,a)};h.clear=function(){this.j={};this.B=this.b=this.c.length=0};
h.remove=function(a){return N(this.j,a)?(delete this.j[a],this.b--,this.B++,this.c.length>2*this.b&&M(this),!0):!1};var M=function(a){if(a.b!=a.c.length){for(var b=0,c=0;b<a.c.length;){var d=a.c[b];N(a.j,d)&&(a.c[c++]=d);b++}a.c.length=c}if(a.b!=a.c.length){var e={};for(c=b=0;b<a.c.length;)d=a.c[b],N(e,d)||(a.c[c++]=d,e[d]=1),b++;a.c.length=c}};h=L.prototype;h.get=function(a,b){return N(this.j,a)?this.j[a]:b};h.set=function(a,b){N(this.j,a)||(this.b++,this.c.push(a),this.B++);this.j[a]=b};
h.addAll=function(a){if(a instanceof L){var b=a.o();a=a.h()}else b=ja(a),a=ia(a);for(var c=0;c<b.length;c++)this.set(b[c],a[c])};h.forEach=function(a,b){for(var c=this.o(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new L(this)};h.D=function(a){M(this);var b=0,c=this.B,d=this,e=new K;e.next=function(){if(c!=d.B)throw Error("The map has changed since the iterator was created");if(b>=d.c.length)throw za;var e=d.c[b++];return a?e:d.j[e]};return e};
var N=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var Aa=function(a){if(a.h&&"function"==typeof a.h)return a.h();if(m(a))return a.split("");if(q(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return ia(a)},Ba=function(a,b,c){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,c);else if(q(a)||m(a))ca(a,b,c);else{if(a.o&&"function"==typeof a.o)var d=a.o();else if(a.h&&"function"==typeof a.h)d=void 0;else if(q(a)||m(a)){d=[];for(var e=a.length,f=0;f<e;f++)d.push(f)}else d=ja(a);e=Aa(a);f=e.length;for(var g=0;g<f;g++)b.call(c,e[g],
d&&d[g],a)}};var Ca=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,Da=function(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e=null;if(0<=d){var f=a[c].substring(0,d);e=a[c].substring(d+1)}else f=a[c];b(f,e?decodeURIComponent(e.replace(/\+/g," ")):"")}}};var O=function(a){this.m=this.v=this.s="";this.w=null;this.u=this.l="";this.i=this.F=!1;if(a instanceof O){this.i=a.i;P(this,a.s);var b=a.v;Q(this);this.v=b;b=a.m;Q(this);this.m=b;R(this,a.w);b=a.l;Q(this);this.l=b;S(this,a.g.clone());a=a.u;Q(this);this.u=a}else a&&(b=String(a).match(Ca))?(this.i=!1,P(this,b[1]||"",!0),a=b[2]||"",Q(this),this.v=T(a),a=b[3]||"",Q(this),this.m=T(a,!0),R(this,b[4]),a=b[5]||"",Q(this),this.l=T(a,!0),S(this,b[6]||"",!0),a=b[7]||"",Q(this),this.u=T(a)):(this.i=!1,this.g=
new U(null,this.i))};O.prototype.toString=function(){var a=[],b=this.s;b&&a.push(X(b,Ea,!0),":");var c=this.m;if(c||"file"==b)a.push("//"),(b=this.v)&&a.push(X(b,Ea,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.w,null!=c&&a.push(":",String(c));if(c=this.l)this.m&&"/"!=c.charAt(0)&&a.push("/"),a.push(X(c,"/"==c.charAt(0)?Fa:Ga,!0));(c=this.g.toString())&&a.push("?",c);(c=this.u)&&a.push("#",X(c,Ha));return a.join("")};
O.prototype.resolve=function(a){var b=this.clone(),c=!!a.s;c?P(b,a.s):c=!!a.v;if(c){var d=a.v;Q(b);b.v=d}else c=!!a.m;c?(d=a.m,Q(b),b.m=d):c=null!=a.w;d=a.l;if(c)R(b,a.w);else if(c=!!a.l){if("/"!=d.charAt(0))if(this.m&&!this.l)d="/"+d;else{var e=b.l.lastIndexOf("/");-1!=e&&(d=b.l.substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(-1!=e.indexOf("./")||-1!=e.indexOf("/.")){d=0==e.lastIndexOf("/",0);e=e.split("/");for(var f=[],g=0;g<e.length;){var l=e[g++];"."==l?d&&g==e.length&&f.push(""):".."==l?
((1<f.length||1==f.length&&""!=f[0])&&f.pop(),d&&g==e.length&&f.push("")):(f.push(l),d=!0)}d=f.join("/")}else d=e}c?(Q(b),b.l=d):c=""!==a.g.toString();c?S(b,a.g.clone()):c=!!a.u;c&&(a=a.u,Q(b),b.u=a);return b};O.prototype.clone=function(){return new O(this)};
var P=function(a,b,c){Q(a);a.s=c?T(b,!0):b;a.s&&(a.s=a.s.replace(/:$/,""))},R=function(a,b){Q(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.w=b}else a.w=null},S=function(a,b,c){Q(a);b instanceof U?(a.g=b,a.g.C(a.i)):(c||(b=X(b,Ia)),a.g=new U(b,a.i))};O.prototype.removeParameter=function(a){Q(this);this.g.remove(a);return this};var Q=function(a){if(a.F)throw Error("Tried to modify a read-only Uri");};O.prototype.C=function(a){this.i=a;this.g&&this.g.C(a)};
var T=function(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""},X=function(a,b,c){return m(a)?(a=encodeURI(a).replace(b,Ja),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},Ja=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},Ea=/[#\/\?@]/g,Ga=/[#\?:]/g,Fa=/[#\?]/g,Ia=/[#\?@]/g,Ha=/#/g,U=function(a,b){this.b=this.a=null;this.f=a||null;this.i=!!b},Y=function(a){a.a||(a.a=new L,a.b=0,a.f&&Da(a.f,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g,
" ")),c)}))};h=U.prototype;h.add=function(a,b){Y(this);this.f=null;a=Z(this,a);var c=this.a.get(a);c||this.a.set(a,c=[]);c.push(b);this.b=z(this.b)+1;return this};h.remove=function(a){Y(this);a=Z(this,a);return this.a.A(a)?(this.f=null,this.b=z(this.b)-this.a.get(a).length,this.a.remove(a)):!1};h.clear=function(){this.a=this.f=null;this.b=0};h.A=function(a){Y(this);a=Z(this,a);return this.a.A(a)};
h.forEach=function(a,b){Y(this);this.a.forEach(function(c,d){ca(c,function(c){a.call(b,c,d,this)},this)},this)};h.o=function(){Y(this);for(var a=this.a.h(),b=this.a.o(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};h.h=function(a){Y(this);var b=[];if(m(a))this.A(a)&&(b=da(b,this.a.get(Z(this,a))));else{a=this.a.h();for(var c=0;c<a.length;c++)b=da(b,a[c])}return b};
h.set=function(a,b){Y(this);this.f=null;a=Z(this,a);this.A(a)&&(this.b=z(this.b)-this.a.get(a).length);this.a.set(a,[b]);this.b=z(this.b)+1;return this};h.get=function(a,b){a=a?this.h(a):[];return 0<a.length?String(a[0]):b};
h.toString=function(){if(this.f)return this.f;if(!this.a)return"";for(var a=[],b=this.a.o(),c=0;c<b.length;c++){var d=b[c],e=encodeURIComponent(String(d));d=this.h(d);for(var f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}}return this.f=a.join("&")};h.clone=function(){var a=new U;a.f=this.f;this.a&&(a.a=this.a.clone(),a.b=this.b);return a};var Z=function(a,b){b=String(b);a.i&&(b=b.toLowerCase());return b};
U.prototype.C=function(a){a&&!this.i&&(Y(this),this.f=null,this.a.forEach(function(a,c){var b=c.toLowerCase();c!=b&&(this.remove(c),this.remove(b),0<a.length&&(this.f=null,this.a.set(Z(this,b),ea(a)),this.b=z(this.b)+a.length))},this));this.i=a};U.prototype.extend=function(a){for(var b=0;b<arguments.length;b++)Ba(arguments[b],function(a,b){this.add(b,a)},this)};var Ka=function(a){a=new O(a);var b="&"+window.name;Q(a);a.g.set(b,!0);b=a.g.h("parent");a.removeParameter("parent");1==b.length&&(b=gadgets.rpc.getOrigin(String(b[0])),Q(a),a.g.set("parent",b));a.removeParameter("&"+window.name);return a.toString()},La=function(a,b,c,d,e,f,g){if(!d||!d.document.domain)return!1;var l=Ka(String(d.document.location.href));if(l.substr(0,c.length)!=c)return!1;c=gadgets.util.getUrlParameters(l);if(!b||!c.parent||b!=gadgets.rpc.getOrigin(String(c.parent)))return!1;if(!e)return n("oauth2callbackUrl",
a),d.oauth2verify.call(d,String(window.name),g)?!0:!1;d.oauth2callback.call(d,a);try{f()}catch(y){}return!0},Ma=function(){try{return window.parent!=window}catch(a){}return!0},Na=function(){try{return!!window.opener}catch(a){}return!0},Pa=function(a,b,c,d,e){try{var f=Ma(),g=!f&&Na(),l=!0,y=null,V=function(){l&&ya(y)};if(!f&&!g)return;l=(g||!f)&&"keep_open"!==e;y=g?window.opener:window.parent;var wa=Ka(b);try{if(d){var W=y.frames[d];if(La(a,c,wa,W,!g,V,e))return}for(b=0;b<y.frames.length;++b)if(W=
y.frames[b],La(a,c,wa,W,!g,V,e)){l=!1;break}}catch(Oa){}}catch(Oa){}V()};
n("postmessage.onLoad",function(){var a="true"==document.getElementById("error").value,b=document.getElementById("origin").value,c=document.getElementById("response-form-encoded").value,d=document.getElementById("relay-endpoint").value,e=null,f=document.getElementById("proxy");f&&f.value&&(e=f.value);var g=document.getElementById("after-redirect");f=null;g&&g.value&&(f=g.value);window.name="pmh"+String(2147483647*shindig.random()|0);g=document.createElement("div");b=gadgets.rpc.getOrigin(b);a=b+(a?
"?":"#")+c;c=null;e&&(c=e);e=void 0;f&&(e=f);g.appendChild(document.createTextNode(a));g.setAttribute("id","postmessage-hello");Pa(a,d,b,c,e)});n("postmessage.closePopup",function(){var a=null;try{var b=Ma(),c=!b&&Na();if(!b&&!c)return;a=c?window.opener:window.parent}catch(d){}ya(a)});