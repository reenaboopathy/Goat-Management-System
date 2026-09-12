(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=r(i);fetch(i.href,a)}})();function hh(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Fd={exports:{}},Ki={},_d={exports:{}},ne={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ss=Symbol.for("react.element"),fh=Symbol.for("react.portal"),gh=Symbol.for("react.fragment"),mh=Symbol.for("react.strict_mode"),xh=Symbol.for("react.profiler"),yh=Symbol.for("react.provider"),vh=Symbol.for("react.context"),jh=Symbol.for("react.forward_ref"),bh=Symbol.for("react.suspense"),wh=Symbol.for("react.memo"),Nh=Symbol.for("react.lazy"),ac=Symbol.iterator;function Sh(e){return e===null||typeof e!="object"?null:(e=ac&&e[ac]||e["@@iterator"],typeof e=="function"?e:null)}var Md={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Pd=Object.assign,Id={};function jr(e,t,r){this.props=e,this.context=t,this.refs=Id,this.updater=r||Md}jr.prototype.isReactComponent={};jr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};jr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Rd(){}Rd.prototype=jr.prototype;function Jl(e,t,r){this.props=e,this.context=t,this.refs=Id,this.updater=r||Md}var Zl=Jl.prototype=new Rd;Zl.constructor=Jl;Pd(Zl,jr.prototype);Zl.isPureReactComponent=!0;var lc=Array.isArray,Dd=Object.prototype.hasOwnProperty,eo={current:null},Ld={key:!0,ref:!0,__self:!0,__source:!0};function $d(e,t,r){var s,i={},a=null,l=null;if(t!=null)for(s in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(a=""+t.key),t)Dd.call(t,s)&&!Ld.hasOwnProperty(s)&&(i[s]=t[s]);var c=arguments.length-2;if(c===1)i.children=r;else if(1<c){for(var o=Array(c),d=0;d<c;d++)o[d]=arguments[d+2];i.children=o}if(e&&e.defaultProps)for(s in c=e.defaultProps,c)i[s]===void 0&&(i[s]=c[s]);return{$$typeof:Ss,type:e,key:a,ref:l,props:i,_owner:eo.current}}function kh(e,t){return{$$typeof:Ss,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function to(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ss}function Ch(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var oc=/\/+/g;function ha(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Ch(""+e.key):t.toString(36)}function li(e,t,r,s,i){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(a){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case Ss:case fh:l=!0}}if(l)return l=e,i=i(l),e=s===""?"."+ha(l,0):s,lc(i)?(r="",e!=null&&(r=e.replace(oc,"$&/")+"/"),li(i,t,r,"",function(d){return d})):i!=null&&(to(i)&&(i=kh(i,r+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(oc,"$&/")+"/")+e)),t.push(i)),1;if(l=0,s=s===""?".":s+":",lc(e))for(var c=0;c<e.length;c++){a=e[c];var o=s+ha(a,c);l+=li(a,t,r,o,i)}else if(o=Sh(e),typeof o=="function")for(e=o.call(e),c=0;!(a=e.next()).done;)a=a.value,o=s+ha(a,c++),l+=li(a,t,r,o,i);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function _s(e,t,r){if(e==null)return e;var s=[],i=0;return li(e,s,"","",function(a){return t.call(r,a,i++)}),s}function Eh(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ge={current:null},oi={transition:null},zh={ReactCurrentDispatcher:Ge,ReactCurrentBatchConfig:oi,ReactCurrentOwner:eo};ne.Children={map:_s,forEach:function(e,t,r){_s(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return _s(e,function(){t++}),t},toArray:function(e){return _s(e,function(t){return t})||[]},only:function(e){if(!to(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ne.Component=jr;ne.Fragment=gh;ne.Profiler=xh;ne.PureComponent=Jl;ne.StrictMode=mh;ne.Suspense=bh;ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=zh;ne.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var s=Pd({},e.props),i=e.key,a=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,l=eo.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(o in t)Dd.call(t,o)&&!Ld.hasOwnProperty(o)&&(s[o]=t[o]===void 0&&c!==void 0?c[o]:t[o])}var o=arguments.length-2;if(o===1)s.children=r;else if(1<o){c=Array(o);for(var d=0;d<o;d++)c[d]=arguments[d+2];s.children=c}return{$$typeof:Ss,type:e.type,key:i,ref:a,props:s,_owner:l}};ne.createContext=function(e){return e={$$typeof:vh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:yh,_context:e},e.Consumer=e};ne.createElement=$d;ne.createFactory=function(e){var t=$d.bind(null,e);return t.type=e,t};ne.createRef=function(){return{current:null}};ne.forwardRef=function(e){return{$$typeof:jh,render:e}};ne.isValidElement=to;ne.lazy=function(e){return{$$typeof:Nh,_payload:{_status:-1,_result:e},_init:Eh}};ne.memo=function(e,t){return{$$typeof:wh,type:e,compare:t===void 0?null:t}};ne.startTransition=function(e){var t=oi.transition;oi.transition={};try{e()}finally{oi.transition=t}};ne.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};ne.useCallback=function(e,t){return Ge.current.useCallback(e,t)};ne.useContext=function(e){return Ge.current.useContext(e)};ne.useDebugValue=function(){};ne.useDeferredValue=function(e){return Ge.current.useDeferredValue(e)};ne.useEffect=function(e,t){return Ge.current.useEffect(e,t)};ne.useId=function(){return Ge.current.useId()};ne.useImperativeHandle=function(e,t,r){return Ge.current.useImperativeHandle(e,t,r)};ne.useInsertionEffect=function(e,t){return Ge.current.useInsertionEffect(e,t)};ne.useLayoutEffect=function(e,t){return Ge.current.useLayoutEffect(e,t)};ne.useMemo=function(e,t){return Ge.current.useMemo(e,t)};ne.useReducer=function(e,t,r){return Ge.current.useReducer(e,t,r)};ne.useRef=function(e){return Ge.current.useRef(e)};ne.useState=function(e){return Ge.current.useState(e)};ne.useSyncExternalStore=function(e,t,r){return Ge.current.useSyncExternalStore(e,t,r)};ne.useTransition=function(){return Ge.current.useTransition()};ne.version="18.2.0";_d.exports=ne;var x=_d.exports;const Ah=hh(x);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Th=x,Fh=Symbol.for("react.element"),_h=Symbol.for("react.fragment"),Mh=Object.prototype.hasOwnProperty,Ph=Th.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ih={key:!0,ref:!0,__self:!0,__source:!0};function Od(e,t,r){var s,i={},a=null,l=null;r!==void 0&&(a=""+r),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(l=t.ref);for(s in t)Mh.call(t,s)&&!Ih.hasOwnProperty(s)&&(i[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)i[s]===void 0&&(i[s]=t[s]);return{$$typeof:Fh,type:e,key:a,ref:l,props:i,_owner:Ph.current}}Ki.Fragment=_h;Ki.jsx=Od;Ki.jsxs=Od;Fd.exports=Ki;var n=Fd.exports,qa={},Bd={exports:{}},nt={},Wd={exports:{}},Gd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(P,R){var q=P.length;P.push(R);e:for(;0<q;){var C=q-1>>>1,W=P[C];if(0<i(W,R))P[C]=R,P[q]=W,q=C;else break e}}function r(P){return P.length===0?null:P[0]}function s(P){if(P.length===0)return null;var R=P[0],q=P.pop();if(q!==R){P[0]=q;e:for(var C=0,W=P.length,te=W>>>1;C<te;){var X=2*(C+1)-1,$=P[X],y=X+1,D=P[y];if(0>i($,q))y<W&&0>i(D,$)?(P[C]=D,P[y]=q,C=y):(P[C]=$,P[X]=q,C=X);else if(y<W&&0>i(D,q))P[C]=D,P[y]=q,C=y;else break e}}return R}function i(P,R){var q=P.sortIndex-R.sortIndex;return q!==0?q:P.id-R.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var l=Date,c=l.now();e.unstable_now=function(){return l.now()-c}}var o=[],d=[],v=1,g=null,f=3,j=!1,N=!1,A=!1,O=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function u(P){for(var R=r(d);R!==null;){if(R.callback===null)s(d);else if(R.startTime<=P)s(d),R.sortIndex=R.expirationTime,t(o,R);else break;R=r(d)}}function h(P){if(A=!1,u(P),!N)if(r(o)!==null)N=!0,T(S);else{var R=r(d);R!==null&&Q(h,R.startTime-P)}}function S(P,R){N=!1,A&&(A=!1,m(_),_=-1),j=!0;var q=f;try{for(u(R),g=r(o);g!==null&&(!(g.expirationTime>R)||P&&!L());){var C=g.callback;if(typeof C=="function"){g.callback=null,f=g.priorityLevel;var W=C(g.expirationTime<=R);R=e.unstable_now(),typeof W=="function"?g.callback=W:g===r(o)&&s(o),u(R)}else s(o);g=r(o)}if(g!==null)var te=!0;else{var X=r(d);X!==null&&Q(h,X.startTime-R),te=!1}return te}finally{g=null,f=q,j=!1}}var b=!1,w=null,_=-1,M=5,E=-1;function L(){return!(e.unstable_now()-E<M)}function V(){if(w!==null){var P=e.unstable_now();E=P;var R=!0;try{R=w(!0,P)}finally{R?B():(b=!1,w=null)}}else b=!1}var B;if(typeof p=="function")B=function(){p(V)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,F=k.port2;k.port1.onmessage=V,B=function(){F.postMessage(null)}}else B=function(){O(V,0)};function T(P){w=P,b||(b=!0,B())}function Q(P,R){_=O(function(){P(e.unstable_now())},R)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(P){P.callback=null},e.unstable_continueExecution=function(){N||j||(N=!0,T(S))},e.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<P?Math.floor(1e3/P):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return r(o)},e.unstable_next=function(P){switch(f){case 1:case 2:case 3:var R=3;break;default:R=f}var q=f;f=R;try{return P()}finally{f=q}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(P,R){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var q=f;f=P;try{return R()}finally{f=q}},e.unstable_scheduleCallback=function(P,R,q){var C=e.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?C+q:C):q=C,P){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=q+W,P={id:v++,callback:R,priorityLevel:P,startTime:q,expirationTime:W,sortIndex:-1},q>C?(P.sortIndex=q,t(d,P),r(o)===null&&P===r(d)&&(A?(m(_),_=-1):A=!0,Q(h,q-C))):(P.sortIndex=W,t(o,P),N||j||(N=!0,T(S))),P},e.unstable_shouldYield=L,e.unstable_wrapCallback=function(P){var R=f;return function(){var q=f;f=R;try{return P.apply(this,arguments)}finally{f=q}}}})(Gd);Wd.exports=Gd;var Rh=Wd.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ud=x,tt=Rh;function I(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Hd=new Set,ns={};function Tn(e,t){dr(e,t),dr(e+"Capture",t)}function dr(e,t){for(ns[e]=t,e=0;e<t.length;e++)Hd.add(t[e])}var Pt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Xa=Object.prototype.hasOwnProperty,Dh=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,cc={},dc={};function Lh(e){return Xa.call(dc,e)?!0:Xa.call(cc,e)?!1:Dh.test(e)?dc[e]=!0:(cc[e]=!0,!1)}function $h(e,t,r,s){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Oh(e,t,r,s){if(t===null||typeof t>"u"||$h(e,t,r,s))return!0;if(s)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ue(e,t,r,s,i,a,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=i,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=l}var _e={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){_e[e]=new Ue(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];_e[t]=new Ue(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){_e[e]=new Ue(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){_e[e]=new Ue(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){_e[e]=new Ue(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){_e[e]=new Ue(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){_e[e]=new Ue(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){_e[e]=new Ue(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){_e[e]=new Ue(e,5,!1,e.toLowerCase(),null,!1,!1)});var no=/[\-:]([a-z])/g;function ro(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(no,ro);_e[t]=new Ue(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(no,ro);_e[t]=new Ue(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(no,ro);_e[t]=new Ue(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){_e[e]=new Ue(e,1,!1,e.toLowerCase(),null,!1,!1)});_e.xlinkHref=new Ue("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){_e[e]=new Ue(e,1,!1,e.toLowerCase(),null,!0,!0)});function so(e,t,r,s){var i=_e.hasOwnProperty(t)?_e[t]:null;(i!==null?i.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Oh(t,r,i,s)&&(r=null),s||i===null?Lh(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):i.mustUseProperty?e[i.propertyName]=r===null?i.type===3?!1:"":r:(t=i.attributeName,s=i.attributeNamespace,r===null?e.removeAttribute(t):(i=i.type,r=i===3||i===4&&r===!0?"":""+r,s?e.setAttributeNS(s,t,r):e.setAttribute(t,r))))}var Lt=Ud.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ms=Symbol.for("react.element"),Gn=Symbol.for("react.portal"),Un=Symbol.for("react.fragment"),io=Symbol.for("react.strict_mode"),Ja=Symbol.for("react.profiler"),Vd=Symbol.for("react.provider"),Qd=Symbol.for("react.context"),ao=Symbol.for("react.forward_ref"),Za=Symbol.for("react.suspense"),el=Symbol.for("react.suspense_list"),lo=Symbol.for("react.memo"),Wt=Symbol.for("react.lazy"),Yd=Symbol.for("react.offscreen"),uc=Symbol.iterator;function kr(e){return e===null||typeof e!="object"?null:(e=uc&&e[uc]||e["@@iterator"],typeof e=="function"?e:null)}var ye=Object.assign,fa;function $r(e){if(fa===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);fa=t&&t[1]||""}return`
`+fa+e}var ga=!1;function ma(e,t){if(!e||ga)return"";ga=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var s=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){s=d}e.call(t.prototype)}else{try{throw Error()}catch(d){s=d}e()}}catch(d){if(d&&s&&typeof d.stack=="string"){for(var i=d.stack.split(`
`),a=s.stack.split(`
`),l=i.length-1,c=a.length-1;1<=l&&0<=c&&i[l]!==a[c];)c--;for(;1<=l&&0<=c;l--,c--)if(i[l]!==a[c]){if(l!==1||c!==1)do if(l--,c--,0>c||i[l]!==a[c]){var o=`
`+i[l].replace(" at new "," at ");return e.displayName&&o.includes("<anonymous>")&&(o=o.replace("<anonymous>",e.displayName)),o}while(1<=l&&0<=c);break}}}finally{ga=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?$r(e):""}function Bh(e){switch(e.tag){case 5:return $r(e.type);case 16:return $r("Lazy");case 13:return $r("Suspense");case 19:return $r("SuspenseList");case 0:case 2:case 15:return e=ma(e.type,!1),e;case 11:return e=ma(e.type.render,!1),e;case 1:return e=ma(e.type,!0),e;default:return""}}function tl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Un:return"Fragment";case Gn:return"Portal";case Ja:return"Profiler";case io:return"StrictMode";case Za:return"Suspense";case el:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Qd:return(e.displayName||"Context")+".Consumer";case Vd:return(e._context.displayName||"Context")+".Provider";case ao:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case lo:return t=e.displayName||null,t!==null?t:tl(e.type)||"Memo";case Wt:t=e._payload,e=e._init;try{return tl(e(t))}catch{}}return null}function Wh(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return tl(t);case 8:return t===io?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function sn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Kd(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Gh(e){var t=Kd(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(l){s=""+l,a.call(this,l)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return s},setValue:function(l){s=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ps(e){e._valueTracker||(e._valueTracker=Gh(e))}function qd(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),s="";return e&&(s=Kd(e)?e.checked?"true":"false":e.value),e=s,e!==r?(t.setValue(e),!0):!1}function bi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function nl(e,t){var r=t.checked;return ye({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function pc(e,t){var r=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;r=sn(t.value!=null?t.value:r),e._wrapperState={initialChecked:s,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Xd(e,t){t=t.checked,t!=null&&so(e,"checked",t,!1)}function rl(e,t){Xd(e,t);var r=sn(t.value),s=t.type;if(r!=null)s==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?sl(e,t.type,r):t.hasOwnProperty("defaultValue")&&sl(e,t.type,sn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function hc(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function sl(e,t,r){(t!=="number"||bi(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Or=Array.isArray;function nr(e,t,r,s){if(e=e.options,t){t={};for(var i=0;i<r.length;i++)t["$"+r[i]]=!0;for(r=0;r<e.length;r++)i=t.hasOwnProperty("$"+e[r].value),e[r].selected!==i&&(e[r].selected=i),i&&s&&(e[r].defaultSelected=!0)}else{for(r=""+sn(r),t=null,i=0;i<e.length;i++){if(e[i].value===r){e[i].selected=!0,s&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function il(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(I(91));return ye({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function fc(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(I(92));if(Or(r)){if(1<r.length)throw Error(I(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:sn(r)}}function Jd(e,t){var r=sn(t.value),s=sn(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),s!=null&&(e.defaultValue=""+s)}function gc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Zd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function al(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Zd(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Is,eu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,s,i){MSApp.execUnsafeLocalFunction(function(){return e(t,r,s,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Is=Is||document.createElement("div"),Is.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Is.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function rs(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Hr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Uh=["Webkit","ms","Moz","O"];Object.keys(Hr).forEach(function(e){Uh.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Hr[t]=Hr[e]})});function tu(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Hr.hasOwnProperty(e)&&Hr[e]?(""+t).trim():t+"px"}function nu(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var s=r.indexOf("--")===0,i=tu(r,t[r],s);r==="float"&&(r="cssFloat"),s?e.setProperty(r,i):e[r]=i}}var Hh=ye({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ll(e,t){if(t){if(Hh[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(I(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(I(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(I(61))}if(t.style!=null&&typeof t.style!="object")throw Error(I(62))}}function ol(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var cl=null;function oo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var dl=null,rr=null,sr=null;function mc(e){if(e=Es(e)){if(typeof dl!="function")throw Error(I(280));var t=e.stateNode;t&&(t=ea(t),dl(e.stateNode,e.type,t))}}function ru(e){rr?sr?sr.push(e):sr=[e]:rr=e}function su(){if(rr){var e=rr,t=sr;if(sr=rr=null,mc(e),t)for(e=0;e<t.length;e++)mc(t[e])}}function iu(e,t){return e(t)}function au(){}var xa=!1;function lu(e,t,r){if(xa)return e(t,r);xa=!0;try{return iu(e,t,r)}finally{xa=!1,(rr!==null||sr!==null)&&(au(),su())}}function ss(e,t){var r=e.stateNode;if(r===null)return null;var s=ea(r);if(s===null)return null;r=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(I(231,t,typeof r));return r}var ul=!1;if(Pt)try{var Cr={};Object.defineProperty(Cr,"passive",{get:function(){ul=!0}}),window.addEventListener("test",Cr,Cr),window.removeEventListener("test",Cr,Cr)}catch{ul=!1}function Vh(e,t,r,s,i,a,l,c,o){var d=Array.prototype.slice.call(arguments,3);try{t.apply(r,d)}catch(v){this.onError(v)}}var Vr=!1,wi=null,Ni=!1,pl=null,Qh={onError:function(e){Vr=!0,wi=e}};function Yh(e,t,r,s,i,a,l,c,o){Vr=!1,wi=null,Vh.apply(Qh,arguments)}function Kh(e,t,r,s,i,a,l,c,o){if(Yh.apply(this,arguments),Vr){if(Vr){var d=wi;Vr=!1,wi=null}else throw Error(I(198));Ni||(Ni=!0,pl=d)}}function Fn(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function ou(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function xc(e){if(Fn(e)!==e)throw Error(I(188))}function qh(e){var t=e.alternate;if(!t){if(t=Fn(e),t===null)throw Error(I(188));return t!==e?null:e}for(var r=e,s=t;;){var i=r.return;if(i===null)break;var a=i.alternate;if(a===null){if(s=i.return,s!==null){r=s;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===r)return xc(i),e;if(a===s)return xc(i),t;a=a.sibling}throw Error(I(188))}if(r.return!==s.return)r=i,s=a;else{for(var l=!1,c=i.child;c;){if(c===r){l=!0,r=i,s=a;break}if(c===s){l=!0,s=i,r=a;break}c=c.sibling}if(!l){for(c=a.child;c;){if(c===r){l=!0,r=a,s=i;break}if(c===s){l=!0,s=a,r=i;break}c=c.sibling}if(!l)throw Error(I(189))}}if(r.alternate!==s)throw Error(I(190))}if(r.tag!==3)throw Error(I(188));return r.stateNode.current===r?e:t}function cu(e){return e=qh(e),e!==null?du(e):null}function du(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=du(e);if(t!==null)return t;e=e.sibling}return null}var uu=tt.unstable_scheduleCallback,yc=tt.unstable_cancelCallback,Xh=tt.unstable_shouldYield,Jh=tt.unstable_requestPaint,be=tt.unstable_now,Zh=tt.unstable_getCurrentPriorityLevel,co=tt.unstable_ImmediatePriority,pu=tt.unstable_UserBlockingPriority,Si=tt.unstable_NormalPriority,ef=tt.unstable_LowPriority,hu=tt.unstable_IdlePriority,qi=null,St=null;function tf(e){if(St&&typeof St.onCommitFiberRoot=="function")try{St.onCommitFiberRoot(qi,e,void 0,(e.current.flags&128)===128)}catch{}}var mt=Math.clz32?Math.clz32:sf,nf=Math.log,rf=Math.LN2;function sf(e){return e>>>=0,e===0?32:31-(nf(e)/rf|0)|0}var Rs=64,Ds=4194304;function Br(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ki(e,t){var r=e.pendingLanes;if(r===0)return 0;var s=0,i=e.suspendedLanes,a=e.pingedLanes,l=r&268435455;if(l!==0){var c=l&~i;c!==0?s=Br(c):(a&=l,a!==0&&(s=Br(a)))}else l=r&~i,l!==0?s=Br(l):a!==0&&(s=Br(a));if(s===0)return 0;if(t!==0&&t!==s&&!(t&i)&&(i=s&-s,a=t&-t,i>=a||i===16&&(a&4194240)!==0))return t;if(s&4&&(s|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)r=31-mt(t),i=1<<r,s|=e[r],t&=~i;return s}function af(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function lf(e,t){for(var r=e.suspendedLanes,s=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var l=31-mt(a),c=1<<l,o=i[l];o===-1?(!(c&r)||c&s)&&(i[l]=af(c,t)):o<=t&&(e.expiredLanes|=c),a&=~c}}function hl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function fu(){var e=Rs;return Rs<<=1,!(Rs&4194240)&&(Rs=64),e}function ya(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function ks(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-mt(t),e[t]=r}function of(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<r;){var i=31-mt(r),a=1<<i;t[i]=0,s[i]=-1,e[i]=-1,r&=~a}}function uo(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var s=31-mt(r),i=1<<s;i&t|e[s]&t&&(e[s]|=t),r&=~i}}var ie=0;function gu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var mu,po,xu,yu,vu,fl=!1,Ls=[],qt=null,Xt=null,Jt=null,is=new Map,as=new Map,Ut=[],cf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function vc(e,t){switch(e){case"focusin":case"focusout":qt=null;break;case"dragenter":case"dragleave":Xt=null;break;case"mouseover":case"mouseout":Jt=null;break;case"pointerover":case"pointerout":is.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":as.delete(t.pointerId)}}function Er(e,t,r,s,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:r,eventSystemFlags:s,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Es(t),t!==null&&po(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function df(e,t,r,s,i){switch(t){case"focusin":return qt=Er(qt,e,t,r,s,i),!0;case"dragenter":return Xt=Er(Xt,e,t,r,s,i),!0;case"mouseover":return Jt=Er(Jt,e,t,r,s,i),!0;case"pointerover":var a=i.pointerId;return is.set(a,Er(is.get(a)||null,e,t,r,s,i)),!0;case"gotpointercapture":return a=i.pointerId,as.set(a,Er(as.get(a)||null,e,t,r,s,i)),!0}return!1}function ju(e){var t=yn(e.target);if(t!==null){var r=Fn(t);if(r!==null){if(t=r.tag,t===13){if(t=ou(r),t!==null){e.blockedOn=t,vu(e.priority,function(){xu(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ci(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=gl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var s=new r.constructor(r.type,r);cl=s,r.target.dispatchEvent(s),cl=null}else return t=Es(r),t!==null&&po(t),e.blockedOn=r,!1;t.shift()}return!0}function jc(e,t,r){ci(e)&&r.delete(t)}function uf(){fl=!1,qt!==null&&ci(qt)&&(qt=null),Xt!==null&&ci(Xt)&&(Xt=null),Jt!==null&&ci(Jt)&&(Jt=null),is.forEach(jc),as.forEach(jc)}function zr(e,t){e.blockedOn===t&&(e.blockedOn=null,fl||(fl=!0,tt.unstable_scheduleCallback(tt.unstable_NormalPriority,uf)))}function ls(e){function t(i){return zr(i,e)}if(0<Ls.length){zr(Ls[0],e);for(var r=1;r<Ls.length;r++){var s=Ls[r];s.blockedOn===e&&(s.blockedOn=null)}}for(qt!==null&&zr(qt,e),Xt!==null&&zr(Xt,e),Jt!==null&&zr(Jt,e),is.forEach(t),as.forEach(t),r=0;r<Ut.length;r++)s=Ut[r],s.blockedOn===e&&(s.blockedOn=null);for(;0<Ut.length&&(r=Ut[0],r.blockedOn===null);)ju(r),r.blockedOn===null&&Ut.shift()}var ir=Lt.ReactCurrentBatchConfig,Ci=!0;function pf(e,t,r,s){var i=ie,a=ir.transition;ir.transition=null;try{ie=1,ho(e,t,r,s)}finally{ie=i,ir.transition=a}}function hf(e,t,r,s){var i=ie,a=ir.transition;ir.transition=null;try{ie=4,ho(e,t,r,s)}finally{ie=i,ir.transition=a}}function ho(e,t,r,s){if(Ci){var i=gl(e,t,r,s);if(i===null)za(e,t,s,Ei,r),vc(e,s);else if(df(i,e,t,r,s))s.stopPropagation();else if(vc(e,s),t&4&&-1<cf.indexOf(e)){for(;i!==null;){var a=Es(i);if(a!==null&&mu(a),a=gl(e,t,r,s),a===null&&za(e,t,s,Ei,r),a===i)break;i=a}i!==null&&s.stopPropagation()}else za(e,t,s,null,r)}}var Ei=null;function gl(e,t,r,s){if(Ei=null,e=oo(s),e=yn(e),e!==null)if(t=Fn(e),t===null)e=null;else if(r=t.tag,r===13){if(e=ou(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ei=e,null}function bu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Zh()){case co:return 1;case pu:return 4;case Si:case ef:return 16;case hu:return 536870912;default:return 16}default:return 16}}var Vt=null,fo=null,di=null;function wu(){if(di)return di;var e,t=fo,r=t.length,s,i="value"in Vt?Vt.value:Vt.textContent,a=i.length;for(e=0;e<r&&t[e]===i[e];e++);var l=r-e;for(s=1;s<=l&&t[r-s]===i[a-s];s++);return di=i.slice(e,1<s?1-s:void 0)}function ui(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function $s(){return!0}function bc(){return!1}function rt(e){function t(r,s,i,a,l){this._reactName=r,this._targetInst=i,this.type=s,this.nativeEvent=a,this.target=l,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(r=e[c],this[c]=r?r(a):a[c]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?$s:bc,this.isPropagationStopped=bc,this}return ye(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=$s)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=$s)},persist:function(){},isPersistent:$s}),t}var br={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},go=rt(br),Cs=ye({},br,{view:0,detail:0}),ff=rt(Cs),va,ja,Ar,Xi=ye({},Cs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ar&&(Ar&&e.type==="mousemove"?(va=e.screenX-Ar.screenX,ja=e.screenY-Ar.screenY):ja=va=0,Ar=e),va)},movementY:function(e){return"movementY"in e?e.movementY:ja}}),wc=rt(Xi),gf=ye({},Xi,{dataTransfer:0}),mf=rt(gf),xf=ye({},Cs,{relatedTarget:0}),ba=rt(xf),yf=ye({},br,{animationName:0,elapsedTime:0,pseudoElement:0}),vf=rt(yf),jf=ye({},br,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),bf=rt(jf),wf=ye({},br,{data:0}),Nc=rt(wf),Nf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=kf[e])?!!t[e]:!1}function mo(){return Cf}var Ef=ye({},Cs,{key:function(e){if(e.key){var t=Nf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ui(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Sf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mo,charCode:function(e){return e.type==="keypress"?ui(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ui(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),zf=rt(Ef),Af=ye({},Xi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Sc=rt(Af),Tf=ye({},Cs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mo}),Ff=rt(Tf),_f=ye({},br,{propertyName:0,elapsedTime:0,pseudoElement:0}),Mf=rt(_f),Pf=ye({},Xi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),If=rt(Pf),Rf=[9,13,27,32],xo=Pt&&"CompositionEvent"in window,Qr=null;Pt&&"documentMode"in document&&(Qr=document.documentMode);var Df=Pt&&"TextEvent"in window&&!Qr,Nu=Pt&&(!xo||Qr&&8<Qr&&11>=Qr),kc=" ",Cc=!1;function Su(e,t){switch(e){case"keyup":return Rf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ku(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Hn=!1;function Lf(e,t){switch(e){case"compositionend":return ku(t);case"keypress":return t.which!==32?null:(Cc=!0,kc);case"textInput":return e=t.data,e===kc&&Cc?null:e;default:return null}}function $f(e,t){if(Hn)return e==="compositionend"||!xo&&Su(e,t)?(e=wu(),di=fo=Vt=null,Hn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Nu&&t.locale!=="ko"?null:t.data;default:return null}}var Of={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ec(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Of[e.type]:t==="textarea"}function Cu(e,t,r,s){ru(s),t=zi(t,"onChange"),0<t.length&&(r=new go("onChange","change",null,r,s),e.push({event:r,listeners:t}))}var Yr=null,os=null;function Bf(e){Du(e,0)}function Ji(e){var t=Yn(e);if(qd(t))return e}function Wf(e,t){if(e==="change")return t}var Eu=!1;if(Pt){var wa;if(Pt){var Na="oninput"in document;if(!Na){var zc=document.createElement("div");zc.setAttribute("oninput","return;"),Na=typeof zc.oninput=="function"}wa=Na}else wa=!1;Eu=wa&&(!document.documentMode||9<document.documentMode)}function Ac(){Yr&&(Yr.detachEvent("onpropertychange",zu),os=Yr=null)}function zu(e){if(e.propertyName==="value"&&Ji(os)){var t=[];Cu(t,os,e,oo(e)),lu(Bf,t)}}function Gf(e,t,r){e==="focusin"?(Ac(),Yr=t,os=r,Yr.attachEvent("onpropertychange",zu)):e==="focusout"&&Ac()}function Uf(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ji(os)}function Hf(e,t){if(e==="click")return Ji(t)}function Vf(e,t){if(e==="input"||e==="change")return Ji(t)}function Qf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var yt=typeof Object.is=="function"?Object.is:Qf;function cs(e,t){if(yt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),s=Object.keys(t);if(r.length!==s.length)return!1;for(s=0;s<r.length;s++){var i=r[s];if(!Xa.call(t,i)||!yt(e[i],t[i]))return!1}return!0}function Tc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Fc(e,t){var r=Tc(e);e=0;for(var s;r;){if(r.nodeType===3){if(s=e+r.textContent.length,e<=t&&s>=t)return{node:r,offset:t-e};e=s}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Tc(r)}}function Au(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Au(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Tu(){for(var e=window,t=bi();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=bi(e.document)}return t}function yo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Yf(e){var t=Tu(),r=e.focusedElem,s=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Au(r.ownerDocument.documentElement,r)){if(s!==null&&yo(r)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=r.textContent.length,a=Math.min(s.start,i);s=s.end===void 0?a:Math.min(s.end,i),!e.extend&&a>s&&(i=s,s=a,a=i),i=Fc(r,a);var l=Fc(r,s);i&&l&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),a>s?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Kf=Pt&&"documentMode"in document&&11>=document.documentMode,Vn=null,ml=null,Kr=null,xl=!1;function _c(e,t,r){var s=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;xl||Vn==null||Vn!==bi(s)||(s=Vn,"selectionStart"in s&&yo(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Kr&&cs(Kr,s)||(Kr=s,s=zi(ml,"onSelect"),0<s.length&&(t=new go("onSelect","select",null,t,r),e.push({event:t,listeners:s}),t.target=Vn)))}function Os(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var Qn={animationend:Os("Animation","AnimationEnd"),animationiteration:Os("Animation","AnimationIteration"),animationstart:Os("Animation","AnimationStart"),transitionend:Os("Transition","TransitionEnd")},Sa={},Fu={};Pt&&(Fu=document.createElement("div").style,"AnimationEvent"in window||(delete Qn.animationend.animation,delete Qn.animationiteration.animation,delete Qn.animationstart.animation),"TransitionEvent"in window||delete Qn.transitionend.transition);function Zi(e){if(Sa[e])return Sa[e];if(!Qn[e])return e;var t=Qn[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Fu)return Sa[e]=t[r];return e}var _u=Zi("animationend"),Mu=Zi("animationiteration"),Pu=Zi("animationstart"),Iu=Zi("transitionend"),Ru=new Map,Mc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function on(e,t){Ru.set(e,t),Tn(t,[e])}for(var ka=0;ka<Mc.length;ka++){var Ca=Mc[ka],qf=Ca.toLowerCase(),Xf=Ca[0].toUpperCase()+Ca.slice(1);on(qf,"on"+Xf)}on(_u,"onAnimationEnd");on(Mu,"onAnimationIteration");on(Pu,"onAnimationStart");on("dblclick","onDoubleClick");on("focusin","onFocus");on("focusout","onBlur");on(Iu,"onTransitionEnd");dr("onMouseEnter",["mouseout","mouseover"]);dr("onMouseLeave",["mouseout","mouseover"]);dr("onPointerEnter",["pointerout","pointerover"]);dr("onPointerLeave",["pointerout","pointerover"]);Tn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Tn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Tn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Tn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Tn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Tn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Jf=new Set("cancel close invalid load scroll toggle".split(" ").concat(Wr));function Pc(e,t,r){var s=e.type||"unknown-event";e.currentTarget=r,Kh(s,t,void 0,e),e.currentTarget=null}function Du(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var s=e[r],i=s.event;s=s.listeners;e:{var a=void 0;if(t)for(var l=s.length-1;0<=l;l--){var c=s[l],o=c.instance,d=c.currentTarget;if(c=c.listener,o!==a&&i.isPropagationStopped())break e;Pc(i,c,d),a=o}else for(l=0;l<s.length;l++){if(c=s[l],o=c.instance,d=c.currentTarget,c=c.listener,o!==a&&i.isPropagationStopped())break e;Pc(i,c,d),a=o}}}if(Ni)throw e=pl,Ni=!1,pl=null,e}function ue(e,t){var r=t[wl];r===void 0&&(r=t[wl]=new Set);var s=e+"__bubble";r.has(s)||(Lu(t,e,2,!1),r.add(s))}function Ea(e,t,r){var s=0;t&&(s|=4),Lu(r,e,s,t)}var Bs="_reactListening"+Math.random().toString(36).slice(2);function ds(e){if(!e[Bs]){e[Bs]=!0,Hd.forEach(function(r){r!=="selectionchange"&&(Jf.has(r)||Ea(r,!1,e),Ea(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Bs]||(t[Bs]=!0,Ea("selectionchange",!1,t))}}function Lu(e,t,r,s){switch(bu(t)){case 1:var i=pf;break;case 4:i=hf;break;default:i=ho}r=i.bind(null,t,r,e),i=void 0,!ul||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),s?i!==void 0?e.addEventListener(t,r,{capture:!0,passive:i}):e.addEventListener(t,r,!0):i!==void 0?e.addEventListener(t,r,{passive:i}):e.addEventListener(t,r,!1)}function za(e,t,r,s,i){var a=s;if(!(t&1)&&!(t&2)&&s!==null)e:for(;;){if(s===null)return;var l=s.tag;if(l===3||l===4){var c=s.stateNode.containerInfo;if(c===i||c.nodeType===8&&c.parentNode===i)break;if(l===4)for(l=s.return;l!==null;){var o=l.tag;if((o===3||o===4)&&(o=l.stateNode.containerInfo,o===i||o.nodeType===8&&o.parentNode===i))return;l=l.return}for(;c!==null;){if(l=yn(c),l===null)return;if(o=l.tag,o===5||o===6){s=a=l;continue e}c=c.parentNode}}s=s.return}lu(function(){var d=a,v=oo(r),g=[];e:{var f=Ru.get(e);if(f!==void 0){var j=go,N=e;switch(e){case"keypress":if(ui(r)===0)break e;case"keydown":case"keyup":j=zf;break;case"focusin":N="focus",j=ba;break;case"focusout":N="blur",j=ba;break;case"beforeblur":case"afterblur":j=ba;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":j=wc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":j=mf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":j=Ff;break;case _u:case Mu:case Pu:j=vf;break;case Iu:j=Mf;break;case"scroll":j=ff;break;case"wheel":j=If;break;case"copy":case"cut":case"paste":j=bf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":j=Sc}var A=(t&4)!==0,O=!A&&e==="scroll",m=A?f!==null?f+"Capture":null:f;A=[];for(var p=d,u;p!==null;){u=p;var h=u.stateNode;if(u.tag===5&&h!==null&&(u=h,m!==null&&(h=ss(p,m),h!=null&&A.push(us(p,h,u)))),O)break;p=p.return}0<A.length&&(f=new j(f,N,null,r,v),g.push({event:f,listeners:A}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",j=e==="mouseout"||e==="pointerout",f&&r!==cl&&(N=r.relatedTarget||r.fromElement)&&(yn(N)||N[It]))break e;if((j||f)&&(f=v.window===v?v:(f=v.ownerDocument)?f.defaultView||f.parentWindow:window,j?(N=r.relatedTarget||r.toElement,j=d,N=N?yn(N):null,N!==null&&(O=Fn(N),N!==O||N.tag!==5&&N.tag!==6)&&(N=null)):(j=null,N=d),j!==N)){if(A=wc,h="onMouseLeave",m="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(A=Sc,h="onPointerLeave",m="onPointerEnter",p="pointer"),O=j==null?f:Yn(j),u=N==null?f:Yn(N),f=new A(h,p+"leave",j,r,v),f.target=O,f.relatedTarget=u,h=null,yn(v)===d&&(A=new A(m,p+"enter",N,r,v),A.target=u,A.relatedTarget=O,h=A),O=h,j&&N)t:{for(A=j,m=N,p=0,u=A;u;u=Rn(u))p++;for(u=0,h=m;h;h=Rn(h))u++;for(;0<p-u;)A=Rn(A),p--;for(;0<u-p;)m=Rn(m),u--;for(;p--;){if(A===m||m!==null&&A===m.alternate)break t;A=Rn(A),m=Rn(m)}A=null}else A=null;j!==null&&Ic(g,f,j,A,!1),N!==null&&O!==null&&Ic(g,O,N,A,!0)}}e:{if(f=d?Yn(d):window,j=f.nodeName&&f.nodeName.toLowerCase(),j==="select"||j==="input"&&f.type==="file")var S=Wf;else if(Ec(f))if(Eu)S=Vf;else{S=Uf;var b=Gf}else(j=f.nodeName)&&j.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(S=Hf);if(S&&(S=S(e,d))){Cu(g,S,r,v);break e}b&&b(e,f,d),e==="focusout"&&(b=f._wrapperState)&&b.controlled&&f.type==="number"&&sl(f,"number",f.value)}switch(b=d?Yn(d):window,e){case"focusin":(Ec(b)||b.contentEditable==="true")&&(Vn=b,ml=d,Kr=null);break;case"focusout":Kr=ml=Vn=null;break;case"mousedown":xl=!0;break;case"contextmenu":case"mouseup":case"dragend":xl=!1,_c(g,r,v);break;case"selectionchange":if(Kf)break;case"keydown":case"keyup":_c(g,r,v)}var w;if(xo)e:{switch(e){case"compositionstart":var _="onCompositionStart";break e;case"compositionend":_="onCompositionEnd";break e;case"compositionupdate":_="onCompositionUpdate";break e}_=void 0}else Hn?Su(e,r)&&(_="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(_="onCompositionStart");_&&(Nu&&r.locale!=="ko"&&(Hn||_!=="onCompositionStart"?_==="onCompositionEnd"&&Hn&&(w=wu()):(Vt=v,fo="value"in Vt?Vt.value:Vt.textContent,Hn=!0)),b=zi(d,_),0<b.length&&(_=new Nc(_,e,null,r,v),g.push({event:_,listeners:b}),w?_.data=w:(w=ku(r),w!==null&&(_.data=w)))),(w=Df?Lf(e,r):$f(e,r))&&(d=zi(d,"onBeforeInput"),0<d.length&&(v=new Nc("onBeforeInput","beforeinput",null,r,v),g.push({event:v,listeners:d}),v.data=w))}Du(g,t)})}function us(e,t,r){return{instance:e,listener:t,currentTarget:r}}function zi(e,t){for(var r=t+"Capture",s=[];e!==null;){var i=e,a=i.stateNode;i.tag===5&&a!==null&&(i=a,a=ss(e,r),a!=null&&s.unshift(us(e,a,i)),a=ss(e,t),a!=null&&s.push(us(e,a,i))),e=e.return}return s}function Rn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ic(e,t,r,s,i){for(var a=t._reactName,l=[];r!==null&&r!==s;){var c=r,o=c.alternate,d=c.stateNode;if(o!==null&&o===s)break;c.tag===5&&d!==null&&(c=d,i?(o=ss(r,a),o!=null&&l.unshift(us(r,o,c))):i||(o=ss(r,a),o!=null&&l.push(us(r,o,c)))),r=r.return}l.length!==0&&e.push({event:t,listeners:l})}var Zf=/\r\n?/g,eg=/\u0000|\uFFFD/g;function Rc(e){return(typeof e=="string"?e:""+e).replace(Zf,`
`).replace(eg,"")}function Ws(e,t,r){if(t=Rc(t),Rc(e)!==t&&r)throw Error(I(425))}function Ai(){}var yl=null,vl=null;function jl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var bl=typeof setTimeout=="function"?setTimeout:void 0,tg=typeof clearTimeout=="function"?clearTimeout:void 0,Dc=typeof Promise=="function"?Promise:void 0,ng=typeof queueMicrotask=="function"?queueMicrotask:typeof Dc<"u"?function(e){return Dc.resolve(null).then(e).catch(rg)}:bl;function rg(e){setTimeout(function(){throw e})}function Aa(e,t){var r=t,s=0;do{var i=r.nextSibling;if(e.removeChild(r),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(s===0){e.removeChild(i),ls(t);return}s--}else r!=="$"&&r!=="$?"&&r!=="$!"||s++;r=i}while(r);ls(t)}function Zt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Lc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var wr=Math.random().toString(36).slice(2),wt="__reactFiber$"+wr,ps="__reactProps$"+wr,It="__reactContainer$"+wr,wl="__reactEvents$"+wr,sg="__reactListeners$"+wr,ig="__reactHandles$"+wr;function yn(e){var t=e[wt];if(t)return t;for(var r=e.parentNode;r;){if(t=r[It]||r[wt]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Lc(e);e!==null;){if(r=e[wt])return r;e=Lc(e)}return t}e=r,r=e.parentNode}return null}function Es(e){return e=e[wt]||e[It],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Yn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(I(33))}function ea(e){return e[ps]||null}var Nl=[],Kn=-1;function cn(e){return{current:e}}function pe(e){0>Kn||(e.current=Nl[Kn],Nl[Kn]=null,Kn--)}function ce(e,t){Kn++,Nl[Kn]=e.current,e.current=t}var an={},$e=cn(an),Ye=cn(!1),Nn=an;function ur(e,t){var r=e.type.contextTypes;if(!r)return an;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var i={},a;for(a in r)i[a]=t[a];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Ke(e){return e=e.childContextTypes,e!=null}function Ti(){pe(Ye),pe($e)}function $c(e,t,r){if($e.current!==an)throw Error(I(168));ce($e,t),ce(Ye,r)}function $u(e,t,r){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return r;s=s.getChildContext();for(var i in s)if(!(i in t))throw Error(I(108,Wh(e)||"Unknown",i));return ye({},r,s)}function Fi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||an,Nn=$e.current,ce($e,e),ce(Ye,Ye.current),!0}function Oc(e,t,r){var s=e.stateNode;if(!s)throw Error(I(169));r?(e=$u(e,t,Nn),s.__reactInternalMemoizedMergedChildContext=e,pe(Ye),pe($e),ce($e,e)):pe(Ye),ce(Ye,r)}var At=null,ta=!1,Ta=!1;function Ou(e){At===null?At=[e]:At.push(e)}function ag(e){ta=!0,Ou(e)}function dn(){if(!Ta&&At!==null){Ta=!0;var e=0,t=ie;try{var r=At;for(ie=1;e<r.length;e++){var s=r[e];do s=s(!0);while(s!==null)}At=null,ta=!1}catch(i){throw At!==null&&(At=At.slice(e+1)),uu(co,dn),i}finally{ie=t,Ta=!1}}return null}var qn=[],Xn=0,_i=null,Mi=0,st=[],it=0,Sn=null,Ft=1,_t="";function fn(e,t){qn[Xn++]=Mi,qn[Xn++]=_i,_i=e,Mi=t}function Bu(e,t,r){st[it++]=Ft,st[it++]=_t,st[it++]=Sn,Sn=e;var s=Ft;e=_t;var i=32-mt(s)-1;s&=~(1<<i),r+=1;var a=32-mt(t)+i;if(30<a){var l=i-i%5;a=(s&(1<<l)-1).toString(32),s>>=l,i-=l,Ft=1<<32-mt(t)+i|r<<i|s,_t=a+e}else Ft=1<<a|r<<i|s,_t=e}function vo(e){e.return!==null&&(fn(e,1),Bu(e,1,0))}function jo(e){for(;e===_i;)_i=qn[--Xn],qn[Xn]=null,Mi=qn[--Xn],qn[Xn]=null;for(;e===Sn;)Sn=st[--it],st[it]=null,_t=st[--it],st[it]=null,Ft=st[--it],st[it]=null}var et=null,Ze=null,fe=!1,gt=null;function Wu(e,t){var r=at(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Bc(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,et=e,Ze=Zt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,et=e,Ze=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=Sn!==null?{id:Ft,overflow:_t}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=at(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,et=e,Ze=null,!0):!1;default:return!1}}function Sl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function kl(e){if(fe){var t=Ze;if(t){var r=t;if(!Bc(e,t)){if(Sl(e))throw Error(I(418));t=Zt(r.nextSibling);var s=et;t&&Bc(e,t)?Wu(s,r):(e.flags=e.flags&-4097|2,fe=!1,et=e)}}else{if(Sl(e))throw Error(I(418));e.flags=e.flags&-4097|2,fe=!1,et=e}}}function Wc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;et=e}function Gs(e){if(e!==et)return!1;if(!fe)return Wc(e),fe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!jl(e.type,e.memoizedProps)),t&&(t=Ze)){if(Sl(e))throw Gu(),Error(I(418));for(;t;)Wu(e,t),t=Zt(t.nextSibling)}if(Wc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(I(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Ze=Zt(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Ze=null}}else Ze=et?Zt(e.stateNode.nextSibling):null;return!0}function Gu(){for(var e=Ze;e;)e=Zt(e.nextSibling)}function pr(){Ze=et=null,fe=!1}function bo(e){gt===null?gt=[e]:gt.push(e)}var lg=Lt.ReactCurrentBatchConfig;function pt(e,t){if(e&&e.defaultProps){t=ye({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}var Pi=cn(null),Ii=null,Jn=null,wo=null;function No(){wo=Jn=Ii=null}function So(e){var t=Pi.current;pe(Pi),e._currentValue=t}function Cl(e,t,r){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===r)break;e=e.return}}function ar(e,t){Ii=e,wo=Jn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Qe=!0),e.firstContext=null)}function ct(e){var t=e._currentValue;if(wo!==e)if(e={context:e,memoizedValue:t,next:null},Jn===null){if(Ii===null)throw Error(I(308));Jn=e,Ii.dependencies={lanes:0,firstContext:e}}else Jn=Jn.next=e;return t}var vn=null;function ko(e){vn===null?vn=[e]:vn.push(e)}function Uu(e,t,r,s){var i=t.interleaved;return i===null?(r.next=r,ko(t)):(r.next=i.next,i.next=r),t.interleaved=r,Rt(e,s)}function Rt(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var Gt=!1;function Co(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Hu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Mt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function en(e,t,r){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,se&2){var i=s.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),s.pending=t,Rt(e,r)}return i=s.interleaved,i===null?(t.next=t,ko(s)):(t.next=i.next,i.next=t),s.interleaved=t,Rt(e,r)}function pi(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,uo(e,r)}}function Gc(e,t){var r=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,r===s)){var i=null,a=null;if(r=r.firstBaseUpdate,r!==null){do{var l={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};a===null?i=a=l:a=a.next=l,r=r.next}while(r!==null);a===null?i=a=t:a=a.next=t}else i=a=t;r={baseState:s.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:s.shared,effects:s.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function Ri(e,t,r,s){var i=e.updateQueue;Gt=!1;var a=i.firstBaseUpdate,l=i.lastBaseUpdate,c=i.shared.pending;if(c!==null){i.shared.pending=null;var o=c,d=o.next;o.next=null,l===null?a=d:l.next=d,l=o;var v=e.alternate;v!==null&&(v=v.updateQueue,c=v.lastBaseUpdate,c!==l&&(c===null?v.firstBaseUpdate=d:c.next=d,v.lastBaseUpdate=o))}if(a!==null){var g=i.baseState;l=0,v=d=o=null,c=a;do{var f=c.lane,j=c.eventTime;if((s&f)===f){v!==null&&(v=v.next={eventTime:j,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var N=e,A=c;switch(f=t,j=r,A.tag){case 1:if(N=A.payload,typeof N=="function"){g=N.call(j,g,f);break e}g=N;break e;case 3:N.flags=N.flags&-65537|128;case 0:if(N=A.payload,f=typeof N=="function"?N.call(j,g,f):N,f==null)break e;g=ye({},g,f);break e;case 2:Gt=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,f=i.effects,f===null?i.effects=[c]:f.push(c))}else j={eventTime:j,lane:f,tag:c.tag,payload:c.payload,callback:c.callback,next:null},v===null?(d=v=j,o=g):v=v.next=j,l|=f;if(c=c.next,c===null){if(c=i.shared.pending,c===null)break;f=c,c=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(!0);if(v===null&&(o=g),i.baseState=o,i.firstBaseUpdate=d,i.lastBaseUpdate=v,t=i.shared.interleaved,t!==null){i=t;do l|=i.lane,i=i.next;while(i!==t)}else a===null&&(i.shared.lanes=0);Cn|=l,e.lanes=l,e.memoizedState=g}}function Uc(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],i=s.callback;if(i!==null){if(s.callback=null,s=r,typeof i!="function")throw Error(I(191,i));i.call(s)}}}var Vu=new Ud.Component().refs;function El(e,t,r,s){t=e.memoizedState,r=r(s,t),r=r==null?t:ye({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var na={isMounted:function(e){return(e=e._reactInternals)?Fn(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var s=We(),i=nn(e),a=Mt(s,i);a.payload=t,r!=null&&(a.callback=r),t=en(e,a,i),t!==null&&(xt(t,e,i,s),pi(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var s=We(),i=nn(e),a=Mt(s,i);a.tag=1,a.payload=t,r!=null&&(a.callback=r),t=en(e,a,i),t!==null&&(xt(t,e,i,s),pi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=We(),s=nn(e),i=Mt(r,s);i.tag=2,t!=null&&(i.callback=t),t=en(e,i,s),t!==null&&(xt(t,e,s,r),pi(t,e,s))}};function Hc(e,t,r,s,i,a,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,a,l):t.prototype&&t.prototype.isPureReactComponent?!cs(r,s)||!cs(i,a):!0}function Qu(e,t,r){var s=!1,i=an,a=t.contextType;return typeof a=="object"&&a!==null?a=ct(a):(i=Ke(t)?Nn:$e.current,s=t.contextTypes,a=(s=s!=null)?ur(e,i):an),t=new t(r,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=na,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function Vc(e,t,r,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,s),t.state!==e&&na.enqueueReplaceState(t,t.state,null)}function zl(e,t,r,s){var i=e.stateNode;i.props=r,i.state=e.memoizedState,i.refs=Vu,Co(e);var a=t.contextType;typeof a=="object"&&a!==null?i.context=ct(a):(a=Ke(t)?Nn:$e.current,i.context=ur(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(El(e,t,a,r),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&na.enqueueReplaceState(i,i.state,null),Ri(e,r,i,s),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Tr(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(I(309));var s=r.stateNode}if(!s)throw Error(I(147,e));var i=s,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(l){var c=i.refs;c===Vu&&(c=i.refs={}),l===null?delete c[a]:c[a]=l},t._stringRef=a,t)}if(typeof e!="string")throw Error(I(284));if(!r._owner)throw Error(I(290,e))}return e}function Us(e,t){throw e=Object.prototype.toString.call(t),Error(I(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Qc(e){var t=e._init;return t(e._payload)}function Yu(e){function t(m,p){if(e){var u=m.deletions;u===null?(m.deletions=[p],m.flags|=16):u.push(p)}}function r(m,p){if(!e)return null;for(;p!==null;)t(m,p),p=p.sibling;return null}function s(m,p){for(m=new Map;p!==null;)p.key!==null?m.set(p.key,p):m.set(p.index,p),p=p.sibling;return m}function i(m,p){return m=rn(m,p),m.index=0,m.sibling=null,m}function a(m,p,u){return m.index=u,e?(u=m.alternate,u!==null?(u=u.index,u<p?(m.flags|=2,p):u):(m.flags|=2,p)):(m.flags|=1048576,p)}function l(m){return e&&m.alternate===null&&(m.flags|=2),m}function c(m,p,u,h){return p===null||p.tag!==6?(p=Da(u,m.mode,h),p.return=m,p):(p=i(p,u),p.return=m,p)}function o(m,p,u,h){var S=u.type;return S===Un?v(m,p,u.props.children,h,u.key):p!==null&&(p.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Wt&&Qc(S)===p.type)?(h=i(p,u.props),h.ref=Tr(m,p,u),h.return=m,h):(h=yi(u.type,u.key,u.props,null,m.mode,h),h.ref=Tr(m,p,u),h.return=m,h)}function d(m,p,u,h){return p===null||p.tag!==4||p.stateNode.containerInfo!==u.containerInfo||p.stateNode.implementation!==u.implementation?(p=La(u,m.mode,h),p.return=m,p):(p=i(p,u.children||[]),p.return=m,p)}function v(m,p,u,h,S){return p===null||p.tag!==7?(p=wn(u,m.mode,h,S),p.return=m,p):(p=i(p,u),p.return=m,p)}function g(m,p,u){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Da(""+p,m.mode,u),p.return=m,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Ms:return u=yi(p.type,p.key,p.props,null,m.mode,u),u.ref=Tr(m,null,p),u.return=m,u;case Gn:return p=La(p,m.mode,u),p.return=m,p;case Wt:var h=p._init;return g(m,h(p._payload),u)}if(Or(p)||kr(p))return p=wn(p,m.mode,u,null),p.return=m,p;Us(m,p)}return null}function f(m,p,u,h){var S=p!==null?p.key:null;if(typeof u=="string"&&u!==""||typeof u=="number")return S!==null?null:c(m,p,""+u,h);if(typeof u=="object"&&u!==null){switch(u.$$typeof){case Ms:return u.key===S?o(m,p,u,h):null;case Gn:return u.key===S?d(m,p,u,h):null;case Wt:return S=u._init,f(m,p,S(u._payload),h)}if(Or(u)||kr(u))return S!==null?null:v(m,p,u,h,null);Us(m,u)}return null}function j(m,p,u,h,S){if(typeof h=="string"&&h!==""||typeof h=="number")return m=m.get(u)||null,c(p,m,""+h,S);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Ms:return m=m.get(h.key===null?u:h.key)||null,o(p,m,h,S);case Gn:return m=m.get(h.key===null?u:h.key)||null,d(p,m,h,S);case Wt:var b=h._init;return j(m,p,u,b(h._payload),S)}if(Or(h)||kr(h))return m=m.get(u)||null,v(p,m,h,S,null);Us(p,h)}return null}function N(m,p,u,h){for(var S=null,b=null,w=p,_=p=0,M=null;w!==null&&_<u.length;_++){w.index>_?(M=w,w=null):M=w.sibling;var E=f(m,w,u[_],h);if(E===null){w===null&&(w=M);break}e&&w&&E.alternate===null&&t(m,w),p=a(E,p,_),b===null?S=E:b.sibling=E,b=E,w=M}if(_===u.length)return r(m,w),fe&&fn(m,_),S;if(w===null){for(;_<u.length;_++)w=g(m,u[_],h),w!==null&&(p=a(w,p,_),b===null?S=w:b.sibling=w,b=w);return fe&&fn(m,_),S}for(w=s(m,w);_<u.length;_++)M=j(w,m,_,u[_],h),M!==null&&(e&&M.alternate!==null&&w.delete(M.key===null?_:M.key),p=a(M,p,_),b===null?S=M:b.sibling=M,b=M);return e&&w.forEach(function(L){return t(m,L)}),fe&&fn(m,_),S}function A(m,p,u,h){var S=kr(u);if(typeof S!="function")throw Error(I(150));if(u=S.call(u),u==null)throw Error(I(151));for(var b=S=null,w=p,_=p=0,M=null,E=u.next();w!==null&&!E.done;_++,E=u.next()){w.index>_?(M=w,w=null):M=w.sibling;var L=f(m,w,E.value,h);if(L===null){w===null&&(w=M);break}e&&w&&L.alternate===null&&t(m,w),p=a(L,p,_),b===null?S=L:b.sibling=L,b=L,w=M}if(E.done)return r(m,w),fe&&fn(m,_),S;if(w===null){for(;!E.done;_++,E=u.next())E=g(m,E.value,h),E!==null&&(p=a(E,p,_),b===null?S=E:b.sibling=E,b=E);return fe&&fn(m,_),S}for(w=s(m,w);!E.done;_++,E=u.next())E=j(w,m,_,E.value,h),E!==null&&(e&&E.alternate!==null&&w.delete(E.key===null?_:E.key),p=a(E,p,_),b===null?S=E:b.sibling=E,b=E);return e&&w.forEach(function(V){return t(m,V)}),fe&&fn(m,_),S}function O(m,p,u,h){if(typeof u=="object"&&u!==null&&u.type===Un&&u.key===null&&(u=u.props.children),typeof u=="object"&&u!==null){switch(u.$$typeof){case Ms:e:{for(var S=u.key,b=p;b!==null;){if(b.key===S){if(S=u.type,S===Un){if(b.tag===7){r(m,b.sibling),p=i(b,u.props.children),p.return=m,m=p;break e}}else if(b.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Wt&&Qc(S)===b.type){r(m,b.sibling),p=i(b,u.props),p.ref=Tr(m,b,u),p.return=m,m=p;break e}r(m,b);break}else t(m,b);b=b.sibling}u.type===Un?(p=wn(u.props.children,m.mode,h,u.key),p.return=m,m=p):(h=yi(u.type,u.key,u.props,null,m.mode,h),h.ref=Tr(m,p,u),h.return=m,m=h)}return l(m);case Gn:e:{for(b=u.key;p!==null;){if(p.key===b)if(p.tag===4&&p.stateNode.containerInfo===u.containerInfo&&p.stateNode.implementation===u.implementation){r(m,p.sibling),p=i(p,u.children||[]),p.return=m,m=p;break e}else{r(m,p);break}else t(m,p);p=p.sibling}p=La(u,m.mode,h),p.return=m,m=p}return l(m);case Wt:return b=u._init,O(m,p,b(u._payload),h)}if(Or(u))return N(m,p,u,h);if(kr(u))return A(m,p,u,h);Us(m,u)}return typeof u=="string"&&u!==""||typeof u=="number"?(u=""+u,p!==null&&p.tag===6?(r(m,p.sibling),p=i(p,u),p.return=m,m=p):(r(m,p),p=Da(u,m.mode,h),p.return=m,m=p),l(m)):r(m,p)}return O}var hr=Yu(!0),Ku=Yu(!1),zs={},kt=cn(zs),hs=cn(zs),fs=cn(zs);function jn(e){if(e===zs)throw Error(I(174));return e}function Eo(e,t){switch(ce(fs,t),ce(hs,e),ce(kt,zs),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:al(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=al(t,e)}pe(kt),ce(kt,t)}function fr(){pe(kt),pe(hs),pe(fs)}function qu(e){jn(fs.current);var t=jn(kt.current),r=al(t,e.type);t!==r&&(ce(hs,e),ce(kt,r))}function zo(e){hs.current===e&&(pe(kt),pe(hs))}var me=cn(0);function Di(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Fa=[];function Ao(){for(var e=0;e<Fa.length;e++)Fa[e]._workInProgressVersionPrimary=null;Fa.length=0}var hi=Lt.ReactCurrentDispatcher,_a=Lt.ReactCurrentBatchConfig,kn=0,xe=null,Se=null,Ce=null,Li=!1,qr=!1,gs=0,og=0;function Pe(){throw Error(I(321))}function To(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!yt(e[r],t[r]))return!1;return!0}function Fo(e,t,r,s,i,a){if(kn=a,xe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,hi.current=e===null||e.memoizedState===null?pg:hg,e=r(s,i),qr){a=0;do{if(qr=!1,gs=0,25<=a)throw Error(I(301));a+=1,Ce=Se=null,t.updateQueue=null,hi.current=fg,e=r(s,i)}while(qr)}if(hi.current=$i,t=Se!==null&&Se.next!==null,kn=0,Ce=Se=xe=null,Li=!1,t)throw Error(I(300));return e}function _o(){var e=gs!==0;return gs=0,e}function bt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ce===null?xe.memoizedState=Ce=e:Ce=Ce.next=e,Ce}function dt(){if(Se===null){var e=xe.alternate;e=e!==null?e.memoizedState:null}else e=Se.next;var t=Ce===null?xe.memoizedState:Ce.next;if(t!==null)Ce=t,Se=e;else{if(e===null)throw Error(I(310));Se=e,e={memoizedState:Se.memoizedState,baseState:Se.baseState,baseQueue:Se.baseQueue,queue:Se.queue,next:null},Ce===null?xe.memoizedState=Ce=e:Ce=Ce.next=e}return Ce}function ms(e,t){return typeof t=="function"?t(e):t}function Ma(e){var t=dt(),r=t.queue;if(r===null)throw Error(I(311));r.lastRenderedReducer=e;var s=Se,i=s.baseQueue,a=r.pending;if(a!==null){if(i!==null){var l=i.next;i.next=a.next,a.next=l}s.baseQueue=i=a,r.pending=null}if(i!==null){a=i.next,s=s.baseState;var c=l=null,o=null,d=a;do{var v=d.lane;if((kn&v)===v)o!==null&&(o=o.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),s=d.hasEagerState?d.eagerState:e(s,d.action);else{var g={lane:v,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};o===null?(c=o=g,l=s):o=o.next=g,xe.lanes|=v,Cn|=v}d=d.next}while(d!==null&&d!==a);o===null?l=s:o.next=c,yt(s,t.memoizedState)||(Qe=!0),t.memoizedState=s,t.baseState=l,t.baseQueue=o,r.lastRenderedState=s}if(e=r.interleaved,e!==null){i=e;do a=i.lane,xe.lanes|=a,Cn|=a,i=i.next;while(i!==e)}else i===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function Pa(e){var t=dt(),r=t.queue;if(r===null)throw Error(I(311));r.lastRenderedReducer=e;var s=r.dispatch,i=r.pending,a=t.memoizedState;if(i!==null){r.pending=null;var l=i=i.next;do a=e(a,l.action),l=l.next;while(l!==i);yt(a,t.memoizedState)||(Qe=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),r.lastRenderedState=a}return[a,s]}function Xu(){}function Ju(e,t){var r=xe,s=dt(),i=t(),a=!yt(s.memoizedState,i);if(a&&(s.memoizedState=i,Qe=!0),s=s.queue,Mo(tp.bind(null,r,s,e),[e]),s.getSnapshot!==t||a||Ce!==null&&Ce.memoizedState.tag&1){if(r.flags|=2048,xs(9,ep.bind(null,r,s,i,t),void 0,null),Ee===null)throw Error(I(349));kn&30||Zu(r,t,i)}return i}function Zu(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=xe.updateQueue,t===null?(t={lastEffect:null,stores:null},xe.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function ep(e,t,r,s){t.value=r,t.getSnapshot=s,np(t)&&rp(e)}function tp(e,t,r){return r(function(){np(t)&&rp(e)})}function np(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!yt(e,r)}catch{return!0}}function rp(e){var t=Rt(e,1);t!==null&&xt(t,e,1,-1)}function Yc(e){var t=bt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:e},t.queue=e,e=e.dispatch=ug.bind(null,xe,e),[t.memoizedState,e]}function xs(e,t,r,s){return e={tag:e,create:t,destroy:r,deps:s,next:null},t=xe.updateQueue,t===null?(t={lastEffect:null,stores:null},xe.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(s=r.next,r.next=e,e.next=s,t.lastEffect=e)),e}function sp(){return dt().memoizedState}function fi(e,t,r,s){var i=bt();xe.flags|=e,i.memoizedState=xs(1|t,r,void 0,s===void 0?null:s)}function ra(e,t,r,s){var i=dt();s=s===void 0?null:s;var a=void 0;if(Se!==null){var l=Se.memoizedState;if(a=l.destroy,s!==null&&To(s,l.deps)){i.memoizedState=xs(t,r,a,s);return}}xe.flags|=e,i.memoizedState=xs(1|t,r,a,s)}function Kc(e,t){return fi(8390656,8,e,t)}function Mo(e,t){return ra(2048,8,e,t)}function ip(e,t){return ra(4,2,e,t)}function ap(e,t){return ra(4,4,e,t)}function lp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function op(e,t,r){return r=r!=null?r.concat([e]):null,ra(4,4,lp.bind(null,t,e),r)}function Po(){}function cp(e,t){var r=dt();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&To(t,s[1])?s[0]:(r.memoizedState=[e,t],e)}function dp(e,t){var r=dt();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&To(t,s[1])?s[0]:(e=e(),r.memoizedState=[e,t],e)}function up(e,t,r){return kn&21?(yt(r,t)||(r=fu(),xe.lanes|=r,Cn|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Qe=!0),e.memoizedState=r)}function cg(e,t){var r=ie;ie=r!==0&&4>r?r:4,e(!0);var s=_a.transition;_a.transition={};try{e(!1),t()}finally{ie=r,_a.transition=s}}function pp(){return dt().memoizedState}function dg(e,t,r){var s=nn(e);if(r={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null},hp(e))fp(t,r);else if(r=Uu(e,t,r,s),r!==null){var i=We();xt(r,e,s,i),gp(r,t,s)}}function ug(e,t,r){var s=nn(e),i={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null};if(hp(e))fp(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var l=t.lastRenderedState,c=a(l,r);if(i.hasEagerState=!0,i.eagerState=c,yt(c,l)){var o=t.interleaved;o===null?(i.next=i,ko(t)):(i.next=o.next,o.next=i),t.interleaved=i;return}}catch{}finally{}r=Uu(e,t,i,s),r!==null&&(i=We(),xt(r,e,s,i),gp(r,t,s))}}function hp(e){var t=e.alternate;return e===xe||t!==null&&t===xe}function fp(e,t){qr=Li=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function gp(e,t,r){if(r&4194240){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,uo(e,r)}}var $i={readContext:ct,useCallback:Pe,useContext:Pe,useEffect:Pe,useImperativeHandle:Pe,useInsertionEffect:Pe,useLayoutEffect:Pe,useMemo:Pe,useReducer:Pe,useRef:Pe,useState:Pe,useDebugValue:Pe,useDeferredValue:Pe,useTransition:Pe,useMutableSource:Pe,useSyncExternalStore:Pe,useId:Pe,unstable_isNewReconciler:!1},pg={readContext:ct,useCallback:function(e,t){return bt().memoizedState=[e,t===void 0?null:t],e},useContext:ct,useEffect:Kc,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,fi(4194308,4,lp.bind(null,t,e),r)},useLayoutEffect:function(e,t){return fi(4194308,4,e,t)},useInsertionEffect:function(e,t){return fi(4,2,e,t)},useMemo:function(e,t){var r=bt();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var s=bt();return t=r!==void 0?r(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=dg.bind(null,xe,e),[s.memoizedState,e]},useRef:function(e){var t=bt();return e={current:e},t.memoizedState=e},useState:Yc,useDebugValue:Po,useDeferredValue:function(e){return bt().memoizedState=e},useTransition:function(){var e=Yc(!1),t=e[0];return e=cg.bind(null,e[1]),bt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var s=xe,i=bt();if(fe){if(r===void 0)throw Error(I(407));r=r()}else{if(r=t(),Ee===null)throw Error(I(349));kn&30||Zu(s,t,r)}i.memoizedState=r;var a={value:r,getSnapshot:t};return i.queue=a,Kc(tp.bind(null,s,a,e),[e]),s.flags|=2048,xs(9,ep.bind(null,s,a,r,t),void 0,null),r},useId:function(){var e=bt(),t=Ee.identifierPrefix;if(fe){var r=_t,s=Ft;r=(s&~(1<<32-mt(s)-1)).toString(32)+r,t=":"+t+"R"+r,r=gs++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=og++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},hg={readContext:ct,useCallback:cp,useContext:ct,useEffect:Mo,useImperativeHandle:op,useInsertionEffect:ip,useLayoutEffect:ap,useMemo:dp,useReducer:Ma,useRef:sp,useState:function(){return Ma(ms)},useDebugValue:Po,useDeferredValue:function(e){var t=dt();return up(t,Se.memoizedState,e)},useTransition:function(){var e=Ma(ms)[0],t=dt().memoizedState;return[e,t]},useMutableSource:Xu,useSyncExternalStore:Ju,useId:pp,unstable_isNewReconciler:!1},fg={readContext:ct,useCallback:cp,useContext:ct,useEffect:Mo,useImperativeHandle:op,useInsertionEffect:ip,useLayoutEffect:ap,useMemo:dp,useReducer:Pa,useRef:sp,useState:function(){return Pa(ms)},useDebugValue:Po,useDeferredValue:function(e){var t=dt();return Se===null?t.memoizedState=e:up(t,Se.memoizedState,e)},useTransition:function(){var e=Pa(ms)[0],t=dt().memoizedState;return[e,t]},useMutableSource:Xu,useSyncExternalStore:Ju,useId:pp,unstable_isNewReconciler:!1};function gr(e,t){try{var r="",s=t;do r+=Bh(s),s=s.return;while(s);var i=r}catch(a){i=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:i,digest:null}}function Ia(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Al(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var gg=typeof WeakMap=="function"?WeakMap:Map;function mp(e,t,r){r=Mt(-1,r),r.tag=3,r.payload={element:null};var s=t.value;return r.callback=function(){Bi||(Bi=!0,$l=s),Al(e,t)},r}function xp(e,t,r){r=Mt(-1,r),r.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var i=t.value;r.payload=function(){return s(i)},r.callback=function(){Al(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(r.callback=function(){Al(e,t),typeof s!="function"&&(tn===null?tn=new Set([this]):tn.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),r}function qc(e,t,r){var s=e.pingCache;if(s===null){s=e.pingCache=new gg;var i=new Set;s.set(t,i)}else i=s.get(t),i===void 0&&(i=new Set,s.set(t,i));i.has(r)||(i.add(r),e=Ag.bind(null,e,t,r),t.then(e,e))}function Xc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Jc(e,t,r,s,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=Mt(-1,1),t.tag=2,en(r,t,1))),r.lanes|=1),e)}var mg=Lt.ReactCurrentOwner,Qe=!1;function Be(e,t,r,s){t.child=e===null?Ku(t,null,r,s):hr(t,e.child,r,s)}function Zc(e,t,r,s,i){r=r.render;var a=t.ref;return ar(t,i),s=Fo(e,t,r,s,a,i),r=_o(),e!==null&&!Qe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Dt(e,t,i)):(fe&&r&&vo(t),t.flags|=1,Be(e,t,s,i),t.child)}function ed(e,t,r,s,i){if(e===null){var a=r.type;return typeof a=="function"&&!Wo(a)&&a.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=a,yp(e,t,a,s,i)):(e=yi(r.type,null,s,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&i)){var l=a.memoizedProps;if(r=r.compare,r=r!==null?r:cs,r(l,s)&&e.ref===t.ref)return Dt(e,t,i)}return t.flags|=1,e=rn(a,s),e.ref=t.ref,e.return=t,t.child=e}function yp(e,t,r,s,i){if(e!==null){var a=e.memoizedProps;if(cs(a,s)&&e.ref===t.ref)if(Qe=!1,t.pendingProps=s=a,(e.lanes&i)!==0)e.flags&131072&&(Qe=!0);else return t.lanes=e.lanes,Dt(e,t,i)}return Tl(e,t,r,s,i)}function vp(e,t,r){var s=t.pendingProps,i=s.children,a=e!==null?e.memoizedState:null;if(s.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ce(er,Je),Je|=r;else{if(!(r&1073741824))return e=a!==null?a.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ce(er,Je),Je|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=a!==null?a.baseLanes:r,ce(er,Je),Je|=s}else a!==null?(s=a.baseLanes|r,t.memoizedState=null):s=r,ce(er,Je),Je|=s;return Be(e,t,i,r),t.child}function jp(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function Tl(e,t,r,s,i){var a=Ke(r)?Nn:$e.current;return a=ur(t,a),ar(t,i),r=Fo(e,t,r,s,a,i),s=_o(),e!==null&&!Qe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Dt(e,t,i)):(fe&&s&&vo(t),t.flags|=1,Be(e,t,r,i),t.child)}function td(e,t,r,s,i){if(Ke(r)){var a=!0;Fi(t)}else a=!1;if(ar(t,i),t.stateNode===null)gi(e,t),Qu(t,r,s),zl(t,r,s,i),s=!0;else if(e===null){var l=t.stateNode,c=t.memoizedProps;l.props=c;var o=l.context,d=r.contextType;typeof d=="object"&&d!==null?d=ct(d):(d=Ke(r)?Nn:$e.current,d=ur(t,d));var v=r.getDerivedStateFromProps,g=typeof v=="function"||typeof l.getSnapshotBeforeUpdate=="function";g||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(c!==s||o!==d)&&Vc(t,l,s,d),Gt=!1;var f=t.memoizedState;l.state=f,Ri(t,s,l,i),o=t.memoizedState,c!==s||f!==o||Ye.current||Gt?(typeof v=="function"&&(El(t,r,v,s),o=t.memoizedState),(c=Gt||Hc(t,r,c,s,f,o,d))?(g||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=o),l.props=s,l.state=o,l.context=d,s=c):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{l=t.stateNode,Hu(e,t),c=t.memoizedProps,d=t.type===t.elementType?c:pt(t.type,c),l.props=d,g=t.pendingProps,f=l.context,o=r.contextType,typeof o=="object"&&o!==null?o=ct(o):(o=Ke(r)?Nn:$e.current,o=ur(t,o));var j=r.getDerivedStateFromProps;(v=typeof j=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(c!==g||f!==o)&&Vc(t,l,s,o),Gt=!1,f=t.memoizedState,l.state=f,Ri(t,s,l,i);var N=t.memoizedState;c!==g||f!==N||Ye.current||Gt?(typeof j=="function"&&(El(t,r,j,s),N=t.memoizedState),(d=Gt||Hc(t,r,d,s,f,N,o)||!1)?(v||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(s,N,o),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(s,N,o)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||c===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=N),l.props=s,l.state=N,l.context=o,s=d):(typeof l.componentDidUpdate!="function"||c===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),s=!1)}return Fl(e,t,r,s,a,i)}function Fl(e,t,r,s,i,a){jp(e,t);var l=(t.flags&128)!==0;if(!s&&!l)return i&&Oc(t,r,!1),Dt(e,t,a);s=t.stateNode,mg.current=t;var c=l&&typeof r.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&l?(t.child=hr(t,e.child,null,a),t.child=hr(t,null,c,a)):Be(e,t,c,a),t.memoizedState=s.state,i&&Oc(t,r,!0),t.child}function bp(e){var t=e.stateNode;t.pendingContext?$c(e,t.pendingContext,t.pendingContext!==t.context):t.context&&$c(e,t.context,!1),Eo(e,t.containerInfo)}function nd(e,t,r,s,i){return pr(),bo(i),t.flags|=256,Be(e,t,r,s),t.child}var _l={dehydrated:null,treeContext:null,retryLane:0};function Ml(e){return{baseLanes:e,cachePool:null,transitions:null}}function wp(e,t,r){var s=t.pendingProps,i=me.current,a=!1,l=(t.flags&128)!==0,c;if((c=l)||(c=e!==null&&e.memoizedState===null?!1:(i&2)!==0),c?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),ce(me,i&1),e===null)return kl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=s.children,e=s.fallback,a?(s=t.mode,a=t.child,l={mode:"hidden",children:l},!(s&1)&&a!==null?(a.childLanes=0,a.pendingProps=l):a=aa(l,s,0,null),e=wn(e,s,r,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Ml(r),t.memoizedState=_l,e):Io(t,l));if(i=e.memoizedState,i!==null&&(c=i.dehydrated,c!==null))return xg(e,t,l,s,c,i,r);if(a){a=s.fallback,l=t.mode,i=e.child,c=i.sibling;var o={mode:"hidden",children:s.children};return!(l&1)&&t.child!==i?(s=t.child,s.childLanes=0,s.pendingProps=o,t.deletions=null):(s=rn(i,o),s.subtreeFlags=i.subtreeFlags&14680064),c!==null?a=rn(c,a):(a=wn(a,l,r,null),a.flags|=2),a.return=t,s.return=t,s.sibling=a,t.child=s,s=a,a=t.child,l=e.child.memoizedState,l=l===null?Ml(r):{baseLanes:l.baseLanes|r,cachePool:null,transitions:l.transitions},a.memoizedState=l,a.childLanes=e.childLanes&~r,t.memoizedState=_l,s}return a=e.child,e=a.sibling,s=rn(a,{mode:"visible",children:s.children}),!(t.mode&1)&&(s.lanes=r),s.return=t,s.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=s,t.memoizedState=null,s}function Io(e,t){return t=aa({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Hs(e,t,r,s){return s!==null&&bo(s),hr(t,e.child,null,r),e=Io(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function xg(e,t,r,s,i,a,l){if(r)return t.flags&256?(t.flags&=-257,s=Ia(Error(I(422))),Hs(e,t,l,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=s.fallback,i=t.mode,s=aa({mode:"visible",children:s.children},i,0,null),a=wn(a,i,l,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,t.mode&1&&hr(t,e.child,null,l),t.child.memoizedState=Ml(l),t.memoizedState=_l,a);if(!(t.mode&1))return Hs(e,t,l,null);if(i.data==="$!"){if(s=i.nextSibling&&i.nextSibling.dataset,s)var c=s.dgst;return s=c,a=Error(I(419)),s=Ia(a,s,void 0),Hs(e,t,l,s)}if(c=(l&e.childLanes)!==0,Qe||c){if(s=Ee,s!==null){switch(l&-l){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(s.suspendedLanes|l)?0:i,i!==0&&i!==a.retryLane&&(a.retryLane=i,Rt(e,i),xt(s,e,i,-1))}return Bo(),s=Ia(Error(I(421))),Hs(e,t,l,s)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=Tg.bind(null,e),i._reactRetry=t,null):(e=a.treeContext,Ze=Zt(i.nextSibling),et=t,fe=!0,gt=null,e!==null&&(st[it++]=Ft,st[it++]=_t,st[it++]=Sn,Ft=e.id,_t=e.overflow,Sn=t),t=Io(t,s.children),t.flags|=4096,t)}function rd(e,t,r){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),Cl(e.return,t,r)}function Ra(e,t,r,s,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:r,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=s,a.tail=r,a.tailMode=i)}function Np(e,t,r){var s=t.pendingProps,i=s.revealOrder,a=s.tail;if(Be(e,t,s.children,r),s=me.current,s&2)s=s&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&rd(e,r,t);else if(e.tag===19)rd(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(ce(me,s),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(r=t.child,i=null;r!==null;)e=r.alternate,e!==null&&Di(e)===null&&(i=r),r=r.sibling;r=i,r===null?(i=t.child,t.child=null):(i=r.sibling,r.sibling=null),Ra(t,!1,i,r,a);break;case"backwards":for(r=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Di(e)===null){t.child=i;break}e=i.sibling,i.sibling=r,r=i,i=e}Ra(t,!0,r,null,a);break;case"together":Ra(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function gi(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Dt(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Cn|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(I(153));if(t.child!==null){for(e=t.child,r=rn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=rn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function yg(e,t,r){switch(t.tag){case 3:bp(t),pr();break;case 5:qu(t);break;case 1:Ke(t.type)&&Fi(t);break;case 4:Eo(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,i=t.memoizedProps.value;ce(Pi,s._currentValue),s._currentValue=i;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(ce(me,me.current&1),t.flags|=128,null):r&t.child.childLanes?wp(e,t,r):(ce(me,me.current&1),e=Dt(e,t,r),e!==null?e.sibling:null);ce(me,me.current&1);break;case 19:if(s=(r&t.childLanes)!==0,e.flags&128){if(s)return Np(e,t,r);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ce(me,me.current),s)break;return null;case 22:case 23:return t.lanes=0,vp(e,t,r)}return Dt(e,t,r)}var Sp,Pl,kp,Cp;Sp=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};Pl=function(){};kp=function(e,t,r,s){var i=e.memoizedProps;if(i!==s){e=t.stateNode,jn(kt.current);var a=null;switch(r){case"input":i=nl(e,i),s=nl(e,s),a=[];break;case"select":i=ye({},i,{value:void 0}),s=ye({},s,{value:void 0}),a=[];break;case"textarea":i=il(e,i),s=il(e,s),a=[];break;default:typeof i.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=Ai)}ll(r,s);var l;r=null;for(d in i)if(!s.hasOwnProperty(d)&&i.hasOwnProperty(d)&&i[d]!=null)if(d==="style"){var c=i[d];for(l in c)c.hasOwnProperty(l)&&(r||(r={}),r[l]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(ns.hasOwnProperty(d)?a||(a=[]):(a=a||[]).push(d,null));for(d in s){var o=s[d];if(c=i!=null?i[d]:void 0,s.hasOwnProperty(d)&&o!==c&&(o!=null||c!=null))if(d==="style")if(c){for(l in c)!c.hasOwnProperty(l)||o&&o.hasOwnProperty(l)||(r||(r={}),r[l]="");for(l in o)o.hasOwnProperty(l)&&c[l]!==o[l]&&(r||(r={}),r[l]=o[l])}else r||(a||(a=[]),a.push(d,r)),r=o;else d==="dangerouslySetInnerHTML"?(o=o?o.__html:void 0,c=c?c.__html:void 0,o!=null&&c!==o&&(a=a||[]).push(d,o)):d==="children"?typeof o!="string"&&typeof o!="number"||(a=a||[]).push(d,""+o):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(ns.hasOwnProperty(d)?(o!=null&&d==="onScroll"&&ue("scroll",e),a||c===o||(a=[])):(a=a||[]).push(d,o))}r&&(a=a||[]).push("style",r);var d=a;(t.updateQueue=d)&&(t.flags|=4)}};Cp=function(e,t,r,s){r!==s&&(t.flags|=4)};function Fr(e,t){if(!fe)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var s=null;r!==null;)r.alternate!==null&&(s=r),r=r.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function Ie(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,s=0;if(t)for(var i=e.child;i!==null;)r|=i.lanes|i.childLanes,s|=i.subtreeFlags&14680064,s|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)r|=i.lanes|i.childLanes,s|=i.subtreeFlags,s|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=s,e.childLanes=r,t}function vg(e,t,r){var s=t.pendingProps;switch(jo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ie(t),null;case 1:return Ke(t.type)&&Ti(),Ie(t),null;case 3:return s=t.stateNode,fr(),pe(Ye),pe($e),Ao(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(Gs(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,gt!==null&&(Wl(gt),gt=null))),Pl(e,t),Ie(t),null;case 5:zo(t);var i=jn(fs.current);if(r=t.type,e!==null&&t.stateNode!=null)kp(e,t,r,s,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(I(166));return Ie(t),null}if(e=jn(kt.current),Gs(t)){s=t.stateNode,r=t.type;var a=t.memoizedProps;switch(s[wt]=t,s[ps]=a,e=(t.mode&1)!==0,r){case"dialog":ue("cancel",s),ue("close",s);break;case"iframe":case"object":case"embed":ue("load",s);break;case"video":case"audio":for(i=0;i<Wr.length;i++)ue(Wr[i],s);break;case"source":ue("error",s);break;case"img":case"image":case"link":ue("error",s),ue("load",s);break;case"details":ue("toggle",s);break;case"input":pc(s,a),ue("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!a.multiple},ue("invalid",s);break;case"textarea":fc(s,a),ue("invalid",s)}ll(r,a),i=null;for(var l in a)if(a.hasOwnProperty(l)){var c=a[l];l==="children"?typeof c=="string"?s.textContent!==c&&(a.suppressHydrationWarning!==!0&&Ws(s.textContent,c,e),i=["children",c]):typeof c=="number"&&s.textContent!==""+c&&(a.suppressHydrationWarning!==!0&&Ws(s.textContent,c,e),i=["children",""+c]):ns.hasOwnProperty(l)&&c!=null&&l==="onScroll"&&ue("scroll",s)}switch(r){case"input":Ps(s),hc(s,a,!0);break;case"textarea":Ps(s),gc(s);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(s.onclick=Ai)}s=i,t.updateQueue=s,s!==null&&(t.flags|=4)}else{l=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Zd(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=l.createElement(r,{is:s.is}):(e=l.createElement(r),r==="select"&&(l=e,s.multiple?l.multiple=!0:s.size&&(l.size=s.size))):e=l.createElementNS(e,r),e[wt]=t,e[ps]=s,Sp(e,t,!1,!1),t.stateNode=e;e:{switch(l=ol(r,s),r){case"dialog":ue("cancel",e),ue("close",e),i=s;break;case"iframe":case"object":case"embed":ue("load",e),i=s;break;case"video":case"audio":for(i=0;i<Wr.length;i++)ue(Wr[i],e);i=s;break;case"source":ue("error",e),i=s;break;case"img":case"image":case"link":ue("error",e),ue("load",e),i=s;break;case"details":ue("toggle",e),i=s;break;case"input":pc(e,s),i=nl(e,s),ue("invalid",e);break;case"option":i=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},i=ye({},s,{value:void 0}),ue("invalid",e);break;case"textarea":fc(e,s),i=il(e,s),ue("invalid",e);break;default:i=s}ll(r,i),c=i;for(a in c)if(c.hasOwnProperty(a)){var o=c[a];a==="style"?nu(e,o):a==="dangerouslySetInnerHTML"?(o=o?o.__html:void 0,o!=null&&eu(e,o)):a==="children"?typeof o=="string"?(r!=="textarea"||o!=="")&&rs(e,o):typeof o=="number"&&rs(e,""+o):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(ns.hasOwnProperty(a)?o!=null&&a==="onScroll"&&ue("scroll",e):o!=null&&so(e,a,o,l))}switch(r){case"input":Ps(e),hc(e,s,!1);break;case"textarea":Ps(e),gc(e);break;case"option":s.value!=null&&e.setAttribute("value",""+sn(s.value));break;case"select":e.multiple=!!s.multiple,a=s.value,a!=null?nr(e,!!s.multiple,a,!1):s.defaultValue!=null&&nr(e,!!s.multiple,s.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Ai)}switch(r){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ie(t),null;case 6:if(e&&t.stateNode!=null)Cp(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(I(166));if(r=jn(fs.current),jn(kt.current),Gs(t)){if(s=t.stateNode,r=t.memoizedProps,s[wt]=t,(a=s.nodeValue!==r)&&(e=et,e!==null))switch(e.tag){case 3:Ws(s.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ws(s.nodeValue,r,(e.mode&1)!==0)}a&&(t.flags|=4)}else s=(r.nodeType===9?r:r.ownerDocument).createTextNode(s),s[wt]=t,t.stateNode=s}return Ie(t),null;case 13:if(pe(me),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(fe&&Ze!==null&&t.mode&1&&!(t.flags&128))Gu(),pr(),t.flags|=98560,a=!1;else if(a=Gs(t),s!==null&&s.dehydrated!==null){if(e===null){if(!a)throw Error(I(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(I(317));a[wt]=t}else pr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ie(t),a=!1}else gt!==null&&(Wl(gt),gt=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,t.mode&1&&(e===null||me.current&1?ke===0&&(ke=3):Bo())),t.updateQueue!==null&&(t.flags|=4),Ie(t),null);case 4:return fr(),Pl(e,t),e===null&&ds(t.stateNode.containerInfo),Ie(t),null;case 10:return So(t.type._context),Ie(t),null;case 17:return Ke(t.type)&&Ti(),Ie(t),null;case 19:if(pe(me),a=t.memoizedState,a===null)return Ie(t),null;if(s=(t.flags&128)!==0,l=a.rendering,l===null)if(s)Fr(a,!1);else{if(ke!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=Di(e),l!==null){for(t.flags|=128,Fr(a,!1),s=l.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=r,r=t.child;r!==null;)a=r,e=s,a.flags&=14680066,l=a.alternate,l===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,a.type=l.type,e=l.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return ce(me,me.current&1|2),t.child}e=e.sibling}a.tail!==null&&be()>mr&&(t.flags|=128,s=!0,Fr(a,!1),t.lanes=4194304)}else{if(!s)if(e=Di(l),e!==null){if(t.flags|=128,s=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Fr(a,!0),a.tail===null&&a.tailMode==="hidden"&&!l.alternate&&!fe)return Ie(t),null}else 2*be()-a.renderingStartTime>mr&&r!==1073741824&&(t.flags|=128,s=!0,Fr(a,!1),t.lanes=4194304);a.isBackwards?(l.sibling=t.child,t.child=l):(r=a.last,r!==null?r.sibling=l:t.child=l,a.last=l)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=be(),t.sibling=null,r=me.current,ce(me,s?r&1|2:r&1),t):(Ie(t),null);case 22:case 23:return Oo(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&t.mode&1?Je&1073741824&&(Ie(t),t.subtreeFlags&6&&(t.flags|=8192)):Ie(t),null;case 24:return null;case 25:return null}throw Error(I(156,t.tag))}function jg(e,t){switch(jo(t),t.tag){case 1:return Ke(t.type)&&Ti(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return fr(),pe(Ye),pe($e),Ao(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return zo(t),null;case 13:if(pe(me),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(I(340));pr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pe(me),null;case 4:return fr(),null;case 10:return So(t.type._context),null;case 22:case 23:return Oo(),null;case 24:return null;default:return null}}var Vs=!1,De=!1,bg=typeof WeakSet=="function"?WeakSet:Set,K=null;function Zn(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(s){je(e,t,s)}else r.current=null}function Il(e,t,r){try{r()}catch(s){je(e,t,s)}}var sd=!1;function wg(e,t){if(yl=Ci,e=Tu(),yo(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var s=r.getSelection&&r.getSelection();if(s&&s.rangeCount!==0){r=s.anchorNode;var i=s.anchorOffset,a=s.focusNode;s=s.focusOffset;try{r.nodeType,a.nodeType}catch{r=null;break e}var l=0,c=-1,o=-1,d=0,v=0,g=e,f=null;t:for(;;){for(var j;g!==r||i!==0&&g.nodeType!==3||(c=l+i),g!==a||s!==0&&g.nodeType!==3||(o=l+s),g.nodeType===3&&(l+=g.nodeValue.length),(j=g.firstChild)!==null;)f=g,g=j;for(;;){if(g===e)break t;if(f===r&&++d===i&&(c=l),f===a&&++v===s&&(o=l),(j=g.nextSibling)!==null)break;g=f,f=g.parentNode}g=j}r=c===-1||o===-1?null:{start:c,end:o}}else r=null}r=r||{start:0,end:0}}else r=null;for(vl={focusedElem:e,selectionRange:r},Ci=!1,K=t;K!==null;)if(t=K,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,K=e;else for(;K!==null;){t=K;try{var N=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(N!==null){var A=N.memoizedProps,O=N.memoizedState,m=t.stateNode,p=m.getSnapshotBeforeUpdate(t.elementType===t.type?A:pt(t.type,A),O);m.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var u=t.stateNode.containerInfo;u.nodeType===1?u.textContent="":u.nodeType===9&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(I(163))}}catch(h){je(t,t.return,h)}if(e=t.sibling,e!==null){e.return=t.return,K=e;break}K=t.return}return N=sd,sd=!1,N}function Xr(e,t,r){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var i=s=s.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,a!==void 0&&Il(t,r,a)}i=i.next}while(i!==s)}}function sa(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var s=r.create;r.destroy=s()}r=r.next}while(r!==t)}}function Rl(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Ep(e){var t=e.alternate;t!==null&&(e.alternate=null,Ep(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[wt],delete t[ps],delete t[wl],delete t[sg],delete t[ig])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function zp(e){return e.tag===5||e.tag===3||e.tag===4}function id(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||zp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Dl(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Ai));else if(s!==4&&(e=e.child,e!==null))for(Dl(e,t,r),e=e.sibling;e!==null;)Dl(e,t,r),e=e.sibling}function Ll(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(Ll(e,t,r),e=e.sibling;e!==null;)Ll(e,t,r),e=e.sibling}var ze=null,ft=!1;function Ot(e,t,r){for(r=r.child;r!==null;)Ap(e,t,r),r=r.sibling}function Ap(e,t,r){if(St&&typeof St.onCommitFiberUnmount=="function")try{St.onCommitFiberUnmount(qi,r)}catch{}switch(r.tag){case 5:De||Zn(r,t);case 6:var s=ze,i=ft;ze=null,Ot(e,t,r),ze=s,ft=i,ze!==null&&(ft?(e=ze,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):ze.removeChild(r.stateNode));break;case 18:ze!==null&&(ft?(e=ze,r=r.stateNode,e.nodeType===8?Aa(e.parentNode,r):e.nodeType===1&&Aa(e,r),ls(e)):Aa(ze,r.stateNode));break;case 4:s=ze,i=ft,ze=r.stateNode.containerInfo,ft=!0,Ot(e,t,r),ze=s,ft=i;break;case 0:case 11:case 14:case 15:if(!De&&(s=r.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){i=s=s.next;do{var a=i,l=a.destroy;a=a.tag,l!==void 0&&(a&2||a&4)&&Il(r,t,l),i=i.next}while(i!==s)}Ot(e,t,r);break;case 1:if(!De&&(Zn(r,t),s=r.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=r.memoizedProps,s.state=r.memoizedState,s.componentWillUnmount()}catch(c){je(r,t,c)}Ot(e,t,r);break;case 21:Ot(e,t,r);break;case 22:r.mode&1?(De=(s=De)||r.memoizedState!==null,Ot(e,t,r),De=s):Ot(e,t,r);break;default:Ot(e,t,r)}}function ad(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new bg),t.forEach(function(s){var i=Fg.bind(null,e,s);r.has(s)||(r.add(s),s.then(i,i))})}}function ut(e,t){var r=t.deletions;if(r!==null)for(var s=0;s<r.length;s++){var i=r[s];try{var a=e,l=t,c=l;e:for(;c!==null;){switch(c.tag){case 5:ze=c.stateNode,ft=!1;break e;case 3:ze=c.stateNode.containerInfo,ft=!0;break e;case 4:ze=c.stateNode.containerInfo,ft=!0;break e}c=c.return}if(ze===null)throw Error(I(160));Ap(a,l,i),ze=null,ft=!1;var o=i.alternate;o!==null&&(o.return=null),i.return=null}catch(d){je(i,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Tp(t,e),t=t.sibling}function Tp(e,t){var r=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ut(t,e),jt(e),s&4){try{Xr(3,e,e.return),sa(3,e)}catch(A){je(e,e.return,A)}try{Xr(5,e,e.return)}catch(A){je(e,e.return,A)}}break;case 1:ut(t,e),jt(e),s&512&&r!==null&&Zn(r,r.return);break;case 5:if(ut(t,e),jt(e),s&512&&r!==null&&Zn(r,r.return),e.flags&32){var i=e.stateNode;try{rs(i,"")}catch(A){je(e,e.return,A)}}if(s&4&&(i=e.stateNode,i!=null)){var a=e.memoizedProps,l=r!==null?r.memoizedProps:a,c=e.type,o=e.updateQueue;if(e.updateQueue=null,o!==null)try{c==="input"&&a.type==="radio"&&a.name!=null&&Xd(i,a),ol(c,l);var d=ol(c,a);for(l=0;l<o.length;l+=2){var v=o[l],g=o[l+1];v==="style"?nu(i,g):v==="dangerouslySetInnerHTML"?eu(i,g):v==="children"?rs(i,g):so(i,v,g,d)}switch(c){case"input":rl(i,a);break;case"textarea":Jd(i,a);break;case"select":var f=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!a.multiple;var j=a.value;j!=null?nr(i,!!a.multiple,j,!1):f!==!!a.multiple&&(a.defaultValue!=null?nr(i,!!a.multiple,a.defaultValue,!0):nr(i,!!a.multiple,a.multiple?[]:"",!1))}i[ps]=a}catch(A){je(e,e.return,A)}}break;case 6:if(ut(t,e),jt(e),s&4){if(e.stateNode===null)throw Error(I(162));i=e.stateNode,a=e.memoizedProps;try{i.nodeValue=a}catch(A){je(e,e.return,A)}}break;case 3:if(ut(t,e),jt(e),s&4&&r!==null&&r.memoizedState.isDehydrated)try{ls(t.containerInfo)}catch(A){je(e,e.return,A)}break;case 4:ut(t,e),jt(e);break;case 13:ut(t,e),jt(e),i=e.child,i.flags&8192&&(a=i.memoizedState!==null,i.stateNode.isHidden=a,!a||i.alternate!==null&&i.alternate.memoizedState!==null||(Lo=be())),s&4&&ad(e);break;case 22:if(v=r!==null&&r.memoizedState!==null,e.mode&1?(De=(d=De)||v,ut(t,e),De=d):ut(t,e),jt(e),s&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!v&&e.mode&1)for(K=e,v=e.child;v!==null;){for(g=K=v;K!==null;){switch(f=K,j=f.child,f.tag){case 0:case 11:case 14:case 15:Xr(4,f,f.return);break;case 1:Zn(f,f.return);var N=f.stateNode;if(typeof N.componentWillUnmount=="function"){s=f,r=f.return;try{t=s,N.props=t.memoizedProps,N.state=t.memoizedState,N.componentWillUnmount()}catch(A){je(s,r,A)}}break;case 5:Zn(f,f.return);break;case 22:if(f.memoizedState!==null){od(g);continue}}j!==null?(j.return=f,K=j):od(g)}v=v.sibling}e:for(v=null,g=e;;){if(g.tag===5){if(v===null){v=g;try{i=g.stateNode,d?(a=i.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(c=g.stateNode,o=g.memoizedProps.style,l=o!=null&&o.hasOwnProperty("display")?o.display:null,c.style.display=tu("display",l))}catch(A){je(e,e.return,A)}}}else if(g.tag===6){if(v===null)try{g.stateNode.nodeValue=d?"":g.memoizedProps}catch(A){je(e,e.return,A)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;v===g&&(v=null),g=g.return}v===g&&(v=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:ut(t,e),jt(e),s&4&&ad(e);break;case 21:break;default:ut(t,e),jt(e)}}function jt(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(zp(r)){var s=r;break e}r=r.return}throw Error(I(160))}switch(s.tag){case 5:var i=s.stateNode;s.flags&32&&(rs(i,""),s.flags&=-33);var a=id(e);Ll(e,a,i);break;case 3:case 4:var l=s.stateNode.containerInfo,c=id(e);Dl(e,c,l);break;default:throw Error(I(161))}}catch(o){je(e,e.return,o)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ng(e,t,r){K=e,Fp(e)}function Fp(e,t,r){for(var s=(e.mode&1)!==0;K!==null;){var i=K,a=i.child;if(i.tag===22&&s){var l=i.memoizedState!==null||Vs;if(!l){var c=i.alternate,o=c!==null&&c.memoizedState!==null||De;c=Vs;var d=De;if(Vs=l,(De=o)&&!d)for(K=i;K!==null;)l=K,o=l.child,l.tag===22&&l.memoizedState!==null?cd(i):o!==null?(o.return=l,K=o):cd(i);for(;a!==null;)K=a,Fp(a),a=a.sibling;K=i,Vs=c,De=d}ld(e)}else i.subtreeFlags&8772&&a!==null?(a.return=i,K=a):ld(e)}}function ld(e){for(;K!==null;){var t=K;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:De||sa(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!De)if(r===null)s.componentDidMount();else{var i=t.elementType===t.type?r.memoizedProps:pt(t.type,r.memoizedProps);s.componentDidUpdate(i,r.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&Uc(t,a,s);break;case 3:var l=t.updateQueue;if(l!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}Uc(t,l,r)}break;case 5:var c=t.stateNode;if(r===null&&t.flags&4){r=c;var o=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":o.autoFocus&&r.focus();break;case"img":o.src&&(r.src=o.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var v=d.memoizedState;if(v!==null){var g=v.dehydrated;g!==null&&ls(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(I(163))}De||t.flags&512&&Rl(t)}catch(f){je(t,t.return,f)}}if(t===e){K=null;break}if(r=t.sibling,r!==null){r.return=t.return,K=r;break}K=t.return}}function od(e){for(;K!==null;){var t=K;if(t===e){K=null;break}var r=t.sibling;if(r!==null){r.return=t.return,K=r;break}K=t.return}}function cd(e){for(;K!==null;){var t=K;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{sa(4,t)}catch(o){je(t,r,o)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var i=t.return;try{s.componentDidMount()}catch(o){je(t,i,o)}}var a=t.return;try{Rl(t)}catch(o){je(t,a,o)}break;case 5:var l=t.return;try{Rl(t)}catch(o){je(t,l,o)}}}catch(o){je(t,t.return,o)}if(t===e){K=null;break}var c=t.sibling;if(c!==null){c.return=t.return,K=c;break}K=t.return}}var Sg=Math.ceil,Oi=Lt.ReactCurrentDispatcher,Ro=Lt.ReactCurrentOwner,lt=Lt.ReactCurrentBatchConfig,se=0,Ee=null,Ne=null,Te=0,Je=0,er=cn(0),ke=0,ys=null,Cn=0,ia=0,Do=0,Jr=null,Ve=null,Lo=0,mr=1/0,zt=null,Bi=!1,$l=null,tn=null,Qs=!1,Qt=null,Wi=0,Zr=0,Ol=null,mi=-1,xi=0;function We(){return se&6?be():mi!==-1?mi:mi=be()}function nn(e){return e.mode&1?se&2&&Te!==0?Te&-Te:lg.transition!==null?(xi===0&&(xi=fu()),xi):(e=ie,e!==0||(e=window.event,e=e===void 0?16:bu(e.type)),e):1}function xt(e,t,r,s){if(50<Zr)throw Zr=0,Ol=null,Error(I(185));ks(e,r,s),(!(se&2)||e!==Ee)&&(e===Ee&&(!(se&2)&&(ia|=r),ke===4&&Ht(e,Te)),qe(e,s),r===1&&se===0&&!(t.mode&1)&&(mr=be()+500,ta&&dn()))}function qe(e,t){var r=e.callbackNode;lf(e,t);var s=ki(e,e===Ee?Te:0);if(s===0)r!==null&&yc(r),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(r!=null&&yc(r),t===1)e.tag===0?ag(dd.bind(null,e)):Ou(dd.bind(null,e)),ng(function(){!(se&6)&&dn()}),r=null;else{switch(gu(s)){case 1:r=co;break;case 4:r=pu;break;case 16:r=Si;break;case 536870912:r=hu;break;default:r=Si}r=$p(r,_p.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function _p(e,t){if(mi=-1,xi=0,se&6)throw Error(I(327));var r=e.callbackNode;if(lr()&&e.callbackNode!==r)return null;var s=ki(e,e===Ee?Te:0);if(s===0)return null;if(s&30||s&e.expiredLanes||t)t=Gi(e,s);else{t=s;var i=se;se|=2;var a=Pp();(Ee!==e||Te!==t)&&(zt=null,mr=be()+500,bn(e,t));do try{Eg();break}catch(c){Mp(e,c)}while(!0);No(),Oi.current=a,se=i,Ne!==null?t=0:(Ee=null,Te=0,t=ke)}if(t!==0){if(t===2&&(i=hl(e),i!==0&&(s=i,t=Bl(e,i))),t===1)throw r=ys,bn(e,0),Ht(e,s),qe(e,be()),r;if(t===6)Ht(e,s);else{if(i=e.current.alternate,!(s&30)&&!kg(i)&&(t=Gi(e,s),t===2&&(a=hl(e),a!==0&&(s=a,t=Bl(e,a))),t===1))throw r=ys,bn(e,0),Ht(e,s),qe(e,be()),r;switch(e.finishedWork=i,e.finishedLanes=s,t){case 0:case 1:throw Error(I(345));case 2:gn(e,Ve,zt);break;case 3:if(Ht(e,s),(s&130023424)===s&&(t=Lo+500-be(),10<t)){if(ki(e,0)!==0)break;if(i=e.suspendedLanes,(i&s)!==s){We(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=bl(gn.bind(null,e,Ve,zt),t);break}gn(e,Ve,zt);break;case 4:if(Ht(e,s),(s&4194240)===s)break;for(t=e.eventTimes,i=-1;0<s;){var l=31-mt(s);a=1<<l,l=t[l],l>i&&(i=l),s&=~a}if(s=i,s=be()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*Sg(s/1960))-s,10<s){e.timeoutHandle=bl(gn.bind(null,e,Ve,zt),s);break}gn(e,Ve,zt);break;case 5:gn(e,Ve,zt);break;default:throw Error(I(329))}}}return qe(e,be()),e.callbackNode===r?_p.bind(null,e):null}function Bl(e,t){var r=Jr;return e.current.memoizedState.isDehydrated&&(bn(e,t).flags|=256),e=Gi(e,t),e!==2&&(t=Ve,Ve=r,t!==null&&Wl(t)),e}function Wl(e){Ve===null?Ve=e:Ve.push.apply(Ve,e)}function kg(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var s=0;s<r.length;s++){var i=r[s],a=i.getSnapshot;i=i.value;try{if(!yt(a(),i))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ht(e,t){for(t&=~Do,t&=~ia,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-mt(t),s=1<<r;e[r]=-1,t&=~s}}function dd(e){if(se&6)throw Error(I(327));lr();var t=ki(e,0);if(!(t&1))return qe(e,be()),null;var r=Gi(e,t);if(e.tag!==0&&r===2){var s=hl(e);s!==0&&(t=s,r=Bl(e,s))}if(r===1)throw r=ys,bn(e,0),Ht(e,t),qe(e,be()),r;if(r===6)throw Error(I(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,gn(e,Ve,zt),qe(e,be()),null}function $o(e,t){var r=se;se|=1;try{return e(t)}finally{se=r,se===0&&(mr=be()+500,ta&&dn())}}function En(e){Qt!==null&&Qt.tag===0&&!(se&6)&&lr();var t=se;se|=1;var r=lt.transition,s=ie;try{if(lt.transition=null,ie=1,e)return e()}finally{ie=s,lt.transition=r,se=t,!(se&6)&&dn()}}function Oo(){Je=er.current,pe(er)}function bn(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,tg(r)),Ne!==null)for(r=Ne.return;r!==null;){var s=r;switch(jo(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&Ti();break;case 3:fr(),pe(Ye),pe($e),Ao();break;case 5:zo(s);break;case 4:fr();break;case 13:pe(me);break;case 19:pe(me);break;case 10:So(s.type._context);break;case 22:case 23:Oo()}r=r.return}if(Ee=e,Ne=e=rn(e.current,null),Te=Je=t,ke=0,ys=null,Do=ia=Cn=0,Ve=Jr=null,vn!==null){for(t=0;t<vn.length;t++)if(r=vn[t],s=r.interleaved,s!==null){r.interleaved=null;var i=s.next,a=r.pending;if(a!==null){var l=a.next;a.next=i,s.next=l}r.pending=s}vn=null}return e}function Mp(e,t){do{var r=Ne;try{if(No(),hi.current=$i,Li){for(var s=xe.memoizedState;s!==null;){var i=s.queue;i!==null&&(i.pending=null),s=s.next}Li=!1}if(kn=0,Ce=Se=xe=null,qr=!1,gs=0,Ro.current=null,r===null||r.return===null){ke=1,ys=t,Ne=null;break}e:{var a=e,l=r.return,c=r,o=t;if(t=Te,c.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){var d=o,v=c,g=v.tag;if(!(v.mode&1)&&(g===0||g===11||g===15)){var f=v.alternate;f?(v.updateQueue=f.updateQueue,v.memoizedState=f.memoizedState,v.lanes=f.lanes):(v.updateQueue=null,v.memoizedState=null)}var j=Xc(l);if(j!==null){j.flags&=-257,Jc(j,l,c,a,t),j.mode&1&&qc(a,d,t),t=j,o=d;var N=t.updateQueue;if(N===null){var A=new Set;A.add(o),t.updateQueue=A}else N.add(o);break e}else{if(!(t&1)){qc(a,d,t),Bo();break e}o=Error(I(426))}}else if(fe&&c.mode&1){var O=Xc(l);if(O!==null){!(O.flags&65536)&&(O.flags|=256),Jc(O,l,c,a,t),bo(gr(o,c));break e}}a=o=gr(o,c),ke!==4&&(ke=2),Jr===null?Jr=[a]:Jr.push(a),a=l;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var m=mp(a,o,t);Gc(a,m);break e;case 1:c=o;var p=a.type,u=a.stateNode;if(!(a.flags&128)&&(typeof p.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(tn===null||!tn.has(u)))){a.flags|=65536,t&=-t,a.lanes|=t;var h=xp(a,c,t);Gc(a,h);break e}}a=a.return}while(a!==null)}Rp(r)}catch(S){t=S,Ne===r&&r!==null&&(Ne=r=r.return);continue}break}while(!0)}function Pp(){var e=Oi.current;return Oi.current=$i,e===null?$i:e}function Bo(){(ke===0||ke===3||ke===2)&&(ke=4),Ee===null||!(Cn&268435455)&&!(ia&268435455)||Ht(Ee,Te)}function Gi(e,t){var r=se;se|=2;var s=Pp();(Ee!==e||Te!==t)&&(zt=null,bn(e,t));do try{Cg();break}catch(i){Mp(e,i)}while(!0);if(No(),se=r,Oi.current=s,Ne!==null)throw Error(I(261));return Ee=null,Te=0,ke}function Cg(){for(;Ne!==null;)Ip(Ne)}function Eg(){for(;Ne!==null&&!Xh();)Ip(Ne)}function Ip(e){var t=Lp(e.alternate,e,Je);e.memoizedProps=e.pendingProps,t===null?Rp(e):Ne=t,Ro.current=null}function Rp(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=jg(r,t),r!==null){r.flags&=32767,Ne=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ke=6,Ne=null;return}}else if(r=vg(r,t,Je),r!==null){Ne=r;return}if(t=t.sibling,t!==null){Ne=t;return}Ne=t=e}while(t!==null);ke===0&&(ke=5)}function gn(e,t,r){var s=ie,i=lt.transition;try{lt.transition=null,ie=1,zg(e,t,r,s)}finally{lt.transition=i,ie=s}return null}function zg(e,t,r,s){do lr();while(Qt!==null);if(se&6)throw Error(I(327));r=e.finishedWork;var i=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(I(177));e.callbackNode=null,e.callbackPriority=0;var a=r.lanes|r.childLanes;if(of(e,a),e===Ee&&(Ne=Ee=null,Te=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||Qs||(Qs=!0,$p(Si,function(){return lr(),null})),a=(r.flags&15990)!==0,r.subtreeFlags&15990||a){a=lt.transition,lt.transition=null;var l=ie;ie=1;var c=se;se|=4,Ro.current=null,wg(e,r),Tp(r,e),Yf(vl),Ci=!!yl,vl=yl=null,e.current=r,Ng(r),Jh(),se=c,ie=l,lt.transition=a}else e.current=r;if(Qs&&(Qs=!1,Qt=e,Wi=i),a=e.pendingLanes,a===0&&(tn=null),tf(r.stateNode),qe(e,be()),t!==null)for(s=e.onRecoverableError,r=0;r<t.length;r++)i=t[r],s(i.value,{componentStack:i.stack,digest:i.digest});if(Bi)throw Bi=!1,e=$l,$l=null,e;return Wi&1&&e.tag!==0&&lr(),a=e.pendingLanes,a&1?e===Ol?Zr++:(Zr=0,Ol=e):Zr=0,dn(),null}function lr(){if(Qt!==null){var e=gu(Wi),t=lt.transition,r=ie;try{if(lt.transition=null,ie=16>e?16:e,Qt===null)var s=!1;else{if(e=Qt,Qt=null,Wi=0,se&6)throw Error(I(331));var i=se;for(se|=4,K=e.current;K!==null;){var a=K,l=a.child;if(K.flags&16){var c=a.deletions;if(c!==null){for(var o=0;o<c.length;o++){var d=c[o];for(K=d;K!==null;){var v=K;switch(v.tag){case 0:case 11:case 15:Xr(8,v,a)}var g=v.child;if(g!==null)g.return=v,K=g;else for(;K!==null;){v=K;var f=v.sibling,j=v.return;if(Ep(v),v===d){K=null;break}if(f!==null){f.return=j,K=f;break}K=j}}}var N=a.alternate;if(N!==null){var A=N.child;if(A!==null){N.child=null;do{var O=A.sibling;A.sibling=null,A=O}while(A!==null)}}K=a}}if(a.subtreeFlags&2064&&l!==null)l.return=a,K=l;else e:for(;K!==null;){if(a=K,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Xr(9,a,a.return)}var m=a.sibling;if(m!==null){m.return=a.return,K=m;break e}K=a.return}}var p=e.current;for(K=p;K!==null;){l=K;var u=l.child;if(l.subtreeFlags&2064&&u!==null)u.return=l,K=u;else e:for(l=p;K!==null;){if(c=K,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:sa(9,c)}}catch(S){je(c,c.return,S)}if(c===l){K=null;break e}var h=c.sibling;if(h!==null){h.return=c.return,K=h;break e}K=c.return}}if(se=i,dn(),St&&typeof St.onPostCommitFiberRoot=="function")try{St.onPostCommitFiberRoot(qi,e)}catch{}s=!0}return s}finally{ie=r,lt.transition=t}}return!1}function ud(e,t,r){t=gr(r,t),t=mp(e,t,1),e=en(e,t,1),t=We(),e!==null&&(ks(e,1,t),qe(e,t))}function je(e,t,r){if(e.tag===3)ud(e,e,r);else for(;t!==null;){if(t.tag===3){ud(t,e,r);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(tn===null||!tn.has(s))){e=gr(r,e),e=xp(t,e,1),t=en(t,e,1),e=We(),t!==null&&(ks(t,1,e),qe(t,e));break}}t=t.return}}function Ag(e,t,r){var s=e.pingCache;s!==null&&s.delete(t),t=We(),e.pingedLanes|=e.suspendedLanes&r,Ee===e&&(Te&r)===r&&(ke===4||ke===3&&(Te&130023424)===Te&&500>be()-Lo?bn(e,0):Do|=r),qe(e,t)}function Dp(e,t){t===0&&(e.mode&1?(t=Ds,Ds<<=1,!(Ds&130023424)&&(Ds=4194304)):t=1);var r=We();e=Rt(e,t),e!==null&&(ks(e,t,r),qe(e,r))}function Tg(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Dp(e,r)}function Fg(e,t){var r=0;switch(e.tag){case 13:var s=e.stateNode,i=e.memoizedState;i!==null&&(r=i.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(I(314))}s!==null&&s.delete(t),Dp(e,r)}var Lp;Lp=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ye.current)Qe=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return Qe=!1,yg(e,t,r);Qe=!!(e.flags&131072)}else Qe=!1,fe&&t.flags&1048576&&Bu(t,Mi,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;gi(e,t),e=t.pendingProps;var i=ur(t,$e.current);ar(t,r),i=Fo(null,t,s,e,i,r);var a=_o();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ke(s)?(a=!0,Fi(t)):a=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Co(t),i.updater=na,t.stateNode=i,i._reactInternals=t,zl(t,s,e,r),t=Fl(null,t,s,!0,a,r)):(t.tag=0,fe&&a&&vo(t),Be(null,t,i,r),t=t.child),t;case 16:s=t.elementType;e:{switch(gi(e,t),e=t.pendingProps,i=s._init,s=i(s._payload),t.type=s,i=t.tag=Mg(s),e=pt(s,e),i){case 0:t=Tl(null,t,s,e,r);break e;case 1:t=td(null,t,s,e,r);break e;case 11:t=Zc(null,t,s,e,r);break e;case 14:t=ed(null,t,s,pt(s.type,e),r);break e}throw Error(I(306,s,""))}return t;case 0:return s=t.type,i=t.pendingProps,i=t.elementType===s?i:pt(s,i),Tl(e,t,s,i,r);case 1:return s=t.type,i=t.pendingProps,i=t.elementType===s?i:pt(s,i),td(e,t,s,i,r);case 3:e:{if(bp(t),e===null)throw Error(I(387));s=t.pendingProps,a=t.memoizedState,i=a.element,Hu(e,t),Ri(t,s,null,r);var l=t.memoizedState;if(s=l.element,a.isDehydrated)if(a={element:s,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){i=gr(Error(I(423)),t),t=nd(e,t,s,r,i);break e}else if(s!==i){i=gr(Error(I(424)),t),t=nd(e,t,s,r,i);break e}else for(Ze=Zt(t.stateNode.containerInfo.firstChild),et=t,fe=!0,gt=null,r=Ku(t,null,s,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(pr(),s===i){t=Dt(e,t,r);break e}Be(e,t,s,r)}t=t.child}return t;case 5:return qu(t),e===null&&kl(t),s=t.type,i=t.pendingProps,a=e!==null?e.memoizedProps:null,l=i.children,jl(s,i)?l=null:a!==null&&jl(s,a)&&(t.flags|=32),jp(e,t),Be(e,t,l,r),t.child;case 6:return e===null&&kl(t),null;case 13:return wp(e,t,r);case 4:return Eo(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=hr(t,null,s,r):Be(e,t,s,r),t.child;case 11:return s=t.type,i=t.pendingProps,i=t.elementType===s?i:pt(s,i),Zc(e,t,s,i,r);case 7:return Be(e,t,t.pendingProps,r),t.child;case 8:return Be(e,t,t.pendingProps.children,r),t.child;case 12:return Be(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(s=t.type._context,i=t.pendingProps,a=t.memoizedProps,l=i.value,ce(Pi,s._currentValue),s._currentValue=l,a!==null)if(yt(a.value,l)){if(a.children===i.children&&!Ye.current){t=Dt(e,t,r);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var c=a.dependencies;if(c!==null){l=a.child;for(var o=c.firstContext;o!==null;){if(o.context===s){if(a.tag===1){o=Mt(-1,r&-r),o.tag=2;var d=a.updateQueue;if(d!==null){d=d.shared;var v=d.pending;v===null?o.next=o:(o.next=v.next,v.next=o),d.pending=o}}a.lanes|=r,o=a.alternate,o!==null&&(o.lanes|=r),Cl(a.return,r,t),c.lanes|=r;break}o=o.next}}else if(a.tag===10)l=a.type===t.type?null:a.child;else if(a.tag===18){if(l=a.return,l===null)throw Error(I(341));l.lanes|=r,c=l.alternate,c!==null&&(c.lanes|=r),Cl(l,r,t),l=a.sibling}else l=a.child;if(l!==null)l.return=a;else for(l=a;l!==null;){if(l===t){l=null;break}if(a=l.sibling,a!==null){a.return=l.return,l=a;break}l=l.return}a=l}Be(e,t,i.children,r),t=t.child}return t;case 9:return i=t.type,s=t.pendingProps.children,ar(t,r),i=ct(i),s=s(i),t.flags|=1,Be(e,t,s,r),t.child;case 14:return s=t.type,i=pt(s,t.pendingProps),i=pt(s.type,i),ed(e,t,s,i,r);case 15:return yp(e,t,t.type,t.pendingProps,r);case 17:return s=t.type,i=t.pendingProps,i=t.elementType===s?i:pt(s,i),gi(e,t),t.tag=1,Ke(s)?(e=!0,Fi(t)):e=!1,ar(t,r),Qu(t,s,i),zl(t,s,i,r),Fl(null,t,s,!0,e,r);case 19:return Np(e,t,r);case 22:return vp(e,t,r)}throw Error(I(156,t.tag))};function $p(e,t){return uu(e,t)}function _g(e,t,r,s){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function at(e,t,r,s){return new _g(e,t,r,s)}function Wo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Mg(e){if(typeof e=="function")return Wo(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ao)return 11;if(e===lo)return 14}return 2}function rn(e,t){var r=e.alternate;return r===null?(r=at(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function yi(e,t,r,s,i,a){var l=2;if(s=e,typeof e=="function")Wo(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Un:return wn(r.children,i,a,t);case io:l=8,i|=8;break;case Ja:return e=at(12,r,t,i|2),e.elementType=Ja,e.lanes=a,e;case Za:return e=at(13,r,t,i),e.elementType=Za,e.lanes=a,e;case el:return e=at(19,r,t,i),e.elementType=el,e.lanes=a,e;case Yd:return aa(r,i,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Vd:l=10;break e;case Qd:l=9;break e;case ao:l=11;break e;case lo:l=14;break e;case Wt:l=16,s=null;break e}throw Error(I(130,e==null?e:typeof e,""))}return t=at(l,r,t,i),t.elementType=e,t.type=s,t.lanes=a,t}function wn(e,t,r,s){return e=at(7,e,s,t),e.lanes=r,e}function aa(e,t,r,s){return e=at(22,e,s,t),e.elementType=Yd,e.lanes=r,e.stateNode={isHidden:!1},e}function Da(e,t,r){return e=at(6,e,null,t),e.lanes=r,e}function La(e,t,r){return t=at(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Pg(e,t,r,s,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ya(0),this.expirationTimes=ya(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ya(0),this.identifierPrefix=s,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Go(e,t,r,s,i,a,l,c,o){return e=new Pg(e,t,r,c,o),t===1?(t=1,a===!0&&(t|=8)):t=0,a=at(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:s,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},Co(a),e}function Ig(e,t,r){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Gn,key:s==null?null:""+s,children:e,containerInfo:t,implementation:r}}function Op(e){if(!e)return an;e=e._reactInternals;e:{if(Fn(e)!==e||e.tag!==1)throw Error(I(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ke(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(I(171))}if(e.tag===1){var r=e.type;if(Ke(r))return $u(e,r,t)}return t}function Bp(e,t,r,s,i,a,l,c,o){return e=Go(r,s,!0,e,i,a,l,c,o),e.context=Op(null),r=e.current,s=We(),i=nn(r),a=Mt(s,i),a.callback=t??null,en(r,a,i),e.current.lanes=i,ks(e,i,s),qe(e,s),e}function la(e,t,r,s){var i=t.current,a=We(),l=nn(i);return r=Op(r),t.context===null?t.context=r:t.pendingContext=r,t=Mt(a,l),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=en(i,t,l),e!==null&&(xt(e,i,l,a),pi(e,i,l)),l}function Ui(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function pd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Uo(e,t){pd(e,t),(e=e.alternate)&&pd(e,t)}function Rg(){return null}var Wp=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ho(e){this._internalRoot=e}oa.prototype.render=Ho.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(I(409));la(e,t,null,null)};oa.prototype.unmount=Ho.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;En(function(){la(null,e,null,null)}),t[It]=null}};function oa(e){this._internalRoot=e}oa.prototype.unstable_scheduleHydration=function(e){if(e){var t=yu();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Ut.length&&t!==0&&t<Ut[r].priority;r++);Ut.splice(r,0,e),r===0&&ju(e)}};function Vo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ca(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function hd(){}function Dg(e,t,r,s,i){if(i){if(typeof s=="function"){var a=s;s=function(){var d=Ui(l);a.call(d)}}var l=Bp(t,s,e,0,null,!1,!1,"",hd);return e._reactRootContainer=l,e[It]=l.current,ds(e.nodeType===8?e.parentNode:e),En(),l}for(;i=e.lastChild;)e.removeChild(i);if(typeof s=="function"){var c=s;s=function(){var d=Ui(o);c.call(d)}}var o=Go(e,0,!1,null,null,!1,!1,"",hd);return e._reactRootContainer=o,e[It]=o.current,ds(e.nodeType===8?e.parentNode:e),En(function(){la(t,o,r,s)}),o}function da(e,t,r,s,i){var a=r._reactRootContainer;if(a){var l=a;if(typeof i=="function"){var c=i;i=function(){var o=Ui(l);c.call(o)}}la(t,l,e,i)}else l=Dg(r,t,e,i,s);return Ui(l)}mu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=Br(t.pendingLanes);r!==0&&(uo(t,r|1),qe(t,be()),!(se&6)&&(mr=be()+500,dn()))}break;case 13:En(function(){var s=Rt(e,1);if(s!==null){var i=We();xt(s,e,1,i)}}),Uo(e,1)}};po=function(e){if(e.tag===13){var t=Rt(e,134217728);if(t!==null){var r=We();xt(t,e,134217728,r)}Uo(e,134217728)}};xu=function(e){if(e.tag===13){var t=nn(e),r=Rt(e,t);if(r!==null){var s=We();xt(r,e,t,s)}Uo(e,t)}};yu=function(){return ie};vu=function(e,t){var r=ie;try{return ie=e,t()}finally{ie=r}};dl=function(e,t,r){switch(t){case"input":if(rl(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var s=r[t];if(s!==e&&s.form===e.form){var i=ea(s);if(!i)throw Error(I(90));qd(s),rl(s,i)}}}break;case"textarea":Jd(e,r);break;case"select":t=r.value,t!=null&&nr(e,!!r.multiple,t,!1)}};iu=$o;au=En;var Lg={usingClientEntryPoint:!1,Events:[Es,Yn,ea,ru,su,$o]},_r={findFiberByHostInstance:yn,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},$g={bundleType:_r.bundleType,version:_r.version,rendererPackageName:_r.rendererPackageName,rendererConfig:_r.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Lt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=cu(e),e===null?null:e.stateNode},findFiberByHostInstance:_r.findFiberByHostInstance||Rg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ys=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ys.isDisabled&&Ys.supportsFiber)try{qi=Ys.inject($g),St=Ys}catch{}}nt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Lg;nt.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Vo(t))throw Error(I(200));return Ig(e,t,null,r)};nt.createRoot=function(e,t){if(!Vo(e))throw Error(I(299));var r=!1,s="",i=Wp;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Go(e,1,!1,null,null,r,!1,s,i),e[It]=t.current,ds(e.nodeType===8?e.parentNode:e),new Ho(t)};nt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(I(188)):(e=Object.keys(e).join(","),Error(I(268,e)));return e=cu(t),e=e===null?null:e.stateNode,e};nt.flushSync=function(e){return En(e)};nt.hydrate=function(e,t,r){if(!ca(t))throw Error(I(200));return da(null,e,t,!0,r)};nt.hydrateRoot=function(e,t,r){if(!Vo(e))throw Error(I(405));var s=r!=null&&r.hydratedSources||null,i=!1,a="",l=Wp;if(r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(a=r.identifierPrefix),r.onRecoverableError!==void 0&&(l=r.onRecoverableError)),t=Bp(t,null,e,1,r??null,i,!1,a,l),e[It]=t.current,ds(e),s)for(e=0;e<s.length;e++)r=s[e],i=r._getVersion,i=i(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,i]:t.mutableSourceEagerHydrationData.push(r,i);return new oa(t)};nt.render=function(e,t,r){if(!ca(t))throw Error(I(200));return da(null,e,t,!1,r)};nt.unmountComponentAtNode=function(e){if(!ca(e))throw Error(I(40));return e._reactRootContainer?(En(function(){da(null,null,e,!1,function(){e._reactRootContainer=null,e[It]=null})}),!0):!1};nt.unstable_batchedUpdates=$o;nt.unstable_renderSubtreeIntoContainer=function(e,t,r,s){if(!ca(r))throw Error(I(200));if(e==null||e._reactInternals===void 0)throw Error(I(38));return da(e,t,r,!1,s)};nt.version="18.2.0-next-9e3b772b8-20220608";function Gp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gp)}catch(e){console.error(e)}}Gp(),Bd.exports=nt;var Og=Bd.exports,fd=Og;qa.createRoot=fd.createRoot,qa.hydrateRoot=fd.hydrateRoot;/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Bg={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wg=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),U=(e,t)=>{const r=x.forwardRef(({color:s="currentColor",size:i=24,strokeWidth:a=2,absoluteStrokeWidth:l,className:c="",children:o,...d},v)=>x.createElement("svg",{ref:v,...Bg,width:i,height:i,stroke:s,strokeWidth:l?Number(a)*24/Number(i):a,className:["lucide",`lucide-${Wg(e)}`,c].join(" "),...d},[...t.map(([g,f])=>x.createElement(g,f)),...Array.isArray(o)?o:[o]]));return r.displayName=`${e}`,r};/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=U("Activity",[["path",{d:"M22 12h-4l-3 9L9 3l-3 9H2",key:"d5dnw9"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hi=U("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gg=U("Archive",[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"M10 12h4",key:"a56b0p"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=U("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ks=U("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ug=U("Baby",[["path",{d:"M9 12h.01",key:"157uk2"}],["path",{d:"M15 12h.01",key:"1k8ypt"}],["path",{d:"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5",key:"1u7htd"}],["path",{d:"M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",key:"5yv0yz"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hg=U("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mn=U("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qo=U("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=U("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vg=U("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Up=U("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vi=U("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua=U("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=U("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ln=U("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yo=U("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const As=U("Clock3",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qg=U("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $a=U("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yg=U("Crown",[["path",{d:"m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14",key:"zkxr6b"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kg=U("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=U("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qg=U("Droplet",[["path",{d:"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",key:"c7niix"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hp=U("Droplets",[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",key:"1ptgy4"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",key:"1sl1rz"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=U("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xg=U("GitBranch",[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oa=U("HeartPulse",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}],["path",{d:"M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",key:"1uw2ng"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gl=U("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gd=U("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const md=U("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vi=U("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jg=U("LockKeyhole",[["circle",{cx:"12",cy:"16",r:"1",key:"1au0dj"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2",key:"6s8ecr"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3",key:"1pqi11"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ul=U("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zg=U("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const em=U("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vs=U("Milk",[["path",{d:"M8 2h8",key:"1ssgc1"}],["path",{d:"M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",key:"qtp12x"}],["path",{d:"M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0",key:"ygeh44"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tm=U("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _n=U("MoreVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=U("PawPrint",[["circle",{cx:"11",cy:"4",r:"2",key:"vol9p0"}],["circle",{cx:"18",cy:"8",r:"2",key:"17gozi"}],["circle",{cx:"20",cy:"16",r:"2",key:"1v9bxh"}],["path",{d:"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",key:"1ydw1z"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xd=U("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",key:"ymcmye"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xr=U("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nm=U("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=U("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rm=U("Printer",[["polyline",{points:"6 9 6 2 18 2 18 9",key:"1306q4"}],["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["rect",{width:"12",height:"8",x:"6",y:"14",key:"5ipwut"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sm=U("QrCode",[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1",key:"1tu5fj"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1",key:"1v8r4q"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1",key:"1x03jg"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3",key:"177gqh"}],["path",{d:"M21 21v.01",key:"ents32"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7",key:"8crl2c"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M12 3h.01",key:"n36tog"}],["path",{d:"M12 16v.01",key:"133mhm"}],["path",{d:"M16 12h1",key:"1slzba"}],["path",{d:"M21 12v.01",key:"1lwtk9"}],["path",{d:"M12 21v-1",key:"1880an"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hl=U("RefreshCcw",[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=U("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const or=U("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=U("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=U("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const im=U("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tr=U("ShieldCheck",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const am=U("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lm=U("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const om=U("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cm=U("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dm=U("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xn=U("Stethoscope",[["path",{d:"M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3",key:"1jd90r"}],["path",{d:"M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4",key:"126ukv"}],["circle",{cx:"20",cy:"10",r:"2",key:"ts1r5v"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ba=U("Syringe",[["path",{d:"m18 2 4 4",key:"22kx64"}],["path",{d:"m17 7 3-3",key:"1w1zoj"}],["path",{d:"M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5",key:"1exhtz"}],["path",{d:"m9 11 4 4",key:"rovt3i"}],["path",{d:"m5 19-3 3",key:"59f2uf"}],["path",{d:"m14 4 6 6",key:"yqp9t2"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vl=U("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zn=U("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const um=U("TrendingDown",[["polyline",{points:"22 17 13.5 8.5 8.5 13.5 2 7",key:"1r2t7k"}],["polyline",{points:"16 17 22 17 22 11",key:"11uiuu"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const js=U("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ko=U("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const An=U("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ql=U("Wallet",[["path",{d:"M21 12V7H5a2 2 0 0 1 0-4h14v4",key:"195gfw"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h16v-5",key:"195n9w"}],["path",{d:"M18 12a2 2 0 0 0 0 4h4v-4Z",key:"vllfpd"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wa=U("WifiOff",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cr=U("Wifi",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pm=U("Wrench",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=U("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.336.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yl=U("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]);function hm({children:e}){return n.jsx("div",{className:"auth-shell",style:{minHeight:"100vh",background:"linear-gradient(180deg, #142C5D 0%, #0D1D3D 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:24},children:n.jsx("div",{className:"auth-shell-inner",style:{width:"100%",maxWidth:520,padding:16},children:e})})}const fm="/Goat-Management-System/assets/DTF%20STICKER%20PRINTING%20(2)-BkfKph1G.png";function gm({size:e=34}){return n.jsx("div",{style:{width:e,height:e,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",background:"#fff"},children:n.jsx("img",{src:fm,alt:"SelSolve logo",style:{width:"100%",height:"100%",objectFit:"cover"}})})}function qs({icon:e,label:t,children:r}){return n.jsxs("div",{style:{marginBottom:14},children:[n.jsxs("label",{style:{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,color:"#1B3A8C",marginBottom:5},children:[e&&n.jsx(e,{size:13})," ",t]}),r]})}const mm="http://localhost:5000/api";async function qo(e,t={}){try{const r=await fetch(`${mm}${e}`,{...t,credentials:"include",headers:{"Content-Type":"application/json",...t.headers||{}}}),s=await r.json().catch(()=>({}));if(!r.ok){const i=new Error((s==null?void 0:s.error)||(s==null?void 0:s.message)||`Request failed with status ${r.status}`);throw i.status=r.status,i.code=(s==null?void 0:s.code)||"",i.success=(s==null?void 0:s.success)??!1,i.data=s,i}return s}catch(r){if((r==null?void 0:r.status)===void 0){const s=new Error("Unable to connect to the backend server.");throw s.status=0,s.code="NETWORK_ERROR",s.originalError=r,s}throw r}}async function xm({farmId:e,username:t,password:r}){return qo("/auth/login",{method:"POST",credentials:"include",body:JSON.stringify({farmId:String(e||"").trim(),username:String(t||"").trim(),password:String(r||"")})})}async function ym({farmName:e,username:t,email:r,password:s}){return qo("/auth/register",{method:"POST",credentials:"include",body:JSON.stringify({farmName:String(e||"").trim(),username:String(t||"").trim(),email:String(r||"").trim(),password:String(s||"")})})}async function vm({plan:e,amount:t,paymentMethod:r,paymentReceiver:s=""}){return qo("/subscriptions/payment-request",{method:"POST",credentials:"include",body:JSON.stringify({plan:e,amount:t,paymentMethod:r,paymentReceiver:s})})}function jm(e){return(e==null?void 0:e.status)===402&&((e==null?void 0:e.code)==="SUBSCRIPTION_EXPIRED"||(e==null?void 0:e.code)==="SUBSCRIPTION_REQUIRED"||(e==null?void 0:e.code)==="SUBSCRIPTION_INVALID"||(e==null?void 0:e.code)==="TENANT_INACTIVE")}function bm({onLogin:e,onRecoverPassword:t}){const[r,s]=x.useState(""),[i,a]=x.useState(""),[l,c]=x.useState(""),[o,d]=x.useState(""),[v,g]=x.useState(""),[f,j]=x.useState(""),[N,A]=x.useState("login"),[O,m]=x.useState(!1);async function p(S){S.preventDefault(),g(""),j("");const b=r.trim(),w=i.trim(),_=l.trim(),M=o;if(!b){g("Please enter your farm name.");return}if(!w){g("Please enter your username.");return}if(N!=="forgot"&&!M){g("Please enter your password.");return}m(!0);try{if(N==="login"){console.log("LOGIN REQUEST:",{farmId:b,username:w});const E=await xm({farmId:b,username:w,password:M});if(console.log("LOGIN RESPONSE:",E),!E||E.success!==!0)throw new Error((E==null?void 0:E.error)||"Invalid username or password.");if(!E.user)throw new Error("Login successful, but user information was not returned.");if(!E.tenant)throw new Error("Login successful, but farm information was not returned.");j("Login successful."),typeof e=="function"?await e(E.user,E.tenant):console.warn("onLogin callback is not available.");return}if(N==="create"){console.log("REGISTER REQUEST:",{farmName:b,username:w,email:_});const E=await ym({farmName:b,username:w,email:_,password:M});if(console.log("REGISTER RESPONSE:",E),!E||E.success!==!0)throw new Error((E==null?void 0:E.error)||"Unable to create farm account.");if(!E.user)throw new Error("Account created, but user information was not returned.");if(!E.tenant)throw new Error("Account created, but farm information was not returned.");console.log("ACCOUNT CREATED SUCCESSFULLY"),console.log("NEW USER:",E.user),console.log("NEW TENANT:",E.tenant),j("Farm account created successfully. Opening dashboard..."),typeof e=="function"?await e(E.user,E.tenant):console.warn("onLogin callback is not available.");return}if(N==="forgot"){if(typeof t=="function"){const E=await t(b,w);if(!(E!=null&&E.ok))throw new Error((E==null?void 0:E.error)||"Unable to recover password.");j(E.message||"Password recovery request completed.")}else g("Password recovery is not connected yet.");return}}catch(E){console.error("AUTH ERROR:",E),j(""),g((E==null?void 0:E.message)||"Unable to connect to backend server.")}finally{m(!1)}}function u(S){A(S),g(""),j(""),d("")}const h={width:"100%",padding:"14px 16px",border:"1px solid #E5E7EB",borderRadius:14,fontSize:14,background:"#fff",color:"#111827",boxSizing:"border-box",outline:"none"};return n.jsxs("div",{style:{background:"rgba(255,255,255,0.96)",borderRadius:30,padding:"36px 32px",boxShadow:"0 32px 80px rgba(15,23,42,0.12)",width:"100%",maxWidth:520,border:"1px solid rgba(15,23,42,0.08)"},children:[n.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:12,marginBottom:28},children:[n.jsx(gm,{size:56}),n.jsx("div",{style:{textTransform:"uppercase",letterSpacing:1.4,color:"#2563EB",fontSize:12,fontWeight:800},children:"Farm management"}),n.jsxs("div",{style:{textAlign:"center"},children:[n.jsx("div",{style:{fontSize:24,fontWeight:800,color:"#111827"},children:N==="login"?"Welcome back":N==="create"?"Create your farm":"Recover password"}),n.jsx("p",{style:{margin:"12px 0 0",fontSize:14,color:"#6B7280",lineHeight:1.7},children:N==="login"?"Sign in to access your farm dashboard and herd management tools.":N==="create"?"Register a farm account to track animals, events, and operations.":"Enter your farm name and username to recover your access."})]})]}),n.jsxs("form",{onSubmit:p,style:{width:"100%"},children:[n.jsx(qs,{icon:Qo,label:"Farm name",children:n.jsx("input",{type:"text",value:r,onChange:S=>s(S.target.value),style:h,placeholder:"Enter farm name",autoComplete:"organization"})}),n.jsx(qs,{icon:Ko,label:N==="login"?"Username or Email":"Username",children:n.jsx("input",{type:"text",value:i,onChange:S=>a(S.target.value),style:h,placeholder:N==="login"?"Enter username or email":"Enter username",autoComplete:"username"})}),N==="create"&&n.jsx(qs,{icon:em,label:"Email",children:n.jsx("input",{type:"email",value:l,onChange:S=>c(S.target.value),style:h,placeholder:"Enter email (optional)",autoComplete:"email"})}),N!=="forgot"&&n.jsx(qs,{icon:Ul,label:"Password",children:n.jsxs("div",{children:[n.jsx("input",{type:"password",value:o,onChange:S=>d(S.target.value),style:h,placeholder:"Enter password",autoComplete:N==="create"?"new-password":"current-password"}),N==="login"&&n.jsx("div",{style:{marginTop:10,textAlign:"right"},children:n.jsx("button",{type:"button",onClick:()=>u("forgot"),style:{background:"transparent",border:"none",color:"#2563EB",fontWeight:700,cursor:"pointer",fontSize:13},children:"Forgot password?"})})]})}),v&&n.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",color:"#A33B3B",fontSize:13,marginBottom:14,background:"#FEF2F2",padding:12,borderRadius:12},children:[n.jsx(Hi,{size:16}),n.jsx("span",{children:v})]}),f&&n.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",color:"#166534",fontSize:13,marginBottom:14,background:"#F0FDF4",padding:12,borderRadius:12},children:[n.jsx(ua,{size:16}),n.jsx("span",{children:f})]}),n.jsx("button",{type:"submit",disabled:O,style:{width:"100%",background:O?"#93C5FD":"linear-gradient(135deg, #2563EB, #1D4ED8)",color:"#fff",border:"none",padding:"14px 0",borderRadius:14,fontWeight:700,fontSize:15,cursor:O?"not-allowed":"pointer",boxShadow:"0 16px 32px rgba(37,99,235,0.18)"},children:O?"Please wait...":N==="login"?"Log in":N==="create"?"Create account":"Recover password"})]}),n.jsx("div",{style:{marginTop:18,textAlign:"center",fontSize:13,color:"#6B7280"},children:N==="login"?n.jsx("button",{type:"button",onClick:()=>u("create"),style:{background:"transparent",border:"none",color:"#2563EB",fontWeight:700,cursor:"pointer"},children:"Create a new farm account"}):n.jsx("button",{type:"button",onClick:()=>u("login"),style:{background:"transparent",border:"none",color:"#2563EB",fontWeight:700,cursor:"pointer"},children:"Back to login"})})]})}const ae={pagePadding:{horizontal:20,vertical:24},headerPadding:{horizontal:20,vertical:22},spacing:{sm:12,md:16,xl:24},card:{padding:20,border:"1px solid",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"},radius:{md:12,lg:16},gap:{section:20,card:16,item:12,field:16}},oe={primary:"#2F6FED",primaryDark:"#2355C9",primaryLight:"#EEF4FF",navy:"#12336B",navyDark:"#0B2545",text:"#16233D",textWhite:"#FFFFFF",border:"#DCE6F9",borderLight:"#E4ECFB",bgSoft:"#F8FAFF",bgPage:"#F3F7FF",bgPage2:"#EAF1FD",successBg:"#DCFCE7",dangerDark:"#B91C1C",dangerBg:"#FEF2F2"},Xe={family:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, Helvetica, Arial, sans-serif",size:{sm:12,md:14,xl:16},weight:{semibold:600,bold:700}},Qi=()=>`
  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${Xe.family};
    color: ${oe.text};
    background: linear-gradient(180deg, ${oe.bgPage} 0%, ${oe.bgPage2} 100%);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  /* Container with consistent max-width */
  .page-container {
    max-width: 100%;
    width: 100%;
    margin: 0;
    padding: ${ae.pagePadding.vertical}px ${ae.pagePadding.horizontal}px;
  }

  /* Header with consistent styling */
  .page-header {
    background: linear-gradient(135deg, ${oe.navy}, ${oe.navyDark});
    color: ${oe.textWhite};
    padding: ${ae.headerPadding.vertical}px ${ae.headerPadding.horizontal}px;
    width: 100%;
    max-width: 100%;
  }

  .page-header-inner {
    max-width: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${ae.spacing.md}px;
  }

  /* Card styling (consistent) */
  .card {
    background: ${oe.textWhite};
    border: ${ae.card.border} ${oe.borderLight};
    border-radius: ${ae.radius.lg}px;
    padding: ${ae.card.padding}px;
    box-shadow: ${ae.card.boxShadow};
  }

  /* Grid layouts */
  .grid-auto-fit {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: ${ae.gap.card}px;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${ae.gap.card}px;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${ae.gap.card}px;
  }

  /* Sections */
  .section {
    margin-bottom: ${ae.gap.section}px;
  }

  .section-title {
    font-size: ${Xe.size.xl}px;
    font-weight: ${Xe.weight.bold};
    color: ${oe.text};
    margin-bottom: ${ae.gap.card}px;
  }

  /* Form fields */
  .form-field {
    margin-bottom: ${ae.gap.field}px;
  }

  .form-label {
    font-size: ${Xe.size.sm}px;
    font-weight: ${Xe.weight.bold};
    color: ${oe.text};
    margin-bottom: ${ae.gap.item}px;
    display: block;
  }

  .form-input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid ${oe.border};
    border-radius: ${ae.radius.md}px;
    font-size: ${Xe.size.md}px;
    font-family: inherit;
    color: ${oe.text};
    background: ${oe.textWhite};
  }

  .form-input:focus {
    outline: none;
    border-color: ${oe.primary};
    box-shadow: 0 0 0 3px ${oe.primaryLight};
  }

  /* Buttons (consistent styling) */
  .btn {
    padding: 12px 20px;
    border-radius: ${ae.radius.md}px;
    border: none;
    font-weight: ${Xe.weight.semibold};
    font-size: ${Xe.size.md}px;
    cursor: pointer;
    transition: all 0.12s ease;
  }

  .btn-primary {
    background: linear-gradient(135deg, #3B7CF7, ${oe.primaryDark});
    color: ${oe.textWhite};
    box-shadow: 0 4px 12px rgba(47, 111, 237, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(47, 111, 237, 0.4);
  }

  .btn-secondary {
    background: ${oe.bgSoft};
    color: ${oe.text};
    border: 1px solid ${oe.border};
  }

  .btn-secondary:hover {
    background: ${oe.borderLight};
  }

  /* Empty states */
  .empty-state {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: ${ae.spacing.xl}px;
    border-radius: ${ae.radius.lg}px;
    background: ${oe.textWhite};
    border: 1px solid ${oe.borderLight};
  }

  /* Error messages */
  .error-message {
    padding: ${ae.spacing.sm}px ${ae.spacing.md}px;
    border-radius: ${ae.radius.md}px;
    background: ${oe.dangerBg};
    border: 1px solid #FCA5A5;
    color: ${oe.dangerDark};
    font-size: ${Xe.size.sm}px;
    font-weight: ${Xe.weight.semibold};
  }

  /* Success messages */
  .success-message {
    padding: ${ae.spacing.sm}px ${ae.spacing.md}px;
    border-radius: ${ae.radius.md}px;
    background: ${oe.successBg};
    border: 1px solid #86EFAC;
    color: #166534;
    font-size: ${Xe.size.sm}px;
    font-weight: ${Xe.weight.semibold};
  }

  /* Responsive breakpoints */
  @media (max-width: 768px) {
    .page-container {
      padding: ${ae.pagePadding.vertical}px 12px;
    }

    .page-header {
      padding: 16px 12px;
    }

    .grid-2,
    .grid-3 {
      grid-template-columns: 1fr;
    }

    .grid-auto-fit {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .page-container {
      padding: 16px 10px;
    }

    .page-header {
      padding: 14px 10px;
    }

    .card {
      padding: 16px;
    }

    .btn {
      padding: 10px 16px;
      font-size: ${Xe.size.sm}px;
    }
  }
`,wm="http://localhost:5000/api";async function Gr(e,t={}){try{const r=await fetch(`${wm}${e}`,{...t,credentials:"include",headers:{"Content-Type":"application/json",...t.headers||{}}});let s=null;try{s=await r.json()}catch{s=null}if(!r.ok){const i=new Error((s==null?void 0:s.message)||(s==null?void 0:s.error)||`Request failed with status ${r.status}`);throw i.status=r.status,i.code=(s==null?void 0:s.code)||"",i.success=(s==null?void 0:s.success)??!1,i.data=s,i}return s}catch(r){if((r==null?void 0:r.status)===void 0){const s=new Error("Unable to connect to the backend server.");throw s.status=0,s.code="NETWORK_ERROR",s.originalError=r,s}throw r}}function Xs(e){return(e==null?void 0:e.status)===402&&["SUBSCRIPTION_EXPIRED","SUBSCRIPTION_REQUIRED","SUBSCRIPTION_INVALID","TENANT_INACTIVE"].includes(e==null?void 0:e.code)}function Js(e){return(e==null?void 0:e.status)===401||(e==null?void 0:e.code)==="AUTH_REQUIRED"||(e==null?void 0:e.code)==="AUTH_FAILED"||(e==null?void 0:e.code)==="INVALID_TOKEN"}function Zs(e){return(e==null?void 0:e.status)===0||(e==null?void 0:e.code)==="NETWORK_ERROR"}function Nm(e,t=[]){if(Array.isArray(e))return e;for(const r of t)if(Array.isArray(e==null?void 0:e[r]))return e[r];return[]}function Ga(){return n.jsx("style",{children:`
      * { box-sizing: border-box; }
      body { margin: 0; }
      button, input, select, textarea { font-family: inherit; }

      .gp-app {
        --primary: #2F6FED; --primary-dark: #2355C9;
        --navy: #12336B; --navy-dark: #0B2545;
        --text: #16233D; --text-muted: #5A6B87; --text-faint: #8CA0C2; --text-faint2: #93A6C6;
        --border: #DCE6F9; --border-light: #E4ECFB;
        --bg-soft: #F8FAFF; --bg-page: #F3F7FF; --bg-page2: #EAF1FD;
        --danger: #DC2626; --danger-dark: #B91C1C;
        --success: #16834A; --success-bg: #E8F8EE;
        --warning: #FFC857;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        min-height: 100vh;
        background: linear-gradient(180deg, var(--bg-page) 0%, var(--bg-page2) 100%);
        color: var(--text);
      }

      .gp-header {
        background: linear-gradient(135deg, var(--navy), var(--navy-dark));
        padding: 18px 16px;
        color: #fff;
      }

      .gp-header-inner {
        max-width: 1180px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }

      .gp-back {
        display: flex;
        align-items: center;
        gap: 10px;
        border: none;
        background: transparent;
        color: #fff;
        cursor: pointer;
        font-size: 16px;
        font-weight: 700;
      }

      .gp-icon-btn {
        border: none;
        background: rgba(255,255,255,.14);
        color: #fff;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform .12s ease;
      }

      .gp-icon-btn:hover { transform: translateY(-1px); }

      .gp-icon-row {
        display: flex;
        gap: 10px;
      }

      .gp-content {
        max-width: 1180px;
        margin: 0 auto;
        padding: 22px 16px 90px;
      }

      .gp-filters {
        display: grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        gap: 14px;
        margin-bottom: 13px;
      }

      .gp-filter-btn {
        background: #fff;
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 16px 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        color: var(--navy);
        font-weight: 700;
      }

      .gp-notice {
        background: #FFF7E6;
        color: #8A5A00;
        border: 1px solid #FCE4B0;
        border-radius: 12px;
        padding: 12px 16px;
        margin-bottom: 13px;
        font-size: 13.5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }

      .gp-error {
        margin-top: 18px;
        padding: 13px 15px;
        border-radius: 12px;
        background: #FEF2F2;
        border: 1px solid #FECACA;
        color: var(--danger-dark);
        font-size: 13px;
        font-weight: 600;
      }

      .gp-info {
        margin-bottom: 13px;
        padding: 12px 15px;
        border-radius: 12px;
        background: #EEF4FF;
        border: 1px solid #D6E4FF;
        color: var(--primary-dark);
        font-size: 13px;
        font-weight: 600;
      }

      .gp-empty {
        min-height: 300px;
        background: #fff;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 18px rgba(37,99,235,.08);
        border: 1px solid var(--border-light);
      }

      .gp-fab {
        position: fixed;
        right: 22px;
        bottom: 22px;
        background: linear-gradient(135deg, #3B7CF7, var(--primary-dark));
        color: #fff;
        border: none;
        border-radius: 30px;
        padding: 15px 26px;
        font-weight: 800;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        box-shadow: 0 14px 28px rgba(35,85,201,.35);
        z-index: 20;
        transition: transform .12s ease;
      }

      .gp-fab:hover { transform: translateY(-1px); }

      .gp-goat-card {
        background: #fff;
        min-height: 150px;
        border-radius: 18px;
        margin-bottom: 15px;
        padding: 18px 16px;
        display: flex;
        align-items: center;
        gap: 18px;
        box-shadow: 0 4px 16px rgba(15,42,87,.07);
        border: 1px solid var(--border-light);
        position: relative;
        transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
      }

      .gp-goat-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(37,99,235,.14);
        border-color: #C7DBFB;
      }

      .gp-goat-click {
        display: flex;
        align-items: center;
        gap: 18px;
        flex: 1;
        min-width: 0;
        cursor: pointer;
      }

      .gp-goat-photo {
        width: 100px;
        height: 100px;
        flex-shrink: 0;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(145deg,#EAF1FE,#DCE9FD);
        font-size: 54px;
      }

      .gp-goat-photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .gp-goat-tag {
        color: #89A0C4;
        font-size: 12px;
        font-weight: 700;
        margin-bottom: 4px;
      }

      .gp-goat-name {
        margin: 0 0 6px;
        color: #0F2A57;
        font-size: 19px;
        font-weight: 800;
      }

      .gp-goat-breed {
        color: var(--text-muted);
        font-size: 13px;
      }

      .gp-goat-stage {
        margin-top: 6px;
        color: var(--primary);
        font-size: 12px;
        font-weight: 700;
      }

      .gp-goat-gender {
        align-self: flex-end;
        margin-bottom: 4px;
        margin-right: 20px;
        color: #7C8CA6;
        font-size: 13px;
        font-weight: 600;
      }

      .gp-card-menu-btn {
        border: none;
        background: transparent;
        cursor: pointer;
        color: #375380;
        padding: 5px;
        border-radius: 8px;
      }

      .gp-card-menu-backdrop {
        position: fixed;
        inset: 0;
        z-index: 40;
      }

      .gp-card-menu {
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 14px 32px rgba(15,42,87,.18);
        border: 1px solid var(--border-light);
        overflow: hidden;
        min-width: 160px;
        z-index: 41;
      }

      .gp-menu-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 11px 14px;
        border: none;
        background: transparent;
        cursor: pointer;
        font-size: 13.5px;
        font-weight: 650;
        color: var(--text);
        text-align: left;
        transition: background .12s ease;
      }

      .gp-menu-item:hover { background: #F0F5FF; }
      .gp-menu-item:disabled {
        opacity: .45;
        cursor: not-allowed;
        background: transparent;
      }
      .gp-menu-item.danger { color: var(--danger); }
      .gp-menu-divider {
        height: 1px;
        background: var(--border-light);
        margin: 5px 0;
      }

      .gp-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(11,37,69,.45);
        backdrop-filter: blur(2px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        z-index: 500;
      }

      .gp-modal {
        background: #fff;
        border-radius: 18px;
        padding: 24px;
        width: 100%;
        max-width: 620px;
        max-height: 88vh;
        overflow-y: auto;
        box-shadow: 0 24px 60px rgba(11,37,69,.30);
      }

      .gp-modal.wide { max-width: 700px; }
      .gp-modal.narrow { max-width: 380px; }

      .gp-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .gp-modal-header h2 {
        margin: 0;
        color: var(--navy);
        font-size: 19px;
        font-weight: 800;
      }

      .gp-modal-close {
        width: 34px;
        height: 34px;
        border-radius: 9px;
        border: none;
        background: #F0F5FF;
        color: #375380;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .gp-modal-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .gp-modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 22px;
        padding-top: 18px;
        border-top: 1px solid var(--border-light);
      }

      .gp-muted-line {
        color: var(--text-muted);
        font-size: 13px;
      }

      .gp-field { margin-bottom: 15px; }
      .gp-field.full { grid-column: 1 / -1; }

      .gp-field label {
        display: block;
        margin-bottom: 7px;
        color: var(--text-muted);
        font-size: 12px;
        font-weight: 700;
      }

      .gp-input {
        width: 100%;
        height: 42px;
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 0 12px;
        color: var(--text);
        background: var(--bg-soft);
        font-size: 13px;
        outline: none;
      }

      .gp-textarea {
        height: 78px;
        padding-top: 10px;
        resize: vertical;
      }

      .gp-btn {
        height: 46px;
        padding: 0 22px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 750;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 9px;
        justify-content: center;
        transition: transform .12s ease;
      }

      .gp-btn:hover { transform: translateY(-1px); }

      .gp-btn:disabled {
        opacity: .6;
        cursor: not-allowed;
        transform: none;
      }

      .gp-btn-ghost {
        border: 1px solid var(--border);
        background: #fff;
        color: var(--text-muted);
      }

      .gp-btn-primary {
        border: none;
        background: linear-gradient(135deg,#3B7CF7,var(--primary-dark));
        color: #fff;
      }

      .gp-btn-danger {
        border: none;
        background: linear-gradient(135deg,#EF4444,var(--danger));
        color: #fff;
      }

      .gp-link-btn {
        display: flex;
        align-items: center;
        gap: 7px;
        border: none;
        background: transparent;
        color: var(--primary-dark);
        font-size: 12.5px;
        font-weight: 700;
        cursor: pointer;
        padding: 4px 0 2px;
      }

      .gp-hero {
        position: relative;
        min-height: 250px;
        background: linear-gradient(160deg, var(--primary) 0%, var(--navy) 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 26px;
      }

      .gp-hero::before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% 0%, rgba(255,255,255,.16), transparent 60%);
        pointer-events: none;
      }

      .gp-hero-top {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 16px 0;
        z-index: 20;
      }

      .gp-hero-btn {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        border: none;
        background: rgba(255,255,255,.20);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .gp-hero-photo {
        position: relative;
        z-index: 1;
        margin-top: 24px;
        width: 108px;
        height: 108px;
        border-radius: 22px;
        background: #fff;
        box-shadow: 0 12px 28px rgba(0,0,0,.20);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        font-size: 58px;
      }

      .gp-hero-photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .gp-hero-name {
        position: relative;
        z-index: 1;
        margin-top: 14px;
        color: #fff;
        font-size: 21px;
        font-weight: 800;
      }

      .gp-hero-sub {
        position: relative;
        z-index: 1;
        margin-top: 4px;
        color: rgba(255,255,255,.82);
        font-size: 12.5px;
        font-weight: 600;
      }

      .gp-detail-menu {
        position: absolute;
        right: 0;
        top: 48px;
        width: 210px;
        background: #fff;
        border-radius: 14px;
        padding: 7px;
        box-shadow: 0 18px 45px rgba(11,37,69,.30);
        border: 1px solid var(--border-light);
        z-index: 999;
      }

      .gp-detail-menu .gp-menu-item {
        border-radius: 9px;
      }

      .gp-tabs {
        display: flex;
        background: #fff;
        border-bottom: 1px solid var(--border-light);
      }

      .gp-tab {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 14px 10px;
        border: none;
        background: transparent;
        color: var(--text-faint);
        font-weight: 700;
        font-size: 13.5px;
        cursor: pointer;
        border-bottom: 3px solid transparent;
      }

      .gp-tab.active {
        color: var(--primary-dark);
        border-bottom-color: var(--primary-dark);
      }

      .gp-tab-badge {
        background: var(--primary);
        color: #fff;
        border-radius: 20px;
        min-width: 20px;
        height: 20px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      }

      .gp-body {
        max-width: 720px;
        margin: 0 auto;
        padding: 16px 14px 0;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .gp-panel {
        background: #fff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(15,42,87,.07);
        border: 1px solid var(--border-light);
      }

      .gp-panel-header {
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: #fff;
        padding: 13px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 800;
        font-size: 14px;
      }

      .gp-panel-header button {
        width: 30px;
        height: 30px;
        border-radius: 9px;
        border: none;
        background: rgba(255,255,255,.22);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .gp-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 13px 16px;
        border-bottom: 1px solid #F0F4FC;
        gap: 15px;
      }

      .gp-row:last-child { border-bottom: none; }

      .gp-row-label {
        color: var(--text-faint);
        font-size: 13px;
      }

      .gp-row-value {
        display: flex;
        align-items: center;
        gap: 10px;
        text-align: right;
        color: var(--navy);
        font-size: 13.5px;
        font-weight: 700;
      }

      .gp-empty-note {
        padding: 26px 20px;
        text-align: center;
        color: var(--text-faint2);
        font-size: 12.5px;
        line-height: 1.6;
      }

      .gp-strip {
        border: none;
        background: linear-gradient(135deg,#3B7CF7,var(--primary-dark));
        color: #fff;
        border-radius: 30px;
        padding: 15px 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-weight: 700;
        font-size: 13.5px;
        cursor: pointer;
      }

      .gp-strip-outline {
        border: 1px solid var(--border);
        background: #fff;
        color: var(--navy);
        border-radius: 16px;
        padding: 15px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 700;
        font-size: 13.5px;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(15,42,87,.06);
      }

      .gp-strip-outline .left {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--primary-dark);
      }

      .gp-strip-outline .right {
        color: var(--text-muted);
        font-weight: 700;
      }

      .gp-event-card {
        background: #fff;
        border: 1px solid var(--border-light);
        border-radius: 14px;
        padding: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 4px 14px rgba(15,42,87,.06);
      }

      .gp-event-icon {
        width: 42px;
        height: 42px;
        border-radius: 11px;
        background: #EAF1FE;
        color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .gp-event-badge {
        background: #EEF4FF;
        color: var(--primary-dark);
        border-radius: 20px;
        padding: 5px 8px;
        font-size: 10px;
        font-weight: 700;
      }

      .gp-report-grid {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap: 12px;
      }

      .gp-report-box {
        background: var(--bg-soft);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 13px;
      }

      .gp-report-box .label {
        color: var(--text-faint);
        font-size: 11px;
        margin-bottom: 4px;
      }

      .gp-report-box strong {
        color: var(--navy);
        font-size: 14px;
      }

      .gp-select-modal {
        background: #fff;
        border-radius: 18px;
        padding: 18px;
        width: 100%;
        max-width: 340px;
        box-shadow: 0 24px 60px rgba(11,37,69,.30);
      }

      .gp-select-search {
        width: 100%;
        height: 40px;
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 0 12px;
        margin-bottom: 10px;
        font-size: 13px;
        outline: none;
      }

      .gp-select-option {
        width: 100%;
        text-align: left;
        padding: 10px;
        border: none;
        background: transparent;
        border-radius: 9px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--text);
        font-size: 13.5px;
        font-weight: 600;
      }

      .gp-select-option.active {
        background: #EAF1FE;
        color: var(--primary-dark);
      }

      .gp-select-option:hover { background: #F0F5FF; }

      .gp-form-header {
        background: linear-gradient(135deg, var(--navy), var(--navy-dark));
        padding: 17px 20px;
        color: #fff;
      }

      .gp-form-header-inner {
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .gp-form-back {
        display: flex;
        align-items: center;
        gap: 9px;
        border: none;
        background: transparent;
        color: #fff;
        cursor: pointer;
        font-size: 15px;
        font-weight: 700;
      }

      .gp-form-save {
        border: none;
        border-radius: 10px;
        background: rgba(255,255,255,.16);
        color: #fff;
        padding: 10px 16px;
        font-size: 11px;
        font-weight: 800;
        cursor: pointer;
      }

      .gp-form {
        max-width: 1050px;
        margin: 0 auto;
        padding: 42px 20px 70px;
      }

      .gp-form-title {
        text-align: center;
        margin-bottom: 30px;
      }

      .gp-eyebrow {
        color: var(--primary);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1.7px;
        margin-bottom: 7px;
      }

      .gp-form-title h1 {
        margin: 0;
        color: var(--navy-dark);
        font-size: 34px;
        font-weight: 800;
      }

      .gp-form-title p {
        margin: 8px 0 0;
        color: #6B7C9A;
        font-size: 14px;
      }

      .gp-photo-card {
        background: #fff;
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 25px;
        text-align: center;
      }

      .gp-photo-drop {
        height: 235px;
        border: 2px dashed #A9C6F8;
        border-radius: 16px;
        background: linear-gradient(145deg,#F6FAFF,#EAF2FE);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .gp-photo-drop img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .gp-photo-icon {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        margin-bottom: 12px;
      }

      .gp-photo-upload {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        margin-top: 15px;
        padding: 10px 17px;
        border-radius: 10px;
        background: #EAF1FE;
        color: var(--primary-dark);
        font-size: 12px;
        font-weight: 750;
        cursor: pointer;
      }

      .gp-two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
        margin-top: 18px;
      }

      .gp-three-col {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 20px;
      }

      .gp-form-card {
        background: #fff;
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 25px;
        margin-top: 18px;
      }

      .gp-section-title {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 23px;
      }

      .gp-section-icon {
        width: 40px;
        height: 40px;
        border-radius: 11px;
        background: #EAF1FE;
        color: var(--primary-dark);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .gp-section-num {
        display: block;
        font-size: 9px;
        color: var(--text-faint);
        font-weight: 800;
        letter-spacing: 1px;
      }

      .gp-section-title h2 {
        margin: 2px 0 0;
        font-size: 17px;
        color: var(--navy);
      }

      .gp-visual-field { margin-bottom: 18px; }

      .gp-visual-wrap {
        height: 45px;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: var(--bg-soft);
        display: flex;
        align-items: center;
        overflow: hidden;
      }

      .gp-visual-prefix {
        padding-left: 13px;
        color: #7891B6;
        font-weight: 750;
      }

      .gp-visual-input {
        flex: 1;
        height: 100%;
        border: none;
        outline: none;
        background: transparent;
        padding: 0 13px;
        color: var(--text);
        font-size: 13px;
      }

      .gp-readonly {
        height: 45px;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: var(--bg-soft);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 13px;
        color: var(--text);
        font-size: 13px;
        font-weight: 650;
        margin-bottom: 19px;
      }

      .gp-gender-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 9px;
      }

      .gp-gender-btn {
        height: 45px;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: var(--bg-soft);
        color: #6B7C9A;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
      }

      .gp-gender-btn.active {
        border-color: #4E8AF4;
        background: #EAF1FE;
        color: var(--primary-dark);
      }

      .gp-timeline-field {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .gp-timeline-icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 11px;
        background: #EAF1FE;
        color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .gp-timeline-field label {
        display: block;
        margin-bottom: 5px;
        color: var(--text-muted);
        font-size: 12px;
        font-weight: 700;
      }

      .gp-timeline-input {
        border: none;
        outline: none;
        padding: 0;
        color: var(--text);
        background: transparent;
        font-size: 13px;
        font-weight: 700;
        max-width: 150px;
      }

      .gp-weight-wrap {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .gp-kg {
        color: var(--text-faint);
        font-size: 12px;
        font-weight: 700;
      }

      .gp-stage-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .gp-hint {
        margin: 3px 0 0;
        color: var(--text-faint2);
        font-size: 11px;
      }

      .gp-stage-select {
        width: 180px;
        height: 42px;
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 0 12px;
        color: var(--text);
        background: var(--bg-soft);
        outline: none;
        font-weight: 650;
      }

      .gp-origin-heading {
        display: flex;
        align-items: center;
        gap: 13px;
        margin-bottom: 16px;
      }

      .gp-origin-num {
        width: 31px;
        height: 31px;
        border-radius: 9px;
        background: var(--primary-dark);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 800;
      }

      .gp-origin-heading h2 {
        margin: 0;
        color: var(--navy);
        font-size: 17px;
      }

      .gp-origin-grid {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 14px;
      }

      .gp-origin-card {
        position: relative;
        min-height: 90px;
        padding: 17px;
        border: 1px solid var(--border);
        border-radius: 14px;
        background: #fff;
        display: flex;
        align-items: center;
        gap: 13px;
        text-align: left;
        cursor: pointer;
      }

      .gp-origin-card.active {
        border-color: #4E8AF4;
        background: #F1F6FE;
      }

      .gp-origin-icon {
        width: 43px;
        height: 43px;
        flex-shrink: 0;
        border-radius: 12px;
        background: #EAF1FE;
        color: var(--primary-dark);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 21px;
      }

      .gp-origin-title {
        display: block;
        color: var(--text);
        font-size: 13px;
      }

      .gp-origin-subtitle {
        display: block;
        margin-top: 4px;
        color: var(--text-faint2);
        font-size: 10px;
      }

      .gp-origin-check {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--primary);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .gp-form-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 12px;
        margin-top: 30px;
        padding-top: 23px;
        border-top: 1px solid var(--border-light);
      }

      /* SCALE */

      .gp-scale-header {
        background: linear-gradient(135deg, var(--navy), var(--navy-dark));
        padding: 18px 16px;
        color: #fff;
      }

      .gp-scale-header-inner {
        max-width: 900px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 12px;
      }

      .gp-scale-back {
        display: flex;
        align-items: center;
        gap: 8px;
        border: none;
        background: rgba(255,255,255,.14);
        color: #fff;
        cursor: pointer;
        font-size: 13px;
        font-weight: 700;
        padding: 9px 14px;
        border-radius: 10px;
        justify-self: start;
      }

      .gp-scale-title {
        text-align: center;
        font-size: 18px;
        font-weight: 800;
      }

      .gp-scale-subtitle {
        text-align: center;
        margin-top: 2px;
        font-size: 11.5px;
        color: rgba(255,255,255,.75);
      }

      .gp-scale-connected {
        justify-self: end;
        display: flex;
        align-items: center;
        gap: 7px;
        background: rgba(97,255,145,.16);
        color: #61FF91;
        padding: 9px 14px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
      }

      .gp-scale-body {
        max-width: 900px;
        margin: 0 auto;
        padding: 22px 16px 60px;
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .gp-scale-goat {
        background: #fff;
        border-radius: 17px;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 0 4px 16px rgba(15,42,87,.07);
        border: 1px solid var(--border-light);
      }

      .gp-scale-avatar {
        width: 60px;
        height: 60px;
        flex-shrink: 0;
        border-radius: 15px;
        background: linear-gradient(145deg,#EAF1FE,#DCE9FD);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 34px;
        overflow: hidden;
      }

      .gp-scale-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .gp-scale-goat-name {
        color: #0F2A57;
        font-size: 17px;
        font-weight: 800;
      }

      .gp-scale-goat-meta {
        margin-top: 4px;
        color: var(--text-muted);
        font-size: 12.5px;
      }

      .gp-scale-last {
        text-align: right;
        margin-left: auto;
      }

      .gp-scale-last label {
        display: block;
        color: var(--text-faint);
        font-size: 10.5px;
        font-weight: 800;
        letter-spacing: .5px;
      }

      .gp-scale-last strong {
        display: block;
        margin-top: 5px;
        font-size: 21px;
        color: var(--navy);
      }

      .gp-scale-card {
        background: #fff;
        border-radius: 18px;
        padding: 30px;
        text-align: center;
        border: 1px solid var(--border-light);
        box-shadow: 0 4px 16px rgba(15,42,87,.07);
      }

      .gp-scale-heading {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-weight: 800;
        color: var(--text-muted);
        font-size: 12.5px;
        letter-spacing: .5px;
      }

      .gp-scale-lcd {
        max-width: 460px;
        margin: 20px auto;
        padding: 26px;
        border-radius: 16px;
        background: #0B1220;
      }

      .gp-scale-number {
        font-family: SFMono-Regular, Menlo, monospace;
        font-size: 62px;
        font-weight: 800;
        color: #61FF91;
      }

      .gp-scale-number span {
        font-size: 22px;
        margin-left: 8px;
      }

      .gp-scale-status {
        margin-top: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        font-size: 12.5px;
      }

      .gp-scale-status.stable { color: #61FF91; }
      .gp-scale-status.measuring { color: var(--warning); }

      .gp-scale-platform {
        width: 300px;
        margin: 28px auto 8px;
      }

      .gp-platform-top {
        height: 78px;
        border: 4px solid #9DA5AD;
        background: #DCE0E4;
        border-radius: 15px 15px 5px 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 42px;
      }

      .gp-platform-mid {
        height: 56px;
        background: #707981;
        padding: 11px 24px;
      }

      .gp-platform-mid div {
        height: 3px;
        background: #ABB1B6;
        margin-bottom: 7px;
      }

      .gp-platform-legs {
        display: flex;
        justify-content: space-between;
        padding: 0 24px;
      }

      .gp-platform-legs i {
        width: 14px;
        height: 23px;
        background: #444B52;
        display: block;
      }

      .gp-scale-instruction {
        color: var(--text-faint);
        font-size: 13px;
        margin-top: 6px;
      }

      .gp-scale-save {
        background: #fff;
        border-radius: 16px;
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 16px;
        border: 1px solid var(--border-light);
      }

      .gp-scale-save h3 {
        margin: 0;
        color: var(--navy);
        font-size: 15px;
      }

      .gp-scale-save p {
        margin: 4px 0 0;
        color: var(--text-muted);
        font-size: 12.5px;
      }

      .gp-scale-success {
        background: var(--success-bg);
        color: var(--success);
        padding: 13px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 700;
        font-size: 13px;
      }

      .gp-scale-panel {
        background: #fff;
        border-radius: 16px;
        padding: 20px;
        border: 1px solid var(--border-light);
      }

      .gp-scale-panel h3 {
        margin: 0 0 14px;
        color: var(--navy);
        font-size: 15px;
      }

      .gp-hw-flow {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      .gp-hw-node {
        border: 1px solid var(--border-light);
        background: var(--bg-soft);
        padding: 12px 17px;
        border-radius: 10px;
        text-align: center;
        color: var(--navy);
      }

      .gp-hw-node small {
        display: block;
        margin-top: 4px;
        color: var(--text-faint);
        font-weight: 500;
      }

      .gp-hw-arrow {
        color: var(--text-faint);
        font-size: 18px;
      }

      .gp-history-row {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #F0F4FC;
        padding: 12px 0;
      }

      .gp-history-row:first-child {
        border-top: none;
      }

      .gp-history-row strong {
        display: block;
        color: var(--navy);
        font-size: 13.5px;
      }

      .gp-history-row small {
        display: block;
        margin-top: 3px;
        color: var(--text-faint);
        font-size: 11px;
      }

      .gp-loading {
        min-height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-muted);
        font-size: 14px;
      }

      @media (max-width: 760px) {
        .gp-two-col,
        .gp-three-col,
        .gp-origin-grid,
        .gp-modal-grid,
        .gp-scale-header-inner {
          grid-template-columns: 1fr !important;
        }

        .gp-goat-card {
          flex-wrap: wrap;
        }

        .gp-filters {
          grid-template-columns: 1fr !important;
        }

        .gp-scale-save {
          display: flex !important;
          flex-direction: column;
          align-items: stretch !important;
        }

        .gp-scale-connected {
          margin-left: 0 !important;
          justify-self: stretch;
        }

        .gp-scale-goat {
          flex-wrap: wrap;
        }

        .gp-scale-last {
          width: 100%;
          text-align: left;
          margin-left: 76px;
        }

        .gp-form-title h1 {
          font-size: 28px;
        }
      }
    `})}const Vp=["tenant","currentTenant","tenantData"];function Sm(e){try{return JSON.parse(e)}catch{return null}}function km(){if(typeof window>"u")return null;for(const e of Vp){const t=localStorage.getItem(e);if(!t)continue;const r=Sm(t);if(r&&typeof r=="object")return r}return null}function Cm(){if(typeof window>"u")return"tenant";for(const e of Vp)if(localStorage.getItem(e)!==null)return e;return"tenant"}function ei(e){var s;if(typeof window>"u")return;const t=km()||{},r={...t,data:{...t.data||{},goats:Array.isArray(e)?e:[],events:Array.isArray((s=t.data)==null?void 0:s.events)?t.data.events:[]}};try{localStorage.setItem(Cm(),JSON.stringify(r)),window.dispatchEvent(new CustomEvent("tenant-data-updated",{detail:r}))}catch(i){console.error("tenant.data.goats save error:",i)}}const Qp=["All Breeds","Kanni Adu (கன்னி ஆடு)","Kodi Adu (கொடி ஆடு)","Jamunapari (ஜமுனாபாரி)"],Em=["All Groups"],yr={Female:["Kid","Doeling","Doe"],Male:["Kid","Buckling","Buck","Wether"]},yd=["Health Check","Vaccination","Treatment","Breeding","Purchase","Sale","Weight","Other"],zm=[{value:"Born on farm",icon:"🐐",title:"Born Here",subtitle:"Born on your farm"},{value:"Purchased",icon:n.jsx(am,{size:20}),title:"Purchased",subtitle:"Bought from another farm"},{value:"Other",icon:n.jsx($t,{size:21}),title:"Other",subtitle:"Another source"}],Yp=()=>new Date().toISOString().slice(0,10),Xo=()=>`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,ji=(e,t,r={})=>({id:Xo(),type:e,title:t,date:Yp(),...r});function Kp(e){if(!e)return"-";const t=new Date(e);if(Number.isNaN(t.getTime()))return"-";const r=new Date;let s=(r.getFullYear()-t.getFullYear())*12+(r.getMonth()-t.getMonth());r.getDate()<t.getDate()&&(s-=1),s=Math.max(0,s);const i=Math.floor(s/12);return i>0?`${i}y ${s%12}m`:`${s%12}m`}function Ur(e){return e?{...e,id:e.id??e._id??Xo(),tagNumber:e.tagNumber??e.tag_number??"",name:e.name??"",breed:e.breed??"",gender:e.gender??"Female",stage:e.stage??"Kid",dob:e.dob??e.dateOfBirth??"",dateOfEntry:e.dateOfEntry??e.joinedOn??e.date_of_entry??"",weight:e.weight??e.currentWeight??null,group:e.group??"All Groups",obtained:e.obtained??e.source??"Born on farm",sireTagNumber:e.sireTagNumber??e.sire_tag_number??"",damTagNumber:e.damTagNumber??e.dam_tag_number??"",notes:e.notes??"",photo:e.photo??e.image??e.photoUrl??null,archived:!!e.archived,events:Array.isArray(e.events)?e.events:[],createdAt:e.createdAt??new Date().toISOString()}:null}function Am(e){return Nm(e,["goats","data","results"]).map(Ur)}function Nr({title:e,onClose:t,children:r,footer:s,size:i}){return n.jsx("div",{className:"gp-modal-overlay",onClick:t,children:n.jsxs("div",{className:`gp-modal ${i||""}`,onClick:a=>a.stopPropagation(),children:[n.jsxs("div",{className:"gp-modal-header",children:[n.jsx("h2",{children:e}),n.jsx("button",{type:"button",className:"gp-modal-close",onClick:t,children:n.jsx(le,{size:18})})]}),r,s&&n.jsx("div",{className:"gp-modal-actions",children:s})]})})}function Kl({title:e,message:t,confirmLabel:r,danger:s=!0,onConfirm:i,onCancel:a}){return n.jsx(Nr,{title:e,onClose:a,size:"narrow",footer:n.jsxs(n.Fragment,{children:[n.jsx("button",{type:"button",className:"gp-btn gp-btn-ghost",onClick:a,children:"Cancel"}),n.jsx("button",{type:"button",className:`gp-btn ${s?"gp-btn-danger":"gp-btn-primary"}`,onClick:i,children:r})]}),children:n.jsx("p",{className:"gp-muted-line",style:{lineHeight:1.6},children:t})})}function Nt({label:e,full:t,children:r}){return n.jsxs("div",{className:`gp-field${t?" full":""}`,children:[n.jsx("label",{children:e}),r]})}function Tm(e,t,r,s){if(e.type==="select"){const i=typeof e.options=="function"?e.options(s):e.options;return n.jsx("select",{className:"gp-input",value:t,onChange:a=>r(a.target.value),children:i.map(a=>n.jsx("option",{value:a,children:a},a))})}return e.type==="textarea"?n.jsx("textarea",{className:"gp-input gp-textarea",value:t,onChange:i=>r(i.target.value)}):n.jsx("input",{className:"gp-input",type:e.type||"text",step:e.type==="number"?"0.1":void 0,min:e.type==="number"?"0":void 0,value:t,onChange:i=>r(i.target.value)})}function vd({title:e,options:t,selected:r,query:s,onQueryChange:i,onPick:a,onClose:l}){const c=t.filter(o=>o.toLowerCase().includes(s.toLowerCase()));return n.jsxs("div",{className:"gp-select-modal",onClick:o=>o.stopPropagation(),children:[n.jsxs("div",{className:"gp-modal-header",style:{marginBottom:12},children:[n.jsx("strong",{style:{color:"var(--navy)",fontSize:15},children:e}),n.jsx("button",{type:"button",className:"gp-modal-close",onClick:l,children:n.jsx(le,{size:18})})]}),n.jsx("input",{className:"gp-select-search",value:s,onChange:o=>i(o.target.value),placeholder:"Search..."}),c.length===0?n.jsx("div",{style:{padding:15,color:"var(--text-faint)",fontSize:13,textAlign:"center"},children:"No options found"}):c.map(o=>n.jsxs("button",{type:"button",onClick:()=>a(o),className:`gp-select-option${o===r?" active":""}`,children:[o,o===r&&n.jsx(Ae,{size:16})]},o))]})}function Fm({onBack:e}){const[t,r]=x.useState([]),[s,i]=x.useState(!0),[a,l]=x.useState(""),[c,o]=x.useState(!1),[d,v]=x.useState(!1),[g,f]=x.useState(""),[j,N]=x.useState("All Breeds"),[A,O]=x.useState("All Groups"),[m,p]=x.useState(!1),[u,h]=x.useState(!1),[S,b]=x.useState(""),[w,_]=x.useState(""),[M,E]=x.useState(!1),[L,V]=x.useState(!1),[B,k]=x.useState(null),[F,T]=x.useState(null),[Q,P]=x.useState(null),[R,q]=x.useState(null);async function C(){i(!0),l("");try{const Y=await Gr("/goats"),H=Am(Y);r(H),o(!0),v(!1),f(""),l(""),ei(H)}catch(Y){if(console.error("GET /api/goats failed:",Y),Xs(Y)){o(!0),v(!0),f((Y==null?void 0:Y.message)||"Your subscription has expired. Please renew your subscription to continue."),l(""),r([]),k(null),E(!1),P(null),q(null);return}if(Js(Y)){o(!0),v(!1),f(""),r([]),k(null),l((Y==null?void 0:Y.message)||"Your session has expired. Please log in again.");return}if(Zs(Y)){o(!1),v(!1),f(""),r([]),l("Backend is not connected. Please start the backend server and try again.");return}o(!0),v(!1),f(""),r([]),l((Y==null?void 0:Y.message)||"Unable to load goats from the backend server.")}finally{i(!1)}}x.useEffect(()=>{C()},[]),x.useEffect(()=>{const Y=()=>{},H=()=>{};return window.addEventListener("tenant-data-updated",Y),window.addEventListener("storage",H),()=>{window.removeEventListener("tenant-data-updated",Y),window.removeEventListener("storage",H)}},[]);const W=x.useMemo(()=>t.filter(Y=>(j==="All Breeds"||Y.breed===j)&&(A==="All Groups"||Y.group===A)&&!Y.archived),[t,j,A]),te=x.useMemo(()=>t.find(Y=>String(Y.id)===String(B))||null,[t,B]);function X(){if(d){l(g||"Your subscription has expired. Please renew your subscription to continue.");return}if(j==="All Breeds"){V(!0),p(!0);return}V(!1),E(!0)}async function $(Y){const H=Ur(Y);try{const J=await Gr("/goats",{method:"POST",body:JSON.stringify({tagNumber:H.tagNumber,name:H.name,breed:H.breed,gender:H.gender,dob:H.dob,stage:H.stage,currentWeight:H.weight,weight:H.weight,group:H.group,obtained:H.obtained,sireTagNumber:H.sireTagNumber,damTagNumber:H.damTagNumber,notes:H.notes,photo:H.photo,archived:!1,dateOfEntry:H.dateOfEntry})}),Z=Ur((J==null?void 0:J.goat)||(J==null?void 0:J.data)||J);return o(!0),v(!1),f(""),l(""),r(vt=>{const un=[...vt.filter(Mn=>String(Mn.id)!==String(Z.id)),{...Z,events:H.events||[]}];return ei(un),un}),Z}catch(J){throw console.error("POST /api/goats failed:",J),Xs(J)?(o(!0),v(!0),f((J==null?void 0:J.message)||"Your subscription has expired. Please renew your subscription to continue."),l("")):Js(J)?(o(!0),l((J==null?void 0:J.message)||"Your session has expired. Please log in again.")):Zs(J)?(o(!1),l("Backend is not connected. Please start the backend server and try again.")):(o(!0),l((J==null?void 0:J.message)||"Unable to create the goat.")),J}}async function y(Y){const H=Ur(Y),J=H.id;try{const Z=await Gr(`/goats/${J}`,{method:"PUT",body:JSON.stringify({...H,currentWeight:H.weight})}),vt=Ur((Z==null?void 0:Z.goat)||(Z==null?void 0:Z.data)||Z);return o(!0),v(!1),f(""),l(""),r(un=>{const Mn=un.map(Pn=>String(Pn.id)===String(J)?{...Pn,...vt,events:H.events??Pn.events??[]}:Pn);return ei(Mn),Mn}),vt}catch(Z){throw console.error("PUT /api/goats failed:",Z),Xs(Z)?(o(!0),v(!0),f((Z==null?void 0:Z.message)||"Your subscription has expired. Please renew your subscription to continue."),l("")):Js(Z)?(o(!0),l((Z==null?void 0:Z.message)||"Your session has expired. Please log in again.")):Zs(Z)?(o(!1),l("Backend is not connected. Please start the backend server and try again.")):(o(!0),l((Z==null?void 0:Z.message)||"Unable to update the goat.")),Z}}async function D(Y){try{await Gr(`/goats/${Y}`,{method:"DELETE"}),o(!0),v(!1),f(""),l(""),r(H=>{const J=H.filter(Z=>String(Z.id)!==String(Y));return ei(J),J}),String(B)===String(Y)&&k(null)}catch(H){throw console.error("DELETE /api/goats failed:",H),Xs(H)?(o(!0),v(!0),f((H==null?void 0:H.message)||"Your subscription has expired. Please renew your subscription to continue."),l("")):Js(H)?(o(!0),l((H==null?void 0:H.message)||"Your session has expired. Please log in again.")):Zs(H)?(o(!1),l("Backend is not connected. Please start the backend server and try again.")):(o(!0),l((H==null?void 0:H.message)||"Unable to delete the goat.")),H}}async function ee(Y){const H=t.find(J=>String(J.id)===String(Y));H&&(await y({...H,archived:!0}),k(null))}return M?n.jsxs("div",{className:"gp-app",children:[n.jsx(Ga,{}),n.jsx($m,{breed:j,onClose:()=>E(!1),onSave:async Y=>{const H=await $(Y);E(!1),V(!1),k(H.id)}})]}):te?n.jsxs("div",{className:"gp-app",children:[n.jsx(Ga,{}),n.jsx(Mm,{goat:te,onBack:()=>k(null),onSave:y,onDelete:D,onArchive:ee,backendConnected:c,subscriptionBlocked:d,subscriptionMessage:g})]}):n.jsxs("div",{className:"gp-app",children:[n.jsx(Ga,{}),n.jsx("div",{className:"gp-header",children:n.jsxs("div",{className:"gp-header-inner",children:[n.jsxs("button",{type:"button",className:"gp-back",onClick:()=>e==null?void 0:e(),children:[n.jsx(Oe,{size:22}),n.jsx("span",{children:"Goats"})]}),n.jsxs("div",{className:"gp-icon-row",children:[n.jsx("button",{type:"button",className:"gp-icon-btn",onClick:C,title:"Refresh",children:n.jsx(Le,{size:19})}),n.jsx("button",{type:"button",className:"gp-icon-btn",children:n.jsx(nm,{size:19})}),n.jsx("button",{type:"button",className:"gp-icon-btn",children:n.jsx(_n,{size:19})})]})]})}),n.jsxs("div",{className:"gp-content",children:[a&&n.jsxs("div",{className:"gp-notice",children:[n.jsx("span",{children:a}),n.jsx("button",{type:"button",className:"gp-btn gp-btn-primary",style:{height:34,padding:"0 12px"},onClick:C,children:"Retry"})]}),c&&!a&&!d&&n.jsxs("div",{className:"gp-info",style:{background:"#E8F8EE",borderColor:"#C9EFD8",color:"#16834A"},children:[n.jsx(ua,{size:15,style:{verticalAlign:"middle",marginRight:6}}),"Goats are connected to the backend database."]}),n.jsxs("div",{className:"gp-filters",children:[n.jsxs("button",{type:"button",className:"gp-filter-btn",onClick:()=>p(!0),children:[n.jsx("span",{children:j}),n.jsx(ln,{size:19})]}),n.jsxs("button",{type:"button",className:"gp-filter-btn",onClick:()=>h(!0),children:[n.jsx("span",{children:A}),n.jsx(ln,{size:19})]})]}),L&&n.jsxs("div",{className:"gp-notice",children:[n.jsx("span",{children:"Please select a specific breed before adding a goat."}),n.jsx("button",{type:"button",className:"gp-btn gp-btn-primary",style:{height:34,padding:"0 12px"},onClick:()=>p(!0),children:"Select Breed"})]}),d?n.jsxs("div",{className:"gp-empty",children:[n.jsx(Jg,{size:48,style:{color:"var(--danger)",marginBottom:14}}),n.jsx("b",{style:{color:"#0F2A57",fontSize:20},children:"Your Free Trial Has Expired"}),n.jsx("p",{style:{color:"#7C8CA6",fontSize:13,maxWidth:500,lineHeight:1.6},children:g||"Your 14-day free trial has ended. Please renew your subscription to continue accessing your farm data."}),n.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginTop:8},children:[n.jsxs("button",{type:"button",className:"gp-btn gp-btn-primary",onClick:C,children:[n.jsx(Le,{size:16}),"Check Again"]}),n.jsxs("button",{type:"button",className:"gp-btn gp-btn-ghost",onClick:()=>e==null?void 0:e(),children:[n.jsx(Oe,{size:16}),"Go Back"]})]})]}):s?n.jsxs("div",{className:"gp-empty",children:[n.jsx(Le,{size:34,style:{color:"var(--primary)",marginBottom:12,animation:"spin 1s linear infinite"}}),n.jsx("b",{style:{color:"#0F2A57",fontSize:16},children:"Loading goats..."})]}):W.length===0?n.jsxs("div",{className:"gp-empty",children:[n.jsx("div",{style:{fontSize:52},children:"🐐"}),n.jsx("b",{style:{color:"#0F2A57",fontSize:16},children:"No goats have been registered for the selected filters as of yet!"}),n.jsx("p",{style:{color:"#7C8CA6",fontSize:13},children:"Select a breed and click + Add to create a goat profile."})]}):W.map(Y=>n.jsx(_m,{goat:Y,onOpen:()=>k(Y.id),menuOpen:F===Y.id,onToggleMenu:()=>T(H=>H===Y.id?null:Y.id),onCloseMenu:()=>T(null),onEdit:()=>{if(T(null),d){l(g||"Your subscription has expired. Please renew your subscription to continue.");return}P(Y)},onRemove:()=>{if(T(null),d){l(g||"Your subscription has expired. Please renew your subscription to continue.");return}q(Y)}},String(Y.id))),n.jsxs("button",{type:"button",className:"gp-fab",onClick:X,disabled:d,children:[n.jsx($t,{size:21}),"Add"]})]}),m&&n.jsx("div",{className:"gp-modal-overlay",onClick:()=>p(!1),children:n.jsx(vd,{title:"Select breed",options:Qp,selected:j,query:S,onQueryChange:b,onPick:Y=>{N(Y),p(!1),b(""),V(!1)},onClose:()=>p(!1)})}),u&&n.jsx("div",{className:"gp-modal-overlay",onClick:()=>h(!1),children:n.jsx(vd,{title:"Select group",options:Em,selected:A,query:w,onQueryChange:_,onPick:Y=>{O(Y),h(!1),_("")},onClose:()=>h(!1)})}),Q&&n.jsx(qp,{goat:Q,onClose:()=>P(null),onSave:async Y=>{await y(Y),P(null)}}),R&&n.jsx(Kl,{title:"Delete goat",message:`Delete ${R.name||"this goat"} (#${R.tagNumber||"—"})? This cannot be undone.`,confirmLabel:"Delete Goat",onConfirm:async()=>{await D(R.id),q(null)},onCancel:()=>q(null)})]})}function _m({goat:e,onOpen:t,menuOpen:r,onToggleMenu:s,onCloseMenu:i,onEdit:a,onRemove:l}){return n.jsxs("div",{className:"gp-goat-card",children:[n.jsx("input",{type:"checkbox",style:{width:22,height:22,flexShrink:0,cursor:"pointer",accentColor:"var(--primary)"},"aria-label":`Select ${e.name||"goat"}`,onClick:c=>c.stopPropagation()}),n.jsxs("div",{className:"gp-goat-click",onClick:t,role:"button",tabIndex:0,onKeyDown:c=>(c.key==="Enter"||c.key===" ")&&t(),children:[n.jsx("div",{className:"gp-goat-photo",children:e.photo?n.jsx("img",{src:e.photo,alt:e.name||"Goat"}):"🐐"}),n.jsxs("div",{style:{flex:1,minWidth:0},children:[n.jsxs("div",{className:"gp-goat-tag",children:["#",e.tagNumber||"—"]}),n.jsx("h3",{className:"gp-goat-name",children:e.name||"Unnamed Goat"}),n.jsx("div",{className:"gp-goat-breed",children:e.breed||"Breed not specified"}),n.jsx("div",{className:"gp-goat-stage",children:e.stage||"Kid"})]}),n.jsx("div",{className:"gp-goat-gender",children:e.gender||"—"})]}),n.jsxs("div",{style:{position:"relative",zIndex:r?100:2},children:[n.jsx("button",{type:"button",className:"gp-card-menu-btn","aria-label":"Goat options",onClick:c=>{c.stopPropagation(),s()},children:n.jsx(_n,{size:22})}),r&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"gp-card-menu-backdrop",onClick:i}),n.jsxs("div",{className:"gp-card-menu",onClick:c=>c.stopPropagation(),children:[n.jsxs("button",{type:"button",className:"gp-menu-item",onClick:a,children:[n.jsx(xr,{size:15}),"Edit"]}),n.jsxs("button",{type:"button",className:"gp-menu-item danger",onClick:l,children:[n.jsx(zn,{size:15}),"Delete Goat"]})]})]})]})]})}function Mm({goat:e,onBack:t,onSave:r,onDelete:s,onArchive:i,backendConnected:a,subscriptionBlocked:l=!1,subscriptionMessage:c=""}){const[o,d]=x.useState("details"),[v,g]=x.useState(!1),[f,j]=x.useState(null),N=Array.isArray(e.events)?e.events:[],A=[["Tag No",e.tagNumber||"-"],["Name",e.name||"-"],["D.O.B",e.dob||"-"],["Age",Kp(e.dob)],["Gender",e.gender||"-"],["Weight",e.weight!=null&&e.weight!==""?`${e.weight} kg`:"-"],["Stage",e.stage||"-"],["Breed",e.breed||"-"],["Group",e.group&&e.group!=="All Groups"?e.group:"-"],["Joined On",e.dateOfEntry||"-"],["Source",e.obtained||"-"],["Sire Tag",e.sireTagNumber||"-",!0],["Dam Tag",e.damTagNumber||"-",!0],["Notes",e.notes||"-"]],O=async w=>r({...e,...w}),m=async w=>O({events:[...N,w]});async function p(w){const _=Number(w);if(!Number.isFinite(_)||_<0)return;const M=e.weight!=null?Number(e.weight):null,E=M!=null?_-M:0,L=ji("Weight",`Weight recorded: ${_} kg`,{previousWeight:M,difference:E});try{await Gr("/weights",{method:"POST",body:JSON.stringify({goatId:e.id,goatName:e.name,goatTagNumber:e.tagNumber,weight:_,previousWeight:M,difference:E,gainLoss:E>0?"Gain":E<0?"Loss":"Stable",recordedAt:new Date().toISOString(),source:"Manual"})}),await O({weight:_,currentWeight:_,events:[...N,L]}),j(null)}catch(V){throw console.error("SAVE WEIGHT FAILED:",V),V}}async function u(w){await m(ji(w.type,w.title,{notes:w.notes,date:w.date})),j(null),d("events")}async function h(w){await O({stage:w,events:[...N,ji("Stage Change",`Stage changed to ${w}`)]}),j(null)}function S(){const w=window.open("","_blank","width=900,height=700");if(!w){alert("Please allow pop-ups to export the PDF.");return}const _=N.map(E=>`
            <tr>
              <td>${Mr(E.date||"-")}</td>
              <td>${Mr(E.type||"-")}</td>
              <td>${Mr(E.title||"-")}</td>
            </tr>
          `).join(""),M=[["Name",e.name],["Tag Number",e.tagNumber],["Breed",e.breed],["Gender",e.gender],["Stage",e.stage],["Date of Birth",e.dob],["Weight",e.weight!=null?`${e.weight} kg`:null],["Source",e.obtained],["Farm Entry",e.dateOfEntry],["Sire Tag",e.sireTagNumber],["Dam Tag",e.damTagNumber],["Notes",e.notes]].map(([E,L])=>`
          <tr>
            <td>${Mr(E)}</td>
            <td>${Mr(L||"-")}</td>
          </tr>
        `).join("");w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>
          Goat Report - ${e.name||"Goat"}
        </title>

        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #16233D;
          }

          h1 {
            color: #12336B;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }

          th, td {
            border: 1px solid #DCE6F9;
            padding: 10px;
            text-align: left;
          }

          th {
            background: #EEF4FF;
            color: #12336B;
          }
        </style>
      </head>

      <body>
        <h1>Goat Profile Report</h1>

        <p>
          #${e.tagNumber||"-"}
          ·
          ${e.name||"Unnamed Goat"}
        </p>

        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>

          ${M}
        </table>

        <h2>Events</h2>

        ${N.length?`
              <table>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
                ${_}
              </table>
            `:"<p>No events recorded.</p>"}
      </body>
      </html>
    `),w.document.close(),setTimeout(()=>{w.focus(),w.print()},400),g(!1)}const b=[{icon:xr,label:"Edit",onClick:()=>j("edit")},{icon:Fe,label:"Add Event",onClick:()=>j("event")},{icon:Le,label:"Change Stage",onClick:()=>j("stage")},{icon:we,label:"Add Weight",onClick:()=>j("weight")},{icon:cr,label:"Live Scale",onClick:()=>j("scale")},{icon:Yt,label:"View Report",onClick:()=>j("report")},{icon:pa,label:"Export PDF",onClick:S},{divider:!0},{icon:Gg,label:"Archive",onClick:()=>j("archive")},{icon:zn,label:"Delete Goat",danger:!0,onClick:()=>j("delete")}];return f==="scale"?n.jsx(Om,{goat:e,onBack:()=>j(null),onSave:async w=>{await p(w),d("events")}}):n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"gp-hero",children:[n.jsxs("div",{className:"gp-hero-top",children:[n.jsx("button",{type:"button",className:"gp-hero-btn",onClick:t,children:n.jsx(Oe,{size:22})}),n.jsxs("div",{style:{position:"relative",zIndex:100},children:[n.jsx("button",{type:"button",className:"gp-hero-btn",onClick:()=>g(w=>!w),children:n.jsx(_n,{size:20})}),v&&n.jsx("div",{className:"gp-detail-menu",children:b.map((w,_)=>w.divider?n.jsx("div",{className:"gp-menu-divider"},_):n.jsxs("button",{type:"button",className:`gp-menu-item${w.danger?" danger":""}`,disabled:l&&!["View Report","Export PDF"].includes(w.label),onClick:()=>{l&&!["View Report","Export PDF"].includes(w.label)||(g(!1),w.onClick())},children:[n.jsx(w.icon,{size:16}),w.label]},w.label))})]})]}),n.jsx("div",{className:"gp-hero-photo",children:e.photo?n.jsx("img",{src:e.photo,alt:e.name||"Goat"}):"🐐"}),n.jsx("div",{className:"gp-hero-name",children:e.name||"Unnamed Goat"}),n.jsxs("div",{className:"gp-hero-sub",children:["#",e.tagNumber||"—","·",e.breed||"Breed not specified"]})]}),n.jsxs("div",{className:"gp-tabs",children:[n.jsxs("button",{type:"button",className:`gp-tab${o==="details"?" active":""}`,onClick:()=>d("details"),children:[n.jsx(vi,{size:16}),"Details"]}),n.jsxs("button",{type:"button",className:`gp-tab${o==="events"?" active":""}`,onClick:()=>d("events"),children:[n.jsx(Fe,{size:16}),"Events",N.length>0&&n.jsx("span",{className:"gp-tab-badge",children:N.length})]})]}),o==="details"?n.jsxs("div",{className:"gp-body",children:[n.jsxs("div",{className:"gp-panel",children:[n.jsxs("div",{className:"gp-panel-header",children:[n.jsx("span",{children:"General Details"}),n.jsx("button",{type:"button",onClick:()=>j("edit"),children:n.jsx(xr,{size:16})})]}),n.jsx("div",{children:A.map(([w,_,M])=>n.jsxs("div",{className:"gp-row",children:[n.jsxs("span",{className:"gp-row-label",children:[w,":"]}),n.jsxs("div",{className:"gp-row-value",children:[n.jsx("span",{children:_}),M&&_!=="-"&&n.jsx(Me,{size:16,style:{color:"var(--primary)"}})]})]},w))})]}),n.jsxs("button",{type:"button",className:"gp-strip",onClick:()=>j("edit"),children:[n.jsx(Up,{size:19}),"Tap to upload a picture..."]}),n.jsxs("div",{className:"gp-panel",children:[n.jsxs("div",{className:"gp-panel-header",children:[n.jsx("span",{children:"Goat's Offspring"}),n.jsx(Xg,{size:17})]}),n.jsx("div",{className:"gp-empty-note",children:"No offspring linked yet! To link one, edit the offspring's record and enter this goat's tag number in the Father's tag no field."})]}),a&&n.jsxs("div",{style:{fontSize:11,color:"var(--success)",textAlign:"center",paddingBottom:20},children:[n.jsx(ua,{size:13,style:{verticalAlign:"middle",marginRight:5}}),"Saved to backend database"]})]}):n.jsxs("div",{className:"gp-body",children:[n.jsxs("button",{type:"button",className:"gp-strip",onClick:()=>j("event"),children:[n.jsx($t,{size:18}),"Add Event"]}),N.length===0?n.jsx("div",{className:"gp-panel",children:n.jsxs("div",{className:"gp-empty-note",children:[n.jsx(Fe,{size:32,style:{color:"var(--text-faint)",marginBottom:10}}),n.jsx("div",{children:"No events recorded yet for this goat."})]})}):N.slice().reverse().map(w=>n.jsxs("div",{className:"gp-event-card",children:[n.jsx("div",{className:"gp-event-icon",children:n.jsx(ot,{size:18})}),n.jsxs("div",{style:{flex:1},children:[n.jsx("strong",{style:{color:"var(--navy)",fontSize:14},children:w.title||w.type}),n.jsx("div",{style:{color:"var(--text-faint)",fontSize:11,marginTop:4},children:w.date||"-"})]}),n.jsx("span",{className:"gp-event-badge",children:w.type})]},w.id))]}),f==="edit"&&n.jsx(qp,{goat:e,onClose:()=>j(null),onSave:async w=>{await r(w),j(null)}}),f==="event"&&n.jsx(Pm,{onClose:()=>j(null),onSave:u}),f==="stage"&&n.jsx(Im,{goat:e,onClose:()=>j(null),onSave:h}),f==="weight"&&n.jsx(Rm,{currentWeight:e.weight,onClose:()=>j(null),onSave:p,onUseScale:()=>j("scale")}),f==="report"&&n.jsx(Dm,{goat:e,onClose:()=>j(null),onExport:S}),f==="archive"&&n.jsx(Kl,{title:"Archive Goat",message:`Move ${e.name||"this goat"} (#${e.tagNumber||"—"}) to archive?`,confirmLabel:"Archive",danger:!1,onConfirm:async()=>{try{await i(e.id),j(null)}catch(w){console.error("ARCHIVE GOAT FAILED:",w)}},onCancel:()=>j(null)}),f==="delete"&&n.jsx(Kl,{title:"Delete Goat",message:`Delete ${e.name||"this goat"} (#${e.tagNumber||"—"}) permanently? This cannot be undone.`,confirmLabel:"Delete Goat",onConfirm:async()=>{try{await s(e.id),j(null)}catch(w){console.error("DELETE GOAT FAILED:",w)}},onCancel:()=>j(null)})]})}function Pm({onClose:e,onSave:t}){const[r,s]=x.useState(yd[0]),[i,a]=x.useState(""),[l,c]=x.useState(Yp()),[o,d]=x.useState("");function v(g){g.preventDefault(),i.trim()&&t({type:r,title:i.trim(),date:l,notes:o.trim()})}return n.jsx(Nr,{title:"Add Event",onClose:e,footer:n.jsxs(n.Fragment,{children:[n.jsx("button",{type:"button",className:"gp-btn gp-btn-ghost",onClick:e,children:"Cancel"}),n.jsxs("button",{type:"submit",form:"gp-add-event",className:"gp-btn gp-btn-primary",children:[n.jsx(Ae,{size:16}),"Add Event"]})]}),children:n.jsxs("form",{id:"gp-add-event",onSubmit:v,children:[n.jsx(Nt,{label:"Event Type",children:n.jsx("select",{className:"gp-input",value:r,onChange:g=>s(g.target.value),children:yd.map(g=>n.jsx("option",{children:g},g))})}),n.jsx(Nt,{label:"Event Title",children:n.jsx("input",{className:"gp-input",value:i,onChange:g=>a(g.target.value),placeholder:"e.g. Vaccination completed"})}),n.jsx(Nt,{label:"Date",children:n.jsx("input",{className:"gp-input",type:"date",value:l,onChange:g=>c(g.target.value)})}),n.jsx(Nt,{label:"Notes",children:n.jsx("textarea",{className:"gp-input gp-textarea",value:o,onChange:g=>d(g.target.value),placeholder:"Optional notes..."})})]})})}function Im({goat:e,onClose:t,onSave:r}){const s=yr[e.gender||"Female"]||[],[i,a]=x.useState(e.stage||s[0]||"");return n.jsxs(Nr,{title:"Change Stage",onClose:t,footer:n.jsxs(n.Fragment,{children:[n.jsx("button",{type:"button",className:"gp-btn gp-btn-ghost",onClick:t,children:"Cancel"}),n.jsxs("button",{type:"button",className:"gp-btn gp-btn-primary",onClick:()=>r(i),children:[n.jsx(Le,{size:16}),"Change Stage"]})]}),children:[n.jsxs("p",{className:"gp-muted-line",children:["Current stage:"," ",n.jsx("strong",{children:e.stage||"-"})]}),n.jsx(Nt,{label:"New Life Stage",children:n.jsx("select",{className:"gp-input",value:i,onChange:l=>a(l.target.value),children:s.map(l=>n.jsx("option",{value:l,children:l},l))})})]})}function Rm({currentWeight:e,onClose:t,onSave:r,onUseScale:s}){const[i,a]=x.useState(e??"");function l(c){c.preventDefault(),!(i===""||Number(i)<0)&&r(i)}return n.jsxs(Nr,{title:"Add Weight",onClose:t,footer:n.jsxs(n.Fragment,{children:[n.jsx("button",{type:"button",className:"gp-btn gp-btn-ghost",onClick:t,children:"Cancel"}),n.jsxs("button",{type:"submit",form:"gp-add-weight",className:"gp-btn gp-btn-primary",children:[n.jsx(we,{size:16}),"Save Weight"]})]}),children:[n.jsxs("p",{className:"gp-muted-line",children:["Current weight:"," ",n.jsx("strong",{children:e!=null?`${e} kg`:"Not recorded"})]}),n.jsx("form",{id:"gp-add-weight",onSubmit:l,children:n.jsx(Nt,{label:"New Weight (kg)",children:n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("input",{autoFocus:!0,className:"gp-input",type:"number",min:"0",step:"0.1",value:i,onChange:c=>a(c.target.value),style:{flex:1}}),n.jsx("strong",{style:{color:"var(--text-muted)"},children:"kg"})]})})}),s&&n.jsxs("button",{type:"button",className:"gp-link-btn",onClick:s,children:[n.jsx(cr,{size:14}),"Use the live weighing scale instead"]})]})}function Dm({goat:e,onClose:t,onExport:r}){const s=e.events||[],i=[["Goat",e.name],["Tag Number",e.tagNumber],["Breed",e.breed],["Gender",e.gender],["Stage",e.stage],["Weight",e.weight!=null?`${e.weight} kg`:null],["Age",Kp(e.dob)],["Source",e.obtained]];return n.jsxs(Nr,{title:"Goat Report",onClose:t,size:"wide",footer:n.jsxs(n.Fragment,{children:[n.jsx("button",{type:"button",className:"gp-btn gp-btn-ghost",onClick:t,children:"Close"}),n.jsxs("button",{type:"button",className:"gp-btn gp-btn-primary",onClick:r,children:[n.jsx(pa,{size:16}),"Export PDF"]})]}),children:[n.jsx("div",{className:"gp-report-grid",children:i.map(([a,l])=>n.jsxs("div",{className:"gp-report-box",children:[n.jsx("div",{className:"label",children:a}),n.jsx("strong",{children:l||"-"})]},a))}),n.jsxs("div",{style:{marginTop:20},children:[n.jsxs("h4",{style:{margin:"0 0 10px",color:"var(--navy)"},children:["Events (",s.length,")"]}),s.length===0?n.jsx("div",{style:{padding:18,background:"var(--bg-soft)",borderRadius:10,color:"var(--text-faint)",fontSize:13},children:"No events recorded."}):s.slice().reverse().map(a=>n.jsxs("div",{style:{padding:"11px 12px",borderBottom:"1px solid var(--border-light)"},children:[n.jsx("strong",{style:{color:"var(--navy)"},children:a.title||a.type}),n.jsx("div",{style:{color:"var(--text-faint)",fontSize:11,marginTop:3},children:a.date||"-"})]},a.id))]})]})}const Lm=[{key:"tagNumber",label:"Tag Number"},{key:"name",label:"Name"},{key:"dob",label:"Birth Date",type:"date"},{key:"dateOfEntry",label:"Farm Entry",type:"date"},{key:"gender",label:"Gender",type:"select",options:["Female","Male"]},{key:"stage",label:"Stage",type:"select",options:e=>yr[e.gender]},{key:"weight",label:"Weight (kg)",type:"number"},{key:"breed",label:"Breed",type:"select",options:()=>Qp.filter(e=>e!=="All Breeds")},{key:"obtained",label:"Source",type:"select",options:["Born on farm","Purchased","Other"]},{key:"sireTagNumber",label:"Sire Tag Number"},{key:"damTagNumber",label:"Dam Tag Number"},{key:"notes",label:"Notes",type:"textarea",full:!0}];function qp({goat:e,onClose:t,onSave:r}){const[s,i]=x.useState({tagNumber:e.tagNumber||"",name:e.name||"",dob:e.dob||"",gender:e.gender||"Female",stage:e.stage||yr[e.gender||"Female"][0],weight:e.weight??"",breed:e.breed||"",dateOfEntry:e.dateOfEntry||"",obtained:e.obtained||"Born on farm",sireTagNumber:e.sireTagNumber||"",damTagNumber:e.damTagNumber||"",notes:e.notes||""});function a(c,o){i(d=>{const v={...d,[c]:o};return c==="gender"&&(v.stage=yr[o][0]),v})}function l(c){c.preventDefault(),r({...e,...s,weight:s.weight!==""?Number(s.weight):null})}return n.jsx(Nr,{title:"Edit Goat",onClose:t,footer:n.jsxs(n.Fragment,{children:[n.jsx("button",{type:"button",className:"gp-btn gp-btn-ghost",onClick:t,children:"Cancel"}),n.jsxs("button",{type:"submit",form:"gp-edit-goat",className:"gp-btn gp-btn-primary",children:[n.jsx(Ae,{size:16}),"Save Changes"]})]}),children:n.jsx("form",{id:"gp-edit-goat",onSubmit:l,className:"gp-modal-grid",children:Lm.map(c=>n.jsx(Nt,{label:c.label,full:c.full,children:Tm(c,s[c.key],o=>a(c.key,o),s)},c.key))})})}function $m({breed:e,onClose:t,onSave:r}){const[s,i]=x.useState(""),[a,l]=x.useState(""),[c,o]=x.useState("Female"),[d,v]=x.useState("Kid"),[g,f]=x.useState(""),[j,N]=x.useState(""),[A,O]=x.useState(""),[m,p]=x.useState("Born on farm"),[u,h]=x.useState(""),[S,b]=x.useState(""),[w,_]=x.useState(null),[M,E]=x.useState(""),[L,V]=x.useState(!1);function B(T){var R;const Q=(R=T.target.files)==null?void 0:R[0];if(!Q)return;if(!Q.type.startsWith("image/")){E("Please select a valid image file."),T.target.value="";return}if(Q.size>5*1024*1024){E("Photo size should be less than 5MB."),T.target.value="";return}const P=new FileReader;P.onload=()=>{_(P.result),E("")},P.onerror=()=>{E("Unable to read the selected photo."),T.target.value=""},P.readAsDataURL(Q)}function k(T){o(T),v(yr[T][0])}async function F(T){if(T.preventDefault(),!s.trim())return E("Please enter the tag number.");if(!a.trim())return E("Please enter the goat name.");if(!g)return E("Please select the birth date.");V(!0),E("");try{const Q=m==="Born on farm";await r({id:Xo(),tagNumber:s.trim(),name:a.trim(),breed:e,gender:c,stage:d,dob:g,dateOfEntry:j||"",weight:A?Number(A):null,obtained:m,group:"All Groups",sireTagNumber:Q?u.trim():"",damTagNumber:Q?S.trim():"",notes:"",photo:w,archived:!1,events:[ji("Registration","Goat profile created")],createdAt:new Date().toISOString()})}catch(Q){console.error(Q),E((Q==null?void 0:Q.message)||"Unable to create goat.")}finally{V(!1)}}return n.jsxs("div",{children:[n.jsx("div",{className:"gp-form-header",children:n.jsxs("div",{className:"gp-form-header-inner",children:[n.jsxs("button",{type:"button",className:"gp-form-back",onClick:t,children:[n.jsx(Oe,{size:20}),"Goats"]}),n.jsx("button",{type:"submit",form:"add-goat-form",className:"gp-form-save",disabled:L,children:L?"SAVING...":"SAVE & CONTINUE"})]})}),n.jsxs("form",{id:"add-goat-form",onSubmit:F,className:"gp-form",children:[n.jsxs("div",{className:"gp-form-title",children:[n.jsx("div",{className:"gp-eyebrow",children:"GOAT MANAGEMENT"}),n.jsx("h1",{children:"Add New Goat"}),n.jsx("p",{children:"Create a digital profile for your goat"})]}),n.jsxs("section",{className:"gp-photo-card",children:[n.jsx("div",{className:"gp-photo-drop",children:w?n.jsx("img",{src:w,alt:"Selected goat"}):n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"gp-photo-icon",children:"🐐"}),n.jsx("strong",{style:{color:"#123B78"},children:"Add Goat Photo"}),n.jsx("span",{style:{marginTop:5,color:"var(--text-faint)",fontSize:12},children:"Upload or drag & drop image"})]})}),n.jsxs("label",{className:"gp-photo-upload",children:[n.jsx(Up,{size:16}),w?"Change Photo":"Upload Photo",n.jsx("input",{type:"file",accept:"image/jpeg,image/png,image/webp",onChange:B,hidden:!0})]}),n.jsx("div",{style:{marginTop:7,color:"#9AACC9",fontSize:10},children:"JPG, PNG or WEBP · Max 5MB"})]}),n.jsxs("div",{className:"gp-two-col",children:[n.jsxs("section",{className:"gp-form-card",children:[n.jsxs("div",{className:"gp-section-title",children:[n.jsx("div",{className:"gp-section-icon",children:n.jsx(Vl,{size:17})}),n.jsxs("div",{children:[n.jsx("span",{className:"gp-section-num",children:"01"}),n.jsx("h2",{children:"Identity"})]})]}),n.jsxs("div",{className:"gp-visual-field",children:[n.jsx("div",{className:"gp-field",children:n.jsx("label",{children:"Tag Number"})}),n.jsxs("div",{className:"gp-visual-wrap",children:[n.jsx("span",{className:"gp-visual-prefix",children:"#"}),n.jsx("input",{className:"gp-visual-input",value:s,onChange:T=>i(T.target.value),placeholder:"214"})]})]}),n.jsx(Nt,{label:"Goat Name",children:n.jsx("input",{className:"gp-input",value:a,onChange:T=>l(T.target.value),placeholder:"e.g. Bella"})})]}),n.jsxs("section",{className:"gp-form-card",children:[n.jsxs("div",{className:"gp-section-title",children:[n.jsx("div",{className:"gp-section-icon",children:n.jsx(Gl,{size:17})}),n.jsxs("div",{children:[n.jsx("span",{className:"gp-section-num",children:"02"}),n.jsx("h2",{children:"Classification"})]})]}),n.jsx("div",{className:"gp-field",children:n.jsx("label",{children:"Breed"})}),n.jsxs("div",{className:"gp-readonly",children:[e,n.jsx(ln,{size:17})]}),n.jsx("div",{className:"gp-field",children:n.jsx("label",{children:"Gender"})}),n.jsx("div",{className:"gp-gender-grid",children:["Female","Male"].map(T=>n.jsxs("button",{type:"button",onClick:()=>k(T),className:`gp-gender-btn${c===T?" active":""}`,children:[n.jsx("span",{style:{fontSize:18},children:T==="Female"?"♀":"♂"}),T,c===T&&n.jsx(Ae,{size:14})]},T))})]})]}),n.jsxs("section",{className:"gp-form-card",children:[n.jsxs("div",{className:"gp-section-title",children:[n.jsx("div",{className:"gp-section-icon",children:n.jsx(Fe,{size:17})}),n.jsxs("div",{children:[n.jsx("span",{className:"gp-section-num",children:"02A"}),n.jsx("h2",{children:"Goat Timeline"})]})]}),n.jsxs("div",{className:"gp-three-col",children:[n.jsxs("div",{className:"gp-timeline-field",children:[n.jsx("div",{className:"gp-timeline-icon",children:n.jsx(Fe,{size:18})}),n.jsxs("div",{children:[n.jsx("label",{children:"Birth Date"}),n.jsx("input",{className:"gp-timeline-input",type:"date",value:g,onChange:T=>f(T.target.value)})]})]}),n.jsxs("div",{className:"gp-timeline-field",children:[n.jsx("div",{className:"gp-timeline-icon",children:n.jsx(Fe,{size:18})}),n.jsxs("div",{children:[n.jsx("label",{children:"Farm Entry"}),n.jsx("input",{className:"gp-timeline-input",type:"date",value:j,onChange:T=>N(T.target.value)})]})]}),n.jsxs("div",{className:"gp-timeline-field",children:[n.jsx("div",{className:"gp-timeline-icon",children:n.jsx(we,{size:18})}),n.jsxs("div",{children:[n.jsx("label",{children:"Current Weight"}),n.jsxs("div",{className:"gp-weight-wrap",children:[n.jsx("input",{className:"gp-timeline-input",type:"number",min:"0",step:"0.1",value:A,onChange:T=>O(T.target.value),placeholder:"32.5"}),n.jsx("span",{className:"gp-kg",children:"kg"})]})]})]})]})]}),n.jsx("section",{className:"gp-form-card",children:n.jsxs("div",{className:"gp-stage-row",children:[n.jsxs("div",{children:[n.jsx("label",{style:{display:"block",marginBottom:7,color:"var(--text-muted)",fontSize:12,fontWeight:700},children:"Life Stage"}),n.jsx("p",{className:"gp-hint",children:"Changes according to gender"})]}),n.jsx("select",{className:"gp-stage-select",value:d,onChange:T=>v(T.target.value),children:yr[c].map(T=>n.jsx("option",{value:T,children:T},T))})]})}),n.jsxs("section",{style:{marginTop:30},children:[n.jsxs("div",{className:"gp-origin-heading",children:[n.jsx("div",{className:"gp-origin-num",children:"03"}),n.jsxs("div",{children:[n.jsx("h2",{children:"How did this goat join your farm?"}),n.jsx("p",{className:"gp-hint",children:"Select one option"})]})]}),n.jsx("div",{className:"gp-origin-grid",children:zm.map(T=>n.jsxs("button",{type:"button",onClick:()=>p(T.value),className:`gp-origin-card${m===T.value?" active":""}`,children:[n.jsx("div",{className:"gp-origin-icon",children:T.icon}),n.jsxs("div",{children:[n.jsx("strong",{className:"gp-origin-title",children:T.title}),n.jsx("span",{className:"gp-origin-subtitle",children:T.subtitle})]}),m===T.value&&n.jsx("div",{className:"gp-origin-check",children:n.jsx(Ae,{size:13})})]},T.value))})]}),m==="Born on farm"&&n.jsxs("section",{className:"gp-form-card",children:[n.jsxs("div",{className:"gp-section-title",children:[n.jsx("div",{className:"gp-section-icon",children:n.jsx(Vl,{size:17})}),n.jsxs("div",{children:[n.jsx("span",{className:"gp-section-num",children:"04"}),n.jsx("h2",{children:"Parent Details"})]})]}),n.jsxs("div",{className:"gp-two-col",children:[n.jsx(Nt,{label:"Sire Tag Number",children:n.jsx("input",{className:"gp-input",value:u,onChange:T=>h(T.target.value),placeholder:"Father's tag #"})}),n.jsx(Nt,{label:"Dam Tag Number",children:n.jsx("input",{className:"gp-input",value:S,onChange:T=>b(T.target.value),placeholder:"Mother's tag #"})})]})]}),M&&n.jsxs("div",{className:"gp-error",children:["⚠️ ",M]}),n.jsxs("div",{className:"gp-form-actions",children:[n.jsx("button",{type:"button",className:"gp-btn gp-btn-ghost",onClick:t,disabled:L,children:"Cancel"}),n.jsxs("button",{type:"submit",className:"gp-btn gp-btn-primary",disabled:L,children:[L?"Saving...":"Create Goat Profile",!L&&n.jsx(Oe,{size:17,style:{transform:"rotate(180deg)"}})]})]})]})]})}function Om({goat:e,onBack:t,onSave:r}){const[s,i]=x.useState(e.weight!=null?Number(e.weight):0),[a,l]=x.useState(!1),[c,o]=x.useState(!1),[d,v]=x.useState("");x.useEffect(()=>{let j;return a&&(j=setInterval(()=>{i(N=>Number(N||0)+(Math.random()-.5)*.2)},700)),()=>clearInterval(j)},[a]);function g(){if(d==="")return;const j=Number(d);!Number.isFinite(j)||j<0||(i(j),v(""),l(!1))}async function f(){!Number.isFinite(Number(s))||Number(s)<=0||(o(!0),await r(Number(Number(s).toFixed(2))),setTimeout(()=>{o(!1)},1e3))}return n.jsxs("div",{className:"gp-app",children:[n.jsx("div",{className:"gp-scale-header",children:n.jsxs("div",{className:"gp-scale-header-inner",children:[n.jsxs("button",{type:"button",className:"gp-scale-back",onClick:t,children:[n.jsx(Oe,{size:17}),"Back"]}),n.jsxs("div",{children:[n.jsx("div",{className:"gp-scale-title",children:"Live Weighing"}),n.jsx("div",{className:"gp-scale-subtitle",children:"Goat weight measurement"})]}),n.jsxs("div",{className:"gp-scale-connected",children:[n.jsx(cr,{size:14}),"Scale Ready"]})]})}),n.jsxs("div",{className:"gp-scale-body",children:[n.jsxs("div",{className:"gp-scale-goat",children:[n.jsx("div",{className:"gp-scale-avatar",children:e.photo?n.jsx("img",{src:e.photo,alt:e.name||"Goat"}):"🐐"}),n.jsxs("div",{children:[n.jsx("div",{className:"gp-scale-goat-name",children:e.name||"Unnamed Goat"}),n.jsxs("div",{className:"gp-scale-goat-meta",children:["#",e.tagNumber||"—"," ","·"," ",e.breed||"Breed not specified"]})]}),n.jsxs("div",{className:"gp-scale-last",children:[n.jsx("label",{children:"LAST WEIGHT"}),n.jsx("strong",{children:e.weight!=null?`${e.weight} kg`:"—"})]})]}),n.jsxs("div",{className:"gp-scale-card",children:[n.jsxs("div",{className:"gp-scale-heading",children:[n.jsx(we,{size:17}),"CURRENT SCALE READING"]}),n.jsxs("div",{className:"gp-scale-lcd",children:[n.jsxs("div",{className:"gp-scale-number",children:[Number(s||0).toFixed(2),n.jsx("span",{children:"kg"})]}),n.jsxs("div",{className:`gp-scale-status ${a?"measuring":"stable"}`,children:[n.jsx("span",{children:"●"}),a?"Measuring...":"Stable"]})]}),n.jsxs("div",{className:"gp-scale-platform",children:[n.jsx("div",{className:"gp-platform-top",children:"🐐"}),n.jsxs("div",{className:"gp-platform-mid",children:[n.jsx("div",{}),n.jsx("div",{}),n.jsx("div",{})]}),n.jsxs("div",{className:"gp-platform-legs",children:[n.jsx("i",{}),n.jsx("i",{})]})]}),n.jsx("p",{className:"gp-scale-instruction",children:"Place the goat on the weighing platform and wait for a stable reading."}),n.jsx("div",{style:{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap",marginTop:18},children:n.jsxs("button",{type:"button",className:`gp-btn ${a?"gp-btn-danger":"gp-btn-primary"}`,onClick:()=>l(j=>!j),children:[n.jsx(we,{size:17}),a?"Stop Measuring":"Start Measuring"]})})]}),n.jsxs("div",{className:"gp-scale-save",children:[n.jsxs("div",{children:[n.jsx("h3",{children:"Save this weight"}),n.jsx("p",{children:"This reading will update the goat's current weight and weight history."})]}),n.jsx("button",{type:"button",className:"gp-btn gp-btn-primary",onClick:f,disabled:c||Number(s)<=0,children:c?n.jsxs(n.Fragment,{children:[n.jsx(ua,{size:16}),"Saved"]}):n.jsxs(n.Fragment,{children:[n.jsx(or,{size:16}),"Save Weight"]})})]}),n.jsxs("div",{className:"gp-scale-panel",children:[n.jsx("h3",{children:"Manual Reading"}),n.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[n.jsx("input",{className:"gp-input",type:"number",min:"0",step:"0.01",value:d,onChange:j=>v(j.target.value),placeholder:"Enter weight in kg"}),n.jsxs("button",{type:"button",className:"gp-btn gp-btn-primary",onClick:g,children:[n.jsx(Ae,{size:16}),"Use"]})]})]}),n.jsxs("div",{className:"gp-scale-panel",children:[n.jsx("h3",{children:"Hardware Connection"}),n.jsxs("div",{className:"gp-hw-flow",children:[n.jsxs("div",{className:"gp-hw-node",children:["Weighing Plate",n.jsx("small",{children:"Load Cells"})]}),n.jsx("div",{className:"gp-hw-arrow",children:"→"}),n.jsxs("div",{className:"gp-hw-node",children:["HX711",n.jsx("small",{children:"ADC Amplifier"})]}),n.jsx("div",{className:"gp-hw-arrow",children:"→"}),n.jsxs("div",{className:"gp-hw-node",children:["ESP32",n.jsx("small",{children:"Controller"})]}),n.jsx("div",{className:"gp-hw-arrow",children:"→"}),n.jsxs("div",{className:"gp-hw-node",children:["USB",n.jsx("small",{children:"Laptop"})]}),n.jsx("div",{className:"gp-hw-arrow",children:"→"}),n.jsxs("div",{className:"gp-hw-node",children:["Website",n.jsx("small",{children:"Goat Database"})]})]})]})]})]})}function Mr(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}const Re="#1d5fd6",bs="#123a8a",Kt="#eaf1fd",Bm="#f4f7fd",Ts="http://localhost:5000/api";function Xp({children:e}){return n.jsx("div",{style:{minHeight:"100vh",width:"100%",margin:0,background:Bm,fontFamily:"'Segoe UI', Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",color:"#17233c",boxSizing:"border-box"},children:e})}function Jp({title:e,subtitle:t,onBack:r,rightIcon:s,onRight:i}){return n.jsxs("header",{style:{width:"100%",background:`linear-gradient(135deg, ${bs}, ${Re})`,color:"#fff",position:"sticky",top:0,zIndex:100,boxShadow:"0 4px 18px rgba(18,58,138,0.18)"},children:[n.jsxs("div",{style:{width:"100%",minHeight:76,padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",boxSizing:"border-box"},children:[n.jsxs("div",{onClick:r,style:{display:"flex",alignItems:"center",gap:15,cursor:r?"pointer":"default"},children:[r&&n.jsx("div",{style:{width:40,height:40,borderRadius:10,display:"grid",placeItems:"center",background:"rgba(255,255,255,0.12)"},children:n.jsx(Oe,{size:22})}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:21,fontWeight:750,letterSpacing:.2},children:e}),t&&n.jsx("div",{style:{marginTop:3,fontSize:12,color:"rgba(255,255,255,0.78)"},children:t})]})]}),s&&n.jsx("button",{type:"button",onClick:i,style:{width:42,height:42,border:0,borderRadius:10,background:"#fff",display:"grid",placeItems:"center",cursor:"pointer",boxShadow:"0 4px 12px rgba(0,0,0,0.12)"},children:s})]}),n.jsx("div",{style:{height:4,background:"linear-gradient(90deg, #ffb648, #ff8a3d)"}})]})}function Pr({label:e,required:t,children:r}){return n.jsxs("div",{style:{marginBottom:20},children:[n.jsxs("div",{style:{fontSize:13,fontWeight:700,color:"#42516b",marginBottom:8},children:[e,t&&n.jsxs("span",{style:{color:"#d63b3b"},children:[" ","*"]})]}),n.jsx("div",{style:{background:"#fff",border:"1px solid #dce4f1",borderRadius:12,minHeight:50,boxSizing:"border-box",boxShadow:"0 1px 3px rgba(20,30,60,0.04)"},children:r})]})}function Wm(e){if(!e||typeof e!="object")return null;const t=e.id??e._id??e.goatId??e.tagNumber??e.tag??null,r=e.name??e.goatName??e.goat_name??"",s=e.breed??e.breedName??e.breed_name??"",i=e.tagNumber??e.tag??e.tagNo??e.tag_number??"";return!t&&!r&&!i?null:{...e,id:t||`goat-${Date.now()}-${Math.random()}`,name:r||`Goat #${i||"Unknown"}`,breed:s||"Unknown breed",tagNumber:i||""}}async function Ua(){try{const e=await fetch(`${Ts}/goats`,{credentials:"include"});if(!e.ok){if(e.status===401)return[];throw new Error(`Failed to fetch goats. Server returned ${e.status}`)}const t=await e.json();return(Array.isArray(t)?t:Array.isArray(t==null?void 0:t.goats)?t.goats:Array.isArray(t==null?void 0:t.data)?t.data:[]).map(Wm).filter(Boolean)}catch(e){return console.error("Goats load error:",e),[]}}function Zp(e){return!e||typeof e!="object"?null:{...e,id:e.id??e._id??`milk-${Date.now()}-${Math.random()}`,goatId:e.goatId??e.animalId??e.goat_id??"",goatName:e.goatName??e.animal??e.name??"",goatTagNumber:e.goatTagNumber??e.tagNumber??e.tag??"",date:e.date??e.recordDate??"",session:e.session??e.milkingSession??"Morning",quantity:Number(e.quantity??e.milkQuantity??e.value??0),unit:e.unit??"litre",notes:e.notes??""}}async function Gm(){const e=await fetch(`${Ts}/milk-records`,{credentials:"include"});if(!e.ok)throw new Error(`Failed to fetch milk records. Server returned ${e.status}`);const t=await e.json();return(Array.isArray(t)?t:Array.isArray(t.records)?t.records:Array.isArray(t.data)?t.data:[]).map(Zp).filter(Boolean)}async function Um(e){const t=await fetch(`${Ts}/milk-records`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok){const r=await t.json().catch(()=>({}));throw new Error(r.message||`Failed to save milk record. Server returned ${t.status}`)}return t.json()}async function Hm(e,t){const r=await fetch(`${Ts}/milk-records/${e}`,{method:"PUT",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!r.ok){const s=await r.json().catch(()=>({}));throw new Error(s.message||`Failed to update milk record. Server returned ${r.status}`)}return r.json()}async function Vm(e){const t=await fetch(`${Ts}/milk-records/${e}`,{method:"DELETE",credentials:"include"});if(!t.ok){const r=await t.json().catch(()=>({}));throw new Error(r.message||`Failed to delete milk record. Server returned ${t.status}`)}return t.json()}function Qm(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}function Ym({onBack:e,onSave:t,goats:r,record:s}){const[i,a]=x.useState(()=>s&&(r.find(b=>String(b.id)===String(s.goatId))||r.find(b=>String(b.name).toLowerCase()===String(s.goatName).toLowerCase()))||null),[l,c]=x.useState(""),[o,d]=x.useState((s==null?void 0:s.date)||new Date().toISOString().split("T")[0]),[v,g]=x.useState((s==null?void 0:s.session)||"Morning"),[f,j]=x.useState((s==null?void 0:s.quantity)??""),[N,A]=x.useState((s==null?void 0:s.unit)||"litre"),[O,m]=x.useState((s==null?void 0:s.notes)||""),[p,u]=x.useState(""),h=x.useMemo(()=>{const b=l.trim().toLowerCase();return b?r.filter(w=>{const _=String(w.name||"").toLowerCase(),M=String(w.tagNumber||"").toLowerCase();return _.includes(b)||M.includes(b)}):[]},[r,l]),S=()=>{if(!i){u("Please search and select a goat.");return}if(!o){u("Please select the record date.");return}if(!f){u("Please enter the milk quantity.");return}const b=parseFloat(f);if(Number.isNaN(b)||b<=0){u("Please enter a valid milk quantity.");return}t({id:(s==null?void 0:s.id)??void 0,goatId:i.id,goatName:i.name,goatTagNumber:i.tagNumber||"",breed:i.breed||"",date:o,session:v,quantity:b,unit:N,notes:O})};return n.jsxs(Xp,{children:[n.jsx(Jp,{title:s?"Edit Milk Record":"New Milk Record",subtitle:s?"Update milk production details":"Add a milk production record",onBack:e,rightIcon:n.jsx(Ae,{size:20,color:bs,strokeWidth:3}),onRight:S}),n.jsxs("main",{style:{width:"100%",maxWidth:1180,margin:"0 auto",padding:"34px 40px 70px",boxSizing:"border-box"},children:[n.jsx("div",{style:{marginBottom:28},children:n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsx("div",{style:{width:48,height:48,borderRadius:13,background:Kt,display:"grid",placeItems:"center"},children:n.jsx(vs,{size:25,color:Re})}),n.jsxs("div",{children:[n.jsx("h1",{style:{margin:0,fontSize:25,color:"#132750"},children:"Milk Production"}),n.jsx("p",{style:{margin:"4px 0 0",color:"#71809b",fontSize:14},children:"Record the milk collected from a goat."})]})]})}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(0, 1.3fr) minmax(320px, 0.7fr)",gap:24,alignItems:"start"},children:[n.jsxs("section",{style:{background:"#fff",borderRadius:18,border:"1px solid #e1e8f4",padding:26,boxShadow:"0 5px 18px rgba(20,30,60,0.05)"},children:[n.jsx("div",{style:{fontSize:17,fontWeight:750,color:"#162b56",marginBottom:22},children:"Record Details"}),n.jsx(Pr,{label:"Select Goat",required:!0,children:n.jsxs("div",{style:{padding:12},children:[!i&&n.jsxs("div",{style:{height:46,display:"flex",alignItems:"center",gap:10,border:"1px solid #d7e0ee",borderRadius:10,padding:"0 12px",boxSizing:"border-box"},children:[n.jsx(Me,{size:18,color:"#71809b"}),n.jsx("input",{value:l,onChange:b=>{c(b.target.value),u("")},placeholder:"Search by goat name or tag number...",style:{flex:1,border:0,outline:0,fontSize:14,background:"transparent"}}),l&&n.jsx("button",{type:"button",onClick:()=>c(""),style:{border:0,background:"transparent",cursor:"pointer",color:"#71809b"},children:n.jsx(le,{size:16})})]}),i&&n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:12,borderRadius:12,background:Kt,border:"1px solid #c4d7f7"},children:[n.jsx("div",{style:{width:44,height:44,borderRadius:11,background:"#fff",display:"grid",placeItems:"center",fontSize:22},children:"🐐"}),n.jsxs("div",{style:{flex:1},children:[n.jsx("div",{style:{fontWeight:750,color:"#152a55"},children:i.name}),n.jsxs("div",{style:{marginTop:3,fontSize:12,color:"#66758e"},children:[i.breed||"Unknown breed",i.tagNumber?` · Tag #${i.tagNumber}`:""]})]}),n.jsx("button",{type:"button",onClick:()=>{a(null),c("")},style:{width:32,height:32,border:0,borderRadius:8,background:"#fff",color:"#66758e",display:"grid",placeItems:"center",cursor:"pointer"},children:n.jsx(le,{size:16})})]}),!i&&l.trim()&&n.jsx("div",{style:{marginTop:10,maxHeight:230,overflowY:"auto"},children:h.length===0?n.jsxs("div",{style:{minHeight:130,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",color:"#71809b",border:"1px dashed #cfd9e8",borderRadius:12},children:[n.jsx(An,{size:30,color:"#9aa8bd"}),n.jsx("strong",{style:{marginTop:7,color:"#42516b"},children:"No goats found"}),n.jsx("span",{style:{marginTop:3,fontSize:12},children:"Search using the goat name or tag number."})]}):h.map(b=>n.jsxs("button",{type:"button",onClick:()=>{a(b),c(""),u("")},style:{width:"100%",border:"1px solid #dce4f1",background:"#fff",borderRadius:11,padding:11,display:"flex",alignItems:"center",gap:11,marginBottom:7,cursor:"pointer",textAlign:"left"},children:[n.jsx("div",{style:{width:42,height:42,borderRadius:10,background:Kt,display:"grid",placeItems:"center",fontSize:20},children:"🐐"}),n.jsxs("div",{style:{flex:1},children:[n.jsx("div",{style:{fontWeight:750,color:"#152a55"},children:b.name}),n.jsxs("div",{style:{fontSize:12,color:"#71809b",marginTop:3},children:[b.breed,b.tagNumber?` · Tag #${b.tagNumber}`:""]})]}),n.jsx(Yo,{size:18,color:"#94a3b8"})]},b.id))}),!i&&!l.trim()&&n.jsx("div",{style:{padding:"12px 2px 2px",fontSize:12,color:"#7c8aa1"},children:"Start typing a goat name or tag number to search."})]})}),n.jsx(Pr,{label:"Record Date",required:!0,children:n.jsxs("div",{style:{height:50,padding:"0 14px",display:"flex",alignItems:"center",gap:10},children:[n.jsx(Fe,{size:18,color:Re}),n.jsx("input",{type:"date",value:o,onChange:b=>d(b.target.value),style:{width:"100%",border:0,outline:0,fontSize:14,color:"#1e293b",background:"transparent"}})]})}),n.jsx(Pr,{label:"Milking Session",required:!0,children:n.jsxs("div",{style:{position:"relative"},children:[n.jsx(As,{size:18,color:Re,style:{position:"absolute",left:14,top:16,pointerEvents:"none"}}),n.jsxs("select",{value:v,onChange:b=>g(b.target.value),style:{width:"100%",height:50,border:0,outline:0,padding:"0 40px 0 44px",background:"transparent",fontSize:14,color:"#1e293b",appearance:"none",cursor:"pointer"},children:[n.jsx("option",{children:"Morning"}),n.jsx("option",{children:"Afternoon"}),n.jsx("option",{children:"Evening"})]}),n.jsx(ln,{size:17,color:"#71809b",style:{position:"absolute",right:14,top:16,pointerEvents:"none"}})]})}),n.jsx(Pr,{label:"Milk Quantity",required:!0,children:n.jsxs("div",{style:{display:"flex",alignItems:"center",minHeight:50},children:[n.jsx("div",{style:{paddingLeft:14},children:n.jsx(Hp,{size:18,color:Re})}),n.jsx("input",{type:"number",min:"0",step:"0.01",value:f,onChange:b=>j(b.target.value),placeholder:"Enter milk quantity",style:{flex:1,minWidth:0,border:0,outline:0,padding:"0 12px",fontSize:15,background:"transparent"}}),n.jsxs("select",{value:N,onChange:b=>A(b.target.value),style:{border:0,outline:0,background:"transparent",color:Re,fontWeight:750,fontSize:14,padding:"0 14px",cursor:"pointer"},children:[n.jsx("option",{value:"litre",children:"Litre"}),n.jsx("option",{value:"ml",children:"mL"})]})]})}),n.jsx(Pr,{label:"Notes",children:n.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:10,padding:14},children:[n.jsx(Yt,{size:18,color:"#71809b",style:{marginTop:2}}),n.jsx("textarea",{value:O,onChange:b=>m(b.target.value),placeholder:"Add notes about milk production...",rows:5,style:{width:"100%",border:0,outline:0,resize:"vertical",fontFamily:"inherit",fontSize:14,background:"transparent",boxSizing:"border-box"}})]})}),p&&n.jsx("div",{style:{padding:"11px 13px",borderRadius:10,background:"#fff1f1",border:"1px solid #ffd1d1",color:"#c0392b",fontSize:13,fontWeight:650,marginBottom:16},children:p}),n.jsx("button",{type:"button",onClick:S,style:{width:"100%",height:52,border:0,borderRadius:12,background:`linear-gradient(135deg, ${Re}, ${bs})`,color:"#fff",fontSize:15,fontWeight:750,cursor:"pointer",boxShadow:`0 7px 18px ${Re}40`},children:s?"Update Milk Record":"Save Milk Record"})]}),n.jsxs("aside",{style:{display:"flex",flexDirection:"column",gap:16},children:[n.jsxs("div",{style:{background:"linear-gradient(145deg, #123a8a, #1d5fd6)",borderRadius:18,padding:24,color:"#fff",minHeight:180,boxSizing:"border-box",boxShadow:"0 8px 25px rgba(29,95,214,0.20)"},children:[n.jsx("div",{style:{width:48,height:48,borderRadius:13,background:"rgba(255,255,255,0.14)",display:"grid",placeItems:"center",marginBottom:18},children:n.jsx(vs,{size:25})}),n.jsx("div",{style:{fontSize:19,fontWeight:750},children:"Milk Production"}),n.jsx("div",{style:{fontSize:13,lineHeight:1.6,color:"rgba(255,255,255,0.78)",marginTop:7},children:"Record daily milk production for each goat and track morning, afternoon and evening collections."})]}),n.jsxs("div",{style:{background:"#fff",border:"1px solid #e1e8f4",borderRadius:18,padding:22},children:[n.jsx("div",{style:{fontWeight:750,color:"#1b315d",marginBottom:15},children:"Recording Tips"}),["Select the correct goat.","Enter the actual milk quantity.","Choose the correct milking session.","Add notes when necessary."].map((b,w)=>n.jsxs("div",{style:{display:"flex",gap:10,marginBottom:w===3?0:12,fontSize:13,color:"#687791"},children:[n.jsx("div",{style:{width:22,height:22,flexShrink:0,borderRadius:"50%",background:Kt,color:Re,display:"grid",placeItems:"center",fontSize:11,fontWeight:750},children:w+1}),n.jsx("span",{children:b})]},b))]})]})]})]})]})}function Km({records:e,onAdd:t,onOpen:r,onDelete:s,onBack:i}){const[a,l]=x.useState(null),c=e.reduce((o,d)=>o+(Number(d.quantity)||0),0);return n.jsxs(Xp,{children:[n.jsx(Jp,{title:"Milk Records",subtitle:"Milk production history",onBack:i}),n.jsxs("main",{style:{width:"100%",maxWidth:1400,margin:"0 auto",padding:"30px 40px 90px",boxSizing:"border-box"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,marginBottom:26},children:[n.jsxs("div",{children:[n.jsx("h1",{style:{margin:0,fontSize:28,color:"#142b58"},children:"Milk Production Records"}),n.jsx("p",{style:{margin:"7px 0 0",fontSize:14,color:"#74829b"},children:"Manage and review milk collection records."})]}),n.jsxs("button",{type:"button",onClick:t,style:{border:0,borderRadius:11,background:`linear-gradient(135deg, ${Re}, ${bs})`,color:"#fff",padding:"13px 19px",display:"flex",alignItems:"center",gap:8,fontWeight:750,cursor:"pointer",boxShadow:`0 6px 16px ${Re}35`,whiteSpace:"nowrap"},children:[n.jsx($t,{size:18}),"Add Milk Record"]})]}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, minmax(0, 1fr))",gap:18,marginBottom:24},children:[n.jsx(Ha,{icon:n.jsx(vs,{size:22}),title:"Total Records",value:e.length,suffix:""}),n.jsx(Ha,{icon:n.jsx(Hp,{size:22}),title:"Total Recorded Milk",value:c?c.toFixed(2):"0.00",suffix:" L"}),n.jsx(Ha,{icon:n.jsx(js,{size:22}),title:"Production Entries",value:e.length,suffix:""})]}),n.jsxs("section",{style:{background:"#fff",borderRadius:18,border:"1px solid #e1e8f4",boxShadow:"0 5px 18px rgba(20,30,60,0.05)",overflow:"visible"},children:[n.jsxs("div",{style:{padding:"19px 22px",borderBottom:"1px solid #edf1f7",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[n.jsx(vs,{size:19,color:Re}),n.jsx("span",{style:{fontWeight:750,color:"#1b315d"},children:"Milk Records"})]}),n.jsxs("span",{style:{fontSize:12,color:"#8492ac"},children:[e.length," ","record",e.length!==1?"s":""]})]}),e.length===0?n.jsx(Xm,{onAdd:t}):n.jsx("div",{style:{width:"100%",overflowX:"auto"},children:n.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",minWidth:850},children:[n.jsx("thead",{children:n.jsxs("tr",{style:{background:"#f8faff"},children:[n.jsx(Dn,{children:"Goat"}),n.jsx(Dn,{children:"Date"}),n.jsx(Dn,{children:"Session"}),n.jsx(Dn,{children:"Milk Quantity"}),n.jsx(Dn,{children:"Notes"}),n.jsx(Dn,{align:"right",children:"Action"})]})}),n.jsx("tbody",{children:e.slice().sort((o,d)=>new Date(d.date)-new Date(o.date)).map(o=>n.jsxs("tr",{onClick:()=>r(o),style:{borderTop:"1px solid #edf1f7",cursor:"pointer"},children:[n.jsx("td",{style:{padding:"16px 22px"},children:n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:11},children:[n.jsx("div",{style:{width:42,height:42,borderRadius:11,background:Kt,display:"grid",placeItems:"center",fontSize:19},children:"🐐"}),n.jsxs("div",{children:[n.jsx("div",{style:{fontWeight:750,color:"#172c56"},children:o.goatName||"Unknown goat"}),n.jsx("div",{style:{fontSize:12,color:"#7b89a0",marginTop:3},children:o.goatTagNumber?`Tag #${o.goatTagNumber}`:o.breed||""})]})]})}),n.jsx("td",{style:{padding:"16px 22px",color:"#53627b",fontSize:13},children:Qm(o.date)}),n.jsx("td",{style:{padding:"16px 22px"},children:n.jsx(qm,{session:o.session})}),n.jsxs("td",{style:{padding:"16px 22px"},children:[n.jsx("span",{style:{fontSize:16,fontWeight:750,color:Re},children:Number(o.quantity).toFixed(2)}),n.jsx("span",{style:{marginLeft:5,fontSize:12,color:"#7b89a0",fontWeight:650},children:o.unit==="ml"?"mL":"L"})]}),n.jsx("td",{style:{padding:"16px 22px",maxWidth:260,color:"#71809b",fontSize:13},children:o.notes||"—"}),n.jsx("td",{style:{padding:"16px 22px",textAlign:"right",position:"relative"},onClick:d=>d.stopPropagation(),children:n.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",position:"relative"},children:[n.jsx("button",{type:"button",onClick:()=>l(a===o.id?null:o.id),style:{width:34,height:34,border:0,borderRadius:8,background:"#f3f6fb",display:"grid",placeItems:"center",cursor:"pointer",color:"#64748b"},children:n.jsx(_n,{size:18})}),a===o.id&&n.jsxs("div",{style:{position:"absolute",right:0,top:40,width:145,background:"#fff",border:"1px solid #e1e8f4",borderRadius:10,boxShadow:"0 10px 28px rgba(20,30,60,0.15)",zIndex:200,overflow:"hidden"},children:[n.jsxs("button",{type:"button",onClick:()=>{r(o),l(null)},style:{width:"100%",border:0,background:"#fff",padding:"11px 13px",display:"flex",alignItems:"center",gap:9,cursor:"pointer",fontSize:13,color:"#334155"},children:[n.jsx(xr,{size:15}),"Edit"]}),n.jsxs("button",{type:"button",onClick:()=>{s(o.id),l(null)},style:{width:"100%",border:0,background:"#fff",padding:"11px 13px",display:"flex",alignItems:"center",gap:9,cursor:"pointer",fontSize:13,color:"#c0392b"},children:[n.jsx(zn,{size:15}),"Delete"]})]})]})})]},o.id))})]})})]})]})]})}function Ha({icon:e,title:t,value:r,suffix:s}){return n.jsxs("div",{style:{background:"#fff",border:"1px solid #e1e8f4",borderRadius:16,padding:20,display:"flex",alignItems:"center",gap:14,boxShadow:"0 3px 12px rgba(20,30,60,0.04)"},children:[n.jsx("div",{style:{width:46,height:46,borderRadius:12,background:Kt,color:Re,display:"grid",placeItems:"center",flexShrink:0},children:e}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:12,color:"#7a89a1",fontWeight:650},children:t}),n.jsxs("div",{style:{marginTop:3,fontSize:22,fontWeight:800,color:"#152b57"},children:[r,n.jsx("span",{style:{fontSize:13,color:"#74829b"},children:s})]})]})]})}function Dn({children:e,align:t="left"}){return n.jsx("th",{style:{padding:"13px 22px",textAlign:t,fontSize:11,textTransform:"uppercase",letterSpacing:.5,color:"#7a89a1",fontWeight:750,whiteSpace:"nowrap"},children:e})}function qm({session:e}){return n.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 10px",borderRadius:20,background:Kt,color:bs,fontSize:12,fontWeight:700},children:[n.jsx(As,{size:13}),e]})}function Xm({onAdd:e}){return n.jsxs("div",{style:{padding:"75px 20px",textAlign:"center"},children:[n.jsx("div",{style:{width:68,height:68,borderRadius:18,background:Kt,display:"grid",placeItems:"center",margin:"0 auto 15px"},children:n.jsx(vs,{size:32,color:Re})}),n.jsx("div",{style:{fontSize:17,fontWeight:750,color:"#25385d"},children:"No milk records yet"}),n.jsx("div",{style:{marginTop:6,fontSize:13,color:"#7a89a1"},children:"Add your first milk production record."}),n.jsxs("button",{type:"button",onClick:e,style:{marginTop:18,border:0,borderRadius:10,background:Re,color:"#fff",padding:"11px 17px",fontWeight:750,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:7},children:[n.jsx($t,{size:17}),"Add Milk Record"]})]})}function Jm({onBack:e}){const[t,r]=x.useState("list"),[s,i]=x.useState(null),[a,l]=x.useState(()=>Ua()),[c,o]=x.useState([]),[d,v]=x.useState(!0);x.useEffect(()=>{(async()=>{try{v(!0);const u=await Ua();l(u);const h=await Gm();o(h)}catch(u){console.error("Milk records loading error:",u),o([]),l([]),window.alert("Unable to load milk records from backend. Please make sure the backend server is running.")}finally{v(!1)}})();const p=async()=>{const u=await Ua();l(u)};return window.addEventListener("tenant-data-updated",p),window.addEventListener("storage",p),()=>{window.removeEventListener("tenant-data-updated",p),window.removeEventListener("storage",p)}},[]);const g=async m=>{try{v(!0);const p=c.some(S=>String(S.id)===String(m.id));let u;p?u=await Hm(m.id,m):u=await Um(m);const h=Zp((u==null?void 0:u.record)??(u==null?void 0:u.data)??u);if(!h)throw new Error("Backend returned an invalid milk record.");o(p?S=>S.map(b=>String(b.id)===String(m.id)?h:b):S=>[h,...S]),i(null),r("list")}catch(p){console.error("Milk record save error:",p),window.alert(p.message||"Failed to save milk record.")}finally{v(!1)}},f=async m=>{if(window.confirm("Are you sure you want to delete this milk record?"))try{v(!0),await Vm(m),o(u=>u.filter(h=>String(h.id)!==String(m)))}catch(u){console.error("Milk record delete error:",u),window.alert(u.message||"Failed to delete milk record.")}finally{v(!1)}},j=m=>{i(m),r("form")},N=()=>{i(null),r("form")},A=()=>{i(null),r("list")},O=()=>{typeof e=="function"&&e()};return t==="form"?n.jsx(Ym,{onBack:A,onSave:g,goats:a,record:s}):n.jsx(Km,{records:c,onAdd:N,onOpen:j,onDelete:f,onBack:O})}function Zm({title:e,options:t,selected:r,query:s,onQueryChange:i,onPick:a,onClose:l}){const c=t.filter(o=>o.toLowerCase().includes(s.trim().toLowerCase()));return n.jsx("div",{onClick:l,style:{position:"fixed",inset:0,background:"rgba(15,23,42,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:50},children:n.jsxs("div",{onClick:o=>o.stopPropagation(),style:{background:"#fff",width:"100%",maxWidth:420,maxHeight:"80vh",borderRadius:"20px 20px 0 0",display:"flex",flexDirection:"column",boxShadow:"0 -8px 40px rgba(15,23,42,0.18)",overflow:"hidden"},children:[n.jsx("div",{style:{width:36,height:4,borderRadius:2,background:"#E1E7EF",margin:"10px auto 4px"}}),n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px 12px"},children:[n.jsx("div",{style:{fontSize:17,fontWeight:700,color:"#1A2332"},children:e}),n.jsx("button",{onClick:l,"aria-label":"Close",style:{background:"#EEF2F6",border:"none",borderRadius:999,width:30,height:30,display:"grid",placeItems:"center",cursor:"pointer",color:"#64748B"},children:n.jsx(le,{size:16})})]}),n.jsx("div",{style:{padding:"0 20px 14px"},children:n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,background:"#EEF2F6",borderRadius:12,padding:"10px 14px"},children:[n.jsx(Me,{size:17,color:"#94A3B8"}),n.jsx("input",{autoFocus:!0,value:s,onChange:o=>i(o.target.value),placeholder:"Search...",style:{flex:1,border:"none",outline:"none",fontSize:15,color:"#1A2332",background:"transparent"}})]})}),n.jsxs("div",{style:{overflowY:"auto",padding:"0 10px 10px"},children:[c.length===0&&n.jsxs("div",{style:{padding:"28px 12px",textAlign:"center",color:"#94A3B8",fontSize:14},children:['Nothing matches "',s,'".']}),c.map(o=>{const d=o===r;return n.jsxs("div",{onClick:()=>a(o),style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 12px",borderRadius:10,cursor:"pointer",fontSize:15,fontWeight:d?700:400,color:d?"#1E3A5F":"#1A2332",background:d?"#E8EEF5":"transparent"},children:[o,d&&n.jsx(Ae,{size:17,color:"#1E3A5F"})]},o)})]}),n.jsx("div",{style:{padding:16,borderTop:"1px solid #E1E7EF"},children:n.jsx("button",{onClick:l,style:{width:"100%",background:"#1E3A5F",color:"#fff",border:"none",borderRadius:12,padding:"13px 0",fontSize:15,fontWeight:700,cursor:"pointer"},children:"Done"})})]})})}const ex="http://localhost:5000/api",eh=["All Event Types","Vaccination","Health Check","Mating","Birth","Purchase","Sale","Weight Check","Milking","Other"];async function Ir(e,t={}){const r=await fetch(`${ex}${e}`,{...t,credentials:"include",headers:{"Content-Type":"application/json",...t.headers||{}}});let s=null;try{s=await r.json()}catch{s=null}if(!r.ok)throw new Error((s==null?void 0:s.message)||(s==null?void 0:s.error)||`Request failed with status ${r.status}`);return s}function jd(e,t=[]){var r;if(Array.isArray(e))return e;if(Array.isArray(e==null?void 0:e.data))return e.data;for(const s of t){if(Array.isArray(e==null?void 0:e[s]))return e[s];if(Array.isArray((r=e==null?void 0:e.data)==null?void 0:r[s]))return e.data[s]}return[]}function bd(e){if(!e||typeof e!="object")return null;const t=e.id??e._id??e.tagNumber??e.tag??null,r=e.name??e.goatName??e.goat_name??"",s=e.breed??e.breedName??e.breed_name??"",i=e.tagNumber??e.tag??e.tagNo??e.tag_number??"";return!t&&!r&&!i?null:{...e,id:String(t||`goat-${Date.now()}-${Math.random()}`),name:r||`Goat #${i||"Unknown"}`,breed:s||"Unknown breed",tagNumber:i||""}}function Va(e){return!e||typeof e!="object"?null:{...e,id:e.id??e._id??`event-${Date.now()}-${Math.random()}`,mode:e.mode||"individual",title:e.title||"",type:e.type||"Other",eventDate:e.eventDate||e.date||"",goatId:e.goatId??e.goatID??null,goatName:e.goatName||"",goatTagNumber:e.goatTagNumber||e.tagNumber||"",goatIds:Array.isArray(e.goatIds)?e.goatIds:[],goats:Array.isArray(e.goats)?e.goats:[],goatCount:e.goatCount??(Array.isArray(e.goats)?e.goats.length:0),notes:e.notes||""}}function tx({tenant:e,onBack:t,onAddRecord:r,onUpdateRecord:s,onDeleteRecord:i}){const[a,l]=x.useState([]),[c,o]=x.useState([]),[d,v]=x.useState(!0),[g,f]=x.useState(""),[j,N]=x.useState("All Event Types"),[A,O]=x.useState(!1),[m,p]=x.useState(""),[u,h]=x.useState(""),[S,b]=x.useState(!1),[w,_]=x.useState(null),[M,E]=x.useState(null),[L,V]=x.useState("individual");async function B(){try{const $=await Ir("/goats"),y=jd($,["goats"]).map(bd).filter(Boolean);return l(y),y}catch($){throw console.error("Failed to load goats:",$),l([]),$}}async function k(){try{const $=await Ir("/events"),y=jd($,["events"]).map(Va).filter(Boolean);return o(y),y}catch($){throw console.error("Failed to load events:",$),o([]),$}}async function F(){v(!0),f("");try{await Promise.all([B(),k()])}catch($){f($.message||"Failed to load data from backend.")}finally{v(!1)}}x.useEffect(()=>{F()},[e]);const T=x.useMemo(()=>a.map(bd).filter(Boolean).filter($=>$.id||$.name||$.tagNumber),[a]),Q=x.useMemo(()=>{const $=u.trim().toLowerCase();return[...c].filter(y=>{const ee=(y.mode||"individual")===L,Y=j==="All Event Types"||y.type===j,H=Array.isArray(y.goats)?y.goats.map(Z=>Z==null?void 0:Z.name).filter(Boolean).join(" "):"",J=[y.title,y.type,y.goatName,y.goatTagNumber,y.notes,y.eventDate,H].filter(Boolean).join(" ").toLowerCase();return ee&&Y&&J.includes($)}).sort((y,D)=>new Date(D.eventDate||0)-new Date(y.eventDate||0))},[c,j,u,L]);function P($){var Y;if(!$)return null;const y=$.goatId||$.goatID;if(y){const H=T.find(J=>String(J.id)===String(y));if(H)return H}const D=$.goatTagNumber||$.tagNumber;if(D){const H=T.find(J=>String(J.tagNumber)===String(D));if(H)return H}const ee=(Y=$.goatName)==null?void 0:Y.trim();return ee&&T.find(H=>{var J;return((J=H.name)==null?void 0:J.trim().toLowerCase())===ee.toLowerCase()})||null}async function R($){try{f("");const y=await Ir("/events",{method:"POST",body:JSON.stringify($)}),D=Va((y==null?void 0:y.event)||(y==null?void 0:y.data)||y);if(!D)throw new Error("Backend did not return the created event.");o(ee=>[D,...ee]),r==null||r(D),X()}catch(y){throw console.error("Add event failed:",y),f(y.message||"Failed to save event."),y}}async function q($){try{f("");const y=$.id||$._id;if(!y)throw new Error("Event ID is missing.");const D=await Ir(`/events/${y}`,{method:"PUT",body:JSON.stringify($)}),ee=Va((D==null?void 0:D.event)||(D==null?void 0:D.data)||D);if(!ee)throw new Error("Backend did not return the updated event.");o(Y=>Y.map(H=>String(H.id)===String(y)?ee:H)),s==null||s(ee),X()}catch(y){throw console.error("Update event failed:",y),f(y.message||"Failed to update event."),y}}async function C($){if(window.confirm("Are you sure you want to remove this event?"))try{f(""),await Ir(`/events/${$}`,{method:"DELETE"}),o(y=>y.filter(D=>String(D.id)!==String($))),i==null||i($),E(null)}catch(y){console.error("Delete event failed:",y),f(y.message||"Failed to delete event.")}}function W(){_(null),b(!0)}function te($){_($),b(!0),E(null)}function X(){b(!1),_(null)}return n.jsxs("div",{className:"events-page",children:[n.jsx("header",{className:"events-header",children:n.jsxs("div",{className:"events-header-inner",children:[n.jsxs("button",{className:"events-back-button",onClick:t,type:"button",children:[n.jsx("span",{className:"events-back-icon",children:n.jsx(Oe,{size:20})}),n.jsxs("span",{children:[n.jsx("strong",{className:"events-header-title",children:"Events"}),n.jsx("small",{className:"events-header-subtitle",children:"Track every event across your herd."})]})]}),n.jsxs("div",{className:"events-header-actions",children:[n.jsx("button",{className:"events-icon-button",onClick:()=>{h(""),F()},type:"button",title:"Refresh",children:n.jsx(Le,{size:18})}),n.jsx("button",{className:"events-icon-button",onClick:W,type:"button",title:"New event",children:n.jsx(_n,{size:18})})]})]})}),n.jsxs("main",{className:"events-content",children:[n.jsxs("div",{className:"events-main-search",children:[n.jsx(Me,{size:20}),n.jsx("input",{value:u,onChange:$=>h($.target.value),placeholder:"Search events or goats..."}),u&&n.jsx("button",{type:"button",className:"events-clear-search",onClick:()=>h(""),children:n.jsx(le,{size:16})})]}),n.jsxs("div",{className:"events-tabs",children:[n.jsxs("button",{className:L==="individual"?"events-tab active":"events-tab",onClick:()=>{V("individual"),_(null),b(!1)},type:"button",children:[n.jsx(Ko,{size:17}),"Individual"]}),n.jsxs("button",{className:L==="mass"?"events-tab active":"events-tab",onClick:()=>{V("mass"),_(null),b(!1)},type:"button",children:[n.jsx(An,{size:17}),"Mass Event"]})]}),n.jsxs("div",{className:"events-section-header",children:[n.jsxs("div",{children:[n.jsx("h2",{children:L==="individual"?"Individual events":"Mass events"}),n.jsxs("p",{children:[Q.length," record",Q.length!==1?"s":""," on this herd"]})]}),n.jsx("button",{className:"events-add-button",onClick:W,type:"button",children:"+ New Event"})]}),n.jsxs("button",{className:"events-filter-button",onClick:()=>O(!0),type:"button",children:[n.jsx("span",{children:j}),n.jsx(ln,{size:19})]}),g&&n.jsx("div",{className:"events-page-error",children:g}),d?n.jsxs("div",{className:"events-loading",children:[n.jsx("div",{className:"events-spinner"}),n.jsx("strong",{children:"Loading events..."}),n.jsx("span",{children:"Fetching goats and events from MongoDB."})]}):Q.length===0?n.jsx(rx,{mode:L,onAdd:W}):n.jsx("div",{className:"events-list",children:Q.map($=>n.jsx(nx,{event:$,goat:P($),menuOpen:M,setMenuOpen:E,onEdit:te,onDelete:C},$.id))})]}),n.jsx("button",{className:"events-floating",onClick:W,type:"button",children:"+ Add Event"}),A&&n.jsx(Zm,{title:"Select event type",options:eh,selected:j,query:m,onQueryChange:p,onPick:$=>{N($),O(!1),p("")},onClose:()=>{O(!1),p("")}}),S&&n.jsx(sx,{goats:T,initialData:w,mode:L,onClose:X,onSave:w?q:R})]})}function nx({event:e,goat:t,menuOpen:r,setMenuOpen:s,onEdit:i,onDelete:a}){var c;const l=e.mode==="mass";return n.jsxs("article",{className:"events-card",children:[n.jsxs("div",{className:"events-card-top",children:[n.jsx("div",{className:"events-event-icon",children:n.jsx(Fe,{size:20})}),n.jsxs("div",{className:"events-event-main",children:[n.jsx("h3",{children:e.title||"Untitled Event"}),!l&&n.jsxs("div",{className:"events-goat-info",children:[n.jsxs("span",{children:["🐐 ",e.goatName||"Unknown goat"]}),(t==null?void 0:t.breed)&&n.jsxs("span",{children:["· ",t.breed]}),(t==null?void 0:t.tagNumber)&&n.jsxs("span",{children:["· Tag #",t.tagNumber]})]}),l&&n.jsxs("div",{className:"events-mass-goats",children:[n.jsxs("div",{className:"events-mass-header",children:[n.jsx(An,{size:15}),n.jsxs("strong",{children:[e.goatCount||((c=e.goats)==null?void 0:c.length)||0," goats"]})]}),n.jsx("div",{className:"events-mass-list",children:Array.isArray(e.goats)&&e.goats.map((o,d)=>n.jsxs("span",{className:"events-mass-chip",children:["🐐 ",o.name||"Goat",o.tagNumber?` #${o.tagNumber}`:""]},o.id||o._id||o.tagNumber||d))})]}),n.jsx("div",{className:"events-date",children:e.eventDate||"No date"})]}),n.jsxs("div",{className:"events-card-actions",children:[n.jsx("span",{className:"events-type-badge",children:e.type||"Other"}),n.jsx("button",{className:"events-more-button",onClick:()=>s(r===e.id?null:e.id),type:"button",title:"More",children:n.jsx(_n,{size:18})})]})]}),e.notes&&n.jsx("div",{className:"events-notes",children:e.notes}),r===e.id&&n.jsxs("div",{className:"events-menu",children:[n.jsxs("button",{onClick:()=>i(e),type:"button",children:[n.jsx(xr,{size:16}),"Edit"]}),n.jsxs("button",{className:"danger",onClick:()=>a(e.id),type:"button",children:[n.jsx(zn,{size:16}),"Remove"]})]})]})}function rx({mode:e,onAdd:t}){return n.jsxs("div",{className:"events-empty",children:[n.jsx("div",{className:"events-empty-icon",children:e==="mass"?n.jsx(An,{size:34}):n.jsx(Fe,{size:34})}),n.jsx("strong",{children:e==="mass"?"No mass events found":"No events found"}),n.jsx("span",{children:e==="mass"?"Create a mass event for multiple goats.":"Create your first event to start tracking your herd."}),n.jsx("button",{onClick:t,type:"button",children:"+ Create Event"})]})}function sx({goats:e,initialData:t,mode:r,onClose:s,onSave:i}){const a=r==="mass"||(t==null?void 0:t.mode)==="mass",[l,c]=x.useState(null),[o,d]=x.useState([]),[v,g]=x.useState(""),[f,j]=x.useState((t==null?void 0:t.title)||""),[N,A]=x.useState((t==null?void 0:t.type)||""),[O,m]=x.useState((t==null?void 0:t.eventDate)||""),[p,u]=x.useState((t==null?void 0:t.notes)||""),[h,S]=x.useState(""),[b,w]=x.useState(!1);x.useEffect(()=>{if(!t){c(null),d([]);return}if(t.mode==="mass"||Array.isArray(t.goats)){const Q=(Array.isArray(t.goats)?t.goats:[]).map(P=>e.find(R=>String(R.id)===String(P.id||P._id))||e.find(R=>String(R.tagNumber)===String(P.tagNumber))||P).filter(Boolean);d(Q);return}const k=t.goatId||t.goatID;let F=k?e.find(T=>String(T.id)===String(k)):null;!F&&t.goatTagNumber&&(F=e.find(T=>String(T.tagNumber)===String(t.goatTagNumber))),!F&&t.goatName&&(F=e.find(T=>{var Q,P;return((Q=T.name)==null?void 0:Q.trim().toLowerCase())===((P=t.goatName)==null?void 0:P.trim().toLowerCase())})),c(F||null)},[t,e]);const _=x.useMemo(()=>{const k=v.trim().toLowerCase();return k?e.filter(F=>{const T=String(F.name||"").toLowerCase(),Q=String(F.tagNumber||"").toLowerCase();return T.includes(k)||Q.includes(k)}):[]},[e,v]);function M(k){return o.some(F=>String(F.id||F._id)===String(k.id||k._id))}function E(k){d(F=>F.some(Q=>String(Q.id||Q._id)===String(k.id||k._id))?F.filter(Q=>String(Q.id||Q._id)!==String(k.id||k._id)):[...F,k])}function L(){v.trim()&&d(k=>{const F=new Map;return k.forEach(T=>{F.set(String(T.id||T._id),T)}),_.forEach(T=>{F.set(String(T.id||T._id),T)}),Array.from(F.values())})}function V(){d([])}async function B(k){if(k.preventDefault(),b)return;if(S(""),!f.trim()){S("Enter the event title.");return}if(!N){S("Select the event type.");return}if(!O){S("Select the event date.");return}if(a){if(o.length===0){S("Please select at least one goat.");return}const T={id:(t==null?void 0:t.id)||(t==null?void 0:t._id),mode:"mass",title:f.trim(),type:N,eventDate:O,goatIds:o.map(Q=>Q.id||Q._id),goats:o.map(Q=>({id:Q.id||Q._id,name:Q.name,breed:Q.breed,tagNumber:Q.tagNumber})),goatCount:o.length,notes:p.trim()};try{w(!0),await i(T)}catch(Q){S(Q.message||"Failed to save event.")}finally{w(!1)}return}if(!l){S("Please select a goat.");return}const F={id:(t==null?void 0:t.id)||(t==null?void 0:t._id),mode:"individual",title:f.trim(),type:N,eventDate:O,goatId:l.id||l._id,goatName:l.name,goatTagNumber:l.tagNumber,notes:p.trim()};try{w(!0),await i(F)}catch(T){S(T.message||"Failed to save event.")}finally{w(!1)}}return n.jsx("div",{className:"events-overlay",onClick:s,children:n.jsxs("form",{className:"events-form",onClick:k=>k.stopPropagation(),onSubmit:B,children:[n.jsx("div",{className:"events-form-handle"}),n.jsxs("div",{className:"events-form-header",children:[n.jsxs("div",{children:[n.jsx("small",{children:t?"EDIT EVENT":a?"NEW MASS EVENT":"NEW EVENT"}),n.jsx("h2",{children:t?a?"Edit Mass Event":"Edit Event":a?"Add Mass Event":"Add Event"})]}),n.jsx("button",{className:"events-form-close",type:"button",onClick:s,children:n.jsx(le,{size:18})})]}),n.jsxs("div",{className:"events-form-body",children:[a?n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"events-info-box",children:[n.jsx("div",{className:"events-info-icon",children:n.jsx(An,{size:18})}),n.jsxs("div",{children:[n.jsx("strong",{children:"Mass Event"}),n.jsx("span",{children:"Select multiple goats for the same activity."})]})]}),n.jsxs("div",{className:"events-selection-header",children:[n.jsxs("div",{children:[n.jsx("span",{className:"events-field-label",children:"Select Goats"}),n.jsxs("small",{children:[o.length," goat",o.length!==1?"s":""," selected"]})]}),n.jsxs("div",{className:"events-select-actions",children:[n.jsx("button",{type:"button",onClick:L,disabled:!v.trim()||_.length===0,children:"Select All"}),n.jsx("button",{type:"button",className:"danger",onClick:V,disabled:o.length===0,children:"Clear"})]})]}),n.jsxs("div",{className:"events-goat-search",children:[n.jsx(Me,{size:18}),n.jsx("input",{value:v,onChange:k=>g(k.target.value),placeholder:"Search by goat name or tag number..."}),v&&n.jsx("button",{type:"button",className:"events-search-clear",onClick:()=>g(""),children:n.jsx(le,{size:15})})]}),o.length>0&&n.jsx("div",{className:"events-selected-mass",children:o.map(k=>n.jsxs("div",{className:"events-selected-chip",children:[n.jsxs("span",{children:["🐐 ",k.name,k.tagNumber?` #${k.tagNumber}`:""]}),n.jsx("button",{type:"button",onClick:()=>E(k),children:n.jsx(le,{size:13})})]},k.id||k._id))}),n.jsx("div",{className:"events-goat-results",children:v.trim()?_.length===0?n.jsx(ti,{searching:!0}):_.map(k=>{const F=M(k);return n.jsxs("button",{className:F?"events-goat-option selected":"events-goat-option",type:"button",onClick:()=>E(k),children:[n.jsx("div",{className:"events-goat-avatar",children:"🐐"}),n.jsxs("div",{className:"events-goat-details",children:[n.jsx("strong",{children:k.name}),n.jsxs("span",{children:[k.breed,k.tagNumber?` · Tag #${k.tagNumber}`:""]})]}),n.jsx("div",{className:F?"events-checkbox checked":"events-checkbox",children:F&&n.jsx(Ae,{size:15})})]},k.id||k._id)}):n.jsx(ti,{searching:!1})})]}):n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"events-field-label",children:"Select Goat"}),n.jsxs("div",{className:"events-goat-search",children:[n.jsx(Me,{size:18}),n.jsx("input",{value:v,onChange:k=>g(k.target.value),placeholder:"Search by goat name or tag number..."}),v&&n.jsx("button",{type:"button",className:"events-search-clear",onClick:()=>g(""),children:n.jsx(le,{size:15})})]}),l&&n.jsxs("div",{className:"events-selected-goat",children:[n.jsx("div",{className:"events-goat-avatar",children:"🐐"}),n.jsxs("div",{className:"events-goat-details",children:[n.jsx("strong",{children:l.name}),n.jsxs("span",{children:[l.breed,l.tagNumber?` · Tag #${l.tagNumber}`:""]})]}),n.jsx("button",{type:"button",className:"events-remove-goat",onClick:()=>{c(null),g("")},children:n.jsx(le,{size:16})})]}),!l&&n.jsx("div",{className:"events-goat-results",children:v.trim()?_.length===0?n.jsx(ti,{searching:!0}):_.map(k=>n.jsxs("button",{className:"events-goat-option",type:"button",onClick:()=>{c(k),g("")},children:[n.jsx("div",{className:"events-goat-avatar",children:"🐐"}),n.jsxs("div",{className:"events-goat-details",children:[n.jsx("strong",{children:k.name}),n.jsxs("span",{children:[k.breed,k.tagNumber?` · Tag #${k.tagNumber}`:""]})]}),n.jsx(Yo,{size:18,className:"events-goat-arrow"})]},k.id||k._id)):n.jsx(ti,{searching:!1})})]}),n.jsx(ni,{label:"Event title",children:n.jsx("input",{value:f,onChange:k=>j(k.target.value),placeholder:a?"Example: Vaccination for selected goats":"Example: Vaccination completed"})}),n.jsx(ni,{label:"Event type",children:n.jsxs("select",{value:N,onChange:k=>A(k.target.value),children:[n.jsx("option",{value:"",children:"Select event type"}),eh.filter(k=>k!=="All Event Types").map(k=>n.jsx("option",{value:k,children:k},k))]})}),n.jsx(ni,{label:"Event date",children:n.jsx("input",{type:"date",value:O,onChange:k=>m(k.target.value)})}),n.jsxs("div",{className:"events-reminder",children:[n.jsx(mn,{size:18}),n.jsxs("div",{children:[n.jsx("strong",{children:"Event reminder"}),n.jsx("span",{children:"Browser reminders can be connected later to your notification system."})]})]}),n.jsx(ni,{label:"Notes (optional)",children:n.jsx("textarea",{value:p,onChange:k=>u(k.target.value),rows:3,placeholder:"Add any details about this event"})}),h&&n.jsx("div",{className:"events-form-error",children:h}),n.jsx("button",{className:"events-save-button",disabled:b,type:"submit",children:b?"Saving...":t?a?"Update Mass Event":"Update Event":a?`Save Mass Event${o.length?` (${o.length} goats)`:""}`:"Save Event"})]})]})})}function ti({searching:e}){return n.jsxs("div",{className:"events-no-goats",children:[n.jsx("div",{className:"events-no-goats-icon",children:n.jsx(Me,{size:23})}),n.jsx("strong",{children:e?"No goats found":"Find a goat"}),n.jsx("span",{children:e?"Try another goat name or tag number.":"Start typing a goat name or tag number to select a goat."})]})}function ni({label:e,children:t}){return n.jsxs("label",{className:"events-field",children:[n.jsx("span",{className:"events-field-label",children:e}),t]})}const ix=["tenant","currentTenant","tenantData"];function ax(e){try{return JSON.parse(e)}catch{return null}}function lx(){for(const e of ix){const t=localStorage.getItem(e);if(!t)continue;const r=ax(t);if(r&&typeof r=="object")return r}return null}function Yi(e,t){return e?e.data&&Array.isArray(e.data[t])?e.data[t]:Array.isArray(e[t])?e[t]:[]:[]}function ox(e){if(!e||typeof e!="object")return null;const t=e.id??e._id??e.goatId??e.tagNumber??e.tag??null,r=e.name??e.goatName??e.goat_name??"",s=e.tagNumber??e.tag??e.tagNo??e.tag_number??"",i=e.breed??e.breedName??e.breed_name??"";return!t&&!r&&!s?null:{...e,id:String(t||s||r),name:r||`Goat #${s||"Unknown"}`,tagNumber:s,breed:i||"Unknown breed"}}function wd(e,t){if(!e)return null;const r=e.goatId??e.goatID??e.animalId??e.animalID??null,s=e.goatTagNumber??e.tagNumber??e.tagNo??e.goatTag??"",i=e.goatName??e.name??"";let a=null;r&&(a=t.find(o=>String(o.id)===String(r))),!a&&s&&(a=t.find(o=>String(o.tagNumber)===String(s))),!a&&i&&(a=t.find(o=>{var d;return((d=o.name)==null?void 0:d.toLowerCase())===(i==null?void 0:i.toLowerCase())}));const l=e.weight??e.weightKg??e.kg??e.value??e.currentWeight??null,c=e.date??e.eventDate??e.weightDate??e.createdAt??e.updatedAt??"";return l==null||l===""?null:{...e,goatId:(a==null?void 0:a.id)||r||"",goatName:(a==null?void 0:a.name)||i||"Unknown Goat",goatTagNumber:(a==null?void 0:a.tagNumber)||s||"",weight:Number(l),date:c}}function cx(e,t){const r=["weights","weightRecords","weightHistory","weighments","weighingRecords","scaleRecords","weightChecks"];for(const i of r){const a=Yi(e,i);if(a.length)return a.map(l=>wd(l,t)).filter(Boolean)}return Yi(e,"events").filter(i=>i.type==="Weight Check"||i.type==="Weight").map(i=>wd(i,t)).filter(Boolean)}function dx(e,t){const r=["transactions","transactionRecords","financialTransactions","sales","purchases"];let s=[];for(const i of r){const a=Yi(e,i);a.length&&(s=[...s,...a])}return s.map(i=>{const a=i.goatId??i.goatID??"",l=t.find(c=>String(c.id)===String(a));return{...i,goatName:i.goatName||(l==null?void 0:l.name)||"",date:i.date||i.transactionDate||i.createdAt||"",amount:i.amount??i.total??i.price??0,type:i.type||i.transactionType||"Transaction"}})}function pn(e){if(!e)return"—";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}function ux({tenant:e,onBack:t}){var M,E,L,V,B;const[r,s]=x.useState([]),[i,a]=x.useState([]),[l,c]=x.useState([]),[o,d]=x.useState(null),[v,g]=x.useState(""),[f,j]=x.useState(!1),[N,A]=x.useState(""),[O,m]=x.useState(!1),p=()=>{m(!0);const k=e||lx(),F=Yi(k,"goats").map(ox).filter(Boolean),T=cx(k,F),Q=dx(k,F);s(F),a(T),c(Q),d(P=>F.find(R=>String(R.id)===String(P==null?void 0:P.id))||null),m(!1)};x.useEffect(()=>{p();const k=()=>{p()};window.addEventListener("tenant-data-updated",k),window.addEventListener("storage",k);const F=setInterval(p,1500);return()=>{window.removeEventListener("tenant-data-updated",k),window.removeEventListener("storage",k),clearInterval(F)}},[e]);const u=x.useMemo(()=>{const k=N.trim().toLowerCase();return k?r.filter(F=>[F.name,F.tagNumber,F.breed,F.id].filter(Boolean).join(" ").toLowerCase().includes(k)):r},[r,N]),h=x.useMemo(()=>o?i.filter(k=>{var F,T;return k.goatId&&String(k.goatId)===String(o.id)||k.goatTagNumber&&String(k.goatTagNumber)===String(o.tagNumber)?!0:((F=k.goatName)==null?void 0:F.toLowerCase())===((T=o.name)==null?void 0:T.toLowerCase())}).sort((k,F)=>new Date(F.date||0)-new Date(k.date||0)):[],[i,o]),S=((M=h[0])==null?void 0:M.weight)??(o==null?void 0:o.weight)??(o==null?void 0:o.weightKg)??0;(E=h[1])==null||E.weight;const b=x.useMemo(()=>o?l.filter(k=>{var F,T;return k.goatId&&String(k.goatId)===String(o.id)?!0:((F=k.goatName)==null?void 0:F.toLowerCase())===((T=o.name)==null?void 0:T.toLowerCase())}).sort((k,F)=>new Date(F.date||0)-new Date(k.date||0)):[],[l,o]),w=o&&(!v||((L=o.name)==null?void 0:L.toLowerCase().includes(v.toLowerCase()))||String(o.tagNumber).toLowerCase().includes(v.toLowerCase()));function _(){window.print()}return n.jsxs("div",{className:"reports-page",children:[n.jsx("style",{children:Qi()}),n.jsx("header",{className:"reports-header",children:n.jsxs("div",{className:"reports-header-inner",children:[n.jsxs("button",{className:"reports-back",onClick:t,children:[n.jsx(Oe,{size:20}),n.jsxs("div",{children:[n.jsx("div",{className:"reports-title",children:"Reports"}),n.jsx("div",{className:"reports-subtitle",children:"Goat weight, activity & transaction reports"})]})]}),n.jsxs("div",{className:"reports-header-actions",children:[n.jsx("button",{className:"report-refresh",onClick:p,title:"Refresh",children:n.jsx(Le,{size:18,className:O?"spin":""})}),n.jsxs("button",{className:"report-print",onClick:_,children:[n.jsx(pa,{size:17}),n.jsx("span",{children:"Print Report"})]})]})]})}),n.jsxs("main",{className:"reports-content",children:[n.jsxs("section",{className:"reports-intro",children:[n.jsxs("div",{children:[n.jsx("span",{className:"reports-eyebrow",children:"FARM ANALYTICS"}),n.jsx("h1",{children:"Goat Reports"}),n.jsx("p",{children:"View real goat data, weighing history and transactions in one place."})]}),n.jsx("div",{className:"reports-intro-icon",children:n.jsx(Yt,{size:29})})]}),n.jsxs("div",{className:"reports-search",children:[n.jsx(Me,{size:18,color:"#64748B"}),n.jsx("input",{value:v,onChange:k=>g(k.target.value),placeholder:"Search goat report..."}),v&&n.jsx("button",{onClick:()=>g(""),children:n.jsx(le,{size:16})})]}),n.jsxs("section",{className:"report-selector",children:[n.jsxs("div",{className:"selector-label",children:[n.jsx(ot,{size:15}),"Select goat"]}),n.jsxs("div",{className:"selector-wrapper",children:[n.jsxs("button",{className:"goat-selector",onClick:()=>j(!f),children:[o?n.jsxs("div",{className:"selected-goat",children:[n.jsx("div",{className:"goat-avatar",children:"🐐"}),n.jsxs("div",{children:[n.jsx("strong",{children:o.name}),n.jsxs("span",{children:[o.breed,o.tagNumber?` · Tag #${o.tagNumber}`:""]})]})]}):n.jsx("span",{className:"selector-placeholder",children:"Select a goat to view report"}),n.jsx(ln,{size:19})]}),f&&n.jsxs("div",{className:"goat-dropdown",children:[n.jsxs("div",{className:"dropdown-search",children:[n.jsx(Me,{size:16}),n.jsx("input",{value:N,onChange:k=>A(k.target.value),placeholder:"Search goats...",autoFocus:!0}),N&&n.jsx("button",{onClick:()=>A(""),children:n.jsx(le,{size:14})})]}),n.jsx("div",{className:"dropdown-list",children:u.length===0?n.jsxs("div",{className:"dropdown-empty",children:[n.jsx(Goat,{size:30}),n.jsx("strong",{children:"No goats found"}),n.jsx("span",{children:"Add goats from the Goats page first."})]}):u.map(k=>n.jsxs("button",{className:"dropdown-goat",onClick:()=>{d(k),j(!1),A("")},children:[n.jsx("div",{className:"goat-avatar small",children:"🐐"}),n.jsxs("div",{children:[n.jsx("strong",{children:k.name}),n.jsxs("span",{children:[k.breed,k.tagNumber?` · Tag #${k.tagNumber}`:""]})]}),n.jsx(Yo,{size:17})]},k.id))})]})]}),n.jsxs("div",{className:"goat-count",children:[r.length," goats available"]})]}),!o&&n.jsxs("div",{className:"report-empty",children:[n.jsx("div",{className:"empty-icon",children:n.jsx(we,{size:30})}),n.jsx("h2",{children:"Select a goat"}),n.jsx("p",{children:"Choose one of your actual goats to view weight history, profile information and transactions."})]}),o&&w&&n.jsxs("div",{className:"print-area",children:[n.jsxs("section",{className:"goat-profile",children:[n.jsxs("div",{className:"profile-left",children:[n.jsx("div",{className:"large-goat-avatar",children:"🐐"}),n.jsxs("div",{children:[n.jsx("span",{className:"profile-label",children:"GOAT PROFILE"}),n.jsx("h2",{children:o.name}),n.jsxs("div",{className:"profile-tags",children:[o.tagNumber&&n.jsxs("span",{children:["Tag #",o.tagNumber]}),o.breed&&n.jsx("span",{children:o.breed}),o.gender&&n.jsx("span",{children:o.gender}),o.stage&&n.jsx("span",{children:o.stage})]})]})]}),n.jsxs("div",{className:"profile-date",children:[n.jsx("span",{children:"REPORT GENERATED"}),n.jsx("strong",{children:pn(new Date)})]})]}),n.jsxs("section",{className:"summary-grid",children:[n.jsx(ri,{icon:n.jsx(we,{size:18}),title:"Current Weight",value:S?`${S} kg`:"—",subtitle:(V=h[0])!=null&&V.date?`Checked ${pn(h[0].date)}`:"No weight record"}),n.jsx(ri,{icon:n.jsx(ot,{size:18}),title:"Weight Checks",value:h.length,subtitle:"Recorded checks"}),n.jsx(ri,{icon:n.jsx(Fe,{size:18}),title:"Last Weighed",value:(B=h[0])!=null&&B.date?pn(h[0].date):"—",subtitle:"Latest scale reading"}),n.jsx(ri,{icon:n.jsx(Ql,{size:18}),title:"Transactions",value:b.length,subtitle:"Linked records"})]}),n.jsxs("section",{className:"details-card",children:[n.jsx(Qa,{eyebrow:"GOAT INFORMATION",title:"Basic details"}),n.jsxs("div",{className:"details-grid",children:[n.jsx(Et,{label:"Goat name",value:o.name}),n.jsx(Et,{label:"Tag number",value:o.tagNumber||"—"}),n.jsx(Et,{label:"Breed",value:o.breed||"—"}),n.jsx(Et,{label:"Gender",value:o.gender||o.sex||"—"}),n.jsx(Et,{label:"Stage",value:o.stage||"—"}),n.jsx(Et,{label:"Date of birth",value:pn(o.dob||o.dateOfBirth)}),n.jsx(Et,{label:"Current weight",value:S?`${S} kg`:"—"}),n.jsx(Et,{label:"Created date",value:pn(o.createdAt||o.createdDate)}),n.jsx(Et,{label:"Status",value:o.status||"Active"})]})]}),n.jsxs("section",{className:"history-card",children:[n.jsx(Qa,{eyebrow:"WEIGHING SCALE",title:"Weight history",right:n.jsxs("span",{className:"history-count",children:[h.length," records"]})}),h.length===0?n.jsxs("div",{className:"history-empty",children:[n.jsx(we,{size:27}),n.jsx("strong",{children:"No weight records"}),n.jsx("span",{children:"Weight readings from your weighing scale will appear here."})]}):n.jsx("div",{className:"table-wrap",children:n.jsxs("table",{className:"history-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"#"}),n.jsx("th",{children:"Date"}),n.jsx("th",{children:"Weight"}),n.jsx("th",{children:"Change"}),n.jsx("th",{children:"Source"}),n.jsx("th",{children:"Notes"})]})}),n.jsx("tbody",{children:h.map((k,F)=>{const T=h[F+1],Q=T?k.weight-T.weight:null;return n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx("span",{className:"row-number",children:F+1})}),n.jsx("td",{children:n.jsxs("span",{className:"date-cell",children:[n.jsx(Fe,{size:14}),pn(k.date)]})}),n.jsx("td",{children:n.jsxs("strong",{className:"weight-value",children:[k.weight," kg"]})}),n.jsx("td",{children:Q===null?n.jsx("span",{className:"change-neutral",children:"—"}):n.jsxs("span",{className:Q>0?"change-positive":Q<0?"change-negative":"change-neutral",children:[Q>0?"+":"",Q.toFixed(2)," ","kg"]})}),n.jsx("td",{children:n.jsx("span",{className:"source-badge",children:k.source||k.device||"Scale"})}),n.jsx("td",{children:n.jsx("span",{className:"notes-cell",children:k.notes||"—"})})]},k.id||`${k.date}-${F}`)})})]})})]}),n.jsxs("section",{className:"history-card",children:[n.jsx(Qa,{eyebrow:"FARM FINANCE",title:"Transaction details",right:n.jsxs("span",{className:"history-count",children:[b.length," records"]})}),b.length===0?n.jsxs("div",{className:"history-empty",children:[n.jsx(Ql,{size:27}),n.jsx("strong",{children:"No transactions"}),n.jsx("span",{children:"Transactions linked to this goat will appear here."})]}):n.jsx("div",{className:"table-wrap",children:n.jsxs("table",{className:"history-table transaction-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Date"}),n.jsx("th",{children:"Type"}),n.jsx("th",{children:"Description"}),n.jsx("th",{children:"Amount"})]})}),n.jsx("tbody",{children:b.map((k,F)=>n.jsxs("tr",{children:[n.jsx("td",{children:pn(k.date)}),n.jsx("td",{children:n.jsx("span",{className:"transaction-badge",children:k.type})}),n.jsx("td",{children:k.description||k.title||k.notes||"Transaction"}),n.jsx("td",{children:n.jsxs("strong",{children:["₹",Number(k.amount||0).toLocaleString("en-IN")]})})]},k.id||F))})]})})]}),n.jsxs("section",{className:"report-note",children:[n.jsx("div",{className:"note-icon",children:n.jsx(ot,{size:18})}),n.jsxs("div",{children:[n.jsx("strong",{children:"Live farm data"}),n.jsx("p",{children:"This report uses the goat, weighing and transaction data currently stored in your farm application. No sample goat data is added by this page."})]})]})]})]})]})}function ri({icon:e,title:t,value:r,subtitle:s}){return n.jsxs("div",{className:"summary-card",children:[n.jsxs("div",{className:"summary-top",children:[n.jsx("div",{className:"summary-icon",children:e}),n.jsx("span",{children:t})]}),n.jsx("strong",{className:"summary-value",children:r}),n.jsx("small",{children:s})]})}function Qa({eyebrow:e,title:t,right:r}){return n.jsxs("div",{className:"section-heading",children:[n.jsxs("div",{children:[n.jsx("span",{className:"section-eyebrow",children:e}),n.jsx("h3",{children:t})]}),r]})}function Et({label:e,value:t}){return n.jsxs("div",{className:"detail-item",children:[n.jsx("span",{children:e}),n.jsx("strong",{children:t||"—"})]})}function px({tenant:e,onBack:t,onAdd:r}){var i;const s=((i=e==null?void 0:e.data)==null?void 0:i.vaccinations)||[];return n.jsx(ux,{title:"Vaccinations",records:s,emptyMessage:"No vaccinations have been logged yet!",onBack:t,onAdd:r,renderRecord:a=>n.jsxs(n.Fragment,{children:[n.jsx("h3",{style:{margin:0},children:a.vaccine||"Vaccine"}),n.jsxs("p",{style:{margin:"6px 0 0",color:"#4B5563"},children:[a.goatName||"Unnamed goat"," — given ",a.date,a.nextDueDate&&` · Next due: ${a.nextDueDate}`]})]})})}const hx="http://localhost:5000/api",Rr=async(e,t={})=>{const r=await fetch(`${hx}${e}`,{...t,credentials:"include",headers:{"Content-Type":"application/json",...t.headers||{}}});let s=null;try{s=await r.json()}catch{s=null}if(!r.ok)throw new Error((s==null?void 0:s.message)||(s==null?void 0:s.error)||`Request failed with status ${r.status}`);return s},he=(e,t=[])=>{for(const r of t){const s=r.split(".");let i=e;for(const a of s){if(i==null)break;i=i[a]}if(i!=null&&i!=="")return i}return null},Nd=e=>Array.isArray(e)?e:e&&typeof e=="object"?Object.values(e):[],ve=e=>String(e??"").trim().toLowerCase(),hn=e=>{if(!e)return"—";const t=new Date(e);return Number.isNaN(t.getTime())?String(e):t.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})},fx=()=>{const e=new Date,t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${r}-${s}`},gx=(e,t=0)=>he(e,["id","_id","goatId"])||`goat-${t}`,mx=e=>he(e,["name","goatName","goat_name"])||"Unnamed Goat",xx=e=>he(e,["tagNumber","tag","tagId","tag_number"])||"No tag",yx=e=>he(e,["breed","breedName"])||"Not specified",vx=e=>he(e,["gender","sex"])||"Not specified",jx=e=>he(e,["stage","lifeStage"])||"Not specified",bx=e=>{const t=[e==null?void 0:e.weightHistory,e==null?void 0:e.weight_history,e==null?void 0:e.weights,e==null?void 0:e.weightRecords,e==null?void 0:e.weightHistoryRecords,e==null?void 0:e.weightChecks,e==null?void 0:e.weight_check_history];for(const s of t){if(!Array.isArray(s))continue;const i=s.map(a=>typeof a=="number"?{value:a,date:null}:{value:he(a,["weight","value","weightKg","kg","currentWeight"]),date:he(a,["date","createdAt","updatedAt","timestamp","recordedAt","checkedAt","weighedAt"])}).map(a=>({...a,value:Number(a.value)})).filter(a=>Number.isFinite(a.value)).sort((a,l)=>new Date(l.date||0).getTime()-new Date(a.date||0).getTime());if(i.length>0)return i[0].value}const r=Number(he(e,["weight","currentWeight","weightKg"]));return Number.isFinite(r)?r:null},wx=(e,t)=>({...e,_medicalGoatId:String(gx(e,t)),_name:mx(e),_tag:xx(e),_breed:yx(e),_gender:vx(e),_stage:jx(e),_weight:bx(e),_photo:he(e,["photo","image","imageUrl","avatar","profileImage"])||null}),Nx=(e,t,r)=>{const s=String(he(e,["goatId","goat_id","animalId","animal_id","goat.id","goat._id"])||""),i=r.find(a=>String(a._medicalGoatId)===s);return{...e,_id:he(e,["id","_id","medicalId"])||`medical-${t}`,_goatId:s,_goatName:he(e,["goatName","animalName","goat.name"])||(i==null?void 0:i._name)||"Unknown Goat",_tag:he(e,["tag","tagNumber","goatTag","goat.tagNumber"])||(i==null?void 0:i._tag)||"No tag",_type:he(e,["type","recordType","medicalType","category"])||"Treatment",_diagnosis:he(e,["diagnosis","condition","problem","healthIssue"])||"",_treatment:he(e,["treatment","treatmentName","procedure"])||"",_medicine:he(e,["medicine","medicineName","medication","drug"])||"",_vaccine:he(e,["vaccine","vaccineName","vaccination"])||"",_doctor:he(e,["doctor","doctorName","veterinarian","vetName"])||"",_date:he(e,["date","recordDate","treatmentDate","visitDate","createdAt","updatedAt"])||"",_nextDate:he(e,["nextDate","nextVisit","followUpDate","nextTreatmentDate","nextVaccinationDate"])||"",_status:he(e,["status","healthStatus","conditionStatus"])||"Completed",_notes:he(e,["notes","note","remarks","description"])||""}};function Ln({icon:e,label:t,value:r,sub:s}){return n.jsxs("div",{className:"medical-stat-card",children:[n.jsxs("div",{className:"medical-stat-top",children:[n.jsx("div",{className:"medical-stat-icon",children:n.jsx(e,{size:20})}),n.jsx("span",{className:"medical-stat-label",children:t})]}),n.jsx("div",{className:"medical-stat-value",children:r}),s&&n.jsx("div",{className:"medical-stat-sub",children:s})]})}function Dr({icon:e=xn,title:t,description:r,action:s}){return n.jsxs("div",{className:"medical-empty",children:[n.jsx("div",{className:"medical-empty-icon",children:n.jsx(e,{size:25})}),n.jsx("h3",{children:t}),n.jsx("p",{children:r}),s&&n.jsxs("button",{type:"button",className:"medical-primary-btn",onClick:s.onClick,children:[n.jsx($t,{size:17}),s.label]})]})}function Sx({goats:e,initialRecord:t,onClose:r,onSave:s,saving:i}){const a=!!t,l=x.useMemo(()=>t!=null&&t._goatId&&e.find(h=>String(h._medicalGoatId)===String(t._goatId))||null,[e,t]),[c,o]=x.useState(()=>({goatId:(t==null?void 0:t._goatId)||"",type:(t==null?void 0:t._type)||"Treatment",date:t!=null&&t._date?String(t._date).slice(0,10):fx(),diagnosis:(t==null?void 0:t._diagnosis)||"",treatment:(t==null?void 0:t._treatment)||"",medicine:(t==null?void 0:t._medicine)||"",vaccine:(t==null?void 0:t._vaccine)||"",doctor:(t==null?void 0:t._doctor)||"",nextDate:t!=null&&t._nextDate?String(t._nextDate).slice(0,10):"",status:(t==null?void 0:t._status)||"Completed",notes:(t==null?void 0:t._notes)||""})),[d,v]=x.useState(l?`${l._name} — Tag ${l._tag}`:""),[g,f]=x.useState(!1),[j,N]=x.useState(""),A=(h,S)=>{o(b=>({...b,[h]:S}))},O=x.useMemo(()=>{const h=ve(d);return h?e.filter(S=>ve(S._name).includes(h)||ve(S._tag).includes(h)||ve(S._breed).includes(h)):[]},[e,d]);x.useEffect(()=>{const h=S=>{S.target.closest(".medical-goat-search-wrapper")||f(!1)};return document.addEventListener("mousedown",h),()=>{document.removeEventListener("mousedown",h)}},[]);const m=h=>{A("goatId",h._medicalGoatId),v(`${h._name} — Tag ${h._tag}`),f(!1),N("")},p=()=>{v(""),A("goatId",""),f(!1)},u=async()=>{if(N(""),!c.goatId){N("Please select a goat.");return}if(!c.date){N("Please select the medical date.");return}if(!c.diagnosis.trim()){N("Please enter the diagnosis or health issue.");return}const h=e.find(b=>String(b._medicalGoatId)===String(c.goatId));if(!h){N("Selected goat was not found.");return}const S={goatId:h._medicalGoatId,goatName:h._name,tagNumber:h._tag,type:c.type,date:c.date,diagnosis:c.diagnosis.trim(),treatment:c.treatment.trim(),medicine:c.medicine.trim(),vaccine:c.vaccine.trim(),doctor:c.doctor.trim(),nextDate:c.nextDate||null,status:c.status,notes:c.notes.trim()};try{await s(S,t)}catch(b){N(b.message||"Failed to save medical record.")}};return n.jsx("div",{className:"medical-modal-backdrop",onMouseDown:r,children:n.jsxs("div",{className:"medical-modal",onMouseDown:h=>h.stopPropagation(),children:[n.jsxs("div",{className:"medical-modal-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"medical-eyebrow",children:"MEDICAL RECORD"}),n.jsx("h2",{children:a?"Edit medical record":"Add medical record"}),n.jsx("p",{children:"Save actual health information for an existing goat."})]}),n.jsx("button",{type:"button",className:"medical-icon-btn",onClick:r,children:n.jsx(le,{size:19})})]}),j&&n.jsxs("div",{className:"medical-error",children:[n.jsx(Hi,{size:17}),j]}),n.jsxs("div",{className:"medical-form-grid",children:[n.jsxs("label",{className:"medical-goat-search-field",children:["Goat *",n.jsxs("div",{className:"medical-goat-search-wrapper",children:[n.jsx(Me,{size:17,className:"medical-goat-search-icon"}),n.jsx("input",{type:"text",value:d,placeholder:"Search goat name or tag...",autoComplete:"off",onFocus:()=>{d.trim()&&f(!0)},onChange:h=>{const S=h.target.value;if(v(S),f(!!S.trim()),c.goatId){const b=e.find(_=>String(_._medicalGoatId)===String(c.goatId)),w=b?`${b._name} — Tag ${b._tag}`:"";S!==w&&A("goatId","")}}}),d&&n.jsx("button",{type:"button",className:"medical-goat-search-clear",onClick:p,children:n.jsx(le,{size:15})}),g&&d.trim()&&n.jsx("div",{className:"medical-goat-results",children:O.length===0?n.jsxs("div",{className:"medical-goat-no-result",children:[n.jsx(Tt,{size:18}),n.jsx("span",{children:"No goat found"})]}):O.map(h=>{const S=String(c.goatId)===String(h._medicalGoatId);return n.jsxs("button",{type:"button",className:`medical-goat-result ${S?"selected":""}`,onClick:()=>m(h),children:[n.jsx("div",{className:"medical-goat-result-avatar",children:h._photo?n.jsx("img",{src:h._photo,alt:h._name}):n.jsx(Tt,{size:17})}),n.jsxs("div",{className:"medical-goat-result-info",children:[n.jsx("strong",{children:h._name}),n.jsxs("span",{children:["Tag:"," ",h._tag," • ",h._breed]})]}),S&&n.jsx(Ae,{size:17})]},h._medicalGoatId)})})]})]}),n.jsxs("label",{children:["Medical Type",n.jsxs("select",{value:c.type,onChange:h=>A("type",h.target.value),children:[n.jsx("option",{value:"Treatment",children:"Treatment"}),n.jsx("option",{value:"Vaccination",children:"Vaccination"}),n.jsx("option",{value:"Medicine",children:"Medicine"}),n.jsx("option",{value:"Checkup",children:"Health Checkup"}),n.jsx("option",{value:"Injury",children:"Injury"}),n.jsx("option",{value:"Deworming",children:"Deworming"}),n.jsx("option",{value:"Other",children:"Other"})]})]}),n.jsxs("label",{children:["Date *",n.jsx("input",{type:"date",value:c.date,onChange:h=>A("date",h.target.value)})]}),n.jsxs("label",{children:["Health Status",n.jsxs("select",{value:c.status,onChange:h=>A("status",h.target.value),children:[n.jsx("option",{value:"Completed",children:"Completed"}),n.jsx("option",{value:"Ongoing",children:"Ongoing"}),n.jsx("option",{value:"Follow-up",children:"Follow-up Required"}),n.jsx("option",{value:"Recovered",children:"Recovered"}),n.jsx("option",{value:"Critical",children:"Critical"})]})]}),n.jsxs("label",{className:"medical-full-field",children:["Diagnosis / Health Issue *",n.jsx("input",{value:c.diagnosis,onChange:h=>A("diagnosis",h.target.value),placeholder:"Example: Fever, skin infection..."})]}),n.jsxs("label",{children:["Treatment",n.jsx("input",{value:c.treatment,onChange:h=>A("treatment",h.target.value),placeholder:"Treatment given"})]}),n.jsxs("label",{children:["Medicine",n.jsx("input",{value:c.medicine,onChange:h=>A("medicine",h.target.value),placeholder:"Medicine name"})]}),n.jsxs("label",{children:["Vaccine",n.jsx("input",{value:c.vaccine,onChange:h=>A("vaccine",h.target.value),placeholder:"Vaccine name"})]}),n.jsxs("label",{children:["Veterinarian",n.jsx("input",{value:c.doctor,onChange:h=>A("doctor",h.target.value),placeholder:"Veterinarian name"})]}),n.jsxs("label",{children:["Next Follow-up",n.jsx("input",{type:"date",value:c.nextDate,onChange:h=>A("nextDate",h.target.value)})]}),n.jsxs("label",{className:"medical-full-field",children:["Notes",n.jsx("textarea",{rows:"4",value:c.notes,onChange:h=>A("notes",h.target.value),placeholder:"Additional medical notes..."})]})]}),n.jsxs("div",{className:"medical-modal-actions",children:[n.jsx("button",{type:"button",className:"medical-secondary-btn",onClick:r,disabled:i,children:"Cancel"}),n.jsx("button",{type:"button",className:"medical-primary-btn",onClick:u,disabled:i,children:i?n.jsxs(n.Fragment,{children:[n.jsx(Le,{size:17,className:"spin"}),"Saving..."]}):n.jsxs(n.Fragment,{children:[n.jsx(Ae,{size:17}),a?"Update Record":"Save Record"]})})]})]})})}function kx({onBack:e}){const[t,r]=x.useState([]),[s,i]=x.useState([]),[a,l]=x.useState(!0),[c,o]=x.useState(!1),[d,v]=x.useState(""),[g,f]=x.useState(""),[j,N]=x.useState("All"),[A,O]=x.useState("All"),[m,p]=x.useState("All"),[u,h]=x.useState(!1),[S,b]=x.useState(!1),[w,_]=x.useState(null),[M,E]=x.useState(null),[L,V]=x.useState(null),B=x.useCallback(async()=>{const y=await Rr("/goats"),D=(y==null?void 0:y.goats)||(y==null?void 0:y.data)||y,ee=Nd(D).map(wx);r(ee)},[]),k=x.useCallback(async()=>{const y=await Rr("/medical-records"),D=(y==null?void 0:y.medicalRecords)||(y==null?void 0:y.records)||(y==null?void 0:y.data)||y;i(Nd(D))},[]),F=x.useCallback(async()=>{try{l(!0),v(""),await Promise.all([B(),k()])}catch(y){console.error("Medical load error:",y),v(y.message||"Unable to load medical data.")}finally{l(!1)}},[B,k]);x.useEffect(()=>{F()},[F]);const T=x.useMemo(()=>s.map((y,D)=>Nx(y,D,t)).sort((y,D)=>new Date(D._date||0).getTime()-new Date(y._date||0).getTime()),[s,t]),Q=x.useMemo(()=>{const y=T.map(D=>D._type).filter(Boolean);return["All",...Array.from(new Set(y))]},[T]),P=x.useMemo(()=>{const y=ve(g);return T.filter(D=>{const ee=!y||ve(D._goatName).includes(y)||ve(D._tag).includes(y)||ve(D._diagnosis).includes(y)||ve(D._medicine).includes(y)||ve(D._vaccine).includes(y)||ve(D._doctor).includes(y),Y=j==="All"||ve(D._type)===ve(j),H=A==="All"||ve(D._status)===ve(A),J=m==="All"||String(D._goatId)===String(m);return ee&&Y&&H&&J})},[T,g,j,A,m]),R=x.useMemo(()=>{const y=new Date;y.setHours(0,0,0,0);const D=T.filter(Z=>{if(!Z._nextDate)return!1;const vt=new Date(Z._nextDate);return vt.setHours(0,0,0,0),vt>=y}).length,ee=T.filter(Z=>ve(Z._status)==="critical").length,Y=T.filter(Z=>ve(Z._type).includes("vaccin")).length,H=T.filter(Z=>ve(Z._type).includes("treatment")).length,J=new Set(T.map(Z=>Z._goatId).filter(Boolean)).size;return{total:T.length,upcoming:D,critical:ee,vaccinations:Y,treatments:H,uniqueGoats:J}},[T]),q=x.useMemo(()=>{const y=new Date;return y.setHours(0,0,0,0),T.filter(D=>{if(!D._nextDate)return!1;const ee=new Date(D._nextDate);return ee.setHours(0,0,0,0),ee>=y}).sort((D,ee)=>new Date(D._nextDate).getTime()-new Date(ee._nextDate).getTime()).slice(0,6)},[T]),C=x.useCallback(async(y,D)=>{try{if(o(!0),v(""),D){const ee=D._id;await Rr(`/medical-records/${ee}`,{method:"PUT",body:JSON.stringify(y)})}else await Rr("/medical-records",{method:"POST",body:JSON.stringify(y)});await k(),b(!1),_(null)}catch(ee){throw console.error("Medical save error:",ee),ee}finally{o(!1)}},[k]),W=x.useCallback(async y=>{if(window.confirm(`Delete medical record for ${y._goatName}?`))try{v(""),await Rr(`/medical-records/${y._id}`,{method:"DELETE"}),await k(),E(null)}catch(ee){console.error("Medical delete error:",ee),v(ee.message||"Failed to delete medical record.")}},[k]),te=y=>{_(y),b(!0)},X=y=>{V(y)},$=()=>{typeof e=="function"&&e()};return n.jsxs("div",{className:"medical-page",children:[n.jsxs("header",{className:"medical-header",children:[n.jsxs("div",{className:"medical-header-left",children:[n.jsx("button",{type:"button",className:"medical-back-arrow",onClick:$,children:n.jsx(Oe,{size:20})}),n.jsx("div",{className:"medical-brand-icon",children:n.jsx(xn,{size:24})}),n.jsxs("div",{children:[n.jsx("span",{className:"medical-eyebrow",children:"LIVESTOCK HEALTH"}),n.jsx("h1",{children:"Medical"}),n.jsx("p",{children:"Manage real goat health, treatment and vaccination records."})]})]}),n.jsxs("div",{className:"medical-header-actions",children:[n.jsxs("button",{type:"button",className:"medical-secondary-btn",onClick:F,disabled:a,children:[n.jsx(Le,{size:17}),"Refresh"]}),n.jsxs("button",{type:"button",className:"medical-primary-btn",onClick:()=>{_(null),b(!0)},disabled:t.length===0||a,children:[n.jsx($t,{size:17}),"Add Medical Record"]})]})]}),d&&n.jsxs("div",{className:"medical-error",style:{margin:"16px"},children:[n.jsx(Hi,{size:17}),d]}),n.jsxs("section",{className:"medical-hero",children:[n.jsxs("div",{className:"medical-hero-content",children:[n.jsxs("div",{className:"medical-hero-badge",children:[n.jsx(tr,{size:15}),"MongoDB medical data"]}),n.jsx("h2",{children:"Goat health center"}),n.jsx("p",{children:"Medical records are connected directly to your backend database. No medical records are stored in localStorage."}),n.jsxs("div",{className:"medical-meta-row",children:[n.jsxs("span",{children:[n.jsx(Tt,{size:15}),t.length,"real goats"]}),n.jsxs("span",{children:[n.jsx(Yt,{size:15}),T.length,"medical records"]}),n.jsxs("span",{children:[n.jsx(Ba,{size:15}),R.vaccinations,"vaccinations"]})]})]}),n.jsxs("div",{className:"medical-hero-side",children:[n.jsxs("div",{className:"medical-live-indicator",children:[n.jsx("span",{}),"Backend connected"]}),n.jsxs("div",{className:"medical-hero-total",children:[n.jsx("strong",{children:R.uniqueGoats}),n.jsx("span",{children:"Goats with medical history"})]})]})]}),n.jsxs("section",{className:"medical-stats-grid",children:[n.jsx(Ln,{icon:Yt,label:"Total Records",value:R.total,sub:"MongoDB records"}),n.jsx(Ln,{icon:Ba,label:"Vaccinations",value:R.vaccinations,sub:"Vaccination records"}),n.jsx(Ln,{icon:xn,label:"Treatments",value:R.treatments,sub:"Treatment records"}),n.jsx(Ln,{icon:Fe,label:"Upcoming",value:R.upcoming,sub:"Follow-up dates"}),n.jsx(Ln,{icon:Hi,label:"Critical",value:R.critical,sub:"Needs attention"}),n.jsx(Ln,{icon:Tt,label:"Affected Goats",value:R.uniqueGoats,sub:"Real goats"})]}),n.jsxs("section",{className:"medical-panel",children:[n.jsxs("div",{className:"medical-panel-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"medical-panel-kicker",children:"MEDICAL SEARCH"}),n.jsx("h3",{children:"Find medical records"}),n.jsx("p",{children:"Search medical records stored in MongoDB."})]}),n.jsx(Gl,{size:20})]}),n.jsxs("div",{className:"medical-toolbar",children:[n.jsxs("div",{className:"medical-search",children:[n.jsx(Me,{size:18}),n.jsx("input",{value:g,onChange:y=>f(y.target.value),placeholder:"Search goat, tag, diagnosis, medicine..."}),g&&n.jsx("button",{type:"button",onClick:()=>f(""),children:n.jsx(le,{size:16})})]}),n.jsxs("button",{type:"button",className:`medical-filter-btn ${u?"active":""}`,onClick:()=>h(y=>!y),children:[n.jsx(ln,{size:15}),"Filters"]})]}),u&&n.jsxs("div",{className:"medical-filter-panel",children:[n.jsxs("label",{children:["Goat",n.jsxs("select",{value:m,onChange:y=>p(y.target.value),children:[n.jsx("option",{value:"All",children:"All goats"}),t.map(y=>n.jsxs("option",{value:y._medicalGoatId,children:[y._name," ","—"," ",y._tag]},y._medicalGoatId))]})]}),n.jsxs("label",{children:["Type",n.jsx("select",{value:j,onChange:y=>N(y.target.value),children:Q.map(y=>n.jsx("option",{value:y,children:y},y))})]}),n.jsxs("label",{children:["Status",n.jsxs("select",{value:A,onChange:y=>O(y.target.value),children:[n.jsx("option",{value:"All",children:"All"}),n.jsx("option",{value:"Completed",children:"Completed"}),n.jsx("option",{value:"Ongoing",children:"Ongoing"}),n.jsx("option",{value:"Follow-up",children:"Follow-up"}),n.jsx("option",{value:"Recovered",children:"Recovered"}),n.jsx("option",{value:"Critical",children:"Critical"})]})]}),n.jsx("button",{type:"button",className:"medical-clear-filter",onClick:()=>{p("All"),N("All"),O("All"),f("")},children:"Clear"})]})]}),a?n.jsx("section",{className:"medical-panel",children:n.jsx(Dr,{icon:Le,title:"Loading medical data...",description:"Fetching goats and medical records from MongoDB."})}):n.jsxs(n.Fragment,{children:[q.length>0&&n.jsxs("section",{className:"medical-panel",children:[n.jsxs("div",{className:"medical-panel-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"medical-panel-kicker",children:"FOLLOW-UP"}),n.jsx("h3",{children:"Upcoming medical dates"}),n.jsx("p",{children:"Next treatment, vaccination or health follow-up dates."})]}),n.jsx(As,{size:20})]}),n.jsx("div",{className:"medical-upcoming-list",children:q.map(y=>n.jsxs("button",{type:"button",className:"medical-upcoming-row",onClick:()=>E(y),children:[n.jsx("div",{className:"medical-upcoming-avatar",children:n.jsx(Fe,{size:17})}),n.jsxs("div",{className:"medical-upcoming-info",children:[n.jsx("strong",{children:y._goatName}),n.jsxs("span",{children:[y._type," • ",y._diagnosis]})]}),n.jsx("div",{className:"medical-upcoming-date",children:hn(y._nextDate)}),n.jsx("strong",{children:"Follow-up"})]},y._id))})]}),n.jsxs("section",{className:"medical-panel",children:[n.jsxs("div",{className:"medical-panel-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"medical-panel-kicker",children:"MEDICAL HISTORY"}),n.jsx("h3",{children:"Goat medical records"}),n.jsx("p",{children:"Actual records stored in MongoDB."})]}),n.jsxs("div",{className:"medical-goat-count",children:[P.length,n.jsxs("span",{children:["/"," ",T.length]})]})]}),t.length===0?n.jsx(Dr,{icon:Tt,title:"No goats available",description:"Add goats from the Goat Management page first."}):T.length===0?n.jsx(Dr,{icon:xn,title:"No medical records yet",description:"Click Add Medical Record to save the first record into MongoDB.",action:{label:"Add Medical Record",onClick:()=>{_(null),b(!0)}}}):P.length===0?n.jsx(Dr,{icon:Me,title:"No matching records",description:"Try another goat, diagnosis, medicine or filter."}):n.jsx("div",{className:"medical-table-wrap",children:n.jsxs("table",{className:"medical-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Goat"}),n.jsx("th",{children:"Type"}),n.jsx("th",{children:"Date"}),n.jsx("th",{children:"Diagnosis"}),n.jsx("th",{children:"Medicine"}),n.jsx("th",{children:"Veterinarian"}),n.jsx("th",{children:"Next Date"}),n.jsx("th",{children:"Status"}),n.jsx("th",{})]})}),n.jsx("tbody",{children:P.map(y=>{const D=t.find(ee=>String(ee._medicalGoatId)===String(y._goatId));return n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx("button",{type:"button",className:"medical-goat-button",onClick:()=>{D&&X(D)},children:n.jsxs("div",{className:"medical-goat-cell",children:[n.jsx("div",{className:"medical-goat-avatar",children:D!=null&&D._photo?n.jsx("img",{src:D._photo,alt:y._goatName}):n.jsx(Tt,{size:17})}),n.jsxs("div",{children:[n.jsx("strong",{children:y._goatName}),n.jsxs("span",{children:["Tag:"," ",y._tag]})]})]})})}),n.jsx("td",{children:n.jsx("span",{className:"medical-type-pill",children:y._type})}),n.jsx("td",{children:hn(y._date)}),n.jsx("td",{children:y._diagnosis}),n.jsx("td",{children:y._medicine||y._vaccine||y._treatment||"—"}),n.jsx("td",{children:y._doctor||"—"}),n.jsx("td",{children:y._nextDate?hn(y._nextDate):"—"}),n.jsx("td",{children:n.jsxs("span",{className:`medical-status-pill ${ve(y._status)==="critical"?"critical":ve(y._status)==="ongoing"?"ongoing":ve(y._status)==="recovered"?"recovered":""}`,children:[n.jsx("span",{}),y._status]})}),n.jsx("td",{children:n.jsxs("div",{className:"medical-row-actions",children:[n.jsx("button",{type:"button",className:"medical-more-btn",title:"View",onClick:()=>E(y),children:n.jsx(Yt,{size:16})}),n.jsx("button",{type:"button",className:"medical-more-btn",title:"Edit",onClick:()=>te(y),children:n.jsx(xd,{size:16})}),n.jsx("button",{type:"button",className:"medical-more-btn delete",title:"Delete",onClick:()=>W(y),children:n.jsx(zn,{size:16})})]})})]},y._id)})})]})})]}),n.jsxs("section",{className:"medical-panel",children:[n.jsxs("div",{className:"medical-panel-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"medical-panel-kicker",children:"RECENT ACTIVITY"}),n.jsx("h3",{children:"Latest medical activity"}),n.jsx("p",{children:"Most recent medical records."})]}),n.jsx(gd,{size:20})]}),T.length===0?n.jsx(Dr,{icon:gd,title:"No history",description:"Medical activity will appear here after a real record is saved."}):n.jsx("div",{className:"medical-activity-list",children:T.slice(0,8).map(y=>n.jsxs("div",{className:"medical-activity-item",children:[n.jsx("div",{className:"medical-activity-icon",children:ve(y._type).includes("vaccin")?n.jsx(Ba,{size:17}):n.jsx(xn,{size:17})}),n.jsxs("div",{className:"medical-activity-content",children:[n.jsxs("strong",{children:[y._goatName," — ",y._type]}),n.jsxs("p",{children:[y._diagnosis,y._medicine?` • ${y._medicine}`:"",y._vaccine?` • ${y._vaccine}`:""]})]}),n.jsx("time",{children:hn(y._date)})]},`activity-${y._id}`))})]})]}),M&&n.jsx("div",{className:"medical-drawer-backdrop",onMouseDown:()=>E(null),children:n.jsxs("aside",{className:"medical-drawer",onMouseDown:y=>y.stopPropagation(),children:[n.jsxs("div",{className:"medical-drawer-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"medical-eyebrow",children:"MEDICAL RECORD"}),n.jsx("h2",{children:M._goatName}),n.jsxs("p",{children:["Tag:"," ",M._tag]})]}),n.jsx("button",{type:"button",className:"medical-icon-btn",onClick:()=>E(null),children:n.jsx(le,{size:19})})]}),n.jsxs("div",{className:"medical-drawer-goat-card",children:[n.jsx("div",{className:"medical-drawer-goat-avatar",children:n.jsx(xn,{size:28})}),n.jsxs("div",{children:[n.jsx("strong",{children:M._type}),n.jsx("span",{children:M._diagnosis})]})]}),n.jsxs("div",{className:"medical-drawer-info-grid",children:[n.jsxs("div",{children:[n.jsx("span",{children:"Date"}),n.jsx("strong",{children:hn(M._date)})]}),n.jsxs("div",{children:[n.jsx("span",{children:"Status"}),n.jsx("strong",{children:M._status})]}),n.jsxs("div",{children:[n.jsx("span",{children:"Medicine"}),n.jsx("strong",{children:M._medicine||"—"})]}),n.jsxs("div",{children:[n.jsx("span",{children:"Vaccine"}),n.jsx("strong",{children:M._vaccine||"—"})]}),n.jsxs("div",{children:[n.jsx("span",{children:"Treatment"}),n.jsx("strong",{children:M._treatment||"—"})]}),n.jsxs("div",{children:[n.jsx("span",{children:"Veterinarian"}),n.jsx("strong",{children:M._doctor||"—"})]})]}),n.jsxs("div",{className:"medical-drawer-section",children:[n.jsxs("div",{className:"medical-drawer-section-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"medical-panel-kicker",children:"FOLLOW-UP"}),n.jsx("h3",{children:"Next medical date"})]}),n.jsx(Fe,{size:18})]}),n.jsx("div",{className:"medical-drawer-empty",children:M._nextDate?hn(M._nextDate):"No follow-up date"})]}),n.jsxs("div",{className:"medical-drawer-section",children:[n.jsxs("div",{className:"medical-drawer-section-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"medical-panel-kicker",children:"NOTES"}),n.jsx("h3",{children:"Medical notes"})]}),n.jsx(Yt,{size:18})]}),n.jsx("div",{className:"medical-drawer-empty",children:M._notes||"No additional notes."})]}),n.jsxs("div",{className:"medical-drawer-actions",children:[n.jsxs("button",{type:"button",className:"medical-secondary-btn",onClick:()=>{E(null),te(M)},children:[n.jsx(xd,{size:16}),"Edit"]}),n.jsxs("button",{type:"button",className:"medical-danger-btn",onClick:()=>W(M),children:[n.jsx(zn,{size:16}),"Delete"]})]})]})}),L&&n.jsx("div",{className:"medical-drawer-backdrop",onMouseDown:()=>V(null),children:n.jsxs("aside",{className:"medical-drawer",onMouseDown:y=>y.stopPropagation(),children:[n.jsxs("div",{className:"medical-drawer-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"medical-eyebrow",children:"GOAT HEALTH"}),n.jsx("h2",{children:L._name}),n.jsxs("p",{children:["Tag:"," ",L._tag]})]}),n.jsx("button",{type:"button",className:"medical-icon-btn",onClick:()=>V(null),children:n.jsx(le,{size:19})})]}),n.jsxs("div",{className:"medical-drawer-goat-card",children:[n.jsx("div",{className:"medical-drawer-goat-avatar",children:L._photo?n.jsx("img",{src:L._photo,alt:L._name}):n.jsx(Tt,{size:28})}),n.jsxs("div",{children:[n.jsx("strong",{children:L._name}),n.jsx("span",{children:L._breed})]})]}),n.jsxs("div",{className:"medical-drawer-info-grid",children:[n.jsxs("div",{children:[n.jsx("span",{children:"Gender"}),n.jsx("strong",{children:L._gender})]}),n.jsxs("div",{children:[n.jsx("span",{children:"Stage"}),n.jsx("strong",{children:L._stage})]}),n.jsxs("div",{children:[n.jsx("span",{children:"Weight"}),n.jsx("strong",{children:L._weight!==null?`${L._weight} kg`:"—"})]}),n.jsxs("div",{children:[n.jsx("span",{children:"Tag"}),n.jsx("strong",{children:L._tag})]})]}),n.jsxs("div",{className:"medical-drawer-section",children:[n.jsxs("div",{className:"medical-drawer-section-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"medical-panel-kicker",children:"HEALTH HISTORY"}),n.jsx("h3",{children:"Medical records"})]}),n.jsx(Gl,{size:18})]}),T.filter(y=>String(y._goatId)===String(L._medicalGoatId)).length===0?n.jsx("div",{className:"medical-drawer-empty",children:"No medical records available for this goat."}):n.jsx("div",{className:"medical-drawer-history",children:T.filter(y=>String(y._goatId)===String(L._medicalGoatId)).slice(0,10).map(y=>n.jsxs("button",{type:"button",className:"medical-drawer-history-row",onClick:()=>{V(null),E(y)},children:[n.jsxs("div",{children:[n.jsx("strong",{children:y._type}),n.jsx("span",{children:y._diagnosis})]}),n.jsx("span",{children:hn(y._date)})]},`goat-medical-${y._id}`))})]})]})}),S&&n.jsx(Sx,{goats:t,initialRecord:w,saving:c,onClose:()=>{c||(b(!1),_(null))},onSave:C})]})}const Cx="http://localhost:5000/api",ws="#1d5fd6",Ns="#123a8a",es="#eaf1fd",Ex=["Cash","UPI","Bank Transfer","Other"],zx=["Paid","Pending","Partial"];async function Lr(e,t={}){const r=await fetch(`${Cx}${e}`,{...t,credentials:"include",headers:{"Content-Type":"application/json",...t.headers||{}}});let s=null;try{s=await r.json()}catch{s=null}if(!r.ok)throw new Error((s==null?void 0:s.error)||(s==null?void 0:s.message)||`Request failed with status ${r.status}`);return s}const ql=e=>`₹${Number(e||0).toLocaleString("en-IN",{maximumFractionDigits:2})}`,Ax={minHeight:"100vh",background:"#f4f7fd",fontFamily:"'Segoe UI', system-ui, sans-serif",color:"#12295c"},Bn={width:"100%",height:44,boxSizing:"border-box",border:"1px solid #dfe5ef",borderRadius:10,padding:"0 13px",outline:"none",background:"#fff",color:"#1e293b",fontSize:14},Jo={border:0,borderRadius:10,padding:"11px 16px",background:`linear-gradient(135deg, ${ws}, ${Ns})`,color:"#fff",fontWeight:700,display:"flex",alignItems:"center",gap:7,cursor:"pointer"},ht={display:"block",marginBottom:7,fontSize:12,fontWeight:700,color:"#687791"},ts={width:"100%",minHeight:44,boxSizing:"border-box",border:"1px solid #dfe5ef",borderRadius:10,padding:"0 13px",display:"flex",alignItems:"center",gap:8,background:"#fff"},Zo={border:0,background:"#f3f6fb",width:36,height:36,borderRadius:9,display:"grid",placeItems:"center",cursor:"pointer",color:"#52627b"},Tx={padding:"11px 18px",borderRadius:10,border:"1px solid #dfe5ef",background:"#fff",color:"#52627b",fontWeight:700,cursor:"pointer"};function Fx(e){if(!e)return null;const t=(e==null?void 0:e._id)??(e==null?void 0:e.id)??"";return{...e,id:String(t),name:(e==null?void 0:e.name)||(e==null?void 0:e.goatName)||"Unnamed Goat",tag:(e==null?void 0:e.tagNumber)||(e==null?void 0:e.tag)||(e==null?void 0:e.tagNo)||"",breed:(e==null?void 0:e.breed)||"Unknown breed",currentWeight:Number((e==null?void 0:e.currentWeight)||0)}}function _x(e){if(!e)return null;const t=e!=null&&e.goatId&&typeof e.goatId=="object"?e.goatId:null;return{...e,id:String((e==null?void 0:e._id)??(e==null?void 0:e.id)??""),goatId:String((t==null?void 0:t._id)??(e==null?void 0:e.goatId)??""),goatName:(e==null?void 0:e.goatName)||(t==null?void 0:t.name)||"Unnamed Goat",goatTagNumber:(e==null?void 0:e.goatTagNumber)||(t==null?void 0:t.tagNumber)||(t==null?void 0:t.tag)||"",breed:(e==null?void 0:e.breed)||(t==null?void 0:t.breed)||"Unknown breed",date:(e==null?void 0:e.saleDate)||(e==null?void 0:e.date)||"",person:(e==null?void 0:e.buyerName)||(e==null?void 0:e.person)||"",amount:Number((e==null?void 0:e.salePrice)??(e==null?void 0:e.amount)??0),status:(e==null?void 0:e.paymentStatus)||(e==null?void 0:e.status)||"Paid",method:(e==null?void 0:e.paymentMethod)||(e==null?void 0:e.method)||"Cash",weight:Number((e==null?void 0:e.weight)||0),buyerPhone:(e==null?void 0:e.buyerPhone)||"",buyerAddress:(e==null?void 0:e.buyerAddress)||"",amountPaid:Number((e==null?void 0:e.amountPaid)||0),notes:(e==null?void 0:e.notes)||""}}function Mx({onBack:e,onAdd:t}){return n.jsxs(n.Fragment,{children:[n.jsxs("header",{style:{minHeight:70,padding:"0 24px",background:`linear-gradient(135deg, ${Ns}, ${ws})`,display:"flex",alignItems:"center",justifyContent:"space-between"},children:[n.jsxs("div",{onClick:e,style:{display:"flex",alignItems:"center",gap:12,color:"#fff",fontSize:21,fontWeight:750,cursor:e?"pointer":"default"},children:[e&&n.jsx(Oe,{size:22}),"Transactions"]}),n.jsxs("button",{onClick:t,style:{...Jo,background:"#fff",color:Ns},children:[n.jsx($t,{size:17}),"New"]})]}),n.jsx("div",{style:{height:4,background:"linear-gradient(90deg,#ffb648,#ff8a3d)"}})]})}function Ya({icon:e,title:t,value:r,subtitle:s}){return n.jsxs("div",{style:{background:"#fff",borderRadius:16,padding:20,boxShadow:"0 3px 14px rgba(20,30,60,.06)"},children:[n.jsx("div",{style:{width:44,height:44,borderRadius:12,background:es,display:"grid",placeItems:"center",marginBottom:14},children:e}),n.jsx("div",{style:{fontSize:13,color:"#71809a"},children:t}),n.jsx("strong",{style:{display:"block",fontSize:23,marginTop:5},children:ql(r)}),n.jsx("small",{style:{color:"#8492ac"},children:s})]})}function Sd({title:e,value:t,onChange:r,options:s}){return n.jsxs("div",{style:{marginBottom:18},children:[n.jsx("label",{style:ht,children:e}),n.jsx("select",{value:t,onChange:i=>r(i.target.value),style:{...Bn,cursor:"pointer"},children:s.map(i=>{const a=(i==null?void 0:i.value)??i,l=(i==null?void 0:i.label)??i;return n.jsx("option",{value:a,children:l},a)})})]})}function Px({goats:e,value:t,onChange:r}){const[s,i]=x.useState(""),a=e.find(o=>String(o.id)===String(t)),l=x.useMemo(()=>{const o=s.trim().toLowerCase();return o?e.filter(d=>[d.name,d.breed,d.tag,d.id].filter(Boolean).join(" ").toLowerCase().includes(o)):[]},[e,s]),c=s.trim().length>0;return a?n.jsxs("div",{style:{marginBottom:18},children:[n.jsx("label",{style:ht,children:"Select Goat *"}),n.jsxs("div",{style:{border:"1px solid #BBD0F7",background:es,borderRadius:14,padding:12,display:"flex",alignItems:"center",gap:11},children:[n.jsx("div",{style:{width:44,height:44,borderRadius:11,background:"#fff",display:"grid",placeItems:"center",fontSize:22,flexShrink:0,boxShadow:"0 2px 8px rgba(29,95,214,.08)"},children:"🐐"}),n.jsxs("div",{style:{flex:1,minWidth:0},children:[n.jsx("div",{style:{fontWeight:750,color:Ns,fontSize:14},children:a.name}),n.jsxs("div",{style:{marginTop:4,color:"#65748c",fontSize:12},children:[a.breed,a.tag?` • Tag #${a.tag}`:""]}),a.currentWeight>0&&n.jsxs("div",{style:{marginTop:3,color:"#8492ac",fontSize:11},children:["Current weight:"," ",a.currentWeight," ","kg"]})]}),n.jsx("button",{type:"button",onClick:()=>{r(""),i("")},style:{border:0,background:"#fff",width:34,height:34,borderRadius:9,display:"grid",placeItems:"center",color:"#64748B",cursor:"pointer",flexShrink:0},title:"Change goat",children:n.jsx(le,{size:16})})]})]}):n.jsxs("div",{style:{marginBottom:18},children:[n.jsx("label",{style:ht,children:"Select Goat *"}),n.jsxs("div",{style:{border:"1px solid #dfe5ef",borderRadius:14,background:"#fff",padding:10,boxShadow:c?"0 5px 18px rgba(20,30,60,.05)":"none",transition:"all .2s ease"},children:[n.jsxs("div",{style:{...ts,height:44,minHeight:44,marginBottom:c?10:0,border:c?"1px solid #BBD0F7":"1px solid #dfe5ef",boxShadow:c?"0 0 0 3px rgba(29,95,214,.06)":"none"},children:[n.jsx(Me,{size:17,color:c?ws:"#8492ac"}),n.jsx("input",{value:s,onChange:o=>i(o.target.value),placeholder:"Search goat name, tag or breed...",style:{border:0,outline:0,flex:1,minWidth:0,fontSize:13,background:"transparent",color:"#1e293b"}}),s&&n.jsx("button",{type:"button",onClick:()=>i(""),style:{border:0,background:"transparent",color:"#64748B",cursor:"pointer",display:"grid",placeItems:"center",padding:2},children:n.jsx(le,{size:15})})]}),!c&&n.jsxs("div",{style:{padding:"22px 10px 14px",textAlign:"center",color:"#8492ac"},children:[n.jsx("div",{style:{width:46,height:46,margin:"0 auto 10px",borderRadius:13,background:es,display:"grid",placeItems:"center",fontSize:22},children:"🐐"}),n.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#52627b"},children:"Search for a goat"}),n.jsx("div",{style:{marginTop:4,fontSize:11,color:"#94A3B8"},children:"Type a goat name, tag number or breed"})]}),c&&n.jsx("div",{style:{maxHeight:210,overflowY:"auto",paddingRight:2},children:l.length?n.jsxs(n.Fragment,{children:[n.jsxs("div",{style:{fontSize:11,fontWeight:700,color:"#8492ac",padding:"2px 4px 8px"},children:[l.length," goat",l.length!==1?"s":""," ","found"]}),l.map(o=>n.jsxs("button",{type:"button",onClick:()=>{r(o.id),i("")},style:{width:"100%",border:"1px solid #e5eaf2",background:"#fff",borderRadius:11,padding:10,marginBottom:7,display:"flex",alignItems:"center",gap:10,cursor:"pointer",textAlign:"left",transition:"all .18s ease"},onMouseEnter:d=>{d.currentTarget.style.background="#f7faff",d.currentTarget.style.borderColor="#BBD0F7"},onMouseLeave:d=>{d.currentTarget.style.background="#fff",d.currentTarget.style.borderColor="#e5eaf2"},children:[n.jsx("div",{style:{width:40,height:40,borderRadius:10,background:es,display:"grid",placeItems:"center",fontSize:20,flexShrink:0},children:"🐐"}),n.jsxs("div",{style:{flex:1,minWidth:0},children:[n.jsx("div",{style:{fontWeight:700,color:"#12295c",fontSize:13},children:o.name}),n.jsxs("div",{style:{marginTop:3,color:"#65748c",fontSize:11},children:[o.breed,o.tag?` • Tag #${o.tag}`:""]}),o.currentWeight>0&&n.jsxs("div",{style:{marginTop:2,color:"#94A3B8",fontSize:10},children:[o.currentWeight," ","kg"]})]}),n.jsx("div",{style:{width:28,height:28,borderRadius:8,background:"#f3f6fb",display:"grid",placeItems:"center",color:"#64748B",fontSize:18,flexShrink:0},children:"›"})]},o.id))]}):n.jsxs("div",{style:{minHeight:130,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",color:"#64748B",gap:5},children:[n.jsx("div",{style:{width:44,height:44,borderRadius:12,background:"#f3f6fb",display:"grid",placeItems:"center",fontSize:22,marginBottom:2},children:"🐐"}),n.jsx("strong",{style:{fontSize:13,color:"#52627b"},children:"No goats found"}),n.jsx("span",{style:{fontSize:11,color:"#94A3B8"},children:"Try another goat name, breed or tag number."})]})})]})]})}function Ix({item:e,goats:t,onClose:r,onSave:s,saving:i}){const[a,l]=x.useState({goatId:(e==null?void 0:e.goatId)||"",saleDate:(e==null?void 0:e.date)||new Date().toISOString().split("T")[0],salePrice:(e==null?void 0:e.amount)??"",buyerName:(e==null?void 0:e.person)||"",buyerPhone:(e==null?void 0:e.buyerPhone)||"",buyerAddress:(e==null?void 0:e.buyerAddress)||"",paymentStatus:(e==null?void 0:e.status)||"Paid",paymentMethod:(e==null?void 0:e.method)||"Cash",amountPaid:(e==null?void 0:e.amountPaid)??"",weight:(e==null?void 0:e.weight)??"",notes:(e==null?void 0:e.notes)||""}),[c,o]=x.useState(""),d=(f,j)=>{l(N=>({...N,[f]:j})),o("")},v=t.find(f=>String(f.id)===String(a.goatId))||null,g=async()=>{if(!a.goatId){o("Please select a goat.");return}if(!v){o("Selected goat was not found.");return}if(!a.saleDate){o("Please select sale date.");return}if(a.salePrice===""||Number(a.salePrice)<=0){o("Please enter a valid sale price.");return}if(!a.buyerName.trim()){o("Please enter buyer name.");return}const f=Number(a.salePrice),j=a.weight===""?Number(v.currentWeight||0):Number(a.weight);let N=a.amountPaid===""?a.paymentStatus==="Paid"?f:0:Number(a.amountPaid);if(!Number.isFinite(f)||f<=0){o("Invalid sale price.");return}if(!Number.isFinite(j)||j<0){o("Invalid weight.");return}if(!Number.isFinite(N)||N<0){o("Invalid amount paid.");return}if(N>f){o("Amount paid cannot be greater than sale price.");return}let A;N===f?A="Paid":N===0?A="Pending":A="Partial";const O={goatId:v.id,saleDate:a.saleDate,buyerName:a.buyerName.trim(),buyerPhone:a.buyerPhone.trim(),buyerAddress:a.buyerAddress.trim(),weight:j,salePrice:f,paymentStatus:A,paymentMethod:a.paymentMethod,amountPaid:N,notes:a.notes.trim()};try{await s(O,e)}catch(m){o(m.message||"Failed to save sale.")}};return n.jsx("div",{onMouseDown:r,style:{position:"fixed",inset:0,zIndex:100,padding:20,background:"rgba(9,25,55,.48)",display:"grid",placeItems:"center"},children:n.jsxs("div",{onMouseDown:f=>f.stopPropagation(),style:{width:"100%",maxWidth:600,maxHeight:"92vh",overflowY:"auto",background:"#fff",borderRadius:20},children:[n.jsxs("div",{style:{padding:"20px 22px",borderBottom:"1px solid #edf1f7",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[n.jsxs("div",{children:[n.jsx("h2",{style:{margin:0,fontSize:20},children:e?"Edit Sale":"New Sale"}),n.jsx("p",{style:{margin:"4px 0 0",color:"#8492ac",fontSize:13},children:"Record goat sale and payment"})]}),n.jsx("button",{onClick:r,style:Zo,children:n.jsx(le,{size:18})})]}),n.jsxs("div",{style:{padding:22},children:[n.jsx(Px,{goats:t,value:a.goatId,onChange:f=>d("goatId",f)}),n.jsx("label",{style:ht,children:"Sale Date *"}),n.jsx("input",{type:"date",value:a.saleDate,onChange:f=>d("saleDate",f.target.value),style:{...Bn,marginBottom:18}}),n.jsx("label",{style:ht,children:"Sale Price *"}),n.jsxs("div",{style:{...ts,marginBottom:18},children:[n.jsx("b",{style:{color:"#71809a"},children:"₹"}),n.jsx("input",{type:"number",min:"0",step:"0.01",value:a.salePrice,onChange:f=>d("salePrice",f.target.value),placeholder:"0.00",style:{border:0,outline:0,flex:1,fontSize:14}})]}),n.jsx("label",{style:ht,children:"Buyer Name *"}),n.jsx("input",{value:a.buyerName,onChange:f=>d("buyerName",f.target.value),placeholder:"Enter buyer name",style:{...Bn,marginBottom:18}}),n.jsx("label",{style:ht,children:"Buyer Phone"}),n.jsx("input",{type:"tel",value:a.buyerPhone,onChange:f=>d("buyerPhone",f.target.value),placeholder:"Enter buyer phone",style:{...Bn,marginBottom:18}}),n.jsx("label",{style:ht,children:"Buyer Address"}),n.jsx("input",{value:a.buyerAddress,onChange:f=>d("buyerAddress",f.target.value),placeholder:"Enter buyer address",style:{...Bn,marginBottom:18}}),n.jsx("label",{style:ht,children:"Weight at Sale"}),n.jsxs("div",{style:{...ts,marginBottom:18},children:[n.jsx("input",{type:"number",min:"0",step:"0.01",value:a.weight,onChange:f=>d("weight",f.target.value),placeholder:v?String(v.currentWeight||0):"0",style:{border:0,outline:0,flex:1,fontSize:14}}),n.jsx("span",{style:{color:"#71809a",fontSize:13},children:"kg"})]}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[n.jsx(Sd,{title:"Payment Status",value:a.paymentStatus,onChange:f=>d("paymentStatus",f),options:zx}),n.jsx(Sd,{title:"Payment Method",value:a.paymentMethod,onChange:f=>d("paymentMethod",f),options:Ex})]}),n.jsx("label",{style:ht,children:"Amount Paid"}),n.jsxs("div",{style:{...ts,marginBottom:18},children:[n.jsx("b",{style:{color:"#71809a"},children:"₹"}),n.jsx("input",{type:"number",min:"0",step:"0.01",value:a.amountPaid,onChange:f=>d("amountPaid",f.target.value),placeholder:"0.00",style:{border:0,outline:0,flex:1,fontSize:14}})]}),n.jsx("label",{style:ht,children:"Notes"}),n.jsx("textarea",{value:a.notes,onChange:f=>d("notes",f.target.value),placeholder:"Add sale notes...",rows:4,style:{...Bn,height:"auto",padding:12,resize:"none",marginBottom:18,fontFamily:"inherit"}}),c&&n.jsx("div",{style:{color:"#c0392b",background:"#fff3f1",padding:10,borderRadius:8,fontSize:13,marginBottom:14},children:c}),n.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10},children:[n.jsx("button",{onClick:r,disabled:i,style:Tx,children:"Cancel"}),n.jsxs("button",{onClick:g,disabled:i||!t.length,style:{...Jo,opacity:i||!t.length?.5:1},children:[n.jsx(Ae,{size:17}),i?"Saving...":e?"Update Sale":"Save Sale"]})]})]})]})})}function Rx({item:e,onEdit:t,onDelete:r}){const[s,i]=x.useState(!1),a=e.status==="Paid"?"#16824b":e.status==="Partial"?"#c77700":"#c0392b";return n.jsxs("div",{className:"transaction-card",style:{background:"#fff",borderRadius:16,padding:16,boxShadow:"0 3px 12px rgba(20,30,60,.06)",display:"flex",alignItems:"center",gap:14},children:[n.jsx("div",{style:{width:52,height:52,borderRadius:13,background:"#fff3e8",display:"grid",placeItems:"center",flexShrink:0},children:n.jsx(js,{size:24,color:"#e87524"})}),n.jsxs("div",{style:{flex:1,minWidth:0},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[n.jsx("b",{children:e.goatName}),e.goatTagNumber&&n.jsxs("span",{style:{fontSize:11,fontWeight:700,color:"#71809a",background:"#f1f4f8",padding:"3px 7px",borderRadius:5},children:["#",e.goatTagNumber]})]}),n.jsxs("div",{style:{fontSize:13,color:"#65748c",marginTop:4},children:["Sale • ",e.breed]}),n.jsxs("div",{style:{fontSize:12,color:"#8b98ac",marginTop:4},children:[e.date||"-"," • ",e.person||"No buyer"]}),e.weight>0&&n.jsxs("div",{style:{fontSize:11,color:"#8b98ac",marginTop:3},children:["Weight:"," ",e.weight," kg"," • ",e.method]})]}),n.jsxs("div",{style:{textAlign:"right",minWidth:110},children:[n.jsxs("div",{style:{fontSize:17,fontWeight:750,color:"#16824b"},children:["+",ql(e.amount)]}),n.jsx("div",{style:{fontSize:11,marginTop:4,fontWeight:700,color:a},children:e.status}),n.jsxs("div",{style:{fontSize:10,color:"#8b98ac",marginTop:3},children:["Paid:"," ",ql(e.amountPaid)]})]}),n.jsxs("div",{style:{position:"relative"},children:[n.jsx("button",{onClick:()=>i(l=>!l),style:Zo,children:n.jsx(_n,{size:18})}),s&&n.jsxs("div",{style:{position:"absolute",right:0,top:38,width:130,background:"#fff",borderRadius:10,boxShadow:"0 10px 28px rgba(20,30,60,.18)",overflow:"hidden",zIndex:20},children:[n.jsx(kd,{icon:n.jsx(xr,{size:15}),text:"Edit",onClick:()=>{i(!1),t(e)}}),n.jsx(kd,{icon:n.jsx(zn,{size:15}),text:"Delete",danger:!0,onClick:()=>{i(!1),r(e.id)}})]})]})]})}function kd({icon:e,text:t,danger:r,onClick:s}){return n.jsxs("button",{onClick:s,style:{width:"100%",border:0,background:"#fff",padding:"11px 13px",display:"flex",gap:8,alignItems:"center",color:r?"#c0392b":"#52627b",fontSize:13,fontWeight:600,cursor:"pointer",textAlign:"left"},children:[e,t]})}function Dx({onBack:e}){const[t,r]=x.useState([]),[s,i]=x.useState([]),[a,l]=x.useState("All"),[c,o]=x.useState(""),[d,v]=x.useState(!1),[g,f]=x.useState(null),[j,N]=x.useState(!0),[A,O]=x.useState(!1),[m,p]=x.useState(""),u=x.useCallback(async()=>{try{p(""),N(!0);const[B,k]=await Promise.all([Lr("/goats"),Lr("/sales")]),F=Array.isArray(B)?B:Array.isArray(B==null?void 0:B.goats)?B.goats:[],T=Array.isArray(k)?k:Array.isArray(k==null?void 0:k.sales)?k.sales:[],Q=F.map(Fx).filter(R=>R==null?void 0:R.id),P=T.map(_x).filter(R=>R==null?void 0:R.id);r(Q),i(P)}catch(B){console.error("LOAD TRANSACTIONS ERROR:",B),p(B.message||"Unable to load sales from MongoDB.")}finally{N(!1)}},[]);x.useEffect(()=>{u()},[u]);const h=async(B,k)=>{try{O(!0),p(""),k!=null&&k.id?await Lr(`/sales/${k.id}`,{method:"PUT",body:JSON.stringify(B)}):await Lr("/sales",{method:"POST",body:JSON.stringify(B)}),await u(),v(!1),f(null)}catch(F){throw console.error("SAVE SALE ERROR:",F),F}finally{O(!1)}},S=async B=>{if(!(!B||!window.confirm("Delete this sale record permanently?")))try{p(""),await Lr(`/sales/${B}`,{method:"DELETE"}),await u()}catch(F){console.error("DELETE SALE ERROR:",F),p(F.message||"Failed to delete sale.")}},b=x.useMemo(()=>{const B=c.trim().toLowerCase();return s.filter(k=>{var Q,P,R,q;const F=a==="All"||a==="Sale",T=!B||((Q=k.goatName)==null?void 0:Q.toLowerCase().includes(B))||String(k.goatTagNumber||"").toLowerCase().includes(B)||((P=k.person)==null?void 0:P.toLowerCase().includes(B))||((R=k.breed)==null?void 0:R.toLowerCase().includes(B))||((q=k.status)==null?void 0:q.toLowerCase().includes(B));return F&&T})},[s,a,c]),w=s.reduce((B,k)=>B+Number(k.amount||0),0),_=s.reduce((B,k)=>B+Number(k.amountPaid||0),0),M=Math.max(w-_,0),E=()=>{f(null),v(!0),p("")},L=B=>{f(B),v(!0),p("")},V=()=>{A||(v(!1),f(null),p(""))};return n.jsxs("div",{style:Ax,children:[n.jsx(Mx,{onBack:e,onAdd:E}),n.jsxs("main",{style:{maxWidth:1100,margin:"auto",padding:"28px 24px 80px"},children:[n.jsxs("div",{style:{marginBottom:24},children:[n.jsx("h1",{style:{margin:0,fontSize:28},children:"Sales"}),n.jsx("p",{style:{margin:"7px 0 0",color:"#71809a",fontSize:14},children:"Manage real goat sales and payments stored in MongoDB."})]}),m&&n.jsx("div",{style:{marginBottom:18,padding:13,borderRadius:10,background:"#fff3f1",color:"#c0392b",fontSize:13,fontWeight:600},children:m}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:16,marginBottom:28},children:[n.jsx(Ya,{icon:n.jsx(js,{size:22,color:"#e87524"}),title:"Total Sales",value:w,subtitle:"Total sale value"}),n.jsx(Ya,{icon:n.jsx(Ql,{size:22,color:"#16824b"}),title:"Amount Received",value:_,subtitle:"Payments received"}),n.jsx(Ya,{icon:n.jsx(lm,{size:22,color:ws}),title:"Pending Amount",value:M,subtitle:"Amount remaining"})]}),n.jsxs("section",{style:{background:"#fff",borderRadius:18,padding:20,boxShadow:"0 4px 18px rgba(20,30,60,.06)"},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14,marginBottom:18},children:[n.jsxs("div",{children:[n.jsx("h2",{style:{margin:0,fontSize:18},children:"Sale History"}),n.jsxs("small",{style:{color:"#8492ac"},children:[b.length," ","records found"]})]}),n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{onClick:u,disabled:j,style:{...Zo,opacity:j?.5:1},title:"Refresh",children:n.jsx(Le,{size:17})}),n.jsxs("button",{onClick:E,style:Jo,children:[n.jsx($t,{size:17}),"Add Sale"]})]})]}),n.jsxs("div",{style:{...ts,marginBottom:12},children:[n.jsx(Me,{size:18,color:"#8492ac"}),n.jsx("input",{value:c,onChange:B=>o(B.target.value),placeholder:"Search goat, tag, buyer, breed or status...",style:{border:0,outline:0,background:"transparent",flex:1,fontSize:14}}),c&&n.jsx("button",{type:"button",onClick:()=>o(""),style:{border:0,background:"transparent",cursor:"pointer",color:"#64748B"},children:n.jsx(le,{size:16})})]}),n.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18},children:["All","Sale"].map(B=>n.jsx("button",{onClick:()=>l(B),style:{padding:"8px 14px",borderRadius:9,border:a===B?`1px solid ${ws}`:"1px solid #dfe5ef",background:a===B?es:"#fff",color:a===B?Ns:"#65748c",fontWeight:700,fontSize:13,cursor:"pointer"},children:B==="Sale"?"Sales":"All"},B))}),j?n.jsxs("div",{style:{padding:50,textAlign:"center",color:"#71809a"},children:[n.jsx(Le,{size:24,style:{animation:"spin 1s linear infinite",marginBottom:10}}),n.jsx("div",{children:"Loading real sales from MongoDB..."})]}):n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:b.length?b.map(B=>n.jsx(Rx,{item:B,onEdit:L,onDelete:S},B.id)):n.jsxs("div",{style:{padding:50,textAlign:"center",color:"#71809a"},children:[n.jsx("div",{style:{fontSize:36,marginBottom:8},children:"🐐"}),n.jsx("strong",{children:"No sales found"}),n.jsx("div",{style:{marginTop:5,fontSize:13},children:"No demo data is being used. Create a real sale to see it here."})]})})]})]}),d&&n.jsx(Ix,{item:g,goats:t,saving:A,onClose:V,onSave:h}),n.jsx("style",{children:`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 700px) {
            main {
              padding-left: 14px !important;
              padding-right: 14px !important;
            }

            header {
              padding-left: 14px !important;
              padding-right: 14px !important;
            }
          }

          @media (max-width: 560px) {
            .transaction-card {
              flex-wrap: wrap;
            }
          }
        `})]})}const Lx=["tenant","currentTenant","tenantData"];function $x(e){try{return JSON.parse(e)}catch{return null}}function ec(){if(typeof window>"u")return null;for(const e of Lx){const t=localStorage.getItem(e);if(!t)continue;const r=$x(t);if(r&&typeof r=="object")return r}return null}function Ox(){const e=ec();return e!=null&&e.data&&Array.isArray(e.data.goats)?e.data.goats:Array.isArray(e==null?void 0:e.goats)?e.goats:[]}function Bx(){const e=ec();return e?e!=null&&e.data&&Array.isArray(e.data.weights)?e.data.weights:Array.isArray(e.weights)?e.weights:[]:[]}function Wn(e){return e?String(e._id||e.id||e.goatId||e.tagNumber||e.tag||e.tagNo||""):""}function Wx(e){return e?String(e.goatId||e.goat_id||e.animalId||e.animal_id||""):""}function Gx(e,t=[]){if(!e)return[];const r=Wn(e),s=String(e.tagNumber||e.tag||e.tagNo||""),i=t.filter(d=>{const v=Wx(d),g=String(d.tagNumber||d.tag||d.tagNo||"");return v&&v===r||s&&g&&g===s}).map((d,v)=>{const g=Number(d.weight);return{id:d._id||d.id||`scale-weight-${v}`,weight:Number.isFinite(g)?g:null,eventDate:d.date||d.createdAt||d.timestamp||null,title:d.title||"Live Scale",source:d.source||"Weighing Scale",unit:d.unit||"kg",isScaleRecord:!0}}).filter(d=>Number.isFinite(Number(d.weight))),a=Array.isArray(e.events)?e.events.filter(d=>{const v=String(d.type||"").toLowerCase(),g=String(d.title||"").toLowerCase();return v==="weight"||v==="weight check"||v==="weighing"||g.includes("weight")}).map((d,v)=>{const g=d.title||"",f=String(g).match(/(\d+(?:\.\d+)?)\s*kg/i),j=d.weight??d.value??d.amount??(f?parseFloat(f[1]):null);return{id:d.id||d._id||`event-weight-${v}`,weight:Number.isFinite(Number(j))?Number(j):null,eventDate:d.date||d.createdAt||d.timestamp||null,title:d.title||"Weight Check",source:d.source||"Weight Check",unit:d.unit||"kg",isScaleRecord:!1}}).filter(d=>Number.isFinite(Number(d.weight))):[],l=[...i,...a],c=[],o=new Set;return l.forEach(d=>{const v=d.eventDate?new Date(d.eventDate).getTime():"",g=[d.id,d.weight,v].join("-");o.has(g)||(o.add(g),c.push(d))}),c.sort((d,v)=>{const g=new Date(d.eventDate||0).getTime();return new Date(v.eventDate||0).getTime()-g}),c.map((d,v)=>{const g=c[v+1]||null,f=Number(d.weight),j=g?Number(g.weight):null,N=j!==null&&Number.isFinite(j)?f-j:null;return{...d,previousWeight:j,difference:N}})}function $n(e){if(!e)return"—";const t=new Date(e);return Number.isNaN(t.getTime())?String(e):t.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}function si(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}function Ux(e){if(!e)return"-";const t=new Date(e);if(Number.isNaN(t.getTime()))return"-";const r=new Date;let s=(r.getFullYear()-t.getFullYear())*12+(r.getMonth()-t.getMonth());r.getDate()<t.getDate()&&(s-=1),s=Math.max(0,s);const i=Math.floor(s/12);return i>0?`${i}y ${s%12}m`:`${s%12}m`}function Hx({onBack:e}){const[t,r]=x.useState([]),[s,i]=x.useState([]),[a,l]=x.useState(null),[c,o]=x.useState(""),[d,v]=x.useState(!1);x.useEffect(()=>{(()=>{const S=Ox(),b=Bx();r(S),i(b),S.length>0&&!a&&l(S[0].id||S[0]._id||S[0].tagNumber)})();const h=S=>{var M,E;const b=(S==null?void 0:S.detail)||ec(),w=Array.isArray((M=b==null?void 0:b.data)==null?void 0:M.goats)?b.data.goats:Array.isArray(b==null?void 0:b.goats)?b.goats:[],_=Array.isArray((E=b==null?void 0:b.data)==null?void 0:E.weights)?b.data.weights:Array.isArray(b==null?void 0:b.weights)?b.weights:[];r(w),i(_),w.length>0&&!w.some(L=>String(Wn(L))===String(a))&&l(Wn(w[0]))};return window.addEventListener("tenant-data-updated",h),window.addEventListener("storage",h),()=>{window.removeEventListener("tenant-data-updated",h),window.removeEventListener("storage",h)}},[a]);const g=x.useMemo(()=>t.find(u=>String(Wn(u))===String(a))||null,[t,a]),f=x.useMemo(()=>{const u=c.trim().toLowerCase();return u?t.filter(h=>[h.name,h.tagNumber,h.tag,h.tagNo,h.breed,h.gender].filter(Boolean).join(" ").toLowerCase().includes(u)):t},[t,c]),j=x.useMemo(()=>g?Gx(g,s):[],[g,s]),N=x.useMemo(()=>{if(!g)return{latest:null,previous:null,change:null,percentage:null,latestDate:"",previousDate:""};const u=j[0]||null,h=j[1]||null,S=(u==null?void 0:u.weight)!=null?Number(u.weight):null,b=(h==null?void 0:h.weight)!=null?Number(h.weight):null,w=S!==null&&b!==null?S-b:null,_=w!==null&&b!==null&&b!==0?w/b*100:null;return{latest:S,previous:b,change:w,percentage:_,latestDate:(u==null?void 0:u.eventDate)||"",previousDate:(h==null?void 0:h.eventDate)||""}},[g,j]),A=x.useMemo(()=>{const u=j.filter(b=>Number.isFinite(Number(b.weight))),h=u.length?Math.max(...u.map(b=>Number(b.weight))):null,S=u.length?Math.min(...u.map(b=>Number(b.weight))):null;return{totalChecks:u.length,highest:h,lowest:S}},[j]);function O(u){l(Wn(u)),v(!1),o("")}function m(){window.print()}function p(){if(!g)return;const u=j.map(S=>`
            <tr>
              <td>
                ${$n(S.eventDate)}
                ${S.eventDate?` · ${si(S.eventDate)}`:""}
              </td>

              <td>
                ${Number.isFinite(Number(S.weight))?Number(S.weight).toFixed(2):"-"}
                ${S.unit||"kg"}
              </td>

              <td>
                ${S.difference!==null&&Number.isFinite(Number(S.difference))?`${S.difference>0?"+":""}${Number(S.difference).toFixed(2)} kg`:"-"}
              </td>

              <td>
                ${S.isScaleRecord?"Live Scale":"Weight Check"}
              </td>
            </tr>
          `).join(""),h=window.open("","_blank","width=900,height=700");if(!h){alert("Please allow pop-ups to export the PDF.");return}h.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>
          Weight Report - ${g.name||"Goat"}
        </title>

        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #16233D;
          }

          h1 {
            color: #12336B;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }

          th,
          td {
            border: 1px solid #DCE6F9;
            padding: 10px;
            text-align: left;
          }

          th {
            background: #EEF4FF;
            color: #12336B;
          }
        </style>
      </head>

      <body>

        <h1>
          Weight Report -
          ${g.name||"Goat"}
        </h1>

        <p>
          <b>Tag:</b>
          #${g.tagNumber||"-"}

          |

          <b>Breed:</b>
          ${g.breed||"-"}

          |

          <b>Gender:</b>
          ${g.gender||"-"}
        </p>

        <p>
          <b>Latest Weight:</b>
          ${N.latest!==null?`${N.latest.toFixed(2)} kg`:"-"}
        </p>

        <h2>
          Weight History
        </h2>

        ${j.length?`
              <table>
                <tr>
                  <th>Date</th>
                  <th>Weight</th>
                  <th>Change</th>
                  <th>Source</th>
                </tr>

                ${u}
              </table>
            `:`
              <p>
                No weight records found.
              </p>
            `}

      </body>
      </html>
    `),h.document.close(),setTimeout(()=>{h.focus(),h.print()},400)}return t.length===0?n.jsxs("div",{className:"report-page",children:[n.jsx("style",{children:Qi()}),n.jsx("header",{className:"report-header",children:n.jsx("div",{className:"report-header-inner",children:n.jsxs("button",{className:"report-back",onClick:e,type:"button",children:[n.jsx(Oe,{size:20}),n.jsxs("div",{children:[n.jsx("div",{className:"report-header-title",children:"Weight Reports"}),n.jsx("div",{className:"report-header-subtitle",children:"Goat health & weight tracking"})]})]})})}),n.jsx("main",{className:"report-content",children:n.jsxs("section",{className:"report-intro",children:[n.jsxs("div",{children:[n.jsx("span",{className:"report-eyebrow",children:"HERD REPORT"}),n.jsx("h1",{children:"Goat Weight Report"}),n.jsx("p",{children:"No goats registered yet. Create a goat profile first to view weight reports."})]}),n.jsx("div",{className:"report-intro-icon",children:n.jsx(we,{size:28})})]})})]}):n.jsxs("div",{className:"report-page",children:[n.jsx("style",{children:Qi()}),n.jsx("header",{className:"report-header",children:n.jsxs("div",{className:"report-header-inner",children:[n.jsxs("button",{className:"report-back",onClick:e,type:"button",children:[n.jsx(Oe,{size:20}),n.jsxs("div",{children:[n.jsx("div",{className:"report-header-title",children:"Weight Reports"}),n.jsx("div",{className:"report-header-subtitle",children:"Goat health & weight tracking"})]})]}),n.jsxs("div",{className:"report-header-actions",children:[n.jsx("button",{className:"report-icon-btn",onClick:m,title:"Print report",type:"button",children:n.jsx(rm,{size:18})}),n.jsxs("button",{className:"report-download-btn",onClick:p,type:"button",children:[n.jsx(pa,{size:17}),"Export"]})]})]})}),n.jsxs("main",{className:"report-content",children:[n.jsxs("section",{className:"report-intro",children:[n.jsxs("div",{children:[n.jsx("span",{className:"report-eyebrow",children:"HERD REPORT"}),n.jsx("h1",{children:"Goat Weight Report"}),n.jsx("p",{children:"View latest, previous and live scale weight records."})]}),n.jsx("div",{className:"report-intro-icon",children:n.jsx(we,{size:28})})]}),n.jsxs("section",{className:"goat-selector-card",children:[n.jsxs("div",{className:"selector-label",children:[n.jsx(Tt,{size:16}),"Select goat"]}),n.jsxs("div",{className:"selector-wrapper",children:[n.jsxs("button",{className:"goat-selector",onClick:()=>v(!d),type:"button",children:[g?n.jsxs("div",{className:"selected-goat-content",children:[n.jsx("div",{className:"mini-goat-avatar",children:"🐐"}),n.jsxs("div",{children:[n.jsx("strong",{children:g.name||"Unnamed"}),n.jsxs("span",{children:[g.breed||"Breed unknown"," · Tag #",g.tagNumber||g.tag||g.tagNo||"—"]})]})]}):n.jsx("span",{className:"placeholder-text",children:"Select a goat"}),n.jsx(ln,{size:19})]}),d&&n.jsxs("div",{className:"goat-dropdown",children:[n.jsxs("div",{className:"dropdown-search",children:[n.jsx(Me,{size:16}),n.jsx("input",{value:c,onChange:u=>o(u.target.value),placeholder:"Search goat...",autoFocus:!0}),c&&n.jsx("button",{type:"button",onClick:()=>o(""),children:n.jsx(le,{size:15})})]}),n.jsx("div",{className:"dropdown-list",children:f.length===0?n.jsx("div",{className:"dropdown-empty",children:"No goats found"}):f.map(u=>n.jsxs("button",{className:"dropdown-goat",onClick:()=>O(u),type:"button",children:[n.jsx("div",{className:"mini-goat-avatar",children:"🐐"}),n.jsxs("div",{children:[n.jsx("strong",{children:u.name||"Unnamed"}),n.jsxs("span",{children:[u.breed||"Breed unknown"," · Tag #",u.tagNumber||u.tag||u.tagNo||"—"]})]})]},Wn(u)))})]})]})]}),g&&n.jsxs("div",{className:"print-area",children:[n.jsxs("section",{className:"goat-profile-card",children:[n.jsxs("div",{className:"goat-profile-main",children:[n.jsx("div",{className:"large-goat-avatar",children:"🐐"}),n.jsxs("div",{children:[n.jsx("span",{className:"profile-label",children:"GOAT PROFILE"}),n.jsx("h2",{children:g.name||"Unnamed Goat"}),n.jsxs("div",{className:"profile-meta",children:[n.jsxs("span",{children:[n.jsx(Vl,{size:14}),"Tag #",g.tagNumber||g.tag||g.tagNo||"—"]}),n.jsxs("span",{children:[n.jsx(Tt,{size:14}),g.breed||"Breed unknown"]}),n.jsxs("span",{children:[n.jsx(Ko,{size:14}),g.gender||"—"]})]})]})]}),n.jsxs("div",{className:"profile-date",children:[n.jsx("span",{children:"REPORT GENERATED"}),n.jsx("strong",{children:$n(new Date)})]})]}),n.jsxs("section",{className:"weight-summary-grid",children:[n.jsx(ii,{label:"Latest Weight",value:N.latest!==null?`${N.latest.toFixed(2)} kg`:"—",date:N.latestDate?`${$n(N.latestDate)} · ${si(N.latestDate)}`:"No weight",icon:n.jsx(we,{size:20})}),n.jsx(ii,{label:"Previous Weight",value:N.previous!==null?`${N.previous.toFixed(2)} kg`:"—",date:N.previousDate?`${$n(N.previousDate)} · ${si(N.previousDate)}`:"No previous weight",icon:n.jsx(Fe,{size:20})}),n.jsx(ii,{label:"Total Checks",value:A.totalChecks,date:"Weight check records",icon:n.jsx(Yt,{size:20})}),n.jsx(ii,{label:"Highest Weight",value:A.highest!==null?`${A.highest.toFixed(2)} kg`:"—",date:"Maximum recorded",icon:n.jsx(js,{size:20})})]}),n.jsxs("section",{className:"weight-change-card",children:[n.jsxs("div",{className:"weight-change-left",children:[n.jsx("div",{className:"summary-icon",children:N.change>0?n.jsx(js,{size:20}):N.change<0?n.jsx(um,{size:20}):n.jsx(tm,{size:20})}),n.jsxs("div",{children:[n.jsx("span",{children:"Weight Change"}),n.jsx("strong",{children:N.change!==null?`${N.change>0?"+":""}${N.change.toFixed(2)} kg`:"—"})]})]}),n.jsx("div",{className:"weight-change-right",children:N.percentage!==null?`${N.percentage>0?"+":""}${N.percentage.toFixed(1)}%`:"Need 2 checks"})]}),n.jsxs("section",{className:"details-card",children:[n.jsx("div",{className:"section-heading",children:n.jsxs("div",{children:[n.jsx("span",{className:"section-eyebrow",children:"DETAILS"}),n.jsx("h3",{children:"Goat information"})]})}),n.jsxs("div",{className:"details-grid",children:[n.jsx(Bt,{label:"Goat Name",value:g.name||"—"}),n.jsx(Bt,{label:"Tag Number",value:`#${g.tagNumber||g.tag||g.tagNo||"—"}`}),n.jsx(Bt,{label:"Breed",value:g.breed||"—"}),n.jsx(Bt,{label:"Gender",value:g.gender||"—"}),n.jsx(Bt,{label:"Date of Birth",value:$n(g.dob)}),n.jsx(Bt,{label:"Age",value:Ux(g.dob)}),n.jsx(Bt,{label:"Current Weight",value:N.latest!==null?`${N.latest.toFixed(2)} kg`:"—"}),n.jsx(Bt,{label:"Stage",value:g.stage||"—"})]})]}),n.jsxs("section",{className:"history-card",children:[n.jsxs("div",{className:"section-heading history-heading",children:[n.jsxs("div",{children:[n.jsx("span",{className:"section-eyebrow",children:"WEIGHT TRACKING"}),n.jsx("h3",{children:"Weight history"}),n.jsx("p",{children:"All recorded weight checks for this goat."})]}),n.jsxs("div",{className:"history-count",children:[j.length," ","records"]})]}),n.jsx("div",{className:"weight-history-list",children:j.length===0?n.jsx("div",{style:{padding:"20px",textAlign:"center",color:"#64748b"},children:"No weight records yet. Add a weight from the weighing scale page."}):j.map((u,h)=>{const S=Number(u.weight),b=u.previousWeight!==null?Number(u.previousWeight):null,w=u.difference!==null?Number(u.difference):null;return n.jsxs("div",{className:"weight-history-item",children:[n.jsx("div",{className:"weight-history-icon",children:n.jsx(we,{size:18})}),n.jsxs("div",{className:"weight-history-content",children:[n.jsxs("strong",{children:[S.toFixed(2)," ",u.unit||"kg"]}),n.jsxs("span",{children:[$n(u.eventDate)," · ",si(u.eventDate)," · ",n.jsx("b",{style:{fontWeight:600},children:u.isScaleRecord?"Live Scale":"Weight Check"})]})]}),n.jsxs("div",{style:{marginLeft:"auto",textAlign:"right"},children:[b!==null&&n.jsxs("div",{style:{fontSize:"12px",color:"#64748b"},children:["Previous:"," ",b.toFixed(2)," ","kg"]}),w!==null&&n.jsxs("strong",{style:{color:w>=0?"#059669":"#dc2626"},children:[w>=0?"+":"",w.toFixed(2)," ","kg"]})]})]},u.id||h)})})]})]})]})]})}function ii({label:e,value:t,date:r,icon:s}){return n.jsxs("div",{className:"summary-card",children:[n.jsxs("div",{className:"summary-top",children:[n.jsx("div",{className:"summary-icon",children:s}),n.jsx("span",{children:e})]}),n.jsx("strong",{className:"summary-value",children:t}),n.jsx("small",{children:r})]})}function Bt({label:e,value:t}){return n.jsxs("div",{className:"detail-item",children:[n.jsx("span",{children:e}),n.jsx("strong",{children:t})]})}const tc=["tenant","currentTenant","tenantData"],Vx=e=>{try{return JSON.parse(e)}catch{return null}},Ka=()=>{if(typeof window>"u")return null;for(const e of tc){const t=localStorage.getItem(e);if(!t)continue;const r=Vx(t);if(r&&typeof r=="object")return r}return null},Qx=()=>{if(typeof window>"u")return"tenant";for(const e of tc)if(localStorage.getItem(e)!==null)return e;return"tenant"},Yx=e=>{if(typeof window>"u")return!1;try{const t=Qx();return localStorage.setItem(t,JSON.stringify(e)),window.dispatchEvent(new CustomEvent("tenant-data-updated",{detail:e})),!0}catch(t){return console.error("FarmSetup tenant save error:",t),!1}},vr=e=>String(e??"").trim().toLowerCase(),Kx=e=>(e==null?void 0:e.id)??(e==null?void 0:e._id)??(e==null?void 0:e.goatId)??(e==null?void 0:e.goat_id)??(e==null?void 0:e.tagNumber)??(e==null?void 0:e.tag_number)??"",qx=e=>(e==null?void 0:e.name)??(e==null?void 0:e.goatName)??(e==null?void 0:e.goat_name)??(e==null?void 0:e.displayName)??(e==null?void 0:e.tagNumber)??(e==null?void 0:e.tag_number)??"Unnamed Goat",Xx=e=>(e==null?void 0:e.gender)??(e==null?void 0:e.sex)??(e==null?void 0:e.Gender)??"",Jx=e=>(e==null?void 0:e.stage)??(e==null?void 0:e.lifeStage)??(e==null?void 0:e.life_stage)??(e==null?void 0:e.category)??"",Xl=e=>(e==null?void 0:e.status)??(e==null?void 0:e.currentStatus)??(e==null?void 0:e.current_status)??"active",Cd=e=>{const t=[e==null?void 0:e.weight,e==null?void 0:e.currentWeight,e==null?void 0:e.current_weight,e==null?void 0:e.latestWeight,e==null?void 0:e.latest_weight];for(const r of t)if(r!=null&&r!==""){const s=Number(r);if(Number.isFinite(s)&&s>=0)return s}return null},Zx=e=>{const t=vr(Xl(e)),r=["sold","dead","deceased","archived","inactive","removed"];return(e==null?void 0:e.archived)===!0?!1:!r.includes(t)},ey=e=>{const t=vr(Xx(e));return t==="female"||t==="f"||t==="doe"},ty=e=>{const t=vr(Jx(e));return t==="kid"||t.includes("kid")||t.includes("young")||t.includes("baby")},ny=e=>(e==null?void 0:e.farmName)??(e==null?void 0:e.farm_name)??(e==null?void 0:e.name)??(e==null?void 0:e.ownerName)??(e==null?void 0:e.owner_name)??"My Farm",ry=e=>{const t=vr((e==null?void 0:e.type)??(e==null?void 0:e.eventType)??(e==null?void 0:e.event_type)??(e==null?void 0:e.category));return t==="weight"||t.includes("weight")||t.includes("weigh")},sy=e=>{const t=[];return e.forEach(r=>{Array.isArray(r==null?void 0:r.events)&&r.events.forEach(s=>{t.push({...s,goatId:Kx(r),goatName:qx(r)})})}),t};function iy({onBack:e}){const[t,r]=x.useState("overview"),[s,i]=x.useState([]),[a,l]=x.useState([]),[c,o]=x.useState({}),[d,v]=x.useState(""),[g,f]=x.useState({farmName:"",location:"",ownerName:"",phone:"",description:""}),[j,N]=x.useState({weightCheck:!0,weightDays:7,vaccination:!0,vaccinationDays:30,healthCheck:!0,healthDays:7,breeding:!1,breedingDays:30}),[A,O]=x.useState({liveData:!0,autoRefresh:!0,alerts:!0}),m=()=>{var X,$;const C=Ka()||{},W=Array.isArray((X=C==null?void 0:C.data)==null?void 0:X.goats)?C.data.goats:[],te=Array.isArray(($=C==null?void 0:C.data)==null?void 0:$.events)?C.data.events:[];o(C),i(W),l(te),f({farmName:(C==null?void 0:C.farmName)??(C==null?void 0:C.farm_name)??(C==null?void 0:C.name)??"",location:(C==null?void 0:C.location)??(C==null?void 0:C.farmLocation)??(C==null?void 0:C.farm_location)??"",ownerName:(C==null?void 0:C.ownerName)??(C==null?void 0:C.owner_name)??"",phone:(C==null?void 0:C.phone)??(C==null?void 0:C.mobile)??(C==null?void 0:C.phoneNumber)??"",description:(C==null?void 0:C.description)??(C==null?void 0:C.farmDescription)??""}),C!=null&&C.reminders&&typeof C.reminders=="object"&&N(y=>({...y,...C.reminders})),C!=null&&C.preferences&&typeof C.preferences=="object"&&O(y=>({...y,...C.preferences}))};x.useEffect(()=>{m()},[]),x.useEffect(()=>{const C=te=>{var D,ee;const X=(te==null?void 0:te.detail)||Ka();if(!X){m();return}const $=Array.isArray((D=X==null?void 0:X.data)==null?void 0:D.goats)?X.data.goats:[],y=Array.isArray((ee=X==null?void 0:X.data)==null?void 0:ee.events)?X.data.events:[];o(X),i($),l(y)},W=te=>{(!te.key||tc.includes(te.key))&&m()};return window.addEventListener("tenant-data-updated",C),window.addEventListener("storage",W),()=>{window.removeEventListener("tenant-data-updated",C),window.removeEventListener("storage",W)}},[]);const p=s.length,u=x.useMemo(()=>s.filter(Zx),[s]),h=u.length,S=x.useMemo(()=>u.filter(ey).length,[u]),b=x.useMemo(()=>u.filter(ty).length,[u]),w=x.useMemo(()=>sy(s),[s]),M=x.useMemo(()=>w.filter(ry),[w]).length,E=x.useMemo(()=>{if(h===0)return{score:0,label:"Needs Attention"};let C=100;const W=u.filter($=>Cd($)===null).length;if(W>0){const $=W/h;C-=Math.round($*25)}const te=u.filter($=>{const y=vr(Xl($));return y.includes("sick")||y.includes("ill")||y.includes("critical")||y.includes("quarantine")}).length;if(te>0){const $=te/h;C-=Math.round($*40)}C=Math.max(0,Math.min(100,C));let X="Excellent";return C<50?X="Needs Attention":C<75?X="Good":C<90&&(X="Very Good"),{score:C,label:X}},[h,u]),L=x.useMemo(()=>{const C=[];if(p===0)return C.push({id:"no-goats",type:"info",icon:vi,title:"No goat records found",description:"Add a real goat from Goat Management to see it here."}),C;const W=u.filter(X=>Cd(X)===null);W.length>0&&C.push({id:"missing-weight",type:"warning",icon:we,title:"Weight records need attention",description:`${W.length} active goat${W.length>1?"s":""} ${W.length>1?"do":"does"} not have a current weight record.`});const te=u.filter(X=>{const $=vr(Xl(X));return $.includes("sick")||$.includes("ill")||$.includes("critical")||$.includes("quarantine")});return te.length>0&&C.push({id:"health-alert",type:"critical",icon:Oa,title:"Goat health records need attention",description:`${te.length} active goat${te.length>1?"s":""} ${te.length>1?"have":"has"} a health-related status.`}),C.length===0&&C.push({id:"healthy",type:"info",icon:Vi,title:"No active farm alerts",description:"Your current real goat records do not show any alerts requiring attention."}),C},[u,p]),V=x.useMemo(()=>{var W,te,X,$,y,D;const C=[c==null?void 0:c.weighingDevice,c==null?void 0:c.weighing_device,(W=c==null?void 0:c.data)==null?void 0:W.weighingDevice,(te=c==null?void 0:c.data)==null?void 0:te.weighing_device,(X=c==null?void 0:c.data)==null?void 0:X.scaleDevice,($=c==null?void 0:c.data)==null?void 0:$.scale_device,(y=c==null?void 0:c.data)==null?void 0:y.esp32Device,(D=c==null?void 0:c.data)==null?void 0:D.esp32_device];for(const ee of C)if(ee&&typeof ee=="object")return ee;return null},[c]),B=!!((V==null?void 0:V.connected)??(V==null?void 0:V.isConnected)??(V==null?void 0:V.is_connected)??!1),k=x.useMemo(()=>({total:p,active:h,female:S,kids:b}),[p,h,S,b]),F=(C,W)=>{f(te=>({...te,[C]:W}))},T=()=>{var X,$,y,D;const C=Ka()||{},W={...C,farmName:g.farmName,location:g.location,ownerName:g.ownerName,phone:g.phone,description:g.description,reminders:{...j},preferences:{...A},updatedAt:new Date().toISOString(),data:{...C.data||{},goats:Array.isArray((X=C==null?void 0:C.data)==null?void 0:X.goats)?C.data.goats:[],events:Array.isArray(($=C==null?void 0:C.data)==null?void 0:$.events)?C.data.events:[]}};Yx(W)&&(o(W),i(Array.isArray((y=W==null?void 0:W.data)==null?void 0:y.goats)?W.data.goats:[]),l(Array.isArray((D=W==null?void 0:W.data)==null?void 0:D.events)?W.data.events:[]),v("Farm settings saved successfully"),window.setTimeout(()=>{v("")},2500))},Q=()=>{m(),v("Real farm data refreshed"),window.setTimeout(()=>{v("")},1800)},P=()=>{if(typeof e=="function"){e();return}window.history.length>1&&window.history.back()},R=C=>{N(W=>({...W,[C]:!W[C]}))},q=C=>{O(W=>({...W,[C]:!W[C]}))};return n.jsxs("div",{className:"farm-setup-page",children:[n.jsx("style",{children:Qi()}),n.jsxs("header",{className:"farm-setup-header",children:[n.jsxs("div",{className:"farm-header-left",children:[n.jsx("button",{className:"farm-back-btn",onClick:P,title:"Go back",children:n.jsx(Oe,{size:20})}),n.jsx("div",{className:"farm-header-icon",children:n.jsx(md,{size:22})}),n.jsxs("div",{children:[n.jsx("span",{children:"FARM MANAGEMENT"}),n.jsx("h1",{children:"Farm Setup"}),n.jsx("p",{children:"Configure and monitor your farm from one place."})]})]}),n.jsxs("div",{className:"farm-header-actions",children:[n.jsxs("div",{className:"farm-live-pill",children:[n.jsx("span",{}),"Live Data"]}),n.jsxs("button",{className:"farm-save-btn",onClick:T,children:[n.jsx(or,{size:16}),"Save Changes"]})]})]}),d&&n.jsxs("div",{className:"farm-save-message",children:[n.jsx(Vi,{size:17}),d]}),n.jsxs("main",{className:"farm-setup-container",children:[n.jsxs("section",{className:"farm-control-hero",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"farm-hero-badge",children:[n.jsx(Yl,{size:13}),"SMART FARM CONTROL CENTER"]}),n.jsx("h2",{children:ny(c)}),n.jsx("p",{children:"Monitor your actual goat records, reminders, health and farm configuration."})]}),n.jsxs("div",{className:"farm-health-score",children:[n.jsxs("div",{className:"farm-score-ring",children:[n.jsx("strong",{children:E.score}),n.jsx("span",{children:"/ 100"})]}),n.jsxs("div",{children:[n.jsx("span",{children:"FARM HEALTH"}),n.jsx("strong",{children:E.label})]})]})]}),n.jsxs("section",{className:"farm-stats-grid",children:[n.jsxs("div",{className:"farm-stat-card",children:[n.jsx("div",{className:"farm-stat-icon",children:n.jsx(An,{size:21})}),n.jsxs("div",{className:"farm-stat-content",children:[n.jsx("span",{children:"Total Goats"}),n.jsx("strong",{children:p}),n.jsx("small",{children:"From your goat records"})]})]}),n.jsxs("div",{className:"farm-stat-card",children:[n.jsx("div",{className:"farm-stat-icon",children:n.jsx(Oa,{size:21})}),n.jsxs("div",{className:"farm-stat-content",children:[n.jsx("span",{children:"Active Herd"}),n.jsx("strong",{children:h}),n.jsx("small",{children:"Currently active goats"})]})]}),n.jsxs("div",{className:"farm-stat-card",children:[n.jsx("div",{className:"farm-stat-icon",children:n.jsx(An,{size:21})}),n.jsxs("div",{className:"farm-stat-content",children:[n.jsx("span",{children:"Female"}),n.jsx("strong",{children:S}),n.jsx("small",{children:"Actual female goats"})]})]}),n.jsxs("div",{className:"farm-stat-card",children:[n.jsx("div",{className:"farm-stat-icon",children:n.jsx(Ug,{size:21})}),n.jsxs("div",{className:"farm-stat-content",children:[n.jsx("span",{children:"Kids"}),n.jsx("strong",{children:b}),n.jsx("small",{children:"Actual young goats"})]})]})]}),n.jsxs("div",{className:"farm-tab-bar",children:[n.jsxs("button",{className:t==="overview"?"active":"",onClick:()=>r("overview"),children:[n.jsx(Yl,{size:15}),"Overview"]}),n.jsxs("button",{className:t==="profile"?"active":"",onClick:()=>r("profile"),children:[n.jsx(md,{size:15}),"Farm Profile"]}),n.jsxs("button",{className:t==="reminders"?"active":"",onClick:()=>r("reminders"),children:[n.jsx(mn,{size:15}),"Reminders"]}),n.jsxs("button",{className:t==="preferences"?"active":"",onClick:()=>r("preferences"),children:[n.jsx(om,{size:15}),"Preferences"]})]}),t==="overview"&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"farm-content-grid",children:[n.jsxs("section",{className:"farm-panel",children:[n.jsxs("div",{className:"farm-panel-head",children:[n.jsxs("div",{children:[n.jsx("span",{children:"SMART MONITORING"}),n.jsx("h3",{children:"Farm Alerts"}),n.jsx("p",{children:"Alerts generated from your actual farm records."})]}),n.jsx("div",{className:"farm-panel-icon",children:n.jsx(mn,{size:19})})]}),n.jsx("div",{className:"farm-alert-list",children:L.map(C=>{const W=C.icon||vi;return n.jsxs("div",{className:`farm-alert ${C.type}`,children:[n.jsx("div",{className:"farm-alert-icon",children:n.jsx(W,{size:17})}),n.jsxs("div",{children:[n.jsx("strong",{children:C.title}),n.jsx("p",{children:C.description})]})]},C.id)})})]}),n.jsxs("section",{className:"farm-panel",children:[n.jsxs("div",{className:"farm-panel-head",children:[n.jsxs("div",{children:[n.jsx("span",{children:"DEVICE"}),n.jsx("h3",{children:"Weighing System"}),n.jsx("p",{children:"Monitor your connected weighing device."})]}),n.jsx("div",{className:"farm-panel-icon",children:n.jsx(cm,{size:19})})]}),n.jsxs("div",{className:"farm-device-card",children:[n.jsxs("div",{className:"farm-device-status",children:[n.jsx("div",{className:"farm-device-dot",style:{background:B?"#10b981":"#94a3b8"}}),n.jsxs("div",{children:[n.jsx("strong",{children:B?"Weighing Device Connected":"Weighing Device Not Connected"}),n.jsx("span",{children:B?"Live weighing data available":"Connect ESP32 weighing system to start live data"})]}),n.jsx("b",{style:{color:B?"#047857":"#64748b"},children:B?"ONLINE":"OFFLINE"})]}),n.jsxs("div",{className:"farm-device-info",children:[n.jsxs("div",{children:[n.jsx("span",{children:"Device"}),n.jsx("strong",{children:(V==null?void 0:V.name)??(V==null?void 0:V.deviceName)??"Not configured"})]}),n.jsxs("div",{children:[n.jsx("span",{children:"Connection"}),n.jsx("strong",{children:(V==null?void 0:V.connectionType)??(V==null?void 0:V.connection_type)??"USB / ESP32"})]}),n.jsxs("div",{children:[n.jsx("span",{children:"Weight Records"}),n.jsx("strong",{children:M})]}),n.jsxs("div",{children:[n.jsx("span",{children:"Live Data"}),n.jsx("strong",{children:B?"Available":"Waiting"})]})]}),n.jsxs("button",{className:"farm-outline-btn",onClick:Q,children:[n.jsx("span",{children:"Refresh device data"}),n.jsx(Hl,{size:14})]})]})]})]}),n.jsxs("section",{className:"farm-panel farm-large-panel",children:[n.jsxs("div",{className:"farm-panel-head",children:[n.jsxs("div",{children:[n.jsx("span",{children:"REAL GOAT RECORDS"}),n.jsx("h3",{children:"Herd Overview"}),n.jsx("p",{children:"This section is calculated directly from your existing goat records."})]}),n.jsx("div",{className:"farm-panel-icon",children:n.jsx(ot,{size:19})})]}),n.jsxs("div",{className:"farm-herd-grid",children:[n.jsxs("div",{children:[n.jsx("strong",{children:k.total}),n.jsx("span",{children:"Total"})]}),n.jsxs("div",{children:[n.jsx("strong",{children:k.active}),n.jsx("span",{children:"Active"})]}),n.jsxs("div",{children:[n.jsx("strong",{children:k.female}),n.jsx("span",{children:"Female"})]}),n.jsxs("div",{children:[n.jsx("strong",{children:k.kids}),n.jsx("span",{children:"Kids"})]})]}),n.jsxs("div",{className:"farm-shed-summary",style:{marginTop:"12px"},children:[n.jsx(ot,{size:24}),n.jsxs("div",{children:[n.jsx("strong",{children:h}),n.jsx("span",{children:"active goats currently available in your actual farm records"})]})]})]})]}),t==="profile"&&n.jsxs("section",{className:"farm-panel farm-large-panel",children:[n.jsxs("div",{className:"farm-panel-head",children:[n.jsxs("div",{children:[n.jsx("span",{children:"FARM INFORMATION"}),n.jsx("h3",{children:"Farm Profile"}),n.jsx("p",{children:"Update your farm information."})]}),n.jsx("div",{className:"farm-panel-icon",children:n.jsx(Qo,{size:19})})]}),n.jsxs("div",{className:"farm-form-grid",children:[n.jsxs("label",{children:["Farm Name",n.jsx("input",{type:"text",value:g.farmName,onChange:C=>F("farmName",C.target.value),placeholder:"Enter farm name"})]}),n.jsxs("label",{children:["Owner Name",n.jsx("input",{type:"text",value:g.ownerName,onChange:C=>F("ownerName",C.target.value),placeholder:"Enter owner name"})]}),n.jsxs("label",{children:["Location",n.jsx("input",{type:"text",value:g.location,onChange:C=>F("location",C.target.value),placeholder:"Enter farm location"})]}),n.jsxs("label",{children:["Phone",n.jsx("input",{type:"tel",value:g.phone,onChange:C=>F("phone",C.target.value),placeholder:"Enter phone number"})]}),n.jsxs("label",{className:"farm-full-field",children:["Farm Description",n.jsx("textarea",{rows:"5",value:g.description,onChange:C=>F("description",C.target.value),placeholder:"Enter farm description"})]})]}),n.jsx("div",{className:"farm-form-actions",children:n.jsxs("button",{className:"farm-small-btn",onClick:T,children:[n.jsx(or,{size:14}),"Save Profile"]})})]}),t==="reminders"&&n.jsxs("section",{className:"farm-panel farm-large-panel",children:[n.jsxs("div",{className:"farm-panel-head",children:[n.jsxs("div",{children:[n.jsx("span",{children:"SMART REMINDERS"}),n.jsx("h3",{children:"Farm Reminders"}),n.jsx("p",{children:"Configure reminders for your farm records."})]}),n.jsx("div",{className:"farm-panel-icon",children:n.jsx(mn,{size:19})})]}),n.jsxs("div",{className:"farm-reminder-row",children:[n.jsx("div",{className:"farm-reminder-icon",children:n.jsx(we,{size:18})}),n.jsxs("div",{className:"farm-reminder-info",children:[n.jsx("strong",{children:"Weight Check"}),n.jsx("span",{children:"Reminder for regular goat weight records."})]}),n.jsxs("div",{className:"farm-reminder-controls",children:[n.jsxs("label",{children:["Every",n.jsx("input",{type:"number",min:"1",value:j.weightDays,onChange:C=>N(W=>({...W,weightDays:Number(C.target.value)||1}))}),"days"]}),n.jsx("button",{className:`farm-toggle ${j.weightCheck?"active":""}`,onClick:()=>R("weightCheck"),children:n.jsx("span",{})})]})]}),n.jsxs("div",{className:"farm-reminder-row",children:[n.jsx("div",{className:"farm-reminder-icon",children:n.jsx(tr,{size:18})}),n.jsxs("div",{className:"farm-reminder-info",children:[n.jsx("strong",{children:"Vaccination"}),n.jsx("span",{children:"Reminder for vaccination records."})]}),n.jsxs("div",{className:"farm-reminder-controls",children:[n.jsxs("label",{children:["Every",n.jsx("input",{type:"number",min:"1",value:j.vaccinationDays,onChange:C=>N(W=>({...W,vaccinationDays:Number(C.target.value)||1}))}),"days"]}),n.jsx("button",{className:`farm-toggle ${j.vaccination?"active":""}`,onClick:()=>R("vaccination"),children:n.jsx("span",{})})]})]}),n.jsxs("div",{className:"farm-reminder-row",children:[n.jsx("div",{className:"farm-reminder-icon",children:n.jsx(Oa,{size:18})}),n.jsxs("div",{className:"farm-reminder-info",children:[n.jsx("strong",{children:"Health Check"}),n.jsx("span",{children:"Reminder for regular health monitoring."})]}),n.jsxs("div",{className:"farm-reminder-controls",children:[n.jsxs("label",{children:["Every",n.jsx("input",{type:"number",min:"1",value:j.healthDays,onChange:C=>N(W=>({...W,healthDays:Number(C.target.value)||1}))}),"days"]}),n.jsx("button",{className:`farm-toggle ${j.healthCheck?"active":""}`,onClick:()=>R("healthCheck"),children:n.jsx("span",{})})]})]}),n.jsxs("div",{className:"farm-reminder-row",children:[n.jsx("div",{className:"farm-reminder-icon",children:n.jsx(Fe,{size:18})}),n.jsxs("div",{className:"farm-reminder-info",children:[n.jsx("strong",{children:"Breeding"}),n.jsx("span",{children:"Reminder for breeding-related records."})]}),n.jsxs("div",{className:"farm-reminder-controls",children:[n.jsxs("label",{children:["Every",n.jsx("input",{type:"number",min:"1",value:j.breedingDays,onChange:C=>N(W=>({...W,breedingDays:Number(C.target.value)||1}))}),"days"]}),n.jsx("button",{className:`farm-toggle ${j.breeding?"active":""}`,onClick:()=>R("breeding"),children:n.jsx("span",{})})]})]}),n.jsxs("div",{className:"farm-reminder-note",children:[n.jsx(mn,{size:18}),n.jsxs("div",{children:[n.jsx("strong",{children:"Reminder settings"}),n.jsx("span",{children:"These settings are saved with your farm configuration. Goat-specific reminders continue to use your actual goat and event records."})]})]})]}),t==="preferences"&&n.jsxs("section",{className:"farm-panel farm-large-panel",children:[n.jsxs("div",{className:"farm-panel-head",children:[n.jsxs("div",{children:[n.jsx("span",{children:"FARM CONTROL"}),n.jsx("h3",{children:"Preferences"}),n.jsx("p",{children:"Control how Farm Setup works with your live farm data."})]}),n.jsx("div",{className:"farm-panel-icon",children:n.jsx(im,{size:19})})]}),n.jsxs("div",{className:"farm-preference-row",children:[n.jsx("div",{className:"farm-preference-icon",children:n.jsx(ot,{size:18})}),n.jsxs("div",{children:[n.jsx("strong",{children:"Live Farm Data"}),n.jsx("span",{children:"Read statistics from your actual goat records."})]}),n.jsx("button",{className:`farm-toggle ${A.liveData?"active":""}`,onClick:()=>q("liveData"),children:n.jsx("span",{})})]}),n.jsxs("div",{className:"farm-preference-row",children:[n.jsx("div",{className:"farm-preference-icon",children:n.jsx(Hl,{size:18})}),n.jsxs("div",{children:[n.jsx("strong",{children:"Automatic Updates"}),n.jsx("span",{children:"Refresh when GoatPage or EventsPage changes farm data."})]}),n.jsx("button",{className:`farm-toggle ${A.autoRefresh?"active":""}`,onClick:()=>q("autoRefresh"),children:n.jsx("span",{})})]}),n.jsxs("div",{className:"farm-preference-row",children:[n.jsx("div",{className:"farm-preference-icon",children:n.jsx(mn,{size:18})}),n.jsxs("div",{children:[n.jsx("strong",{children:"Farm Alerts"}),n.jsx("span",{children:"Show alerts generated from actual farm records."})]}),n.jsx("button",{className:`farm-toggle ${A.alerts?"active":""}`,onClick:()=>q("alerts"),children:n.jsx("span",{})})]}),n.jsxs("div",{className:"farm-reminder-note",children:[n.jsx(vi,{size:18}),n.jsxs("div",{children:[n.jsx("strong",{children:"Real data mode"}),n.jsx("span",{children:"Farm Setup does not create or use sample goat records. All goat statistics come directly from tenant.data.goats used by GoatPage."})]})]}),n.jsx("div",{className:"farm-form-actions",children:n.jsxs("button",{className:"farm-small-btn",onClick:T,children:[n.jsx(or,{size:14}),"Save Preferences"]})})]})]})]})}const ay="http://localhost:5000/api",Ed=3,zd=.05;function ly({tenant:e,onBack:t}){const[r,s]=x.useState([]),[i,a]=x.useState(""),[l,c]=x.useState(null),[o,d]=x.useState(""),[v,g]=x.useState("kg"),[f,j]=x.useState(!1),[N,A]=x.useState(null),[O,m]=x.useState("9600"),p=x.useRef(null),u=x.useRef(null),h=x.useRef(""),S=x.useRef(!0),b=x.useRef([]),[w,_]=x.useState(!1),[M,E]=x.useState(null),[L,V]=x.useState("manual"),[B,k]=x.useState(!1),[F,T]=x.useState(!0),[Q,P]=x.useState(!0),[R,q]=x.useState(""),[C,W]=x.useState("error"),[te,X]=x.useState([]);async function $(z,G={}){return fetch(`${ay}${z}`,{credentials:"include",headers:{"Content-Type":"application/json",...G.headers||{}},...G})}function y(z,G="error"){S.current&&(q(z),W(G))}function D(){b.current=[],_(!1),E(null)}async function ee(){try{T(!0);const z=await $("/goats"),G=await z.json().catch(()=>({}));if(console.log("[SCALE] GET GOATS:",z.status,G),z.status===402){y("Farm subscription is expired.","error");return}if(z.status===401){y("Session expired. Please login again.","error");return}if(!z.ok)throw new Error((G==null?void 0:G.error)||"Failed to load goats");const re=Array.isArray(G)?G:Array.isArray(G.goats)?G.goats:Array.isArray(G.data)?G.data:[];s(re)}catch(z){console.error("[SCALE] LOAD GOATS ERROR:",z),y(z.message||"Unable to load goats","error")}finally{S.current&&T(!1)}}async function Y(){try{P(!0);const z=await $("/weights"),G=await z.json().catch(()=>({}));if(console.log("[SCALE] GET WEIGHTS:",z.status,G),z.status===402){y("Farm subscription is expired.","error");return}if(z.status===401){y("Session expired. Please login again.","error");return}if(!z.ok)throw new Error((G==null?void 0:G.error)||"Failed to load weight records");const re=Array.isArray(G)?G:Array.isArray(G.weights)?G.weights:Array.isArray(G.data)?G.data:[];X(re)}catch(z){console.error("[SCALE] LOAD WEIGHTS ERROR:",z),y(z.message||"Unable to load weight records","error")}finally{S.current&&P(!1)}}x.useEffect(()=>{S.current=!0,ee(),Y();function z(){ee(),Y()}return window.addEventListener("tenant-data-updated",z),()=>{S.current=!1,window.removeEventListener("tenant-data-updated",z)}},[]);const H=x.useMemo(()=>{const z=i.trim().toLowerCase();return z?r.filter(G=>{const re=String(G.name||"").toLowerCase(),ge=String(G.tagNumber||G.tag||G.tagNo||G.tag_number||"").toLowerCase();return re.includes(z)||ge.includes(z)}):[]},[r,i]);function J(z){c(z),a(""),D(),d(""),V("manual"),y(`${z.name||"Goat"} selected`,"success")}function Z(){c(null),a(""),d(""),D(),V("manual"),q("")}function vt(z){if(!z)return null;let G=String(z).replace(/\0/g," ").replace(/[^\x20-\x7E]/g," ").trim();if(!G)return null;console.log("[SCALE] RAW DATA:",JSON.stringify(G));const re=G.match(/[-+]?\d+(?:\.\d+)?/g);if(!re||re.length===0)return null;const ge=re[re.length-1];let de=Number(ge);if(!Number.isFinite(de)||de<=0||de>1e3)return null;const He=G.toLowerCase();return(He.includes("lb")||He.includes("lbs")||He.includes("pound"))&&(de=de*.45359237),Number(de.toFixed(2))}function un(z){if(!Number.isFinite(z))return;console.log("[SCALE] PARSED KG:",z),E(z),V("scale");const G=b.current;if(G.length>0){const re=G[G.length-1];if(Math.abs(z-re)>zd){b.current=[z],_(!1),d(z.toFixed(2)),y(`Live weight: ${z.toFixed(2)} kg — waiting for stable reading...`,"error");return}}if(G.push(z),G.length>Ed&&G.shift(),G.length>=Ed){const re=Math.min(...G);if(Math.max(...G)-re<=zd){const He=G.reduce((Ct,In)=>Ct+In,0)/G.length,Sr=Number(He.toFixed(2));d(Sr.toFixed(2)),_(!0),y(`✓ Stable weight: ${Sr.toFixed(2)} kg — ready to save`,"success"),console.log("[SCALE] STABLE WEIGHT:",Sr);return}}_(!1),d(z.toFixed(2)),y(`Live weight: ${z.toFixed(2)} kg — waiting for stable reading...`,"error")}function Mn(z){if(!z)return;h.current+=z;const re=h.current.split(/\r\n|\n|\r/);h.current=re.pop()||"";for(const de of re){const He=vt(de);He!==null&&un(He)}const ge=h.current;if(ge){const de=vt(ge);de!==null&&/kg|kgs|lb|lbs|\d+\.\d+/i.test(ge)&&(un(de),h.current="")}}async function Pn(z){if(!z)return;const G=new TextDecoder;try{for(;S.current&&z.readable;){const re=z.readable.getReader();u.current=re;try{for(;;){const{value:ge,done:de}=await re.read();if(de)break;if(ge){const He=G.decode(ge,{stream:!0});console.log("[SCALE] SERIAL CHUNK:",JSON.stringify(He)),Mn(He)}}}finally{re.releaseLock(),u.current===re&&(u.current=null)}break}}catch(re){console.error("[SCALE] SERIAL READ ERROR:",re),S.current&&(j(!1),y(`Scale connection lost: ${re.message||"Serial read error"}`,"error"))}}async function sc(){if(!("serial"in navigator)){y("Web Serial is not supported. Please use Chrome or Edge.","error");return}try{if(console.log("[SCALE] Opening serial port selector..."),u.current)try{await u.current.cancel()}catch{}if(p.current)try{p.current.readable&&await p.current.close()}catch{}D(),h.current="";const z=await navigator.serial.requestPort();console.log("[SCALE] Port selected:",z),console.log(`[SCALE] Opening port with baud rate: ${O}`),await z.open({baudRate:Number(O),dataBits:8,stopBits:1,parity:"none",flowControl:"none"}),console.log("[SCALE] SERIAL PORT OPENED SUCCESSFULLY"),p.current=z,A(z),j(!0),D(),y("Scale connected. Place the goat on the scale and wait for a stable reading.","success"),Pn(z)}catch(z){if(console.error("[SCALE] CONNECTION ERROR:",z),j(!1),A(null),(z==null?void 0:z.name)==="NotFoundError"){y("No COM port selected.","error");return}if((z==null?void 0:z.name)==="NetworkError"||String((z==null?void 0:z.message)||"").toLowerCase().includes("failed to open serial port")){y("COM port could not be opened. Close any Serial Monitor / terminal using COM3 or COM4, then connect again.","error");return}y((z==null?void 0:z.message)||"Unable to connect to weighing scale.","error")}}async function nh(){try{if(console.log("[SCALE] Disconnecting..."),u.current)try{await u.current.cancel()}catch{}const z=p.current;if(z)try{z.readable&&await z.close()}catch(G){console.warn("[SCALE] PORT CLOSE WARNING:",G)}}finally{u.current=null,p.current=null,h.current="",A(null),j(!1),D(),y("Scale disconnected.","error")}}function rh(z){const G=z.target.value;d(G),V("manual"),_(!1),b.current=[]}function sh(z){const G=z.target.value;g(G),D()}async function ih(){if(console.log("[SCALE] SAVE CLICKED"),console.log("[SCALE] Selected goat:",l),console.log("[SCALE] Weight:",o),console.log("[SCALE] Unit:",v),console.log("[SCALE] Stable:",w),console.log("[SCALE] Source:",L),!l){y("Please select a goat first.","error");return}if(o===""||o===null||o===void 0){y("Please enter or receive a weight.","error");return}if(L==="scale"&&!w){y("Please wait until the scale shows a stable reading.","error");return}let z=Number(o);if(!Number.isFinite(z)||z<=0){y("Please enter a valid weight.","error");return}if(v==="lb"&&(z=z*.45359237),z=Number(z.toFixed(2)),z<=0||z>1e3){y("Weight must be between 0 and 1000 kg.","error");return}k(!0);const G=L==="scale"?"USB_Serial":"Manual",re={goatId:l._id||l.id,weight:z,recordedAt:new Date().toISOString(),notes:L==="scale"?"Stable weight received from Bluetooth serial weighing scale":"Weight entered manually",source:G};console.log("[SCALE] POST /weights PAYLOAD:",re);try{const ge=await $("/weights",{method:"POST",body:JSON.stringify(re)}),de=await ge.json().catch(()=>({}));if(console.log("[SCALE] SAVE RESPONSE:",ge.status,de),ge.status===402){y("Farm subscription is expired. Weight cannot be saved.","error");return}if(ge.status===401){y("Session expired. Please login again.","error");return}if(!ge.ok)throw new Error((de==null?void 0:de.error)||(de==null?void 0:de.details)||"Failed to save weight");const He=de==null?void 0:de.weight;He?X(Ct=>[He,...Ct]):await Y();const Sr=l._id||l.id;s(Ct=>Ct.map(In=>{const ph=In._id||In.id;return String(ph)!==String(Sr)?In:{...In,currentWeight:z,weight:z}})),c(Ct=>Ct&&{...Ct,currentWeight:z,weight:z}),y(`✓ ${z.toFixed(2)} kg saved successfully in MongoDB.`,"success"),d(""),D(),await Y()}catch(ge){console.error("[SCALE] SAVE WEIGHT ERROR:",ge),y(ge.message||"Failed to save weight.","error")}finally{S.current&&k(!1)}}x.useEffect(()=>()=>{S.current=!1,u.current&&u.current.cancel().catch(()=>{});const z=p.current;z&&z.close().catch(()=>{})},[]);function ah(z){if(!z)return"-";const G=new Date(z);return Number.isNaN(G.getTime())?"-":G.toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})}function ic(z){var G;return(z==null?void 0:z.goatName)||((G=z==null?void 0:z.goat)==null?void 0:G.name)||"Unknown Goat"}function lh(z){var G;return(z==null?void 0:z.goatTagNumber)||((G=z==null?void 0:z.goat)==null?void 0:G.tagNumber)||"-"}function oh(z){return(z==null?void 0:z._id)||(z==null?void 0:z.id)}const Fs=x.useMemo(()=>[...te].sort((z,G)=>{const re=new Date(z.recordedAt||z.createdAt||0).getTime();return new Date(G.recordedAt||G.createdAt||0).getTime()-re}).slice(0,5),[te]),ch=te.length,dh=Fs.length>0?Number(Fs[0].weight||0).toFixed(2):"0.00",uh=te.filter(z=>z.gainLoss==="Stable").length;return n.jsxs("div",{className:"weighing-page",children:[n.jsxs("header",{className:"weighing-header",children:[n.jsxs("div",{className:"weighing-header-left",children:[n.jsx("button",{type:"button",className:"weighing-back-btn",onClick:t,children:n.jsx(Oe,{size:20})}),n.jsx("div",{className:"weighing-header-icon",children:n.jsx(we,{size:25})}),n.jsxs("div",{children:[n.jsx("span",{className:"weighing-eyebrow",children:"SELSOLVE • SMART FARM"}),n.jsx("h1",{children:"Weighing Scale"}),n.jsx("p",{children:"Capture accurate goat weight directly from your digital scale."})]})]}),n.jsx("div",{className:`scale-status ${f?"connected":"disconnected"}`,children:f?n.jsxs(n.Fragment,{children:[n.jsx(cr,{size:15}),"Scale Connected"]}):n.jsxs(n.Fragment,{children:[n.jsx(Wa,{size:15}),"Scale Disconnected"]})})]}),n.jsxs("main",{className:"weighing-container",children:[n.jsxs("section",{className:"weighing-hero",children:[n.jsxs("div",{className:"weighing-hero-content",children:[n.jsxs("div",{className:"hero-badge",children:[n.jsx(ot,{size:13}),"LIVE WEIGHT CAPTURE"]}),n.jsxs("h2",{children:["Weigh smarter.",n.jsx("br",{}),"Save accurately."]}),n.jsx("p",{children:"Connect your Bluetooth serial weighing scale, wait for a stable reading, select the goat and save the final weight directly to MongoDB."})]}),n.jsxs("div",{className:"hero-scale-visual",children:[n.jsx("div",{className:"scale-circle",children:n.jsx(we,{size:30})}),n.jsxs("div",{children:[n.jsx("span",{children:"CURRENT READING"}),n.jsx("strong",{children:o?`${Number(o).toFixed(2)} ${v}`:"--.-- kg"})]})]})]}),n.jsxs("section",{className:"weighing-stats",children:[n.jsxs("div",{className:"weight-stat-card",children:[n.jsx("div",{className:"weight-stat-icon blue",children:n.jsx(we,{size:21})}),n.jsxs("div",{children:[n.jsx("span",{children:"Total Records"}),n.jsx("strong",{children:ch})]})]}),n.jsxs("div",{className:"weight-stat-card",children:[n.jsx("div",{className:"weight-stat-icon green",children:n.jsx(Vi,{size:21})}),n.jsxs("div",{children:[n.jsx("span",{children:"Latest Weight"}),n.jsxs("strong",{children:[dh," kg"]})]})]}),n.jsxs("div",{className:"weight-stat-card",children:[n.jsx("div",{className:"weight-stat-icon purple",children:n.jsx(ot,{size:21})}),n.jsxs("div",{children:[n.jsx("span",{children:"Stable Records"}),n.jsx("strong",{children:uh})]})]})]}),n.jsxs("section",{className:"weighing-content",children:[n.jsxs("div",{className:"weighing-panel",children:[n.jsxs("div",{className:"panel-heading",children:[n.jsxs("div",{children:[n.jsx("span",{children:"RECORD WEIGHT"}),n.jsx("h3",{children:"Add Goat Weight"}),n.jsx("p",{children:"Select a goat and capture the stable scale reading."})]}),n.jsx("div",{className:"panel-icon",children:n.jsx(or,{size:19})})]}),n.jsxs("div",{className:"field-group",children:[n.jsx("label",{children:"Search Goat"}),l?n.jsxs("div",{className:"selected-goat-card",children:[n.jsxs("div",{className:"selected-goat-left",children:[n.jsx("div",{className:"selected-goat-avatar",children:String(l.name||"G").charAt(0).toUpperCase()}),n.jsxs("div",{className:"selected-goat-info",children:[n.jsx("strong",{children:l.name}),n.jsxs("span",{children:["Tag:"," ",l.tagNumber||l.tag||"-"]})]})]}),n.jsxs("button",{type:"button",className:"change-goat-btn",onClick:Z,children:[n.jsx(le,{size:12,style:{marginRight:4,verticalAlign:"middle"}}),"Change"]})]}):n.jsxs("div",{className:"goat-search-wrapper",children:[n.jsx(Me,{size:17,style:{position:"absolute",left:"15px",top:"50%",transform:"translateY(-50%)",color:"#94a3b8",pointerEvents:"none",zIndex:2}}),n.jsx("input",{type:"text",value:i,onChange:z=>a(z.target.value),placeholder:"Search by goat name or tag number..."}),i.trim()&&n.jsx("div",{className:"goat-search-results",children:F?n.jsxs("div",{className:"goat-search-empty",children:[n.jsx(Le,{size:18,className:"spin"}),n.jsx("strong",{children:"Loading goats..."})]}):H.length===0?n.jsxs("div",{className:"goat-search-empty",children:[n.jsx(Me,{size:18}),n.jsx("strong",{children:"No goat found"}),n.jsx("span",{children:"Try another goat name or tag number."})]}):H.map(z=>{const G=oh(z),re=z.name||"Unnamed Goat",ge=z.tagNumber||z.tag||z.tagNo||"-";return n.jsxs("button",{type:"button",className:"goat-search-result",onClick:()=>J(z),children:[n.jsx("div",{className:"goat-result-avatar",children:re.charAt(0).toUpperCase()}),n.jsxs("div",{className:"goat-result-info",children:[n.jsx("strong",{children:re}),n.jsxs("span",{children:["Tag:"," ",ge]})]}),n.jsx("span",{className:"select-goat-text",children:"Select"})]},String(G))})})]})]}),n.jsxs("div",{className:"weight-input-section",children:[n.jsxs("div",{className:"field-group",children:[n.jsxs("label",{children:["Weight",w&&L==="scale"&&n.jsx("span",{style:{marginLeft:"8px",color:"#047857",fontSize:"10px"},children:"✓ STABLE"})]}),n.jsxs("div",{className:"weight-input-wrapper",children:[n.jsx("input",{type:"number",min:"0",step:"0.01",value:o,onChange:rh,placeholder:"0.00"}),n.jsxs("select",{value:v,onChange:sh,children:[n.jsx("option",{value:"kg",children:"kg"}),n.jsx("option",{value:"lb",children:"lb"})]})]})]}),n.jsx("button",{type:"button",className:"read-scale-btn",onClick:f?()=>{D(),y("Waiting for stable scale reading...","error")}:sc,disabled:!1,children:f?n.jsxs(n.Fragment,{children:[n.jsx(Le,{size:15}),"Read Scale"]}):n.jsxs(n.Fragment,{children:[n.jsx(we,{size:15}),"Connect Scale"]})})]}),R&&n.jsx("div",{className:`weight-message ${C==="success"?"success":""}`,children:R}),n.jsx("button",{type:"button",className:"save-weight-btn",onClick:ih,disabled:B||!l||!o||L==="scale"&&!w,children:B?n.jsxs(n.Fragment,{children:[n.jsx(Le,{size:16,className:"spin"}),"Saving..."]}):n.jsxs(n.Fragment,{children:[n.jsx(or,{size:16}),L==="scale"&&!w?"Waiting for Stable Weight":"Save Weight"]})})]}),n.jsxs("div",{className:"weighing-panel",children:[n.jsxs("div",{className:"panel-heading",children:[n.jsxs("div",{children:[n.jsx("span",{children:"SCALE CONNECTION"}),n.jsx("h3",{children:"Digital Scale"}),n.jsx("p",{children:"Bluetooth serial connection through Windows COM port."})]}),n.jsx("div",{className:"panel-icon",children:f?n.jsx(cr,{size:19}):n.jsx(Wa,{size:19})})]}),n.jsxs("div",{className:"device-card",children:[n.jsxs("div",{className:"device-top",children:[n.jsx("div",{className:"device-status-icon",children:n.jsx(we,{size:21})}),n.jsxs("div",{children:[n.jsx("strong",{children:"Bluetooth Serial"}),n.jsx("span",{children:"Standard Serial over Bluetooth"})]}),n.jsx("div",{className:`device-dot ${f?"active":""}`})]}),n.jsxs("div",{className:"device-details",children:[n.jsxs("div",{children:[n.jsx("span",{children:"STATUS"}),n.jsx("strong",{children:f?"Connected":"Disconnected"})]}),n.jsxs("div",{children:[n.jsx("span",{children:"UNIT"}),n.jsx("strong",{children:"KG"})]}),n.jsxs("div",{children:[n.jsx("span",{children:"READING"}),n.jsx("strong",{children:M!==null?`${M.toFixed(2)} kg`:"--.-- kg"})]}),n.jsxs("div",{children:[n.jsx("span",{children:"BAUD RATE"}),n.jsxs("select",{value:O,onChange:z=>m(z.target.value),disabled:f,style:{border:"none",outline:"none",background:"transparent",width:"100%",fontWeight:800,fontSize:"11px"},children:[n.jsx("option",{value:"9600",children:"9600"}),n.jsx("option",{value:"4800",children:"4800"}),n.jsx("option",{value:"19200",children:"19200"}),n.jsx("option",{value:"38400",children:"38400"}),n.jsx("option",{value:"57600",children:"57600"}),n.jsx("option",{value:"115200",children:"115200"})]})]}),n.jsxs("div",{children:[n.jsx("span",{children:"DEVICE"}),n.jsx("strong",{children:N?"Selected COM Port":"COM3 / COM4"})]}),n.jsxs("div",{children:[n.jsx("span",{children:"STABILITY"}),n.jsx("strong",{style:{color:w?"#047857":"#c2410c"},children:w?"Stable":f?"Waiting...":"Not connected"})]})]}),n.jsx("button",{type:"button",className:"connection-btn",onClick:f?nh:sc,children:f?n.jsxs(n.Fragment,{children:[n.jsx(Wa,{size:15}),"Disconnect Scale"]}):n.jsxs(n.Fragment,{children:[n.jsx(cr,{size:15}),"Connect Scale"]})})]}),n.jsxs("div",{className:"scale-tip",children:[n.jsx("div",{className:"tip-icon",children:n.jsx(ot,{size:17})}),n.jsxs("div",{children:[n.jsx("strong",{children:"Stable reading"}),n.jsx("p",{children:"Keep the goat still on the scale. SelSolve waits for 3 consecutive readings within 0.05 kg before enabling Save."})]})]})]})]}),n.jsxs("section",{className:"weighing-panel recent-panel",children:[n.jsxs("div",{className:"panel-heading",children:[n.jsxs("div",{children:[n.jsx("span",{children:"HISTORY"}),n.jsx("h3",{children:"Recent Weight Records"}),n.jsx("p",{children:"Latest weight records saved from MongoDB."})]}),n.jsx("div",{className:"panel-icon",children:n.jsx(As,{size:19})})]}),Q?n.jsxs("div",{className:"empty-weight-state",children:[n.jsx(Le,{size:24,className:"spin"}),n.jsx("strong",{children:"Loading records..."})]}):Fs.length===0?n.jsxs("div",{className:"empty-weight-state",children:[n.jsx("div",{className:"empty-icon",children:n.jsx(we,{size:23})}),n.jsx("strong",{children:"No weight records yet"}),n.jsx("span",{children:"Saved weight records will appear here."})]}):n.jsxs("div",{className:"weight-table",children:[n.jsxs("div",{className:"weight-table-head",children:[n.jsx("span",{children:"Goat"}),n.jsx("span",{children:"Weight"}),n.jsx("span",{children:"Change"}),n.jsx("span",{children:"Recorded"})]}),Fs.map(z=>n.jsxs("div",{className:"weight-table-row",children:[n.jsxs("div",{className:"goat-cell",children:[n.jsx("div",{className:"goat-avatar",children:String(ic(z)).charAt(0).toUpperCase()}),n.jsxs("div",{style:{minWidth:0},children:[n.jsx("strong",{children:ic(z)}),n.jsxs("div",{style:{marginTop:"3px",fontSize:"9px",color:"#94a3b8"},children:["Tag:"," ",lh(z)]})]})]}),n.jsxs("strong",{children:[Number(z.weight||0).toFixed(2)," ","kg"]}),n.jsx("span",{children:Number(z.difference||0)>0?`+${Number(z.difference).toFixed(2)} kg`:`${Number(z.difference||0).toFixed(2)} kg`}),n.jsx("span",{children:ah(z.recordedAt||z.createdAt)})]},z._id||z.id))]})]})]})]})}const oy=14;function cy(){const e=new Date,t=new Date(e);return t.setDate(t.getDate()+oy),{status:"trial",trialStartedAt:e.toISOString(),trialEndsAt:t.toISOString(),subscriptionStartedAt:null,subscriptionEndsAt:null,plan:null,amount:0,paymentStatus:null,paymentId:null}}function nc(e){if(!e||!e.trialEndsAt)return 0;const t=new Date,s=new Date(e.trialEndsAt).getTime()-t.getTime();return s<=0?0:Math.ceil(s/(1e3*60*60*24))}function rc(e){if(!e||!e.trialEndsAt)return!1;const t=new Date,r=new Date(e.trialEndsAt);return t<r}function Ad(e){if(!e||!e.trialEndsAt)return!0;const t=new Date,r=new Date(e.trialEndsAt);return t>=r}function dy(e){return nc(e)===1&&rc(e)}function th(e){if(!e||e.status!=="active"||!e.subscriptionEndsAt)return!1;const t=new Date,r=new Date(e.subscriptionEndsAt);return t<r}function uy(e){return th(e)}function py(e){if(!th(e))return 0;const t=new Date,s=new Date(e.subscriptionEndsAt).getTime()-t.getTime();return s<=0?0:Math.ceil(s/(1e3*60*60*24))}function hy(e){return py(e)}const fy="/Goat-Management-System/assets/qr-I6fw4W7a.jpeg",gy={monthly:{id:"monthly",name:"Monthly Plan",price:350,durationDays:30,durationText:"1 month",periodText:"per month"},yearly:{id:"yearly",name:"Yearly Plan",price:2500,durationDays:365,durationText:"1 year",periodText:"per year"}},ai="gnanavelpandian129-4@okicici",On={accountNumber:"066702000010430",accountName:"M/S NEW SELVAM SCALES",accountType:"CAA - GOLD",ifscCode:"IOBA0000797",status:"Active"};function my({tenant:e,onBack:t,onSubscriptionUpdated:r}){const[s,i]=x.useState(!1),[a,l]=x.useState(""),[c,o]=x.useState(""),[d,v]=x.useState(!1),[g,f]=x.useState(!1),[j,N]=x.useState("monthly"),A=(e==null?void 0:e.subscription)||null,O=rc(A),m=uy(A),p=nc(A),u=hy(A),h=gy[j],S=x.useMemo(()=>m?"paid":O?"trial":"expired",[m,O]),w={trial:{label:"FREE TRIAL",title:"Your free trial is active",days:p,icon:As,className:"status-trial"},paid:{label:"ACTIVE PLAN",title:"Your Farm Access is active",days:u,icon:tr,className:"status-paid"},expired:{label:"ACCESS EXPIRED",title:"Choose a plan to continue",days:0,icon:Ul,className:"status-expired"}}[S],_=w.icon;function M(){l(""),o(""),f(!1),v(!0)}function E(){const F=h.price,T=`SelSolve ${h.name}`;return`upi://pay?pa=${encodeURIComponent(ai)}&pn=${encodeURIComponent(On.accountName)}&am=${encodeURIComponent(F)}&cu=INR&tn=${encodeURIComponent(T)}`}function L(){l(""),o("");const F=E();console.log("Opening UPI:",F);try{window.location.assign(F),setTimeout(()=>{o("UPI app could not be opened on this device. Please scan the QR code using Google Pay, PhonePe, Paytm or another UPI app.")},1200)}catch(T){console.error("UPI app opening failed:",T),o("Unable to open UPI app. Please use the QR code or copy the UPI ID.")}}function V(){s||(v(!1),o(""))}async function B(){try{await navigator.clipboard.writeText(ai),f(!0),o(""),setTimeout(()=>{f(!1)},1800)}catch(F){console.error("Unable to copy UPI ID:",F),o("Unable to copy UPI ID. Please copy it manually.")}}async function k(){if(!s){i(!0),l(""),o("");try{const F=await vm({plan:j,amount:h.price,paymentMethod:"UPI",paymentReceiver:ai});console.log("PAYMENT REQUEST CREATED:",F),v(!1),l("Payment request submitted successfully. Your subscription will be activated after owner verification."),r&&(F!=null&&F.subscription)&&r(F.subscription)}catch(F){if(console.error("Payment request error:",F),(F==null?void 0:F.status)===409){o("You already have a pending payment request. Please wait for the owner to verify it."),v(!1);return}if(jm(F)){o((F==null?void 0:F.message)||"Subscription access needs to be renewed.");return}if((F==null?void 0:F.status)===401){o("Your session has expired. Please log in again.");return}if((F==null?void 0:F.status)===0||(F==null?void 0:F.code)==="NETWORK_ERROR"){o("Unable to connect to the backend server. Please check whether the server is running.");return}o((F==null?void 0:F.message)||"Something went wrong while submitting your payment.")}finally{i(!1)}}}return n.jsxs("div",{className:"subscription-page",children:[n.jsxs("div",{className:"subscription-container",children:[n.jsxs("div",{className:"subscription-topbar",children:[n.jsxs("button",{className:"subscription-back",onClick:t,type:"button",children:[n.jsx(Oe,{size:17}),n.jsx("span",{children:"Back"})]}),n.jsxs("div",{className:"secure-label",children:[n.jsx(tr,{size:15}),"Secure Access"]})]}),n.jsxs("section",{className:"subscription-hero",children:[n.jsxs("div",{className:"hero-badge",children:[n.jsx(dm,{size:14}),"Simple • Affordable • No Auto Renewal"]}),n.jsxs("h1",{children:["Keep your farm",n.jsxs("span",{children:[" ","running smoothly."]})]}),n.jsx("p",{children:"Continue managing goats, weights, medical records, events and reports with one simple farm access plan."})]}),n.jsxs("section",{className:"subscription-status-card",children:[n.jsx("div",{className:`status-icon ${w.className}`,children:n.jsx(_,{size:21})}),n.jsxs("div",{className:"status-content",children:[n.jsx("div",{className:"status-label",children:w.label}),n.jsx("div",{className:"status-title",children:w.title}),S!=="expired"&&n.jsxs("div",{className:"status-days",children:[n.jsx(Fe,{size:14}),n.jsxs("span",{children:[w.days," ",w.days===1?"day":"days"," ","remaining"]})]})]}),n.jsxs("div",{className:`status-pill ${w.className}`,children:[S==="trial"&&"FREE",S==="paid"&&"ACTIVE",S==="expired"&&"LOCKED"]})]}),n.jsxs("section",{className:"plan-wrapper",children:[n.jsx("div",{className:"plan-glow"}),n.jsxs("div",{className:"plan-card",children:[n.jsxs("div",{className:"plan-header",children:[n.jsxs("div",{className:"plan-header-left",children:[n.jsx("div",{className:"plan-icon",children:n.jsx(Yg,{size:22})}),n.jsxs("div",{children:[n.jsx("div",{className:"plan-small-title",children:"MY GOAT MANAGER"}),n.jsx("h2",{children:"Farm Access"}),n.jsx("p",{children:"Choose the plan that works for you"})]})]}),n.jsxs("div",{className:"best-value",children:[n.jsx(Yl,{size:13}),"Best Value"]})]}),n.jsxs("div",{className:"plan-selector",children:[n.jsxs("button",{type:"button",className:`plan-option ${j==="monthly"?"active":""}`,onClick:()=>N("monthly"),children:[n.jsx("div",{className:"plan-option-radio",children:j==="monthly"&&n.jsx("span",{})}),n.jsxs("div",{className:"plan-option-content",children:[n.jsx("strong",{children:"Monthly"}),n.jsx("span",{children:"₹350 / month"})]})]}),n.jsxs("button",{type:"button",className:`plan-option ${j==="yearly"?"active":""}`,onClick:()=>N("yearly"),children:[n.jsx("div",{className:"plan-option-radio",children:j==="yearly"&&n.jsx("span",{})}),n.jsxs("div",{className:"plan-option-content",children:[n.jsx("strong",{children:"Yearly"}),n.jsx("span",{children:"₹2,500 / year"})]}),n.jsx("small",{children:"Save ₹1,700"})]})]}),n.jsxs("div",{className:"plan-body",children:[n.jsxs("div",{className:"price-section",children:[n.jsxs("div",{className:"price-row",children:[n.jsx("span",{className:"currency",children:"₹"}),n.jsx("span",{className:"price",children:h.price})]}),n.jsx("div",{className:"price-period",children:h.periodText})]}),n.jsxs("div",{className:"price-note",children:[n.jsx(Ae,{size:15}),n.jsxs("span",{children:["Full farm access for"," ",h.durationText]})]}),n.jsx("div",{className:"feature-grid",children:["Goat Management","Weight Tracking","Medical Records","Events & Breeding","Reports & Analytics","Farm Setup","Sales & Transactions","Full App Access"].map(F=>n.jsxs("div",{className:"feature-item",children:[n.jsx("span",{className:"feature-check",children:n.jsx(Ae,{size:14})}),n.jsx("span",{children:F})]},F))}),a&&n.jsxs("div",{className:"payment-success",children:[n.jsx(Ae,{size:18}),n.jsx("span",{children:a})]}),c&&!d&&n.jsxs("div",{className:"payment-error",children:[n.jsx(le,{size:18}),n.jsx("span",{children:c})]}),n.jsx("button",{className:`subscribe-button ${s?"processing":""}`,onClick:M,disabled:s,type:"button",children:m?n.jsxs(n.Fragment,{children:[n.jsx(Hl,{size:18}),"Renew for ₹",h.price]}):n.jsxs(n.Fragment,{children:[n.jsx($a,{size:18}),"Pay ₹",h.price," ","via UPI"]})}),n.jsxs("div",{className:"payment-security",children:[n.jsx(Ul,{size:13}),n.jsx("span",{children:"Secure payment • No automatic renewal"})]})]})]})]}),n.jsxs("section",{className:"access-summary",children:[n.jsx("div",{className:"summary-header",children:n.jsxs("div",{children:[n.jsx("span",{className:"summary-kicker",children:"YOUR ACCESS"}),n.jsx("h3",{children:"Simple pricing. No surprises."})]})}),n.jsxs("div",{className:"summary-flow",children:[n.jsxs("div",{className:"summary-step",children:[n.jsx("div",{className:"step-number",children:"01"}),n.jsxs("div",{children:[n.jsx("strong",{children:"14 Days Free"}),n.jsx("span",{children:"Try the complete app"})]})]}),n.jsx("div",{className:"flow-line"}),n.jsxs("div",{className:"summary-step",children:[n.jsx("div",{className:"step-number",children:"02"}),n.jsxs("div",{children:[n.jsx("strong",{children:"Choose Plan"}),n.jsx("span",{children:"₹350 monthly / ₹2,500 yearly"})]})]}),n.jsx("div",{className:"flow-line"}),n.jsxs("div",{className:"summary-step",children:[n.jsx("div",{className:"step-number",children:"03"}),n.jsxs("div",{children:[n.jsx("strong",{children:"Full Access"}),n.jsx("span",{children:"After payment verification"})]})]})]})]}),n.jsxs("div",{className:"subscription-footer",children:[n.jsx(tr,{size:15}),n.jsx("span",{children:"Your subscription is activated only after payment verification."})]})]}),d&&n.jsx("div",{className:"qr-overlay",onClick:V,children:n.jsxs("div",{className:"qr-modal",onClick:F=>F.stopPropagation(),children:[n.jsxs("div",{className:"qr-modal-header",children:[n.jsxs("div",{children:[n.jsx("div",{className:"qr-kicker",children:"SECURE PAYMENT"}),n.jsx("h2",{children:"Scan & Pay"}),n.jsx("p",{children:h.name})]}),n.jsx("button",{className:"qr-close",onClick:V,disabled:s,type:"button",children:n.jsx(le,{size:19})})]}),n.jsxs("button",{type:"button",onClick:L,disabled:s,className:"upi-app-button",children:[n.jsx($a,{size:18}),"Pay ₹",h.price," ","via UPI App"]}),n.jsx("div",{className:"upi-app-help",children:"This works on mobile devices with a UPI app installed. On laptop, please use the QR code below."}),c&&d&&n.jsxs("div",{className:"payment-error qr-upi-error",children:[n.jsx(le,{size:18}),n.jsx("span",{children:c})]}),n.jsx("div",{style:{textAlign:"center",marginBottom:"12px",fontSize:"12px",fontWeight:700,color:"#64748b",letterSpacing:"0.04em"},children:"OR SCAN QR CODE"}),n.jsxs("div",{className:"qr-payment-area",children:[n.jsx("div",{className:"qr-box",children:n.jsx("img",{src:fy,alt:"UPI Payment QR",style:{width:"100%",height:"100%",objectFit:"contain",display:"block"}})}),n.jsxs("div",{className:"qr-scan-text",children:[n.jsx(sm,{size:17}),n.jsx("span",{children:"Scan this QR using Google Pay, PhonePe, Paytm or BHIM."})]})]}),n.jsxs("div",{className:"qr-amount-card",children:[n.jsxs("div",{children:[n.jsx("span",{children:"Selected plan"}),n.jsx("strong",{children:h.name})]}),n.jsxs("strong",{children:["₹",h.price]})]}),n.jsxs("div",{className:"upi-id-box",children:[n.jsxs("div",{children:[n.jsx("span",{children:"UPI ID"}),n.jsx("strong",{children:ai})]}),n.jsxs("button",{onClick:B,type:"button",children:[g?n.jsx(Ae,{size:17}):n.jsx(Qg,{size:17}),n.jsx("span",{children:g?"Copied":"Copy"})]})]}),n.jsxs("div",{className:"bank-details-box",children:[n.jsxs("div",{className:"bank-details-header",children:[n.jsxs("div",{children:[n.jsx("div",{className:"qr-kicker",children:"BANK TRANSFER"}),n.jsx("h3",{children:"Account Details"})]}),n.jsx(Qo,{size:19})]}),n.jsxs("div",{className:"bank-details-list",children:[n.jsxs("div",{className:"bank-detail-row",children:[n.jsx("span",{children:"Account Number"}),n.jsx("strong",{children:On.accountNumber})]}),n.jsxs("div",{className:"bank-detail-row",children:[n.jsx("span",{children:"Account Name"}),n.jsx("strong",{children:On.accountName})]}),n.jsxs("div",{className:"bank-detail-row",children:[n.jsx("span",{children:"IFSC Code"}),n.jsx("strong",{children:On.ifscCode})]}),n.jsxs("div",{className:"bank-detail-row",children:[n.jsx("span",{children:"Account Type"}),n.jsx("strong",{children:On.accountType})]}),n.jsxs("div",{className:"bank-detail-row",children:[n.jsx("span",{children:"Status"}),n.jsx("strong",{children:On.status})]})]})]}),n.jsxs("div",{className:"payment-alternative",children:[n.jsx($a,{size:16}),n.jsxs("div",{children:[n.jsx("span",{children:"Can't scan the QR?"}),n.jsxs("strong",{children:["Transfer ₹",h.price," ","using the bank details above."]})]})]}),n.jsxs("div",{className:"qr-steps",children:[n.jsxs("div",{className:"qr-step",children:[n.jsx("span",{children:"1"}),n.jsxs("div",{children:[n.jsx("strong",{children:"Make payment"}),n.jsxs("small",{children:["Pay exactly ₹",h.price]})]})]}),n.jsxs("div",{className:"qr-step",children:[n.jsx("span",{children:"2"}),n.jsxs("div",{children:[n.jsx("strong",{children:"Complete payment"}),n.jsx("small",{children:"Use UPI or bank transfer"})]})]}),n.jsxs("div",{className:"qr-step",children:[n.jsx("span",{children:"3"}),n.jsxs("div",{children:[n.jsx("strong",{children:"Submit confirmation"}),n.jsx("small",{children:"Owner will verify the payment"})]})]})]}),n.jsx("button",{className:"qr-confirm-button",onClick:k,disabled:s,type:"button",children:s?n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"button-loader"}),"Submitting..."]}):n.jsxs(n.Fragment,{children:[n.jsx(Ae,{size:18}),"I've Completed the Payment"]})}),n.jsxs("div",{className:"qr-security",children:[n.jsx(tr,{size:14}),n.jsx("span",{children:"Your subscription will not activate automatically. Payment must be verified by the owner."})]})]})})]})}const Td="selsolve-tenants-v1";function xy(){const[e,t]=x.useState("tenant-login"),[r,s]=x.useState("dashboard"),[i,a]=x.useState({}),[l,c]=x.useState(!1),[o,d]=x.useState(null),[v,g]=x.useState(null),[f,j]=x.useState(""),[,N]=x.useState(Date.now());x.useEffect(()=>{try{const M=localStorage.getItem(Td);if(M){const E=JSON.parse(M);E&&typeof E=="object"&&a(E)}}catch(M){console.error("Failed to load tenant data:",M)}finally{c(!0)}},[]),x.useEffect(()=>{if(l)try{localStorage.setItem(Td,JSON.stringify(i)),j("")}catch(M){console.error("Failed to save tenant data:",M),j("Running in this session only — saved changes may not survive a full reload.")}},[i,l]),x.useEffect(()=>{const M=setInterval(()=>{N(Date.now())},1e3);return()=>{clearInterval(M)}},[]);function A(M,E){if(console.log("AUTH SUCCESS - USER:",M),console.log("AUTH SUCCESS - TENANT:",E),!M){console.error("Authentication succeeded but user is missing.");return}if(!E){console.error("Authentication succeeded but tenant is missing.");return}const L=E._id||E.id||E.tenantId||E.slug||E.farmId||E.farmName||"";let V={...E};V.subscription||(V={...V,subscription:cy()}),g(V),d({tenantId:L,username:M.username||M.email||"",name:M.name||M.username||M.email||"User"}),t("tenant-plain"),s("dashboard"),window.scrollTo({top:0,behavior:"smooth"}),console.log("Dashboard opened successfully.")}function O(M,E){var k;const L=String(M||"").trim().toLowerCase().replace(/\s+/g,"-"),V=i[L];if(!V)return{ok:!1,error:"No farm found with that name"};if(!E)return{ok:!1,error:"Enter a valid username or email"};const B=(k=V.users)==null?void 0:k.find(F=>F.username===E||F.email===E);return B?{ok:!0,message:`Your password is: ${B.password}`}:{ok:!1,error:"No matching user found for that farm"}}const m=v||(o?i[o.tenantId]:null),p=(m==null?void 0:m.subscription)||null,u=rc(p),h=Ad(p),S=nc(p),b=dy(p);function w(M){const E=(m==null?void 0:m.subscription)||null;if(Ad(E)&&M!=="subscription"){s("subscription");return}s(M),window.scrollTo({top:0,behavior:"smooth"})}function _(){console.log("Logging out..."),d(null),g(null),t("tenant-login"),s("dashboard")}return n.jsxs("div",{className:"app-shell",style:{minHeight:"100vh",width:"100%",background:"linear-gradient(180deg, #F8FAFF 0%, #EAF2FF 100%)"},children:[f&&n.jsxs("div",{style:{position:"fixed",top:15,right:15,maxWidth:380,background:"#0F172A",color:"#fff",padding:"13px 16px",borderRadius:12,fontSize:12,zIndex:100,display:"flex",gap:10,alignItems:"center",boxShadow:"0 18px 45px rgba(15,23,42,0.2)"},children:[n.jsx("span",{style:{flex:1},children:f}),n.jsx("button",{onClick:()=>j(""),style:{border:"none",background:"transparent",color:"#fff",cursor:"pointer",fontWeight:700},children:"Close"})]}),e==="tenant-plain"&&o&&b&&n.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,zIndex:90,background:"linear-gradient(90deg,#92400E,#B45309)",color:"#fff",padding:"10px 16px",display:"flex",justifyContent:"center",alignItems:"center",gap:12,fontSize:13,fontWeight:700},children:[n.jsx("span",{children:"⚠️ Your free trial ends tomorrow."}),n.jsx("button",{onClick:()=>w("subscription"),style:{border:"none",background:"#fff",color:"#92400E",padding:"6px 12px",borderRadius:8,cursor:"pointer",fontWeight:800},children:"View Subscription"})]}),e==="tenant-login"&&n.jsx(hm,{children:n.jsx(bm,{onLogin:A,onRecoverPassword:O})}),e==="tenant-plain"&&o&&r==="subscription"&&n.jsx(my,{tenant:m,onBack:()=>{if(h){s("subscription");return}w("dashboard")}}),e==="tenant-plain"&&o&&!h&&n.jsxs(n.Fragment,{children:[r==="goats"&&n.jsx(Fm,{tenant:m,onBack:()=>w("dashboard"),onAdd:()=>{}}),r==="weightlog"&&n.jsx(Jm,{tenant:m,onBack:()=>w("dashboard"),onAdd:()=>{}}),r==="events"&&n.jsx(tx,{tenant:m,onBack:()=>w("dashboard")}),r==="vaccinations"&&n.jsx(px,{tenant:m,onBack:()=>w("dashboard"),onAdd:()=>{}}),r==="medical"&&n.jsx(kx,{tenant:m,onBack:()=>w("dashboard"),onAdd:()=>{}}),r==="farm-setup"&&n.jsx(iy,{tenant:m,onBack:()=>w("dashboard")}),r==="sales"&&n.jsx(Dx,{tenant:m,onBack:()=>w("dashboard"),onAdd:()=>{}}),r==="reports"&&n.jsx(Hx,{tenant:m,onBack:()=>w("dashboard")}),r==="weighing-scale"&&n.jsx(ly,{tenant:m,onBack:()=>w("dashboard")}),r==="dashboard"&&n.jsxs("div",{style:{minHeight:"100vh",background:"linear-gradient(180deg,#F8FAFF 0%,#EAF2FF 100%)"},children:[n.jsxs("header",{style:{background:"linear-gradient(135deg,#0F2F73 0%,#1D4ED8 55%,#2563EB 100%)",color:"#fff",padding:"26px 20px 42px",position:"relative",overflow:"hidden"},children:[n.jsx("div",{style:{position:"absolute",width:280,height:280,borderRadius:"50%",background:"rgba(255,255,255,0.06)",right:-80,top:-120}}),n.jsx("div",{style:{position:"absolute",width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,0.05)",left:-80,bottom:-100}}),n.jsxs("div",{style:{maxWidth:1180,margin:"0 auto",position:"relative",zIndex:2},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:15,flexWrap:"wrap"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:13},children:[n.jsx("div",{style:{width:48,height:48,borderRadius:15,background:"rgba(255,255,255,0.14)",border:"1px solid rgba(255,255,255,0.16)",display:"grid",placeItems:"center"},children:n.jsx(ot,{size:22})}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:11,letterSpacing:1.4,fontWeight:800,opacity:.7},children:"GOAT FARM MANAGEMENT"}),n.jsx("h1",{style:{margin:"3px 0 0",fontSize:24,fontWeight:900},children:"My Goat Manager"})]})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:9,flexWrap:"wrap"},children:[n.jsxs("button",{onClick:()=>w("subscription"),style:{border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.12)",color:"#fff",padding:"10px 14px",borderRadius:12,cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontSize:12,fontWeight:800},children:["Subscription",n.jsx(Ks,{size:14})]}),n.jsx("div",{style:{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,0.12)",display:"grid",placeItems:"center"},children:n.jsx(mn,{size:18})}),n.jsxs("div",{style:{padding:"10px 13px",borderRadius:999,background:"rgba(16,185,129,0.18)",color:"#D1FAE5",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",gap:6},children:[n.jsx("span",{style:{width:7,height:7,borderRadius:"50%",background:"#34D399"}}),"Active"]})]})]}),n.jsxs("div",{style:{marginTop:32,display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:20,flexWrap:"wrap"},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:13,opacity:.7,marginBottom:6},children:"Welcome back 👋"}),n.jsxs("div",{style:{fontSize:30,fontWeight:900,lineHeight:1.15},children:["Hello"," ",(o==null?void 0:o.name)||"User","."]}),n.jsx("p",{style:{margin:"8px 0 0",fontSize:14,opacity:.76},children:"Ready to manage your herd today?"})]}),n.jsxs("div",{style:{padding:"13px 16px",borderRadius:16,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.14)",minWidth:180},children:[n.jsx("div",{style:{fontSize:10,opacity:.65,letterSpacing:1,fontWeight:800},children:"FREE TRIAL"}),n.jsxs("div",{style:{marginTop:5,fontSize:16,fontWeight:800},children:[S," ","days remaining"]})]})]})]})]}),b&&n.jsx("div",{style:{maxWidth:1180,margin:"-18px auto 0",padding:"0 16px",position:"relative",zIndex:5},children:n.jsxs("div",{style:{background:"#fff7ed",border:"1px solid #fed7aa",color:"#9a3412",borderRadius:17,padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap",boxShadow:"0 12px 30px rgba(15,23,42,0.06)"},children:[n.jsx("strong",{style:{fontSize:12},children:"⚠️ Your free trial ends tomorrow."}),n.jsx("button",{onClick:()=>w("subscription"),style:{border:"none",background:"#9a3412",color:"#fff",borderRadius:9,padding:"8px 13px",cursor:"pointer",fontWeight:800,fontSize:11},children:"View Plan"})]})}),n.jsxs("main",{style:{maxWidth:1180,margin:"0 auto",padding:"26px 16px 50px"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:15,marginBottom:16,flexWrap:"wrap"},children:[n.jsxs("div",{children:[n.jsx("div",{style:{color:"#2563EB",fontSize:10,letterSpacing:1.4,fontWeight:900},children:"FARM OPERATIONS"}),n.jsx("h2",{style:{margin:"5px 0 0",fontSize:21,color:"#0F172A"},children:"Quick access"})]}),n.jsx("div",{style:{color:"#64748B",fontSize:12},children:"Manage your farm from one place"})]}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:17},children:[{key:"goats",label:"Goats",description:"Manage goat profiles, groups and herd information.",icon:ot,accent:"#E0F2FE",iconColor:"#0284C7"},{key:"weightlog",label:"Milk Records",description:"Track daily milk records and production updates.",icon:qg,accent:"#FEF3C7",iconColor:"#D97706"},{key:"events",label:"Events",description:"Track important farm events and activities.",icon:Vg,accent:"#F3E8FF",iconColor:"#9333EA"},{key:"sales",label:"Transactions",description:"Manage sales, income and farm transactions.",icon:Kg,accent:"#DCFCE7",iconColor:"#16A34A"},{key:"farm-setup",label:"Farm Setup",description:"Configure your farm details and preferences.",icon:pm,accent:"#E0E7FF",iconColor:"#4F46E5"},{key:"medical",label:"Medical",description:"Manage treatments, vaccinations and medical records.",icon:xn,accent:"#DBEAFE",iconColor:"#2563EB"},{key:"reports",label:"Reports",description:"View farm performance and important reports.",icon:Hg,accent:"#FCE7F3",iconColor:"#DB2777"},{key:"weighing-scale",label:"Weighing Scale",description:"Connect and monitor your digital goat weighing scale.",icon:we,accent:"#CCFBF1",iconColor:"#0F766E"}].map(M=>{const E=M.icon;return n.jsxs("button",{onClick:()=>w(M.key),style:{background:"#fff",border:"1px solid rgba(15,23,42,0.045)",borderRadius:22,padding:20,minHeight:205,textAlign:"left",cursor:"pointer",display:"flex",flexDirection:"column",justifyContent:"space-between",boxShadow:"0 15px 40px rgba(15,23,42,0.07)",transition:"all 0.2s ease"},onMouseEnter:L=>{L.currentTarget.style.transform="translateY(-4px)",L.currentTarget.style.boxShadow="0 22px 50px rgba(15,23,42,0.11)"},onMouseLeave:L=>{L.currentTarget.style.transform="translateY(0)",L.currentTarget.style.boxShadow="0 15px 40px rgba(15,23,42,0.07)"},children:[n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[n.jsx("div",{style:{width:50,height:50,borderRadius:16,background:M.accent,color:M.iconColor,display:"grid",placeItems:"center"},children:n.jsx(E,{size:21})}),n.jsx(Ks,{size:17,color:"#94A3B8"})]}),n.jsx("h3",{style:{margin:"17px 0 6px",fontSize:16,color:"#111827"},children:M.label}),n.jsx("p",{style:{margin:0,color:"#64748B",fontSize:12,lineHeight:1.6},children:M.description})]}),n.jsxs("div",{style:{marginTop:15,fontSize:11,color:M.iconColor,fontWeight:800},children:["Open"," ",M.label," ","→"]})]},M.key)})}),n.jsxs("div",{style:{marginTop:22,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16},children:[n.jsxs("button",{onClick:()=>w("subscription"),style:{border:"1px solid #DBEAFE",background:"linear-gradient(135deg,#EFF6FF,#F8FAFF)",borderRadius:20,padding:18,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between",gap:15},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsx("div",{style:{width:42,height:42,borderRadius:12,background:"#DBEAFE",color:"#2563EB",display:"grid",placeItems:"center"},children:n.jsx(Vi,{size:19})}),n.jsxs("div",{children:[n.jsx("strong",{style:{display:"block",color:"#1E3A8A",fontSize:13},children:"Subscription"}),n.jsx("span",{style:{color:"#64748B",fontSize:11},children:u?`${S} days left in your trial`:"View your plan"})]})]}),n.jsx(Ks,{size:17,color:"#2563EB"})]}),n.jsxs("button",{onClick:_,style:{border:"1px solid #E5E7EB",background:"#fff",borderRadius:20,padding:18,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between",gap:15},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsx("div",{style:{width:42,height:42,borderRadius:12,background:"#F1F5F9",color:"#475569",display:"grid",placeItems:"center"},children:n.jsx(Zg,{size:18})}),n.jsxs("div",{children:[n.jsx("strong",{style:{display:"block",color:"#334155",fontSize:13},children:"Sign Out"}),n.jsx("span",{style:{color:"#94A3B8",fontSize:11},children:"Exit your farm account"})]})]}),n.jsx(Ks,{size:17,color:"#94A3B8"})]})]})]})]})]})]})}qa.createRoot(document.getElementById("root")).render(n.jsx(Ah.StrictMode,{children:n.jsx(xy,{})}));
