(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const f of l)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const f={};return l.integrity&&(f.integrity=l.integrity),l.referrerPolicy&&(f.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?f.credentials="include":l.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function r(l){if(l.ep)return;l.ep=!0;const f=i(l);fetch(l.href,f)}})();var ud={exports:{}},ol={};var ov;function VM(){if(ov)return ol;ov=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(r,l,f){var h=null;if(f!==void 0&&(h=""+f),l.key!==void 0&&(h=""+l.key),"key"in l){f={};for(var d in l)d!=="key"&&(f[d]=l[d])}else f=l;return l=f.ref,{$$typeof:o,type:r,key:h,ref:l!==void 0?l:null,props:f}}return ol.Fragment=e,ol.jsx=i,ol.jsxs=i,ol}var lv;function XM(){return lv||(lv=1,ud.exports=VM()),ud.exports}var Ft=XM(),cd={exports:{}},ll={},fd={exports:{}},hd={};var uv;function kM(){return uv||(uv=1,(function(o){function e(V,lt){var q=V.length;V.push(lt);t:for(;0<q;){var _t=q-1>>>1,St=V[_t];if(0<l(St,lt))V[_t]=lt,V[q]=St,q=_t;else break t}}function i(V){return V.length===0?null:V[0]}function r(V){if(V.length===0)return null;var lt=V[0],q=V.pop();if(q!==lt){V[0]=q;t:for(var _t=0,St=V.length,Ht=St>>>1;_t<Ht;){var re=2*(_t+1)-1,xe=V[re],F=re+1,ft=V[F];if(0>l(xe,q))F<St&&0>l(ft,xe)?(V[_t]=ft,V[F]=q,_t=F):(V[_t]=xe,V[re]=q,_t=re);else if(F<St&&0>l(ft,q))V[_t]=ft,V[F]=q,_t=F;else break t}}return lt}function l(V,lt){var q=V.sortIndex-lt.sortIndex;return q!==0?q:V.id-lt.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;o.unstable_now=function(){return f.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var v=[],p=[],g=1,m=null,y=3,x=!1,T=!1,A=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,O=typeof setImmediate<"u"?setImmediate:null;function D(V){for(var lt=i(p);lt!==null;){if(lt.callback===null)r(p);else if(lt.startTime<=V)r(p),lt.sortIndex=lt.expirationTime,e(v,lt);else break;lt=i(p)}}function H(V){if(A=!1,D(V),!T)if(i(v)!==null)T=!0,U||(U=!0,j());else{var lt=i(p);lt!==null&&ct(H,lt.startTime-V)}}var U=!1,N=-1,G=5,C=-1;function w(){return M?!0:!(o.unstable_now()-C<G)}function B(){if(M=!1,U){var V=o.unstable_now();C=V;var lt=!0;try{t:{T=!1,A&&(A=!1,I(N),N=-1),x=!0;var q=y;try{e:{for(D(V),m=i(v);m!==null&&!(m.expirationTime>V&&w());){var _t=m.callback;if(typeof _t=="function"){m.callback=null,y=m.priorityLevel;var St=_t(m.expirationTime<=V);if(V=o.unstable_now(),typeof St=="function"){m.callback=St,D(V),lt=!0;break e}m===i(v)&&r(v),D(V)}else r(v);m=i(v)}if(m!==null)lt=!0;else{var Ht=i(p);Ht!==null&&ct(H,Ht.startTime-V),lt=!1}}break t}finally{m=null,y=q,x=!1}lt=void 0}}finally{lt?j():U=!1}}}var j;if(typeof O=="function")j=function(){O(B)};else if(typeof MessageChannel<"u"){var it=new MessageChannel,ot=it.port2;it.port1.onmessage=B,j=function(){ot.postMessage(null)}}else j=function(){S(B,0)};function ct(V,lt){N=S(function(){V(o.unstable_now())},lt)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(V){V.callback=null},o.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):G=0<V?Math.floor(1e3/V):5},o.unstable_getCurrentPriorityLevel=function(){return y},o.unstable_next=function(V){switch(y){case 1:case 2:case 3:var lt=3;break;default:lt=y}var q=y;y=lt;try{return V()}finally{y=q}},o.unstable_requestPaint=function(){M=!0},o.unstable_runWithPriority=function(V,lt){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var q=y;y=V;try{return lt()}finally{y=q}},o.unstable_scheduleCallback=function(V,lt,q){var _t=o.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?_t+q:_t):q=_t,V){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=q+St,V={id:g++,callback:lt,priorityLevel:V,startTime:q,expirationTime:St,sortIndex:-1},q>_t?(V.sortIndex=q,e(p,V),i(v)===null&&V===i(p)&&(A?(I(N),N=-1):A=!0,ct(H,q-_t))):(V.sortIndex=St,e(v,V),T||x||(T=!0,U||(U=!0,j()))),V},o.unstable_shouldYield=w,o.unstable_wrapCallback=function(V){var lt=y;return function(){var q=y;y=lt;try{return V.apply(this,arguments)}finally{y=q}}}})(hd)),hd}var cv;function YM(){return cv||(cv=1,fd.exports=kM()),fd.exports}var dd={exports:{}},ue={};var fv;function qM(){if(fv)return ue;fv=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),v=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),m=Symbol.for("react.activity"),y=Symbol.for("react.view_transition"),x=Symbol.iterator;function T(F){return F===null||typeof F!="object"?null:(F=x&&F[x]||F["@@iterator"],typeof F=="function"?F:null)}var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,S={};function I(F,ft,$){this.props=F,this.context=ft,this.refs=S,this.updater=$||A}I.prototype.isReactComponent={},I.prototype.setState=function(F,ft){if(typeof F!="object"&&typeof F!="function"&&F!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,F,ft,"setState")},I.prototype.forceUpdate=function(F){this.updater.enqueueForceUpdate(this,F,"forceUpdate")};function O(){}O.prototype=I.prototype;function D(F,ft,$){this.props=F,this.context=ft,this.refs=S,this.updater=$||A}var H=D.prototype=new O;H.constructor=D,M(H,I.prototype),H.isPureReactComponent=!0;var U=Array.isArray;function N(){}var G={H:null,A:null,T:null,S:null},C=Object.prototype.hasOwnProperty;function w(F,ft,$){var at=$.ref;return{$$typeof:o,type:F,key:ft,ref:at!==void 0?at:null,props:$}}function B(F,ft){return w(F.type,ft,F.props)}function j(F){return typeof F=="object"&&F!==null&&F.$$typeof===o}function it(F){var ft={"=":"=0",":":"=2"};return"$"+F.replace(/[=:]/g,function($){return ft[$]})}var ot=/\/+/g;function ct(F,ft){return typeof F=="object"&&F!==null&&F.key!=null?it(""+F.key):ft.toString(36)}function V(F){switch(F.status){case"fulfilled":return F.value;case"rejected":throw F.reason;default:switch(typeof F.status=="string"?F.then(N,N):(F.status="pending",F.then(function(ft){F.status==="pending"&&(F.status="fulfilled",F.value=ft)},function(ft){F.status==="pending"&&(F.status="rejected",F.reason=ft)})),F.status){case"fulfilled":return F.value;case"rejected":throw F.reason}}throw F}function lt(F,ft,$,at,xt){var Nt=typeof F;(Nt==="undefined"||Nt==="boolean")&&(F=null);var At=!1;if(F===null)At=!0;else switch(Nt){case"bigint":case"string":case"number":At=!0;break;case"object":switch(F.$$typeof){case o:case e:At=!0;break;case g:return At=F._init,lt(At(F._payload),ft,$,at,xt)}}if(At)return xt=xt(F),At=at===""?"."+ct(F,0):at,U(xt)?($="",At!=null&&($=At.replace(ot,"$&/")+"/"),lt(xt,ft,$,"",function(P){return P})):xt!=null&&(j(xt)&&(xt=B(xt,$+(xt.key==null||F&&F.key===xt.key?"":(""+xt.key).replace(ot,"$&/")+"/")+At)),ft.push(xt)),1;At=0;var Mt=at===""?".":at+":";if(U(F))for(var vt=0;vt<F.length;vt++)at=F[vt],Nt=Mt+ct(at,vt),At+=lt(at,ft,$,Nt,xt);else if(vt=T(F),typeof vt=="function")for(F=vt.call(F),vt=0;!(at=F.next()).done;)at=at.value,Nt=Mt+ct(at,vt++),At+=lt(at,ft,$,Nt,xt);else if(Nt==="object"){if(typeof F.then=="function")return lt(V(F),ft,$,at,xt);throw ft=String(F),Error("Objects are not valid as a React child (found: "+(ft==="[object Object]"?"object with keys {"+Object.keys(F).join(", ")+"}":ft)+"). If you meant to render a collection of children, use an array instead.")}return At}function q(F,ft,$){if(F==null)return F;var at=[],xt=0;return lt(F,at,"","",function(Nt){return ft.call($,Nt,xt++)}),at}function _t(F){if(F._status===-1){var ft=F._result,$=ft();$.then(function(at){(F._status===0||F._status===-1)&&(F._status=1,F._result=at,$.status===void 0&&($.status="fulfilled",$.value=at))},function(at){(F._status===0||F._status===-1)&&(F._status=2,F._result=at,$.status===void 0&&($.status="rejected",$.reason=at))}),F._status===-1&&(F._status=0,F._result=$)}if(F._status===1)return F._result.default;throw F._result}var St=typeof reportError=="function"?reportError:function(F){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var ft=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof F=="object"&&F!==null&&typeof F.message=="string"?String(F.message):String(F),error:F});if(!window.dispatchEvent(ft))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",F);return}console.error(F)};function Ht(F){var ft=G.T,$={};$.types=ft!==null?ft.types:null,G.T=$;try{var at=F(),xt=G.S;xt!==null&&xt($,at),typeof at=="object"&&at!==null&&typeof at.then=="function"&&at.then(N,St)}catch(Nt){St(Nt)}finally{ft!==null&&$.types!==null&&(ft.types=$.types),G.T=ft}}function re(F){var ft=G.T;if(ft!==null){var $=ft.types;$===null?ft.types=[F]:$.indexOf(F)===-1&&$.push(F)}else Ht(re.bind(null,F))}var xe={map:q,forEach:function(F,ft,$){q(F,function(){ft.apply(this,arguments)},$)},count:function(F){var ft=0;return q(F,function(){ft++}),ft},toArray:function(F){return q(F,function(ft){return ft})||[]},only:function(F){if(!j(F))throw Error("React.Children.only expected to receive a single React element child.");return F}};return ue.Activity=m,ue.Children=xe,ue.Component=I,ue.Fragment=i,ue.Profiler=l,ue.PureComponent=D,ue.StrictMode=r,ue.Suspense=v,ue.ViewTransition=y,ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=G,ue.__COMPILER_RUNTIME={__proto__:null,c:function(F){return G.H.useMemoCache(F)}},ue.addTransitionType=re,ue.cache=function(F){return function(){return F.apply(null,arguments)}},ue.cacheSignal=function(){return null},ue.cloneElement=function(F,ft,$){if(F==null)throw Error("The argument must be a React element, but you passed "+F+".");var at=M({},F.props),xt=F.key;if(ft!=null)for(Nt in ft.key!==void 0&&(xt=""+ft.key),ft)!C.call(ft,Nt)||Nt==="key"||Nt==="__self"||Nt==="__source"||Nt==="ref"&&ft.ref===void 0||(at[Nt]=ft[Nt]);var Nt=arguments.length-2;if(Nt===1)at.children=$;else if(1<Nt){for(var At=Array(Nt),Mt=0;Mt<Nt;Mt++)At[Mt]=arguments[Mt+2];at.children=At}return w(F.type,xt,at)},ue.createContext=function(F){return F={$$typeof:h,_currentValue:F,_currentValue2:F,_threadCount:0,Provider:null,Consumer:null},F.Provider=F,F.Consumer={$$typeof:f,_context:F},F},ue.createElement=function(F,ft,$){var at,xt={},Nt=null;if(ft!=null)for(at in ft.key!==void 0&&(Nt=""+ft.key),ft)C.call(ft,at)&&at!=="key"&&at!=="__self"&&at!=="__source"&&(xt[at]=ft[at]);var At=arguments.length-2;if(At===1)xt.children=$;else if(1<At){for(var Mt=Array(At),vt=0;vt<At;vt++)Mt[vt]=arguments[vt+2];xt.children=Mt}if(F&&F.defaultProps)for(at in At=F.defaultProps,At)xt[at]===void 0&&(xt[at]=At[at]);return w(F,Nt,xt)},ue.createRef=function(){return{current:null}},ue.forwardRef=function(F){return{$$typeof:d,render:F}},ue.isValidElement=j,ue.lazy=function(F){return{$$typeof:g,_payload:{_status:-1,_result:F},_init:_t}},ue.memo=function(F,ft){return{$$typeof:p,type:F,compare:ft===void 0?null:ft}},ue.startTransition=Ht,ue.unstable_useCacheRefresh=function(){return G.H.useCacheRefresh()},ue.use=function(F){return G.H.use(F)},ue.useActionState=function(F,ft,$){return G.H.useActionState(F,ft,$)},ue.useCallback=function(F,ft){return G.H.useCallback(F,ft)},ue.useContext=function(F){return G.H.useContext(F)},ue.useDebugValue=function(){},ue.useDeferredValue=function(F,ft){return G.H.useDeferredValue(F,ft)},ue.useEffect=function(F,ft){return G.H.useEffect(F,ft)},ue.useEffectEvent=function(F){return G.H.useEffectEvent(F)},ue.useId=function(){return G.H.useId()},ue.useImperativeHandle=function(F,ft,$){return G.H.useImperativeHandle(F,ft,$)},ue.useInsertionEffect=function(F,ft){return G.H.useInsertionEffect(F,ft)},ue.useLayoutEffect=function(F,ft){return G.H.useLayoutEffect(F,ft)},ue.useMemo=function(F,ft){return G.H.useMemo(F,ft)},ue.useOptimistic=function(F,ft){return G.H.useOptimistic(F,ft)},ue.useReducer=function(F,ft,$){return G.H.useReducer(F,ft,$)},ue.useRef=function(F){return G.H.useRef(F)},ue.useState=function(F){return G.H.useState(F)},ue.useSyncExternalStore=function(F,ft,$){return G.H.useSyncExternalStore(F,ft,$)},ue.useTransition=function(){return G.H.useTransition()},ue.version="19.3.1",ue}var hv;function Bp(){return hv||(hv=1,dd.exports=qM()),dd.exports}var pd={exports:{}},Un={};var dv;function WM(){if(dv)return Un;dv=1;var o=Bp();function e(g){var m="https://react.dev/errors/"+g;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var y=2;y<arguments.length;y++)m+="&args[]="+encodeURIComponent(arguments[y])}return"Minified React error #"+g+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal"),f=Symbol.for("react.recoverable"),h=Symbol.for("react.optimistic_key");function d(g,m,y){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:x==null?null:x===h?h:""+x,children:g,containerInfo:m,implementation:y}}var v=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(g,m){if(g==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return Un.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Un.browser=function(g){return{$$typeof:f,_reason:g}},Un.createPortal=function(g,m){var y=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(e(299));return d(g,m,null,y)},Un.flushSync=function(g){var m=v.T,y=r.p;try{if(v.T=null,r.p=2,g)return g()}finally{v.T=m,r.p=y,r.d.f()}},Un.preconnect=function(g,m){typeof g=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,r.d.C(g,m))},Un.prefetchDNS=function(g){typeof g=="string"&&r.d.D(g)},Un.preinit=function(g,m){if(typeof g=="string"&&m&&typeof m.as=="string"){var y=m.as,x=p(y,m.crossOrigin),T=typeof m.integrity=="string"?m.integrity:void 0,A=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;y==="style"?r.d.S(g,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:x,integrity:T,fetchPriority:A}):y==="script"&&r.d.X(g,{crossOrigin:x,integrity:T,fetchPriority:A,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},Un.preinitModule=function(g,m){if(typeof g=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var y=p(m.as,m.crossOrigin);r.d.M(g,{crossOrigin:y,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0})}}else m==null&&r.d.M(g)},Un.preload=function(g,m){if(typeof g=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var y=m.as,x=p(y,m.crossOrigin);r.d.L(g,y,{crossOrigin:x,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},Un.preloadModule=function(g,m){if(typeof g=="string")if(m){var y=p(m.as,m.crossOrigin);r.d.m(g,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:y,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0})}else r.d.m(g)},Un.requestFormReset=function(g){r.d.r(g)},Un.unstable_batchedUpdates=function(g,m){return g(m)},Un.useFormState=function(g,m,y){return v.H.useFormState(g,m,y)},Un.useFormStatus=function(){return v.H.useHostTransitionStatus()},Un.version="19.3.1",Un}var pv;function jM(){if(pv)return pd.exports;pv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),pd.exports=WM(),pd.exports}var mv;function ZM(){if(mv)return ll;mv=1;var o=YM(),e=Bp(),i=jM();function r(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){for(var n=t,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(t=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?t:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function v(t){if(f(t)!==t)throw Error(r(188))}function p(t){var n=t.alternate;if(!n){if(n=f(t),n===null)throw Error(r(188));return n!==t?null:t}for(var a=t,s=n;;){var u=a.return;if(u===null)break;var c=u.alternate;if(c===null){if(s=u.return,s!==null){a=s;continue}break}if(u.child===c.child){for(c=u.child;c;){if(c===a)return v(u),t;if(c===s)return v(u),n;c=c.sibling}throw Error(r(188))}if(a.return!==s.return)a=u,s=c;else{for(var _=!1,E=u.child;E;){if(E===a){_=!0,a=u,s=c;break}if(E===s){_=!0,s=u,a=c;break}E=E.sibling}if(!_){for(E=c.child;E;){if(E===a){_=!0,a=c,s=u;break}if(E===s){_=!0,s=c,a=u;break}E=E.sibling}if(!_)throw Error(r(189))}}if(a.alternate!==s)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?t:n}function g(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=g(t),n!==null)return n;t=t.sibling}return null}function m(t,n,a,s,u,c){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,s,u,c)||(t.tag!==22||t.memoizedState===null)&&(n||t.tag!==5&&t.tag!==27)&&m(t.child,n,a,s,u,c))return!0;t=t.sibling}return!1}function y(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function x(t){var n=!1;for(t=t.return;t!==null&&(t.tag===4&&(n=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return n}function T(t){var n=[null,null],a=y(t);return a===null||A(n,t,a.child,{foundSelf:!1}),n}function A(t,n,a,s){for(;a!==null;){if(a===n)s.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(s.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&A(t,n,a.child,s))return!0;a=a.sibling}return!1}function M(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(r(559))}}var S=null,I=null;function O(t,n,a){return t===a?!0:t===n?(S=t,!0):!1}function D(t,n,a){return t===a?(I=t,!1):t===n?(I!==null&&(S=t),!0):!1}function H(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function U(t,n,a){for(var s=0,u=t;u;u=a(u))s++;u=0;for(var c=n;c;c=a(c))u++;for(;0<s-u;)t=a(t),s--;for(;0<u-s;)n=a(n),u--;for(;s--;){if(t===n||n!==null&&t===n.alternate)return t;t=a(t),n=a(n)}return null}var N=Object.assign,G=Symbol.for("react.element"),C=Symbol.for("react.transitional.element"),w=Symbol.for("react.portal"),B=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),it=Symbol.for("react.profiler"),ot=Symbol.for("react.consumer"),ct=Symbol.for("react.context"),V=Symbol.for("react.forward_ref"),lt=Symbol.for("react.suspense"),q=Symbol.for("react.suspense_list"),_t=Symbol.for("react.memo"),St=Symbol.for("react.lazy"),Ht=Symbol.for("react.activity"),re=Symbol.for("react.legacy_hidden"),xe=Symbol.for("react.memo_cache_sentinel"),F=Symbol.for("react.view_transition"),ft=Symbol.for("react.recoverable"),$=Symbol.iterator;function at(t){return t===null||typeof t!="object"?null:(t=$&&t[$]||t["@@iterator"],typeof t=="function"?t:null)}var xt=Symbol.for("react.client.reference");function Nt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===xt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case B:return"Fragment";case it:return"Profiler";case j:return"StrictMode";case lt:return"Suspense";case q:return"SuspenseList";case Ht:return"Activity";case F:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case w:return"Portal";case ct:return t.displayName||"Context";case ot:return(t._context.displayName||"Context")+".Consumer";case V:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case _t:return n=t.displayName||null,n!==null?n:Nt(t.type)||"Memo";case St:n=t._payload,t=t._init;try{return Nt(t(n))}catch{}}return null}var At=Array.isArray,Mt=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,vt=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P={pending:!1,data:null,method:null,action:null},oe=[],Xt=-1;function Gt(t){return{current:t}}function wt(t){0>Xt||(t.current=oe[Xt],oe[Xt]=null,Xt--)}function Zt(t,n){Xt++,oe[Xt]=t.current,t.current=n}var Bt=Gt(null),le=Gt(null),Ye=Gt(null),We=Gt(null);function L(t,n){switch(Zt(Ye,n),Zt(le,t),Zt(Bt,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?g0(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=g0(n),t=_0(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}wt(Bt),Zt(Bt,t)}function b(){wt(Bt),wt(le),wt(Ye)}function nt(t){var n=t.memoizedState;n!==null&&(Br._currentValue=n.memoizedState,Zt(We,t)),n=Bt.current;var a=_0(n,t.type);n!==a&&(Zt(le,t),Zt(Bt,a))}function pt(t){le.current===t&&(wt(Bt),wt(le)),We.current===t&&(wt(We),Br._currentValue=P)}var yt,ht;function qt(t){if(yt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);yt=n&&n[1]||"",ht=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+yt+t+ht}var Ct=!1;function Qt(t,n){if(!t||Ct)return"";Ct=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(n){var mt=function(){throw Error()};if(Object.defineProperty(mt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(mt,[])}catch(Lt){var Y=Lt}Reflect.construct(t,[],mt)}else{try{mt.call()}catch(Lt){Y=Lt}mt=!1;try{var et=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),mt=!0,new t}finally{mt&&(et!==void 0?Object.defineProperty(t.prototype,"props",et):delete t.prototype.props)}}}else{try{throw Error()}catch(Lt){Y=Lt}(mt=t())&&typeof mt.catch=="function"&&mt.catch(function(){})}}catch(Lt){if(Lt&&Y&&typeof Lt.stack=="string")return[Lt.stack,Y.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=s.DetermineComponentFrameRoot(),_=c[0],E=c[1];if(_&&E){var z=_.split(`
`),Z=E.split(`
`);for(u=s=0;s<z.length&&!z[s].includes("DetermineComponentFrameRoot");)s++;for(;u<Z.length&&!Z[u].includes("DetermineComponentFrameRoot");)u++;if(s===z.length||u===Z.length)for(s=z.length-1,u=Z.length-1;1<=s&&0<=u&&z[s]!==Z[u];)u--;for(;1<=s&&0<=u;s--,u--)if(z[s]!==Z[u]){if(s!==1||u!==1)do if(s--,u--,0>u||z[s]!==Z[u]){var st=`
`+z[s].replace(" at new "," at ");return t.displayName&&st.includes("<anonymous>")&&(st=st.replace("<anonymous>",t.displayName)),st}while(1<=s&&0<=u);break}}}finally{Ct=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?qt(a):""}function $t(t,n){switch(t.tag){case 26:case 27:case 5:return qt(t.type);case 16:return qt("Lazy");case 13:return t.child!==n&&n!==null?qt("Suspense Fallback"):qt("Suspense");case 19:return qt("SuspenseList");case 0:case 15:return Qt(t.type,!1);case 11:return Qt(t.type.render,!1);case 1:return Qt(t.type,!0);case 31:return qt("Activity");case 30:return qt("ViewTransition");default:return""}}function bt(t){try{var n="",a=null;do n+=$t(t,a),a=t,t=t.return;while(t);return n}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var Ot=Object.prototype.hasOwnProperty,ae=o.unstable_scheduleCallback,Jt=o.unstable_cancelCallback,Pt=o.unstable_shouldYield,he=o.unstable_requestPaint,k=o.unstable_now,Rt=o.unstable_getCurrentPriorityLevel,Ut=o.unstable_ImmediatePriority,Yt=o.unstable_UserBlockingPriority,Et=o.unstable_NormalPriority,gt=o.unstable_LowPriority,Kt=o.unstable_IdlePriority,ce=o.log,Ge=o.unstable_setDisableYieldValue,be=null,tn=null;function mn(t){if(typeof ce=="function"&&Ge(t),tn&&typeof tn.setStrictMode=="function")try{tn.setStrictMode(be,t)}catch{}}var Nn=Math.clz32?Math.clz32:Al,ea=Math.log,_o=Math.LN2;function Al(t){return t>>>=0,t===0?32:31-(ea(t)/_o|0)|0}var ps=256,na=262144,ms=4194304;function di(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function gs(t,n,a){var s=t.pendingLanes;if(s===0)return 0;var u=0,c=t.suspendedLanes,_=t.pingedLanes;t=t.warmLanes;var E=s&134217727;return E!==0?(s=E&~c,s!==0?u=di(s):(_&=E,_!==0?u=di(_):a||(a=E&~t,a!==0&&(u=di(a))))):(E=s&~c,E!==0?u=di(E):_!==0?u=di(_):a||(a=s&~t,a!==0&&(u=di(a)))),u===0?0:n!==0&&n!==u&&(n&c)===0&&(c=u&-u,a=n&-n,c>=a||c===32&&(a&4194048)!==0)?n:u}function Ca(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Rl(t,n){(n&8)!==0&&(n|=n&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=n;0<a;){var s=31-Nn(a),u=1<<s;n|=t[s],a&=~u}return n}function zc(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Cl(){var t=ms;return ms<<=1,(ms&62914560)===0&&(ms=4194304),t}function vo(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function _s(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Ic(t,n,a,s,u,c){var _=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var E=t.entanglements,z=t.expirationTimes,Z=t.hiddenUpdates;for(a=_&~a;0<a;){var st=31-Nn(a),mt=1<<st;E[st]=0,z[st]=-1;var Y=Z[st];if(Y!==null)for(Z[st]=null,st=0;st<Y.length;st++){var et=Y[st];et!==null&&(et.lane&=-536870913)}a&=~mt}s!==0&&R(t,s,0),c!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=c&~(_&~n))}function R(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var s=31-Nn(n);t.entangledLanes|=n,t.entanglements[s]=t.entanglements[s]|1073741824|a&261930}function K(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var s=31-Nn(a),u=1<<s;u&n|t[s]&n&&(t[s]|=n),a&=~u}}function rt(t,n){var a=n&-n;return a=(a&42)!==0?1:ut(a),(a&(t.suspendedLanes|n))!==0?0:a}function ut(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function J(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Tt(){var t=vt.p;return t!==0?t:(t=window.event,t===void 0?32:tv(t.type))}function zt(t,n){var a=vt.p;try{return vt.p=t,n()}finally{vt.p=a}}var Vt=Math.random().toString(36).slice(2),Dt="__reactFiber$"+Vt,Wt="__reactProps$"+Vt,ie="__reactContainer$"+Vt,ee="__reactEvents$"+Vt,ye="__reactListeners$"+Vt,ze="__reactHandles$"+Vt,Qe="__reactResources$"+Vt,Le="__reactMarker$"+Vt,we="__reactLoad$"+Vt;function ne(t){delete t[Dt],delete t[Wt],delete t[ye],delete t[ze]}function Oe(t){var n;if(n=t[Dt])return n;for(var a=t.parentNode;a;){if(n=a[ie]||a[Dt]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=O0(t);t!==null;){if(a=t[Dt])return a;t=O0(t)}return n}t=a,a=t.parentNode}return null}function _e(t){if(t=t[Dt]||t[ie]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function gn(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(r(33))}function ti(t){var n=t[Qe];return n||(n=t[Qe]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function De(t){t[Le]=!0}function wa(t){t[we]=void 0}var je=new Set,In={};function un(t,n){nn(t,n),nn(t+"Capture",n)}function nn(t,n){for(In[t]=n,t=0;t<n.length;t++)je.add(n[t])}var Ln=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),er={},Fi={};function oS(t){return Ot.call(Fi,t)?!0:Ot.call(er,t)?!1:Ln.test(t)?Fi[t]=!0:(er[t]=!0,!1)}var Ue=!1;function nm(){var t=Ue;return Ue=!1,t}function wl(t,n,a){if(oS(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var s=n.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,a)}}function Dl(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,a)}}function ia(t,n,a,s){if(s===null)t.removeAttribute(a);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,s)}}function ei(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function im(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function lS(t,n,a){var s=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var u=s.get,c=s.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(_){a=""+_,c.call(this,_)}}),Object.defineProperty(t,n,{enumerable:s.enumerable}),{getValue:function(){return a},setValue:function(_){a=""+_},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Bc(t){if(!t._valueTracker){var n=im(t)?"checked":"value";t._valueTracker=lS(t,n,""+t[n])}}function am(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),s="";return t&&(s=im(t)?t.checked?"true":"false":t.value),t=s,t!==a?(n.setValue(t),!0):!1}var uS=/[\n"\\]/g;function pi(t){return t.replace(uS,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Fc(t,n,a,s,u,c,_,E){t.name="",_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"?t.type=_:t.removeAttribute("type"),n!=null?_==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+ei(n)):t.value!==""+ei(n)&&(t.value=""+ei(n)):_!=="submit"&&_!=="reset"||t.removeAttribute("value"),n!=null?_==="number"&&t.value==n?Hc(t,ei(t.value)):Hc(t,ei(n)):a!=null?Hc(t,ei(a)):s!=null&&t.removeAttribute("value"),u==null&&c!=null&&(t.defaultChecked=!!c),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?t.name=""+ei(E):t.removeAttribute("name")}function sm(t,n,a,s,u,c,_,E){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(t.type=c),n!=null||a!=null){if(!(c!=="submit"&&c!=="reset"||n!=null)){Bc(t);return}a=a!=null?""+ei(a):"",n=n!=null?""+ei(n):a,E||n===t.value||(t.value=n),t.defaultValue=n}s=s??u,s=typeof s!="function"&&typeof s!="symbol"&&!!s,t.checked=E?t.checked:!!s,t.defaultChecked=!!s,_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(t.name=_),Bc(t)}function Hc(t,n){t.defaultValue!==""+n&&(t.defaultValue=""+n)}function nr(t,n,a,s){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&s&&(t[a].defaultSelected=!0)}else{for(a=""+ei(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,s&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function rm(t,n,a){if(n!=null&&(n=""+ei(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+ei(a):""}function om(t,n,a,s){if(n==null){if(s!=null){if(a!=null)throw Error(r(92));if(At(s)){if(1<s.length)throw Error(r(93));s=s[0]}a=s}a==null&&(a=""),n=a}a=ei(n),t.defaultValue=a,s=t.textContent,s===a&&s!==""&&s!==null&&(t.value=s),Bc(t)}function ir(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var cS=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function lm(t,n,a){var s=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?s?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":s?t.setProperty(n,a):typeof a!="number"||a===0||cS.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function um(t,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(t=t.style,a!=null){for(var s in a)!a.hasOwnProperty(s)||n!=null&&n.hasOwnProperty(s)||(s.indexOf("--")===0?t.setProperty(s,""):s==="float"?t.cssFloat="":t[s]="",Ue=!0);for(var u in n)s=n[u],n.hasOwnProperty(u)&&a[u]!==s&&(lm(t,u,s),Ue=!0)}else for(var c in n)n.hasOwnProperty(c)&&lm(t,c,n[c])}function Gc(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var fS=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),hS=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ul(t){return hS.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Hi(){}var Vc=null;function Xc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ar=null,sr=null;function cm(t){var n=_e(t);if(n&&(t=n.stateNode)){var a=t[Wt]||null;t:switch(t=n.stateNode,n.type){case"input":if(Fc(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+pi(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var s=a[n];if(s!==t&&s.form===t.form){var u=s[Wt]||null;if(!u)throw Error(r(90));Fc(s,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)s=a[n],s.form===t.form&&am(s)}break t;case"textarea":rm(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&nr(t,!!a.multiple,n,!1)}}}var kc=!1;function fm(t,n,a){if(kc)return t(n,a);kc=!0;try{var s=t(n);return s}finally{if(kc=!1,(ar!==null||sr!==null)&&(Uu(),ar&&(n=ar,t=sr,sr=ar=null,cm(n),t)))for(n=0;n<t.length;n++)cm(t[n])}}function yo(t,n){var a=t.stateNode;if(a===null)return null;var s=a[Wt]||null;if(s===null)return null;a=s[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var aa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Yc=!1;if(aa)try{var So={};Object.defineProperty(So,"passive",{get:function(){Yc=!0}}),window.addEventListener("test",So,So),window.removeEventListener("test",So,So)}catch{Yc=!1}var Da=null,qc=null,Nl=null;function hm(){if(Nl)return Nl;var t,n=qc,a=n.length,s,u="value"in Da?Da.value:Da.textContent,c=u.length;for(t=0;t<a&&n[t]===u[t];t++);var _=a-t;for(s=1;s<=_&&n[a-s]===u[c-s];s++);return Nl=u.slice(t,1<s?1-s:void 0)}function Ll(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Ol(){return!0}function dm(){return!1}function Bn(t){function n(a,s,u,c,_){this._reactName=a,this._targetInst=u,this.type=s,this.nativeEvent=c,this.target=_,this.currentTarget=null;for(var E in t)t.hasOwnProperty(E)&&(a=t[E],this[E]=a?a(c):c[E]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?Ol:dm,this.isPropagationStopped=dm,this}return N(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ol)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ol)},persist:function(){},isPersistent:Ol}),n}var Ua={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Pl=Bn(Ua),xo=N({},Ua,{view:0,detail:0}),dS=Bn(xo),Wc,jc,Mo,zl=N({},xo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kc,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Mo&&(Mo&&t.type==="mousemove"?(Wc=t.screenX-Mo.screenX,jc=t.screenY-Mo.screenY):jc=Wc=0,Mo=t),Wc)},movementY:function(t){return"movementY"in t?t.movementY:jc}}),pm=Bn(zl),pS=N({},zl,{dataTransfer:0}),mS=Bn(pS),gS=N({},xo,{relatedTarget:0}),Zc=Bn(gS),_S=N({},Ua,{animationName:0,elapsedTime:0,pseudoElement:0}),vS=Bn(_S),yS=N({},Ua,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),SS=Bn(yS),xS=N({},Ua,{data:0}),mm=Bn(xS),MS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ES={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},TS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function bS(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=TS[t])?!!n[t]:!1}function Kc(){return bS}var AS=N({},xo,{key:function(t){if(t.key){var n=MS[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Ll(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ES[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kc,charCode:function(t){return t.type==="keypress"?Ll(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ll(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),RS=Bn(AS),CS=N({},zl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gm=Bn(CS),wS=N({},Ua,{submitter:0}),DS=Bn(wS),US=N({},xo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kc}),NS=Bn(US),LS=N({},Ua,{propertyName:0,elapsedTime:0,pseudoElement:0}),OS=Bn(LS),PS=N({},zl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),zS=Bn(PS),IS=N({},Ua,{newState:0,oldState:0,source:0}),BS=Bn(IS),FS=[9,13,27,32],Qc=aa&&"CompositionEvent"in window,Eo=null;aa&&"documentMode"in document&&(Eo=document.documentMode);var HS=aa&&"TextEvent"in window&&!Eo,_m=aa&&(!Qc||Eo&&8<Eo&&11>=Eo),vm=" ",ym=!1;function Sm(t,n){switch(t){case"keyup":return FS.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var rr=!1;function GS(t,n){switch(t){case"compositionend":return xm(n);case"keypress":return n.which!==32?null:(ym=!0,vm);case"textInput":return t=n.data,t===vm&&ym?null:t;default:return null}}function VS(t,n){if(rr)return t==="compositionend"||!Qc&&Sm(t,n)?(t=hm(),Nl=qc=Da=null,rr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return _m&&n.locale!=="ko"?null:n.data;default:return null}}var XS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Mm(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!XS[t.type]:n==="textarea"}function Em(t,n,a,s){ar?sr?sr.push(s):sr=[s]:ar=s,n=Iu(n,"onChange"),0<n.length&&(a=new Pl("onChange","change",null,a,s),t.push({event:a,listeners:n}))}var To=null,bo=null;function kS(t){c0(t,0)}function Il(t){var n=gn(t);if(am(n))return t}function Tm(t,n){if(t==="change")return n}var bm=!1;if(aa){var Jc;if(aa){var $c="oninput"in document;if(!$c){var Am=document.createElement("div");Am.setAttribute("oninput","return;"),$c=typeof Am.oninput=="function"}Jc=$c}else Jc=!1;bm=Jc&&(!document.documentMode||9<document.documentMode)}function Rm(){To&&(To.detachEvent("onpropertychange",Cm),bo=To=null)}function Cm(t){if(t.propertyName==="value"&&Il(bo)){var n=[];Em(n,bo,t,Xc(t)),fm(kS,n)}}function YS(t,n,a){t==="focusin"?(Rm(),To=n,bo=a,To.attachEvent("onpropertychange",Cm)):t==="focusout"&&Rm()}function qS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Il(bo)}function WS(t,n){if(t==="click")return Il(n)}function jS(t,n){if(t==="input"||t==="change")return Il(n)}function ZS(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ni=typeof Object.is=="function"?Object.is:ZS;function Ao(t,n){if(ni(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),s=Object.keys(n);if(a.length!==s.length)return!1;for(s=0;s<a.length;s++){var u=a[s];if(!Ot.call(n,u)||!ni(t[u],n[u]))return!1}return!0}function tf(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function wm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Dm(t,n){var a=wm(t);t=0;for(var s;a;){if(a.nodeType===3){if(s=t+a.textContent.length,t<=n&&s>=n)return{node:a,offset:n-t};t=s}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=wm(a)}}function Um(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Um(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Nm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=tf(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=tf(t.document)}return n}function ef(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var KS=aa&&"documentMode"in document&&11>=document.documentMode,or=null,nf=null,Ro=null,af=!1;function Lm(t,n,a){var s=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;af||or==null||or!==tf(s)||(s=or,"selectionStart"in s&&ef(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Ro&&Ao(Ro,s)||(Ro=s,s=Iu(nf,"onSelect"),0<s.length&&(n=new Pl("onSelect","select",null,n,a),t.push({event:n,listeners:s}),n.target=or)))}function vs(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var lr={animationend:vs("Animation","AnimationEnd"),animationiteration:vs("Animation","AnimationIteration"),animationstart:vs("Animation","AnimationStart"),transitionrun:vs("Transition","TransitionRun"),transitionstart:vs("Transition","TransitionStart"),transitioncancel:vs("Transition","TransitionCancel"),transitionend:vs("Transition","TransitionEnd")},sf={},Om={};aa&&(Om=document.createElement("div").style,"AnimationEvent"in window||(delete lr.animationend.animation,delete lr.animationiteration.animation,delete lr.animationstart.animation),"TransitionEvent"in window||delete lr.transitionend.transition);function ys(t){if(sf[t])return sf[t];if(!lr[t])return t;var n=lr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Om)return sf[t]=n[a];return t}var Pm=ys("animationend"),zm=ys("animationiteration"),Im=ys("animationstart"),QS=ys("transitionrun"),JS=ys("transitionstart"),$S=ys("transitioncancel"),Bm=ys("transitionend"),Fm=new Map,rf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");rf.push("scrollEnd");function Ri(t,n){Fm.set(t,n),un(n,[t])}var tx=0;function sa(t,n){if(t.name!=null&&t.name!=="auto")return t.name;if(n.autoName!==null)return n.autoName;t=Ui.identifierPrefix;var a=tx++;return t="_"+t+"t_"+a.toString(32)+"_",n.autoName=t}function Hm(t){if(t==null||typeof t=="string")return t;var n=null,a=Cr;if(a!==null)for(var s=0;s<a.length;s++){var u=t[a[s]];if(u!=null){if(u==="none")return"none";n=n==null?u:n+(" "+u)}}return n??t.default}function ra(t,n){return t=Hm(t),n=Hm(n),n==null?t==="auto"?null:t:n==="auto"?null:n}var Bl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},mi=[],ur=0,of=0;function Fl(){for(var t=ur,n=of=ur=0;n<t;){var a=mi[n];mi[n++]=null;var s=mi[n];mi[n++]=null;var u=mi[n];mi[n++]=null;var c=mi[n];if(mi[n++]=null,s!==null&&u!==null){var _=s.pending;_===null?u.next=u:(u.next=_.next,_.next=u),s.pending=u}c!==0&&Gm(a,u,c)}}function Hl(t,n,a,s){mi[ur++]=t,mi[ur++]=n,mi[ur++]=a,mi[ur++]=s,of|=s,t.lanes|=s,t=t.alternate,t!==null&&(t.lanes|=s)}function lf(t,n,a,s){return Hl(t,n,a,s),Gl(t)}function Ss(t,n){return Hl(t,null,null,n),Gl(t)}function Gm(t,n,a){t.lanes|=a;var s=t.alternate;s!==null&&(s.lanes|=a);for(var u=!1,c=t.return;c!==null;)c.childLanes|=a,s=c.alternate,s!==null&&(s.childLanes|=a),c.tag===22&&(t=c.stateNode,t===null||t._visibility&1||(u=!0)),t=c,c=c.return;return t.tag===3?(c=t.stateNode,u&&n!==null&&(u=31-Nn(a),t=c.hiddenUpdates,s=t[u],s===null?t[u]=[n]:s.push(n),n.lane=a|536870912),c):null}function Gl(t){if(50<Zo)throw Zo=0,Du=null,Error(r(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var cr={};function ex(t,n,a,s){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function qn(t,n,a,s){return new ex(t,n,a,s)}function uf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function oa(t,n){var a=t.alternate;return a===null?(a=qn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Vm(t,n){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Vl(t,n,a,s,u,c){var _=0;if(s=t,typeof s=="function")uf(s)&&(_=1);else if(typeof s=="string")_=wM(t,a,Bt.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(s){case Ht:return t=qn(31,a,n,u),t.elementType=Ht,t.lanes=c,t;case B:return xs(a.children,u,c,n);case j:_=8,u|=24;break;case it:return t=qn(12,a,n,u|2),t.elementType=it,t.lanes=c,t;case lt:return t=qn(13,a,n,u),t.elementType=lt,t.lanes=c,t;case q:return t=qn(19,a,n,u),t.elementType=q,t.lanes=c,t;case re:case F:return t=u|32,t=qn(30,a,n,t),t.elementType=F,t.lanes=c,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof s=="object"&&s!==null)switch(s.$$typeof){case ct:_=10;break t;case ot:_=9;break t;case V:_=11;break t;case _t:_=14;break t;case St:_=16,s=null;break t}_=29,a=Error(r(130,t===null?"null":typeof t,"")),s=null}return n=qn(_,a,n,u),n.elementType=t,n.type=s,n.lanes=c,n}function xs(t,n,a,s){return t=qn(7,t,s,n),t.lanes=a,t}function cf(t,n,a){return t=qn(6,t,null,n),t.lanes=a,t}function Xm(t){var n=qn(18,null,null,0);return n.stateNode=t,n}function ff(t,n,a){return n=qn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var km=new WeakMap;function gi(t,n){if(typeof t=="object"&&t!==null){var a=km.get(t);return a!==void 0?a:(n={value:t,source:n,stack:bt(n)},km.set(t,n),n)}return{value:t,source:n,stack:bt(n)}}var fr=[],hr=0,Xl=null,Co=0,_i=[],vi=0,Na=null,Gi=1,Vi="";function la(t,n){fr[hr++]=Co,fr[hr++]=Xl,Xl=t,Co=n}function Ym(t,n,a){_i[vi++]=Gi,_i[vi++]=Vi,_i[vi++]=Na,Na=t;var s=Gi;t=Vi;var u=32-Nn(s)-1;s&=~(1<<u),a+=1;var c=32-Nn(n)+u;if(30<c){var _=u-u%5;c=(s&(1<<_)-1).toString(32),s>>=_,u-=_,Gi=1<<32-Nn(n)+u|a<<u|s,Vi=c+t}else Gi=1<<c|a<<u|s,Vi=t}function kl(t){t.return!==null&&(la(t,1),Ym(t,1,0))}function hf(t){for(;t===Xl;)Xl=fr[--hr],fr[hr]=null,Co=fr[--hr],fr[hr]=null;for(;t===Na;)Na=_i[--vi],_i[vi]=null,Vi=_i[--vi],_i[vi]=null,Gi=_i[--vi],_i[vi]=null}function qm(t,n){_i[vi++]=Gi,_i[vi++]=Vi,_i[vi++]=Na,Gi=n.id,Vi=n.overflow,Na=t}var xn=null,Ze=null,ve=!1,La=null,yi=!1,df=Error(r(519));function Oa(t){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw wo(gi(n,t)),df}function Wm(t){var n=t.stateNode,a=t.type,s=t.memoizedProps;switch(n[Dt]=t,n[Wt]=s,a){case"dialog":Ee("cancel",n),Ee("close",n);break;case"iframe":case"object":case"embed":Ee("load",n);break;case"video":case"audio":for(a=0;a<Qo.length;a++)Ee(Qo[a],n);break;case"source":Ee("error",n);break;case"img":case"image":case"link":Ee("error",n),Ee("load",n);break;case"details":Ee("toggle",n);break;case"input":Ee("invalid",n),sm(n,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":Ee("invalid",n);break;case"textarea":Ee("invalid",n),om(n,s.value,s.defaultValue,s.children)}a=s.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||s.suppressHydrationWarning===!0||p0(n.textContent,a)?(s.popover!=null&&(Ee("beforetoggle",n),Ee("toggle",n)),s.onScroll!=null&&Ee("scroll",n),s.onScrollEnd!=null&&Ee("scrollend",n),s.onClick!=null&&(n.onclick=Hi),n=!0):n=!1,n||Oa(t,!0)}function Yl(t){for(xn=t.return;xn;)switch(xn.tag){case 5:case 31:case 13:yi=!1;return;case 27:case 3:yi=!0;return;default:xn=xn.return}}function dr(t){if(t!==xn)return!1;if(!ve)return Yl(t),ve=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Xh(t.type,t.memoizedProps)),a=!a),a&&Ze&&Oa(t),Yl(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Ze=L0(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Ze=L0(t)}else n===27?(n=Ze,Ka(t.type)?(t=Jh,Jh=null,Ze=t):Ze=n):Ze=xn?xi(t.stateNode.nextSibling):null;return!0}function Ms(){Ze=xn=null,ve=!1}function pf(){var t=La;return t!==null&&(Zn===null?Zn=t:Zn.push.apply(Zn,t),La=null),t}function wo(t){La===null?La=[t]:La.push(t)}var mf=Gt(null),Es=null,ua=null;function Pa(t,n,a){Zt(mf,n._currentValue),n._currentValue=a}function ca(t){t._currentValue=mf.current,wt(mf)}function ql(t,n,a){for(;t!==null;){var s=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,s!==null&&(s.childLanes|=n)):s!==null&&(s.childLanes&n)!==n&&(s.childLanes|=n),t===a)break;t=t.return}}function gf(t,n,a,s){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var c=u.dependencies;if(c!==null){var _=u.child;c=c.firstContext;t:for(;c!==null;){var E=c;c=u;for(var z=0;z<n.length;z++)if(E.context===n[z]){c.lanes|=a,E=c.alternate,E!==null&&(E.lanes|=a),ql(c.return,a,t),s||(_=null);break t}c=E.next}}else if(u.tag===18){if(_=u.return,_===null)throw Error(r(341));_.lanes|=a,c=_.alternate,c!==null&&(c.lanes|=a),ql(_,a,t),_=null}else u.tag===13&&u.memoizedState!==null&&u.memoizedState.dehydrated===null?(u.lanes|=a,_=u.alternate,_!==null&&(_.lanes|=a),ql(u.return,a,t),_=u.child,_=_!==null?_.sibling:null):_=u.child;if(_!==null)_.return=u;else for(_=u;_!==null;){if(_===t){_=null;break}if(u=_.sibling,u!==null){u.return=_.return,_=u;break}_=_.return}u=_}}function Ts(t,n,a,s){t=null;for(var u=n,c=!1;u!==null;){if(!c){if((u.flags&524288)!==0)c=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var _=u.alternate;if(_===null)throw Error(r(387));if(_=_.memoizedProps,_!==null){var E=u.type;ni(u.pendingProps.value,_.value)||(t!==null?t.push(E):t=[E])}}else if(u===We.current){if(_=u.alternate,_===null)throw Error(r(387));_.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Br):t=[Br])}u=u.return}return t!==null&&gf(n,t,a,s),n.flags|=262144,t!==null}function Wl(t){for(t=t.firstContext;t!==null;){if(!ni(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function bs(t){Es=t,ua=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function An(t){return jm(Es,t)}function jl(t,n){return Es===null&&bs(t),jm(t,n)}function jm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},ua===null){if(t===null)throw Error(r(308));ua=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else ua=ua.next=n;return a}var nx=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,s){t.push(s)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},ix=o.unstable_scheduleCallback,ax=o.unstable_NormalPriority,cn={$$typeof:ct,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function _f(){return{controller:new nx,data:new Map,refCount:0}}function Do(t){t.refCount--,t.refCount===0&&ix(ax,function(){t.controller.abort()})}function Zm(t,n){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<n.length;t++){var s=n[t];a.indexOf(s)===-1&&a.push(s)}}}var Uo=null;function sx(t){var n=t.transitionTypes;return t.transitionTypes=null,n}var No=null,vf=0,As=0,pr=null;function rx(t,n){if(No===null){var a=No=[];vf=0,As=Oh(),pr={status:"pending",value:void 0,then:function(s){a.push(s)}}}return vf++,n.then(Km,Km),n}function Km(){if(--vf===0&&(Uo=null,No!==null)){pr!==null&&(pr.status="fulfilled");var t=No;No=null,As=0,pr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function ox(t,n){var a=[],s={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){s.status="fulfilled",s.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(s.status="rejected",s.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),s}var Qm=Mt.S;Mt.S=function(t,n){if(X_=k(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&rx(t,n),Uo!==null)for(var a=Nr;a!==null;)Zm(a,Uo),a=a.next;if(a=t.types,a!==null){for(var s=Nr;s!==null;)Zm(s,a),s=s.next;if(As!==0){s=Uo,s===null&&(s=Uo=[]);for(var u=0;u<a.length;u++){var c=a[u];s.indexOf(c)===-1&&s.push(c)}}}Qm!==null&&Qm(t,n)};var Rs=Gt(null);function yf(){var t=Rs.current;return t!==null?t:qe.pooledCache}function Zl(t,n){n===null?Zt(Rs,Rs.current):Zt(Rs,n.pool)}function Jm(){var t=yf();return t===null?null:{parent:cn._currentValue,pool:t}}var mr=Error(r(460)),Sf=Error(r(474)),Kl=Error(r(542)),Ql={then:function(){}};function $m(t){return t=t.status,t==="fulfilled"||t==="rejected"}function tg(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Hi,Hi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,ng(t),t===void 0&&!("reason"in n)?Error(r(600)):t;default:if(typeof n.status=="string")n.then(Hi,Hi);else{if(t=qe,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=n,t.status="pending",t.then(function(s){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=s}},function(s){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=s}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,ng(t),t}throw ws=n,mr}}function Cs(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(ws=a,mr):a}}var ws=null;function eg(){if(ws===null)throw Error(r(459));var t=ws;return ws=null,t}function ng(t){if(t===mr||t===Kl)throw Error(r(483))}var gr=null,Lo=0;function Jl(t){var n=Lo;return Lo+=1,gr===null&&(gr=[]),tg(gr,t,n)}function za(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function $l(t,n){throw n.$$typeof===G?Error(r(525)):(t=Object.prototype.toString.call(n),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function ig(t){function n(W,X){if(t){var tt=W.deletions;tt===null?(W.deletions=[X],W.flags|=16):tt.push(X)}}function a(W,X){if(!t)return null;for(;X!==null;)n(W,X),X=X.sibling;return null}function s(W){for(var X=new Map;W!==null;)W.key===null?X.set(W.index,W):X.set(W.key,W),W=W.sibling;return X}function u(W,X){return W=oa(W,X),W.index=0,W.sibling=null,W}function c(W,X,tt){return W.index=tt,t?(tt=W.alternate,tt!==null?(tt=tt.index,tt<X?(W.flags|=2,X):tt):(W.flags|=134217730,X)):(W.flags|=1048576,X)}function _(W){return t&&W.alternate===null&&(W.flags|=134217730),W}function E(W,X,tt,dt){return X===null||X.tag!==6?(X=cf(tt,W.mode,dt),X.return=W,X):(X=u(X,tt),X.return=W,X)}function z(W,X,tt,dt){var kt=tt.type;return kt===B?(W=st(W,X,tt.props.children,dt,tt.key),za(W,tt),W):X!==null&&(X.elementType===kt||typeof kt=="object"&&kt!==null&&kt.$$typeof===St&&Cs(kt)===X.type)?(X=u(X,tt.props),za(X,tt),X.return=W,X):(X=Vl(tt.type,tt.key,tt.props,null,W.mode,dt),za(X,tt),X.return=W,X)}function Z(W,X,tt,dt){return X===null||X.tag!==4||X.stateNode.containerInfo!==tt.containerInfo||X.stateNode.implementation!==tt.implementation?(X=ff(tt,W.mode,dt),X.return=W,X):(X=u(X,tt.children||[]),X.return=W,X)}function st(W,X,tt,dt,kt){return X===null||X.tag!==7?(X=xs(tt,W.mode,dt,kt),X.return=W,X):(X=u(X,tt),X.return=W,X)}function mt(W,X,tt){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=cf(""+X,W.mode,tt),X.return=W,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case C:return tt=Vl(X.type,X.key,X.props,null,W.mode,tt),za(tt,X),tt.return=W,tt;case w:return X=ff(X,W.mode,tt),X.return=W,X;case St:return X=Cs(X),mt(W,X,tt)}if(At(X)||at(X))return X=xs(X,W.mode,tt,null),X.return=W,X;if(typeof X.then=="function")return mt(W,Jl(X),tt);if(X.$$typeof===ct)return mt(W,jl(W,X),tt);$l(W,X)}return null}function Y(W,X,tt,dt){var kt=X!==null?X.key:null;if(typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint")return kt!==null?null:E(W,X,""+tt,dt);if(typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case C:return tt.key===kt?z(W,X,tt,dt):null;case w:return tt.key===kt?Z(W,X,tt,dt):null;case St:return tt=Cs(tt),Y(W,X,tt,dt)}if(At(tt)||at(tt))return kt!==null?null:st(W,X,tt,dt,null);if(typeof tt.then=="function")return Y(W,X,Jl(tt),dt);if(tt.$$typeof===ct)return Y(W,X,jl(W,tt),dt);$l(W,tt)}return null}function et(W,X,tt,dt,kt){if(typeof dt=="string"&&dt!==""||typeof dt=="number"||typeof dt=="bigint")return W=W.get(tt)||null,E(X,W,""+dt,kt);if(typeof dt=="object"&&dt!==null){switch(dt.$$typeof){case C:return W=W.get(dt.key===null?tt:dt.key)||null,z(X,W,dt,kt);case w:return W=W.get(dt.key===null?tt:dt.key)||null,Z(X,W,dt,kt);case St:return dt=Cs(dt),et(W,X,tt,dt,kt)}if(At(dt)||at(dt))return W=W.get(tt)||null,st(X,W,dt,kt,null);if(typeof dt.then=="function")return et(W,X,tt,Jl(dt),kt);if(dt.$$typeof===ct)return et(W,X,tt,jl(X,dt),kt);$l(X,dt)}return null}function Lt(W,X,tt,dt){for(var kt=null,Re=null,te=X,se=X=0,dn=null;te!==null&&se<tt.length;se++){te.index>se?(dn=te,te=null):dn=te.sibling;var Ce=Y(W,te,tt[se],dt);if(Ce===null){te===null&&(te=dn);break}t&&te&&Ce.alternate===null&&n(W,te),X=c(Ce,X,se),Re===null?kt=Ce:Re.sibling=Ce,Re=Ce,te=dn}if(se===tt.length)return a(W,te),ve&&la(W,se),kt;if(te===null){for(;se<tt.length;se++)te=mt(W,tt[se],dt),te!==null&&(X=c(te,X,se),Re===null?kt=te:Re.sibling=te,Re=te);return ve&&la(W,se),kt}for(te=s(te);se<tt.length;se++)dn=et(te,W,se,tt[se],dt),dn!==null&&(t&&(Ce=dn.alternate,Ce!==null&&te.delete(Ce.key===null?se:Ce.key)),X=c(dn,X,se),Re===null?kt=dn:Re.sibling=dn,Re=dn);return t&&te.forEach(function(es){return n(W,es)}),ve&&la(W,se),kt}function jt(W,X,tt,dt){if(tt==null)throw Error(r(151));for(var kt=null,Re=null,te=X,se=X=0,dn=null,Ce=tt.next();te!==null&&!Ce.done;se++,Ce=tt.next()){te.index>se?(dn=te,te=null):dn=te.sibling;var es=Y(W,te,Ce.value,dt);if(es===null){te===null&&(te=dn);break}t&&te&&es.alternate===null&&n(W,te),X=c(es,X,se),Re===null?kt=es:Re.sibling=es,Re=es,te=dn}if(Ce.done)return a(W,te),ve&&la(W,se),kt;if(te===null){for(;!Ce.done;se++,Ce=tt.next())Ce=mt(W,Ce.value,dt),Ce!==null&&(X=c(Ce,X,se),Re===null?kt=Ce:Re.sibling=Ce,Re=Ce);return ve&&la(W,se),kt}for(te=s(te);!Ce.done;se++,Ce=tt.next())Ce=et(te,W,se,Ce.value,dt),Ce!==null&&(t&&(dn=Ce.alternate,dn!==null&&te.delete(dn.key===null?se:dn.key)),X=c(Ce,X,se),Re===null?kt=Ce:Re.sibling=Ce,Re=Ce);return t&&te.forEach(function(GM){return n(W,GM)}),ve&&la(W,se),kt}function pe(W,X,tt,dt){if(typeof tt=="object"&&tt!==null&&tt.type===B&&tt.key===null&&tt.props.ref===void 0&&(tt=tt.props.children),typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case C:t:{for(var kt=tt.key;X!==null;){if(X.key===kt){if(kt=tt.type,kt===B){if(X.tag===7){a(W,X.sibling),dt=u(X,tt.props.children),za(dt,tt),dt.return=W,W=dt;break t}}else if(X.elementType===kt||typeof kt=="object"&&kt!==null&&kt.$$typeof===St&&Cs(kt)===X.type){a(W,X.sibling),dt=u(X,tt.props),za(dt,tt),dt.return=W,W=dt;break t}a(W,X);break}else n(W,X);X=X.sibling}tt.type===B?(dt=xs(tt.props.children,W.mode,dt,tt.key),za(dt,tt),dt.return=W,W=dt):(dt=Vl(tt.type,tt.key,tt.props,null,W.mode,dt),za(dt,tt),dt.return=W,W=dt)}return _(W);case w:t:{for(kt=tt.key;X!==null;){if(X.key===kt)if(X.tag===4&&X.stateNode.containerInfo===tt.containerInfo&&X.stateNode.implementation===tt.implementation){a(W,X.sibling),dt=u(X,tt.children||[]),dt.return=W,W=dt;break t}else{a(W,X);break}else n(W,X);X=X.sibling}dt=ff(tt,W.mode,dt),dt.return=W,W=dt}return _(W);case St:return tt=Cs(tt),pe(W,X,tt,dt)}if(At(tt))return Lt(W,X,tt,dt);if(at(tt)){if(kt=at(tt),typeof kt!="function")throw Error(r(150));return tt=kt.call(tt),jt(W,X,tt,dt)}if(typeof tt.then=="function")return pe(W,X,Jl(tt),dt);if(tt.$$typeof===ct)return pe(W,X,jl(W,tt),dt);$l(W,tt)}return typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint"?(tt=""+tt,X!==null&&X.tag===6?(a(W,X.sibling),dt=u(X,tt),dt.return=W,W=dt):(a(W,X),dt=cf(tt,W.mode,dt),dt.return=W,W=dt),_(W)):a(W,X)}return function(W,X,tt,dt){try{Lo=0;var kt=pe(W,X,tt,dt);return gr=null,kt}catch(te){if(te===mr||te===Kl)throw te;var Re=qn(29,te,null,W.mode);return Re.lanes=dt,Re.return=W,Re}}}var Ds=ig(!0),ag=ig(!1),Ia=!1;function xf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Mf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ba(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Fa(t,n,a){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,(Pe&2)!==0){var u=s.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),s.pending=n,n=Gl(t),Gm(t,null,a),n}return Hl(t,s,n,a),Gl(t)}function Oo(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var s=n.lanes;s&=t.pendingLanes,a|=s,n.lanes=a,K(t,a)}}function Ef(t,n){var a=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,a===s)){var u=null,c=null;if(a=a.firstBaseUpdate,a!==null){do{var _={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};c===null?u=c=_:c=c.next=_,a=a.next}while(a!==null);c===null?u=c=n:c=c.next=n}else u=c=n;a={baseState:s.baseState,firstBaseUpdate:u,lastBaseUpdate:c,shared:s.shared,callbacks:s.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Tf=!1;function Po(){if(Tf){var t=pr;if(t!==null)throw t}}function zo(t,n,a,s){Tf=!1;var u=t.updateQueue;Ia=!1;var c=u.firstBaseUpdate,_=u.lastBaseUpdate,E=u.shared.pending;if(E!==null){u.shared.pending=null;var z=E,Z=z.next;z.next=null,_===null?c=Z:_.next=Z,_=z;var st=t.alternate;st!==null&&(st=st.updateQueue,E=st.lastBaseUpdate,E!==_&&(E===null?st.firstBaseUpdate=Z:E.next=Z,st.lastBaseUpdate=z))}if(c!==null){var mt=u.baseState;_=0,st=Z=z=null,E=c;do{var Y=E.lane&-536870913,et=Y!==E.lane;if(et?(Ae&Y)===Y:(s&Y)===Y){Y!==0&&Y===As&&(Tf=!0),st!==null&&(st=st.next={lane:0,tag:E.tag,payload:E.payload,callback:null,next:null});t:{var Lt=t,jt=E;Y=n;var pe=a;switch(jt.tag){case 1:if(Lt=jt.payload,typeof Lt=="function"){mt=Lt.call(pe,mt,Y);break t}mt=Lt;break t;case 3:Lt.flags=Lt.flags&-65537|128;case 0:if(Lt=jt.payload,Y=typeof Lt=="function"?Lt.call(pe,mt,Y):Lt,Y==null)break t;mt=N({},mt,Y);break t;case 2:Ia=!0}}Y=E.callback,Y!==null&&(t.flags|=64,et&&(t.flags|=8192),et=u.callbacks,et===null?u.callbacks=[Y]:et.push(Y))}else et={lane:Y,tag:E.tag,payload:E.payload,callback:E.callback,next:null},st===null?(Z=st=et,z=mt):st=st.next=et,_|=Y;if(E=E.next,E===null){if(E=u.shared.pending,E===null)break;et=E,E=et.next,et.next=null,u.lastBaseUpdate=et,u.shared.pending=null}}while(!0);st===null&&(z=mt),u.baseState=z,u.firstBaseUpdate=Z,u.lastBaseUpdate=st,c===null&&(u.shared.lanes=0),qa|=_,t.lanes=_,t.memoizedState=mt}}function sg(t,n){if(typeof t!="function")throw Error(r(191,t));t.call(n)}function rg(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)sg(a[t],n)}var Ha=Gt(null),tu=Gt(0);function og(t,n){t=ma,Zt(tu,t),Zt(Ha,n),ma=t|n.baseLanes}function bf(){Zt(tu,ma),Zt(Ha,Ha.current)}function Af(){ma=tu.current,wt(Ha),wt(tu)}var Rn=Gt(null),On=null;function Ga(t){var n=t.alternate;Zt(Cn,Cn.current&1),Zt(Rn,t),On===null&&(n===null||Ha.current!==null||n.memoizedState!==null)&&(On=t)}function Rf(t){Zt(Cn,Cn.current),Zt(Rn,t),On===null&&(On=t)}function lg(t){t.tag===22?(Zt(Cn,Cn.current),Zt(Rn,t),On===null&&(On=t)):Va()}function Va(){Zt(Cn,Cn.current),Zt(Rn,Rn.current)}function ii(t){wt(Rn),On===t&&(On=null),wt(Cn)}var Cn=Gt(0);function Io(t,n){Zt(Rn,Rn.current),Zt(Cn,n)}function Cf(t){wt(Cn),wt(Rn),On===t&&(On=null)}function eu(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Kh(a)||Qh(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var fa=0,de=null,Ve=null,fn=null,nu=!1,_r=!1,Us=!1,iu=0,Bo=0,vr=null,lx=0;function an(){throw Error(r(321))}function wf(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ni(t[a],n[a]))return!1;return!0}function Df(t,n,a,s,u,c){return fa=c,de=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Mt.H=t===null||t.memoizedState===null?Yg:qg,Us=!1,c=a(s,u),Us=!1,_r&&(c=cg(n,a,s,u)),ug(t),c}function ug(t){Mt.H=cu;var n=Ve!==null&&Ve.next!==null;if(fa=0,fn=Ve=de=null,nu=!1,Bo=0,vr=null,n)throw Error(r(300));t===null||hn||(t=t.dependencies,t!==null&&Wl(t)&&(hn=!0))}function cg(t,n,a,s){de=t;var u=0;do{if(_r&&(vr=null),Bo=0,_r=!1,25<=u)throw Error(r(301));if(u+=1,fn=Ve=null,t.updateQueue!=null){var c=t.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}Mt.H=gx,c=n(a,s)}while(_r);return c}function ux(){var t=Mt.H,n=t.useState()[0];return n=typeof n.then=="function"?Fo(n):n,t=t.useState()[0],(Ve!==null?Ve.memoizedState:null)!==t&&(de.flags|=1024),n}function Uf(){var t=iu!==0;return iu=0,t}function Nf(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Lf(t){if(nu){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}nu=!1}fa=0,fn=Ve=de=null,_r=!1,Bo=iu=0,vr=null}function Fn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fn===null?de.memoizedState=fn=t:fn=fn.next=t,fn}function on(){if(Ve===null){var t=de.alternate;t=t!==null?t.memoizedState:null}else t=Ve.next;var n=fn===null?de.memoizedState:fn.next;if(n!==null)fn=n,Ve=t;else{if(t===null)throw de.alternate===null?Error(r(467)):Error(r(310));Ve=t,t={memoizedState:Ve.memoizedState,baseState:Ve.baseState,baseQueue:Ve.baseQueue,queue:Ve.queue,next:null},fn===null?de.memoizedState=fn=t:fn=fn.next=t}return fn}function au(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Fo(t){var n=Bo;return Bo+=1,vr===null&&(vr=[]),t=tg(vr,t,n),n=de,(fn===null?n.memoizedState:fn.next)===null&&(n=n.alternate,Mt.H=n===null||n.memoizedState===null?Yg:qg),t}function su(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Fo(t);if(t.$$typeof===ft)return;if(t.$$typeof===ct)return An(t)}throw Error(r(438,String(t)))}function Of(t){var n=null,a=de.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var s=de.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(n={data:s.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=au(),de.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),s=0;s<t;s++)a[s]=xe;return n.index++,a}function ha(t,n){return typeof n=="function"?n(t):n}function ru(t){var n=on();return Pf(n,Ve,t)}function Pf(t,n,a){var s=t.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=a;var u=t.baseQueue,c=s.pending;if(c!==null){if(u!==null){var _=u.next;u.next=c.next,c.next=_}n.baseQueue=u=c,s.pending=null}if(c=t.baseState,u===null)t.memoizedState=c;else{n=u.next;var E=_=null,z=null,Z=n,st=!1;do{var mt=Z.lane&-536870913;if(mt!==Z.lane?(Ae&mt)===mt:(fa&mt)===mt){var Y=Z.revertLane;if(Y===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:Z.action,hasEagerState:Z.hasEagerState,eagerState:Z.eagerState,next:null}),mt===As&&(st=!0);else if((fa&Y)===Y){Z=Z.next,Y===As&&(st=!0);continue}else mt={lane:0,revertLane:Z.revertLane,gesture:null,action:Z.action,hasEagerState:Z.hasEagerState,eagerState:Z.eagerState,next:null},z===null?(E=z=mt,_=c):z=z.next=mt,de.lanes|=Y,qa|=Y;mt=Z.action,Us&&a(c,mt),c=Z.hasEagerState?Z.eagerState:a(c,mt)}else Y={lane:mt,revertLane:Z.revertLane,gesture:Z.gesture,action:Z.action,hasEagerState:Z.hasEagerState,eagerState:Z.eagerState,next:null},z===null?(E=z=Y,_=c):z=z.next=Y,de.lanes|=mt,qa|=mt;Z=Z.next}while(Z!==null&&Z!==n);if(z===null?_=c:z.next=E,!ni(c,t.memoizedState)&&(hn=!0,st&&(a=pr,a!==null)))throw a;t.memoizedState=c,t.baseState=_,t.baseQueue=z,s.lastRenderedState=c}return u===null&&(s.lanes=0),[t.memoizedState,s.dispatch]}function zf(t){var n=on(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=t;var s=a.dispatch,u=a.pending,c=n.memoizedState;if(u!==null){a.pending=null;var _=u=u.next;do c=t(c,_.action),_=_.next;while(_!==u);ni(c,n.memoizedState)||(hn=!0),n.memoizedState=c,n.baseQueue===null&&(n.baseState=c),a.lastRenderedState=c}return[c,s]}function fg(t,n,a){var s=de,u=on(),c=ve;if(c){if(a===void 0)throw Error(r(407));a=a()}else a=n();var _=!ni((Ve||u).memoizedState,a);if(_&&(u.memoizedState=a,hn=!0),u=u.queue,Ff(pg.bind(null,s,u,t),[t]),t=u.getSnapshot!==n||_||fn!==null&&(fn.memoizedState.tag&1)!==0,yr(t?9:8,{destroy:void 0},dg.bind(null,s,u,a,n),null),t){if(s.flags|=2048,qe===null)throw Error(r(349));c||(fa&127)!==0||hg(s,n,a)}return a}function hg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=de.updateQueue,n===null?(n=au(),de.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function dg(t,n,a,s){n.value=a,n.getSnapshot=s,mg(n)&&gg(t)}function pg(t,n,a){return a(function(){mg(n)&&gg(t)})}function mg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ni(t,a)}catch{return!0}}function gg(t){var n=Ss(t,2);n!==null&&Kn(n,t,2)}function If(t){var n=Fn();if(typeof t=="function"){var a=t;if(t=a(),Us){mn(!0);try{a()}finally{mn(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:t},n}function _g(t,n,a,s){return t.baseState=a,Pf(t,Ve,typeof s=="function"?s:ha)}function cx(t,n,a,s,u){if(uu(t))throw Error(r(485));if(t=n.action,t!==null){var c={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(_){c.listeners.push(_)}};Mt.T!==null?a(!0):c.isTransition=!1,s(c),a=n.pending,a===null?(c.next=n.pending=c,vg(n,c)):(c.next=a.next,n.pending=a.next=c)}}function vg(t,n){var a=n.action,s=n.payload,u=t.state;if(n.isTransition){var c=Mt.T,_={};_.types=c!==null?c.types:null,Mt.T=_;try{var E=a(u,s),z=Mt.S;z!==null&&z(_,E),yg(t,n,E)}catch(Z){Bf(t,n,Z)}finally{c!==null&&_.types!==null&&(c.types=_.types),Mt.T=c}}else try{c=a(u,s),yg(t,n,c)}catch(Z){Bf(t,n,Z)}}function yg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(s){Sg(t,n,s)},function(s){return Bf(t,n,s)}):Sg(t,n,a)}function Sg(t,n,a){n.status="fulfilled",n.value=a,xg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,vg(t,a)))}function Bf(t,n,a){var s=t.pending;if(t.pending=null,s!==null){s=s.next;do n.status="rejected",n.reason=a,xg(n),n=n.next;while(n!==s)}t.action=null}function xg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Mg(t,n){return n}function Eg(t,n){if(ve){var a=qe.formState;if(a!==null){t:{var s=de;if(ve){if(Ze){e:{for(var u=Ze,c=yi;u.nodeType!==8;){if(!c){u=null;break e}if(u=xi(u.nextSibling),u===null){u=null;break e}}c=u.data,u=c==="F!"||c==="F"?u:null}if(u){Ze=xi(u.nextSibling),s=u.data==="F!";break t}}Oa(s)}s=!1}s&&(n=a[0])}}return a=Fn(),a.memoizedState=a.baseState=n,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Mg,lastRenderedState:n},a.queue=s,a=Vg.bind(null,de,s),s.dispatch=a,s=If(!1),c=kf.bind(null,de,!1,s.queue),s=Fn(),u={state:n,dispatch:null,action:t,pending:null},s.queue=u,a=cx.bind(null,de,u,c,a),u.dispatch=a,s.memoizedState=t,[n,a,!1]}function Tg(t){var n=on();return bg(n,Ve,t)}function bg(t,n,a){if(n=Pf(t,n,Mg)[0],t=ru(ha)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var s=Fo(n)}catch(_){throw _===mr?Kl:_}else s=n;n=on();var u=n.queue,c=u.dispatch;return a!==n.memoizedState&&(de.flags|=2048,yr(9,{destroy:void 0},fx.bind(null,u,a),null)),[s,c,t]}function fx(t,n){t.action=n}function Ag(t){var n=on(),a=Ve;if(a!==null)return bg(n,a,t);on(),n=n.memoizedState,a=on();var s=a.queue.dispatch;return a.memoizedState=t,[n,s,!1]}function yr(t,n,a,s){return t={tag:t,create:a,deps:s,inst:n,next:null},n=de.updateQueue,n===null&&(n=au(),de.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(s=a.next,a.next=t,t.next=s,n.lastEffect=t),t}function Rg(){return on().memoizedState}function ou(t,n,a,s){var u=Fn();de.flags|=t,u.memoizedState=yr(1|n,{destroy:void 0},a,s===void 0?null:s)}function lu(t,n,a,s){var u=on();s=s===void 0?null:s;var c=u.memoizedState.inst;Ve!==null&&s!==null&&wf(s,Ve.memoizedState.deps)?u.memoizedState=yr(n,c,a,s):(de.flags|=t,u.memoizedState=yr(1|n,c,a,s))}function Cg(t,n){ou(8390656,8,t,n)}function Ff(t,n){lu(2048,8,t,n)}function hx(t){de.flags|=4;var n=de.updateQueue;if(n===null)n=au(),de.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function wg(t){var n=on().memoizedState;return hx({ref:n,nextImpl:t}),function(){if((Pe&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function Dg(t,n){return lu(4,2,t,n)}function Ug(t,n){return lu(4,4,t,n)}function Ng(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Lg(t,n,a){a=a!=null?a.concat([t]):null,lu(4,4,Ng.bind(null,n,t),a)}function Hf(){}function Og(t,n){var a=on();n=n===void 0?null:n;var s=a.memoizedState;return n!==null&&wf(n,s[1])?s[0]:(a.memoizedState=[t,n],t)}function Pg(t,n){var a=on();n=n===void 0?null:n;var s=a.memoizedState;if(n!==null&&wf(n,s[1]))return s[0];if(s=t(),Us){mn(!0);try{t()}finally{mn(!1)}}return a.memoizedState=[s,n],s}function Gf(t,n,a){return a===void 0||(fa&1073741824)!==0&&(Ae&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=Y_(),de.lanes|=t,qa|=t,a)}function zg(t,n,a,s){return ni(a,n)?a:Ha.current!==null?(t=Gf(t,a,s),ni(t,n)||(hn=!0),t):(fa&106)===0||(fa&1073741824)!==0&&(Ae&261930)===0?(hn=!0,t.memoizedState=a):(t=Y_(),de.lanes|=t,qa|=t,n)}function Ig(t,n,a,s,u){var c=vt.p;vt.p=c!==0&&8>c?c:8;var _=Mt.T,E={};E.types=_!==null?_.types:null,Mt.T=E,kf(t,!1,n,a);try{var z=u(),Z=Mt.S;if(Z!==null&&Z(E,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var st=ox(z,s);Ho(t,n,st,oi(t))}else Ho(t,n,s,oi(t))}catch(mt){Ho(t,n,{then:function(){},status:"rejected",reason:mt},oi())}finally{vt.p=c,_!==null&&E.types!==null&&(_.types=E.types),Mt.T=_}}function dx(){}function Vf(t,n,a,s){if(t.tag!==5)throw Error(r(476));var u=Bg(t).queue;Ig(t,u,n,P,a===null?dx:function(){return Fg(t),a(s)})}function Bg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:P,baseState:P,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:P},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Fg(t){var n=Bg(t);n.next===null&&(n=t.alternate.memoizedState),Ho(t,n.next.queue,{},oi())}function Xf(){return An(Br)}function Hg(){return on().memoizedState}function Gg(){return on().memoizedState}function px(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=oi();t=Ba(a);var s=Fa(n,t,a);s!==null&&(Kn(s,n,a),Oo(s,n,a)),n={cache:_f()},t.payload=n;return}n=n.return}}function mx(t,n,a){var s=oi();a={lane:s,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},uu(t)?Xg(n,a):(a=lf(t,n,a,s),a!==null&&(Kn(a,t,s),kg(a,n,s)))}function Vg(t,n,a){var s=oi();Ho(t,n,a,s)}function Ho(t,n,a,s){var u={lane:s,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(uu(t))Xg(n,u);else{var c=t.alternate;if(t.lanes===0&&(c===null||c.lanes===0)&&(c=n.lastRenderedReducer,c!==null))try{var _=n.lastRenderedState,E=c(_,a);if(u.hasEagerState=!0,u.eagerState=E,ni(E,_))return Hl(t,n,u,0),qe===null&&Fl(),!1}catch{}if(a=lf(t,n,u,s),a!==null)return Kn(a,t,s),kg(a,n,s),!0}return!1}function kf(t,n,a,s){if(s={lane:2,revertLane:Oh(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},uu(t)){if(n)throw Error(r(479))}else n=lf(t,a,s,2),n!==null&&Kn(n,t,2)}function uu(t){var n=t.alternate;return t===de||n!==null&&n===de}function Xg(t,n){_r=nu=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function kg(t,n,a){if((a&4194048)!==0){var s=n.lanes;s&=t.pendingLanes,a|=s,n.lanes=a,K(t,a)}}var cu={readContext:An,use:su,useCallback:an,useContext:an,useEffect:an,useImperativeHandle:an,useLayoutEffect:an,useInsertionEffect:an,useMemo:an,useReducer:an,useRef:an,useState:an,useDebugValue:an,useDeferredValue:an,useTransition:an,useSyncExternalStore:an,useId:an,useHostTransitionStatus:an,useFormState:an,useActionState:an,useOptimistic:an,useMemoCache:an,useCacheRefresh:an,useEffectEvent:an},Yg={readContext:An,use:su,useCallback:function(t,n){return Fn().memoizedState=[t,n===void 0?null:n],t},useContext:An,useEffect:Cg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,ou(4194308,4,Ng.bind(null,n,t),a)},useLayoutEffect:function(t,n){return ou(4194308,4,t,n)},useInsertionEffect:function(t,n){ou(4,2,t,n)},useMemo:function(t,n){var a=Fn();n=n===void 0?null:n;var s=t();if(Us){mn(!0);try{t()}finally{mn(!1)}}return a.memoizedState=[s,n],s},useReducer:function(t,n,a){var s=Fn();if(a!==void 0){var u=a(n);if(Us){mn(!0);try{a(n)}finally{mn(!1)}}}else u=n;return s.memoizedState=s.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},s.queue=t,t=t.dispatch=mx.bind(null,de,t),[s.memoizedState,t]},useRef:function(t){var n=Fn();return t={current:t},n.memoizedState=t},useState:function(t){t=If(t);var n=t.queue,a=Vg.bind(null,de,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Hf,useDeferredValue:function(t,n){var a=Fn();return Gf(a,t,n)},useTransition:function(){var t=If(!1);return t=Ig.bind(null,de,t.queue,!0,!1),Fn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var s=de,u=Fn();if(ve){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),qe===null)throw Error(r(349));(Ae&127)!==0||hg(s,n,a)}u.memoizedState=a;var c={value:a,getSnapshot:n};return u.queue=c,Cg(pg.bind(null,s,c,t),[t]),s.flags|=2048,yr(9,{destroy:void 0},dg.bind(null,s,c,a,n),null),a},useId:function(){var t=Fn(),n=qe.identifierPrefix;if(ve){var a=Vi,s=Gi;a=(s&~(1<<32-Nn(s)-1)).toString(32)+a,n="_"+n+"R_"+a,a=iu++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=lx++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Xf,useFormState:Eg,useActionState:Eg,useOptimistic:function(t){var n=Fn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=kf.bind(null,de,!0,a),a.dispatch=n,[t,n]},useMemoCache:Of,useCacheRefresh:function(){return Fn().memoizedState=px.bind(null,de)},useEffectEvent:function(t){var n=Fn(),a={impl:t};return n.memoizedState=a,function(){if((Pe&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},qg={readContext:An,use:su,useCallback:Og,useContext:An,useEffect:Ff,useImperativeHandle:Lg,useInsertionEffect:Dg,useLayoutEffect:Ug,useMemo:Pg,useReducer:ru,useRef:Rg,useState:function(){return ru(ha)},useDebugValue:Hf,useDeferredValue:function(t,n){var a=on();return zg(a,Ve.memoizedState,t,n)},useTransition:function(){var t=ru(ha)[0],n=on().memoizedState;return[typeof t=="boolean"?t:Fo(t),n]},useSyncExternalStore:fg,useId:Hg,useHostTransitionStatus:Xf,useFormState:Tg,useActionState:Tg,useOptimistic:function(t,n){var a=on();return _g(a,Ve,t,n)},useMemoCache:Of,useCacheRefresh:Gg,useEffectEvent:wg},gx={readContext:An,use:su,useCallback:Og,useContext:An,useEffect:Ff,useImperativeHandle:Lg,useInsertionEffect:Dg,useLayoutEffect:Ug,useMemo:Pg,useReducer:zf,useRef:Rg,useState:function(){return zf(ha)},useDebugValue:Hf,useDeferredValue:function(t,n){var a=on();return Ve===null?Gf(a,t,n):zg(a,Ve.memoizedState,t,n)},useTransition:function(){var t=zf(ha)[0],n=on().memoizedState;return[typeof t=="boolean"?t:Fo(t),n]},useSyncExternalStore:fg,useId:Hg,useHostTransitionStatus:Xf,useFormState:Ag,useActionState:Ag,useOptimistic:function(t,n){var a=on();return Ve!==null?_g(a,Ve,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Of,useCacheRefresh:Gg,useEffectEvent:wg};function Yf(t,n,a,s){n=t.memoizedState,a=a(s,n),a=a==null?n:N({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var qf={enqueueSetState:function(t,n,a){t=t._reactInternals;var s=oi(),u=Ba(s);u.payload=n,a!=null&&(u.callback=a),n=Fa(t,u,s),n!==null&&(Kn(n,t,s),Oo(n,t,s))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var s=oi(),u=Ba(s);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Fa(t,u,s),n!==null&&(Kn(n,t,s),Oo(n,t,s))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=oi(),s=Ba(a);s.tag=2,n!=null&&(s.callback=n),n=Fa(t,s,a),n!==null&&(Kn(n,t,a),Oo(n,t,a))}};function Wg(t,n,a,s,u,c,_){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,c,_):n.prototype&&n.prototype.isPureReactComponent?!Ao(a,s)||!Ao(u,c):!0}function jg(t,n,a,s){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,s),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,s),n.state!==t&&qf.enqueueReplaceState(n,n.state,null)}function Ns(t,n){var a=n;if("ref"in n){a={};for(var s in n)s!=="ref"&&(a[s]=n[s])}if(t=t.defaultProps){a===n&&(a=N({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function Zg(t){Bl(t)}function Kg(t){console.error(t)}function Qg(t){Bl(t)}function fu(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(s){setTimeout(function(){throw s})}}function Jg(t,n,a){try{var s=t.onCaughtError;s(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Wf(t,n,a){return a=Ba(a),a.tag=3,a.payload={element:null},a.callback=function(){fu(t,n)},a}function $g(t){return t=Ba(t),t.tag=3,t}function t_(t,n,a,s){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var c=s.value;t.payload=function(){return u(c)},t.callback=function(){Jg(n,a,s)}}var _=a.stateNode;_!==null&&typeof _.componentDidCatch=="function"&&(t.callback=function(){Jg(n,a,s),typeof u!="function"&&(Wa===null?Wa=new Set([this]):Wa.add(this));var E=s.stack;this.componentDidCatch(s.value,{componentStack:E!==null?E:""})})}function _x(t,n,a,s,u){if(a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(n=a.alternate,n!==null&&Ts(n,a,u,!0),a=Rn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return On===null?Nu():a.alternate===null&&sn===0&&(sn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,s===Ql?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([s]):n.add(s),Uh(t,s,u)),!1;case 22:return a.flags|=65536,s===Ql?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([s])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([s]):a.add(s)),Uh(t,s,u)),!1}throw Error(r(435,a.tag))}return Uh(t,s,u),Nu(),!1}if(ve)return n=Rn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,s!==df&&(t=Error(r(422),{cause:s}),wo(gi(t,a)))):(s!==df&&(n=Error(r(423),{cause:s}),wo(gi(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,s=gi(s,a),u=Wf(t.stateNode,s,u),Ef(t,u),sn!==4&&(sn=2)),!1;var c=Error(r(520),{cause:s});if(c=gi(c,a),jo===null?jo=[c]:jo.push(c),sn!==4&&(sn=2),n===null)return!0;s=gi(s,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=Wf(a.stateNode,s,t),Ef(a,t),!1;case 1:if(n=a.type,c=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Wa===null||!Wa.has(c))))return a.flags|=65536,u&=-u,a.lanes|=u,u=$g(u),t_(u,t,a,s),Ef(a,u),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var jf=Error(r(461)),hn=!1;function _n(t,n,a,s){n.child=t===null?ag(n,null,a,s):Ds(n,t.child,a,s)}function e_(t,n,a,s,u){a=a.render;var c=n.ref;if("ref"in s){var _={};for(var E in s)E!=="ref"&&(_[E]=s[E])}else _=s;return bs(n),s=Df(t,n,a,_,c,u),E=Uf(),t!==null&&!hn?(Nf(t,n,u),da(t,n,u)):(ve&&E&&kl(n),n.flags|=1,_n(t,n,s,u),n.child)}function n_(t,n,a,s,u){if(t===null){var c=a.type;return typeof c=="function"&&!uf(c)&&c.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=c,i_(t,n,c,s,u)):(t=Vl(a.type,null,s,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(c=t.child,!nh(t,u)){var _=c.memoizedProps;if(a=a.compare,a=a!==null?a:Ao,a(_,s)&&t.ref===n.ref)return da(t,n,u)}return n.flags|=1,t=oa(c,s),t.ref=n.ref,t.return=n,n.child=t}function i_(t,n,a,s,u){if(t!==null){var c=t.memoizedProps;if(Ao(c,s)&&t.ref===n.ref)if(hn=!1,n.pendingProps=s=c,nh(t,u))(t.flags&131072)!==0&&(hn=!0);else return n.lanes=t.lanes,da(t,n,u)}return Zf(t,n,a,s,u)}function a_(t,n,a,s){var u=s.children,c=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if((n.flags&128)!==0){if(c=c!==null?c.baseLanes|a:a,t!==null){for(s=n.child=t.child,u=0;s!==null;)u=u|s.lanes|s.childLanes,s=s.sibling;s=u&~c}else s=0,n.child=null;return s_(t,n,c,a,s)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Zl(n,c!==null?c.cachePool:null),c!==null?og(n,c):bf(),lg(n);else return s=n.lanes=536870912,s_(t,n,c!==null?c.baseLanes|a:a,a,s)}else c!==null?(Zl(n,c.cachePool),og(n,c),Va(),n.memoizedState=null):(t!==null&&Zl(n,null),bf(),Va());return _n(t,n,u,a),n.child}function Go(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function s_(t,n,a,s,u){var c=yf();return c=c===null?null:{parent:cn._currentValue,pool:c},n.memoizedState={baseLanes:a,cachePool:c},t!==null&&Zl(n,null),bf(),lg(n),t!==null&&Ts(t,n,s,!0),n.childLanes=u,null}function hu(t,n){return n=du({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function r_(t,n,a){return Ds(n,t.child,null,a),t=hu(n,n.pendingProps),t.flags|=2,ii(n),n.memoizedState=null,t}function vx(t,n,a){var s=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(ve){if(s.mode==="hidden")return t=hu(n,s),n.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Go(null,t);if(Rf(n),(t=Ze)?(t=N0(t,yi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Na!==null?{id:Gi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},a=Xm(t),a.return=n,n.child=a,xn=n,Ze=null)):t=null,t===null)throw Oa(n);return n.lanes=536870912,null}return hu(n,s)}var c=t.memoizedState;if(c!==null){var _=c.dehydrated;if(Rf(n),u)if(n.flags&256)n.flags&=-257,n=r_(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(r(558));else if(hn||Ts(t,n,a,!1),u=(a&t.childLanes)!==0,hn||u){if(Ha.current===null){if(s=qe,s!==null&&(_=rt(s,a),_!==0&&_!==c.retryLane))throw c.retryLane=_,Ss(t,_),Kn(s,t,_),jf;Nu()}n=r_(t,n,a)}else t=c.treeContext,Ze=xi(_.nextSibling),xn=n,ve=!0,La=null,yi=!1,t!==null&&qm(n,t),n=hu(n,s),n.flags|=134221824;return n}return t=oa(t.child,{mode:s.mode,children:s.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Sr(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Zf(t,n,a,s,u){return bs(n),a=Df(t,n,a,s,void 0,u),s=Uf(),t!==null&&!hn?(Nf(t,n,u),da(t,n,u)):(ve&&s&&kl(n),n.flags|=1,_n(t,n,a,u),n.child)}function o_(t,n,a,s,u,c){return bs(n),n.updateQueue=null,a=cg(n,s,a,u),ug(t),s=Uf(),t!==null&&!hn?(Nf(t,n,c),da(t,n,c)):(ve&&s&&kl(n),n.flags|=1,_n(t,n,a,c),n.child)}function l_(t,n,a,s,u){if(bs(n),n.stateNode===null){var c=cr,_=a.contextType;typeof _=="object"&&_!==null&&(c=An(_)),c=new a(s,c),n.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=qf,n.stateNode=c,c._reactInternals=n,c=n.stateNode,c.props=s,c.state=n.memoizedState,c.refs={},xf(n),_=a.contextType,c.context=typeof _=="object"&&_!==null?An(_):cr,c.state=n.memoizedState,_=a.getDerivedStateFromProps,typeof _=="function"&&(Yf(n,a,_,s),c.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(_=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),_!==c.state&&qf.enqueueReplaceState(c,c.state,null),zo(n,s,c,u),Po(),c.state=n.memoizedState),typeof c.componentDidMount=="function"&&(n.flags|=4194308),s=!0}else if(t===null){c=n.stateNode;var E=n.memoizedProps,z=Ns(a,E);c.props=z;var Z=c.context,st=a.contextType;_=cr,typeof st=="object"&&st!==null&&(_=An(st));var mt=a.getDerivedStateFromProps;st=typeof mt=="function"||typeof c.getSnapshotBeforeUpdate=="function",E=n.pendingProps!==E,st||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(E||Z!==_)&&jg(n,c,s,_),Ia=!1;var Y=n.memoizedState;c.state=Y,zo(n,s,c,u),Po(),Z=n.memoizedState,E||Y!==Z||Ia?(typeof mt=="function"&&(Yf(n,a,mt,s),Z=n.memoizedState),(z=Ia||Wg(n,a,z,s,Y,Z,_))?(st||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(n.flags|=4194308)):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=s,n.memoizedState=Z),c.props=s,c.state=Z,c.context=_,s=z):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),s=!1)}else{c=n.stateNode,Mf(t,n),_=n.memoizedProps,st=Ns(a,_),c.props=st,mt=n.pendingProps,Y=c.context,Z=a.contextType,z=cr,typeof Z=="object"&&Z!==null&&(z=An(Z)),E=a.getDerivedStateFromProps,(Z=typeof E=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(_!==mt||Y!==z)&&jg(n,c,s,z),Ia=!1,Y=n.memoizedState,c.state=Y,zo(n,s,c,u),Po();var et=n.memoizedState;_!==mt||Y!==et||Ia||t!==null&&t.dependencies!==null&&Wl(t.dependencies)?(typeof E=="function"&&(Yf(n,a,E,s),et=n.memoizedState),(st=Ia||Wg(n,a,st,s,Y,et,z)||t!==null&&t.dependencies!==null&&Wl(t.dependencies))?(Z||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(s,et,z),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(s,et,z)),typeof c.componentDidUpdate=="function"&&(n.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof c.componentDidUpdate!="function"||_===t.memoizedProps&&Y===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&Y===t.memoizedState||(n.flags|=1024),n.memoizedProps=s,n.memoizedState=et),c.props=s,c.state=et,c.context=z,s=st):(typeof c.componentDidUpdate!="function"||_===t.memoizedProps&&Y===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&Y===t.memoizedState||(n.flags|=1024),s=!1)}return c=s,Sr(t,n),s=(n.flags&128)!==0,c||s?(c=n.stateNode,a=s&&typeof a.getDerivedStateFromError!="function"?null:c.render(),n.flags|=1,t!==null&&s?(n.child=Ds(n,t.child,null,u),n.child=Ds(n,null,a,u)):_n(t,n,a,u),n.memoizedState=c.state,t=n.child):t=da(t,n,u),t}function u_(t,n,a,s){return Ms(),n.flags|=256,_n(t,n,a,s),n.child}var Kf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Qf(t){return{baseLanes:t,cachePool:Jm()}}function Jf(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ri),t}function c_(t,n,a){var s=n.pendingProps,u=!1,c=(n.flags&128)!==0,_;if((_=c)||(_=t!==null&&t.memoizedState===null?!1:(Cn.current&2)!==0),_&&(u=!0,n.flags&=-129),_=(n.flags&32)!==0,n.flags&=-33,t===null){if(ve){if(u?Ga(n):Va(),(t=Ze)?(t=N0(t,yi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Na!==null?{id:Gi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},a=Xm(t),a.return=n,n.child=a,xn=n,Ze=null)):t=null,t===null)throw Oa(n);return Qh(t)?n.lanes=32:n.lanes=536870912,null}return c=s.children,s=s.fallback,u?(Va(),u=n.mode,c=du({mode:"hidden",children:c},u),s=xs(s,u,a,null),c.return=n,s.return=n,c.sibling=s,n.child=c,s=n.child,s.memoizedState=Qf(a),s.childLanes=Jf(t,_,a),n.memoizedState=Kf,Go(null,s)):(Ga(n),$f(n,c))}var E=t.memoizedState;if(E!==null){var z=E.dehydrated;if(z!==null)return yx(t,n,c,_,s,z,E,a)}return u?(Va(),u=s.fallback,c=n.mode,E=t.child,z=E.sibling,s=oa(E,{mode:"hidden",children:s.children}),s.subtreeFlags=E.subtreeFlags&1206910976,z!==null?u=oa(z,u):(u=xs(u,c,a,null),u.flags|=2),u.return=n,s.return=n,s.sibling=u,n.child=s,Go(null,s),s=n.child,u=t.child.memoizedState,u===null?u=Qf(a):(c=u.cachePool,c!==null?(E=cn._currentValue,c=c.parent!==E?{parent:E,pool:E}:c):c=Jm(),u={baseLanes:u.baseLanes|a,cachePool:c}),s.memoizedState=u,s.childLanes=Jf(t,_,a),n.memoizedState=Kf,Go(t.child,s)):(Ga(n),a=t.child,t=a.sibling,a=oa(a,{mode:"visible",children:s.children}),a.return=n,a.sibling=null,t!==null&&(_=n.deletions,_===null?(n.deletions=[t],n.flags|=16):_.push(t)),n.child=a,n.memoizedState=null,a)}function $f(t,n){return n=du({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function du(t,n){return t=qn(22,t,null,n),t.lanes=0,t}function pu(t,n,a){return Ds(n,t.child,null,a),t=$f(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function yx(t,n,a,s,u,c,_,E){if(a)return n.flags&256?(Ga(n),n.flags&=-257,pu(t,n,E)):n.memoizedState!==null?(Va(),n.child=t.child,n.flags|=128,null):(Va(),c=u.fallback,_=n.mode,u=du({mode:"visible",children:u.children},_),c=xs(c,_,E,null),c.flags|=2,u.return=n,c.return=n,u.sibling=c,n.child=u,Ds(n,t.child,null,E),u=n.child,u.memoizedState=Qf(E),u.childLanes=Jf(t,s,E),n.memoizedState=Kf,Go(null,u));if(Ga(n),Qh(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var z=s.dgst;return s=z,s!==""&&(u=Error(r(419)),u.stack="",u.digest=s,wo({value:u,source:null,stack:null})),pu(t,n,E)}if(hn||Ts(t,n,E,!1),s=(E&t.childLanes)!==0,hn||s){if(Ha.current!==null)return pu(t,n,E);if(s=qe,s!==null&&(u=rt(s,E),u!==0&&u!==_.retryLane))throw _.retryLane=u,Ss(t,u),Kn(s,t,u),jf;return Kh(c)||Nu(),pu(t,n,E)}return Kh(c)?(n.flags|=192,n.child=t.child,null):(t=_.treeContext,Ze=xi(c.nextSibling),xn=n,ve=!0,La=null,yi=!1,t!==null&&qm(n,t),n=$f(n,u.children),n.flags|=134221824,n)}function f_(t,n,a){t.lanes|=n;var s=t.alternate;s!==null&&(s.lanes|=n),ql(t.return,n,a)}function h_(t){for(var n=null;t!==null;){var a=t.alternate;a!==null&&eu(a)===null&&(n=t),t=t.sibling}return n}function mu(t,n,a,s,u,c){var _=t.memoizedState;_===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:s,tail:a,tailMode:u,treeForkCount:c}:(_.isBackwards=n,_.rendering=null,_.renderingStartTime=0,_.last=s,_.tail=a,_.tailMode=u,_.treeForkCount=c)}function th(t){var n=t.child;for(t.child=null;n!==null;){var a=n.sibling;n.sibling=t.child,t.child=n,n=a}}function eh(t,n,a){var s=n.pendingProps,u=s.revealOrder,c=s.tail;s=s.children;var _=Cn.current;if(n.flags&128)return Io(n,_),null;var E=(_&2)!==0;if(E?(_=_&1|2,n.flags|=128):_&=1,Io(n,_),u==="backwards"&&t!==null?(th(t),_n(t,n,s,a),th(t)):_n(t,n,s,a),s=ve?Co:0,!E&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&f_(t,a,n);else if(t.tag===19)f_(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"backwards":a=h_(n.child),a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null,th(n)),mu(n,!0,u,null,c,s);break;case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&eu(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}mu(n,!0,a,null,c,s);break;case"together":mu(n,!1,null,null,void 0,s);break;case"independent":n.memoizedState=null;break;default:a=h_(n.child),a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),mu(n,!1,u,a,c,s)}return n.child}function d_(t,n,a){var s=n.pendingProps;return Pa(n,n.type,s.value),_n(t,n,s.children,a),n.child}function da(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),qa|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Ts(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(r(153));if(n.child!==null){for(t=n.child,a=oa(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=oa(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function nh(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Wl(t)))}function Sx(t,n,a){switch(n.tag){case 3:L(n,n.stateNode.containerInfo),Pa(n,cn,t.memoizedState.cache),Ms();break;case 27:case 5:nt(n);break;case 4:L(n,n.stateNode.containerInfo);break;case 10:Pa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Rf(n),null;break;case 13:var s=n.memoizedState;if(s!==null){if(s.dehydrated!==null)return Ga(n),n.flags|=128,null;s=Ts(t,n,a,!1);var u=n.child.childLanes;return s||(a&u)!==0?c_(t,n,a):(Ga(n),t=da(t,n,a),t!==null?t.sibling:null)}Ga(n);break;case 19:if(n.flags&128)return eh(t,n,a);if(u=(t.flags&128)!==0,s=(a&n.childLanes)!==0,s||(Ts(t,n,a,!1),s=(a&n.childLanes)!==0),u){if(s)return eh(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Io(n,Cn.current),s)break;return null;case 22:return n.lanes=0,a_(t,n,a,n.pendingProps);case 24:Pa(n,cn,t.memoizedState.cache)}return da(t,n,a)}function p_(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)hn=!0;else{if(!nh(t,a)&&(n.flags&128)===0)return hn=!1,Sx(t,n,a);hn=(t.flags&131072)!==0}else hn=!1,ve&&(n.flags&1048576)!==0&&Ym(n,Co,n.index);switch(n.lanes=0,n.tag){case 16:t:{var s=n.pendingProps;if(t=Cs(n.elementType),n.type=t,typeof t=="function")uf(t)?(s=Ns(t,s),n.tag=1,n=l_(null,n,t,s,a)):(n.tag=0,n=Zf(null,n,t,s,a));else{if(t!=null){var u=t.$$typeof;if(u===V){n.tag=11,n=e_(null,n,t,s,a);break t}else if(u===_t){n.tag=14,n=n_(null,n,t,s,a);break t}else if(u===ct){n.tag=10,n.type=t,n=d_(null,n,a);break t}}throw n=Nt(t)||t,Error(r(306,n,""))}}return n;case 0:return Zf(t,n,n.type,n.pendingProps,a);case 1:return s=n.type,u=Ns(s,n.pendingProps),l_(t,n,s,u,a);case 3:t:{if(L(n,n.stateNode.containerInfo),t===null)throw Error(r(387));s=n.pendingProps;var c=n.memoizedState;u=c.element,Mf(t,n),zo(n,s,null,a);var _=n.memoizedState;if(s=_.cache,Pa(n,cn,s),s!==c.cache&&gf(n,[cn],a,!0),Po(),s=_.element,c.isDehydrated)if(c={element:s,isDehydrated:!1,cache:_.cache},n.updateQueue.baseState=c,n.memoizedState=c,n.flags&256){n=u_(t,n,s,a);break t}else if(s!==u){u=gi(Error(r(424)),n),wo(u),n=u_(t,n,s,a);break t}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,Ze=xi(t.firstChild),xn=n,ve=!0,La=null,yi=!0,a=ag(n,null,s,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling;else{if(Ms(),s===u){n=da(t,n,a);break t}_n(t,n,s,a)}n=n.child}return n;case 26:return Sr(t,n),t===null?(a=F0(n.type,null,n.pendingProps,null))?n.memoizedState=a:ve||(n.stateNode=v0(n.type,n.pendingProps,Ye.current,n)):n.memoizedState=F0(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return nt(n),t===null&&ve&&(s=n.stateNode=P0(n.type,n.pendingProps,Ye.current),xn=n,yi=!0,u=Ze,Ka(n.type)?(Jh=u,Ze=xi(s.firstChild)):Ze=u),_n(t,n,n.pendingProps.children,a),Sr(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&ve&&((u=s=Ze)&&(s=pM(s,n.type,n.pendingProps,yi),s!==null?(n.stateNode=s,xn=n,Ze=xi(s.firstChild),yi=!1,u=!0):u=!1),u||Oa(n)),nt(n),u=n.type,c=n.pendingProps,_=t!==null?t.memoizedProps:null,s=c.children,Xh(u,c)?s=null:_!==null&&Xh(u,_)&&(n.flags|=32),n.memoizedState!==null&&(u=Df(t,n,ux,null,null,a),Br._currentValue=u),Sr(t,n),_n(t,n,s,a),n.child;case 6:return t===null&&ve&&((t=a=Ze)&&(a=mM(a,n.pendingProps,yi),a!==null?(n.stateNode=a,xn=n,Ze=null,t=!0):t=!1),t||Oa(n)),null;case 13:return c_(t,n,a);case 4:return L(n,n.stateNode.containerInfo),s=n.pendingProps,t===null?n.child=Ds(n,null,s,a):_n(t,n,s,a),n.child;case 11:return e_(t,n,n.type,n.pendingProps,a);case 7:return s=n.pendingProps,Sr(t,n),_n(t,n,s,a),n.child;case 8:return _n(t,n,n.pendingProps.children,a),n.child;case 12:return _n(t,n,n.pendingProps.children,a),n.child;case 10:return d_(t,n,a);case 9:return u=n.type._context,s=n.pendingProps.children,bs(n),u=An(u),s=s(u),n.flags|=1,_n(t,n,s,a),n.child;case 14:return n_(t,n,n.type,n.pendingProps,a);case 15:return i_(t,n,n.type,n.pendingProps,a);case 19:return eh(t,n,a);case 31:return vx(t,n,a);case 22:return a_(t,n,a,n.pendingProps);case 24:return bs(n),s=An(cn),t===null?(u=yf(),u===null&&(u=qe,c=_f(),u.pooledCache=c,c.refCount++,c!==null&&(u.pooledCacheLanes|=a),u=c),n.memoizedState={parent:s,cache:u},xf(n),Pa(n,cn,u)):((t.lanes&a)!==0&&(Mf(t,n),zo(n,null,null,a),Po()),u=t.memoizedState,c=n.memoizedState,u.parent!==s?(u={parent:s,cache:s},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Pa(n,cn,s)):(s=c.cache,Pa(n,cn,s),s!==u.cache&&gf(n,[cn],a,!0))),_n(t,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),s=n.pendingProps,s.name!=null&&s.name!=="auto"?n.flags|=t===null?18882560:18874368:ve&&kl(n),t!==null&&t.memoizedProps.name!==s.name?n.flags|=4194816:Sr(t,n),_n(t,n,s.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function pa(t){t.flags|=4}function ih(t,n,a,s,u){var c;if((c=(t.mode&32)!==0)&&(c=a===null?X0(n,s):X0(n,s)&&(s.src!==a.src||s.srcSet!==a.srcSet)),c){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(Z_())t.flags|=8192;else throw ws=Ql,Sf}else t.flags&=-16777217}function m_(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!k0(n))if(Z_())t.flags|=8192;else throw ws=Ql,Sf}function gu(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Cl():536870912,t.lanes|=n,br|=n)}function Vo(t,n){if(!ve)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,s=null;a!==null;)a.alternate!==null&&(s=a),a=a.sibling;s===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null;break;default:for(n=t.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null}}function Ke(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,s=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,s|=u.subtreeFlags&1206910976,s|=u.flags&1206910976,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,s|=u.subtreeFlags,s|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=s,t.childLanes=a,n}function xx(t,n,a){var s=n.pendingProps;switch(hf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ke(n),null;case 1:return Ke(n),null;case 3:return a=n.stateNode,s=null,t!==null&&(s=t.memoizedState.cache),n.memoizedState.cache!==s&&(n.flags|=2048),ca(cn),b(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(dr(n)?pa(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,pf())),Ke(n),null;case 26:var u=n.type,c=n.memoizedState;return t===null?(pa(n),c!==null?(Ke(n),m_(n,c)):(Ke(n),ih(n,u,null,s,a))):c?c!==t.memoizedState?(pa(n),Ke(n),m_(n,c)):(Ke(n),n.flags&=-16777217):(t=t.memoizedProps,t!==s&&pa(n),Ke(n),ih(n,u,t,s,a)),null;case 27:if(pt(n),a=Ye.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==s&&pa(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return Ke(n),n.subtreeFlags&=-33554433,null}t=Bt.current,dr(n)?Wm(n):(t=P0(u,s,a),n.stateNode=t,pa(n))}return Ke(n),n.subtreeFlags&=-33554433,null;case 5:if(pt(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==s&&pa(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return Ke(n),n.subtreeFlags&=-33554433,null}if(c=Bt.current,dr(n))Wm(n);else{var _=$o(Ye.current);switch(c){case 1:c=_.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:c=_.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":c=_.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":c=_.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":c=_.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof s.is=="string"?_.createElement("select",{is:s.is}):_.createElement("select"),s.multiple?c.multiple=!0:s.size&&(c.size=s.size);break;default:c=typeof s.is=="string"?_.createElement(u,{is:s.is}):_.createElement(u)}}c[Dt]=n,c[Wt]=s;t:for(_=n.child;_!==null;){if(_.tag===5||_.tag===6)c.appendChild(_.stateNode);else if(_.tag!==4&&_.tag!==27&&_.child!==null){_.child.return=_,_=_.child;continue}if(_===n)break t;for(;_.sibling===null;){if(_.return===null||_.return===n)break t;_=_.return}_.sibling.return=_.return,_=_.sibling}n.stateNode=c;t:switch(Dn(c,u,s),u){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break t;case"img":s=!0;break t;default:s=!1}s&&pa(n)}}return Ke(n),n.subtreeFlags&=-33554433,ih(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==s&&pa(n);else{if(typeof s!="string"&&n.stateNode===null)throw Error(r(166));if(t=Ye.current,dr(n)){if(t=n.stateNode,a=n.memoizedProps,s=null,u=xn,u!==null)switch(u.tag){case 27:case 5:s=u.memoizedProps}t[Dt]=n,t=!!(t.nodeValue===a||s!==null&&s.suppressHydrationWarning===!0||p0(t.nodeValue,a)),t||Oa(n,!0)}else t=$o(t).createTextNode(s),t[Dt]=n,n.stateNode=t}return Ke(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(s=dr(n),a!==null){if(t===null){if(!s)throw Error(r(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[Dt]=n}else Ms(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ke(n),t=!1}else a=pf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(ii(n),n):(ii(n),null);if((n.flags&128)!==0)throw Error(r(558))}return Ke(n),null;case 13:if(s=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=dr(n),s!==null&&s.dehydrated!==null){if(t===null){if(!u)throw Error(r(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(r(317));u[Dt]=n}else Ms(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ke(n),u=!1}else u=pf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ii(n),n):(ii(n),null)}return ii(n),(n.flags&128)!==0?(n.lanes=a,n):(a=s!==null,t=t!==null&&t.memoizedState!==null,a&&(s=n.child,u=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(u=s.alternate.memoizedState.cachePool.pool),c=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(c=s.memoizedState.cachePool.pool),c!==u&&(s.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),gu(n,n.updateQueue),Ke(n),null);case 4:return b(),t===null&&Bh(n.stateNode.containerInfo),n.flags|=67108864,Ke(n),null;case 10:return ca(n.type),Ke(n),null;case 19:if(Cf(n),s=n.memoizedState,s===null)return Ke(n),null;if(u=(n.flags&128)!==0,c=s.rendering,c===null)if(u)Vo(s,!1);else{if(sn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(c=eu(t),c!==null){for(n.flags|=128,Vo(s,!1),t=c.updateQueue,n.updateQueue=t,gu(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Vm(a,t),a=a.sibling;return Io(n,Cn.current&1|2),ve&&la(n,s.treeForkCount),n.child}t=t.sibling}s.tail!==null&&k()>Cu&&(n.flags|=128,u=!0,Vo(s,!1),n.lanes=4194304)}else{if(!u)if(t=eu(c),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,gu(n,t),Vo(s,!0),s.tail===null&&s.tailMode!=="collapsed"&&s.tailMode!=="visible"&&!c.alternate&&!ve)return Ke(n),null}else 2*k()-s.renderingStartTime>Cu&&a!==536870912&&(n.flags|=128,u=!0,Vo(s,!1),n.lanes=4194304);s.isBackwards?(c.sibling=n.child,n.child=c):(t=s.last,t!==null?t.sibling=c:n.child=c,s.last=c)}if(s.tail!==null){t=s.tail;t:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break t}a=a.sibling}a=!0}return s.rendering=t,s.tail=t.sibling,s.renderingStartTime=k(),t.sibling=null,c=Cn.current,c=u?c&1|2:c&1,s.tailMode==="visible"||s.tailMode==="collapsed"||!a||ve?Io(n,c):(a=c,Zt(Rn,n),Zt(Cn,a),On===null&&(On=n)),ve&&la(n,s.treeForkCount),t}return Ke(n),null;case 22:case 23:return ii(n),Af(),s=n.memoizedState!==null,t!==null?t.memoizedState!==null!==s&&(n.flags|=8192):s&&(n.flags|=8192),s?(a&536870912)!==0&&(n.flags&128)===0&&(Ke(n),n.subtreeFlags&6&&(n.flags|=8192)):Ke(n),a=n.updateQueue,a!==null&&gu(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),s=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),s!==a&&(n.flags|=2048),t!==null&&wt(Rs),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ca(cn),Ke(n),null;case 25:return null;case 30:return n.flags|=33554432,Ke(n),null}throw Error(r(156,n.tag))}function Mx(t,n){switch(hf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return ca(cn),b(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return pt(n),null;case 31:if(n.memoizedState!==null){if(ii(n),n.alternate===null)throw Error(r(340));Ms()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ii(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(r(340));Ms()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Cf(n),t=n.flags,t&65536?(n.flags=t&-65537|128,t=n.memoizedState,t!==null&&(t.rendering=null,t.tail=null),n.flags|=4,n):null;case 4:return b(),null;case 10:return ca(n.type),null;case 22:case 23:return ii(n),Af(),t!==null&&wt(Rs),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return ca(cn),null;case 25:return null;default:return null}}function g_(t,n){switch(hf(n),n.tag){case 3:ca(cn),b();break;case 26:case 27:case 5:pt(n);break;case 4:b();break;case 31:n.memoizedState!==null&&ii(n);break;case 13:ii(n);break;case 19:Cf(n);break;case 10:ca(n.type);break;case 22:case 23:ii(n),Af(),t!==null&&wt(Rs);break;case 24:ca(cn)}}function Xo(t,n){try{var a=n.updateQueue,s=a!==null?a.lastEffect:null;if(s!==null){var u=s.next;a=u;do{if((a.tag&t)===t){s=void 0;var c=a.create,_=a.inst;s=c(),_.destroy=s}a=a.next}while(a!==u)}}catch(E){Fe(n,n.return,E)}}function Xa(t,n,a){try{var s=n.updateQueue,u=s!==null?s.lastEffect:null;if(u!==null){var c=u.next;s=c;do{if((s.tag&t)===t){var _=s.inst,E=_.destroy;if(E!==void 0){_.destroy=void 0,u=n;var z=a,Z=E;try{Z()}catch(st){Fe(u,z,st)}}}s=s.next}while(s!==c)}}catch(st){Fe(n,n.return,st)}}function __(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{rg(n,a)}catch(s){Fe(t,t.return,s)}}}function v_(t,n,a){a.props=Ns(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(s){Fe(t,n,s)}}function Xi(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var s=t.stateNode;break;case 30:var u=t.stateNode,c=sa(t.memoizedProps,u);(u.ref===null||u.ref.name!==c)&&(u.ref=b0(c)),s=u.ref;break;case 7:if(t.stateNode===null){var _=new li(t);m(t.child,!1,hM,_,void 0,void 0),t.stateNode=_}s=t.stateNode;break;default:s=t.stateNode}typeof a=="function"?t.refCleanup=a(s):a.current=s}}catch(E){Fe(t,n,E)}}function wn(t,n){var a=t.ref,s=t.refCleanup;if(a!==null)if(typeof s=="function")try{s()}catch(u){Fe(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Fe(t,n,u)}else a.current=null}function _u(t,n){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&n!==null)for(var a=0;a<n.length;a++)U0(t.stateNode,n[a])}function y_(t){for(var n=t.return;n!==null&&(sh(n)&&U0(t.stateNode,n.stateNode),!ah(n));)n=n.return}function ko(t){for(var n=t.return;n!==null&&(sh(n)&&dM(t.stateNode,n.stateNode),!ah(n));)n=n.return}function ah(t){return t.tag===5||t.tag===3||t.tag===27}function sh(t){return t&&t.tag===7&&t.stateNode!==null}function rh(t){var n=t.type,a=t.memoizedProps,s=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&s.focus();break t;case"img":a.src?s.src=a.src:a.srcSet&&(s.srcset=a.srcSet)}}catch(u){Fe(t,t.return,u)}}function oh(t,n,a){try{var s=t.stateNode;jx(s,t.type,a,n),s[Wt]=n}catch(u){Fe(t,t.return,u)}}function S_(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Ka(t.type)||t.tag===4}function lh(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||S_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Ka(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function uh(t,n,a,s){var u=t.tag;if(u===5||u===6)u=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(u,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(u),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Hi)),_u(t,s),Ue=!0;else if(u!==4&&(u===27&&(_u(t,s),s=null,Ka(t.type)&&(a=t.stateNode,n=null)),t=t.child,t!==null))for(uh(t,n,a,s),t=t.sibling;t!==null;)uh(t,n,a,s),t=t.sibling}function vu(t,n,a,s){var u=t.tag;if(u===5||u===6)u=t.stateNode,n?a.insertBefore(u,n):a.appendChild(u),_u(t,s),Ue=!0;else if(u!==4&&(u===27&&(_u(t,s),s=null,Ka(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(vu(t,n,a,s),t=t.sibling;t!==null;)vu(t,n,a,s),t=t.sibling}function x_(t){var n=t.stateNode,a=t.memoizedProps;try{for(var s=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Dn(n,s,a),n[Dt]=t,n[Wt]=a}catch(c){Fe(t,t.return,c)}}var yu=!1,ai=null;function M_(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(yu=!0)}var ki=null;function E_(){var t=ki;return ki=null,t}var Wn=0;function xr(t,n,a,s,u){return Wn=0,T_(t.child,n,a,s,u)}function T_(t,n,a,s,u){for(var c=!1;t!==null;){if(t.tag===5){var _=t.stateNode;if(s!==null){var E=qh(_);s.push(E),E.view&&(c=!0)}else c||qh(_).view&&(c=!0);yu=!0,E0(_,Wn===0?n:n+"_"+Wn,a),Wn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&u||T_(t.child,n,a,s,u)&&(c=!0));t=t.sibling}return c}function Yi(t,n){for(;t!==null;)t.tag===5?T0(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&n||Yi(t.child,n)),t=t.sibling}function Su(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(Su(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var n=t.memoizedProps;if(n.name==null||n.name==="auto")throw Error(r(544));var a=n.name;n=ra(n.default,n.share),n!=="none"&&(xr(t,a,n,null,!1)||Yi(t.child,!1))}t=t.sibling}}function ch(t,n){if(t.tag===30){var a=t.stateNode,s=t.memoizedProps,u=sa(s,a),c=ra(s.default,a.paired?s.share:s.enter);c!=="none"?xr(t,u,c,null,!1)?(Su(t),a.paired||n||wr(t,s.onEnter)):Yi(t.child,!1):Su(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)ch(t,n),t=t.sibling;else Su(t)}function fh(t){if(ai!==null&&ai.size!==0){var n=ai;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,s=a.name;if(s!=null&&s!=="auto"){var u=n.get(s);if(u!==void 0){var c=ra(a.default,a.share);if(c!=="none"&&(xr(t,s,c,null,!1)?(c=t.stateNode,u.paired=c,c.paired=u,wr(t,a.onShare)):Yi(t.child,!1)),n.delete(s),n.size===0)break}}}fh(t)}t=t.sibling}}}function hh(t){if(t.tag===30){var n=t.memoizedProps,a=sa(n,t.stateNode),s=ai!==null?ai.get(a):void 0,u=ra(n.default,s!==void 0?n.share:n.exit);u!=="none"&&(xr(t,a,u,null,!1)?s!==void 0?(u=t.stateNode,s.paired=u,u.paired=s,ai.delete(a),wr(t,n.onShare)):wr(t,n.onExit):Yi(t.child,!1)),ai!==null&&fh(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)hh(t),t=t.sibling;else ai!==null&&fh(t)}function b_(t){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,a=sa(n,t.stateNode);n=ra(n.default,n.update),t.flags&=-5,n!=="none"&&xr(t,a,n,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&b_(t);t=t.sibling}}function dh(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.stateNode;n.paired!==null&&(n.paired=null,Yi(t.child,!1))}dh(t)}t=t.sibling}}function xu(t){if(t.tag===30)t.stateNode.paired=null,Yi(t.child,!1),dh(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)xu(t),t=t.sibling;else dh(t)}function A_(t){for(t=t.child;t!==null;)t.tag===30?Yi(t.child,!1):(t.subtreeFlags&33554432)!==0&&A_(t),t=t.sibling}function ph(t,n,a,s,u,c,_){for(var E=!1;n!==null;){if(n.tag===5){var z=n.stateNode;if(c!==null&&Wn<c.length){var Z=c[Wn],st=qh(z);(Z.view||st.view)&&(E=!0);var mt;if(mt=(t.flags&4)===0)if(st.clip)mt=!0;else{mt=Z.rect;var Y=st.rect;mt=mt.y!==Y.y||mt.x!==Y.x||mt.height!==Y.height||mt.width!==Y.width}mt&&(t.flags|=4),st.abs?st=!Z.abs:(Z=Z.rect,st=st.rect,st=Z.height!==st.height||Z.width!==st.width),st&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&E0(z,Wn===0?a:a+"_"+Wn,u),E&&(t.flags&4)!==0||(ki===null&&(ki=[]),ki.push(z,Wn===0?s:s+"_"+Wn,n.memoizedProps)),Wn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&_?t.flags|=n.flags&32:ph(t,n.child,a,s,u,c,_)&&(E=!0));n=n.sibling}return E}function R_(t,n){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,s=t.stateNode,u=sa(a,s),c=ra(a.default,a.update),_;_=t.memoizedState,t.memoizedState=null,s=t;var E=t.child;Wn=0,u=ph(s,E,u,u,c,_,!1),(t.flags&4)!==0&&u&&wr(t,a.onUpdate)}else(t.subtreeFlags&33554432)!==0&&R_(t);t=t.sibling}}var Mn=!1,Ie=!1,qi=!1,mh=!1,C_=typeof WeakSet=="function"?WeakSet:Set,En=null,Wi=!1,Yo=!1,Mu=!1,gh=!1;function Ex(t,n,a){if(t=t.containerInfo,Gh=Fr,t=Nm(t),ef(t)){if("selectionStart"in t)var s={start:t.selectionStart,end:t.selectionEnd};else t:{s=(s=t.ownerDocument)&&s.defaultView||window;var u=s.getSelection&&s.getSelection();if(u&&u.rangeCount!==0){s=u.anchorNode;var c=u.anchorOffset,_=u.focusNode;u=u.focusOffset;try{s.nodeType,_.nodeType}catch{s=null;break t}var E=0,z=-1,Z=-1,st=0,mt=0,Y=t,et=null;e:for(;;){for(var Lt;Y!==s||c!==0&&Y.nodeType!==3||(z=E+c),Y!==_||u!==0&&Y.nodeType!==3||(Z=E+u),Y.nodeType===3&&(E+=Y.nodeValue.length),(Lt=Y.firstChild)!==null;)et=Y,Y=Lt;for(;;){if(Y===t)break e;if(et===s&&++st===c&&(z=E),et===_&&++mt===u&&(Z=E),(Lt=Y.nextSibling)!==null)break;Y=et,et=Y.parentNode}Y=Lt}s=z===-1||Z===-1?null:{start:z,end:Z}}else s=null}s=s||{start:0,end:0}}else s=null;for(Vh={focusedElem:t,selectionRange:s},Fr=!1,a=(a&335544064)===a,En=n,n=a?9270:1024;En!==null;){if(t=En,a&&(s=t.deletions,s!==null))for(c=0;c<s.length;c++)a&&hh(s[c]);if(t.alternate===null&&(t.flags&2)!==0)a&&M_(t),Eu(a);else{if(t.tag===22){if(s=t.alternate,t.memoizedState!==null){s!==null&&s.memoizedState===null&&a&&hh(s),Eu(a);continue}else if(s!==null&&s.memoizedState!==null){a&&M_(t),Eu(a);continue}}s=t.child,(t.subtreeFlags&n)!==0&&s!==null?(s.return=t,En=s):(a&&b_(t),Eu(a))}}ai=null}function Eu(t){for(;En!==null;){var n=En,a=t,s=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((u&1024)!==0&&s!==null){a=void 0,u=s.memoizedProps,s=s.memoizedState;var c=n.stateNode;try{var _=Ns(n.type,u);a=c.getSnapshotBeforeUpdate(_,s),c.__reactInternalSnapshotBeforeUpdate=a}catch(E){Fe(n,n.return,E)}}break;case 3:if((u&1024)!==0){if(s=n.stateNode.containerInfo,a=s.nodeType,a===9)Zh(s);else if(a===1)switch(s.nodeName){case"HEAD":case"HTML":case"BODY":Zh(s);break;default:s.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&s!==null&&(a=sa(s.memoizedProps,s.stateNode),u=n.memoizedProps,u=ra(u.default,u.update),u!=="none"&&xr(s,a,u,s.memoizedState=[],!0));break;default:if((u&1024)!==0)throw Error(r(163))}if(s=n.sibling,s!==null){s.return=n.return,En=s;break}En=n.return}}function w_(t,n,a){var s=a.flags;switch(a.tag){case 0:case 11:case 15:ji(t,a),s&4&&Xo(5,a);break;case 1:if(ji(t,a),s&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(_){Fe(a,a.return,_)}else{var u=Ns(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(_){Fe(a,a.return,_)}}s&64&&__(a),s&512&&Xi(a,a.return);break;case 3:if(ji(t,a),s&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{rg(t,n)}catch(_){Fe(a,a.return,_)}}break;case 27:n===null&&s&4&&x_(a);case 26:case 5:ji(t,a),n===null&&s&4&&rh(a),s&512&&Xi(a,a.return);break;case 12:ji(t,a);break;case 31:ji(t,a),s&4&&L_(t,a);break;case 13:ji(t,a),s&4&&O_(t,a),s&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=Px.bind(null,a),gM(t,a))));break;case 22:if(s=a.memoizedState!==null||Mn,!s){var c=n!==null&&n.memoizedState!==null||Ie;n=Mn,u=Ie,Mn=s,(Ie=c)&&!u?(s=2,(a.subtreeFlags&8772)!==0&&(s|=1),Di(t,a,s)):ji(t,a),Mn=n,Ie=u}break;case 30:ji(t,a),s&512&&Xi(a,a.return);break;case 7:s&512&&Xi(a,a.return);default:ji(t,a)}}function _h(t,n){for(t=t.child;t!==null;)D_(t,n),t=t.sibling}function D_(t,n){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(n){var s=a.style;typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"}else{var u=t.stateNode,c=t.memoizedProps.style,_=c!=null&&c.hasOwnProperty("display")?c.display:null;u.style.display=_==null||typeof _=="boolean"?"":(""+_).trim()}}catch(z){Fe(t,t.return,z)}vh(t,n);break;case 6:try{t.stateNode.nodeValue=n?"":t.memoizedProps,Ue=!0}catch(z){Fe(t,t.return,z)}break;case 18:try{var E=t.stateNode;n?M0(E,!0):M0(t.stateNode,!1)}catch(z){Fe(t,t.return,z)}break;case 22:case 23:t.memoizedState===null&&_h(t,n);break;default:_h(t,n)}}function vh(t,n){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var a=t,s=n;switch(a.tag){case 4:D_(a,s);break t;case 22:a.memoizedState===null&&vh(a,s);break t;default:vh(a,s)}}t=t.sibling}}function U_(t){var n=t.alternate;n!==null&&(t.alternate=null,U_(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&ne(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Je=null,jn=!1;function Ci(t,n,a){for(a=a.child;a!==null;)N_(t,n,a),a=a.sibling}function N_(t,n,a){if(tn&&typeof tn.onCommitFiberUnmount=="function")try{tn.onCommitFiberUnmount(be,a)}catch{}switch(a.tag){case 26:Ie||wn(a,n),Ci(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!Ie&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Ie||wn(a,n),ko(a);var s=Je,u=jn;Ka(a.type)&&(Je=a.stateNode,jn=!1),Ci(t,n,a),z0(a.stateNode,a.type,a.memoizedProps),Je=s,jn=u;break;case 5:Ie||wn(a,n),ko(a);case 6:if(a.tag===6&&ko(a),s=Je,u=jn,Je=null,Ci(t,n,a),Je=s,jn=u,Je!==null)if(jn)try{(Je.nodeType===9?Je.body:Je.nodeName==="HTML"?Je.ownerDocument.body:Je).removeChild(a.stateNode),Ue=!0}catch(c){Fe(a,n,c)}else try{Je.removeChild(a.stateNode),Ue=!0}catch(c){Fe(a,n,c)}break;case 18:Je!==null&&(jn?(t=Je,x0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Hr(t)):x0(Je,a.stateNode));break;case 4:s=Je,u=jn,Je=a.stateNode.containerInfo,jn=!0,Ci(t,n,a),Je=s,jn=u;break;case 0:case 11:case 14:case 15:Xa(2,a,n),Ie||Xa(4,a,n),Ci(t,n,a);break;case 1:Ie||(wn(a,n),s=a.stateNode,typeof s.componentWillUnmount=="function"&&v_(a,n,s)),Ci(t,n,a);break;case 21:Ci(t,n,a);break;case 22:Ie=(s=Ie)||a.memoizedState!==null,Ci(t,n,a),Ie=s;break;case 30:wn(a,n),Ci(t,n,a);break;case 7:Ie||wn(a,n),Ci(t,n,a);break;default:Ci(t,n,a)}}function L_(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Hr(t)}catch(a){Fe(n,n.return,a)}}}function O_(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Hr(t)}catch(a){Fe(n,n.return,a)}}function Tx(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new C_),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new C_),n;default:throw Error(r(435,t.tag))}}function Tu(t,n){var a=Tx(t);n.forEach(function(s){if(!a.has(s)){a.add(s);var u=zx.bind(null,t,s);s.then(u,u)}})}function Hn(t,n,a){var s=n.deletions;if(s!==null)for(var u=0;u<s.length;u++){var c=s[u],_=t,E=n,z=E;t:for(;z!==null;){switch(z.tag){case 27:if(Ka(z.type)){Je=z.stateNode,jn=!1;break t}break;case 5:Je=z.stateNode,jn=!1;break t;case 3:case 4:Je=z.stateNode.containerInfo,jn=!0;break t}z=z.return}if(Je===null)throw Error(r(160));N_(_,E,c),Je=null,jn=!1,_=c.alternate,_!==null&&(_.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)P_(n,t,a),n=n.sibling}var wi=null;function P_(t,n,a){var s=t.alternate,u=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(u&4&&(s=t.updateQueue,s=s!==null?s.events:null,s!==null))for(var c=0;c<s.length;c++){var _=s[c];_.ref.impl=_.nextImpl}Hn(n,t,a),Gn(t),u&4&&(Xa(3,t,t.return),Xo(3,t),Xa(5,t,t.return));break;case 1:Hn(n,t,a),Gn(t),u&512&&(Ie||s===null||wn(s,s.return)),u&64&&Mn&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(c=wi,Hn(n,t,a),Gn(t),u&512&&(Ie||s===null||wn(s,s.return)),u&4)if(u=s!==null?s.memoizedState:null,a=t.memoizedState,s===null)if(a===null)if(t.stateNode===null)if(Mn)t.stateNode=v0(t.type,t.memoizedProps,n.containerInfo,t);else{t:{n=t.type,a=t.memoizedProps,u=c.ownerDocument||c;e:switch(n){case"title":s=u.getElementsByTagName("title")[0],(!s||s[Le]||s[Dt]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=u.createElement(n),u.head.insertBefore(s,u.querySelector("head > title"))),Dn(s,n,a),s[Dt]=t,De(s),n=s;break t;case"link":if(c=V0("link","href",u).get(n+(a.href||""))){for(_=0;_<c.length;_++)if(s=c[_],s.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&s.getAttribute("rel")===(a.rel==null?null:a.rel)&&s.getAttribute("title")===(a.title==null?null:a.title)&&s.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){c.splice(_,1);break e}}s=u.createElement(n),Dn(s,n,a),u.head.appendChild(s);break;case"meta":if(c=V0("meta","content",u).get(n+(a.content||""))){for(_=0;_<c.length;_++)if(s=c[_],s.getAttribute("content")===(a.content==null?null:""+a.content)&&s.getAttribute("name")===(a.name==null?null:a.name)&&s.getAttribute("property")===(a.property==null?null:a.property)&&s.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&s.getAttribute("charset")===(a.charSet==null?null:a.charSet)){c.splice(_,1);break e}}s=u.createElement(n),Dn(s,n,a),u.head.appendChild(s);break;default:throw Error(r(468,n))}s[Dt]=t,De(s),n=s}t.stateNode=n}else Mn||nd(c,t.type,t.stateNode);else t.stateNode=G0(c,a,t.memoizedProps);else u!==a?(u===null?(n=s.stateNode,n===null||Ie||n.parentNode.removeChild(n)):u.count--,a===null?Mn||nd(c,t.type,t.stateNode):G0(c,a,t.memoizedProps)):a===null&&t.stateNode!==null&&oh(t,t.memoizedProps,s.memoizedProps);break;case 27:Hn(n,t,a),Gn(t),u&512&&(Ie||s===null||wn(s,s.return)),s!==null&&u&4&&oh(t,t.memoizedProps,s.memoizedProps);break;case 5:if(c=qi,qi=!1,Hn(n,t,a),qi=c,Gn(t),u&512&&(Ie||s===null||wn(s,s.return)),t.flags&32){n=t.stateNode;try{ir(n,""),Ue=!0}catch(st){Fe(t,t.return,st)}}u&4&&t.stateNode!=null&&(n=t.memoizedProps,oh(t,n,s!==null?s.memoizedProps:n)),u&1024&&(mh=!0);break;case 6:if(Hn(n,t,a),Gn(t),u&4){if(t.stateNode===null)throw Error(r(162));n=t.memoizedProps,a=t.stateNode;try{a.nodeValue=n,Ue=!0}catch(st){Fe(t,t.return,st)}}break;case 3:if(Ue=!1,Fu=null,c=wi,wi=tl(n.containerInfo),Hn(n,t,a),wi=c,Gn(t),u&4&&s!==null&&s.memoizedState.isDehydrated)try{Hr(n.containerInfo)}catch(st){Fe(t,t.return,st)}mh&&(mh=!1,z_(t)),Ue=!1;break;case 4:u=qi,qi=Mn,s=nm(),c=wi,wi=tl(t.stateNode.containerInfo),Hn(n,t,a),Gn(t),wi=c,Ue&&Yo&&(Mu=!0),Ue=s,qi=u;break;case 12:Hn(n,t,a),Gn(t);break;case 31:Hn(n,t,a),Gn(t),u&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Tu(t,n)));break;case 13:Hn(n,t,a),Gn(t),t.child.flags&8192&&t.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Ru=k()),u&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Tu(t,n)));break;case 22:c=t.memoizedState!==null,_=s!==null&&s.memoizedState!==null;var E=Mn,z=Ie,Z=qi;Mn=E||c,qi=Z||c,Ie=z||_,Hn(n,t,a),Ie=z,qi=Z,Mn=E,Gn(t),u&8192&&(n=t.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,!c||s===null||_||Mn||Ie||(n=_||Ie,a=Mn,s=Ie,Mn=c||Mn,Ie=n,ka(t,2),Mn=a,Ie=s),!c&&qi||_h(t,c)),u&4&&(n=t.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Tu(t,a))));break;case 19:Hn(n,t,a),Gn(t),u&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Tu(t,n)));break;case 30:u&512&&(Ie||s===null||wn(s,s.return)),u=nm(),c=Yo,_=(a&335544064)===a,E=t.memoizedProps,Yo=_&&ra(E.default,E.update)!=="none",Hn(n,t,a),Gn(t),_&&s!==null&&Ue&&(t.flags|=4),Yo=c,Ue=u;break;case 21:break;case 7:u&512&&(Ie||s===null||wn(s,s.return)),s&&s.stateNode!==null&&(s.stateNode._fragmentFiber=t);default:Hn(n,t,a),Gn(t)}}function Gn(t){var n=t.flags;if(n&2){try{for(var a,s=t.return;s!==null;){if(S_(s)){a=s;break}s=s.return}s=null;for(var u=t.return;u!==null;){if(sh(u)){var c=u.stateNode;s===null?s=[c]:s.push(c)}if(ah(u))break;u=u.return}var _=s;if(a==null)throw Error(r(160));switch(a.tag){case 27:var E=a.stateNode,z=lh(t);vu(t,z,E,_);break;case 5:var Z=a.stateNode;a.flags&32&&(ir(Z,""),a.flags&=-33);var st=lh(t);vu(t,st,Z,_);break;case 3:case 4:var mt=a.stateNode.containerInfo,Y=lh(t);uh(t,Y,mt,_);break;default:throw Error(r(161))}}catch(et){Fe(t,t.return,et)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function z_(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;z_(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Fr=!0,n.reset(),Fr=!1),t=t.sibling}}function Mr(t,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)I_(n,t),n=n.sibling;else R_(n)}function I_(t,n){var a=t.alternate;if(a===null)ch(t,!1);else switch(t.tag){case 3:if(gh=Wi=!1,E_(),Mr(n,t),!Wi&&!Mu){if(t=ki,t!==null)for(var s=0;s<t.length;s+=3){a=t[s];var u=t[s+1];T0(a,t[s+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+u+")"})}t=n.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),gh=!0}ki=null;break;case 5:Mr(n,t);break;case 4:s=Wi,Wi=!1,Mr(n,t),Wi&&(Mu=!0),Wi=s;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?ch(t,!1):Mr(n,t));break;case 30:s=Wi,u=E_(),Wi=!1,Mr(n,t),Wi&&(t.flags|=4);var c=t.memoizedProps,_=t.stateNode;n=sa(c,_),_=sa(a.memoizedProps,_);var E=ra(c.default,c.update);E==="none"?n=!1:(c=a.memoizedState,a.memoizedState=null,a=t.child,Wn=0,n=ph(t,a,n,_,E,c,!0),Wn!==(c===null?0:c.length)&&(t.flags|=32)),(t.flags&4)!==0&&n?(wr(t,t.memoizedProps.onUpdate),ki=u):u!==null&&(u.push.apply(u,ki),ki=u),Wi=(t.flags&32)!==0?!0:s;break;default:Mr(n,t)}}function ji(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)w_(t,n.alternate,n),n=n.sibling}function ka(t,n){for(t=t.child;t!==null;){var a=t,s=n;switch(a.tag){case 0:case 11:case 14:case 15:Xa(4,a,a.return),ka(a,s);break;case 1:wn(a,a.return);var u=a.stateNode;typeof u.componentWillUnmount=="function"&&v_(a,a.return,u),ka(a,s);break;case 27:(s&2)!==0&&z0(a.stateNode,a.type,a.memoizedProps);case 5:wn(a,a.return),a.tag!==5&&a.tag!==27||ko(a),ka(a,s);break;case 6:ko(a);break;case 26:wn(a,a.return),u=a.stateNode,a.memoizedState!==null||u===null||Ie||u.parentNode.removeChild(u),ka(a,s);break;case 22:a.memoizedState===null&&ka(a,s);break;case 30:wn(a,a.return),ka(a,s);break;case 7:wn(a,a.return);default:ka(a,s)}t=t.sibling}}function Di(t,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var s=n.alternate,u=t,c=n,_=c.flags,E=(a&1)!==0;switch(c.tag){case 0:case 11:case 15:Di(u,c,a),Xo(4,c);break;case 1:if(Di(u,c,a),s=c,u=s.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(st){Fe(s,s.return,st)}if(s=c,u=s.updateQueue,u!==null){var z=s.stateNode;try{var Z=u.shared.hiddenCallbacks;if(Z!==null)for(u.shared.hiddenCallbacks=null,u=0;u<Z.length;u++)sg(Z[u],z)}catch(st){Fe(s,s.return,st)}}E&&_&64&&__(c),Xi(c,c.return);break;case 27:(a&2)!==0&&x_(c);case 5:c.tag!==5&&c.tag!==27||y_(c),Di(u,c,a),E&&s===null&&_&4&&rh(c),Xi(c,c.return);break;case 6:y_(c);break;case 26:z=c.stateNode,c.memoizedState!==null||z===null||Mn||nd(tl(z.ownerDocument),c.type,z),Di(u,c,a),E&&s===null&&_&4&&rh(c),Xi(c,c.return);break;case 12:Di(u,c,a);break;case 31:Di(u,c,a),E&&_&4&&L_(u,c);break;case 13:Di(u,c,a),E&&_&4&&O_(u,c);break;case 22:c.memoizedState===null&&Di(u,c,a),Xi(c,c.return);break;case 30:Di(u,c,a),Xi(c,c.return);break;case 7:Xi(c,c.return);default:Di(u,c,a)}n=n.sibling}}function yh(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Do(a))}function Sh(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Do(t))}function Si(t,n,a,s){var u=(a&335544064)===a;if(n.subtreeFlags&(u?10262:10256))for(n=n.child;n!==null;)B_(t,n,a,s),n=n.sibling;else u&&A_(n)}function B_(t,n,a,s){var u=(a&335544064)===a;u&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&xu(n);var c=n.flags;switch(n.tag){case 0:case 11:case 15:Si(t,n,a,s),c&2048&&Xo(9,n);break;case 1:Si(t,n,a,s);break;case 3:Si(t,n,a,s),u&&gh&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),c&2048&&(c=null,n.alternate!==null&&(c=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==c&&(n.refCount++,c!=null&&Do(c)));break;case 12:if(c&2048){Si(t,n,a,s),c=n.stateNode;try{var _=n.memoizedProps,E=_.id,z=_.onPostCommit;typeof z=="function"&&z(E,n.alternate===null?"mount":"update",c.passiveEffectDuration,-0)}catch(Z){Fe(n,n.return,Z)}}else Si(t,n,a,s);break;case 31:Si(t,n,a,s);break;case 13:Si(t,n,a,s);break;case 23:break;case 22:_=n.stateNode,E=n.alternate,n.memoizedState!==null?(u&&E!==null&&E.memoizedState===null&&xu(E),_._visibility&2?Si(t,n,a,s):qo(t,n)):(u&&E!==null&&E.memoizedState!==null&&xu(n),_._visibility&2?Si(t,n,a,s):(_._visibility|=2,Er(t,n,a,s,(n.subtreeFlags&10256)!==0||!1))),c&2048&&yh(E,n);break;case 24:Si(t,n,a,s),c&2048&&Sh(n.alternate,n);break;case 30:u&&(c=n.alternate,c!==null&&(Yi(c.child,!0),Yi(n.child,!0))),Si(t,n,a,s);break;default:Si(t,n,a,s)}}function Er(t,n,a,s,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var c=t,_=n,E=a,z=s,Z=_.flags;switch(_.tag){case 0:case 11:case 15:Er(c,_,E,z,u),Xo(8,_);break;case 23:break;case 22:var st=_.stateNode;_.memoizedState!==null?st._visibility&2?Er(c,_,E,z,u):qo(c,_):(st._visibility|=2,Er(c,_,E,z,u)),u&&Z&2048&&yh(_.alternate,_);break;case 24:Er(c,_,E,z,u),u&&Z&2048&&Sh(_.alternate,_);break;default:Er(c,_,E,z,u)}n=n.sibling}}function qo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,s=n,u=s.flags;switch(s.tag){case 22:qo(a,s),u&2048&&yh(s.alternate,s);break;case 24:qo(a,s),u&2048&&Sh(s.alternate,s);break;default:qo(a,s)}n=n.sibling}}var Ls=8192;function Os(t,n,a){if(t.subtreeFlags&Ls)for(t=t.child;t!==null;)F_(t,n,a),t=t.sibling}function F_(t,n,a){switch(t.tag){case 26:Os(t,n,a),t.flags&Ls&&(t.memoizedState!==null?DM(a,wi,t.memoizedState,t.memoizedProps):(t=t.stateNode,(n&335544128)===n&&q0(a,t)));break;case 5:Os(t,n,a),t.flags&Ls&&(t=t.stateNode,(n&335544128)===n&&q0(a,t));break;case 3:case 4:var s=wi;wi=tl(t.stateNode.containerInfo),Os(t,n,a),wi=s;break;case 22:t.memoizedState===null&&(s=t.alternate,s!==null&&s.memoizedState!==null?(s=Ls,Ls=16777216,Os(t,n,a),Ls=s):Os(t,n,a));break;case 30:if((t.flags&Ls)!==0&&(s=t.memoizedProps.name,s!=null&&s!=="auto")){var u=t.stateNode;u.paired=null,ai===null&&(ai=new Map),ai.set(s,u)}Os(t,n,a);break;default:Os(t,n,a)}}function H_(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Wo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];En=s,V_(s,t)}H_(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)G_(t),t=t.sibling}function G_(t){switch(t.tag){case 0:case 11:case 15:Wo(t),t.flags&2048&&Xa(9,t,t.return);break;case 3:Wo(t);break;case 12:Wo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,bu(t)):Wo(t);break;default:Wo(t)}}function bu(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];En=s,V_(s,t)}H_(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Xa(8,n,n.return),bu(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,bu(n));break;default:bu(n)}t=t.sibling}}function V_(t,n){for(;En!==null;){var a=En;switch(a.tag){case 0:case 11:case 15:Xa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var s=a.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:Do(a.memoizedState.cache)}if(s=a.child,s!==null)s.return=a,En=s;else t:for(a=t;En!==null;){s=En;var u=s.sibling,c=s.return;if(U_(s),s===a){En=null;break t}if(u!==null){u.return=c,En=u;break t}En=c}}}var bx={getCacheForType:function(t){var n=An(cn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return An(cn).controller.signal}},Ax=typeof WeakMap=="function"?WeakMap:Map,Pe=0,qe=null,Me=null,Ae=0,Be=0,si=null,Ya=!1,Tr=!1,xh=!1,ma=0,sn=0,qa=0,Ps=0,Au=0,ri=0,br=0,jo=null,Zn=null,Mh=!1,Ru=0,X_=0,Cu=1/0,wu=null,Wa=null,en=0,Ui=null,zs=null,Zi=0,Eh=0,Th=null,k_=null,Ar=null,Rr=null,Cr=null,Zo=0,Du=null;function oi(){return(Pe&2)!==0&&Ae!==0?Ae&-Ae:Mt.T!==null?Oh():Tt()}function Y_(){if(ri===0)if((Ae&536870912)===0||ve){var t=na;na<<=1,(na&3932160)===0&&(na=262144),ri=t}else ri=536870912;return t=Rn.current,t!==null&&(t.flags|=32),ri}function wr(t,n){if(n!=null){var a=t.stateNode,s=a.ref;s===null&&(s=a.ref=b0(sa(t.memoizedProps,a))),Rr===null&&(Rr=[]),Rr.push(n.bind(null,s))}}function Kn(t,n,a){(t===qe&&(Be===2||Be===9)||t.cancelPendingCommit!==null)&&(Dr(t,0),ja(t,Ae,ri,!1)),_s(t,a),((Pe&2)===0||t!==qe)&&(t===qe&&((Pe&2)===0&&(Ps|=a),sn===4&&ja(t,Ae,ri,!1)),Ki(t))}function q_(t,n,a){if((Pe&6)!==0)throw Error(r(327));var s=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Ca(t,n),u=s?wx(t,n):Ah(t,n,!0),c=s;do{if(u===0){Tr&&!s&&ja(t,n,0,!1);break}else{if(a=t.current.alternate,c&&!Rx(a)){u=Ah(t,n,!1),c=!1;continue}if(u===2){if(c=n,t.errorRecoveryDisabledLanes&c)var _=0;else _=t.pendingLanes&-536870913,_=_!==0?_:_&536870912?536870912:0;if(_!==0){n=_;t:{var E=t;u=jo;var z=E.current.memoizedState.isDehydrated;if(z&&(Dr(E,_).flags|=256),_=Ah(E,_,!1),_!==2&&_!==6){if(xh&&!z){E.errorRecoveryDisabledLanes|=c,Ps|=c,u=4;break t}c=Zn,Zn=u,c!==null&&(Zn===null?Zn=c:Zn.push.apply(Zn,c))}u=_}if(c=!1,u!==2)continue}}if(u===1){Dr(t,0),ja(t,n,0,!0);break}t:{switch(s=t,c=u,c){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:ja(s,n,ri,!Ya);break t;case 2:Zn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(u=Ru+300-k(),10<u)){if(ja(s,n,ri,!Ya),gs(s,0,!0)!==0)break t;Zi=n,s.timeoutHandle=Yh(W_.bind(null,s,a,Zn,wu,Mh,n,ri,Ps,br,Ya,c,"Throttled",-0,0),u);break t}W_(s,a,Zn,wu,Mh,n,ri,Ps,br,Ya,c,null,-0,0)}}break}while(!0);Ki(t)}function W_(t,n,a,s,u,c,_,E,z,Z,st,mt,Y,et){t.timeoutHandle=-1;var Lt=n.subtreeFlags,jt=(c&335544064)===c;if(mt=null,(jt||Lt&8192||(Lt&16785408)===16785408)&&(mt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Hi},ai=null,F_(n,c,mt),jt&&(Lt=mt,jt=t.containerInfo,jt=(jt.nodeType===9?jt:jt.ownerDocument).__reactViewTransition,jt!=null&&(Lt.count++,Lt.waitingForViewTransition=!0,Lt=il.bind(Lt),jt.finished.then(Lt,Lt))),Lt=(c&62914560)===c?Ru-k():(c&4194048)===c?X_-k():0,Lt=UM(mt,Lt),Lt!==null)){Zi=c,t.cancelPendingCommit=Lt(e0.bind(null,t,n,c,a,s,u,_,E,z,Z,st,mt,null,Y,et)),ja(t,c,_,!Z);return}e0(t,n,c,a,s,u,_,E,z,Z,st,mt)}function Rx(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var s=0;s<a.length;s++){var u=a[s],c=u.getSnapshot;u=u.value;try{if(!ni(c(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ja(t,n,a,s){n=Rl(t,n),n&=~Au,n&=~Ps,t.suspendedLanes|=n,t.pingedLanes&=~n,s&&(t.warmLanes|=n),s=t.expirationTimes;for(var u=n;0<u;){var c=31-Nn(u),_=1<<c;s[c]=-1,u&=~_}a!==0&&R(t,a,n)}function Uu(){return(Pe&6)===0?(Ko(0),!1):!0}function bh(){if(Me!==null){if(Be===0)var t=Me.return;else t=Me,ua=Es=null,Lf(t),gr=null,Lo=0,t=Me;for(;t!==null;)g_(t.alternate,t),t=t.return;Me=null}}function Dr(t,n){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,Qx(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Zi=0,bh(),qe=t,Me=a=oa(t.current,null),Ae=n,Be=0,si=null,Ya=!1,Tr=Ca(t,n),xh=!1,br=ri=Au=Ps=qa=sn=0,Zn=jo=null,Mh=!1,ma=Rl(t,n),Fl(),a}function j_(t,n){de=null,Mt.H=cu,n===mr||n===Kl?(n=eg(),Be=3):n===Sf?(n=eg(),Be=4):Be=n===jf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,si=n,Me===null&&(sn=1,fu(t,gi(n,t.current)))}function Z_(){var t=Rn.current;return t===null?!0:(Ae&4194048)===Ae?On===null:(Ae&62914560)===Ae||(Ae&536870912)!==0?t===On:!1}function K_(){var t=Mt.H;return Mt.H=cu,t===null?cu:t}function Q_(){var t=Mt.A;return Mt.A=bx,t}function Nu(){sn=4,Ya||(Ae&4194048)!==Ae&&Rn.current!==null||(Tr=!0),(qa&134217727)===0&&(Ps&134217727)===0||qe===null||ja(qe,Ae,ri,!1)}function Ah(t,n,a){var s=Pe;Pe|=2;var u=K_(),c=Q_();(qe!==t||Ae!==n)&&(wu=null,Dr(t,n)),n=!1;var _=sn;t:do try{if(Be!==0&&Me!==null){var E=Me,z=si;switch(Be){case 8:bh(),_=6;break t;case 3:case 2:case 9:case 6:Rn.current===null&&(n=!0);var Z=Be;if(Be=0,si=null,Ur(t,E,z,Z),a&&Tr){_=0;break t}break;default:Z=Be,Be=0,si=null,Ur(t,E,z,Z)}}Cx(),_=sn;break}catch(st){j_(t,st)}while(!0);return n&&t.shellSuspendCounter++,ua=Es=null,Pe=s,Mt.H=u,Mt.A=c,Me===null&&(qe=null,Ae=0,Fl()),_}function Cx(){for(;Me!==null;)J_(Me)}function wx(t,n){var a=Pe;Pe|=2;var s=K_(),u=Q_();qe!==t||Ae!==n?(wu=null,Cu=k()+500,Dr(t,n)):Tr=Ca(t,n);t:do try{if(Be!==0&&Me!==null){n=Me;var c=si;e:switch(Be){case 1:Be=0,si=null,Ur(t,n,c,1);break;case 2:case 9:if($m(c)){Be=0,si=null,$_(n);break}n=function(){Be!==2&&Be!==9||qe!==t||(Be=7),Ki(t)},c.then(n,n);break t;case 3:Be=7;break t;case 4:Be=5;break t;case 7:$m(c)?(Be=0,si=null,$_(n)):(Be=0,si=null,Ur(t,n,c,7));break;case 5:var _=null;switch(Me.tag){case 26:_=Me.memoizedState;case 5:case 27:var E=Me;if(_?k0(_):E.stateNode.complete){Be=0,si=null;var z=E.sibling;if(z!==null)Me=z;else{var Z=E.return;Z!==null?(Me=Z,Lu(Z)):Me=null}break e}}Be=0,si=null,Ur(t,n,c,5);break;case 6:Be=0,si=null,Ur(t,n,c,6);break;case 8:bh(),sn=6;break t;default:throw Error(r(462))}}Dx();break}catch(st){j_(t,st)}while(!0);return ua=Es=null,Mt.H=s,Mt.A=u,Pe=a,Me!==null?0:(qe=null,Ae=0,Fl(),sn)}function Dx(){for(;Me!==null&&!Pt();)J_(Me)}function J_(t){var n=p_(t.alternate,t,ma);t.memoizedProps=t.pendingProps,n===null?Lu(t):Me=n}function $_(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=o_(a,n,n.pendingProps,n.type,void 0,Ae);break;case 11:n=o_(a,n,n.pendingProps,n.type.render,n.ref,Ae);break;case 5:Lf(n);var s=n;s===xn&&(ve?(Yl(s),s.tag===5&&s.stateNode!=null&&(Ze=s.stateNode)):(Yl(s),ve=!0));default:g_(a,n),n=Me=Vm(n,ma),n=p_(a,n,ma)}t.memoizedProps=t.pendingProps,n===null?Lu(t):Me=n}function Ur(t,n,a,s){ua=Es=null,Lf(n),gr=null,Lo=0;var u=n.return;try{if(_x(t,u,n,a,Ae)){sn=1,fu(t,gi(a,t.current)),Me=null;return}}catch(c){if(u!==null)throw Me=u,c;sn=1,fu(t,gi(a,t.current)),Me=null;return}n.flags&32768?(ve||s===1?t=!0:Tr||(Ae&536870912)!==0?t=!1:(Ya=t=!0,(s===2||s===9||s===3||s===6)&&(s=Rn.current,s!==null&&s.tag===13&&(s.flags|=16384))),t0(n,t)):Lu(n)}function Lu(t){var n=t;do{if((n.flags&32768)!==0){t0(n,Ya);return}t=n.return;var a=xx(n.alternate,n,ma);if(a!==null){Me=a;return}if(n=n.sibling,n!==null){Me=n;return}Me=n=t}while(n!==null);sn===0&&(sn=5)}function t0(t,n){do{var a=Mx(t.alternate,t);if(a!==null){a.flags&=32767,Me=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Me=t;return}Me=t=a}while(t!==null);sn=6,Me=null}function e0(t,n,a,s,u,c,_,E,z,Z,st,mt){t.cancelPendingCommit=null;do Ou();while(en!==0);if((Pe&6)!==0)throw Error(r(327));if(n!==null){if(n===t.current)throw Error(r(177));t===qe&&(Me=qe=null,Ae=0),zs=n,Ui=t,Zi=a,Th=u,k_=s,Ux(t,n,a,_,E,z,mt)}}function Ux(t,n,a,s,u,c,_){var E=n.lanes|n.childLanes;if(Eh=E,E|=of,Ic(t,a,E,s,u,c),Rr=null,(a&335544064)===a?(Cr=sx(t),s=10262):(Cr=null,s=10256),(n.subtreeFlags&s)!==0||(n.flags&s)!==0?(t.callbackNode=null,t.callbackPriority=0,Ix(Et,function(){return Dh(),null})):(t.callbackNode=null,t.callbackPriority=0),yu=!1,s=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||s){s=Mt.T,Mt.T=null,u=vt.p,vt.p=2,c=Pe,Pe|=4;try{Ex(t,n,a)}finally{Pe=c,vt.p=u,Mt.T=s}}en=1,yu?Ar=iM(_,t.containerInfo,Cr,Rh,Ch,Lx,wh,Dh,Nx):(Rh(),Ch(),wh())}function Nx(t){if(en!==0){var n=Ui.onRecoverableError;n(t,{componentStack:null})}}function Lx(){en===3&&(en=0,I_(zs,Ui),en=4)}function Rh(){if(en===1){en=0;var t=Ui,n=zs,a=Zi,s=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||s){s=Mt.T,Mt.T=null;var u=vt.p;vt.p=2;var c=Pe;Pe|=4;try{Yo=Mu=!1,P_(n,t,a),a=Vh;var _=Nm(t.containerInfo),E=a.focusedElem,z=a.selectionRange;if(_!==E&&E&&E.ownerDocument&&Um(E.ownerDocument.documentElement,E)){if(z!==null&&ef(E)){var Z=z.start,st=z.end;if(st===void 0&&(st=Z),"selectionStart"in E)E.selectionStart=Z,E.selectionEnd=Math.min(st,E.value.length);else{var mt=E.ownerDocument||document,Y=mt&&mt.defaultView||window;if(Y.getSelection){var et=Y.getSelection(),Lt=E.textContent.length,jt=Math.min(z.start,Lt),pe=z.end===void 0?jt:Math.min(z.end,Lt);!et.extend&&jt>pe&&(_=pe,pe=jt,jt=_);var W=Dm(E,jt),X=Dm(E,pe);if(W&&X&&(et.rangeCount!==1||et.anchorNode!==W.node||et.anchorOffset!==W.offset||et.focusNode!==X.node||et.focusOffset!==X.offset)){var tt=mt.createRange();tt.setStart(W.node,W.offset),et.removeAllRanges(),jt>pe?(et.addRange(tt),et.extend(X.node,X.offset)):(tt.setEnd(X.node,X.offset),et.addRange(tt))}}}}for(mt=[],et=E;et=et.parentNode;)et.nodeType===1&&mt.push({element:et,left:et.scrollLeft,top:et.scrollTop});for(typeof E.focus=="function"&&E.focus(),E=0;E<mt.length;E++){var dt=mt[E];dt.element.scrollLeft=dt.left,dt.element.scrollTop=dt.top}}Fr=!!Gh,Vh=Gh=null}finally{Pe=c,vt.p=u,Mt.T=s}}t.current=n,en=2}}function Ch(){if(en===2){en=0;var t=Ui,n=zs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=Mt.T,Mt.T=null;var s=vt.p;vt.p=2;var u=Pe;Pe|=4;try{w_(t,n.alternate,n)}finally{Pe=u,vt.p=s,Mt.T=a}}en=3}}function wh(){if(en===4||en===3){en=0;var t=Ar;Ar=null,he();var n=Ui,a=zs,s=Zi,u=k_,c=(s&335544064)===s?10262:10256;if((a.subtreeFlags&c)!==0||(a.flags&c)!==0?en=5:(en=0,zs=Ui=null,n0(n,n.pendingLanes)),c=n.pendingLanes,c===0&&(Wa=null),J(s),a=a.stateNode,tn&&typeof tn.onCommitFiberRoot=="function")try{tn.onCommitFiberRoot(be,a,void 0,(a.current.flags&128)===128)}catch{}if(u!==null){a=Mt.T,c=vt.p,vt.p=2,Mt.T=null;try{for(var _=n.onRecoverableError,E=0;E<u.length;E++){var z=u[E];_(z.value,{componentStack:z.stack})}}finally{Mt.T=a,vt.p=c}}if(u=Rr,_=Cr,Cr=null,u!==null&&(Rr=null,_===null&&(_=[]),t!==null))for(z=0;z<u.length;z++)a=(0,u[z])(_),a!==void 0&&t.finished.finally(a);(Zi&3)!==0&&Ou(),Ki(n),c=n.pendingLanes,(s&261930)!==0&&(c&42)!==0?n===Du?Zo++:(Zo=0,Du=n):(Zo=0,Du=null),Ko(0)}}function n0(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Do(n)))}function Ou(){return Ar!==null&&(Ar.skipTransition(),Ar=null),Rh(),Ch(),wh(),Dh()}function Dh(){if(en!==5)return!1;var t=Ui,n=Eh;Eh=0;var a=J(Zi),s=Mt.T,u=vt.p;try{vt.p=32>a?32:a,Mt.T=null,a=Th,Th=null;var c=Ui,_=Zi;if(en=0,zs=Ui=null,Zi=0,(Pe&6)!==0)throw Error(r(331));var E=Pe;if(Pe|=4,G_(c.current),B_(c,c.current,_,a),Pe=E,Ko(0,!1),tn&&typeof tn.onPostCommitFiberRoot=="function")try{tn.onPostCommitFiberRoot(be,c)}catch{}return!0}finally{vt.p=u,Mt.T=s,n0(t,n)}}function i0(t,n,a){n=gi(a,n),n=Wf(t.stateNode,n,2),t=Fa(t,n,2),t!==null&&(_s(t,2),Ki(t))}function Fe(t,n,a){if(t.tag===3)i0(t,t,a);else for(;n!==null;){if(n.tag===3){i0(n,t,a);break}else if(n.tag===1){var s=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Wa===null||!Wa.has(s))){t=gi(a,t),a=$g(2),s=Fa(n,a,2),s!==null&&(t_(a,s,n,t),_s(s,2),Ki(s));break}}n=n.return}}function Uh(t,n,a){var s=t.pingCache;if(s===null){s=t.pingCache=new Ax;var u=new Set;s.set(n,u)}else u=s.get(n),u===void 0&&(u=new Set,s.set(n,u));u.has(a)||(xh=!0,u.add(a),t=Ox.bind(null,t,n,a),n.then(t,t))}function Ox(t,n,a){var s=t.pingCache;s!==null&&s.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,qe===t&&(Ae&a)===a&&((sn===4||sn===3&&(Ae&62914560)===Ae&&300>k()-Ru)&&(Pe&2)===0?Dr(t,0):Au|=a,br===Ae&&(br=0)),Ki(t)}function a0(t,n){n===0&&(n=Cl()),t=Ss(t,n),t!==null&&(_s(t,n),Ki(t))}function Px(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),a0(t,a)}function zx(t,n){var a=0;switch(t.tag){case 31:case 13:var s=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:s=t.stateNode;break;case 22:s=t.stateNode._retryCache;break;default:throw Error(r(314))}s!==null&&s.delete(n),a0(t,a)}function Ix(t,n){return ae(t,n)}var Nr=null,Lr=null,Nh=!1,Pu=!1,Lh=!1,Za=0;function Ki(t){t!==Lr&&t.next===null&&(Lr===null?Nr=Lr=t:Lr=Lr.next=t),Pu=!0,Nh||(Nh=!0,Fx())}function Ko(t,n){if(!Lh&&Pu){Lh=!0;do for(var a=!1,s=Nr;s!==null;){if(t!==0){var u=s.pendingLanes;if(u===0)var c=0;else{var _=s.suspendedLanes,E=s.pingedLanes;c=(1<<31-Nn(42|t)+1)-1,c&=u&~(_&~E),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(a=!0,l0(s,c))}else c=Ae,c=gs(s,s===qe?c:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),(c&3)===0||Ca(s,c)||(a=!0,l0(s,c));s=s.next}while(a);Lh=!1}}function Bx(){s0()}function s0(){Pu=Nh=!1;var t=0;Za!==0&&Kx()&&(t=Za);for(var n=k(),a=null,s=Nr;s!==null;){var u=s.next,c=r0(s,n);c===0?(s.next=null,a===null?Nr=u:a.next=u,u===null&&(Lr=a)):(a=s,(t!==0||(c&3)!==0)&&(Pu=!0)),s=u}en!==0&&en!==5||Ko(t),Za!==0&&(Za=0)}function r0(t,n){for(var a=t.suspendedLanes,s=t.pingedLanes,u=t.expirationTimes,c=t.pendingLanes&-62914561;0<c;){var _=31-Nn(c),E=1<<_,z=u[_];z===-1?((E&a)===0||(E&s)!==0)&&(u[_]=zc(E,n)):z<=n&&(t.expiredLanes|=E),c&=~E}if(n=qe,a=Ae,a=gs(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s=t.callbackNode,a===0||t===n&&(Be===2||Be===9)||t.cancelPendingCommit!==null)return s!==null&&s!==null&&Jt(s),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Ca(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(s!==null&&Jt(s),J(a)){case 2:case 8:a=Yt;break;case 32:a=Et;break;case 268435456:a=Kt;break;default:a=Et}return s=o0.bind(null,t),a=ae(a,s),t.callbackPriority=n,t.callbackNode=a,n}return s!==null&&s!==null&&Jt(s),t.callbackPriority=2,t.callbackNode=null,2}function o0(t,n){if(en!==0&&en!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Ou()&&t.callbackNode!==a)return null;var s=Ae;return s=gs(t,t===qe?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s===0?null:(q_(t,s,n),r0(t,k()),t.callbackNode!=null&&t.callbackNode===a?o0.bind(null,t):null)}function l0(t,n){if(Ou())return null;q_(t,n,!0)}function Fx(){Jx(function(){(Pe&6)!==0?ae(Ut,Bx):s0()})}function Oh(){if(Za===0){var t=As;t===0&&(t=ps,ps<<=1,(ps&261888)===0&&(ps=256)),Za=t}return Za}function u0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ul(t)}function Hx(t,n,a,s,u){if(n==="submit"&&a&&a.stateNode===u){var c=u0((u[Wt]||null).action),_=s.submitter;_&&(n=(n=_[Wt]||null)?u0(n.formAction):_.getAttribute("formAction"),n!==null&&(c=n,_=null));var E=new Pl("action","action",null,s,u);t.push({event:E,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(Za!==0){var z=new FormData(u,_);Vf(a,{pending:!0,data:z,method:u.method,action:c},null,z)}}else typeof c=="function"&&(E.preventDefault(),z=new FormData(u,_),Vf(a,{pending:!0,data:z,method:u.method,action:c},c,z))},currentTarget:u}]})}}for(var Ph=0;Ph<rf.length;Ph++){var zh=rf[Ph],Gx=zh.toLowerCase(),Vx=zh[0].toUpperCase()+zh.slice(1);Ri(Gx,"on"+Vx)}Ri(Pm,"onAnimationEnd"),Ri(zm,"onAnimationIteration"),Ri(Im,"onAnimationStart"),Ri("dblclick","onDoubleClick"),Ri("focusin","onFocus"),Ri("focusout","onBlur"),Ri(QS,"onTransitionRun"),Ri(JS,"onTransitionStart"),Ri($S,"onTransitionCancel"),Ri(Bm,"onTransitionEnd"),nn("onMouseEnter",["mouseout","mouseover"]),nn("onMouseLeave",["mouseout","mouseover"]),nn("onPointerEnter",["pointerout","pointerover"]),nn("onPointerLeave",["pointerout","pointerover"]),un("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),un("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),un("onBeforeInput",["compositionend","keypress","textInput","paste"]),un("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),un("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),un("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Qo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xx=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Qo));function c0(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var s=t[a],u=s.event;s=s.listeners;t:{var c=void 0;if(n)for(var _=s.length-1;0<=_;_--){var E=s[_],z=E.instance,Z=E.currentTarget;if(E=E.listener,z!==c&&u.isPropagationStopped())break t;c=E,u.currentTarget=Z;try{c(u)}catch(st){Bl(st)}u.currentTarget=null,c=z}else for(_=0;_<s.length;_++){if(E=s[_],z=E.instance,Z=E.currentTarget,E=E.listener,z!==c&&u.isPropagationStopped())break t;c=E,u.currentTarget=Z;try{c(u)}catch(st){Bl(st)}u.currentTarget=null,c=z}}}}function Ee(t,n){var a=n[ee];a===void 0&&(a=n[ee]=new Set);var s=t+"__bubble";a.has(s)||(f0(n,t,2,!1),a.add(s))}function Ih(t,n,a){var s=0;n&&(s|=4),f0(a,t,s,n)}var zu="_reactListening"+Math.random().toString(36).slice(2);function Bh(t){if(!t[zu]){t[zu]=!0,je.forEach(function(a){a!=="selectionchange"&&(Xx.has(a)||Ih(a,!1,t),Ih(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[zu]||(n[zu]=!0,Ih("selectionchange",!1,n))}}function f0(t,n,a,s){switch(tv(n)){case 2:var u=PM;break;case 8:u=zM;break;default:u=ad}a=u.bind(null,n,a,t),u=void 0,!Yc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),s?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function Fh(t,n,a,s,u){var c=s;if((n&1)===0&&(n&2)===0&&s!==null)t:for(;;){if(s===null)return;var _=s.tag;if(_===3||_===4){var E=s.stateNode.containerInfo;if(E===u)break;if(_===4)for(_=s.return;_!==null;){var z=_.tag;if((z===3||z===4)&&_.stateNode.containerInfo===u)return;_=_.return}for(;E!==null;){if(_=Oe(E),_===null)return;if(z=_.tag,z===5||z===6||z===26||z===27){s=c=_;continue t}E=E.parentNode}}s=s.return}fm(function(){var Z=c,st=Xc(a),mt=[];t:{var Y=Fm.get(t);if(Y!==void 0){var et=Pl,Lt=t;switch(t){case"keypress":if(Ll(a)===0)break t;case"keydown":case"keyup":et=RS;break;case"focusin":Lt="focus",et=Zc;break;case"focusout":Lt="blur",et=Zc;break;case"beforeblur":case"afterblur":et=Zc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":et=pm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":et=mS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":et=NS;break;case Pm:case zm:case Im:et=vS;break;case Bm:et=OS;break;case"scroll":case"scrollend":et=dS;break;case"wheel":et=zS;break;case"copy":case"cut":case"paste":et=SS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":et=gm;break;case"submit":et=DS;break;case"toggle":case"beforetoggle":et=BS}var jt=(n&4)!==0,pe=!jt&&(t==="scroll"||t==="scrollend"),W=jt?Y!==null?Y+"Capture":null:Y;jt=[];for(var X=Z,tt;X!==null;){var dt=X;if(tt=dt.stateNode,dt=dt.tag,dt!==5&&dt!==26&&dt!==27||tt===null||W===null||(dt=yo(X,W),dt!=null&&jt.push(Jo(X,dt,tt))),pe)break;X=X.return}0<jt.length&&(Y=new et(Y,Lt,null,a,st),mt.push({event:Y,listeners:jt}))}}if((n&7)===0){t:{if(et=t==="mouseover"||t==="pointerover",Y=t==="mouseout"||t==="pointerout",et&&a!==Vc&&(Lt=a.relatedTarget||a.fromElement)&&(Oe(Lt)||Lt[ie]))break t;(Y||et)&&(Lt=st.window===st?st:(et=st.ownerDocument)?et.defaultView||et.parentWindow:window,Y?(et=a.relatedTarget||a.toElement,Y=Z,et=et?Oe(et):null,et!==null&&(pe=f(et),jt=et.tag,et!==pe||jt!==5&&jt!==27&&jt!==6)&&(et=null)):(Y=null,et=Z),Y!==et&&(jt=pm,dt="onMouseLeave",W="onMouseEnter",X="mouse",(t==="pointerout"||t==="pointerover")&&(jt=gm,dt="onPointerLeave",W="onPointerEnter",X="pointer"),pe=Y==null?Lt:gn(Y),tt=et==null?Lt:gn(et),Lt=new jt(dt,X+"leave",Y,a,st),Lt.target=pe,Lt.relatedTarget=tt,dt=null,Oe(st)===Z&&(jt=new jt(W,X+"enter",et,a,st),jt.target=tt,jt.relatedTarget=pe,dt=jt),pe=dt,jt=Y&&et?U(Y,et,kx):null,Y!==null&&h0(mt,Lt,Y,jt,!1),et!==null&&pe!==null&&h0(mt,pe,et,jt,!0)))}t:{if(Y=Z?gn(Z):window,et=Y.nodeName&&Y.nodeName.toLowerCase(),et==="select"||et==="input"&&Y.type==="file")var kt=Tm;else if(Mm(Y))if(bm)kt=jS;else{kt=qS;var Re=YS}else et=Y.nodeName,!et||et.toLowerCase()!=="input"||Y.type!=="checkbox"&&Y.type!=="radio"?Z&&Gc(Z.elementType)&&(kt=Tm):kt=WS;if(kt&&(kt=kt(t,Z))){Em(mt,kt,a,st);break t}Re&&Re(t,Y,Z)}switch(Re=Z?gn(Z):window,t){case"focusin":(Mm(Re)||Re.contentEditable==="true")&&(or=Re,nf=Z,Ro=null);break;case"focusout":Ro=nf=or=null;break;case"mousedown":af=!0;break;case"contextmenu":case"mouseup":case"dragend":af=!1,Lm(mt,a,st);break;case"selectionchange":if(KS)break;case"keydown":case"keyup":Lm(mt,a,st)}var te;if(Qc)t:{switch(t){case"compositionstart":var se="onCompositionStart";break t;case"compositionend":se="onCompositionEnd";break t;case"compositionupdate":se="onCompositionUpdate";break t}se=void 0}else rr?Sm(t,a)&&(se="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(se="onCompositionStart");se&&(_m&&a.locale!=="ko"&&(rr||se!=="onCompositionStart"?se==="onCompositionEnd"&&rr&&(te=hm()):(Da=st,qc="value"in Da?Da.value:Da.textContent,rr=!0)),Re=Iu(Z,se),0<Re.length&&(se=new mm(se,t,null,a,st),mt.push({event:se,listeners:Re}),te?se.data=te:(te=xm(a),te!==null&&(se.data=te)))),(te=HS?GS(t,a):VS(t,a))&&(se=Iu(Z,"onBeforeInput"),0<se.length&&(Re=new mm("onBeforeInput","beforeinput",null,a,st),mt.push({event:Re,listeners:se}),Re.data=te)),Hx(mt,t,Z,a,st)}c0(mt,n)})}function Jo(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Iu(t,n){for(var a=n+"Capture",s=[];t!==null;){var u=t,c=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||c===null||(u=yo(t,a),u!=null&&s.unshift(Jo(t,u,c)),u=yo(t,n),u!=null&&s.push(Jo(t,u,c))),t.tag===3)return s;t=t.return}return[]}function kx(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function h0(t,n,a,s,u){for(var c=n._reactName,_=[];a!==null&&a!==s;){var E=a,z=E.alternate,Z=E.stateNode;if(E=E.tag,z!==null&&z===s)break;E!==5&&E!==26&&E!==27||Z===null||(z=Z,u?(Z=yo(a,c),Z!=null&&_.unshift(Jo(a,Z,z))):u||(Z=yo(a,c),Z!=null&&_.push(Jo(a,Z,z)))),a=a.return}_.length!==0&&t.push({event:n,listeners:_})}var Yx=/\r\n?/g,qx=/\u0000|\uFFFD/g;function d0(t){return(typeof t=="string"?t:""+t).replace(Yx,`
`).replace(qx,"")}function p0(t,n){return n=d0(n),d0(t)===n}function He(t,n,a,s,u,c){switch(a){case"children":if(typeof s=="string")n==="body"||n==="textarea"&&s===""||ir(t,s);else if(typeof s=="number"||typeof s=="bigint")n!=="body"&&ir(t,""+s);else return;break;case"className":Dl(t,"class",s);break;case"tabIndex":Dl(t,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":Dl(t,a,s);break;case"style":um(t,s,c);return;case"data":if(n!=="object"){Dl(t,"data",s);break}case"src":case"href":if(s===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(a);break}s=Ul(s),t.setAttribute(a,s);break;case"action":case"formAction":if(typeof s=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(a==="formAction"?(n!=="input"&&He(t,n,"name",u.name,u,null),He(t,n,"formEncType",u.formEncType,u,null),He(t,n,"formMethod",u.formMethod,u,null),He(t,n,"formTarget",u.formTarget,u,null)):(He(t,n,"encType",u.encType,u,null),He(t,n,"method",u.method,u,null),He(t,n,"target",u.target,u,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(a);break}s=Ul(s),t.setAttribute(a,s);break;case"onClick":s!=null&&(t.onclick=Hi);return;case"onScroll":s!=null&&Ee("scroll",t);return;case"onScrollEnd":s!=null&&Ee("scrollend",t);return;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(u.children!=null)throw Error(r(60));c?.__html!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":t.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){t.removeAttribute("xlink:href");break}a=Ul(s),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,s):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":s===!0?t.setAttribute(a,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,s):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?t.setAttribute(a,s):t.removeAttribute(a);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?t.removeAttribute(a):t.setAttribute(a,s);break;case"popover":Ee("beforetoggle",t),Ee("toggle",t),wl(t,"popover",s);break;case"xlinkActuate":ia(t,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":ia(t,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":ia(t,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":ia(t,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":ia(t,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":ia(t,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":ia(t,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":ia(t,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":ia(t,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":wl(t,"is",s);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=fS.get(a)||a,wl(t,a,s);else return}Ue=!0}function Hh(t,n,a,s,u,c){switch(a){case"style":um(t,s,c);return;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(u.children!=null)throw Error(r(60));c?.__html!==a&&(t.innerHTML=a)}}break;case"children":if(typeof s=="string")ir(t,s);else if(typeof s=="number"||typeof s=="bigint")ir(t,""+s);else return;break;case"onScroll":s!=null&&Ee("scroll",t);return;case"onScrollEnd":s!=null&&Ee("scrollend",t);return;case"onClick":s!=null&&(t.onclick=Hi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!In.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),c=a.slice(2,u?a.length-7:void 0),n=t[Wt]||null,n=n!=null?n[a]:null,typeof n=="function"&&t.removeEventListener(c,n,u),typeof s=="function")){typeof n!="function"&&n!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(c,s,u);break t}Ue=!0,a in t?t[a]=s:s===!0?t.setAttribute(a,""):wl(t,a,s)}return}Ue=!0}function Dn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ee("error",t),Ee("load",t);var s=!1,u=!1,c;for(c in a)if(a.hasOwnProperty(c)){var _=a[c];if(_!=null)switch(c){case"src":s=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:He(t,n,c,_,a,null)}}u&&He(t,n,"srcSet",a.srcSet,a,null),s&&He(t,n,"src",a.src,a,null);return;case"input":Ee("invalid",t);var E=c=_=u=null,z=null,Z=null;for(s in a)if(a.hasOwnProperty(s)){var st=a[s];if(st!=null)switch(s){case"name":u=st;break;case"type":_=st;break;case"checked":z=st;break;case"defaultChecked":Z=st;break;case"value":c=st;break;case"defaultValue":E=st;break;case"children":case"dangerouslySetInnerHTML":if(st!=null)throw Error(r(137,n));break;default:He(t,n,s,st,a,null)}}sm(t,c,E,z,Z,_,u,!1);return;case"select":Ee("invalid",t),s=_=c=null;for(u in a)if(a.hasOwnProperty(u)&&(E=a[u],E!=null))switch(u){case"value":c=E;break;case"defaultValue":_=E;break;case"multiple":s=E;default:He(t,n,u,E,a,null)}n=c,a=_,t.multiple=!!s,n!=null?nr(t,!!s,n,!1):a!=null&&nr(t,!!s,a,!0);return;case"textarea":Ee("invalid",t),c=u=s=null;for(_ in a)if(a.hasOwnProperty(_)&&(E=a[_],E!=null))switch(_){case"value":s=E;break;case"defaultValue":u=E;break;case"children":c=E;break;case"dangerouslySetInnerHTML":if(E!=null)throw Error(r(91));break;default:He(t,n,_,E,a,null)}om(t,s,u,c);return;case"option":for(z in a)a.hasOwnProperty(z)&&(s=a[z],s!=null)&&(z==="selected"?t.selected=s&&typeof s!="function"&&typeof s!="symbol":He(t,n,z,s,a,null));return;case"dialog":Ee("beforetoggle",t),Ee("toggle",t),Ee("cancel",t),Ee("close",t);break;case"iframe":case"object":Ee("load",t);break;case"video":case"audio":for(s=0;s<Qo.length;s++)Ee(Qo[s],t);break;case"image":Ee("error",t),Ee("load",t);break;case"details":Ee("toggle",t);break;case"embed":case"source":case"link":Ee("error",t),Ee("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(Z in a)if(a.hasOwnProperty(Z)&&(s=a[Z],s!=null))switch(Z){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:He(t,n,Z,s,a,null)}return;default:if(Gc(n)){for(st in a)a.hasOwnProperty(st)&&(s=a[st],s!==void 0&&Hh(t,n,st,s,a,void 0));return}}for(E in a)a.hasOwnProperty(E)&&(s=a[E],s!=null&&He(t,n,E,s,a,null))}var Wx={};function jx(t,n,a,s){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,c=null,_=null,E=null,z=null,Z=null,st=null;for(et in a){var mt=a[et];if(a.hasOwnProperty(et)&&mt!=null)switch(et){case"checked":break;case"value":break;case"defaultValue":z=mt;default:s.hasOwnProperty(et)||He(t,n,et,null,s,mt)}}for(var Y in s){var et=s[Y];if(mt=a[Y],s.hasOwnProperty(Y)&&(et!=null||mt!=null))switch(Y){case"type":et!==mt&&(Ue=!0),c=et;break;case"name":et!==mt&&(Ue=!0),u=et;break;case"checked":et!==mt&&(Ue=!0),Z=et;break;case"defaultChecked":et!==mt&&(Ue=!0),st=et;break;case"value":et!==mt&&(Ue=!0),_=et;break;case"defaultValue":et!==mt&&(Ue=!0),E=et;break;case"children":case"dangerouslySetInnerHTML":if(et!=null)throw Error(r(137,n));break;default:et!==mt&&He(t,n,Y,et,s,mt)}}Fc(t,_,E,z,Z,st,c,u);return;case"select":et=_=E=Y=null;for(c in a)if(z=a[c],a.hasOwnProperty(c)&&z!=null)switch(c){case"value":break;case"multiple":et=z;default:s.hasOwnProperty(c)||He(t,n,c,null,s,z)}for(u in s)if(c=s[u],z=a[u],s.hasOwnProperty(u)&&(c!=null||z!=null))switch(u){case"value":c!==z&&(Ue=!0),Y=c;break;case"defaultValue":c!==z&&(Ue=!0),E=c;break;case"multiple":c!==z&&(Ue=!0),_=c;default:c!==z&&He(t,n,u,c,s,z)}n=E,a=_,s=et,Y!=null?nr(t,!!a,Y,!1):!!s!=!!a&&(n!=null?nr(t,!!a,n,!0):nr(t,!!a,a?[]:"",!1));return;case"textarea":et=Y=null;for(E in a)if(u=a[E],a.hasOwnProperty(E)&&u!=null&&!s.hasOwnProperty(E))switch(E){case"value":break;case"children":break;default:He(t,n,E,null,s,u)}for(_ in s)if(u=s[_],c=a[_],s.hasOwnProperty(_)&&(u!=null||c!=null))switch(_){case"value":u!==c&&(Ue=!0),Y=u;break;case"defaultValue":u!==c&&(Ue=!0),et=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:u!==c&&He(t,n,_,u,s,c)}rm(t,Y,et);return;case"option":for(var Lt in a)Y=a[Lt],a.hasOwnProperty(Lt)&&Y!=null&&!s.hasOwnProperty(Lt)&&(Lt==="selected"?t.selected=!1:He(t,n,Lt,null,s,Y));for(z in s)Y=s[z],et=a[z],s.hasOwnProperty(z)&&Y!==et&&(Y!=null||et!=null)&&(z==="selected"?(Y!==et&&(Ue=!0),t.selected=Y&&typeof Y!="function"&&typeof Y!="symbol"):He(t,n,z,Y,s,et));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var jt in a)Y=a[jt],a.hasOwnProperty(jt)&&Y!=null&&!s.hasOwnProperty(jt)&&He(t,n,jt,null,s,Y);for(Z in s)if(Y=s[Z],et=a[Z],s.hasOwnProperty(Z)&&Y!==et&&(Y!=null||et!=null))switch(Z){case"children":case"dangerouslySetInnerHTML":if(Y!=null)throw Error(r(137,n));break;default:He(t,n,Z,Y,s,et)}return;default:if(Gc(n)){for(var pe in a)Y=a[pe],a.hasOwnProperty(pe)&&Y!==void 0&&!s.hasOwnProperty(pe)&&Hh(t,n,pe,void 0,s,Y);for(st in s)Y=s[st],et=a[st],!s.hasOwnProperty(st)||Y===et||Y===void 0&&et===void 0||Hh(t,n,st,Y,s,et);return}}for(var W in a)Y=a[W],a.hasOwnProperty(W)&&Y!=null&&!s.hasOwnProperty(W)&&He(t,n,W,null,s,Y);for(mt in s)Y=s[mt],et=a[mt],!s.hasOwnProperty(mt)||Y===et||Y==null&&et==null||He(t,n,mt,Y,s,et)}function m0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Zx(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),s=0;s<a.length;s++){var u=a[s],c=u.transferSize,_=u.initiatorType,E=u.duration;if(c&&E&&m0(_)){for(_=0,E=u.responseEnd,s+=1;s<a.length;s++){var z=a[s],Z=z.startTime;if(Z>E)break;var st=z.transferSize,mt=z.initiatorType;st&&m0(mt)&&(z=z.responseEnd,_+=st*(z<E?1:(E-Z)/(z-Z)))}if(--s,n+=8*(c+_)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Gh=null,Vh=null;function $o(t){return t.nodeType===9?t:t.ownerDocument}function g0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function _0(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function v0(t,n,a,s){return a=$o(a).createElement(t),a[Dt]=s,a[Wt]=n,Dn(a,t,n),De(a),a}function Xh(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var kh=null;function Kx(){var t=window.event;return t&&t.type==="popstate"?t===kh?!1:(kh=t,!0):(kh=null,!1)}var Yh=typeof setTimeout=="function"?setTimeout:void 0,Qx=typeof clearTimeout=="function"?clearTimeout:void 0,y0=typeof Promise=="function"?Promise:void 0,S0=typeof requestAnimationFrame=="function"?requestAnimationFrame:Yh,Jx=typeof queueMicrotask=="function"?queueMicrotask:typeof y0<"u"?function(t){return y0.resolve(null).then(t).catch($x)}:Yh;function $x(t){setTimeout(function(){throw t})}function Ka(t){return t==="head"}function x0(t,n){var a=n,s=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(s===0){t.removeChild(u),Hr(n);return}s--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")s++;else if(a==="html")$h(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,$h(a);for(var c=a.firstChild;c;){var _=c.nextSibling,E=c.nodeName;c[Le]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&c.rel.toLowerCase()==="stylesheet"||a.removeChild(c),c=_}}else a==="body"&&$h(t.ownerDocument.body);a=u}while(a);Hr(n)}function M0(t,n){var a=t;t=0;do{var s=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),s&&s.nodeType===8)if(a=s.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=s}while(a)}function E0(t,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,t.style.viewTransitionName=n,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(n=t.getClientRects(),n.length===1)var s=1;else for(var u=s=0;u<n.length;u++){var c=n[u];0<c.width&&0<c.height&&s++}s===1&&(t=t.style,t.display=n.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function T0(t,n){t=t.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(n==null?t.display=t.margin="":(a=n.display,t.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?t.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],t.marginBottom=n==null||typeof n=="boolean"?"":n)))}function tM(t,n,a){return a=a.ownerDocument.defaultView,{rect:t,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function qh(t){var n=t.getBoundingClientRect(),a=getComputedStyle(t);return tM(n,a,t)}function eM(t){return t.documentElement.clientHeight}function nM(t){this.addEventListener("load",t),this.addEventListener("error",t)}function iM(t,n,a,s,u,c,_,E,z){var Z=n.nodeType===9?n:n.ownerDocument;try{var st=Z.startViewTransition({update:function(){var Y=Z.defaultView,et=Y.navigation&&Y.navigation.transition,Lt=Z.fonts.status;s();var jt=[];if(Lt==="loaded"&&(eM(Z),Z.fonts.status==="loading"&&jt.push(Z.fonts.ready)),Lt=jt.length,t!==null)for(var pe=t.suspenseyImages,W=0,X=0;X<pe.length;X++){var tt=pe[X];if(!tt.complete){var dt=tt.getBoundingClientRect();if(0<dt.bottom&&0<dt.right&&dt.top<Y.innerHeight&&dt.left<Y.innerWidth){if(W+=Y0(tt),W>Hu){jt.length=Lt;break}tt=new Promise(nM.bind(tt)),jt.push(tt)}}}if(0<jt.length)return Y=Promise.race([Promise.all(jt),new Promise(function(kt){return setTimeout(kt,500)})]).then(u,u),(et?Promise.allSettled([et.finished,Y]):Y).then(c,c);if(u(),et)return et.finished.then(c,c);c()},types:a});Z.__reactViewTransition=st;var mt=[];return st.ready.then(function(){for(var Y=Z.documentElement.getAnimations({subtree:!0}),et=0;et<Y.length;et++){var Lt=Y[et],jt=Lt.effect,pe=jt.pseudoElement;if(pe!=null&&pe.startsWith("::view-transition")){mt.push(Lt),Lt=jt.getKeyframes();for(var W=pe=void 0,X=!0,tt=0;tt<Lt.length;tt++){var dt=Lt[tt],kt=dt.width;if(pe===void 0)pe=kt;else if(pe!==kt){X=!1;break}if(kt=dt.height,W===void 0)W=kt;else if(W!==kt){X=!1;break}delete dt.width,delete dt.height,dt.transform==="none"&&delete dt.transform}X&&pe!==void 0&&W!==void 0&&(jt.setKeyframes(Lt),X=getComputedStyle(jt.target,jt.pseudoElement),X.width!==pe||X.height!==W)&&(X=Lt[0],X.width=pe,X.height=W,X=Lt[Lt.length-1],X.width=pe,X.height=W,jt.setKeyframes(Lt))}}_()},function(Y){Z.__reactViewTransition===st&&(Z.__reactViewTransition=null);try{typeof Y=="object"&&Y!==null&&Y.name==="InvalidStateError"&&(Y.message==="View transition was skipped because document visibility state is hidden."||Y.message==="Skipping view transition because document visibility state has become hidden."||Y.message==="Skipping view transition because viewport size changed."||Y.message==="Transition was aborted because of invalid state")&&(Y=null),Y!==null&&z(Y)}finally{s(),u(),_()}}),st.finished.finally(function(){for(var Y=0;Y<mt.length;Y++)mt[Y].cancel();Z.__reactViewTransition===st&&(Z.__reactViewTransition=null),E()}),st}catch{return s(),u(),_(),null}}function Is(t,n){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+n+")"}Is.prototype.animate=function(t,n){return n=typeof n=="number"?{duration:n}:N({},n),n.pseudoElement=this._selector,this._scope.animate(t,n)},Is.prototype.getAnimations=function(){for(var t=this._scope,n=this._selector,a=t.getAnimations({subtree:!0}),s=[],u=0;u<a.length;u++){var c=a[u].effect;c!==null&&c.target===t&&c.pseudoElement===n&&s.push(a[u])}return s},Is.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function b0(t){return{name:t,group:new Is("group",t),imagePair:new Is("image-pair",t),old:new Is("old",t),new:new Is("new",t)}}function li(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}li.prototype.addEventListener=function(t,n,a){var s=null,u=null;if(!(a!=null&&typeof a!="boolean"&&(s=a.signal||null,s!==null&&s.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var c=this._eventListeners;if(R0(c,t,n,a)===-1){var _=this,E=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(E=function(z){_.removeEventListener(t,n,a),typeof n=="function"?n.call(this,z):n.handleEvent(z)}),s!==null&&(u=_.removeEventListener.bind(_,t,n,a),s.addEventListener("abort",u,{once:!0}),u=s.removeEventListener.bind(s,"abort",u)),s=Or(a),c.push({type:t,listener:n,optionsOrUseCapture:a,attachedListener:E,cleanup:u}),m(this._fragmentFiber.child,!1,aM,t,E,s)}this._eventListeners=c}};function aM(t,n,a,s){return M(t).addEventListener(n,a,s),!1}li.prototype.removeEventListener=function(t,n,a){var s=this._eventListeners;if(s!==null&&(n=R0(s,t,n,a),n!==-1)){var u=s[n];a=u.attachedListener;var c=u.cleanup;u=Or(u.optionsOrUseCapture),m(this._fragmentFiber.child,!1,sM,t,a,u),s.splice(n,1),c!==null&&c()}};function sM(t,n,a,s){return M(t).removeEventListener(n,a,s),!1}function Or(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function A0(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function R0(t,n,a,s){if(t.length===0)return-1;s=A0(s);for(var u=0;u<t.length;u++){var c=t[u];if(c.type===n&&c.listener===a&&A0(c.optionsOrUseCapture)===s)return u}return-1}li.prototype.dispatchEvent=function(t){var n=y(this._fragmentFiber);if(n===null)return!0;n=M(n);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var s=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var u=0;u<a.length;u++){var c=a[u];s.addEventListener(c.type,c.attachedListener,Or(c.optionsOrUseCapture))}if(n.appendChild(s),t=s.dispatchEvent(t),a)for(u=0;u<a.length;u++)c=a[u],s.removeEventListener(c.type,c.attachedListener,Or(c.optionsOrUseCapture));return n.removeChild(s),t}return n.dispatchEvent(t)},li.prototype.focus=function(t){m(this._fragmentFiber.child,!0,C0,t,void 0,void 0)};function C0(t,n){return t.tag===6?!1:(t=M(t),_M(t,n))}li.prototype.focusLast=function(t){var n=[];m(this._fragmentFiber.child,!0,Wh,n,void 0,void 0);for(var a=n.length-1;0<=a&&!C0(n[a],t);a--);};function Wh(t,n){return n.push(t),!1}li.prototype.blur=function(){var t=y(this._fragmentFiber);t!==null&&(t=M(t),t=$o(t).activeElement,t!==null&&m(this._fragmentFiber.child,!1,rM,t,void 0,void 0))};function rM(t,n){return t.tag===6?!1:(t=M(t),t===n||t.contains(n)?(n.blur(),!0):!1)}li.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),m(this._fragmentFiber.child,!1,oM,t,void 0,void 0)};function oM(t,n){return t.tag===6||(t=M(t),n.observe(t)),!1}li.prototype.unobserveUsing=function(t){var n=this._observers;if(n!==null&&n.has(t)){n.delete(t),m(this._fragmentFiber.child,!1,lM,t,void 0,void 0);for(var a=n=0;a<Ni.length;a++){var s=Ni[a];s.fragmentInstance===this&&s.observer===t?t.unobserve(s.instance):Ni[n++]=s}Ni.length=n}};function lM(t,n){return t.tag===6||(t=M(t),n.unobserve(t)),!1}var Ni=[],jh=!1;function uM(t,n,a){Ni.push({fragmentInstance:t,observer:n,instance:a}),jh||(jh=!0,vM(function(){jh=!1;var s=Ni;Ni=[];for(var u=0;u<s.length;u++){var c=s[u];c.observer.unobserve(c.instance)}}))}li.prototype.getClientRects=function(){var t=[];return m(this._fragmentFiber.child,!1,cM,t,void 0,void 0),t};function cM(t,n){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),n.push.apply(n,a.getClientRects())}else t=M(t),n.push.apply(n,t.getClientRects());return!1}li.prototype.getRootNode=function(t){var n=y(this._fragmentFiber);return n===null?this:M(n).getRootNode(t)},li.prototype.compareDocumentPosition=function(t){var n=y(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];m(this._fragmentFiber.child,!1,Wh,a,void 0,void 0);var s=M(n);if(a.length===0){if(a=s,x(this._fragmentFiber)){t:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break t}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var u=s=a.compareDocumentPosition(t);return a===t?u=Node.DOCUMENT_POSITION_CONTAINS:s&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=T(n)[1],a===null?u=Node.DOCUMENT_POSITION_PRECEDING:(t=M(a).compareDocumentPosition(t),u=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),u|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=M(a[0]),u=M(a[a.length-1]);var c=x(this._fragmentFiber)?n.parentElement:s;if(c==null)return Node.DOCUMENT_POSITION_DISCONNECTED;s=c.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,c=c.compareDocumentPosition(u)&Node.DOCUMENT_POSITION_CONTAINED_BY;var _=n.compareDocumentPosition(t),E=u.compareDocumentPosition(t),z=_&Node.DOCUMENT_POSITION_CONTAINED_BY||E&Node.DOCUMENT_POSITION_CONTAINED_BY;return E=s&&c&&_&Node.DOCUMENT_POSITION_FOLLOWING&&E&Node.DOCUMENT_POSITION_PRECEDING,n=s&&n===t||c&&u===t||z||E?Node.DOCUMENT_POSITION_CONTAINED_BY:!s&&n===t||!c&&u===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:_,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||fM(n,this._fragmentFiber,a[0],a[a.length-1],t)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function fM(t,n,a,s,u){var c=Oe(u);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!c)t:{for(;c!==null;){if(c.tag===7&&(c===n||c.alternate===n)){a=!0;break t}c=c.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(c===null)return c=u.ownerDocument,u===c||u===c.documentElement||u===c.body;t:{for(c=n,n=y(n);c!==null;){if(!(c.tag!==5&&c.tag!==3&&c.tag!==27||c!==n&&c.alternate!==n)){c=!0;break t}c=c.return}c=!1}return c}return t&Node.DOCUMENT_POSITION_PRECEDING?((n=!!c)&&!(n=c===a)&&(n=U(a,c,H),n===null?n=!1:(m(n,!0,O,c,a),c=S,S=null,n=c!==null)),n):t&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!c)&&!(n=c===s)&&(n=U(s,c,H),n===null?n=!1:(m(n,!0,D,c,s),c=S,I=S=null,n=c!==null)),n):!1}function w0(t,n){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,n?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}li.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(r(566));var n=[];m(this._fragmentFiber.child,!1,Wh,n,void 0,void 0);var a=t!==!1;if(n.length===0){var s=T(this._fragmentFiber);if(s=a?s[1]||s[0]||y(this._fragmentFiber):s[0]||s[1],s===null)return;if(s.tag===6){t=M(s),w0(t,a);return}if(s=M(s),s.nodeType!==9){if(s.nodeType===11){a="host"in s?s.host:null,a!==null&&a.scrollIntoView(t);return}s.scrollIntoView(t)}}for(s=a?n.length-1:0;s!==(a?-1:n.length);){var u=n[s];u.tag===6?(u=M(u),w0(u,a)):M(u).scrollIntoView(t),s+=a?-1:1}};function hM(t,n){return t=M(t),D0(t,n),!1}function D0(t,n){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(n)}function U0(t,n){var a=n._eventListeners;if(a!==null)for(var s=0;s<a.length;s++){var u=a[s];t.addEventListener(u.type,u.attachedListener,Or(u.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){for(var _=0,E=0;E<Ni.length;E++){var z=Ni[E];(z.fragmentInstance!==n||z.observer!==c||z.instance!==t)&&(Ni[_++]=z)}Ni.length=_,c.observe(t)}),D0(t,n))}function dM(t,n){var a=n._eventListeners;if(a!==null)for(var s=0;s<a.length;s++){var u=a[s];t.removeEventListener(u.type,u.attachedListener,Or(u.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){typeof c.rootMargin=="string"?uM(n,c,t):c.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(n))}function Zh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Zh(a),ne(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function pM(t,n,a,s){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!s&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(s){if(!t[Le])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(c=t.getAttribute("rel"),c==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(c!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(c=t.getAttribute("src"),(c!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&c&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var c=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===c)return t}else return t;if(t=xi(t.nextSibling),t===null)break}return null}function mM(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=xi(t.nextSibling),t===null))return null;return t}function N0(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=xi(t.nextSibling),t===null))return null;return t}function Kh(t){return t.data==="$?"||t.data==="$~"}function Qh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function gM(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var s=function(){n(),a.removeEventListener("DOMContentLoaded",s)};a.addEventListener("DOMContentLoaded",s),t._reactRetry=s}}function xi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Jh=null;function L0(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return xi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function O0(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function _M(t,n){function a(){s=!0}if(t.ownerDocument.activeElement===t)return!0;var s=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,n)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return s}function vM(t){S0(function(){S0(function(n){return t(n)})})}function P0(t,n,a){switch(n=$o(a),t){case"html":if(t=n.documentElement,!t)throw Error(r(452));return t;case"head":if(t=n.head,!t)throw Error(r(453));return t;case"body":if(t=n.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function z0(t,n,a){for(var s in a){var u=a[s];a.hasOwnProperty(s)&&u!=null&&He(t,n,s,null,Wx,u)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===Hi&&(t.onclick=null),ne(t)}function $h(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);ne(t)}var Mi=new Map,I0=new Set;function tl(t){if(typeof t.getRootNode=="function"){var n=t.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return t.nodeType===9?t:t.ownerDocument}var ga=vt.d;vt.d={f:yM,r:SM,D:xM,C:MM,L:EM,m:TM,X:AM,S:bM,M:RM};function yM(){var t=ga.f(),n=Uu();return t||n}function SM(t){var n=_e(t);n!==null&&n.tag===5&&n.type==="form"?Fg(n):ga.r(t)}var Pr=typeof document>"u"?null:document;function B0(t,n,a){var s=Pr;if(s&&typeof n=="string"&&n){var u=pi(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),I0.has(u)||(I0.add(u),t={rel:t,crossOrigin:a,href:n},s.querySelector(u)===null&&(n=s.createElement("link"),Dn(n,"link",t),De(n),s.head.appendChild(n)))}}function xM(t){ga.D(t),B0("dns-prefetch",t,null)}function MM(t,n){ga.C(t,n),B0("preconnect",t,n)}function EM(t,n,a){ga.L(t,n,a);var s=Pr;if(s&&t&&n){var u='link[rel="preload"][as="'+pi(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+pi(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+pi(a.imageSizes)+'"]')):u+='[href="'+pi(t)+'"]';var c=u;switch(n){case"style":c=zr(t);break;case"script":c=Ir(t)}if(!(Mi.has(c)||(t=N({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Mi.set(c,t),s.querySelector(u)!==null||n==="style"&&s.querySelector(el(c))||n==="script"&&s.querySelector(nl(c))))){var _=s.createElement("link");Dn(_,"link",t),n==="style"&&(_[we]=!0,_.onload=_.onerror=function(){wa(_)}),De(_),s.head.appendChild(_)}}}function TM(t,n){ga.m(t,n);var a=Pr;if(a&&t){var s=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+pi(s)+'"][href="'+pi(t)+'"]',c=u;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=Ir(t)}if(!Mi.has(c)&&(t=N({rel:"modulepreload",href:t},n),Mi.set(c,t),a.querySelector(u)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(nl(c)))return}s=a.createElement("link"),Dn(s,"link",t),De(s),a.head.appendChild(s)}}}function bM(t,n,a){ga.S(t,n,a);var s=Pr;if(s&&t){var u=ti(s).hoistableStyles,c=zr(t);n=n||"default";var _=u.get(c);if(!_){var E={loading:0,preload:null};if(_=s.querySelector(el(c)))E.loading=5;else{t=N({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Mi.get(c))&&td(t,a);var z=_=s.createElement("link");De(z),Dn(z,"link",t),z._p=new Promise(function(Z,st){z.onload=Z,z.onerror=st}),z.addEventListener("load",function(){E.loading|=1}),z.addEventListener("error",function(){E.loading|=2}),E.loading|=4,Bu(_,n,s)}_={type:"stylesheet",instance:_,count:1,state:E},u.set(c,_)}}}function AM(t,n){ga.X(t,n);var a=Pr;if(a&&t){var s=ti(a).hoistableScripts,u=Ir(t),c=s.get(u);c||(c=a.querySelector(nl(u)),c||(t=N({src:t,async:!0},n),(n=Mi.get(u))&&ed(t,n),c=a.createElement("script"),De(c),Dn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(u,c))}}function RM(t,n){ga.M(t,n);var a=Pr;if(a&&t){var s=ti(a).hoistableScripts,u=Ir(t),c=s.get(u);c||(c=a.querySelector(nl(u)),c||(t=N({src:t,async:!0,type:"module"},n),(n=Mi.get(u))&&ed(t,n),c=a.createElement("script"),De(c),Dn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(u,c))}}function F0(t,n,a,s){var u=(u=Ye.current)?tl(u):null;if(!u)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=zr(a.href),n=ti(u).hoistableStyles,s=n.get(a),s||(s={type:"style",instance:null,count:0,state:null},n.set(a,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=zr(a.href);var c=ti(u).hoistableStyles,_=c.get(t);if(_||(u=u.ownerDocument||u,_={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(t,_),(c=u.querySelector(el(t)))?c._p||(_.instance=c,_.state.loading=5):(c=Mi.get(t),c||(c={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Mi.set(t,c)),CM(u,t,c,_.state))),n&&s===null)throw Error(r(528,""));return _}if(n&&s!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=Ir(a),n=ti(u).hoistableScripts,s=n.get(a),s||(s={type:"script",instance:null,count:0,state:null},n.set(a,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function zr(t){return'href="'+pi(t)+'"'}function el(t){return'link[rel="stylesheet"]['+t+"]"}function H0(t){return N({},t,{"data-precedence":t.precedence,precedence:null})}function CM(t,n,a,s){if(n=t.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[we]!==!0){s.loading=1;return}}else n=t.createElement("link"),n[we]=!0,n.onload=n.onerror=wa.bind(null,n),Dn(n,"link",a),De(n),t.head.appendChild(n);s.preload=n,n.addEventListener("load",function(){return s.loading|=1}),n.addEventListener("error",function(){return s.loading|=2})}function Ir(t){return'[src="'+pi(t)+'"]'}function nl(t){return"script[async]"+t}function G0(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var s=t.querySelector('style[data-href~="'+pi(a.href)+'"]');if(s)return n.instance=s,De(s),s;var u=N({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return s=(t.ownerDocument||t).createElement("style"),De(s),Dn(s,"style",u),Bu(s,a.precedence,t),n.instance=s;case"stylesheet":u=zr(a.href);var c=t.querySelector(el(u));if(c)return n.state.loading|=4,n.instance=c,De(c),c;s=H0(a),(u=Mi.get(u))&&td(s,u),c=(t.ownerDocument||t).createElement("link"),De(c);var _=c;return _._p=new Promise(function(E,z){_.onload=E,_.onerror=z}),Dn(c,"link",s),n.state.loading|=4,Bu(c,a.precedence,t),n.instance=c;case"script":return c=Ir(a.src),(u=t.querySelector(nl(c)))?(n.instance=u,De(u),u):(s=a,(u=Mi.get(c))&&(s=N({},a),ed(s,u)),t=t.ownerDocument||t,u=t.createElement("script"),De(u),Dn(u,"link",s),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(s=n.instance,n.state.loading|=4,Bu(s,a.precedence,t));return n.instance}function Bu(t,n,a){for(var s=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=s.length?s[s.length-1]:null,c=u,_=0;_<s.length;_++){var E=s[_];if(E.dataset.precedence===n)c=E;else if(c!==u)break}c?c.parentNode.insertBefore(t,c.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function td(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function ed(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Fu=null;function V0(t,n,a){if(Fu===null){var s=new Map,u=Fu=new Map;u.set(a,s)}else u=Fu,s=u.get(a),s||(s=new Map,u.set(a,s));if(s.has(t))return s;for(s.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var c=a[u];if(!(c[Le]||c[Dt]||t==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var _=c.getAttribute(n)||"";_=t+_;var E=s.get(_);E?E.push(c):s.set(_,[c])}}return s}function nd(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function wM(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function X0(t,n){return t==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function k0(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Y0(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function q0(t,n){typeof n.decode=="function"&&(t.imgCount++,n.complete||(t.imgBytes+=Y0(n),t.suspenseyImages.push(n)),t=NM.bind(t),n.decode().then(t,t))}function DM(t,n,a,s){if(a.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=zr(s.href),c=n.querySelector(el(u));if(c){n=c._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=il.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=c,De(c);return}c=n.ownerDocument||n,s=H0(s),(u=Mi.get(u))&&td(s,u),c=c.createElement("link"),De(c);var _=c;_._p=new Promise(function(E,z){_.onload=E,_.onerror=z}),Dn(c,"link",s),a.instance=c}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=il.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Hu=0;function UM(t,n){return t.stylesheets&&t.count===0&&Vu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var s=setTimeout(function(){if(t.stylesheets&&Vu(t,t.stylesheets),t.unsuspend){var c=t.unsuspend;t.unsuspend=null,c()}},6e4+n);0<t.imgBytes&&Hu===0&&(Hu=62500*Zx());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Vu(t,t.stylesheets),t.unsuspend)){var c=t.unsuspend;t.unsuspend=null,c()}},(t.imgBytes>Hu?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(s),clearTimeout(u)}}:null}function W0(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)Vu(t,t.stylesheets);else if(t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}}}function il(){this.count--,W0(this)}function NM(){this.imgCount--,W0(this)}var Gu=null;function Vu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Gu=new Map,n.forEach(LM,t),Gu=null,il.call(t))}function LM(t,n){if(!(n.state.loading&4)){var a=Gu.get(t);if(a)var s=a.get(null);else{a=new Map,Gu.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<u.length;c++){var _=u[c];(_.nodeName==="LINK"||_.getAttribute("media")!=="not all")&&(a.set(_.dataset.precedence,_),s=_)}s&&a.set(null,s)}u=n.instance,_=u.getAttribute("data-precedence"),c=a.get(_)||s,c===s&&a.set(null,u),a.set(_,u),this.count++,s=il.bind(this),u.addEventListener("load",s),u.addEventListener("error",s),c?c.parentNode.insertBefore(u,c.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Br={$$typeof:ct,Provider:null,Consumer:null,_currentValue:P,_currentValue2:P,_threadCount:0};function OM(t,n,a,s,u,c,_,E,z){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=vo(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vo(0),this.hiddenUpdates=vo(null),this.identifierPrefix=s,this.onUncaughtError=u,this.onCaughtError=c,this.onRecoverableError=_,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.transitionTypes=null,this.incompleteTransitions=new Map}function j0(t,n,a,s,u,c,_,E,z,Z,st,mt){return t=new OM(t,n,a,_,z,Z,st,mt,E),n=1,c===!0&&(n|=24),c=qn(3,null,null,n),t.current=c,c.stateNode=t,n=_f(),n.refCount++,t.pooledCache=n,n.refCount++,c.memoizedState={element:s,isDehydrated:a,cache:n},xf(c),t}function Z0(t){return t?(t=cr,t):cr}function K0(t,n,a,s,u,c){u=Z0(u),s.context===null?s.context=u:s.pendingContext=u,s=Ba(n),s.payload={element:a},c=c===void 0?null:c,c!==null&&(s.callback=c),a=Fa(t,s,n),a!==null&&(Kn(a,t,n),Oo(a,t,n))}function Q0(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function id(t,n){Q0(t,n),(t=t.alternate)&&Q0(t,n)}function J0(t){if(t.tag===13||t.tag===31){var n=Ss(t,67108864);n!==null&&Kn(n,t,67108864),id(t,67108864)}}function $0(t){if(t.tag===13||t.tag===31){var n=oi();n=ut(n);var a=Ss(t,n);a!==null&&Kn(a,t,n),id(t,n)}}var Fr=!0;function PM(t,n,a,s){var u=Mt.T;Mt.T=null;var c=vt.p;try{vt.p=2,ad(t,n,a,s)}finally{vt.p=c,Mt.T=u}}function zM(t,n,a,s){var u=Mt.T;Mt.T=null;var c=vt.p;try{vt.p=8,ad(t,n,a,s)}finally{vt.p=c,Mt.T=u}}function ad(t,n,a,s){if(Fr){var u=sd(s);if(u===null)Fh(t,n,s,Xu,a),ev(t,s);else if(BM(u,t,n,a,s))s.stopPropagation();else if(ev(t,s),n&4&&-1<IM.indexOf(t)){for(;u!==null;){var c=_e(u);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var _=di(c.pendingLanes);if(_!==0){var E=c;for(E.pendingLanes|=2,E.entangledLanes|=2;_;){var z=1<<31-Nn(_);E.entanglements[1]|=z,_&=~z}Ki(c),(Pe&6)===0&&(Cu=k()+500,Ko(0))}}break;case 31:case 13:E=Ss(c,2),E!==null&&Kn(E,c,2),Uu(),id(c,2)}if(c=sd(s),c===null&&Fh(t,n,s,Xu,a),c===u)break;u=c}u!==null&&s.stopPropagation()}else Fh(t,n,s,null,a)}}function sd(t){return t=Xc(t),rd(t)}var Xu=null;function rd(t){if(Xu=null,t=Oe(t),t!==null){var n=f(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Xu=t,null}function tv(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Rt()){case Ut:return 2;case Yt:return 8;case Et:case gt:return 32;case Kt:return 268435456;default:return 32}default:return 32}}var od=!1,Qa=null,Ja=null,$a=null,al=new Map,sl=new Map,ts=[],IM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function ev(t,n){switch(t){case"focusin":case"focusout":Qa=null;break;case"dragenter":case"dragleave":Ja=null;break;case"mouseover":case"mouseout":$a=null;break;case"pointerover":case"pointerout":al.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":sl.delete(n.pointerId)}}function rl(t,n,a,s,u,c){return t===null||t.nativeEvent!==c?(t={blockedOn:n,domEventName:a,eventSystemFlags:s,nativeEvent:c,targetContainers:[u]},n!==null&&(n=_e(n),n!==null&&J0(n)),t):(t.eventSystemFlags|=s,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function BM(t,n,a,s,u){switch(n){case"focusin":return Qa=rl(Qa,t,n,a,s,u),!0;case"dragenter":return Ja=rl(Ja,t,n,a,s,u),!0;case"mouseover":return $a=rl($a,t,n,a,s,u),!0;case"pointerover":var c=u.pointerId;return al.set(c,rl(al.get(c)||null,t,n,a,s,u)),!0;case"gotpointercapture":return c=u.pointerId,sl.set(c,rl(sl.get(c)||null,t,n,a,s,u)),!0}return!1}function nv(t){var n=Oe(t.target);if(n!==null){var a=f(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,zt(t.priority,function(){$0(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,zt(t.priority,function(){$0(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ku(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=sd(t.nativeEvent);if(a===null){a=t.nativeEvent;var s=new a.constructor(a.type,a);Vc=s,a.target.dispatchEvent(s),Vc=null}else return n=_e(a),n!==null&&J0(n),t.blockedOn=a,!1;n.shift()}return!0}function iv(t,n,a){ku(t)&&a.delete(n)}function FM(){od=!1,Qa!==null&&ku(Qa)&&(Qa=null),Ja!==null&&ku(Ja)&&(Ja=null),$a!==null&&ku($a)&&($a=null),al.forEach(iv),sl.forEach(iv)}function Yu(t,n){t.blockedOn===n&&(t.blockedOn=null,od||(od=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,FM)))}var qu=null;function av(t){qu!==t&&(qu=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){qu===t&&(qu=null);for(var n=0;n<t.length;n+=3){var a=t[n],s=t[n+1],u=t[n+2];if(typeof s!="function"){if(rd(s||a)===null)continue;break}var c=_e(a);c!==null&&(t.splice(n,3),n-=3,Vf(c,{pending:!0,data:u,method:a.method,action:s},s,u))}}))}function Hr(t){function n(z){return Yu(z,t)}Qa!==null&&Yu(Qa,t),Ja!==null&&Yu(Ja,t),$a!==null&&Yu($a,t),al.forEach(n),sl.forEach(n);for(var a=0;a<ts.length;a++){var s=ts[a];s.blockedOn===t&&(s.blockedOn=null)}for(;0<ts.length&&(a=ts[0],a.blockedOn===null);)nv(a),a.blockedOn===null&&ts.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(s=0;s<a.length;s+=3){var u=a[s],c=a[s+1],_=u[Wt]||null;if(typeof c=="function")_||av(a);else if(_){var E=null;if(c&&c.hasAttribute("formAction")){if(u=c,_=c[Wt]||null)E=_.formAction;else if(rd(u)!==null)continue}else E=_.action;typeof E=="function"?a[s+1]=E:(a.splice(s,3),s-=3),av(a)}}}function sv(){function t(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(_){return u=_})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),s||setTimeout(a,20)}function a(){if(!s&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){s=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function ld(t){this._internalRoot=t}Wu.prototype.render=ld.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,s=oi();K0(a,s,t,n,null,null)},Wu.prototype.unmount=ld.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;K0(t.current,2,null,t,null,null),Uu(),n[ie]=null}};function Wu(t){this._internalRoot=t}Wu.prototype.unstable_scheduleHydration=function(t){if(t){var n=Tt();t={blockedOn:null,target:t,priority:n};for(var a=0;a<ts.length&&n!==0&&n<ts[a].priority;a++);ts.splice(a,0,t),a===0&&nv(t)}};var rv=e.version;if(rv!=="19.3.1")throw Error(r(527,rv,"19.3.1"));vt.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=p(n),t=t!==null?g(t):null,t=t===null?null:t.stateNode,t};var HM={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:Mt,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ju=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ju.isDisabled&&ju.supportsFiber)try{be=ju.inject(HM),tn=ju}catch{}}return ll.createRoot=function(t,n){if(!l(t))throw Error(r(299));var a=!1,s="",u=Zg,c=Kg,_=Qg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(_=n.onRecoverableError)),n=j0(t,1,!1,null,null,a,s,null,u,c,_,sv),t[ie]=n.current,Bh(t),new ld(n)},ll.hydrateRoot=function(t,n,a){if(!l(t))throw Error(r(299));var s=!1,u="",c=Zg,_=Kg,E=Qg,z=null;return a!=null&&(a.unstable_strictMode===!0&&(s=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(c=a.onUncaughtError),a.onCaughtError!==void 0&&(_=a.onCaughtError),a.onRecoverableError!==void 0&&(E=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=j0(t,1,!0,n,a??null,s,u,z,c,_,E,sv),n.context=Z0(null),a=n.current,s=oi(),s=ut(s),u=Ba(s),u.callback=null,Fa(a,u,s),a=s,n.current.lanes=a,_s(n,a),Ki(n),t[ie]=n.current,Bh(t),new Wu(n)},ll.version="19.3.1",ll}var gv;function KM(){if(gv)return cd.exports;gv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),cd.exports=ZM(),cd.exports}var jC=KM(),kn=Bp();const Fp="180",ao={ROTATE:0,DOLLY:1,PAN:2},no={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},QM=0,_v=1,JM=2,Cy=1,wy=2,Ea=3,hs=0,Jn=1,ba=2,cs=0,so=1,vv=2,yv=3,Sv=4,$M=5,Ys=100,tE=101,eE=102,nE=103,iE=104,aE=200,sE=201,rE=202,oE=203,jd=204,Zd=205,lE=206,uE=207,cE=208,fE=209,hE=210,dE=211,pE=212,mE=213,gE=214,Kd=0,Qd=1,Jd=2,lo=3,$d=4,tp=5,ep=6,np=7,Dy=0,_E=1,vE=2,fs=0,yE=1,SE=2,xE=3,ME=4,EE=5,TE=6,bE=7,Uy=300,uo=301,co=302,ip=303,ap=304,Nc=306,sp=1e3,Ws=1001,rp=1002,Ii=1003,AE=1004,Zu=1005,Ji=1006,md=1007,js=1008,ta=1009,Ny=1010,Ly=1011,vl=1012,Hp=1013,Zs=1014,Aa=1015,Tl=1016,Gp=1017,Vp=1018,yl=1020,Oy=35902,Py=35899,zy=1021,Iy=1022,zi=1023,Sl=1026,xl=1027,By=1028,Xp=1029,Fy=1030,kp=1031,Yp=1033,Mc=33776,Ec=33777,Tc=33778,bc=33779,op=35840,lp=35841,up=35842,cp=35843,fp=36196,hp=37492,dp=37496,pp=37808,mp=37809,gp=37810,_p=37811,vp=37812,yp=37813,Sp=37814,xp=37815,Mp=37816,Ep=37817,Tp=37818,bp=37819,Ap=37820,Rp=37821,Cp=36492,wp=36494,Dp=36495,Up=36283,Np=36284,Lp=36285,Op=36286,RE=3200,CE=3201,Hy=0,wE=1,us="",fi="srgb",fo="srgb-linear",Rc="linear",Xe="srgb",Gr=7680,xv=519,DE=512,UE=513,NE=514,Gy=515,LE=516,OE=517,PE=518,zE=519,Mv=35044,Ev="300 es",$i=2e3,Cc=2001;class $s{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){const r=this._listeners;if(r===void 0)return;const l=r[e];if(l!==void 0){const f=l.indexOf(i);f!==-1&&l.splice(f,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const r=i[e.type];if(r!==void 0){e.target=this;const l=r.slice(0);for(let f=0,h=l.length;f<h;f++)l[f].call(this,e);e.target=null}}}const Pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Tv=1234567;const ro=Math.PI/180,Ml=180/Math.PI;function po(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Pn[o&255]+Pn[o>>8&255]+Pn[o>>16&255]+Pn[o>>24&255]+"-"+Pn[e&255]+Pn[e>>8&255]+"-"+Pn[e>>16&15|64]+Pn[e>>24&255]+"-"+Pn[i&63|128]+Pn[i>>8&255]+"-"+Pn[i>>16&255]+Pn[i>>24&255]+Pn[r&255]+Pn[r>>8&255]+Pn[r>>16&255]+Pn[r>>24&255]).toLowerCase()}function Se(o,e,i){return Math.max(e,Math.min(i,o))}function qp(o,e){return(o%e+e)%e}function IE(o,e,i,r,l){return r+(o-e)*(l-r)/(i-e)}function BE(o,e,i){return o!==e?(i-o)/(e-o):0}function gl(o,e,i){return(1-i)*o+i*e}function FE(o,e,i,r){return gl(o,e,1-Math.exp(-i*r))}function HE(o,e=1){return e-Math.abs(qp(o,e*2)-e)}function GE(o,e,i){return o<=e?0:o>=i?1:(o=(o-e)/(i-e),o*o*(3-2*o))}function VE(o,e,i){return o<=e?0:o>=i?1:(o=(o-e)/(i-e),o*o*o*(o*(o*6-15)+10))}function XE(o,e){return o+Math.floor(Math.random()*(e-o+1))}function kE(o,e){return o+Math.random()*(e-o)}function YE(o){return o*(.5-Math.random())}function qE(o){o!==void 0&&(Tv=o);let e=Tv+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function WE(o){return o*ro}function jE(o){return o*Ml}function ZE(o){return(o&o-1)===0&&o!==0}function KE(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function QE(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function JE(o,e,i,r,l){const f=Math.cos,h=Math.sin,d=f(i/2),v=h(i/2),p=f((e+r)/2),g=h((e+r)/2),m=f((e-r)/2),y=h((e-r)/2),x=f((r-e)/2),T=h((r-e)/2);switch(l){case"XYX":o.set(d*g,v*m,v*y,d*p);break;case"YZY":o.set(v*y,d*g,v*m,d*p);break;case"ZXZ":o.set(v*m,v*y,d*g,d*p);break;case"XZX":o.set(d*g,v*T,v*x,d*p);break;case"YXY":o.set(v*x,d*g,v*T,d*p);break;case"ZYZ":o.set(v*T,v*x,d*g,d*p);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function eo(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Vn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const _l={DEG2RAD:ro,RAD2DEG:Ml,generateUUID:po,clamp:Se,euclideanModulo:qp,mapLinear:IE,inverseLerp:BE,lerp:gl,damp:FE,pingpong:HE,smoothstep:GE,smootherstep:VE,randInt:XE,randFloat:kE,randFloatSpread:YE,seededRandom:qE,degToRad:WE,radToDeg:jE,isPowerOfTwo:ZE,ceilPowerOfTwo:KE,floorPowerOfTwo:QE,setQuaternionFromProperEuler:JE,normalize:Vn,denormalize:eo};class fe{constructor(e=0,i=0){fe.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,r=this.y,l=e.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Se(this.x,e.x,i.x),this.y=Se(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Se(this.x,e,i),this.y=Se(this.y,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(Se(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const r=Math.cos(i),l=Math.sin(i),f=this.x-e.x,h=this.y-e.y;return this.x=f*r-h*l+e.x,this.y=f*l+h*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ks{constructor(e=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=l}static slerpFlat(e,i,r,l,f,h,d){let v=r[l+0],p=r[l+1],g=r[l+2],m=r[l+3];const y=f[h+0],x=f[h+1],T=f[h+2],A=f[h+3];if(d===0){e[i+0]=v,e[i+1]=p,e[i+2]=g,e[i+3]=m;return}if(d===1){e[i+0]=y,e[i+1]=x,e[i+2]=T,e[i+3]=A;return}if(m!==A||v!==y||p!==x||g!==T){let M=1-d;const S=v*y+p*x+g*T+m*A,I=S>=0?1:-1,O=1-S*S;if(O>Number.EPSILON){const H=Math.sqrt(O),U=Math.atan2(H,S*I);M=Math.sin(M*U)/H,d=Math.sin(d*U)/H}const D=d*I;if(v=v*M+y*D,p=p*M+x*D,g=g*M+T*D,m=m*M+A*D,M===1-d){const H=1/Math.sqrt(v*v+p*p+g*g+m*m);v*=H,p*=H,g*=H,m*=H}}e[i]=v,e[i+1]=p,e[i+2]=g,e[i+3]=m}static multiplyQuaternionsFlat(e,i,r,l,f,h){const d=r[l],v=r[l+1],p=r[l+2],g=r[l+3],m=f[h],y=f[h+1],x=f[h+2],T=f[h+3];return e[i]=d*T+g*m+v*x-p*y,e[i+1]=v*T+g*y+p*m-d*x,e[i+2]=p*T+g*x+d*y-v*m,e[i+3]=g*T-d*m-v*y-p*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,l){return this._x=e,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const r=e._x,l=e._y,f=e._z,h=e._order,d=Math.cos,v=Math.sin,p=d(r/2),g=d(l/2),m=d(f/2),y=v(r/2),x=v(l/2),T=v(f/2);switch(h){case"XYZ":this._x=y*g*m+p*x*T,this._y=p*x*m-y*g*T,this._z=p*g*T+y*x*m,this._w=p*g*m-y*x*T;break;case"YXZ":this._x=y*g*m+p*x*T,this._y=p*x*m-y*g*T,this._z=p*g*T-y*x*m,this._w=p*g*m+y*x*T;break;case"ZXY":this._x=y*g*m-p*x*T,this._y=p*x*m+y*g*T,this._z=p*g*T+y*x*m,this._w=p*g*m-y*x*T;break;case"ZYX":this._x=y*g*m-p*x*T,this._y=p*x*m+y*g*T,this._z=p*g*T-y*x*m,this._w=p*g*m+y*x*T;break;case"YZX":this._x=y*g*m+p*x*T,this._y=p*x*m+y*g*T,this._z=p*g*T-y*x*m,this._w=p*g*m-y*x*T;break;case"XZY":this._x=y*g*m-p*x*T,this._y=p*x*m-y*g*T,this._z=p*g*T+y*x*m,this._w=p*g*m+y*x*T;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const r=i/2,l=Math.sin(r);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,r=i[0],l=i[4],f=i[8],h=i[1],d=i[5],v=i[9],p=i[2],g=i[6],m=i[10],y=r+d+m;if(y>0){const x=.5/Math.sqrt(y+1);this._w=.25/x,this._x=(g-v)*x,this._y=(f-p)*x,this._z=(h-l)*x}else if(r>d&&r>m){const x=2*Math.sqrt(1+r-d-m);this._w=(g-v)/x,this._x=.25*x,this._y=(l+h)/x,this._z=(f+p)/x}else if(d>m){const x=2*Math.sqrt(1+d-r-m);this._w=(f-p)/x,this._x=(l+h)/x,this._y=.25*x,this._z=(v+g)/x}else{const x=2*Math.sqrt(1+m-r-d);this._w=(h-l)/x,this._x=(f+p)/x,this._y=(v+g)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Se(this.dot(e),-1,1)))}rotateTowards(e,i){const r=this.angleTo(e);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const r=e._x,l=e._y,f=e._z,h=e._w,d=i._x,v=i._y,p=i._z,g=i._w;return this._x=r*g+h*d+l*p-f*v,this._y=l*g+h*v+f*d-r*p,this._z=f*g+h*p+r*v-l*d,this._w=h*g-r*d-l*v-f*p,this._onChangeCallback(),this}slerp(e,i){if(i===0)return this;if(i===1)return this.copy(e);const r=this._x,l=this._y,f=this._z,h=this._w;let d=h*e._w+r*e._x+l*e._y+f*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=h,this._x=r,this._y=l,this._z=f,this;const v=1-d*d;if(v<=Number.EPSILON){const x=1-i;return this._w=x*h+i*this._w,this._x=x*r+i*this._x,this._y=x*l+i*this._y,this._z=x*f+i*this._z,this.normalize(),this}const p=Math.sqrt(v),g=Math.atan2(p,d),m=Math.sin((1-i)*g)/p,y=Math.sin(i*g)/p;return this._w=h*m+this._w*y,this._x=r*m+this._x*y,this._y=l*m+this._y*y,this._z=f*m+this._z*y,this._onChangeCallback(),this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),f=Math.sqrt(r);return this.set(l*Math.sin(e),l*Math.cos(e),f*Math.sin(i),f*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(e=0,i=0,r=0){Q.prototype.isVector3=!0,this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(bv.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(bv.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,r=this.y,l=this.z,f=e.elements;return this.x=f[0]*i+f[3]*r+f[6]*l,this.y=f[1]*i+f[4]*r+f[7]*l,this.z=f[2]*i+f[5]*r+f[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,f=e.elements,h=1/(f[3]*i+f[7]*r+f[11]*l+f[15]);return this.x=(f[0]*i+f[4]*r+f[8]*l+f[12])*h,this.y=(f[1]*i+f[5]*r+f[9]*l+f[13])*h,this.z=(f[2]*i+f[6]*r+f[10]*l+f[14])*h,this}applyQuaternion(e){const i=this.x,r=this.y,l=this.z,f=e.x,h=e.y,d=e.z,v=e.w,p=2*(h*l-d*r),g=2*(d*i-f*l),m=2*(f*r-h*i);return this.x=i+v*p+h*m-d*g,this.y=r+v*g+d*p-f*m,this.z=l+v*m+f*g-h*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,r=this.y,l=this.z,f=e.elements;return this.x=f[0]*i+f[4]*r+f[8]*l,this.y=f[1]*i+f[5]*r+f[9]*l,this.z=f[2]*i+f[6]*r+f[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Se(this.x,e.x,i.x),this.y=Se(this.y,e.y,i.y),this.z=Se(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Se(this.x,e,i),this.y=Se(this.y,e,i),this.z=Se(this.z,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const r=e.x,l=e.y,f=e.z,h=i.x,d=i.y,v=i.z;return this.x=l*v-f*d,this.y=f*h-r*v,this.z=r*d-l*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return gd.copy(this).projectOnVector(e),this.sub(gd)}reflect(e){return this.sub(gd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(Se(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y,l=this.z-e.z;return i*i+r*r+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){const l=Math.sin(i)*e;return this.x=l*Math.sin(r),this.y=Math.cos(i)*e,this.z=l*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gd=new Q,bv=new Ks;class me{constructor(e,i,r,l,f,h,d,v,p){me.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,l,f,h,d,v,p)}set(e,i,r,l,f,h,d,v,p){const g=this.elements;return g[0]=e,g[1]=l,g[2]=d,g[3]=i,g[4]=f,g[5]=v,g[6]=r,g[7]=h,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,f=this.elements,h=r[0],d=r[3],v=r[6],p=r[1],g=r[4],m=r[7],y=r[2],x=r[5],T=r[8],A=l[0],M=l[3],S=l[6],I=l[1],O=l[4],D=l[7],H=l[2],U=l[5],N=l[8];return f[0]=h*A+d*I+v*H,f[3]=h*M+d*O+v*U,f[6]=h*S+d*D+v*N,f[1]=p*A+g*I+m*H,f[4]=p*M+g*O+m*U,f[7]=p*S+g*D+m*N,f[2]=y*A+x*I+T*H,f[5]=y*M+x*O+T*U,f[8]=y*S+x*D+T*N,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[1],l=e[2],f=e[3],h=e[4],d=e[5],v=e[6],p=e[7],g=e[8];return i*h*g-i*d*p-r*f*g+r*d*v+l*f*p-l*h*v}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],f=e[3],h=e[4],d=e[5],v=e[6],p=e[7],g=e[8],m=g*h-d*p,y=d*v-g*f,x=p*f-h*v,T=i*m+r*y+l*x;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=m*A,e[1]=(l*p-g*r)*A,e[2]=(d*r-l*h)*A,e[3]=y*A,e[4]=(g*i-l*v)*A,e[5]=(l*f-d*i)*A,e[6]=x*A,e[7]=(r*v-p*i)*A,e[8]=(h*i-r*f)*A,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,l,f,h,d){const v=Math.cos(f),p=Math.sin(f);return this.set(r*v,r*p,-r*(v*h+p*d)+h+e,-l*p,l*v,-l*(-p*h+v*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(_d.makeScale(e,i)),this}rotate(e){return this.premultiply(_d.makeRotation(-e)),this}translate(e,i){return this.premultiply(_d.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _d=new me;function Vy(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function wc(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function $E(){const o=wc("canvas");return o.style.display="block",o}const Av={};function El(o){o in Av||(Av[o]=!0,console.warn(o))}function tT(o,e,i){return new Promise(function(r,l){function f(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(f,i);break;default:r()}}setTimeout(f,i)})}const Rv=new me().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cv=new me().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function eT(){const o={enabled:!0,workingColorSpace:fo,spaces:{},convert:function(l,f,h){return this.enabled===!1||f===h||!f||!h||(this.spaces[f].transfer===Xe&&(l.r=Ra(l.r),l.g=Ra(l.g),l.b=Ra(l.b)),this.spaces[f].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[f].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Xe&&(l.r=oo(l.r),l.g=oo(l.g),l.b=oo(l.b))),l},workingToColorSpace:function(l,f){return this.convert(l,this.workingColorSpace,f)},colorSpaceToWorking:function(l,f){return this.convert(l,f,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===us?Rc:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,f=this.workingColorSpace){return l.fromArray(this.spaces[f].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,f,h){return l.copy(this.spaces[f].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,f){return El("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(l,f)},toWorkingColorSpace:function(l,f){return El("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(l,f)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return o.define({[fo]:{primaries:e,whitePoint:r,transfer:Rc,toXYZ:Rv,fromXYZ:Cv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:fi},outputColorSpaceConfig:{drawingBufferColorSpace:fi}},[fi]:{primaries:e,whitePoint:r,transfer:Xe,toXYZ:Rv,fromXYZ:Cv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:fi}}}),o}const Ne=eT();function Ra(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function oo(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Vr;class nT{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Vr===void 0&&(Vr=wc("canvas")),Vr.width=e.width,Vr.height=e.height;const l=Vr.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),r=Vr}return r.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=wc("canvas");i.width=e.width,i.height=e.height;const r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const l=r.getImageData(0,0,e.width,e.height),f=l.data;for(let h=0;h<f.length;h++)f[h]=Ra(f[h]/255)*255;return r.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(Ra(i[r]/255)*255):i[r]=Ra(i[r]);return{data:i,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let iT=0;class Wp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:iT++}),this.uuid=po(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):i instanceof VideoFrame?e.set(i.displayHeight,i.displayWidth,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let f;if(Array.isArray(l)){f=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?f.push(vd(l[h].image)):f.push(vd(l[h]))}else f=vd(l);r.url=f}return i||(e.images[this.uuid]=r),r}}function vd(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?nT.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let aT=0;const yd=new Q;class $n extends $s{constructor(e=$n.DEFAULT_IMAGE,i=$n.DEFAULT_MAPPING,r=Ws,l=Ws,f=Ji,h=js,d=zi,v=ta,p=$n.DEFAULT_ANISOTROPY,g=us){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:aT++}),this.uuid=po(),this.name="",this.source=new Wp(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=f,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=v,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new me,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(yd).x}get height(){return this.source.getSize(yd).y}get depth(){return this.source.getSize(yd).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const r=e[i];if(r===void 0){console.warn(`THREE.Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Texture.setValues(): property '${i}' does not exist.`);continue}l&&r&&l.isVector2&&r.isVector2||l&&r&&l.isVector3&&r.isVector3||l&&r&&l.isMatrix3&&r.isMatrix3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Uy)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case sp:e.x=e.x-Math.floor(e.x);break;case Ws:e.x=e.x<0?0:1;break;case rp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case sp:e.y=e.y-Math.floor(e.y);break;case Ws:e.y=e.y<0?0:1;break;case rp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}$n.DEFAULT_IMAGE=null;$n.DEFAULT_MAPPING=Uy;$n.DEFAULT_ANISOTROPY=1;class rn{constructor(e=0,i=0,r=0,l=1){rn.prototype.isVector4=!0,this.x=e,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,l){return this.x=e,this.y=i,this.z=r,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,f=this.w,h=e.elements;return this.x=h[0]*i+h[4]*r+h[8]*l+h[12]*f,this.y=h[1]*i+h[5]*r+h[9]*l+h[13]*f,this.z=h[2]*i+h[6]*r+h[10]*l+h[14]*f,this.w=h[3]*i+h[7]*r+h[11]*l+h[15]*f,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,l,f;const v=e.elements,p=v[0],g=v[4],m=v[8],y=v[1],x=v[5],T=v[9],A=v[2],M=v[6],S=v[10];if(Math.abs(g-y)<.01&&Math.abs(m-A)<.01&&Math.abs(T-M)<.01){if(Math.abs(g+y)<.1&&Math.abs(m+A)<.1&&Math.abs(T+M)<.1&&Math.abs(p+x+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const O=(p+1)/2,D=(x+1)/2,H=(S+1)/2,U=(g+y)/4,N=(m+A)/4,G=(T+M)/4;return O>D&&O>H?O<.01?(r=0,l=.707106781,f=.707106781):(r=Math.sqrt(O),l=U/r,f=N/r):D>H?D<.01?(r=.707106781,l=0,f=.707106781):(l=Math.sqrt(D),r=U/l,f=G/l):H<.01?(r=.707106781,l=.707106781,f=0):(f=Math.sqrt(H),r=N/f,l=G/f),this.set(r,l,f,i),this}let I=Math.sqrt((M-T)*(M-T)+(m-A)*(m-A)+(y-g)*(y-g));return Math.abs(I)<.001&&(I=1),this.x=(M-T)/I,this.y=(m-A)/I,this.z=(y-g)/I,this.w=Math.acos((p+x+S-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Se(this.x,e.x,i.x),this.y=Se(this.y,e.y,i.y),this.z=Se(this.z,e.z,i.z),this.w=Se(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Se(this.x,e,i),this.y=Se(this.y,e,i),this.z=Se(this.z,e,i),this.w=Se(this.w,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sT extends $s{constructor(e=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ji,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=r.depth,this.scissor=new rn(0,0,e,i),this.scissorTest=!1,this.viewport=new rn(0,0,e,i);const l={width:e,height:i,depth:r.depth},f=new $n(l);this.textures=[];const h=r.count;for(let d=0;d<h;d++)this.textures[d]=f.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(e={}){const i={minFilter:Ji,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let l=0,f=this.textures.length;l<f;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=r,this.textures[l].isArrayTexture=this.textures[l].image.depth>1;this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new Wp(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qs extends sT{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}}class Xy extends $n{constructor(e=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Ws,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class rT extends $n{constructor(e=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Ws,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Js{constructor(e=new Q(1/0,1/0,1/0),i=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(Li.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(Li.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const r=Li.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const f=r.getAttribute("position");if(i===!0&&f!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=f.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,Li):Li.fromBufferAttribute(f,h),Li.applyMatrix4(e.matrixWorld),this.expandByPoint(Li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ku.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Ku.copy(r.boundingBox)),Ku.applyMatrix4(e.matrixWorld),this.union(Ku)}const l=e.children;for(let f=0,h=l.length;f<h;f++)this.expandByObject(l[f],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Li),Li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ul),Qu.subVectors(this.max,ul),Xr.subVectors(e.a,ul),kr.subVectors(e.b,ul),Yr.subVectors(e.c,ul),ns.subVectors(kr,Xr),is.subVectors(Yr,kr),Bs.subVectors(Xr,Yr);let i=[0,-ns.z,ns.y,0,-is.z,is.y,0,-Bs.z,Bs.y,ns.z,0,-ns.x,is.z,0,-is.x,Bs.z,0,-Bs.x,-ns.y,ns.x,0,-is.y,is.x,0,-Bs.y,Bs.x,0];return!Sd(i,Xr,kr,Yr,Qu)||(i=[1,0,0,0,1,0,0,0,1],!Sd(i,Xr,kr,Yr,Qu))?!1:(Ju.crossVectors(ns,is),i=[Ju.x,Ju.y,Ju.z],Sd(i,Xr,kr,Yr,Qu))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_a[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_a),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _a=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],Li=new Q,Ku=new Js,Xr=new Q,kr=new Q,Yr=new Q,ns=new Q,is=new Q,Bs=new Q,ul=new Q,Qu=new Q,Ju=new Q,Fs=new Q;function Sd(o,e,i,r,l){for(let f=0,h=o.length-3;f<=h;f+=3){Fs.fromArray(o,f);const d=l.x*Math.abs(Fs.x)+l.y*Math.abs(Fs.y)+l.z*Math.abs(Fs.z),v=e.dot(Fs),p=i.dot(Fs),g=r.dot(Fs);if(Math.max(-Math.max(v,p,g),Math.min(v,p,g))>d)return!1}return!0}const oT=new Js,cl=new Q,xd=new Q;class Lc{constructor(e=new Q,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const r=this.center;i!==void 0?r.copy(i):oT.setFromPoints(e).getCenter(r);let l=0;for(let f=0,h=e.length;f<h;f++)l=Math.max(l,r.distanceToSquared(e[f]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;cl.subVectors(e,this.center);const i=cl.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(cl,l/r),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(cl.copy(e.center).add(xd)),this.expandByPoint(cl.copy(e.center).sub(xd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const va=new Q,Md=new Q,$u=new Q,as=new Q,Ed=new Q,tc=new Q,Td=new Q;class Oc{constructor(e=new Q,i=new Q(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,va)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=va.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(va.copy(this.origin).addScaledVector(this.direction,i),va.distanceToSquared(e))}distanceSqToSegment(e,i,r,l){Md.copy(e).add(i).multiplyScalar(.5),$u.copy(i).sub(e).normalize(),as.copy(this.origin).sub(Md);const f=e.distanceTo(i)*.5,h=-this.direction.dot($u),d=as.dot(this.direction),v=-as.dot($u),p=as.lengthSq(),g=Math.abs(1-h*h);let m,y,x,T;if(g>0)if(m=h*v-d,y=h*d-v,T=f*g,m>=0)if(y>=-T)if(y<=T){const A=1/g;m*=A,y*=A,x=m*(m+h*y+2*d)+y*(h*m+y+2*v)+p}else y=f,m=Math.max(0,-(h*y+d)),x=-m*m+y*(y+2*v)+p;else y=-f,m=Math.max(0,-(h*y+d)),x=-m*m+y*(y+2*v)+p;else y<=-T?(m=Math.max(0,-(-h*f+d)),y=m>0?-f:Math.min(Math.max(-f,-v),f),x=-m*m+y*(y+2*v)+p):y<=T?(m=0,y=Math.min(Math.max(-f,-v),f),x=y*(y+2*v)+p):(m=Math.max(0,-(h*f+d)),y=m>0?f:Math.min(Math.max(-f,-v),f),x=-m*m+y*(y+2*v)+p);else y=h>0?-f:f,m=Math.max(0,-(h*y+d)),x=-m*m+y*(y+2*v)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,m),l&&l.copy(Md).addScaledVector($u,y),x}intersectSphere(e,i){va.subVectors(e.center,this.origin);const r=va.dot(this.direction),l=va.dot(va)-r*r,f=e.radius*e.radius;if(l>f)return null;const h=Math.sqrt(f-l),d=r-h,v=r+h;return v<0?null:d<0?this.at(v,i):this.at(d,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/i;return r>=0?r:null}intersectPlane(e,i){const r=this.distanceToPlane(e);return r===null?null:this.at(r,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let r,l,f,h,d,v;const p=1/this.direction.x,g=1/this.direction.y,m=1/this.direction.z,y=this.origin;return p>=0?(r=(e.min.x-y.x)*p,l=(e.max.x-y.x)*p):(r=(e.max.x-y.x)*p,l=(e.min.x-y.x)*p),g>=0?(f=(e.min.y-y.y)*g,h=(e.max.y-y.y)*g):(f=(e.max.y-y.y)*g,h=(e.min.y-y.y)*g),r>h||f>l||((f>r||isNaN(r))&&(r=f),(h<l||isNaN(l))&&(l=h),m>=0?(d=(e.min.z-y.z)*m,v=(e.max.z-y.z)*m):(d=(e.max.z-y.z)*m,v=(e.min.z-y.z)*m),r>v||d>l)||((d>r||r!==r)&&(r=d),(v<l||l!==l)&&(l=v),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(e){return this.intersectBox(e,va)!==null}intersectTriangle(e,i,r,l,f){Ed.subVectors(i,e),tc.subVectors(r,e),Td.crossVectors(Ed,tc);let h=this.direction.dot(Td),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;as.subVectors(this.origin,e);const v=d*this.direction.dot(tc.crossVectors(as,tc));if(v<0)return null;const p=d*this.direction.dot(Ed.cross(as));if(p<0||v+p>h)return null;const g=-d*as.dot(Td);return g<0?null:this.at(g/h,f)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $e{constructor(e,i,r,l,f,h,d,v,p,g,m,y,x,T,A,M){$e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,l,f,h,d,v,p,g,m,y,x,T,A,M)}set(e,i,r,l,f,h,d,v,p,g,m,y,x,T,A,M){const S=this.elements;return S[0]=e,S[4]=i,S[8]=r,S[12]=l,S[1]=f,S[5]=h,S[9]=d,S[13]=v,S[2]=p,S[6]=g,S[10]=m,S[14]=y,S[3]=x,S[7]=T,S[11]=A,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $e().fromArray(this.elements)}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){const i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,r=e.elements,l=1/qr.setFromMatrixColumn(e,0).length(),f=1/qr.setFromMatrixColumn(e,1).length(),h=1/qr.setFromMatrixColumn(e,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*f,i[5]=r[5]*f,i[6]=r[6]*f,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,r=e.x,l=e.y,f=e.z,h=Math.cos(r),d=Math.sin(r),v=Math.cos(l),p=Math.sin(l),g=Math.cos(f),m=Math.sin(f);if(e.order==="XYZ"){const y=h*g,x=h*m,T=d*g,A=d*m;i[0]=v*g,i[4]=-v*m,i[8]=p,i[1]=x+T*p,i[5]=y-A*p,i[9]=-d*v,i[2]=A-y*p,i[6]=T+x*p,i[10]=h*v}else if(e.order==="YXZ"){const y=v*g,x=v*m,T=p*g,A=p*m;i[0]=y+A*d,i[4]=T*d-x,i[8]=h*p,i[1]=h*m,i[5]=h*g,i[9]=-d,i[2]=x*d-T,i[6]=A+y*d,i[10]=h*v}else if(e.order==="ZXY"){const y=v*g,x=v*m,T=p*g,A=p*m;i[0]=y-A*d,i[4]=-h*m,i[8]=T+x*d,i[1]=x+T*d,i[5]=h*g,i[9]=A-y*d,i[2]=-h*p,i[6]=d,i[10]=h*v}else if(e.order==="ZYX"){const y=h*g,x=h*m,T=d*g,A=d*m;i[0]=v*g,i[4]=T*p-x,i[8]=y*p+A,i[1]=v*m,i[5]=A*p+y,i[9]=x*p-T,i[2]=-p,i[6]=d*v,i[10]=h*v}else if(e.order==="YZX"){const y=h*v,x=h*p,T=d*v,A=d*p;i[0]=v*g,i[4]=A-y*m,i[8]=T*m+x,i[1]=m,i[5]=h*g,i[9]=-d*g,i[2]=-p*g,i[6]=x*m+T,i[10]=y-A*m}else if(e.order==="XZY"){const y=h*v,x=h*p,T=d*v,A=d*p;i[0]=v*g,i[4]=-m,i[8]=p*g,i[1]=y*m+A,i[5]=h*g,i[9]=x*m-T,i[2]=T*m-x,i[6]=d*g,i[10]=A*m+y}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lT,e,uT)}lookAt(e,i,r){const l=this.elements;return ui.subVectors(e,i),ui.lengthSq()===0&&(ui.z=1),ui.normalize(),ss.crossVectors(r,ui),ss.lengthSq()===0&&(Math.abs(r.z)===1?ui.x+=1e-4:ui.z+=1e-4,ui.normalize(),ss.crossVectors(r,ui)),ss.normalize(),ec.crossVectors(ui,ss),l[0]=ss.x,l[4]=ec.x,l[8]=ui.x,l[1]=ss.y,l[5]=ec.y,l[9]=ui.y,l[2]=ss.z,l[6]=ec.z,l[10]=ui.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,f=this.elements,h=r[0],d=r[4],v=r[8],p=r[12],g=r[1],m=r[5],y=r[9],x=r[13],T=r[2],A=r[6],M=r[10],S=r[14],I=r[3],O=r[7],D=r[11],H=r[15],U=l[0],N=l[4],G=l[8],C=l[12],w=l[1],B=l[5],j=l[9],it=l[13],ot=l[2],ct=l[6],V=l[10],lt=l[14],q=l[3],_t=l[7],St=l[11],Ht=l[15];return f[0]=h*U+d*w+v*ot+p*q,f[4]=h*N+d*B+v*ct+p*_t,f[8]=h*G+d*j+v*V+p*St,f[12]=h*C+d*it+v*lt+p*Ht,f[1]=g*U+m*w+y*ot+x*q,f[5]=g*N+m*B+y*ct+x*_t,f[9]=g*G+m*j+y*V+x*St,f[13]=g*C+m*it+y*lt+x*Ht,f[2]=T*U+A*w+M*ot+S*q,f[6]=T*N+A*B+M*ct+S*_t,f[10]=T*G+A*j+M*V+S*St,f[14]=T*C+A*it+M*lt+S*Ht,f[3]=I*U+O*w+D*ot+H*q,f[7]=I*N+O*B+D*ct+H*_t,f[11]=I*G+O*j+D*V+H*St,f[15]=I*C+O*it+D*lt+H*Ht,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[4],l=e[8],f=e[12],h=e[1],d=e[5],v=e[9],p=e[13],g=e[2],m=e[6],y=e[10],x=e[14],T=e[3],A=e[7],M=e[11],S=e[15];return T*(+f*v*m-l*p*m-f*d*y+r*p*y+l*d*x-r*v*x)+A*(+i*v*x-i*p*y+f*h*y-l*h*x+l*p*g-f*v*g)+M*(+i*p*m-i*d*x-f*h*m+r*h*x+f*d*g-r*p*g)+S*(-l*d*g-i*v*m+i*d*y+l*h*m-r*h*y+r*v*g)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=r),this}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],f=e[3],h=e[4],d=e[5],v=e[6],p=e[7],g=e[8],m=e[9],y=e[10],x=e[11],T=e[12],A=e[13],M=e[14],S=e[15],I=m*M*p-A*y*p+A*v*x-d*M*x-m*v*S+d*y*S,O=T*y*p-g*M*p-T*v*x+h*M*x+g*v*S-h*y*S,D=g*A*p-T*m*p+T*d*x-h*A*x-g*d*S+h*m*S,H=T*m*v-g*A*v-T*d*y+h*A*y+g*d*M-h*m*M,U=i*I+r*O+l*D+f*H;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/U;return e[0]=I*N,e[1]=(A*y*f-m*M*f-A*l*x+r*M*x+m*l*S-r*y*S)*N,e[2]=(d*M*f-A*v*f+A*l*p-r*M*p-d*l*S+r*v*S)*N,e[3]=(m*v*f-d*y*f-m*l*p+r*y*p+d*l*x-r*v*x)*N,e[4]=O*N,e[5]=(g*M*f-T*y*f+T*l*x-i*M*x-g*l*S+i*y*S)*N,e[6]=(T*v*f-h*M*f-T*l*p+i*M*p+h*l*S-i*v*S)*N,e[7]=(h*y*f-g*v*f+g*l*p-i*y*p-h*l*x+i*v*x)*N,e[8]=D*N,e[9]=(T*m*f-g*A*f-T*r*x+i*A*x+g*r*S-i*m*S)*N,e[10]=(h*A*f-T*d*f+T*r*p-i*A*p-h*r*S+i*d*S)*N,e[11]=(g*d*f-h*m*f-g*r*p+i*m*p+h*r*x-i*d*x)*N,e[12]=H*N,e[13]=(g*A*l-T*m*l+T*r*y-i*A*y-g*r*M+i*m*M)*N,e[14]=(T*d*l-h*A*l-T*r*v+i*A*v+h*r*M-i*d*M)*N,e[15]=(h*m*l-g*d*l+g*r*v-i*m*v-h*r*y+i*d*y)*N,this}scale(e){const i=this.elements,r=e.x,l=e.y,f=e.z;return i[0]*=r,i[4]*=l,i[8]*=f,i[1]*=r,i[5]*=l,i[9]*=f,i[2]*=r,i[6]*=l,i[10]*=f,i[3]*=r,i[7]*=l,i[11]*=f,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const r=Math.cos(i),l=Math.sin(i),f=1-r,h=e.x,d=e.y,v=e.z,p=f*h,g=f*d;return this.set(p*h+r,p*d-l*v,p*v+l*d,0,p*d+l*v,g*d+r,g*v-l*h,0,p*v-l*d,g*v+l*h,f*v*v+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,l,f,h){return this.set(1,r,f,0,e,1,h,0,i,l,1,0,0,0,0,1),this}compose(e,i,r){const l=this.elements,f=i._x,h=i._y,d=i._z,v=i._w,p=f+f,g=h+h,m=d+d,y=f*p,x=f*g,T=f*m,A=h*g,M=h*m,S=d*m,I=v*p,O=v*g,D=v*m,H=r.x,U=r.y,N=r.z;return l[0]=(1-(A+S))*H,l[1]=(x+D)*H,l[2]=(T-O)*H,l[3]=0,l[4]=(x-D)*U,l[5]=(1-(y+S))*U,l[6]=(M+I)*U,l[7]=0,l[8]=(T+O)*N,l[9]=(M-I)*N,l[10]=(1-(y+A))*N,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,r){const l=this.elements;let f=qr.set(l[0],l[1],l[2]).length();const h=qr.set(l[4],l[5],l[6]).length(),d=qr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(f=-f),e.x=l[12],e.y=l[13],e.z=l[14],Oi.copy(this);const p=1/f,g=1/h,m=1/d;return Oi.elements[0]*=p,Oi.elements[1]*=p,Oi.elements[2]*=p,Oi.elements[4]*=g,Oi.elements[5]*=g,Oi.elements[6]*=g,Oi.elements[8]*=m,Oi.elements[9]*=m,Oi.elements[10]*=m,i.setFromRotationMatrix(Oi),r.x=f,r.y=h,r.z=d,this}makePerspective(e,i,r,l,f,h,d=$i,v=!1){const p=this.elements,g=2*f/(i-e),m=2*f/(r-l),y=(i+e)/(i-e),x=(r+l)/(r-l);let T,A;if(v)T=f/(h-f),A=h*f/(h-f);else if(d===$i)T=-(h+f)/(h-f),A=-2*h*f/(h-f);else if(d===Cc)T=-h/(h-f),A=-h*f/(h-f);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=y,p[12]=0,p[1]=0,p[5]=m,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=T,p[14]=A,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,r,l,f,h,d=$i,v=!1){const p=this.elements,g=2/(i-e),m=2/(r-l),y=-(i+e)/(i-e),x=-(r+l)/(r-l);let T,A;if(v)T=1/(h-f),A=h/(h-f);else if(d===$i)T=-2/(h-f),A=-(h+f)/(h-f);else if(d===Cc)T=-1/(h-f),A=-f/(h-f);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=0,p[12]=y,p[1]=0,p[5]=m,p[9]=0,p[13]=x,p[2]=0,p[6]=0,p[10]=T,p[14]=A,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}}const qr=new Q,Oi=new $e,lT=new Q(0,0,0),uT=new Q(1,1,1),ss=new Q,ec=new Q,ui=new Q,wv=new $e,Dv=new Ks;class Bi{constructor(e=0,i=0,r=0,l=Bi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,l=this._order){return this._x=e,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){const l=e.elements,f=l[0],h=l[4],d=l[8],v=l[1],p=l[5],g=l[9],m=l[2],y=l[6],x=l[10];switch(i){case"XYZ":this._y=Math.asin(Se(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,x),this._z=Math.atan2(-h,f)):(this._x=Math.atan2(y,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,x),this._z=Math.atan2(v,p)):(this._y=Math.atan2(-m,f),this._z=0);break;case"ZXY":this._x=Math.asin(Se(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-m,x),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(v,f));break;case"ZYX":this._y=Math.asin(-Se(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(y,x),this._z=Math.atan2(v,f)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(Se(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-m,f)):(this._x=0,this._y=Math.atan2(d,x));break;case"XZY":this._z=Math.asin(-Se(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(y,p),this._y=Math.atan2(d,f)):(this._x=Math.atan2(-g,x),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return wv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wv,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return Dv.setFromEuler(this),this.setFromQuaternion(Dv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bi.DEFAULT_ORDER="XYZ";class jp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let cT=0;const Uv=new Q,Wr=new Ks,ya=new $e,nc=new Q,fl=new Q,fT=new Q,hT=new Ks,Nv=new Q(1,0,0),Lv=new Q(0,1,0),Ov=new Q(0,0,1),Pv={type:"added"},dT={type:"removed"},jr={type:"childadded",child:null},bd={type:"childremoved",child:null};class bn extends $s{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cT++}),this.uuid=po(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bn.DEFAULT_UP.clone();const e=new Q,i=new Bi,r=new Ks,l=new Q(1,1,1);function f(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(f),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new $e},normalMatrix:{value:new me}}),this.matrix=new $e,this.matrixWorld=new $e,this.matrixAutoUpdate=bn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Wr.setFromAxisAngle(e,i),this.quaternion.multiply(Wr),this}rotateOnWorldAxis(e,i){return Wr.setFromAxisAngle(e,i),this.quaternion.premultiply(Wr),this}rotateX(e){return this.rotateOnAxis(Nv,e)}rotateY(e){return this.rotateOnAxis(Lv,e)}rotateZ(e){return this.rotateOnAxis(Ov,e)}translateOnAxis(e,i){return Uv.copy(e).applyQuaternion(this.quaternion),this.position.add(Uv.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(Nv,e)}translateY(e){return this.translateOnAxis(Lv,e)}translateZ(e){return this.translateOnAxis(Ov,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ya.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?nc.copy(e):nc.set(e,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),fl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ya.lookAt(fl,nc,this.up):ya.lookAt(nc,fl,this.up),this.quaternion.setFromRotationMatrix(ya),l&&(ya.extractRotation(l.matrixWorld),Wr.setFromRotationMatrix(ya),this.quaternion.premultiply(Wr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Pv),jr.child=e,this.dispatchEvent(jr),jr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(dT),bd.child=e,this.dispatchEvent(bd),bd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ya.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ya.multiply(e.parent.matrixWorld)),e.applyMatrix4(ya),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Pv),jr.child=e,this.dispatchEvent(jr),jr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const h=this.children[r].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);const l=this.children;for(let f=0,h=l.length;f<h;f++)l[f].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fl,e,fT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fl,hT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let f=0,h=l.length;f<h;f++)l[f].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function f(d,v){return d[v.uuid]===void 0&&(d[v.uuid]=v.toJSON(e)),v.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=f(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const v=d.shapes;if(Array.isArray(v))for(let p=0,g=v.length;p<g;p++){const m=v[p];f(e.shapes,m)}else f(e.shapes,v)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(f(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let v=0,p=this.material.length;v<p;v++)d.push(f(e.materials,this.material[v]));l.material=d}else l.material=f(e.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const v=this.animations[d];l.animations.push(f(e.animations,v))}}if(i){const d=h(e.geometries),v=h(e.materials),p=h(e.textures),g=h(e.images),m=h(e.shapes),y=h(e.skeletons),x=h(e.animations),T=h(e.nodes);d.length>0&&(r.geometries=d),v.length>0&&(r.materials=v),p.length>0&&(r.textures=p),g.length>0&&(r.images=g),m.length>0&&(r.shapes=m),y.length>0&&(r.skeletons=y),x.length>0&&(r.animations=x),T.length>0&&(r.nodes=T)}return r.object=l,r;function h(d){const v=[];for(const p in d){const g=d[p];delete g.metadata,v.push(g)}return v}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){const l=e.children[r];this.add(l.clone())}return this}}bn.DEFAULT_UP=new Q(0,1,0);bn.DEFAULT_MATRIX_AUTO_UPDATE=!0;bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pi=new Q,Sa=new Q,Ad=new Q,xa=new Q,Zr=new Q,Kr=new Q,zv=new Q,Rd=new Q,Cd=new Q,wd=new Q,Dd=new rn,Ud=new rn,Nd=new rn;class bi{constructor(e=new Q,i=new Q,r=new Q){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,l){l.subVectors(r,i),Pi.subVectors(e,i),l.cross(Pi);const f=l.lengthSq();return f>0?l.multiplyScalar(1/Math.sqrt(f)):l.set(0,0,0)}static getBarycoord(e,i,r,l,f){Pi.subVectors(l,i),Sa.subVectors(r,i),Ad.subVectors(e,i);const h=Pi.dot(Pi),d=Pi.dot(Sa),v=Pi.dot(Ad),p=Sa.dot(Sa),g=Sa.dot(Ad),m=h*p-d*d;if(m===0)return f.set(0,0,0),null;const y=1/m,x=(p*v-d*g)*y,T=(h*g-d*v)*y;return f.set(1-x-T,T,x)}static containsPoint(e,i,r,l){return this.getBarycoord(e,i,r,l,xa)===null?!1:xa.x>=0&&xa.y>=0&&xa.x+xa.y<=1}static getInterpolation(e,i,r,l,f,h,d,v){return this.getBarycoord(e,i,r,l,xa)===null?(v.x=0,v.y=0,"z"in v&&(v.z=0),"w"in v&&(v.w=0),null):(v.setScalar(0),v.addScaledVector(f,xa.x),v.addScaledVector(h,xa.y),v.addScaledVector(d,xa.z),v)}static getInterpolatedAttribute(e,i,r,l,f,h){return Dd.setScalar(0),Ud.setScalar(0),Nd.setScalar(0),Dd.fromBufferAttribute(e,i),Ud.fromBufferAttribute(e,r),Nd.fromBufferAttribute(e,l),h.setScalar(0),h.addScaledVector(Dd,f.x),h.addScaledVector(Ud,f.y),h.addScaledVector(Nd,f.z),h}static isFrontFacing(e,i,r,l){return Pi.subVectors(r,i),Sa.subVectors(e,i),Pi.cross(Sa).dot(l)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,l){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,r,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pi.subVectors(this.c,this.b),Sa.subVectors(this.a,this.b),Pi.cross(Sa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return bi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,l,f){return bi.getInterpolation(e,this.a,this.b,this.c,i,r,l,f)}containsPoint(e){return bi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const r=this.a,l=this.b,f=this.c;let h,d;Zr.subVectors(l,r),Kr.subVectors(f,r),Rd.subVectors(e,r);const v=Zr.dot(Rd),p=Kr.dot(Rd);if(v<=0&&p<=0)return i.copy(r);Cd.subVectors(e,l);const g=Zr.dot(Cd),m=Kr.dot(Cd);if(g>=0&&m<=g)return i.copy(l);const y=v*m-g*p;if(y<=0&&v>=0&&g<=0)return h=v/(v-g),i.copy(r).addScaledVector(Zr,h);wd.subVectors(e,f);const x=Zr.dot(wd),T=Kr.dot(wd);if(T>=0&&x<=T)return i.copy(f);const A=x*p-v*T;if(A<=0&&p>=0&&T<=0)return d=p/(p-T),i.copy(r).addScaledVector(Kr,d);const M=g*T-x*m;if(M<=0&&m-g>=0&&x-T>=0)return zv.subVectors(f,l),d=(m-g)/(m-g+(x-T)),i.copy(l).addScaledVector(zv,d);const S=1/(M+A+y);return h=A*S,d=y*S,i.copy(r).addScaledVector(Zr,h).addScaledVector(Kr,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ky={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rs={h:0,s:0,l:0},ic={h:0,s:0,l:0};function Ld(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class Te{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=fi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ne.colorSpaceToWorking(this,i),this}setRGB(e,i,r,l=Ne.workingColorSpace){return this.r=e,this.g=i,this.b=r,Ne.colorSpaceToWorking(this,l),this}setHSL(e,i,r,l=Ne.workingColorSpace){if(e=qp(e,1),i=Se(i,0,1),r=Se(r,0,1),i===0)this.r=this.g=this.b=r;else{const f=r<=.5?r*(1+i):r+i-r*i,h=2*r-f;this.r=Ld(h,f,e+1/3),this.g=Ld(h,f,e),this.b=Ld(h,f,e-1/3)}return Ne.colorSpaceToWorking(this,l),this}setStyle(e,i=fi){function r(f){f!==void 0&&parseFloat(f)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let f;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(f=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setRGB(Math.min(255,parseInt(f[1],10))/255,Math.min(255,parseInt(f[2],10))/255,Math.min(255,parseInt(f[3],10))/255,i);if(f=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setRGB(Math.min(100,parseInt(f[1],10))/100,Math.min(100,parseInt(f[2],10))/100,Math.min(100,parseInt(f[3],10))/100,i);break;case"hsl":case"hsla":if(f=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setHSL(parseFloat(f[1])/360,parseFloat(f[2])/100,parseFloat(f[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const f=l[1],h=f.length;if(h===3)return this.setRGB(parseInt(f.charAt(0),16)/15,parseInt(f.charAt(1),16)/15,parseInt(f.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(f,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=fi){const r=ky[e.toLowerCase()];return r!==void 0?this.setHex(r,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ra(e.r),this.g=Ra(e.g),this.b=Ra(e.b),this}copyLinearToSRGB(e){return this.r=oo(e.r),this.g=oo(e.g),this.b=oo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=fi){return Ne.workingToColorSpace(zn.copy(this),e),Math.round(Se(zn.r*255,0,255))*65536+Math.round(Se(zn.g*255,0,255))*256+Math.round(Se(zn.b*255,0,255))}getHexString(e=fi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Ne.workingColorSpace){Ne.workingToColorSpace(zn.copy(this),i);const r=zn.r,l=zn.g,f=zn.b,h=Math.max(r,l,f),d=Math.min(r,l,f);let v,p;const g=(d+h)/2;if(d===h)v=0,p=0;else{const m=h-d;switch(p=g<=.5?m/(h+d):m/(2-h-d),h){case r:v=(l-f)/m+(l<f?6:0);break;case l:v=(f-r)/m+2;break;case f:v=(r-l)/m+4;break}v/=6}return e.h=v,e.s=p,e.l=g,e}getRGB(e,i=Ne.workingColorSpace){return Ne.workingToColorSpace(zn.copy(this),i),e.r=zn.r,e.g=zn.g,e.b=zn.b,e}getStyle(e=fi){Ne.workingToColorSpace(zn.copy(this),e);const i=zn.r,r=zn.g,l=zn.b;return e!==fi?`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(e,i,r){return this.getHSL(rs),this.setHSL(rs.h+e,rs.s+i,rs.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(rs),e.getHSL(ic);const r=gl(rs.h,ic.h,i),l=gl(rs.s,ic.s,i),f=gl(rs.l,ic.l,i);return this.setHSL(r,l,f),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,r=this.g,l=this.b,f=e.elements;return this.r=f[0]*i+f[3]*r+f[6]*l,this.g=f[1]*i+f[4]*r+f[7]*l,this.b=f[2]*i+f[5]*r+f[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zn=new Te;Te.NAMES=ky;let pT=0;class tr extends $s{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pT++}),this.uuid=po(),this.name="",this.type="Material",this.blending=so,this.side=hs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jd,this.blendDst=Zd,this.blendEquation=Ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Te(0,0,0),this.blendAlpha=0,this.depthFunc=lo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gr,this.stencilZFail=Gr,this.stencilZPass=Gr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const r=e[i];if(r===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==so&&(r.blending=this.blending),this.side!==hs&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==jd&&(r.blendSrc=this.blendSrc),this.blendDst!==Zd&&(r.blendDst=this.blendDst),this.blendEquation!==Ys&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==lo&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xv&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gr&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Gr&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Gr&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(f){const h=[];for(const d in f){const v=f[d];delete v.metadata,h.push(v)}return h}if(i){const f=l(e.textures),h=l(e.images);f.length>0&&(r.textures=f),h.length>0&&(r.images=h)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let f=0;f!==l;++f)r[f]=i[f].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Yy extends tr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bi,this.combine=Dy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pn=new Q,ac=new fe;let mT=0;class hi{constructor(e,i,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mT++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=r,this.usage=Mv,this.updateRanges=[],this.gpuType=Aa,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let l=0,f=this.itemSize;l<f;l++)this.array[e+l]=i.array[r+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)ac.fromBufferAttribute(this,i),ac.applyMatrix3(e),this.setXY(i,ac.x,ac.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)pn.fromBufferAttribute(this,i),pn.applyMatrix3(e),this.setXYZ(i,pn.x,pn.y,pn.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)pn.fromBufferAttribute(this,i),pn.applyMatrix4(e),this.setXYZ(i,pn.x,pn.y,pn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)pn.fromBufferAttribute(this,i),pn.applyNormalMatrix(e),this.setXYZ(i,pn.x,pn.y,pn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)pn.fromBufferAttribute(this,i),pn.transformDirection(e),this.setXYZ(i,pn.x,pn.y,pn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=eo(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=Vn(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=eo(i,this.array)),i}setX(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=eo(i,this.array)),i}setY(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=eo(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=eo(i,this.array)),i}setW(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=Vn(i,this.array),r=Vn(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,l){return e*=this.itemSize,this.normalized&&(i=Vn(i,this.array),r=Vn(r,this.array),l=Vn(l,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this}setXYZW(e,i,r,l,f){return e*=this.itemSize,this.normalized&&(i=Vn(i,this.array),r=Vn(r,this.array),l=Vn(l,this.array),f=Vn(f,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this.array[e+3]=f,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Mv&&(e.usage=this.usage),e}}class qy extends hi{constructor(e,i,r){super(new Uint16Array(e),i,r)}}class Wy extends hi{constructor(e,i,r){super(new Uint32Array(e),i,r)}}class ln extends hi{constructor(e,i,r){super(new Float32Array(e),i,r)}}let gT=0;const Ei=new $e,Od=new bn,Qr=new Q,ci=new Js,hl=new Js,Tn=new Q;class Yn extends $s{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gT++}),this.uuid=po(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vy(e)?Wy:qy)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const f=new me().getNormalMatrix(e);r.applyNormalMatrix(f),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ei.makeRotationFromQuaternion(e),this.applyMatrix4(Ei),this}rotateX(e){return Ei.makeRotationX(e),this.applyMatrix4(Ei),this}rotateY(e){return Ei.makeRotationY(e),this.applyMatrix4(Ei),this}rotateZ(e){return Ei.makeRotationZ(e),this.applyMatrix4(Ei),this}translate(e,i,r){return Ei.makeTranslation(e,i,r),this.applyMatrix4(Ei),this}scale(e,i,r){return Ei.makeScale(e,i,r),this.applyMatrix4(Ei),this}lookAt(e){return Od.lookAt(e),Od.updateMatrix(),this.applyMatrix4(Od.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qr).negate(),this.translate(Qr.x,Qr.y,Qr.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,f=e.length;l<f;l++){const h=e[l];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new ln(r,3))}else{const r=Math.min(e.length,i.count);for(let l=0;l<r;l++){const f=e[l];i.setXYZ(l,f.x,f.y,f.z||0)}e.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Js);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,l=i.length;r<l;r++){const f=i[r];ci.setFromBufferAttribute(f),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,ci.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,ci.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(ci.min),this.boundingBox.expandByPoint(ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lc);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(e){const r=this.boundingSphere.center;if(ci.setFromBufferAttribute(e),i)for(let f=0,h=i.length;f<h;f++){const d=i[f];hl.setFromBufferAttribute(d),this.morphTargetsRelative?(Tn.addVectors(ci.min,hl.min),ci.expandByPoint(Tn),Tn.addVectors(ci.max,hl.max),ci.expandByPoint(Tn)):(ci.expandByPoint(hl.min),ci.expandByPoint(hl.max))}ci.getCenter(r);let l=0;for(let f=0,h=e.count;f<h;f++)Tn.fromBufferAttribute(e,f),l=Math.max(l,r.distanceToSquared(Tn));if(i)for(let f=0,h=i.length;f<h;f++){const d=i[f],v=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)Tn.fromBufferAttribute(d,p),v&&(Qr.fromBufferAttribute(e,p),Tn.add(Qr)),l=Math.max(l,r.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,f=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hi(new Float32Array(4*r.count),4));const h=this.getAttribute("tangent"),d=[],v=[];for(let G=0;G<r.count;G++)d[G]=new Q,v[G]=new Q;const p=new Q,g=new Q,m=new Q,y=new fe,x=new fe,T=new fe,A=new Q,M=new Q;function S(G,C,w){p.fromBufferAttribute(r,G),g.fromBufferAttribute(r,C),m.fromBufferAttribute(r,w),y.fromBufferAttribute(f,G),x.fromBufferAttribute(f,C),T.fromBufferAttribute(f,w),g.sub(p),m.sub(p),x.sub(y),T.sub(y);const B=1/(x.x*T.y-T.x*x.y);isFinite(B)&&(A.copy(g).multiplyScalar(T.y).addScaledVector(m,-x.y).multiplyScalar(B),M.copy(m).multiplyScalar(x.x).addScaledVector(g,-T.x).multiplyScalar(B),d[G].add(A),d[C].add(A),d[w].add(A),v[G].add(M),v[C].add(M),v[w].add(M))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let G=0,C=I.length;G<C;++G){const w=I[G],B=w.start,j=w.count;for(let it=B,ot=B+j;it<ot;it+=3)S(e.getX(it+0),e.getX(it+1),e.getX(it+2))}const O=new Q,D=new Q,H=new Q,U=new Q;function N(G){H.fromBufferAttribute(l,G),U.copy(H);const C=d[G];O.copy(C),O.sub(H.multiplyScalar(H.dot(C))).normalize(),D.crossVectors(U,C);const B=D.dot(v[G])<0?-1:1;h.setXYZW(G,O.x,O.y,O.z,B)}for(let G=0,C=I.length;G<C;++G){const w=I[G],B=w.start,j=w.count;for(let it=B,ot=B+j;it<ot;it+=3)N(e.getX(it+0)),N(e.getX(it+1)),N(e.getX(it+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new hi(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let y=0,x=r.count;y<x;y++)r.setXYZ(y,0,0,0);const l=new Q,f=new Q,h=new Q,d=new Q,v=new Q,p=new Q,g=new Q,m=new Q;if(e)for(let y=0,x=e.count;y<x;y+=3){const T=e.getX(y+0),A=e.getX(y+1),M=e.getX(y+2);l.fromBufferAttribute(i,T),f.fromBufferAttribute(i,A),h.fromBufferAttribute(i,M),g.subVectors(h,f),m.subVectors(l,f),g.cross(m),d.fromBufferAttribute(r,T),v.fromBufferAttribute(r,A),p.fromBufferAttribute(r,M),d.add(g),v.add(g),p.add(g),r.setXYZ(T,d.x,d.y,d.z),r.setXYZ(A,v.x,v.y,v.z),r.setXYZ(M,p.x,p.y,p.z)}else for(let y=0,x=i.count;y<x;y+=3)l.fromBufferAttribute(i,y+0),f.fromBufferAttribute(i,y+1),h.fromBufferAttribute(i,y+2),g.subVectors(h,f),m.subVectors(l,f),g.cross(m),r.setXYZ(y+0,g.x,g.y,g.z),r.setXYZ(y+1,g.x,g.y,g.z),r.setXYZ(y+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)Tn.fromBufferAttribute(e,i),Tn.normalize(),e.setXYZ(i,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function e(d,v){const p=d.array,g=d.itemSize,m=d.normalized,y=new p.constructor(v.length*g);let x=0,T=0;for(let A=0,M=v.length;A<M;A++){d.isInterleavedBufferAttribute?x=v[A]*d.data.stride+d.offset:x=v[A]*g;for(let S=0;S<g;S++)y[T++]=p[x++]}return new hi(y,g,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Yn,r=this.index.array,l=this.attributes;for(const d in l){const v=l[d],p=e(v,r);i.setAttribute(d,p)}const f=this.morphAttributes;for(const d in f){const v=[],p=f[d];for(let g=0,m=p.length;g<m;g++){const y=p[g],x=e(y,r);v.push(x)}i.morphAttributes[d]=v}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,v=h.length;d<v;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const v=this.parameters;for(const p in v)v[p]!==void 0&&(e[p]=v[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const v in r){const p=r[v];e.data.attributes[v]=p.toJSON(e.data)}const l={};let f=!1;for(const v in this.morphAttributes){const p=this.morphAttributes[v],g=[];for(let m=0,y=p.length;m<y;m++){const x=p[m];g.push(x.toJSON(e.data))}g.length>0&&(l[v]=g,f=!0)}f&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const l=e.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(i))}const f=e.morphAttributes;for(const p in f){const g=[],m=f[p];for(let y=0,x=m.length;y<x;y++)g.push(m[y].clone(i));this.morphAttributes[p]=g}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let p=0,g=h.length;p<g;p++){const m=h[p];this.addGroup(m.start,m.count,m.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const v=e.boundingSphere;return v!==null&&(this.boundingSphere=v.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Iv=new $e,Hs=new Oc,sc=new Lc,Bv=new Q,rc=new Q,oc=new Q,lc=new Q,Pd=new Q,uc=new Q,Fv=new Q,cc=new Q;class Ai extends bn{constructor(e=new Yn,i=new Yy){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,h=l.length;f<h;f++){const d=l[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=f}}}}getVertexPosition(e,i){const r=this.geometry,l=r.attributes.position,f=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(l,e);const d=this.morphTargetInfluences;if(f&&d){uc.set(0,0,0);for(let v=0,p=f.length;v<p;v++){const g=d[v],m=f[v];g!==0&&(Pd.fromBufferAttribute(m,e),h?uc.addScaledVector(Pd,g):uc.addScaledVector(Pd.sub(i),g))}i.add(uc)}return i}raycast(e,i){const r=this.geometry,l=this.material,f=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),sc.copy(r.boundingSphere),sc.applyMatrix4(f),Hs.copy(e.ray).recast(e.near),!(sc.containsPoint(Hs.origin)===!1&&(Hs.intersectSphere(sc,Bv)===null||Hs.origin.distanceToSquared(Bv)>(e.far-e.near)**2))&&(Iv.copy(f).invert(),Hs.copy(e.ray).applyMatrix4(Iv),!(r.boundingBox!==null&&Hs.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,i,Hs)))}_computeIntersections(e,i,r){let l;const f=this.geometry,h=this.material,d=f.index,v=f.attributes.position,p=f.attributes.uv,g=f.attributes.uv1,m=f.attributes.normal,y=f.groups,x=f.drawRange;if(d!==null)if(Array.isArray(h))for(let T=0,A=y.length;T<A;T++){const M=y[T],S=h[M.materialIndex],I=Math.max(M.start,x.start),O=Math.min(d.count,Math.min(M.start+M.count,x.start+x.count));for(let D=I,H=O;D<H;D+=3){const U=d.getX(D),N=d.getX(D+1),G=d.getX(D+2);l=fc(this,S,e,r,p,g,m,U,N,G),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const T=Math.max(0,x.start),A=Math.min(d.count,x.start+x.count);for(let M=T,S=A;M<S;M+=3){const I=d.getX(M),O=d.getX(M+1),D=d.getX(M+2);l=fc(this,h,e,r,p,g,m,I,O,D),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}else if(v!==void 0)if(Array.isArray(h))for(let T=0,A=y.length;T<A;T++){const M=y[T],S=h[M.materialIndex],I=Math.max(M.start,x.start),O=Math.min(v.count,Math.min(M.start+M.count,x.start+x.count));for(let D=I,H=O;D<H;D+=3){const U=D,N=D+1,G=D+2;l=fc(this,S,e,r,p,g,m,U,N,G),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const T=Math.max(0,x.start),A=Math.min(v.count,x.start+x.count);for(let M=T,S=A;M<S;M+=3){const I=M,O=M+1,D=M+2;l=fc(this,h,e,r,p,g,m,I,O,D),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}}}function _T(o,e,i,r,l,f,h,d){let v;if(e.side===Jn?v=r.intersectTriangle(h,f,l,!0,d):v=r.intersectTriangle(l,f,h,e.side===hs,d),v===null)return null;cc.copy(d),cc.applyMatrix4(o.matrixWorld);const p=i.ray.origin.distanceTo(cc);return p<i.near||p>i.far?null:{distance:p,point:cc.clone(),object:o}}function fc(o,e,i,r,l,f,h,d,v,p){o.getVertexPosition(d,rc),o.getVertexPosition(v,oc),o.getVertexPosition(p,lc);const g=_T(o,e,i,r,rc,oc,lc,Fv);if(g){const m=new Q;bi.getBarycoord(Fv,rc,oc,lc,m),l&&(g.uv=bi.getInterpolatedAttribute(l,d,v,p,m,new fe)),f&&(g.uv1=bi.getInterpolatedAttribute(f,d,v,p,m,new fe)),h&&(g.normal=bi.getInterpolatedAttribute(h,d,v,p,m,new Q),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const y={a:d,b:v,c:p,normal:new Q,materialIndex:0};bi.getNormal(rc,oc,lc,y.normal),g.face=y,g.barycoord=m}return g}class mo extends Yn{constructor(e=1,i=1,r=1,l=1,f=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:l,heightSegments:f,depthSegments:h};const d=this;l=Math.floor(l),f=Math.floor(f),h=Math.floor(h);const v=[],p=[],g=[],m=[];let y=0,x=0;T("z","y","x",-1,-1,r,i,e,h,f,0),T("z","y","x",1,-1,r,i,-e,h,f,1),T("x","z","y",1,1,e,r,i,l,h,2),T("x","z","y",1,-1,e,r,-i,l,h,3),T("x","y","z",1,-1,e,i,r,l,f,4),T("x","y","z",-1,-1,e,i,-r,l,f,5),this.setIndex(v),this.setAttribute("position",new ln(p,3)),this.setAttribute("normal",new ln(g,3)),this.setAttribute("uv",new ln(m,2));function T(A,M,S,I,O,D,H,U,N,G,C){const w=D/N,B=H/G,j=D/2,it=H/2,ot=U/2,ct=N+1,V=G+1;let lt=0,q=0;const _t=new Q;for(let St=0;St<V;St++){const Ht=St*B-it;for(let re=0;re<ct;re++){const xe=re*w-j;_t[A]=xe*I,_t[M]=Ht*O,_t[S]=ot,p.push(_t.x,_t.y,_t.z),_t[A]=0,_t[M]=0,_t[S]=U>0?1:-1,g.push(_t.x,_t.y,_t.z),m.push(re/N),m.push(1-St/G),lt+=1}}for(let St=0;St<G;St++)for(let Ht=0;Ht<N;Ht++){const re=y+Ht+ct*St,xe=y+Ht+ct*(St+1),F=y+(Ht+1)+ct*(St+1),ft=y+(Ht+1)+ct*St;v.push(re,xe,ft),v.push(xe,F,ft),q+=6}d.addGroup(x,q,C),x+=q,y+=lt}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ho(o){const e={};for(const i in o){e[i]={};for(const r in o[i]){const l=o[i][r];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=l.clone():Array.isArray(l)?e[i][r]=l.slice():e[i][r]=l}}return e}function Xn(o){const e={};for(let i=0;i<o.length;i++){const r=ho(o[i]);for(const l in r)e[l]=r[l]}return e}function vT(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function jy(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ne.workingColorSpace}const yT={clone:ho,merge:Xn};var ST=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ds extends tr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ST,this.fragmentShader=xT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ho(e.uniforms),this.uniformsGroups=vT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class Zy extends bn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $e,this.projectionMatrix=new $e,this.projectionMatrixInverse=new $e,this.coordinateSystem=$i,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const os=new Q,Hv=new fe,Gv=new fe;class Ti extends Zy{constructor(e=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Ml*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ro*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ml*2*Math.atan(Math.tan(ro*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,r){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(os.x,os.y).multiplyScalar(-e/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(os.x,os.y).multiplyScalar(-e/os.z)}getViewSize(e,i){return this.getViewBounds(e,Hv,Gv),i.subVectors(Gv,Hv)}setViewOffset(e,i,r,l,f,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(ro*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,f=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const v=h.fullWidth,p=h.fullHeight;f+=h.offsetX*l/v,i-=h.offsetY*r/p,l*=h.width/v,r*=h.height/p}const d=this.filmOffset;d!==0&&(f+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(f,f+l,i,i-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Jr=-90,$r=1;class MT extends bn{constructor(e,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ti(Jr,$r,e,i);l.layers=this.layers,this.add(l);const f=new Ti(Jr,$r,e,i);f.layers=this.layers,this.add(f);const h=new Ti(Jr,$r,e,i);h.layers=this.layers,this.add(h);const d=new Ti(Jr,$r,e,i);d.layers=this.layers,this.add(d);const v=new Ti(Jr,$r,e,i);v.layers=this.layers,this.add(v);const p=new Ti(Jr,$r,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[r,l,f,h,d,v]=i;for(const p of i)this.remove(p);if(e===$i)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),f.up.set(0,0,-1),f.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),v.up.set(0,1,0),v.lookAt(0,0,-1);else if(e===Cc)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),f.up.set(0,0,1),f.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),v.up.set(0,-1,0),v.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[f,h,d,v,p,g]=this.children,m=e.getRenderTarget(),y=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const A=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,l),e.render(i,f),e.setRenderTarget(r,1,l),e.render(i,h),e.setRenderTarget(r,2,l),e.render(i,d),e.setRenderTarget(r,3,l),e.render(i,v),e.setRenderTarget(r,4,l),e.render(i,p),r.texture.generateMipmaps=A,e.setRenderTarget(r,5,l),e.render(i,g),e.setRenderTarget(m,y,x),e.xr.enabled=T,r.texture.needsPMREMUpdate=!0}}class Ky extends $n{constructor(e=[],i=uo,r,l,f,h,d,v,p,g){super(e,i,r,l,f,h,d,v,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ET extends Qs{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},l=[r,r,r,r,r,r];this.texture=new Ky(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new mo(5,5,5),f=new ds({name:"CubemapFromEquirect",uniforms:ho(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Jn,blending:cs});f.uniforms.tEquirect.value=i;const h=new Ai(l,f),d=i.minFilter;return i.minFilter===js&&(i.minFilter=Ji),new MT(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i=!0,r=!0,l=!0){const f=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,r,l);e.setRenderTarget(f)}}class pl extends bn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const TT={type:"move"};class zd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let l=null,f=null,h=null;const d=this._targetRay,v=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){h=!0;for(const A of e.hand.values()){const M=i.getJointPose(A,r),S=this._getHandJoint(p,A);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const g=p.joints["index-finger-tip"],m=p.joints["thumb-tip"],y=g.position.distanceTo(m.position),x=.02,T=.005;p.inputState.pinching&&y>x+T?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&y<=x-T&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else v!==null&&e.gripSpace&&(f=i.getPose(e.gripSpace,r),f!==null&&(v.matrix.fromArray(f.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,f.linearVelocity?(v.hasLinearVelocity=!0,v.linearVelocity.copy(f.linearVelocity)):v.hasLinearVelocity=!1,f.angularVelocity?(v.hasAngularVelocity=!0,v.angularVelocity.copy(f.angularVelocity)):v.hasAngularVelocity=!1));d!==null&&(l=i.getPose(e.targetRaySpace,r),l===null&&f!==null&&(l=f),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(TT)))}return d!==null&&(d.visible=l!==null),v!==null&&(v.visible=f!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const r=new pl;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}}class bT extends bn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bi,this.environmentIntensity=1,this.environmentRotation=new Bi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Id=new Q,AT=new Q,RT=new me;class ls{constructor(e=new Q(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,l){return this.normal.set(e,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){const l=Id.subVectors(r,i).cross(AT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const r=e.delta(Id),l=this.normal.dot(r);if(l===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/l;return f<0||f>1?null:i.copy(e.start).addScaledVector(r,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const r=i||RT.getNormalMatrix(e),l=this.coplanarPoint(Id).applyMatrix4(e),f=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(f),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Gs=new Lc,CT=new fe(.5,.5),hc=new Q;class Zp{constructor(e=new ls,i=new ls,r=new ls,l=new ls,f=new ls,h=new ls){this.planes=[e,i,r,l,f,h]}set(e,i,r,l,f,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(r),d[3].copy(l),d[4].copy(f),d[5].copy(h),this}copy(e){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,i=$i,r=!1){const l=this.planes,f=e.elements,h=f[0],d=f[1],v=f[2],p=f[3],g=f[4],m=f[5],y=f[6],x=f[7],T=f[8],A=f[9],M=f[10],S=f[11],I=f[12],O=f[13],D=f[14],H=f[15];if(l[0].setComponents(p-h,x-g,S-T,H-I).normalize(),l[1].setComponents(p+h,x+g,S+T,H+I).normalize(),l[2].setComponents(p+d,x+m,S+A,H+O).normalize(),l[3].setComponents(p-d,x-m,S-A,H-O).normalize(),r)l[4].setComponents(v,y,M,D).normalize(),l[5].setComponents(p-v,x-y,S-M,H-D).normalize();else if(l[4].setComponents(p-v,x-y,S-M,H-D).normalize(),i===$i)l[5].setComponents(p+v,x+y,S+M,H+D).normalize();else if(i===Cc)l[5].setComponents(v,y,M,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Gs.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gs)}intersectsSprite(e){Gs.center.set(0,0,0);const i=CT.distanceTo(e.center);return Gs.radius=.7071067811865476+i,Gs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gs)}intersectsSphere(e){const i=this.planes,r=e.center,l=-e.radius;for(let f=0;f<6;f++)if(i[f].distanceToPoint(r)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(hc.x=l.normal.x>0?e.max.x:e.min.x,hc.y=l.normal.y>0?e.max.y:e.min.y,hc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(hc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Kp extends tr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Dc=new Q,Uc=new Q,Vv=new $e,dl=new Oc,dc=new Lc,Bd=new Q,Xv=new Q;class wT extends bn{constructor(e=new Yn,i=new Kp){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,r=[0];for(let l=1,f=i.count;l<f;l++)Dc.fromBufferAttribute(i,l-1),Uc.fromBufferAttribute(i,l),r[l]=r[l-1],r[l]+=Dc.distanceTo(Uc);e.setAttribute("lineDistance",new ln(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,i){const r=this.geometry,l=this.matrixWorld,f=e.params.Line.threshold,h=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),dc.copy(r.boundingSphere),dc.applyMatrix4(l),dc.radius+=f,e.ray.intersectsSphere(dc)===!1)return;Vv.copy(l).invert(),dl.copy(e.ray).applyMatrix4(Vv);const d=f/((this.scale.x+this.scale.y+this.scale.z)/3),v=d*d,p=this.isLineSegments?2:1,g=r.index,y=r.attributes.position;if(g!==null){const x=Math.max(0,h.start),T=Math.min(g.count,h.start+h.count);for(let A=x,M=T-1;A<M;A+=p){const S=g.getX(A),I=g.getX(A+1),O=pc(this,e,dl,v,S,I,A);O&&i.push(O)}if(this.isLineLoop){const A=g.getX(T-1),M=g.getX(x),S=pc(this,e,dl,v,A,M,T-1);S&&i.push(S)}}else{const x=Math.max(0,h.start),T=Math.min(y.count,h.start+h.count);for(let A=x,M=T-1;A<M;A+=p){const S=pc(this,e,dl,v,A,A+1,A);S&&i.push(S)}if(this.isLineLoop){const A=pc(this,e,dl,v,T-1,x,T-1);A&&i.push(A)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,h=l.length;f<h;f++){const d=l[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=f}}}}}function pc(o,e,i,r,l,f,h){const d=o.geometry.attributes.position;if(Dc.fromBufferAttribute(d,l),Uc.fromBufferAttribute(d,f),i.distanceSqToSegment(Dc,Uc,Bd,Xv)>r)return;Bd.applyMatrix4(o.matrixWorld);const p=e.ray.origin.distanceTo(Bd);if(!(p<e.near||p>e.far))return{distance:p,point:Xv.clone().applyMatrix4(o.matrixWorld),index:h,face:null,faceIndex:null,barycoord:null,object:o}}const kv=new Q,Yv=new Q;class Pp extends wT{constructor(e,i){super(e,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,r=[];for(let l=0,f=i.count;l<f;l+=2)kv.fromBufferAttribute(i,l),Yv.fromBufferAttribute(i,l+1),r[l]=l===0?0:r[l-1],r[l+1]=r[l]+kv.distanceTo(Yv);e.setAttribute("lineDistance",new ln(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qy extends $n{constructor(e,i,r=Zs,l,f,h,d=Ii,v=Ii,p,g=Sl,m=1){if(g!==Sl&&g!==xl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const y={width:e,height:i,depth:m};super(y,l,f,h,d,v,g,r,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Jy extends $n{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Qp extends Yn{constructor(e=1,i=1,r=1,l=32,f=1,h=!1,d=0,v=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:i,height:r,radialSegments:l,heightSegments:f,openEnded:h,thetaStart:d,thetaLength:v};const p=this;l=Math.floor(l),f=Math.floor(f);const g=[],m=[],y=[],x=[];let T=0;const A=[],M=r/2;let S=0;I(),h===!1&&(e>0&&O(!0),i>0&&O(!1)),this.setIndex(g),this.setAttribute("position",new ln(m,3)),this.setAttribute("normal",new ln(y,3)),this.setAttribute("uv",new ln(x,2));function I(){const D=new Q,H=new Q;let U=0;const N=(i-e)/r;for(let G=0;G<=f;G++){const C=[],w=G/f,B=w*(i-e)+e;for(let j=0;j<=l;j++){const it=j/l,ot=it*v+d,ct=Math.sin(ot),V=Math.cos(ot);H.x=B*ct,H.y=-w*r+M,H.z=B*V,m.push(H.x,H.y,H.z),D.set(ct,N,V).normalize(),y.push(D.x,D.y,D.z),x.push(it,1-w),C.push(T++)}A.push(C)}for(let G=0;G<l;G++)for(let C=0;C<f;C++){const w=A[C][G],B=A[C+1][G],j=A[C+1][G+1],it=A[C][G+1];(e>0||C!==0)&&(g.push(w,B,it),U+=3),(i>0||C!==f-1)&&(g.push(B,j,it),U+=3)}p.addGroup(S,U,0),S+=U}function O(D){const H=T,U=new fe,N=new Q;let G=0;const C=D===!0?e:i,w=D===!0?1:-1;for(let j=1;j<=l;j++)m.push(0,M*w,0),y.push(0,w,0),x.push(.5,.5),T++;const B=T;for(let j=0;j<=l;j++){const ot=j/l*v+d,ct=Math.cos(ot),V=Math.sin(ot);N.x=C*V,N.y=M*w,N.z=C*ct,m.push(N.x,N.y,N.z),y.push(0,w,0),U.x=ct*.5+.5,U.y=V*.5*w+.5,x.push(U.x,U.y),T++}for(let j=0;j<l;j++){const it=H+j,ot=B+j;D===!0?g.push(ot,ot+1,it):g.push(ot+1,ot,it),G+=3}p.addGroup(S,G,D===!0?1:2),S+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qp(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const mc=new Q,gc=new Q,Fd=new Q,_c=new bi;class DT extends Yn{constructor(e=null,i=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:i},e!==null){const l=Math.pow(10,4),f=Math.cos(ro*i),h=e.getIndex(),d=e.getAttribute("position"),v=h?h.count:d.count,p=[0,0,0],g=["a","b","c"],m=new Array(3),y={},x=[];for(let T=0;T<v;T+=3){h?(p[0]=h.getX(T),p[1]=h.getX(T+1),p[2]=h.getX(T+2)):(p[0]=T,p[1]=T+1,p[2]=T+2);const{a:A,b:M,c:S}=_c;if(A.fromBufferAttribute(d,p[0]),M.fromBufferAttribute(d,p[1]),S.fromBufferAttribute(d,p[2]),_c.getNormal(Fd),m[0]=`${Math.round(A.x*l)},${Math.round(A.y*l)},${Math.round(A.z*l)}`,m[1]=`${Math.round(M.x*l)},${Math.round(M.y*l)},${Math.round(M.z*l)}`,m[2]=`${Math.round(S.x*l)},${Math.round(S.y*l)},${Math.round(S.z*l)}`,!(m[0]===m[1]||m[1]===m[2]||m[2]===m[0]))for(let I=0;I<3;I++){const O=(I+1)%3,D=m[I],H=m[O],U=_c[g[I]],N=_c[g[O]],G=`${D}_${H}`,C=`${H}_${D}`;C in y&&y[C]?(Fd.dot(y[C].normal)<=f&&(x.push(U.x,U.y,U.z),x.push(N.x,N.y,N.z)),y[C]=null):G in y||(y[G]={index0:p[I],index1:p[O],normal:Fd.clone()})}}for(const T in y)if(y[T]){const{index0:A,index1:M}=y[T];mc.fromBufferAttribute(d,A),gc.fromBufferAttribute(d,M),x.push(mc.x,mc.y,mc.z),x.push(gc.x,gc.y,gc.z)}this.setAttribute("position",new ln(x,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class bl extends Yn{constructor(e=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:l};const f=e/2,h=i/2,d=Math.floor(r),v=Math.floor(l),p=d+1,g=v+1,m=e/d,y=i/v,x=[],T=[],A=[],M=[];for(let S=0;S<g;S++){const I=S*y-h;for(let O=0;O<p;O++){const D=O*m-f;T.push(D,-I,0),A.push(0,0,1),M.push(O/d),M.push(1-S/v)}}for(let S=0;S<v;S++)for(let I=0;I<d;I++){const O=I+p*S,D=I+p*(S+1),H=I+1+p*(S+1),U=I+1+p*S;x.push(O,D,U),x.push(D,H,U)}this.setIndex(x),this.setAttribute("position",new ln(T,3)),this.setAttribute("normal",new ln(A,3)),this.setAttribute("uv",new ln(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bl(e.width,e.height,e.widthSegments,e.heightSegments)}}class Jp extends Yn{constructor(e=1,i=32,r=16,l=0,f=Math.PI*2,h=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:r,phiStart:l,phiLength:f,thetaStart:h,thetaLength:d},i=Math.max(3,Math.floor(i)),r=Math.max(2,Math.floor(r));const v=Math.min(h+d,Math.PI);let p=0;const g=[],m=new Q,y=new Q,x=[],T=[],A=[],M=[];for(let S=0;S<=r;S++){const I=[],O=S/r;let D=0;S===0&&h===0?D=.5/i:S===r&&v===Math.PI&&(D=-.5/i);for(let H=0;H<=i;H++){const U=H/i;m.x=-e*Math.cos(l+U*f)*Math.sin(h+O*d),m.y=e*Math.cos(h+O*d),m.z=e*Math.sin(l+U*f)*Math.sin(h+O*d),T.push(m.x,m.y,m.z),y.copy(m).normalize(),A.push(y.x,y.y,y.z),M.push(U+D,1-O),I.push(p++)}g.push(I)}for(let S=0;S<r;S++)for(let I=0;I<i;I++){const O=g[S][I+1],D=g[S][I],H=g[S+1][I],U=g[S+1][I+1];(S!==0||h>0)&&x.push(O,D,U),(S!==r-1||v<Math.PI)&&x.push(D,H,U)}this.setIndex(x),this.setAttribute("position",new ln(T,3)),this.setAttribute("normal",new ln(A,3)),this.setAttribute("uv",new ln(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jp(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class UT extends tr{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Te(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class NT extends tr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hy,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class LT extends tr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=RE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class OT extends tr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const qv={enabled:!1,files:{},add:function(o,e){this.enabled!==!1&&(this.files[o]=e)},get:function(o){if(this.enabled!==!1)return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};class PT{constructor(e,i,r){const l=this;let f=!1,h=0,d=0,v;const p=[];this.onStart=void 0,this.onLoad=e,this.onProgress=i,this.onError=r,this.abortController=new AbortController,this.itemStart=function(g){d++,f===!1&&l.onStart!==void 0&&l.onStart(g,h,d),f=!0},this.itemEnd=function(g){h++,l.onProgress!==void 0&&l.onProgress(g,h,d),h===d&&(f=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(g){l.onError!==void 0&&l.onError(g)},this.resolveURL=function(g){return v?v(g):g},this.setURLModifier=function(g){return v=g,this},this.addHandler=function(g,m){return p.push(g,m),this},this.removeHandler=function(g){const m=p.indexOf(g);return m!==-1&&p.splice(m,2),this},this.getHandler=function(g){for(let m=0,y=p.length;m<y;m+=2){const x=p[m],T=p[m+1];if(x.global&&(x.lastIndex=0),x.test(g))return T}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const zT=new PT;class $p{constructor(e){this.manager=e!==void 0?e:zT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,i){const r=this;return new Promise(function(l,f){r.load(e,l,i,f)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}$p.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ma={};class IT extends Error{constructor(e,i){super(e),this.response=i}}class BT extends $p{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,i,r,l){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const f=qv.get(`file:${e}`);if(f!==void 0)return this.manager.itemStart(e),setTimeout(()=>{i&&i(f),this.manager.itemEnd(e)},0),f;if(Ma[e]!==void 0){Ma[e].push({onLoad:i,onProgress:r,onError:l});return}Ma[e]=[],Ma[e].push({onLoad:i,onProgress:r,onError:l});const h=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),d=this.mimeType,v=this.responseType;fetch(h).then(p=>{if(p.status===200||p.status===0){if(p.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||p.body===void 0||p.body.getReader===void 0)return p;const g=Ma[e],m=p.body.getReader(),y=p.headers.get("X-File-Size")||p.headers.get("Content-Length"),x=y?parseInt(y):0,T=x!==0;let A=0;const M=new ReadableStream({start(S){I();function I(){m.read().then(({done:O,value:D})=>{if(O)S.close();else{A+=D.byteLength;const H=new ProgressEvent("progress",{lengthComputable:T,loaded:A,total:x});for(let U=0,N=g.length;U<N;U++){const G=g[U];G.onProgress&&G.onProgress(H)}S.enqueue(D),I()}},O=>{S.error(O)})}}});return new Response(M)}else throw new IT(`fetch for "${p.url}" responded with ${p.status}: ${p.statusText}`,p)}).then(p=>{switch(v){case"arraybuffer":return p.arrayBuffer();case"blob":return p.blob();case"document":return p.text().then(g=>new DOMParser().parseFromString(g,d));case"json":return p.json();default:if(d==="")return p.text();{const m=/charset="?([^;"\s]*)"?/i.exec(d),y=m&&m[1]?m[1].toLowerCase():void 0,x=new TextDecoder(y);return p.arrayBuffer().then(T=>x.decode(T))}}}).then(p=>{qv.add(`file:${e}`,p);const g=Ma[e];delete Ma[e];for(let m=0,y=g.length;m<y;m++){const x=g[m];x.onLoad&&x.onLoad(p)}}).catch(p=>{const g=Ma[e];if(g===void 0)throw this.manager.itemError(e),p;delete Ma[e];for(let m=0,y=g.length;m<y;m++){const x=g[m];x.onError&&x.onError(p)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class $y extends bn{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new Te(e),this.intensity=i}dispose(){}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}class FT extends $y{constructor(e,i,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Te(i)}copy(e,i){return super.copy(e,i),this.groundColor.copy(e.groundColor),this}}const Hd=new $e,Wv=new Q,jv=new Q;class HT{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.mapType=ta,this.map=null,this.mapPass=null,this.matrix=new $e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zp,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new rn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera,r=this.matrix;Wv.setFromMatrixPosition(e.matrixWorld),i.position.copy(Wv),jv.setFromMatrixPosition(e.target.matrixWorld),i.lookAt(jv),i.updateMatrixWorld(),Hd.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hd,i.coordinateSystem,i.reversedDepth),i.reversedDepth?r.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Hd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class tS extends Zy{constructor(e=-1,i=1,r=1,l=-1,f=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=r,this.bottom=l,this.near=f,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,r,l,f,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let f=r-e,h=r+e,d=l+i,v=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;f+=p*this.view.offsetX,h=f+p*this.view.width,d-=g*this.view.offsetY,v=d-g*this.view.height}this.projectionMatrix.makeOrthographic(f,h,d,v,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class GT extends HT{constructor(){super(new tS(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zv extends $y{constructor(e,i){super(e,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bn.DEFAULT_UP),this.updateMatrix(),this.target=new bn,this.shadow=new GT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class VT extends Ti{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Kv=new $e;class XT{constructor(e,i,r=0,l=1/0){this.ray=new Oc(e,i),this.near=r,this.far=l,this.camera=null,this.layers=new jp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,i){this.ray.set(e,i)}setFromCamera(e,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(i.near+i.far)/(i.near-i.far)).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):console.error("THREE.Raycaster: Unsupported camera type: "+i.type)}setFromXRController(e){return Kv.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Kv),this}intersectObject(e,i=!0,r=[]){return zp(e,this,r,i),r.sort(Qv),r}intersectObjects(e,i=!0,r=[]){for(let l=0,f=e.length;l<f;l++)zp(e[l],this,r,i);return r.sort(Qv),r}}function Qv(o,e){return o.distance-e.distance}function zp(o,e,i,r){let l=!0;if(o.layers.test(e.layers)&&o.raycast(e,i)===!1&&(l=!1),l===!0&&r===!0){const f=o.children;for(let h=0,d=f.length;h<d;h++)zp(f[h],e,i,!0)}}class Jv{constructor(e=1,i=0,r=0){this.radius=e,this.phi=i,this.theta=r}set(e,i,r){return this.radius=e,this.phi=i,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Se(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,r){return this.radius=Math.sqrt(e*e+i*i+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(Se(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class kT extends Pp{constructor(e=10,i=10,r=4473924,l=8947848){r=new Te(r),l=new Te(l);const f=i/2,h=e/i,d=e/2,v=[],p=[];for(let y=0,x=0,T=-d;y<=i;y++,T+=h){v.push(-d,0,T,d,0,T),v.push(T,0,-d,T,0,d);const A=y===f?r:l;A.toArray(p,x),x+=3,A.toArray(p,x),x+=3,A.toArray(p,x),x+=3,A.toArray(p,x),x+=3}const g=new Yn;g.setAttribute("position",new ln(v,3)),g.setAttribute("color",new ln(p,3));const m=new Kp({vertexColors:!0,toneMapped:!1});super(g,m),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class YT extends $s{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function $v(o,e,i,r){const l=qT(r);switch(i){case zy:return o*e;case By:return o*e/l.components*l.byteLength;case Xp:return o*e/l.components*l.byteLength;case Fy:return o*e*2/l.components*l.byteLength;case kp:return o*e*2/l.components*l.byteLength;case Iy:return o*e*3/l.components*l.byteLength;case zi:return o*e*4/l.components*l.byteLength;case Yp:return o*e*4/l.components*l.byteLength;case Mc:case Ec:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Tc:case bc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case lp:case cp:return Math.max(o,16)*Math.max(e,8)/4;case op:case up:return Math.max(o,8)*Math.max(e,8)/2;case fp:case hp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case dp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case pp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case mp:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case gp:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case _p:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case vp:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case yp:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case Sp:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case xp:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case Mp:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case Ep:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case Tp:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case bp:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Ap:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Rp:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Cp:case wp:case Dp:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Up:case Np:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Lp:case Op:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function qT(o){switch(o){case ta:case Ny:return{byteLength:1,components:1};case vl:case Ly:case Tl:return{byteLength:2,components:1};case Gp:case Vp:return{byteLength:2,components:4};case Zs:case Hp:case Aa:return{byteLength:4,components:1};case Oy:case Py:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fp);function eS(){let o=null,e=!1,i=null,r=null;function l(f,h){i(f,h),r=o.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&(r=o.requestAnimationFrame(l),e=!0)},stop:function(){o.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(f){i=f},setContext:function(f){o=f}}}function WT(o){const e=new WeakMap;function i(d,v){const p=d.array,g=d.usage,m=p.byteLength,y=o.createBuffer();o.bindBuffer(v,y),o.bufferData(v,p,g),d.onUploadCallback();let x;if(p instanceof Float32Array)x=o.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)x=o.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?x=o.HALF_FLOAT:x=o.UNSIGNED_SHORT;else if(p instanceof Int16Array)x=o.SHORT;else if(p instanceof Uint32Array)x=o.UNSIGNED_INT;else if(p instanceof Int32Array)x=o.INT;else if(p instanceof Int8Array)x=o.BYTE;else if(p instanceof Uint8Array)x=o.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)x=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:y,type:x,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:m}}function r(d,v,p){const g=v.array,m=v.updateRanges;if(o.bindBuffer(p,d),m.length===0)o.bufferSubData(p,0,g);else{m.sort((x,T)=>x.start-T.start);let y=0;for(let x=1;x<m.length;x++){const T=m[y],A=m[x];A.start<=T.start+T.count+1?T.count=Math.max(T.count,A.start+A.count-T.start):(++y,m[y]=A)}m.length=y+1;for(let x=0,T=m.length;x<T;x++){const A=m[x];o.bufferSubData(p,A.start*g.BYTES_PER_ELEMENT,g,A.start,A.count)}v.clearUpdateRanges()}v.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function f(d){d.isInterleavedBufferAttribute&&(d=d.data);const v=e.get(d);v&&(o.deleteBuffer(v.buffer),e.delete(d))}function h(d,v){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=e.get(d);(!g||g.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,i(d,v));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,d,v),p.version=d.version}}return{get:l,remove:f,update:h}}var jT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ZT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,KT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,QT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,JT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$T=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,eb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nb=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ib=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ab=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ob=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lb=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ub=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,cb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,db=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,gb=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,_b=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vb=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Eb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tb="gl_FragColor = linearToOutputTexel( gl_FragColor );",bb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ab=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Rb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,wb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Db=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ub=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ob=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ib=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bb=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Hb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Xb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kb=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qb=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Wb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,jb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$b=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,eA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,iA=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,aA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,oA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uA=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,cA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_A=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,SA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,MA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,EA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,TA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,AA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,RA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,CA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,DA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,UA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,NA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,LA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,OA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,PA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,IA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,BA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,FA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,HA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,GA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,VA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,XA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,YA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const WA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,KA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,JA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$A=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,t1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,e1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,n1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,i1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,r1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,l1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,h1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,p1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,m1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,g1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,v1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,M1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,E1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,b1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,A1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ge={alphahash_fragment:jT,alphahash_pars_fragment:ZT,alphamap_fragment:KT,alphamap_pars_fragment:QT,alphatest_fragment:JT,alphatest_pars_fragment:$T,aomap_fragment:tb,aomap_pars_fragment:eb,batching_pars_vertex:nb,batching_vertex:ib,begin_vertex:ab,beginnormal_vertex:sb,bsdfs:rb,iridescence_fragment:ob,bumpmap_pars_fragment:lb,clipping_planes_fragment:ub,clipping_planes_pars_fragment:cb,clipping_planes_pars_vertex:fb,clipping_planes_vertex:hb,color_fragment:db,color_pars_fragment:pb,color_pars_vertex:mb,color_vertex:gb,common:_b,cube_uv_reflection_fragment:vb,defaultnormal_vertex:yb,displacementmap_pars_vertex:Sb,displacementmap_vertex:xb,emissivemap_fragment:Mb,emissivemap_pars_fragment:Eb,colorspace_fragment:Tb,colorspace_pars_fragment:bb,envmap_fragment:Ab,envmap_common_pars_fragment:Rb,envmap_pars_fragment:Cb,envmap_pars_vertex:wb,envmap_physical_pars_fragment:Hb,envmap_vertex:Db,fog_vertex:Ub,fog_pars_vertex:Nb,fog_fragment:Lb,fog_pars_fragment:Ob,gradientmap_pars_fragment:Pb,lightmap_pars_fragment:zb,lights_lambert_fragment:Ib,lights_lambert_pars_fragment:Bb,lights_pars_begin:Fb,lights_toon_fragment:Gb,lights_toon_pars_fragment:Vb,lights_phong_fragment:Xb,lights_phong_pars_fragment:kb,lights_physical_fragment:Yb,lights_physical_pars_fragment:qb,lights_fragment_begin:Wb,lights_fragment_maps:jb,lights_fragment_end:Zb,logdepthbuf_fragment:Kb,logdepthbuf_pars_fragment:Qb,logdepthbuf_pars_vertex:Jb,logdepthbuf_vertex:$b,map_fragment:tA,map_pars_fragment:eA,map_particle_fragment:nA,map_particle_pars_fragment:iA,metalnessmap_fragment:aA,metalnessmap_pars_fragment:sA,morphinstance_vertex:rA,morphcolor_vertex:oA,morphnormal_vertex:lA,morphtarget_pars_vertex:uA,morphtarget_vertex:cA,normal_fragment_begin:fA,normal_fragment_maps:hA,normal_pars_fragment:dA,normal_pars_vertex:pA,normal_vertex:mA,normalmap_pars_fragment:gA,clearcoat_normal_fragment_begin:_A,clearcoat_normal_fragment_maps:vA,clearcoat_pars_fragment:yA,iridescence_pars_fragment:SA,opaque_fragment:xA,packing:MA,premultiplied_alpha_fragment:EA,project_vertex:TA,dithering_fragment:bA,dithering_pars_fragment:AA,roughnessmap_fragment:RA,roughnessmap_pars_fragment:CA,shadowmap_pars_fragment:wA,shadowmap_pars_vertex:DA,shadowmap_vertex:UA,shadowmask_pars_fragment:NA,skinbase_vertex:LA,skinning_pars_vertex:OA,skinning_vertex:PA,skinnormal_vertex:zA,specularmap_fragment:IA,specularmap_pars_fragment:BA,tonemapping_fragment:FA,tonemapping_pars_fragment:HA,transmission_fragment:GA,transmission_pars_fragment:VA,uv_pars_fragment:XA,uv_pars_vertex:kA,uv_vertex:YA,worldpos_vertex:qA,background_vert:WA,background_frag:jA,backgroundCube_vert:ZA,backgroundCube_frag:KA,cube_vert:QA,cube_frag:JA,depth_vert:$A,depth_frag:t1,distanceRGBA_vert:e1,distanceRGBA_frag:n1,equirect_vert:i1,equirect_frag:a1,linedashed_vert:s1,linedashed_frag:r1,meshbasic_vert:o1,meshbasic_frag:l1,meshlambert_vert:u1,meshlambert_frag:c1,meshmatcap_vert:f1,meshmatcap_frag:h1,meshnormal_vert:d1,meshnormal_frag:p1,meshphong_vert:m1,meshphong_frag:g1,meshphysical_vert:_1,meshphysical_frag:v1,meshtoon_vert:y1,meshtoon_frag:S1,points_vert:x1,points_frag:M1,shadow_vert:E1,shadow_frag:T1,sprite_vert:b1,sprite_frag:A1},It={common:{diffuse:{value:new Te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new me},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new me}},envmap:{envMap:{value:null},envMapRotation:{value:new me},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new me}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new me}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new me},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new me},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new me},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new me}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new me}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new me}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0},uvTransform:{value:new me}},sprite:{diffuse:{value:new Te(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new me},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0}}},Qi={basic:{uniforms:Xn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.fog]),vertexShader:ge.meshbasic_vert,fragmentShader:ge.meshbasic_frag},lambert:{uniforms:Xn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Te(0)}}]),vertexShader:ge.meshlambert_vert,fragmentShader:ge.meshlambert_frag},phong:{uniforms:Xn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Te(0)},specular:{value:new Te(1118481)},shininess:{value:30}}]),vertexShader:ge.meshphong_vert,fragmentShader:ge.meshphong_frag},standard:{uniforms:Xn([It.common,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.roughnessmap,It.metalnessmap,It.fog,It.lights,{emissive:{value:new Te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag},toon:{uniforms:Xn([It.common,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.gradientmap,It.fog,It.lights,{emissive:{value:new Te(0)}}]),vertexShader:ge.meshtoon_vert,fragmentShader:ge.meshtoon_frag},matcap:{uniforms:Xn([It.common,It.bumpmap,It.normalmap,It.displacementmap,It.fog,{matcap:{value:null}}]),vertexShader:ge.meshmatcap_vert,fragmentShader:ge.meshmatcap_frag},points:{uniforms:Xn([It.points,It.fog]),vertexShader:ge.points_vert,fragmentShader:ge.points_frag},dashed:{uniforms:Xn([It.common,It.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ge.linedashed_vert,fragmentShader:ge.linedashed_frag},depth:{uniforms:Xn([It.common,It.displacementmap]),vertexShader:ge.depth_vert,fragmentShader:ge.depth_frag},normal:{uniforms:Xn([It.common,It.bumpmap,It.normalmap,It.displacementmap,{opacity:{value:1}}]),vertexShader:ge.meshnormal_vert,fragmentShader:ge.meshnormal_frag},sprite:{uniforms:Xn([It.sprite,It.fog]),vertexShader:ge.sprite_vert,fragmentShader:ge.sprite_frag},background:{uniforms:{uvTransform:{value:new me},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ge.background_vert,fragmentShader:ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new me}},vertexShader:ge.backgroundCube_vert,fragmentShader:ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ge.cube_vert,fragmentShader:ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ge.equirect_vert,fragmentShader:ge.equirect_frag},distanceRGBA:{uniforms:Xn([It.common,It.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ge.distanceRGBA_vert,fragmentShader:ge.distanceRGBA_frag},shadow:{uniforms:Xn([It.lights,It.fog,{color:{value:new Te(0)},opacity:{value:1}}]),vertexShader:ge.shadow_vert,fragmentShader:ge.shadow_frag}};Qi.physical={uniforms:Xn([Qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new me},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new me},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new me},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new me},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new me},sheen:{value:0},sheenColor:{value:new Te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new me},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new me},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new me},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new me},attenuationDistance:{value:0},attenuationColor:{value:new Te(0)},specularColor:{value:new Te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new me},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new me},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new me}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag};const vc={r:0,b:0,g:0},Vs=new Bi,R1=new $e;function C1(o,e,i,r,l,f,h){const d=new Te(0);let v=f===!0?0:1,p,g,m=null,y=0,x=null;function T(O){let D=O.isScene===!0?O.background:null;return D&&D.isTexture&&(D=(O.backgroundBlurriness>0?i:e).get(D)),D}function A(O){let D=!1;const H=T(O);H===null?S(d,v):H&&H.isColor&&(S(H,1),D=!0);const U=o.xr.getEnvironmentBlendMode();U==="additive"?r.buffers.color.setClear(0,0,0,1,h):U==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,h),(o.autoClear||D)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function M(O,D){const H=T(D);H&&(H.isCubeTexture||H.mapping===Nc)?(g===void 0&&(g=new Ai(new mo(1,1,1),new ds({name:"BackgroundCubeMaterial",uniforms:ho(Qi.backgroundCube.uniforms),vertexShader:Qi.backgroundCube.vertexShader,fragmentShader:Qi.backgroundCube.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(U,N,G){this.matrixWorld.copyPosition(G.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),Vs.copy(D.backgroundRotation),Vs.x*=-1,Vs.y*=-1,Vs.z*=-1,H.isCubeTexture&&H.isRenderTargetTexture===!1&&(Vs.y*=-1,Vs.z*=-1),g.material.uniforms.envMap.value=H,g.material.uniforms.flipEnvMap.value=H.isCubeTexture&&H.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(R1.makeRotationFromEuler(Vs)),g.material.toneMapped=Ne.getTransfer(H.colorSpace)!==Xe,(m!==H||y!==H.version||x!==o.toneMapping)&&(g.material.needsUpdate=!0,m=H,y=H.version,x=o.toneMapping),g.layers.enableAll(),O.unshift(g,g.geometry,g.material,0,0,null)):H&&H.isTexture&&(p===void 0&&(p=new Ai(new bl(2,2),new ds({name:"BackgroundMaterial",uniforms:ho(Qi.background.uniforms),vertexShader:Qi.background.vertexShader,fragmentShader:Qi.background.fragmentShader,side:hs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=H,p.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,p.material.toneMapped=Ne.getTransfer(H.colorSpace)!==Xe,H.matrixAutoUpdate===!0&&H.updateMatrix(),p.material.uniforms.uvTransform.value.copy(H.matrix),(m!==H||y!==H.version||x!==o.toneMapping)&&(p.material.needsUpdate=!0,m=H,y=H.version,x=o.toneMapping),p.layers.enableAll(),O.unshift(p,p.geometry,p.material,0,0,null))}function S(O,D){O.getRGB(vc,jy(o)),r.buffers.color.setClear(vc.r,vc.g,vc.b,D,h)}function I(){g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(O,D=1){d.set(O),v=D,S(d,v)},getClearAlpha:function(){return v},setClearAlpha:function(O){v=O,S(d,v)},render:A,addToRenderList:M,dispose:I}}function w1(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),r={},l=y(null);let f=l,h=!1;function d(w,B,j,it,ot){let ct=!1;const V=m(it,j,B);f!==V&&(f=V,p(f.object)),ct=x(w,it,j,ot),ct&&T(w,it,j,ot),ot!==null&&e.update(ot,o.ELEMENT_ARRAY_BUFFER),(ct||h)&&(h=!1,D(w,B,j,it),ot!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(ot).buffer))}function v(){return o.createVertexArray()}function p(w){return o.bindVertexArray(w)}function g(w){return o.deleteVertexArray(w)}function m(w,B,j){const it=j.wireframe===!0;let ot=r[w.id];ot===void 0&&(ot={},r[w.id]=ot);let ct=ot[B.id];ct===void 0&&(ct={},ot[B.id]=ct);let V=ct[it];return V===void 0&&(V=y(v()),ct[it]=V),V}function y(w){const B=[],j=[],it=[];for(let ot=0;ot<i;ot++)B[ot]=0,j[ot]=0,it[ot]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:j,attributeDivisors:it,object:w,attributes:{},index:null}}function x(w,B,j,it){const ot=f.attributes,ct=B.attributes;let V=0;const lt=j.getAttributes();for(const q in lt)if(lt[q].location>=0){const St=ot[q];let Ht=ct[q];if(Ht===void 0&&(q==="instanceMatrix"&&w.instanceMatrix&&(Ht=w.instanceMatrix),q==="instanceColor"&&w.instanceColor&&(Ht=w.instanceColor)),St===void 0||St.attribute!==Ht||Ht&&St.data!==Ht.data)return!0;V++}return f.attributesNum!==V||f.index!==it}function T(w,B,j,it){const ot={},ct=B.attributes;let V=0;const lt=j.getAttributes();for(const q in lt)if(lt[q].location>=0){let St=ct[q];St===void 0&&(q==="instanceMatrix"&&w.instanceMatrix&&(St=w.instanceMatrix),q==="instanceColor"&&w.instanceColor&&(St=w.instanceColor));const Ht={};Ht.attribute=St,St&&St.data&&(Ht.data=St.data),ot[q]=Ht,V++}f.attributes=ot,f.attributesNum=V,f.index=it}function A(){const w=f.newAttributes;for(let B=0,j=w.length;B<j;B++)w[B]=0}function M(w){S(w,0)}function S(w,B){const j=f.newAttributes,it=f.enabledAttributes,ot=f.attributeDivisors;j[w]=1,it[w]===0&&(o.enableVertexAttribArray(w),it[w]=1),ot[w]!==B&&(o.vertexAttribDivisor(w,B),ot[w]=B)}function I(){const w=f.newAttributes,B=f.enabledAttributes;for(let j=0,it=B.length;j<it;j++)B[j]!==w[j]&&(o.disableVertexAttribArray(j),B[j]=0)}function O(w,B,j,it,ot,ct,V){V===!0?o.vertexAttribIPointer(w,B,j,ot,ct):o.vertexAttribPointer(w,B,j,it,ot,ct)}function D(w,B,j,it){A();const ot=it.attributes,ct=j.getAttributes(),V=B.defaultAttributeValues;for(const lt in ct){const q=ct[lt];if(q.location>=0){let _t=ot[lt];if(_t===void 0&&(lt==="instanceMatrix"&&w.instanceMatrix&&(_t=w.instanceMatrix),lt==="instanceColor"&&w.instanceColor&&(_t=w.instanceColor)),_t!==void 0){const St=_t.normalized,Ht=_t.itemSize,re=e.get(_t);if(re===void 0)continue;const xe=re.buffer,F=re.type,ft=re.bytesPerElement,$=F===o.INT||F===o.UNSIGNED_INT||_t.gpuType===Hp;if(_t.isInterleavedBufferAttribute){const at=_t.data,xt=at.stride,Nt=_t.offset;if(at.isInstancedInterleavedBuffer){for(let At=0;At<q.locationSize;At++)S(q.location+At,at.meshPerAttribute);w.isInstancedMesh!==!0&&it._maxInstanceCount===void 0&&(it._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let At=0;At<q.locationSize;At++)M(q.location+At);o.bindBuffer(o.ARRAY_BUFFER,xe);for(let At=0;At<q.locationSize;At++)O(q.location+At,Ht/q.locationSize,F,St,xt*ft,(Nt+Ht/q.locationSize*At)*ft,$)}else{if(_t.isInstancedBufferAttribute){for(let at=0;at<q.locationSize;at++)S(q.location+at,_t.meshPerAttribute);w.isInstancedMesh!==!0&&it._maxInstanceCount===void 0&&(it._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let at=0;at<q.locationSize;at++)M(q.location+at);o.bindBuffer(o.ARRAY_BUFFER,xe);for(let at=0;at<q.locationSize;at++)O(q.location+at,Ht/q.locationSize,F,St,Ht*ft,Ht/q.locationSize*at*ft,$)}}else if(V!==void 0){const St=V[lt];if(St!==void 0)switch(St.length){case 2:o.vertexAttrib2fv(q.location,St);break;case 3:o.vertexAttrib3fv(q.location,St);break;case 4:o.vertexAttrib4fv(q.location,St);break;default:o.vertexAttrib1fv(q.location,St)}}}}I()}function H(){G();for(const w in r){const B=r[w];for(const j in B){const it=B[j];for(const ot in it)g(it[ot].object),delete it[ot];delete B[j]}delete r[w]}}function U(w){if(r[w.id]===void 0)return;const B=r[w.id];for(const j in B){const it=B[j];for(const ot in it)g(it[ot].object),delete it[ot];delete B[j]}delete r[w.id]}function N(w){for(const B in r){const j=r[B];if(j[w.id]===void 0)continue;const it=j[w.id];for(const ot in it)g(it[ot].object),delete it[ot];delete j[w.id]}}function G(){C(),h=!0,f!==l&&(f=l,p(f.object))}function C(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:G,resetDefaultState:C,dispose:H,releaseStatesOfGeometry:U,releaseStatesOfProgram:N,initAttributes:A,enableAttribute:M,disableUnusedAttributes:I}}function D1(o,e,i){let r;function l(p){r=p}function f(p,g){o.drawArrays(r,p,g),i.update(g,r,1)}function h(p,g,m){m!==0&&(o.drawArraysInstanced(r,p,g,m),i.update(g,r,m))}function d(p,g,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,g,0,m);let x=0;for(let T=0;T<m;T++)x+=g[T];i.update(x,r,1)}function v(p,g,m,y){if(m===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let T=0;T<p.length;T++)h(p[T],g[T],y[T]);else{x.multiDrawArraysInstancedWEBGL(r,p,0,g,0,y,0,m);let T=0;for(let A=0;A<m;A++)T+=g[A]*y[A];i.update(T,r,1)}}this.setMode=l,this.render=f,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=v}function U1(o,e,i,r){let l;function f(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const N=e.get("EXT_texture_filter_anisotropic");l=o.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(N){return!(N!==zi&&r.convert(N)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(N){const G=N===Tl&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==ta&&r.convert(N)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==Aa&&!G)}function v(N){if(N==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const g=v(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const m=i.logarithmicDepthBuffer===!0,y=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),x=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),T=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=o.getParameter(o.MAX_TEXTURE_SIZE),M=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),S=o.getParameter(o.MAX_VERTEX_ATTRIBS),I=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),O=o.getParameter(o.MAX_VARYING_VECTORS),D=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),H=T>0,U=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:f,getMaxPrecision:v,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:m,reversedDepthBuffer:y,maxTextures:x,maxVertexTextures:T,maxTextureSize:A,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:I,maxVaryings:O,maxFragmentUniforms:D,vertexTextures:H,maxSamples:U}}function N1(o){const e=this;let i=null,r=0,l=!1,f=!1;const h=new ls,d=new me,v={value:null,needsUpdate:!1};this.uniform=v,this.numPlanes=0,this.numIntersection=0,this.init=function(m,y){const x=m.length!==0||y||r!==0||l;return l=y,r=m.length,x},this.beginShadows=function(){f=!0,g(null)},this.endShadows=function(){f=!1},this.setGlobalState=function(m,y){i=g(m,y,0)},this.setState=function(m,y,x){const T=m.clippingPlanes,A=m.clipIntersection,M=m.clipShadows,S=o.get(m);if(!l||T===null||T.length===0||f&&!M)f?g(null):p();else{const I=f?0:r,O=I*4;let D=S.clippingState||null;v.value=D,D=g(T,y,O,x);for(let H=0;H!==O;++H)D[H]=i[H];S.clippingState=D,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=I}};function p(){v.value!==i&&(v.value=i,v.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function g(m,y,x,T){const A=m!==null?m.length:0;let M=null;if(A!==0){if(M=v.value,T!==!0||M===null){const S=x+A*4,I=y.matrixWorldInverse;d.getNormalMatrix(I),(M===null||M.length<S)&&(M=new Float32Array(S));for(let O=0,D=x;O!==A;++O,D+=4)h.copy(m[O]).applyMatrix4(I,d),h.normal.toArray(M,D),M[D+3]=h.constant}v.value=M,v.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,M}}function L1(o){let e=new WeakMap;function i(h,d){return d===ip?h.mapping=uo:d===ap&&(h.mapping=co),h}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===ip||d===ap)if(e.has(h)){const v=e.get(h).texture;return i(v,h.mapping)}else{const v=h.image;if(v&&v.height>0){const p=new ET(v.height);return p.fromEquirectangularTexture(o,h),e.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const v=e.get(d);v!==void 0&&(e.delete(d),v.dispose())}function f(){e=new WeakMap}return{get:r,dispose:f}}const io=4,ty=[.125,.215,.35,.446,.526,.582],qs=20,Gd=new tS,ey=new Te;let Vd=null,Xd=0,kd=0,Yd=!1;const ks=(1+Math.sqrt(5))/2,to=1/ks,ny=[new Q(-ks,to,0),new Q(ks,to,0),new Q(-to,0,ks),new Q(to,0,ks),new Q(0,ks,-to),new Q(0,ks,to),new Q(-1,1,-1),new Q(1,1,-1),new Q(-1,1,1),new Q(1,1,1)],O1=new Q;class iy{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,r=.1,l=100,f={}){const{size:h=256,position:d=O1}=f;Vd=this._renderer.getRenderTarget(),Xd=this._renderer.getActiveCubeFace(),kd=this._renderer.getActiveMipmapLevel(),Yd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const v=this._allocateTargets();return v.depthBuffer=!0,this._sceneToCubeUV(e,r,l,v,d),i>0&&this._blur(v,0,0,i),this._applyPMREM(v),this._cleanup(v),v}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ry(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sy(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Vd,Xd,kd),this._renderer.xr.enabled=Yd,e.scissorTest=!1,yc(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===uo||e.mapping===co?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vd=this._renderer.getRenderTarget(),Xd=this._renderer.getActiveCubeFace(),kd=this._renderer.getActiveMipmapLevel(),Yd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Ji,minFilter:Ji,generateMipmaps:!1,type:Tl,format:zi,colorSpace:fo,depthBuffer:!1},l=ay(e,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ay(e,i,r);const{_lodMax:f}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=P1(f)),this._blurMaterial=z1(f,e,i)}return l}_compileMaterial(e){const i=new Ai(this._lodPlanes[0],e);this._renderer.compile(i,Gd)}_sceneToCubeUV(e,i,r,l,f){const v=new Ti(90,1,i,r),p=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],m=this._renderer,y=m.autoClear,x=m.toneMapping;m.getClearColor(ey),m.toneMapping=fs,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(l),m.clearDepth(),m.setRenderTarget(null));const A=new Yy({name:"PMREM.Background",side:Jn,depthWrite:!1,depthTest:!1}),M=new Ai(new mo,A);let S=!1;const I=e.background;I?I.isColor&&(A.color.copy(I),e.background=null,S=!0):(A.color.copy(ey),S=!0);for(let O=0;O<6;O++){const D=O%3;D===0?(v.up.set(0,p[O],0),v.position.set(f.x,f.y,f.z),v.lookAt(f.x+g[O],f.y,f.z)):D===1?(v.up.set(0,0,p[O]),v.position.set(f.x,f.y,f.z),v.lookAt(f.x,f.y+g[O],f.z)):(v.up.set(0,p[O],0),v.position.set(f.x,f.y,f.z),v.lookAt(f.x,f.y,f.z+g[O]));const H=this._cubeSize;yc(l,D*H,O>2?H:0,H,H),m.setRenderTarget(l),S&&m.render(M,v),m.render(e,v)}M.geometry.dispose(),M.material.dispose(),m.toneMapping=x,m.autoClear=y,e.background=I}_textureToCubeUV(e,i){const r=this._renderer,l=e.mapping===uo||e.mapping===co;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=ry()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sy());const f=l?this._cubemapMaterial:this._equirectMaterial,h=new Ai(this._lodPlanes[0],f),d=f.uniforms;d.envMap.value=e;const v=this._cubeSize;yc(i,0,0,3*v,2*v),r.setRenderTarget(i),r.render(h,Gd)}_applyPMREM(e){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let f=1;f<l;f++){const h=Math.sqrt(this._sigmas[f]*this._sigmas[f]-this._sigmas[f-1]*this._sigmas[f-1]),d=ny[(l-f-1)%ny.length];this._blur(e,f-1,f,h,d)}i.autoClear=r}_blur(e,i,r,l,f){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,r,l,"latitudinal",f),this._halfBlur(h,e,r,r,l,"longitudinal",f)}_halfBlur(e,i,r,l,f,h,d){const v=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,m=new Ai(this._lodPlanes[l],p),y=p.uniforms,x=this._sizeLods[r]-1,T=isFinite(f)?Math.PI/(2*x):2*Math.PI/(2*qs-1),A=f/T,M=isFinite(f)?1+Math.floor(g*A):qs;M>qs&&console.warn(`sigmaRadians, ${f}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${qs}`);const S=[];let I=0;for(let N=0;N<qs;++N){const G=N/A,C=Math.exp(-G*G/2);S.push(C),N===0?I+=C:N<M&&(I+=2*C)}for(let N=0;N<S.length;N++)S[N]=S[N]/I;y.envMap.value=e.texture,y.samples.value=M,y.weights.value=S,y.latitudinal.value=h==="latitudinal",d&&(y.poleAxis.value=d);const{_lodMax:O}=this;y.dTheta.value=T,y.mipInt.value=O-r;const D=this._sizeLods[l],H=3*D*(l>O-io?l-O+io:0),U=4*(this._cubeSize-D);yc(i,H,U,3*D,2*D),v.setRenderTarget(i),v.render(m,Gd)}}function P1(o){const e=[],i=[],r=[];let l=o;const f=o-io+1+ty.length;for(let h=0;h<f;h++){const d=Math.pow(2,l);i.push(d);let v=1/d;h>o-io?v=ty[h-o+io-1]:h===0&&(v=0),r.push(v);const p=1/(d-2),g=-p,m=1+p,y=[g,g,m,g,m,m,g,g,m,m,g,m],x=6,T=6,A=3,M=2,S=1,I=new Float32Array(A*T*x),O=new Float32Array(M*T*x),D=new Float32Array(S*T*x);for(let U=0;U<x;U++){const N=U%3*2/3-1,G=U>2?0:-1,C=[N,G,0,N+2/3,G,0,N+2/3,G+1,0,N,G,0,N+2/3,G+1,0,N,G+1,0];I.set(C,A*T*U),O.set(y,M*T*U);const w=[U,U,U,U,U,U];D.set(w,S*T*U)}const H=new Yn;H.setAttribute("position",new hi(I,A)),H.setAttribute("uv",new hi(O,M)),H.setAttribute("faceIndex",new hi(D,S)),e.push(H),l>io&&l--}return{lodPlanes:e,sizeLods:i,sigmas:r}}function ay(o,e,i){const r=new Qs(o,e,i);return r.texture.mapping=Nc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function yc(o,e,i,r,l){o.viewport.set(e,i,r,l),o.scissor.set(e,i,r,l)}function z1(o,e,i){const r=new Float32Array(qs),l=new Q(0,1,0);return new ds({name:"SphericalGaussianBlur",defines:{n:qs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:tm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:cs,depthTest:!1,depthWrite:!1})}function sy(){return new ds({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:cs,depthTest:!1,depthWrite:!1})}function ry(){return new ds({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:cs,depthTest:!1,depthWrite:!1})}function tm(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function I1(o){let e=new WeakMap,i=null;function r(d){if(d&&d.isTexture){const v=d.mapping,p=v===ip||v===ap,g=v===uo||v===co;if(p||g){let m=e.get(d);const y=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==y)return i===null&&(i=new iy(o)),m=p?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{const x=d.image;return p&&x&&x.height>0||g&&x&&l(x)?(i===null&&(i=new iy(o)),m=p?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",f),m.texture):null}}}return d}function l(d){let v=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&v++;return v===p}function f(d){const v=d.target;v.removeEventListener("dispose",f);const p=e.get(v);p!==void 0&&(e.delete(v),p.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function B1(o){const e={};function i(r){if(e[r]!==void 0)return e[r];let l;switch(r){case"WEBGL_depth_texture":l=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=o.getExtension(r)}return e[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&El("THREE.WebGLRenderer: "+r+" extension not supported."),l}}}function F1(o,e,i,r){const l={},f=new WeakMap;function h(m){const y=m.target;y.index!==null&&e.remove(y.index);for(const T in y.attributes)e.remove(y.attributes[T]);y.removeEventListener("dispose",h),delete l[y.id];const x=f.get(y);x&&(e.remove(x),f.delete(y)),r.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,i.memory.geometries--}function d(m,y){return l[y.id]===!0||(y.addEventListener("dispose",h),l[y.id]=!0,i.memory.geometries++),y}function v(m){const y=m.attributes;for(const x in y)e.update(y[x],o.ARRAY_BUFFER)}function p(m){const y=[],x=m.index,T=m.attributes.position;let A=0;if(x!==null){const I=x.array;A=x.version;for(let O=0,D=I.length;O<D;O+=3){const H=I[O+0],U=I[O+1],N=I[O+2];y.push(H,U,U,N,N,H)}}else if(T!==void 0){const I=T.array;A=T.version;for(let O=0,D=I.length/3-1;O<D;O+=3){const H=O+0,U=O+1,N=O+2;y.push(H,U,U,N,N,H)}}else return;const M=new(Vy(y)?Wy:qy)(y,1);M.version=A;const S=f.get(m);S&&e.remove(S),f.set(m,M)}function g(m){const y=f.get(m);if(y){const x=m.index;x!==null&&y.version<x.version&&p(m)}else p(m);return f.get(m)}return{get:d,update:v,getWireframeAttribute:g}}function H1(o,e,i){let r;function l(y){r=y}let f,h;function d(y){f=y.type,h=y.bytesPerElement}function v(y,x){o.drawElements(r,x,f,y*h),i.update(x,r,1)}function p(y,x,T){T!==0&&(o.drawElementsInstanced(r,x,f,y*h,T),i.update(x,r,T))}function g(y,x,T){if(T===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,x,0,f,y,0,T);let M=0;for(let S=0;S<T;S++)M+=x[S];i.update(M,r,1)}function m(y,x,T,A){if(T===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let S=0;S<y.length;S++)p(y[S]/h,x[S],A[S]);else{M.multiDrawElementsInstancedWEBGL(r,x,0,f,y,0,A,0,T);let S=0;for(let I=0;I<T;I++)S+=x[I]*A[I];i.update(S,r,1)}}this.setMode=l,this.setIndex=d,this.render=v,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=m}function G1(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(f,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(f/3);break;case o.LINES:i.lines+=d*(f/2);break;case o.LINE_STRIP:i.lines+=d*(f-1);break;case o.LINE_LOOP:i.lines+=d*f;break;case o.POINTS:i.points+=d*f;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:r}}function V1(o,e,i){const r=new WeakMap,l=new rn;function f(h,d,v){const p=h.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,m=g!==void 0?g.length:0;let y=r.get(d);if(y===void 0||y.count!==m){let C=function(){N.dispose(),r.delete(d),d.removeEventListener("dispose",C)};y!==void 0&&y.texture.dispose();const x=d.morphAttributes.position!==void 0,T=d.morphAttributes.normal!==void 0,A=d.morphAttributes.color!==void 0,M=d.morphAttributes.position||[],S=d.morphAttributes.normal||[],I=d.morphAttributes.color||[];let O=0;x===!0&&(O=1),T===!0&&(O=2),A===!0&&(O=3);let D=d.attributes.position.count*O,H=1;D>e.maxTextureSize&&(H=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const U=new Float32Array(D*H*4*m),N=new Xy(U,D,H,m);N.type=Aa,N.needsUpdate=!0;const G=O*4;for(let w=0;w<m;w++){const B=M[w],j=S[w],it=I[w],ot=D*H*4*w;for(let ct=0;ct<B.count;ct++){const V=ct*G;x===!0&&(l.fromBufferAttribute(B,ct),U[ot+V+0]=l.x,U[ot+V+1]=l.y,U[ot+V+2]=l.z,U[ot+V+3]=0),T===!0&&(l.fromBufferAttribute(j,ct),U[ot+V+4]=l.x,U[ot+V+5]=l.y,U[ot+V+6]=l.z,U[ot+V+7]=0),A===!0&&(l.fromBufferAttribute(it,ct),U[ot+V+8]=l.x,U[ot+V+9]=l.y,U[ot+V+10]=l.z,U[ot+V+11]=it.itemSize===4?l.w:1)}}y={count:m,texture:N,size:new fe(D,H)},r.set(d,y),d.addEventListener("dispose",C)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)v.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let x=0;for(let A=0;A<p.length;A++)x+=p[A];const T=d.morphTargetsRelative?1:1-x;v.getUniforms().setValue(o,"morphTargetBaseInfluence",T),v.getUniforms().setValue(o,"morphTargetInfluences",p)}v.getUniforms().setValue(o,"morphTargetsTexture",y.texture,i),v.getUniforms().setValue(o,"morphTargetsTextureSize",y.size)}return{update:f}}function X1(o,e,i,r){let l=new WeakMap;function f(v){const p=r.render.frame,g=v.geometry,m=e.get(v,g);if(l.get(m)!==p&&(e.update(m),l.set(m,p)),v.isInstancedMesh&&(v.hasEventListener("dispose",d)===!1&&v.addEventListener("dispose",d),l.get(v)!==p&&(i.update(v.instanceMatrix,o.ARRAY_BUFFER),v.instanceColor!==null&&i.update(v.instanceColor,o.ARRAY_BUFFER),l.set(v,p))),v.isSkinnedMesh){const y=v.skeleton;l.get(y)!==p&&(y.update(),l.set(y,p))}return m}function h(){l=new WeakMap}function d(v){const p=v.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:f,dispose:h}}const nS=new $n,oy=new Qy(1,1),iS=new Xy,aS=new rT,sS=new Ky,ly=[],uy=[],cy=new Float32Array(16),fy=new Float32Array(9),hy=new Float32Array(4);function go(o,e,i){const r=o[0];if(r<=0||r>0)return o;const l=e*i;let f=ly[l];if(f===void 0&&(f=new Float32Array(l),ly[l]=f),e!==0){r.toArray(f,0);for(let h=1,d=0;h!==e;++h)d+=i,o[h].toArray(f,d)}return f}function yn(o,e){if(o.length!==e.length)return!1;for(let i=0,r=o.length;i<r;i++)if(o[i]!==e[i])return!1;return!0}function Sn(o,e){for(let i=0,r=e.length;i<r;i++)o[i]=e[i]}function Pc(o,e){let i=uy[e];i===void 0&&(i=new Int32Array(e),uy[e]=i);for(let r=0;r!==e;++r)i[r]=o.allocateTextureUnit();return i}function k1(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function Y1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(yn(i,e))return;o.uniform2fv(this.addr,e),Sn(i,e)}}function q1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(yn(i,e))return;o.uniform3fv(this.addr,e),Sn(i,e)}}function W1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(yn(i,e))return;o.uniform4fv(this.addr,e),Sn(i,e)}}function j1(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(yn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),Sn(i,e)}else{if(yn(i,r))return;hy.set(r),o.uniformMatrix2fv(this.addr,!1,hy),Sn(i,r)}}function Z1(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(yn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),Sn(i,e)}else{if(yn(i,r))return;fy.set(r),o.uniformMatrix3fv(this.addr,!1,fy),Sn(i,r)}}function K1(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(yn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),Sn(i,e)}else{if(yn(i,r))return;cy.set(r),o.uniformMatrix4fv(this.addr,!1,cy),Sn(i,r)}}function Q1(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function J1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(yn(i,e))return;o.uniform2iv(this.addr,e),Sn(i,e)}}function $1(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(yn(i,e))return;o.uniform3iv(this.addr,e),Sn(i,e)}}function tR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(yn(i,e))return;o.uniform4iv(this.addr,e),Sn(i,e)}}function eR(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function nR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(yn(i,e))return;o.uniform2uiv(this.addr,e),Sn(i,e)}}function iR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(yn(i,e))return;o.uniform3uiv(this.addr,e),Sn(i,e)}}function aR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(yn(i,e))return;o.uniform4uiv(this.addr,e),Sn(i,e)}}function sR(o,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l);let f;this.type===o.SAMPLER_2D_SHADOW?(oy.compareFunction=Gy,f=oy):f=nS,i.setTexture2D(e||f,l)}function rR(o,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(e||aS,l)}function oR(o,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(e||sS,l)}function lR(o,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(e||iS,l)}function uR(o){switch(o){case 5126:return k1;case 35664:return Y1;case 35665:return q1;case 35666:return W1;case 35674:return j1;case 35675:return Z1;case 35676:return K1;case 5124:case 35670:return Q1;case 35667:case 35671:return J1;case 35668:case 35672:return $1;case 35669:case 35673:return tR;case 5125:return eR;case 36294:return nR;case 36295:return iR;case 36296:return aR;case 35678:case 36198:case 36298:case 36306:case 35682:return sR;case 35679:case 36299:case 36307:return rR;case 35680:case 36300:case 36308:case 36293:return oR;case 36289:case 36303:case 36311:case 36292:return lR}}function cR(o,e){o.uniform1fv(this.addr,e)}function fR(o,e){const i=go(e,this.size,2);o.uniform2fv(this.addr,i)}function hR(o,e){const i=go(e,this.size,3);o.uniform3fv(this.addr,i)}function dR(o,e){const i=go(e,this.size,4);o.uniform4fv(this.addr,i)}function pR(o,e){const i=go(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function mR(o,e){const i=go(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function gR(o,e){const i=go(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function _R(o,e){o.uniform1iv(this.addr,e)}function vR(o,e){o.uniform2iv(this.addr,e)}function yR(o,e){o.uniform3iv(this.addr,e)}function SR(o,e){o.uniform4iv(this.addr,e)}function xR(o,e){o.uniform1uiv(this.addr,e)}function MR(o,e){o.uniform2uiv(this.addr,e)}function ER(o,e){o.uniform3uiv(this.addr,e)}function TR(o,e){o.uniform4uiv(this.addr,e)}function bR(o,e,i){const r=this.cache,l=e.length,f=Pc(i,l);yn(r,f)||(o.uniform1iv(this.addr,f),Sn(r,f));for(let h=0;h!==l;++h)i.setTexture2D(e[h]||nS,f[h])}function AR(o,e,i){const r=this.cache,l=e.length,f=Pc(i,l);yn(r,f)||(o.uniform1iv(this.addr,f),Sn(r,f));for(let h=0;h!==l;++h)i.setTexture3D(e[h]||aS,f[h])}function RR(o,e,i){const r=this.cache,l=e.length,f=Pc(i,l);yn(r,f)||(o.uniform1iv(this.addr,f),Sn(r,f));for(let h=0;h!==l;++h)i.setTextureCube(e[h]||sS,f[h])}function CR(o,e,i){const r=this.cache,l=e.length,f=Pc(i,l);yn(r,f)||(o.uniform1iv(this.addr,f),Sn(r,f));for(let h=0;h!==l;++h)i.setTexture2DArray(e[h]||iS,f[h])}function wR(o){switch(o){case 5126:return cR;case 35664:return fR;case 35665:return hR;case 35666:return dR;case 35674:return pR;case 35675:return mR;case 35676:return gR;case 5124:case 35670:return _R;case 35667:case 35671:return vR;case 35668:case 35672:return yR;case 35669:case 35673:return SR;case 5125:return xR;case 36294:return MR;case 36295:return ER;case 36296:return TR;case 35678:case 36198:case 36298:case 36306:case 35682:return bR;case 35679:case 36299:case 36307:return AR;case 35680:case 36300:case 36308:case 36293:return RR;case 36289:case 36303:case 36311:case 36292:return CR}}class DR{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.setValue=uR(i.type)}}class UR{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=wR(i.type)}}class NR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,r){const l=this.seq;for(let f=0,h=l.length;f!==h;++f){const d=l[f];d.setValue(e,i[d.id],r)}}}const qd=/(\w+)(\])?(\[|\.)?/g;function dy(o,e){o.seq.push(e),o.map[e.id]=e}function LR(o,e,i){const r=o.name,l=r.length;for(qd.lastIndex=0;;){const f=qd.exec(r),h=qd.lastIndex;let d=f[1];const v=f[2]==="]",p=f[3];if(v&&(d=d|0),p===void 0||p==="["&&h+2===l){dy(i,p===void 0?new DR(d,o,e):new UR(d,o,e));break}else{let m=i.map[d];m===void 0&&(m=new NR(d),dy(i,m)),i=m}}}class Ac{constructor(e,i){this.seq=[],this.map={};const r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let l=0;l<r;++l){const f=e.getActiveUniform(i,l),h=e.getUniformLocation(i,f.name);LR(f,h,this)}}setValue(e,i,r,l){const f=this.map[i];f!==void 0&&f.setValue(e,r,l)}setOptional(e,i,r){const l=i[r];l!==void 0&&this.setValue(e,r,l)}static upload(e,i,r,l){for(let f=0,h=i.length;f!==h;++f){const d=i[f],v=r[d.id];v.needsUpdate!==!1&&d.setValue(e,v.value,l)}}static seqWithValue(e,i){const r=[];for(let l=0,f=e.length;l!==f;++l){const h=e[l];h.id in i&&r.push(h)}return r}}function py(o,e,i){const r=o.createShader(e);return o.shaderSource(r,i),o.compileShader(r),r}const OR=37297;let PR=0;function zR(o,e){const i=o.split(`
`),r=[],l=Math.max(e-6,0),f=Math.min(e+6,i.length);for(let h=l;h<f;h++){const d=h+1;r.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return r.join(`
`)}const my=new me;function IR(o){Ne._getMatrix(my,Ne.workingColorSpace,o);const e=`mat3( ${my.elements.map(i=>i.toFixed(4))} )`;switch(Ne.getTransfer(o)){case Rc:return[e,"LinearTransferOETF"];case Xe:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function gy(o,e,i){const r=o.getShaderParameter(e,o.COMPILE_STATUS),f=(o.getShaderInfoLog(e)||"").trim();if(r&&f==="")return"";const h=/ERROR: 0:(\d+)/.exec(f);if(h){const d=parseInt(h[1]);return i.toUpperCase()+`

`+f+`

`+zR(o.getShaderSource(e),d)}else return f}function BR(o,e){const i=IR(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function FR(o,e){let i;switch(e){case yE:i="Linear";break;case SE:i="Reinhard";break;case xE:i="Cineon";break;case ME:i="ACESFilmic";break;case TE:i="AgX";break;case bE:i="Neutral";break;case EE:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Sc=new Q;function HR(){Ne.getLuminanceCoefficients(Sc);const o=Sc.x.toFixed(4),e=Sc.y.toFixed(4),i=Sc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function GR(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ml).join(`
`)}function VR(o){const e=[];for(const i in o){const r=o[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function XR(o,e){const i={},r=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const f=o.getActiveAttrib(e,l),h=f.name;let d=1;f.type===o.FLOAT_MAT2&&(d=2),f.type===o.FLOAT_MAT3&&(d=3),f.type===o.FLOAT_MAT4&&(d=4),i[h]={type:f.type,location:o.getAttribLocation(e,h),locationSize:d}}return i}function ml(o){return o!==""}function _y(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vy(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const kR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ip(o){return o.replace(kR,qR)}const YR=new Map;function qR(o,e){let i=ge[e];if(i===void 0){const r=YR.get(e);if(r!==void 0)i=ge[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Ip(i)}const WR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yy(o){return o.replace(WR,jR)}function jR(o,e,i,r){let l="";for(let f=parseInt(e);f<parseInt(i);f++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+f+" ]").replace(/UNROLLED_LOOP_INDEX/g,f);return l}function Sy(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ZR(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===Cy?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===wy?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Ea&&(e="SHADOWMAP_TYPE_VSM"),e}function KR(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case uo:case co:e="ENVMAP_TYPE_CUBE";break;case Nc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function QR(o){let e="ENVMAP_MODE_REFLECTION";return o.envMap&&o.envMapMode===co&&(e="ENVMAP_MODE_REFRACTION"),e}function JR(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case Dy:e="ENVMAP_BLENDING_MULTIPLY";break;case _E:e="ENVMAP_BLENDING_MIX";break;case vE:e="ENVMAP_BLENDING_ADD";break}return e}function $R(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function tC(o,e,i,r){const l=o.getContext(),f=i.defines;let h=i.vertexShader,d=i.fragmentShader;const v=ZR(i),p=KR(i),g=QR(i),m=JR(i),y=$R(i),x=GR(i),T=VR(f),A=l.createProgram();let M,S,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(ml).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(ml).join(`
`),S.length>0&&(S+=`
`)):(M=[Sy(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+v:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ml).join(`
`),S=[Sy(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+g:"",i.envMap?"#define "+m:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+v:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==fs?"#define TONE_MAPPING":"",i.toneMapping!==fs?ge.tonemapping_pars_fragment:"",i.toneMapping!==fs?FR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ge.colorspace_pars_fragment,BR("linearToOutputTexel",i.outputColorSpace),HR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(ml).join(`
`)),h=Ip(h),h=_y(h,i),h=vy(h,i),d=Ip(d),d=_y(d,i),d=vy(d,i),h=yy(h),d=yy(d),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,M=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",i.glslVersion===Ev?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Ev?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const O=I+M+h,D=I+S+d,H=py(l,l.VERTEX_SHADER,O),U=py(l,l.FRAGMENT_SHADER,D);l.attachShader(A,H),l.attachShader(A,U),i.index0AttributeName!==void 0?l.bindAttribLocation(A,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(A,0,"position"),l.linkProgram(A);function N(B){if(o.debug.checkShaderErrors){const j=l.getProgramInfoLog(A)||"",it=l.getShaderInfoLog(H)||"",ot=l.getShaderInfoLog(U)||"",ct=j.trim(),V=it.trim(),lt=ot.trim();let q=!0,_t=!0;if(l.getProgramParameter(A,l.LINK_STATUS)===!1)if(q=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,A,H,U);else{const St=gy(l,H,"vertex"),Ht=gy(l,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(A,l.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+ct+`
`+St+`
`+Ht)}else ct!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ct):(V===""||lt==="")&&(_t=!1);_t&&(B.diagnostics={runnable:q,programLog:ct,vertexShader:{log:V,prefix:M},fragmentShader:{log:lt,prefix:S}})}l.deleteShader(H),l.deleteShader(U),G=new Ac(l,A),C=XR(l,A)}let G;this.getUniforms=function(){return G===void 0&&N(this),G};let C;this.getAttributes=function(){return C===void 0&&N(this),C};let w=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=l.getProgramParameter(A,OR)),w},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(A),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=PR++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=H,this.fragmentShader=U,this}let eC=0;class nC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,r=e.fragmentShader,l=this._getShaderStage(i),f=this._getShaderStage(r),h=this._getShaderCacheForMaterial(e);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(f)===!1&&(h.add(f),f.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let r=i.get(e);return r===void 0&&(r=new Set,i.set(e,r)),r}_getShaderStage(e){const i=this.shaderCache;let r=i.get(e);return r===void 0&&(r=new iC(e),i.set(e,r)),r}}class iC{constructor(e){this.id=eC++,this.code=e,this.usedTimes=0}}function aC(o,e,i,r,l,f,h){const d=new jp,v=new nC,p=new Set,g=[],m=l.logarithmicDepthBuffer,y=l.vertexTextures;let x=l.precision;const T={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(C){return p.add(C),C===0?"uv":`uv${C}`}function M(C,w,B,j,it){const ot=j.fog,ct=it.geometry,V=C.isMeshStandardMaterial?j.environment:null,lt=(C.isMeshStandardMaterial?i:e).get(C.envMap||V),q=lt&&lt.mapping===Nc?lt.image.height:null,_t=T[C.type];C.precision!==null&&(x=l.getMaxPrecision(C.precision),x!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",x,"instead."));const St=ct.morphAttributes.position||ct.morphAttributes.normal||ct.morphAttributes.color,Ht=St!==void 0?St.length:0;let re=0;ct.morphAttributes.position!==void 0&&(re=1),ct.morphAttributes.normal!==void 0&&(re=2),ct.morphAttributes.color!==void 0&&(re=3);let xe,F,ft,$;if(_t){const be=Qi[_t];xe=be.vertexShader,F=be.fragmentShader}else xe=C.vertexShader,F=C.fragmentShader,v.update(C),ft=v.getVertexShaderID(C),$=v.getFragmentShaderID(C);const at=o.getRenderTarget(),xt=o.state.buffers.depth.getReversed(),Nt=it.isInstancedMesh===!0,At=it.isBatchedMesh===!0,Mt=!!C.map,vt=!!C.matcap,P=!!lt,oe=!!C.aoMap,Xt=!!C.lightMap,Gt=!!C.bumpMap,wt=!!C.normalMap,Zt=!!C.displacementMap,Bt=!!C.emissiveMap,le=!!C.metalnessMap,Ye=!!C.roughnessMap,We=C.anisotropy>0,L=C.clearcoat>0,b=C.dispersion>0,nt=C.iridescence>0,pt=C.sheen>0,yt=C.transmission>0,ht=We&&!!C.anisotropyMap,qt=L&&!!C.clearcoatMap,Ct=L&&!!C.clearcoatNormalMap,Qt=L&&!!C.clearcoatRoughnessMap,$t=nt&&!!C.iridescenceMap,bt=nt&&!!C.iridescenceThicknessMap,Ot=pt&&!!C.sheenColorMap,ae=pt&&!!C.sheenRoughnessMap,Jt=!!C.specularMap,Pt=!!C.specularColorMap,he=!!C.specularIntensityMap,k=yt&&!!C.transmissionMap,Rt=yt&&!!C.thicknessMap,Ut=!!C.gradientMap,Yt=!!C.alphaMap,Et=C.alphaTest>0,gt=!!C.alphaHash,Kt=!!C.extensions;let ce=fs;C.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(ce=o.toneMapping);const Ge={shaderID:_t,shaderType:C.type,shaderName:C.name,vertexShader:xe,fragmentShader:F,defines:C.defines,customVertexShaderID:ft,customFragmentShaderID:$,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:x,batching:At,batchingColor:At&&it._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&it.instanceColor!==null,instancingMorph:Nt&&it.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:at===null?o.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:fo,alphaToCoverage:!!C.alphaToCoverage,map:Mt,matcap:vt,envMap:P,envMapMode:P&&lt.mapping,envMapCubeUVHeight:q,aoMap:oe,lightMap:Xt,bumpMap:Gt,normalMap:wt,displacementMap:y&&Zt,emissiveMap:Bt,normalMapObjectSpace:wt&&C.normalMapType===wE,normalMapTangentSpace:wt&&C.normalMapType===Hy,metalnessMap:le,roughnessMap:Ye,anisotropy:We,anisotropyMap:ht,clearcoat:L,clearcoatMap:qt,clearcoatNormalMap:Ct,clearcoatRoughnessMap:Qt,dispersion:b,iridescence:nt,iridescenceMap:$t,iridescenceThicknessMap:bt,sheen:pt,sheenColorMap:Ot,sheenRoughnessMap:ae,specularMap:Jt,specularColorMap:Pt,specularIntensityMap:he,transmission:yt,transmissionMap:k,thicknessMap:Rt,gradientMap:Ut,opaque:C.transparent===!1&&C.blending===so&&C.alphaToCoverage===!1,alphaMap:Yt,alphaTest:Et,alphaHash:gt,combine:C.combine,mapUv:Mt&&A(C.map.channel),aoMapUv:oe&&A(C.aoMap.channel),lightMapUv:Xt&&A(C.lightMap.channel),bumpMapUv:Gt&&A(C.bumpMap.channel),normalMapUv:wt&&A(C.normalMap.channel),displacementMapUv:Zt&&A(C.displacementMap.channel),emissiveMapUv:Bt&&A(C.emissiveMap.channel),metalnessMapUv:le&&A(C.metalnessMap.channel),roughnessMapUv:Ye&&A(C.roughnessMap.channel),anisotropyMapUv:ht&&A(C.anisotropyMap.channel),clearcoatMapUv:qt&&A(C.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&A(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Qt&&A(C.clearcoatRoughnessMap.channel),iridescenceMapUv:$t&&A(C.iridescenceMap.channel),iridescenceThicknessMapUv:bt&&A(C.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&A(C.sheenColorMap.channel),sheenRoughnessMapUv:ae&&A(C.sheenRoughnessMap.channel),specularMapUv:Jt&&A(C.specularMap.channel),specularColorMapUv:Pt&&A(C.specularColorMap.channel),specularIntensityMapUv:he&&A(C.specularIntensityMap.channel),transmissionMapUv:k&&A(C.transmissionMap.channel),thicknessMapUv:Rt&&A(C.thicknessMap.channel),alphaMapUv:Yt&&A(C.alphaMap.channel),vertexTangents:!!ct.attributes.tangent&&(wt||We),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!ct.attributes.color&&ct.attributes.color.itemSize===4,pointsUvs:it.isPoints===!0&&!!ct.attributes.uv&&(Mt||Yt),fog:!!ot,useFog:C.fog===!0,fogExp2:!!ot&&ot.isFogExp2,flatShading:C.flatShading===!0&&C.wireframe===!1,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:xt,skinning:it.isSkinnedMesh===!0,morphTargets:ct.morphAttributes.position!==void 0,morphNormals:ct.morphAttributes.normal!==void 0,morphColors:ct.morphAttributes.color!==void 0,morphTargetsCount:Ht,morphTextureStride:re,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:C.dithering,shadowMapEnabled:o.shadowMap.enabled&&B.length>0,shadowMapType:o.shadowMap.type,toneMapping:ce,decodeVideoTexture:Mt&&C.map.isVideoTexture===!0&&Ne.getTransfer(C.map.colorSpace)===Xe,decodeVideoTextureEmissive:Bt&&C.emissiveMap.isVideoTexture===!0&&Ne.getTransfer(C.emissiveMap.colorSpace)===Xe,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===ba,flipSided:C.side===Jn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:Kt&&C.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Kt&&C.extensions.multiDraw===!0||At)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return Ge.vertexUv1s=p.has(1),Ge.vertexUv2s=p.has(2),Ge.vertexUv3s=p.has(3),p.clear(),Ge}function S(C){const w=[];if(C.shaderID?w.push(C.shaderID):(w.push(C.customVertexShaderID),w.push(C.customFragmentShaderID)),C.defines!==void 0)for(const B in C.defines)w.push(B),w.push(C.defines[B]);return C.isRawShaderMaterial===!1&&(I(w,C),O(w,C),w.push(o.outputColorSpace)),w.push(C.customProgramCacheKey),w.join()}function I(C,w){C.push(w.precision),C.push(w.outputColorSpace),C.push(w.envMapMode),C.push(w.envMapCubeUVHeight),C.push(w.mapUv),C.push(w.alphaMapUv),C.push(w.lightMapUv),C.push(w.aoMapUv),C.push(w.bumpMapUv),C.push(w.normalMapUv),C.push(w.displacementMapUv),C.push(w.emissiveMapUv),C.push(w.metalnessMapUv),C.push(w.roughnessMapUv),C.push(w.anisotropyMapUv),C.push(w.clearcoatMapUv),C.push(w.clearcoatNormalMapUv),C.push(w.clearcoatRoughnessMapUv),C.push(w.iridescenceMapUv),C.push(w.iridescenceThicknessMapUv),C.push(w.sheenColorMapUv),C.push(w.sheenRoughnessMapUv),C.push(w.specularMapUv),C.push(w.specularColorMapUv),C.push(w.specularIntensityMapUv),C.push(w.transmissionMapUv),C.push(w.thicknessMapUv),C.push(w.combine),C.push(w.fogExp2),C.push(w.sizeAttenuation),C.push(w.morphTargetsCount),C.push(w.morphAttributeCount),C.push(w.numDirLights),C.push(w.numPointLights),C.push(w.numSpotLights),C.push(w.numSpotLightMaps),C.push(w.numHemiLights),C.push(w.numRectAreaLights),C.push(w.numDirLightShadows),C.push(w.numPointLightShadows),C.push(w.numSpotLightShadows),C.push(w.numSpotLightShadowsWithMaps),C.push(w.numLightProbes),C.push(w.shadowMapType),C.push(w.toneMapping),C.push(w.numClippingPlanes),C.push(w.numClipIntersection),C.push(w.depthPacking)}function O(C,w){d.disableAll(),w.supportsVertexTextures&&d.enable(0),w.instancing&&d.enable(1),w.instancingColor&&d.enable(2),w.instancingMorph&&d.enable(3),w.matcap&&d.enable(4),w.envMap&&d.enable(5),w.normalMapObjectSpace&&d.enable(6),w.normalMapTangentSpace&&d.enable(7),w.clearcoat&&d.enable(8),w.iridescence&&d.enable(9),w.alphaTest&&d.enable(10),w.vertexColors&&d.enable(11),w.vertexAlphas&&d.enable(12),w.vertexUv1s&&d.enable(13),w.vertexUv2s&&d.enable(14),w.vertexUv3s&&d.enable(15),w.vertexTangents&&d.enable(16),w.anisotropy&&d.enable(17),w.alphaHash&&d.enable(18),w.batching&&d.enable(19),w.dispersion&&d.enable(20),w.batchingColor&&d.enable(21),w.gradientMap&&d.enable(22),C.push(d.mask),d.disableAll(),w.fog&&d.enable(0),w.useFog&&d.enable(1),w.flatShading&&d.enable(2),w.logarithmicDepthBuffer&&d.enable(3),w.reversedDepthBuffer&&d.enable(4),w.skinning&&d.enable(5),w.morphTargets&&d.enable(6),w.morphNormals&&d.enable(7),w.morphColors&&d.enable(8),w.premultipliedAlpha&&d.enable(9),w.shadowMapEnabled&&d.enable(10),w.doubleSided&&d.enable(11),w.flipSided&&d.enable(12),w.useDepthPacking&&d.enable(13),w.dithering&&d.enable(14),w.transmission&&d.enable(15),w.sheen&&d.enable(16),w.opaque&&d.enable(17),w.pointsUvs&&d.enable(18),w.decodeVideoTexture&&d.enable(19),w.decodeVideoTextureEmissive&&d.enable(20),w.alphaToCoverage&&d.enable(21),C.push(d.mask)}function D(C){const w=T[C.type];let B;if(w){const j=Qi[w];B=yT.clone(j.uniforms)}else B=C.uniforms;return B}function H(C,w){let B;for(let j=0,it=g.length;j<it;j++){const ot=g[j];if(ot.cacheKey===w){B=ot,++B.usedTimes;break}}return B===void 0&&(B=new tC(o,w,C,f),g.push(B)),B}function U(C){if(--C.usedTimes===0){const w=g.indexOf(C);g[w]=g[g.length-1],g.pop(),C.destroy()}}function N(C){v.remove(C)}function G(){v.dispose()}return{getParameters:M,getProgramCacheKey:S,getUniforms:D,acquireProgram:H,releaseProgram:U,releaseShaderCache:N,programs:g,dispose:G}}function sC(){let o=new WeakMap;function e(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function r(h){o.delete(h)}function l(h,d,v){o.get(h)[d]=v}function f(){o=new WeakMap}return{has:e,get:i,remove:r,update:l,dispose:f}}function rC(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function xy(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function My(){const o=[];let e=0;const i=[],r=[],l=[];function f(){e=0,i.length=0,r.length=0,l.length=0}function h(m,y,x,T,A,M){let S=o[e];return S===void 0?(S={id:m.id,object:m,geometry:y,material:x,groupOrder:T,renderOrder:m.renderOrder,z:A,group:M},o[e]=S):(S.id=m.id,S.object=m,S.geometry=y,S.material=x,S.groupOrder=T,S.renderOrder=m.renderOrder,S.z=A,S.group=M),e++,S}function d(m,y,x,T,A,M){const S=h(m,y,x,T,A,M);x.transmission>0?r.push(S):x.transparent===!0?l.push(S):i.push(S)}function v(m,y,x,T,A,M){const S=h(m,y,x,T,A,M);x.transmission>0?r.unshift(S):x.transparent===!0?l.unshift(S):i.unshift(S)}function p(m,y){i.length>1&&i.sort(m||rC),r.length>1&&r.sort(y||xy),l.length>1&&l.sort(y||xy)}function g(){for(let m=e,y=o.length;m<y;m++){const x=o[m];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:i,transmissive:r,transparent:l,init:f,push:d,unshift:v,finish:g,sort:p}}function oC(){let o=new WeakMap;function e(r,l){const f=o.get(r);let h;return f===void 0?(h=new My,o.set(r,[h])):l>=f.length?(h=new My,f.push(h)):h=f[l],h}function i(){o=new WeakMap}return{get:e,dispose:i}}function lC(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new Q,color:new Te};break;case"SpotLight":i={position:new Q,direction:new Q,color:new Te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new Q,color:new Te,distance:0,decay:0};break;case"HemisphereLight":i={direction:new Q,skyColor:new Te,groundColor:new Te};break;case"RectAreaLight":i={color:new Te,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return o[e.id]=i,i}}}function uC(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let cC=0;function fC(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function hC(o){const e=new lC,i=uC(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new Q);const l=new Q,f=new $e,h=new $e;function d(p){let g=0,m=0,y=0;for(let C=0;C<9;C++)r.probe[C].set(0,0,0);let x=0,T=0,A=0,M=0,S=0,I=0,O=0,D=0,H=0,U=0,N=0;p.sort(fC);for(let C=0,w=p.length;C<w;C++){const B=p[C],j=B.color,it=B.intensity,ot=B.distance,ct=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)g+=j.r*it,m+=j.g*it,y+=j.b*it;else if(B.isLightProbe){for(let V=0;V<9;V++)r.probe[V].addScaledVector(B.sh.coefficients[V],it);N++}else if(B.isDirectionalLight){const V=e.get(B);if(V.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){const lt=B.shadow,q=i.get(B);q.shadowIntensity=lt.intensity,q.shadowBias=lt.bias,q.shadowNormalBias=lt.normalBias,q.shadowRadius=lt.radius,q.shadowMapSize=lt.mapSize,r.directionalShadow[x]=q,r.directionalShadowMap[x]=ct,r.directionalShadowMatrix[x]=B.shadow.matrix,I++}r.directional[x]=V,x++}else if(B.isSpotLight){const V=e.get(B);V.position.setFromMatrixPosition(B.matrixWorld),V.color.copy(j).multiplyScalar(it),V.distance=ot,V.coneCos=Math.cos(B.angle),V.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),V.decay=B.decay,r.spot[A]=V;const lt=B.shadow;if(B.map&&(r.spotLightMap[H]=B.map,H++,lt.updateMatrices(B),B.castShadow&&U++),r.spotLightMatrix[A]=lt.matrix,B.castShadow){const q=i.get(B);q.shadowIntensity=lt.intensity,q.shadowBias=lt.bias,q.shadowNormalBias=lt.normalBias,q.shadowRadius=lt.radius,q.shadowMapSize=lt.mapSize,r.spotShadow[A]=q,r.spotShadowMap[A]=ct,D++}A++}else if(B.isRectAreaLight){const V=e.get(B);V.color.copy(j).multiplyScalar(it),V.halfWidth.set(B.width*.5,0,0),V.halfHeight.set(0,B.height*.5,0),r.rectArea[M]=V,M++}else if(B.isPointLight){const V=e.get(B);if(V.color.copy(B.color).multiplyScalar(B.intensity),V.distance=B.distance,V.decay=B.decay,B.castShadow){const lt=B.shadow,q=i.get(B);q.shadowIntensity=lt.intensity,q.shadowBias=lt.bias,q.shadowNormalBias=lt.normalBias,q.shadowRadius=lt.radius,q.shadowMapSize=lt.mapSize,q.shadowCameraNear=lt.camera.near,q.shadowCameraFar=lt.camera.far,r.pointShadow[T]=q,r.pointShadowMap[T]=ct,r.pointShadowMatrix[T]=B.shadow.matrix,O++}r.point[T]=V,T++}else if(B.isHemisphereLight){const V=e.get(B);V.skyColor.copy(B.color).multiplyScalar(it),V.groundColor.copy(B.groundColor).multiplyScalar(it),r.hemi[S]=V,S++}}M>0&&(o.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=It.LTC_FLOAT_1,r.rectAreaLTC2=It.LTC_FLOAT_2):(r.rectAreaLTC1=It.LTC_HALF_1,r.rectAreaLTC2=It.LTC_HALF_2)),r.ambient[0]=g,r.ambient[1]=m,r.ambient[2]=y;const G=r.hash;(G.directionalLength!==x||G.pointLength!==T||G.spotLength!==A||G.rectAreaLength!==M||G.hemiLength!==S||G.numDirectionalShadows!==I||G.numPointShadows!==O||G.numSpotShadows!==D||G.numSpotMaps!==H||G.numLightProbes!==N)&&(r.directional.length=x,r.spot.length=A,r.rectArea.length=M,r.point.length=T,r.hemi.length=S,r.directionalShadow.length=I,r.directionalShadowMap.length=I,r.pointShadow.length=O,r.pointShadowMap.length=O,r.spotShadow.length=D,r.spotShadowMap.length=D,r.directionalShadowMatrix.length=I,r.pointShadowMatrix.length=O,r.spotLightMatrix.length=D+H-U,r.spotLightMap.length=H,r.numSpotLightShadowsWithMaps=U,r.numLightProbes=N,G.directionalLength=x,G.pointLength=T,G.spotLength=A,G.rectAreaLength=M,G.hemiLength=S,G.numDirectionalShadows=I,G.numPointShadows=O,G.numSpotShadows=D,G.numSpotMaps=H,G.numLightProbes=N,r.version=cC++)}function v(p,g){let m=0,y=0,x=0,T=0,A=0;const M=g.matrixWorldInverse;for(let S=0,I=p.length;S<I;S++){const O=p[S];if(O.isDirectionalLight){const D=r.directional[m];D.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(M),m++}else if(O.isSpotLight){const D=r.spot[x];D.position.setFromMatrixPosition(O.matrixWorld),D.position.applyMatrix4(M),D.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(M),x++}else if(O.isRectAreaLight){const D=r.rectArea[T];D.position.setFromMatrixPosition(O.matrixWorld),D.position.applyMatrix4(M),h.identity(),f.copy(O.matrixWorld),f.premultiply(M),h.extractRotation(f),D.halfWidth.set(O.width*.5,0,0),D.halfHeight.set(0,O.height*.5,0),D.halfWidth.applyMatrix4(h),D.halfHeight.applyMatrix4(h),T++}else if(O.isPointLight){const D=r.point[y];D.position.setFromMatrixPosition(O.matrixWorld),D.position.applyMatrix4(M),y++}else if(O.isHemisphereLight){const D=r.hemi[A];D.direction.setFromMatrixPosition(O.matrixWorld),D.direction.transformDirection(M),A++}}}return{setup:d,setupView:v,state:r}}function Ey(o){const e=new hC(o),i=[],r=[];function l(g){p.camera=g,i.length=0,r.length=0}function f(g){i.push(g)}function h(g){r.push(g)}function d(){e.setup(i)}function v(g){e.setupView(i,g)}const p={lightsArray:i,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:v,pushLight:f,pushShadow:h}}function dC(o){let e=new WeakMap;function i(l,f=0){const h=e.get(l);let d;return h===void 0?(d=new Ey(o),e.set(l,[d])):f>=h.length?(d=new Ey(o),h.push(d)):d=h[f],d}function r(){e=new WeakMap}return{get:i,dispose:r}}const pC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function gC(o,e,i){let r=new Zp;const l=new fe,f=new fe,h=new rn,d=new LT({depthPacking:CE}),v=new OT,p={},g=i.maxTextureSize,m={[hs]:Jn,[Jn]:hs,[ba]:ba},y=new ds({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:pC,fragmentShader:mC}),x=y.clone();x.defines.HORIZONTAL_PASS=1;const T=new Yn;T.setAttribute("position",new hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Ai(T,y),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cy;let S=this.type;this.render=function(U,N,G){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||U.length===0)return;const C=o.getRenderTarget(),w=o.getActiveCubeFace(),B=o.getActiveMipmapLevel(),j=o.state;j.setBlending(cs),j.buffers.depth.getReversed()===!0?j.buffers.color.setClear(0,0,0,0):j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const it=S!==Ea&&this.type===Ea,ot=S===Ea&&this.type!==Ea;for(let ct=0,V=U.length;ct<V;ct++){const lt=U[ct],q=lt.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",lt,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;l.copy(q.mapSize);const _t=q.getFrameExtents();if(l.multiply(_t),f.copy(q.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(f.x=Math.floor(g/_t.x),l.x=f.x*_t.x,q.mapSize.x=f.x),l.y>g&&(f.y=Math.floor(g/_t.y),l.y=f.y*_t.y,q.mapSize.y=f.y)),q.map===null||it===!0||ot===!0){const Ht=this.type!==Ea?{minFilter:Ii,magFilter:Ii}:{};q.map!==null&&q.map.dispose(),q.map=new Qs(l.x,l.y,Ht),q.map.texture.name=lt.name+".shadowMap",q.camera.updateProjectionMatrix()}o.setRenderTarget(q.map),o.clear();const St=q.getViewportCount();for(let Ht=0;Ht<St;Ht++){const re=q.getViewport(Ht);h.set(f.x*re.x,f.y*re.y,f.x*re.z,f.y*re.w),j.viewport(h),q.updateMatrices(lt,Ht),r=q.getFrustum(),D(N,G,q.camera,lt,this.type)}q.isPointLightShadow!==!0&&this.type===Ea&&I(q,G),q.needsUpdate=!1}S=this.type,M.needsUpdate=!1,o.setRenderTarget(C,w,B)};function I(U,N){const G=e.update(A);y.defines.VSM_SAMPLES!==U.blurSamples&&(y.defines.VSM_SAMPLES=U.blurSamples,x.defines.VSM_SAMPLES=U.blurSamples,y.needsUpdate=!0,x.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new Qs(l.x,l.y)),y.uniforms.shadow_pass.value=U.map.texture,y.uniforms.resolution.value=U.mapSize,y.uniforms.radius.value=U.radius,o.setRenderTarget(U.mapPass),o.clear(),o.renderBufferDirect(N,null,G,y,A,null),x.uniforms.shadow_pass.value=U.mapPass.texture,x.uniforms.resolution.value=U.mapSize,x.uniforms.radius.value=U.radius,o.setRenderTarget(U.map),o.clear(),o.renderBufferDirect(N,null,G,x,A,null)}function O(U,N,G,C){let w=null;const B=G.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(B!==void 0)w=B;else if(w=G.isPointLight===!0?v:d,o.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const j=w.uuid,it=N.uuid;let ot=p[j];ot===void 0&&(ot={},p[j]=ot);let ct=ot[it];ct===void 0&&(ct=w.clone(),ot[it]=ct,N.addEventListener("dispose",H)),w=ct}if(w.visible=N.visible,w.wireframe=N.wireframe,C===Ea?w.side=N.shadowSide!==null?N.shadowSide:N.side:w.side=N.shadowSide!==null?N.shadowSide:m[N.side],w.alphaMap=N.alphaMap,w.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,w.map=N.map,w.clipShadows=N.clipShadows,w.clippingPlanes=N.clippingPlanes,w.clipIntersection=N.clipIntersection,w.displacementMap=N.displacementMap,w.displacementScale=N.displacementScale,w.displacementBias=N.displacementBias,w.wireframeLinewidth=N.wireframeLinewidth,w.linewidth=N.linewidth,G.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const j=o.properties.get(w);j.light=G}return w}function D(U,N,G,C,w){if(U.visible===!1)return;if(U.layers.test(N.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&w===Ea)&&(!U.frustumCulled||r.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,U.matrixWorld);const it=e.update(U),ot=U.material;if(Array.isArray(ot)){const ct=it.groups;for(let V=0,lt=ct.length;V<lt;V++){const q=ct[V],_t=ot[q.materialIndex];if(_t&&_t.visible){const St=O(U,_t,C,w);U.onBeforeShadow(o,U,N,G,it,St,q),o.renderBufferDirect(G,null,it,St,U,q),U.onAfterShadow(o,U,N,G,it,St,q)}}}else if(ot.visible){const ct=O(U,ot,C,w);U.onBeforeShadow(o,U,N,G,it,ct,null),o.renderBufferDirect(G,null,it,ct,U,null),U.onAfterShadow(o,U,N,G,it,ct,null)}}const j=U.children;for(let it=0,ot=j.length;it<ot;it++)D(j[it],N,G,C,w)}function H(U){U.target.removeEventListener("dispose",H);for(const G in p){const C=p[G],w=U.target.uuid;w in C&&(C[w].dispose(),delete C[w])}}}const _C={[Kd]:Qd,[Jd]:ep,[$d]:np,[lo]:tp,[Qd]:Kd,[ep]:Jd,[np]:$d,[tp]:lo};function vC(o,e){function i(){let k=!1;const Rt=new rn;let Ut=null;const Yt=new rn(0,0,0,0);return{setMask:function(Et){Ut!==Et&&!k&&(o.colorMask(Et,Et,Et,Et),Ut=Et)},setLocked:function(Et){k=Et},setClear:function(Et,gt,Kt,ce,Ge){Ge===!0&&(Et*=ce,gt*=ce,Kt*=ce),Rt.set(Et,gt,Kt,ce),Yt.equals(Rt)===!1&&(o.clearColor(Et,gt,Kt,ce),Yt.copy(Rt))},reset:function(){k=!1,Ut=null,Yt.set(-1,0,0,0)}}}function r(){let k=!1,Rt=!1,Ut=null,Yt=null,Et=null;return{setReversed:function(gt){if(Rt!==gt){const Kt=e.get("EXT_clip_control");gt?Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.ZERO_TO_ONE_EXT):Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.NEGATIVE_ONE_TO_ONE_EXT),Rt=gt;const ce=Et;Et=null,this.setClear(ce)}},getReversed:function(){return Rt},setTest:function(gt){gt?at(o.DEPTH_TEST):xt(o.DEPTH_TEST)},setMask:function(gt){Ut!==gt&&!k&&(o.depthMask(gt),Ut=gt)},setFunc:function(gt){if(Rt&&(gt=_C[gt]),Yt!==gt){switch(gt){case Kd:o.depthFunc(o.NEVER);break;case Qd:o.depthFunc(o.ALWAYS);break;case Jd:o.depthFunc(o.LESS);break;case lo:o.depthFunc(o.LEQUAL);break;case $d:o.depthFunc(o.EQUAL);break;case tp:o.depthFunc(o.GEQUAL);break;case ep:o.depthFunc(o.GREATER);break;case np:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Yt=gt}},setLocked:function(gt){k=gt},setClear:function(gt){Et!==gt&&(Rt&&(gt=1-gt),o.clearDepth(gt),Et=gt)},reset:function(){k=!1,Ut=null,Yt=null,Et=null,Rt=!1}}}function l(){let k=!1,Rt=null,Ut=null,Yt=null,Et=null,gt=null,Kt=null,ce=null,Ge=null;return{setTest:function(be){k||(be?at(o.STENCIL_TEST):xt(o.STENCIL_TEST))},setMask:function(be){Rt!==be&&!k&&(o.stencilMask(be),Rt=be)},setFunc:function(be,tn,mn){(Ut!==be||Yt!==tn||Et!==mn)&&(o.stencilFunc(be,tn,mn),Ut=be,Yt=tn,Et=mn)},setOp:function(be,tn,mn){(gt!==be||Kt!==tn||ce!==mn)&&(o.stencilOp(be,tn,mn),gt=be,Kt=tn,ce=mn)},setLocked:function(be){k=be},setClear:function(be){Ge!==be&&(o.clearStencil(be),Ge=be)},reset:function(){k=!1,Rt=null,Ut=null,Yt=null,Et=null,gt=null,Kt=null,ce=null,Ge=null}}}const f=new i,h=new r,d=new l,v=new WeakMap,p=new WeakMap;let g={},m={},y=new WeakMap,x=[],T=null,A=!1,M=null,S=null,I=null,O=null,D=null,H=null,U=null,N=new Te(0,0,0),G=0,C=!1,w=null,B=null,j=null,it=null,ot=null;const ct=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,lt=0;const q=o.getParameter(o.VERSION);q.indexOf("WebGL")!==-1?(lt=parseFloat(/^WebGL (\d)/.exec(q)[1]),V=lt>=1):q.indexOf("OpenGL ES")!==-1&&(lt=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),V=lt>=2);let _t=null,St={};const Ht=o.getParameter(o.SCISSOR_BOX),re=o.getParameter(o.VIEWPORT),xe=new rn().fromArray(Ht),F=new rn().fromArray(re);function ft(k,Rt,Ut,Yt){const Et=new Uint8Array(4),gt=o.createTexture();o.bindTexture(k,gt),o.texParameteri(k,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(k,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let Kt=0;Kt<Ut;Kt++)k===o.TEXTURE_3D||k===o.TEXTURE_2D_ARRAY?o.texImage3D(Rt,0,o.RGBA,1,1,Yt,0,o.RGBA,o.UNSIGNED_BYTE,Et):o.texImage2D(Rt+Kt,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Et);return gt}const $={};$[o.TEXTURE_2D]=ft(o.TEXTURE_2D,o.TEXTURE_2D,1),$[o.TEXTURE_CUBE_MAP]=ft(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[o.TEXTURE_2D_ARRAY]=ft(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),$[o.TEXTURE_3D]=ft(o.TEXTURE_3D,o.TEXTURE_3D,1,1),f.setClear(0,0,0,1),h.setClear(1),d.setClear(0),at(o.DEPTH_TEST),h.setFunc(lo),Gt(!1),wt(_v),at(o.CULL_FACE),oe(cs);function at(k){g[k]!==!0&&(o.enable(k),g[k]=!0)}function xt(k){g[k]!==!1&&(o.disable(k),g[k]=!1)}function Nt(k,Rt){return m[k]!==Rt?(o.bindFramebuffer(k,Rt),m[k]=Rt,k===o.DRAW_FRAMEBUFFER&&(m[o.FRAMEBUFFER]=Rt),k===o.FRAMEBUFFER&&(m[o.DRAW_FRAMEBUFFER]=Rt),!0):!1}function At(k,Rt){let Ut=x,Yt=!1;if(k){Ut=y.get(Rt),Ut===void 0&&(Ut=[],y.set(Rt,Ut));const Et=k.textures;if(Ut.length!==Et.length||Ut[0]!==o.COLOR_ATTACHMENT0){for(let gt=0,Kt=Et.length;gt<Kt;gt++)Ut[gt]=o.COLOR_ATTACHMENT0+gt;Ut.length=Et.length,Yt=!0}}else Ut[0]!==o.BACK&&(Ut[0]=o.BACK,Yt=!0);Yt&&o.drawBuffers(Ut)}function Mt(k){return T!==k?(o.useProgram(k),T=k,!0):!1}const vt={[Ys]:o.FUNC_ADD,[tE]:o.FUNC_SUBTRACT,[eE]:o.FUNC_REVERSE_SUBTRACT};vt[nE]=o.MIN,vt[iE]=o.MAX;const P={[aE]:o.ZERO,[sE]:o.ONE,[rE]:o.SRC_COLOR,[jd]:o.SRC_ALPHA,[hE]:o.SRC_ALPHA_SATURATE,[cE]:o.DST_COLOR,[lE]:o.DST_ALPHA,[oE]:o.ONE_MINUS_SRC_COLOR,[Zd]:o.ONE_MINUS_SRC_ALPHA,[fE]:o.ONE_MINUS_DST_COLOR,[uE]:o.ONE_MINUS_DST_ALPHA,[dE]:o.CONSTANT_COLOR,[pE]:o.ONE_MINUS_CONSTANT_COLOR,[mE]:o.CONSTANT_ALPHA,[gE]:o.ONE_MINUS_CONSTANT_ALPHA};function oe(k,Rt,Ut,Yt,Et,gt,Kt,ce,Ge,be){if(k===cs){A===!0&&(xt(o.BLEND),A=!1);return}if(A===!1&&(at(o.BLEND),A=!0),k!==$M){if(k!==M||be!==C){if((S!==Ys||D!==Ys)&&(o.blendEquation(o.FUNC_ADD),S=Ys,D=Ys),be)switch(k){case so:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case vv:o.blendFunc(o.ONE,o.ONE);break;case yv:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Sv:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case so:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case vv:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case yv:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sv:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}I=null,O=null,H=null,U=null,N.set(0,0,0),G=0,M=k,C=be}return}Et=Et||Rt,gt=gt||Ut,Kt=Kt||Yt,(Rt!==S||Et!==D)&&(o.blendEquationSeparate(vt[Rt],vt[Et]),S=Rt,D=Et),(Ut!==I||Yt!==O||gt!==H||Kt!==U)&&(o.blendFuncSeparate(P[Ut],P[Yt],P[gt],P[Kt]),I=Ut,O=Yt,H=gt,U=Kt),(ce.equals(N)===!1||Ge!==G)&&(o.blendColor(ce.r,ce.g,ce.b,Ge),N.copy(ce),G=Ge),M=k,C=!1}function Xt(k,Rt){k.side===ba?xt(o.CULL_FACE):at(o.CULL_FACE);let Ut=k.side===Jn;Rt&&(Ut=!Ut),Gt(Ut),k.blending===so&&k.transparent===!1?oe(cs):oe(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),h.setFunc(k.depthFunc),h.setTest(k.depthTest),h.setMask(k.depthWrite),f.setMask(k.colorWrite);const Yt=k.stencilWrite;d.setTest(Yt),Yt&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Bt(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?at(o.SAMPLE_ALPHA_TO_COVERAGE):xt(o.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(k){w!==k&&(k?o.frontFace(o.CW):o.frontFace(o.CCW),w=k)}function wt(k){k!==QM?(at(o.CULL_FACE),k!==B&&(k===_v?o.cullFace(o.BACK):k===JM?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):xt(o.CULL_FACE),B=k}function Zt(k){k!==j&&(V&&o.lineWidth(k),j=k)}function Bt(k,Rt,Ut){k?(at(o.POLYGON_OFFSET_FILL),(it!==Rt||ot!==Ut)&&(o.polygonOffset(Rt,Ut),it=Rt,ot=Ut)):xt(o.POLYGON_OFFSET_FILL)}function le(k){k?at(o.SCISSOR_TEST):xt(o.SCISSOR_TEST)}function Ye(k){k===void 0&&(k=o.TEXTURE0+ct-1),_t!==k&&(o.activeTexture(k),_t=k)}function We(k,Rt,Ut){Ut===void 0&&(_t===null?Ut=o.TEXTURE0+ct-1:Ut=_t);let Yt=St[Ut];Yt===void 0&&(Yt={type:void 0,texture:void 0},St[Ut]=Yt),(Yt.type!==k||Yt.texture!==Rt)&&(_t!==Ut&&(o.activeTexture(Ut),_t=Ut),o.bindTexture(k,Rt||$[k]),Yt.type=k,Yt.texture=Rt)}function L(){const k=St[_t];k!==void 0&&k.type!==void 0&&(o.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function b(){try{o.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function nt(){try{o.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function pt(){try{o.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function yt(){try{o.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ht(){try{o.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function qt(){try{o.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ct(){try{o.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Qt(){try{o.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function $t(){try{o.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function bt(){try{o.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ot(k){xe.equals(k)===!1&&(o.scissor(k.x,k.y,k.z,k.w),xe.copy(k))}function ae(k){F.equals(k)===!1&&(o.viewport(k.x,k.y,k.z,k.w),F.copy(k))}function Jt(k,Rt){let Ut=p.get(Rt);Ut===void 0&&(Ut=new WeakMap,p.set(Rt,Ut));let Yt=Ut.get(k);Yt===void 0&&(Yt=o.getUniformBlockIndex(Rt,k.name),Ut.set(k,Yt))}function Pt(k,Rt){const Yt=p.get(Rt).get(k);v.get(Rt)!==Yt&&(o.uniformBlockBinding(Rt,Yt,k.__bindingPointIndex),v.set(Rt,Yt))}function he(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),g={},_t=null,St={},m={},y=new WeakMap,x=[],T=null,A=!1,M=null,S=null,I=null,O=null,D=null,H=null,U=null,N=new Te(0,0,0),G=0,C=!1,w=null,B=null,j=null,it=null,ot=null,xe.set(0,0,o.canvas.width,o.canvas.height),F.set(0,0,o.canvas.width,o.canvas.height),f.reset(),h.reset(),d.reset()}return{buffers:{color:f,depth:h,stencil:d},enable:at,disable:xt,bindFramebuffer:Nt,drawBuffers:At,useProgram:Mt,setBlending:oe,setMaterial:Xt,setFlipSided:Gt,setCullFace:wt,setLineWidth:Zt,setPolygonOffset:Bt,setScissorTest:le,activeTexture:Ye,bindTexture:We,unbindTexture:L,compressedTexImage2D:b,compressedTexImage3D:nt,texImage2D:$t,texImage3D:bt,updateUBOMapping:Jt,uniformBlockBinding:Pt,texStorage2D:Ct,texStorage3D:Qt,texSubImage2D:pt,texSubImage3D:yt,compressedTexSubImage2D:ht,compressedTexSubImage3D:qt,scissor:Ot,viewport:ae,reset:he}}function yC(o,e,i,r,l,f,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,v=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new fe,g=new WeakMap;let m;const y=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(L,b){return x?new OffscreenCanvas(L,b):wc("canvas")}function A(L,b,nt){let pt=1;const yt=We(L);if((yt.width>nt||yt.height>nt)&&(pt=nt/Math.max(yt.width,yt.height)),pt<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const ht=Math.floor(pt*yt.width),qt=Math.floor(pt*yt.height);m===void 0&&(m=T(ht,qt));const Ct=b?T(ht,qt):m;return Ct.width=ht,Ct.height=qt,Ct.getContext("2d").drawImage(L,0,0,ht,qt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+yt.width+"x"+yt.height+") to ("+ht+"x"+qt+")."),Ct}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+yt.width+"x"+yt.height+")."),L;return L}function M(L){return L.generateMipmaps}function S(L){o.generateMipmap(L)}function I(L){return L.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?o.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function O(L,b,nt,pt,yt=!1){if(L!==null){if(o[L]!==void 0)return o[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ht=b;if(b===o.RED&&(nt===o.FLOAT&&(ht=o.R32F),nt===o.HALF_FLOAT&&(ht=o.R16F),nt===o.UNSIGNED_BYTE&&(ht=o.R8)),b===o.RED_INTEGER&&(nt===o.UNSIGNED_BYTE&&(ht=o.R8UI),nt===o.UNSIGNED_SHORT&&(ht=o.R16UI),nt===o.UNSIGNED_INT&&(ht=o.R32UI),nt===o.BYTE&&(ht=o.R8I),nt===o.SHORT&&(ht=o.R16I),nt===o.INT&&(ht=o.R32I)),b===o.RG&&(nt===o.FLOAT&&(ht=o.RG32F),nt===o.HALF_FLOAT&&(ht=o.RG16F),nt===o.UNSIGNED_BYTE&&(ht=o.RG8)),b===o.RG_INTEGER&&(nt===o.UNSIGNED_BYTE&&(ht=o.RG8UI),nt===o.UNSIGNED_SHORT&&(ht=o.RG16UI),nt===o.UNSIGNED_INT&&(ht=o.RG32UI),nt===o.BYTE&&(ht=o.RG8I),nt===o.SHORT&&(ht=o.RG16I),nt===o.INT&&(ht=o.RG32I)),b===o.RGB_INTEGER&&(nt===o.UNSIGNED_BYTE&&(ht=o.RGB8UI),nt===o.UNSIGNED_SHORT&&(ht=o.RGB16UI),nt===o.UNSIGNED_INT&&(ht=o.RGB32UI),nt===o.BYTE&&(ht=o.RGB8I),nt===o.SHORT&&(ht=o.RGB16I),nt===o.INT&&(ht=o.RGB32I)),b===o.RGBA_INTEGER&&(nt===o.UNSIGNED_BYTE&&(ht=o.RGBA8UI),nt===o.UNSIGNED_SHORT&&(ht=o.RGBA16UI),nt===o.UNSIGNED_INT&&(ht=o.RGBA32UI),nt===o.BYTE&&(ht=o.RGBA8I),nt===o.SHORT&&(ht=o.RGBA16I),nt===o.INT&&(ht=o.RGBA32I)),b===o.RGB&&(nt===o.UNSIGNED_INT_5_9_9_9_REV&&(ht=o.RGB9_E5),nt===o.UNSIGNED_INT_10F_11F_11F_REV&&(ht=o.R11F_G11F_B10F)),b===o.RGBA){const qt=yt?Rc:Ne.getTransfer(pt);nt===o.FLOAT&&(ht=o.RGBA32F),nt===o.HALF_FLOAT&&(ht=o.RGBA16F),nt===o.UNSIGNED_BYTE&&(ht=qt===Xe?o.SRGB8_ALPHA8:o.RGBA8),nt===o.UNSIGNED_SHORT_4_4_4_4&&(ht=o.RGBA4),nt===o.UNSIGNED_SHORT_5_5_5_1&&(ht=o.RGB5_A1)}return(ht===o.R16F||ht===o.R32F||ht===o.RG16F||ht===o.RG32F||ht===o.RGBA16F||ht===o.RGBA32F)&&e.get("EXT_color_buffer_float"),ht}function D(L,b){let nt;return L?b===null||b===Zs||b===yl?nt=o.DEPTH24_STENCIL8:b===Aa?nt=o.DEPTH32F_STENCIL8:b===vl&&(nt=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Zs||b===yl?nt=o.DEPTH_COMPONENT24:b===Aa?nt=o.DEPTH_COMPONENT32F:b===vl&&(nt=o.DEPTH_COMPONENT16),nt}function H(L,b){return M(L)===!0||L.isFramebufferTexture&&L.minFilter!==Ii&&L.minFilter!==Ji?Math.log2(Math.max(b.width,b.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?b.mipmaps.length:1}function U(L){const b=L.target;b.removeEventListener("dispose",U),G(b),b.isVideoTexture&&g.delete(b)}function N(L){const b=L.target;b.removeEventListener("dispose",N),w(b)}function G(L){const b=r.get(L);if(b.__webglInit===void 0)return;const nt=L.source,pt=y.get(nt);if(pt){const yt=pt[b.__cacheKey];yt.usedTimes--,yt.usedTimes===0&&C(L),Object.keys(pt).length===0&&y.delete(nt)}r.remove(L)}function C(L){const b=r.get(L);o.deleteTexture(b.__webglTexture);const nt=L.source,pt=y.get(nt);delete pt[b.__cacheKey],h.memory.textures--}function w(L){const b=r.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),r.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let pt=0;pt<6;pt++){if(Array.isArray(b.__webglFramebuffer[pt]))for(let yt=0;yt<b.__webglFramebuffer[pt].length;yt++)o.deleteFramebuffer(b.__webglFramebuffer[pt][yt]);else o.deleteFramebuffer(b.__webglFramebuffer[pt]);b.__webglDepthbuffer&&o.deleteRenderbuffer(b.__webglDepthbuffer[pt])}else{if(Array.isArray(b.__webglFramebuffer))for(let pt=0;pt<b.__webglFramebuffer.length;pt++)o.deleteFramebuffer(b.__webglFramebuffer[pt]);else o.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&o.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&o.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let pt=0;pt<b.__webglColorRenderbuffer.length;pt++)b.__webglColorRenderbuffer[pt]&&o.deleteRenderbuffer(b.__webglColorRenderbuffer[pt]);b.__webglDepthRenderbuffer&&o.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const nt=L.textures;for(let pt=0,yt=nt.length;pt<yt;pt++){const ht=r.get(nt[pt]);ht.__webglTexture&&(o.deleteTexture(ht.__webglTexture),h.memory.textures--),r.remove(nt[pt])}r.remove(L)}let B=0;function j(){B=0}function it(){const L=B;return L>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+l.maxTextures),B+=1,L}function ot(L){const b=[];return b.push(L.wrapS),b.push(L.wrapT),b.push(L.wrapR||0),b.push(L.magFilter),b.push(L.minFilter),b.push(L.anisotropy),b.push(L.internalFormat),b.push(L.format),b.push(L.type),b.push(L.generateMipmaps),b.push(L.premultiplyAlpha),b.push(L.flipY),b.push(L.unpackAlignment),b.push(L.colorSpace),b.join()}function ct(L,b){const nt=r.get(L);if(L.isVideoTexture&&le(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&nt.__version!==L.version){const pt=L.image;if(pt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(nt,L,b);return}}else L.isExternalTexture&&(nt.__webglTexture=L.sourceTexture?L.sourceTexture:null);i.bindTexture(o.TEXTURE_2D,nt.__webglTexture,o.TEXTURE0+b)}function V(L,b){const nt=r.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&nt.__version!==L.version){$(nt,L,b);return}i.bindTexture(o.TEXTURE_2D_ARRAY,nt.__webglTexture,o.TEXTURE0+b)}function lt(L,b){const nt=r.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&nt.__version!==L.version){$(nt,L,b);return}i.bindTexture(o.TEXTURE_3D,nt.__webglTexture,o.TEXTURE0+b)}function q(L,b){const nt=r.get(L);if(L.version>0&&nt.__version!==L.version){at(nt,L,b);return}i.bindTexture(o.TEXTURE_CUBE_MAP,nt.__webglTexture,o.TEXTURE0+b)}const _t={[sp]:o.REPEAT,[Ws]:o.CLAMP_TO_EDGE,[rp]:o.MIRRORED_REPEAT},St={[Ii]:o.NEAREST,[AE]:o.NEAREST_MIPMAP_NEAREST,[Zu]:o.NEAREST_MIPMAP_LINEAR,[Ji]:o.LINEAR,[md]:o.LINEAR_MIPMAP_NEAREST,[js]:o.LINEAR_MIPMAP_LINEAR},Ht={[DE]:o.NEVER,[zE]:o.ALWAYS,[UE]:o.LESS,[Gy]:o.LEQUAL,[NE]:o.EQUAL,[PE]:o.GEQUAL,[LE]:o.GREATER,[OE]:o.NOTEQUAL};function re(L,b){if(b.type===Aa&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Ji||b.magFilter===md||b.magFilter===Zu||b.magFilter===js||b.minFilter===Ji||b.minFilter===md||b.minFilter===Zu||b.minFilter===js)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(L,o.TEXTURE_WRAP_S,_t[b.wrapS]),o.texParameteri(L,o.TEXTURE_WRAP_T,_t[b.wrapT]),(L===o.TEXTURE_3D||L===o.TEXTURE_2D_ARRAY)&&o.texParameteri(L,o.TEXTURE_WRAP_R,_t[b.wrapR]),o.texParameteri(L,o.TEXTURE_MAG_FILTER,St[b.magFilter]),o.texParameteri(L,o.TEXTURE_MIN_FILTER,St[b.minFilter]),b.compareFunction&&(o.texParameteri(L,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(L,o.TEXTURE_COMPARE_FUNC,Ht[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ii||b.minFilter!==Zu&&b.minFilter!==js||b.type===Aa&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||r.get(b).__currentAnisotropy){const nt=e.get("EXT_texture_filter_anisotropic");o.texParameterf(L,nt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,l.getMaxAnisotropy())),r.get(b).__currentAnisotropy=b.anisotropy}}}function xe(L,b){let nt=!1;L.__webglInit===void 0&&(L.__webglInit=!0,b.addEventListener("dispose",U));const pt=b.source;let yt=y.get(pt);yt===void 0&&(yt={},y.set(pt,yt));const ht=ot(b);if(ht!==L.__cacheKey){yt[ht]===void 0&&(yt[ht]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,nt=!0),yt[ht].usedTimes++;const qt=yt[L.__cacheKey];qt!==void 0&&(yt[L.__cacheKey].usedTimes--,qt.usedTimes===0&&C(b)),L.__cacheKey=ht,L.__webglTexture=yt[ht].texture}return nt}function F(L,b,nt){return Math.floor(Math.floor(L/nt)/b)}function ft(L,b,nt,pt){const ht=L.updateRanges;if(ht.length===0)i.texSubImage2D(o.TEXTURE_2D,0,0,0,b.width,b.height,nt,pt,b.data);else{ht.sort((bt,Ot)=>bt.start-Ot.start);let qt=0;for(let bt=1;bt<ht.length;bt++){const Ot=ht[qt],ae=ht[bt],Jt=Ot.start+Ot.count,Pt=F(ae.start,b.width,4),he=F(Ot.start,b.width,4);ae.start<=Jt+1&&Pt===he&&F(ae.start+ae.count-1,b.width,4)===Pt?Ot.count=Math.max(Ot.count,ae.start+ae.count-Ot.start):(++qt,ht[qt]=ae)}ht.length=qt+1;const Ct=o.getParameter(o.UNPACK_ROW_LENGTH),Qt=o.getParameter(o.UNPACK_SKIP_PIXELS),$t=o.getParameter(o.UNPACK_SKIP_ROWS);o.pixelStorei(o.UNPACK_ROW_LENGTH,b.width);for(let bt=0,Ot=ht.length;bt<Ot;bt++){const ae=ht[bt],Jt=Math.floor(ae.start/4),Pt=Math.ceil(ae.count/4),he=Jt%b.width,k=Math.floor(Jt/b.width),Rt=Pt,Ut=1;o.pixelStorei(o.UNPACK_SKIP_PIXELS,he),o.pixelStorei(o.UNPACK_SKIP_ROWS,k),i.texSubImage2D(o.TEXTURE_2D,0,he,k,Rt,Ut,nt,pt,b.data)}L.clearUpdateRanges(),o.pixelStorei(o.UNPACK_ROW_LENGTH,Ct),o.pixelStorei(o.UNPACK_SKIP_PIXELS,Qt),o.pixelStorei(o.UNPACK_SKIP_ROWS,$t)}}function $(L,b,nt){let pt=o.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(pt=o.TEXTURE_2D_ARRAY),b.isData3DTexture&&(pt=o.TEXTURE_3D);const yt=xe(L,b),ht=b.source;i.bindTexture(pt,L.__webglTexture,o.TEXTURE0+nt);const qt=r.get(ht);if(ht.version!==qt.__version||yt===!0){i.activeTexture(o.TEXTURE0+nt);const Ct=Ne.getPrimaries(Ne.workingColorSpace),Qt=b.colorSpace===us?null:Ne.getPrimaries(b.colorSpace),$t=b.colorSpace===us||Ct===Qt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,b.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,b.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let bt=A(b.image,!1,l.maxTextureSize);bt=Ye(b,bt);const Ot=f.convert(b.format,b.colorSpace),ae=f.convert(b.type);let Jt=O(b.internalFormat,Ot,ae,b.colorSpace,b.isVideoTexture);re(pt,b);let Pt;const he=b.mipmaps,k=b.isVideoTexture!==!0,Rt=qt.__version===void 0||yt===!0,Ut=ht.dataReady,Yt=H(b,bt);if(b.isDepthTexture)Jt=D(b.format===xl,b.type),Rt&&(k?i.texStorage2D(o.TEXTURE_2D,1,Jt,bt.width,bt.height):i.texImage2D(o.TEXTURE_2D,0,Jt,bt.width,bt.height,0,Ot,ae,null));else if(b.isDataTexture)if(he.length>0){k&&Rt&&i.texStorage2D(o.TEXTURE_2D,Yt,Jt,he[0].width,he[0].height);for(let Et=0,gt=he.length;Et<gt;Et++)Pt=he[Et],k?Ut&&i.texSubImage2D(o.TEXTURE_2D,Et,0,0,Pt.width,Pt.height,Ot,ae,Pt.data):i.texImage2D(o.TEXTURE_2D,Et,Jt,Pt.width,Pt.height,0,Ot,ae,Pt.data);b.generateMipmaps=!1}else k?(Rt&&i.texStorage2D(o.TEXTURE_2D,Yt,Jt,bt.width,bt.height),Ut&&ft(b,bt,Ot,ae)):i.texImage2D(o.TEXTURE_2D,0,Jt,bt.width,bt.height,0,Ot,ae,bt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){k&&Rt&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Yt,Jt,he[0].width,he[0].height,bt.depth);for(let Et=0,gt=he.length;Et<gt;Et++)if(Pt=he[Et],b.format!==zi)if(Ot!==null)if(k){if(Ut)if(b.layerUpdates.size>0){const Kt=$v(Pt.width,Pt.height,b.format,b.type);for(const ce of b.layerUpdates){const Ge=Pt.data.subarray(ce*Kt/Pt.data.BYTES_PER_ELEMENT,(ce+1)*Kt/Pt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,Et,0,0,ce,Pt.width,Pt.height,1,Ot,Ge)}b.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,Et,0,0,0,Pt.width,Pt.height,bt.depth,Ot,Pt.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,Et,Jt,Pt.width,Pt.height,bt.depth,0,Pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?Ut&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,Et,0,0,0,Pt.width,Pt.height,bt.depth,Ot,ae,Pt.data):i.texImage3D(o.TEXTURE_2D_ARRAY,Et,Jt,Pt.width,Pt.height,bt.depth,0,Ot,ae,Pt.data)}else{k&&Rt&&i.texStorage2D(o.TEXTURE_2D,Yt,Jt,he[0].width,he[0].height);for(let Et=0,gt=he.length;Et<gt;Et++)Pt=he[Et],b.format!==zi?Ot!==null?k?Ut&&i.compressedTexSubImage2D(o.TEXTURE_2D,Et,0,0,Pt.width,Pt.height,Ot,Pt.data):i.compressedTexImage2D(o.TEXTURE_2D,Et,Jt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?Ut&&i.texSubImage2D(o.TEXTURE_2D,Et,0,0,Pt.width,Pt.height,Ot,ae,Pt.data):i.texImage2D(o.TEXTURE_2D,Et,Jt,Pt.width,Pt.height,0,Ot,ae,Pt.data)}else if(b.isDataArrayTexture)if(k){if(Rt&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Yt,Jt,bt.width,bt.height,bt.depth),Ut)if(b.layerUpdates.size>0){const Et=$v(bt.width,bt.height,b.format,b.type);for(const gt of b.layerUpdates){const Kt=bt.data.subarray(gt*Et/bt.data.BYTES_PER_ELEMENT,(gt+1)*Et/bt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,gt,bt.width,bt.height,1,Ot,ae,Kt)}b.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,bt.width,bt.height,bt.depth,Ot,ae,bt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Jt,bt.width,bt.height,bt.depth,0,Ot,ae,bt.data);else if(b.isData3DTexture)k?(Rt&&i.texStorage3D(o.TEXTURE_3D,Yt,Jt,bt.width,bt.height,bt.depth),Ut&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,bt.width,bt.height,bt.depth,Ot,ae,bt.data)):i.texImage3D(o.TEXTURE_3D,0,Jt,bt.width,bt.height,bt.depth,0,Ot,ae,bt.data);else if(b.isFramebufferTexture){if(Rt)if(k)i.texStorage2D(o.TEXTURE_2D,Yt,Jt,bt.width,bt.height);else{let Et=bt.width,gt=bt.height;for(let Kt=0;Kt<Yt;Kt++)i.texImage2D(o.TEXTURE_2D,Kt,Jt,Et,gt,0,Ot,ae,null),Et>>=1,gt>>=1}}else if(he.length>0){if(k&&Rt){const Et=We(he[0]);i.texStorage2D(o.TEXTURE_2D,Yt,Jt,Et.width,Et.height)}for(let Et=0,gt=he.length;Et<gt;Et++)Pt=he[Et],k?Ut&&i.texSubImage2D(o.TEXTURE_2D,Et,0,0,Ot,ae,Pt):i.texImage2D(o.TEXTURE_2D,Et,Jt,Ot,ae,Pt);b.generateMipmaps=!1}else if(k){if(Rt){const Et=We(bt);i.texStorage2D(o.TEXTURE_2D,Yt,Jt,Et.width,Et.height)}Ut&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Ot,ae,bt)}else i.texImage2D(o.TEXTURE_2D,0,Jt,Ot,ae,bt);M(b)&&S(pt),qt.__version=ht.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function at(L,b,nt){if(b.image.length!==6)return;const pt=xe(L,b),yt=b.source;i.bindTexture(o.TEXTURE_CUBE_MAP,L.__webglTexture,o.TEXTURE0+nt);const ht=r.get(yt);if(yt.version!==ht.__version||pt===!0){i.activeTexture(o.TEXTURE0+nt);const qt=Ne.getPrimaries(Ne.workingColorSpace),Ct=b.colorSpace===us?null:Ne.getPrimaries(b.colorSpace),Qt=b.colorSpace===us||qt===Ct?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,b.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,b.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qt);const $t=b.isCompressedTexture||b.image[0].isCompressedTexture,bt=b.image[0]&&b.image[0].isDataTexture,Ot=[];for(let gt=0;gt<6;gt++)!$t&&!bt?Ot[gt]=A(b.image[gt],!0,l.maxCubemapSize):Ot[gt]=bt?b.image[gt].image:b.image[gt],Ot[gt]=Ye(b,Ot[gt]);const ae=Ot[0],Jt=f.convert(b.format,b.colorSpace),Pt=f.convert(b.type),he=O(b.internalFormat,Jt,Pt,b.colorSpace),k=b.isVideoTexture!==!0,Rt=ht.__version===void 0||pt===!0,Ut=yt.dataReady;let Yt=H(b,ae);re(o.TEXTURE_CUBE_MAP,b);let Et;if($t){k&&Rt&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Yt,he,ae.width,ae.height);for(let gt=0;gt<6;gt++){Et=Ot[gt].mipmaps;for(let Kt=0;Kt<Et.length;Kt++){const ce=Et[Kt];b.format!==zi?Jt!==null?k?Ut&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Kt,0,0,ce.width,ce.height,Jt,ce.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Kt,he,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?Ut&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Kt,0,0,ce.width,ce.height,Jt,Pt,ce.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Kt,he,ce.width,ce.height,0,Jt,Pt,ce.data)}}}else{if(Et=b.mipmaps,k&&Rt){Et.length>0&&Yt++;const gt=We(Ot[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Yt,he,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(bt){k?Ut&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,Ot[gt].width,Ot[gt].height,Jt,Pt,Ot[gt].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,he,Ot[gt].width,Ot[gt].height,0,Jt,Pt,Ot[gt].data);for(let Kt=0;Kt<Et.length;Kt++){const Ge=Et[Kt].image[gt].image;k?Ut&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Kt+1,0,0,Ge.width,Ge.height,Jt,Pt,Ge.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Kt+1,he,Ge.width,Ge.height,0,Jt,Pt,Ge.data)}}else{k?Ut&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,Jt,Pt,Ot[gt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,he,Jt,Pt,Ot[gt]);for(let Kt=0;Kt<Et.length;Kt++){const ce=Et[Kt];k?Ut&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Kt+1,0,0,Jt,Pt,ce.image[gt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Kt+1,he,Jt,Pt,ce.image[gt])}}}M(b)&&S(o.TEXTURE_CUBE_MAP),ht.__version=yt.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function xt(L,b,nt,pt,yt,ht){const qt=f.convert(nt.format,nt.colorSpace),Ct=f.convert(nt.type),Qt=O(nt.internalFormat,qt,Ct,nt.colorSpace),$t=r.get(b),bt=r.get(nt);if(bt.__renderTarget=b,!$t.__hasExternalTextures){const Ot=Math.max(1,b.width>>ht),ae=Math.max(1,b.height>>ht);yt===o.TEXTURE_3D||yt===o.TEXTURE_2D_ARRAY?i.texImage3D(yt,ht,Qt,Ot,ae,b.depth,0,qt,Ct,null):i.texImage2D(yt,ht,Qt,Ot,ae,0,qt,Ct,null)}i.bindFramebuffer(o.FRAMEBUFFER,L),Bt(b)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,pt,yt,bt.__webglTexture,0,Zt(b)):(yt===o.TEXTURE_2D||yt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&yt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,pt,yt,bt.__webglTexture,ht),i.bindFramebuffer(o.FRAMEBUFFER,null)}function Nt(L,b,nt){if(o.bindRenderbuffer(o.RENDERBUFFER,L),b.depthBuffer){const pt=b.depthTexture,yt=pt&&pt.isDepthTexture?pt.type:null,ht=D(b.stencilBuffer,yt),qt=b.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ct=Zt(b);Bt(b)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Ct,ht,b.width,b.height):nt?o.renderbufferStorageMultisample(o.RENDERBUFFER,Ct,ht,b.width,b.height):o.renderbufferStorage(o.RENDERBUFFER,ht,b.width,b.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,qt,o.RENDERBUFFER,L)}else{const pt=b.textures;for(let yt=0;yt<pt.length;yt++){const ht=pt[yt],qt=f.convert(ht.format,ht.colorSpace),Ct=f.convert(ht.type),Qt=O(ht.internalFormat,qt,Ct,ht.colorSpace),$t=Zt(b);nt&&Bt(b)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,$t,Qt,b.width,b.height):Bt(b)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,$t,Qt,b.width,b.height):o.renderbufferStorage(o.RENDERBUFFER,Qt,b.width,b.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function At(L,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,L),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const pt=r.get(b.depthTexture);pt.__renderTarget=b,(!pt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ct(b.depthTexture,0);const yt=pt.__webglTexture,ht=Zt(b);if(b.depthTexture.format===Sl)Bt(b)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,yt,0,ht):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,yt,0);else if(b.depthTexture.format===xl)Bt(b)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,yt,0,ht):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,yt,0);else throw new Error("Unknown depthTexture format")}function Mt(L){const b=r.get(L),nt=L.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==L.depthTexture){const pt=L.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),pt){const yt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,pt.removeEventListener("dispose",yt)};pt.addEventListener("dispose",yt),b.__depthDisposeCallback=yt}b.__boundDepthTexture=pt}if(L.depthTexture&&!b.__autoAllocateDepthBuffer){if(nt)throw new Error("target.depthTexture not supported in Cube render targets");const pt=L.texture.mipmaps;pt&&pt.length>0?At(b.__webglFramebuffer[0],L):At(b.__webglFramebuffer,L)}else if(nt){b.__webglDepthbuffer=[];for(let pt=0;pt<6;pt++)if(i.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer[pt]),b.__webglDepthbuffer[pt]===void 0)b.__webglDepthbuffer[pt]=o.createRenderbuffer(),Nt(b.__webglDepthbuffer[pt],L,!1);else{const yt=L.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ht=b.__webglDepthbuffer[pt];o.bindRenderbuffer(o.RENDERBUFFER,ht),o.framebufferRenderbuffer(o.FRAMEBUFFER,yt,o.RENDERBUFFER,ht)}}else{const pt=L.texture.mipmaps;if(pt&&pt.length>0?i.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer[0]):i.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=o.createRenderbuffer(),Nt(b.__webglDepthbuffer,L,!1);else{const yt=L.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ht=b.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,ht),o.framebufferRenderbuffer(o.FRAMEBUFFER,yt,o.RENDERBUFFER,ht)}}i.bindFramebuffer(o.FRAMEBUFFER,null)}function vt(L,b,nt){const pt=r.get(L);b!==void 0&&xt(pt.__webglFramebuffer,L,L.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),nt!==void 0&&Mt(L)}function P(L){const b=L.texture,nt=r.get(L),pt=r.get(b);L.addEventListener("dispose",N);const yt=L.textures,ht=L.isWebGLCubeRenderTarget===!0,qt=yt.length>1;if(qt||(pt.__webglTexture===void 0&&(pt.__webglTexture=o.createTexture()),pt.__version=b.version,h.memory.textures++),ht){nt.__webglFramebuffer=[];for(let Ct=0;Ct<6;Ct++)if(b.mipmaps&&b.mipmaps.length>0){nt.__webglFramebuffer[Ct]=[];for(let Qt=0;Qt<b.mipmaps.length;Qt++)nt.__webglFramebuffer[Ct][Qt]=o.createFramebuffer()}else nt.__webglFramebuffer[Ct]=o.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){nt.__webglFramebuffer=[];for(let Ct=0;Ct<b.mipmaps.length;Ct++)nt.__webglFramebuffer[Ct]=o.createFramebuffer()}else nt.__webglFramebuffer=o.createFramebuffer();if(qt)for(let Ct=0,Qt=yt.length;Ct<Qt;Ct++){const $t=r.get(yt[Ct]);$t.__webglTexture===void 0&&($t.__webglTexture=o.createTexture(),h.memory.textures++)}if(L.samples>0&&Bt(L)===!1){nt.__webglMultisampledFramebuffer=o.createFramebuffer(),nt.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,nt.__webglMultisampledFramebuffer);for(let Ct=0;Ct<yt.length;Ct++){const Qt=yt[Ct];nt.__webglColorRenderbuffer[Ct]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,nt.__webglColorRenderbuffer[Ct]);const $t=f.convert(Qt.format,Qt.colorSpace),bt=f.convert(Qt.type),Ot=O(Qt.internalFormat,$t,bt,Qt.colorSpace,L.isXRRenderTarget===!0),ae=Zt(L);o.renderbufferStorageMultisample(o.RENDERBUFFER,ae,Ot,L.width,L.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ct,o.RENDERBUFFER,nt.__webglColorRenderbuffer[Ct])}o.bindRenderbuffer(o.RENDERBUFFER,null),L.depthBuffer&&(nt.__webglDepthRenderbuffer=o.createRenderbuffer(),Nt(nt.__webglDepthRenderbuffer,L,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(ht){i.bindTexture(o.TEXTURE_CUBE_MAP,pt.__webglTexture),re(o.TEXTURE_CUBE_MAP,b);for(let Ct=0;Ct<6;Ct++)if(b.mipmaps&&b.mipmaps.length>0)for(let Qt=0;Qt<b.mipmaps.length;Qt++)xt(nt.__webglFramebuffer[Ct][Qt],L,b,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,Qt);else xt(nt.__webglFramebuffer[Ct],L,b,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0);M(b)&&S(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(qt){for(let Ct=0,Qt=yt.length;Ct<Qt;Ct++){const $t=yt[Ct],bt=r.get($t);let Ot=o.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Ot=L.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Ot,bt.__webglTexture),re(Ot,$t),xt(nt.__webglFramebuffer,L,$t,o.COLOR_ATTACHMENT0+Ct,Ot,0),M($t)&&S(Ot)}i.unbindTexture()}else{let Ct=o.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Ct=L.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Ct,pt.__webglTexture),re(Ct,b),b.mipmaps&&b.mipmaps.length>0)for(let Qt=0;Qt<b.mipmaps.length;Qt++)xt(nt.__webglFramebuffer[Qt],L,b,o.COLOR_ATTACHMENT0,Ct,Qt);else xt(nt.__webglFramebuffer,L,b,o.COLOR_ATTACHMENT0,Ct,0);M(b)&&S(Ct),i.unbindTexture()}L.depthBuffer&&Mt(L)}function oe(L){const b=L.textures;for(let nt=0,pt=b.length;nt<pt;nt++){const yt=b[nt];if(M(yt)){const ht=I(L),qt=r.get(yt).__webglTexture;i.bindTexture(ht,qt),S(ht),i.unbindTexture()}}}const Xt=[],Gt=[];function wt(L){if(L.samples>0){if(Bt(L)===!1){const b=L.textures,nt=L.width,pt=L.height;let yt=o.COLOR_BUFFER_BIT;const ht=L.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,qt=r.get(L),Ct=b.length>1;if(Ct)for(let $t=0;$t<b.length;$t++)i.bindFramebuffer(o.FRAMEBUFFER,qt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+$t,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,qt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+$t,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,qt.__webglMultisampledFramebuffer);const Qt=L.texture.mipmaps;Qt&&Qt.length>0?i.bindFramebuffer(o.DRAW_FRAMEBUFFER,qt.__webglFramebuffer[0]):i.bindFramebuffer(o.DRAW_FRAMEBUFFER,qt.__webglFramebuffer);for(let $t=0;$t<b.length;$t++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(yt|=o.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(yt|=o.STENCIL_BUFFER_BIT)),Ct){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,qt.__webglColorRenderbuffer[$t]);const bt=r.get(b[$t]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,bt,0)}o.blitFramebuffer(0,0,nt,pt,0,0,nt,pt,yt,o.NEAREST),v===!0&&(Xt.length=0,Gt.length=0,Xt.push(o.COLOR_ATTACHMENT0+$t),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Xt.push(ht),Gt.push(ht),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,Gt)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,Xt))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Ct)for(let $t=0;$t<b.length;$t++){i.bindFramebuffer(o.FRAMEBUFFER,qt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+$t,o.RENDERBUFFER,qt.__webglColorRenderbuffer[$t]);const bt=r.get(b[$t]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,qt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+$t,o.TEXTURE_2D,bt,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,qt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&v){const b=L.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[b])}}}function Zt(L){return Math.min(l.maxSamples,L.samples)}function Bt(L){const b=r.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function le(L){const b=h.render.frame;g.get(L)!==b&&(g.set(L,b),L.update())}function Ye(L,b){const nt=L.colorSpace,pt=L.format,yt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||nt!==fo&&nt!==us&&(Ne.getTransfer(nt)===Xe?(pt!==zi||yt!==ta)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",nt)),b}function We(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(p.width=L.naturalWidth||L.width,p.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(p.width=L.displayWidth,p.height=L.displayHeight):(p.width=L.width,p.height=L.height),p}this.allocateTextureUnit=it,this.resetTextureUnits=j,this.setTexture2D=ct,this.setTexture2DArray=V,this.setTexture3D=lt,this.setTextureCube=q,this.rebindTextures=vt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=Bt}function SC(o,e){function i(r,l=us){let f;const h=Ne.getTransfer(l);if(r===ta)return o.UNSIGNED_BYTE;if(r===Gp)return o.UNSIGNED_SHORT_4_4_4_4;if(r===Vp)return o.UNSIGNED_SHORT_5_5_5_1;if(r===Oy)return o.UNSIGNED_INT_5_9_9_9_REV;if(r===Py)return o.UNSIGNED_INT_10F_11F_11F_REV;if(r===Ny)return o.BYTE;if(r===Ly)return o.SHORT;if(r===vl)return o.UNSIGNED_SHORT;if(r===Hp)return o.INT;if(r===Zs)return o.UNSIGNED_INT;if(r===Aa)return o.FLOAT;if(r===Tl)return o.HALF_FLOAT;if(r===zy)return o.ALPHA;if(r===Iy)return o.RGB;if(r===zi)return o.RGBA;if(r===Sl)return o.DEPTH_COMPONENT;if(r===xl)return o.DEPTH_STENCIL;if(r===By)return o.RED;if(r===Xp)return o.RED_INTEGER;if(r===Fy)return o.RG;if(r===kp)return o.RG_INTEGER;if(r===Yp)return o.RGBA_INTEGER;if(r===Mc||r===Ec||r===Tc||r===bc)if(h===Xe)if(f=e.get("WEBGL_compressed_texture_s3tc_srgb"),f!==null){if(r===Mc)return f.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ec)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Tc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===bc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(f=e.get("WEBGL_compressed_texture_s3tc"),f!==null){if(r===Mc)return f.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ec)return f.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Tc)return f.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===bc)return f.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===op||r===lp||r===up||r===cp)if(f=e.get("WEBGL_compressed_texture_pvrtc"),f!==null){if(r===op)return f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===lp)return f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===up)return f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===cp)return f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===fp||r===hp||r===dp)if(f=e.get("WEBGL_compressed_texture_etc"),f!==null){if(r===fp||r===hp)return h===Xe?f.COMPRESSED_SRGB8_ETC2:f.COMPRESSED_RGB8_ETC2;if(r===dp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:f.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===pp||r===mp||r===gp||r===_p||r===vp||r===yp||r===Sp||r===xp||r===Mp||r===Ep||r===Tp||r===bp||r===Ap||r===Rp)if(f=e.get("WEBGL_compressed_texture_astc"),f!==null){if(r===pp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:f.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===mp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:f.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===gp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:f.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===_p)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:f.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===vp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:f.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===yp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:f.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Sp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:f.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===xp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:f.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Mp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:f.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ep)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:f.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Tp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:f.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===bp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:f.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Ap)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:f.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Rp)return h===Xe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:f.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Cp||r===wp||r===Dp)if(f=e.get("EXT_texture_compression_bptc"),f!==null){if(r===Cp)return h===Xe?f.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:f.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===wp)return f.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Dp)return f.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Up||r===Np||r===Lp||r===Op)if(f=e.get("EXT_texture_compression_rgtc"),f!==null){if(r===Up)return f.COMPRESSED_RED_RGTC1_EXT;if(r===Np)return f.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Lp)return f.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Op)return f.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===yl?o.UNSIGNED_INT_24_8:o[r]!==void 0?o[r]:null}return{convert:i}}const xC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,MC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class EC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const r=new Jy(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,r=new ds({vertexShader:xC,fragmentShader:MC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Ai(new bl(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class TC extends $s{constructor(e,i){super();const r=this;let l=null,f=1,h=null,d="local-floor",v=1,p=null,g=null,m=null,y=null,x=null,T=null;const A=typeof XRWebGLBinding<"u",M=new EC,S={},I=i.getContextAttributes();let O=null,D=null;const H=[],U=[],N=new fe;let G=null;const C=new Ti;C.viewport=new rn;const w=new Ti;w.viewport=new rn;const B=[C,w],j=new VT;let it=null,ot=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let at=H[$];return at===void 0&&(at=new zd,H[$]=at),at.getTargetRaySpace()},this.getControllerGrip=function($){let at=H[$];return at===void 0&&(at=new zd,H[$]=at),at.getGripSpace()},this.getHand=function($){let at=H[$];return at===void 0&&(at=new zd,H[$]=at),at.getHandSpace()};function ct($){const at=U.indexOf($.inputSource);if(at===-1)return;const xt=H[at];xt!==void 0&&(xt.update($.inputSource,$.frame,p||h),xt.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){l.removeEventListener("select",ct),l.removeEventListener("selectstart",ct),l.removeEventListener("selectend",ct),l.removeEventListener("squeeze",ct),l.removeEventListener("squeezestart",ct),l.removeEventListener("squeezeend",ct),l.removeEventListener("end",V),l.removeEventListener("inputsourceschange",lt);for(let $=0;$<H.length;$++){const at=U[$];at!==null&&(U[$]=null,H[$].disconnect(at))}it=null,ot=null,M.reset();for(const $ in S)delete S[$];e.setRenderTarget(O),x=null,y=null,m=null,l=null,D=null,ft.stop(),r.isPresenting=!1,e.setPixelRatio(G),e.setSize(N.width,N.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){f=$,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){d=$,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function($){p=$},this.getBaseLayer=function(){return y!==null?y:x},this.getBinding=function(){return m===null&&A&&(m=new XRWebGLBinding(l,i)),m},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function($){if(l=$,l!==null){if(O=e.getRenderTarget(),l.addEventListener("select",ct),l.addEventListener("selectstart",ct),l.addEventListener("selectend",ct),l.addEventListener("squeeze",ct),l.addEventListener("squeezestart",ct),l.addEventListener("squeezeend",ct),l.addEventListener("end",V),l.addEventListener("inputsourceschange",lt),I.xrCompatible!==!0&&await i.makeXRCompatible(),G=e.getPixelRatio(),e.getSize(N),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Nt=null,At=null;I.depth&&(At=I.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,xt=I.stencil?xl:Sl,Nt=I.stencil?yl:Zs);const Mt={colorFormat:i.RGBA8,depthFormat:At,scaleFactor:f};m=this.getBinding(),y=m.createProjectionLayer(Mt),l.updateRenderState({layers:[y]}),e.setPixelRatio(1),e.setSize(y.textureWidth,y.textureHeight,!1),D=new Qs(y.textureWidth,y.textureHeight,{format:zi,type:ta,depthTexture:new Qy(y.textureWidth,y.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:I.stencil,colorSpace:e.outputColorSpace,samples:I.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}else{const xt={antialias:I.antialias,alpha:!0,depth:I.depth,stencil:I.stencil,framebufferScaleFactor:f};x=new XRWebGLLayer(l,i,xt),l.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),D=new Qs(x.framebufferWidth,x.framebufferHeight,{format:zi,type:ta,colorSpace:e.outputColorSpace,stencilBuffer:I.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}D.isXRRenderTarget=!0,this.setFoveation(v),p=null,h=await l.requestReferenceSpace(d),ft.setContext(l),ft.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function lt($){for(let at=0;at<$.removed.length;at++){const xt=$.removed[at],Nt=U.indexOf(xt);Nt>=0&&(U[Nt]=null,H[Nt].disconnect(xt))}for(let at=0;at<$.added.length;at++){const xt=$.added[at];let Nt=U.indexOf(xt);if(Nt===-1){for(let Mt=0;Mt<H.length;Mt++)if(Mt>=U.length){U.push(xt),Nt=Mt;break}else if(U[Mt]===null){U[Mt]=xt,Nt=Mt;break}if(Nt===-1)break}const At=H[Nt];At&&At.connect(xt)}}const q=new Q,_t=new Q;function St($,at,xt){q.setFromMatrixPosition(at.matrixWorld),_t.setFromMatrixPosition(xt.matrixWorld);const Nt=q.distanceTo(_t),At=at.projectionMatrix.elements,Mt=xt.projectionMatrix.elements,vt=At[14]/(At[10]-1),P=At[14]/(At[10]+1),oe=(At[9]+1)/At[5],Xt=(At[9]-1)/At[5],Gt=(At[8]-1)/At[0],wt=(Mt[8]+1)/Mt[0],Zt=vt*Gt,Bt=vt*wt,le=Nt/(-Gt+wt),Ye=le*-Gt;if(at.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ye),$.translateZ(le),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),At[10]===-1)$.projectionMatrix.copy(at.projectionMatrix),$.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{const We=vt+le,L=P+le,b=Zt-Ye,nt=Bt+(Nt-Ye),pt=oe*P/L*We,yt=Xt*P/L*We;$.projectionMatrix.makePerspective(b,nt,pt,yt,We,L),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Ht($,at){at===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(at.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(l===null)return;let at=$.near,xt=$.far;M.texture!==null&&(M.depthNear>0&&(at=M.depthNear),M.depthFar>0&&(xt=M.depthFar)),j.near=w.near=C.near=at,j.far=w.far=C.far=xt,(it!==j.near||ot!==j.far)&&(l.updateRenderState({depthNear:j.near,depthFar:j.far}),it=j.near,ot=j.far),j.layers.mask=$.layers.mask|6,C.layers.mask=j.layers.mask&3,w.layers.mask=j.layers.mask&5;const Nt=$.parent,At=j.cameras;Ht(j,Nt);for(let Mt=0;Mt<At.length;Mt++)Ht(At[Mt],Nt);At.length===2?St(j,C,w):j.projectionMatrix.copy(C.projectionMatrix),re($,j,Nt)};function re($,at,xt){xt===null?$.matrix.copy(at.matrixWorld):($.matrix.copy(xt.matrixWorld),$.matrix.invert(),$.matrix.multiply(at.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(at.projectionMatrix),$.projectionMatrixInverse.copy(at.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ml*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(!(y===null&&x===null))return v},this.setFoveation=function($){v=$,y!==null&&(y.fixedFoveation=$),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=$)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(j)},this.getCameraTexture=function($){return S[$]};let xe=null;function F($,at){if(g=at.getViewerPose(p||h),T=at,g!==null){const xt=g.views;x!==null&&(e.setRenderTargetFramebuffer(D,x.framebuffer),e.setRenderTarget(D));let Nt=!1;xt.length!==j.cameras.length&&(j.cameras.length=0,Nt=!0);for(let P=0;P<xt.length;P++){const oe=xt[P];let Xt=null;if(x!==null)Xt=x.getViewport(oe);else{const wt=m.getViewSubImage(y,oe);Xt=wt.viewport,P===0&&(e.setRenderTargetTextures(D,wt.colorTexture,wt.depthStencilTexture),e.setRenderTarget(D))}let Gt=B[P];Gt===void 0&&(Gt=new Ti,Gt.layers.enable(P),Gt.viewport=new rn,B[P]=Gt),Gt.matrix.fromArray(oe.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(oe.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(Xt.x,Xt.y,Xt.width,Xt.height),P===0&&(j.matrix.copy(Gt.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),Nt===!0&&j.cameras.push(Gt)}const At=l.enabledFeatures;if(At&&At.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&A){m=r.getBinding();const P=m.getDepthInformation(xt[0]);P&&P.isValid&&P.texture&&M.init(P,l.renderState)}if(At&&At.includes("camera-access")&&A){e.state.unbindTexture(),m=r.getBinding();for(let P=0;P<xt.length;P++){const oe=xt[P].camera;if(oe){let Xt=S[oe];Xt||(Xt=new Jy,S[oe]=Xt);const Gt=m.getCameraImage(oe);Xt.sourceTexture=Gt}}}}for(let xt=0;xt<H.length;xt++){const Nt=U[xt],At=H[xt];Nt!==null&&At!==void 0&&At.update(Nt,at,p||h)}xe&&xe($,at),at.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:at}),T=null}const ft=new eS;ft.setAnimationLoop(F),this.setAnimationLoop=function($){xe=$},this.dispose=function(){}}}const Xs=new Bi,bC=new $e;function AC(o,e){function i(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function r(M,S){S.color.getRGB(M.fogColor.value,jy(o)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function l(M,S,I,O,D){S.isMeshBasicMaterial||S.isMeshLambertMaterial?f(M,S):S.isMeshToonMaterial?(f(M,S),m(M,S)):S.isMeshPhongMaterial?(f(M,S),g(M,S)):S.isMeshStandardMaterial?(f(M,S),y(M,S),S.isMeshPhysicalMaterial&&x(M,S,D)):S.isMeshMatcapMaterial?(f(M,S),T(M,S)):S.isMeshDepthMaterial?f(M,S):S.isMeshDistanceMaterial?(f(M,S),A(M,S)):S.isMeshNormalMaterial?f(M,S):S.isLineBasicMaterial?(h(M,S),S.isLineDashedMaterial&&d(M,S)):S.isPointsMaterial?v(M,S,I,O):S.isSpriteMaterial?p(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function f(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,i(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===Jn&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,i(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===Jn&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,i(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,i(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const I=e.get(S),O=I.envMap,D=I.envMapRotation;O&&(M.envMap.value=O,Xs.copy(D),Xs.x*=-1,Xs.y*=-1,Xs.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(Xs.y*=-1,Xs.z*=-1),M.envMapRotation.value.setFromMatrix4(bC.makeRotationFromEuler(Xs)),M.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,M.aoMapTransform))}function h(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform))}function d(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function v(M,S,I,O){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*I,M.scale.value=O*.5,S.map&&(M.map.value=S.map,i(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function p(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function g(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function m(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function y(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function x(M,S,I){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Jn&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=I.texture,M.transmissionSamplerSize.value.set(I.width,I.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,M.specularIntensityMapTransform))}function T(M,S){S.matcap&&(M.matcap.value=S.matcap)}function A(M,S){const I=e.get(S).light;M.referencePosition.value.setFromMatrixPosition(I.matrixWorld),M.nearDistance.value=I.shadow.camera.near,M.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function RC(o,e,i,r){let l={},f={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function v(I,O){const D=O.program;r.uniformBlockBinding(I,D)}function p(I,O){let D=l[I.id];D===void 0&&(T(I),D=g(I),l[I.id]=D,I.addEventListener("dispose",M));const H=O.program;r.updateUBOMapping(I,H);const U=e.render.frame;f[I.id]!==U&&(y(I),f[I.id]=U)}function g(I){const O=m();I.__bindingPointIndex=O;const D=o.createBuffer(),H=I.__size,U=I.usage;return o.bindBuffer(o.UNIFORM_BUFFER,D),o.bufferData(o.UNIFORM_BUFFER,H,U),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,O,D),D}function m(){for(let I=0;I<d;I++)if(h.indexOf(I)===-1)return h.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(I){const O=l[I.id],D=I.uniforms,H=I.__cache;o.bindBuffer(o.UNIFORM_BUFFER,O);for(let U=0,N=D.length;U<N;U++){const G=Array.isArray(D[U])?D[U]:[D[U]];for(let C=0,w=G.length;C<w;C++){const B=G[C];if(x(B,U,C,H)===!0){const j=B.__offset,it=Array.isArray(B.value)?B.value:[B.value];let ot=0;for(let ct=0;ct<it.length;ct++){const V=it[ct],lt=A(V);typeof V=="number"||typeof V=="boolean"?(B.__data[0]=V,o.bufferSubData(o.UNIFORM_BUFFER,j+ot,B.__data)):V.isMatrix3?(B.__data[0]=V.elements[0],B.__data[1]=V.elements[1],B.__data[2]=V.elements[2],B.__data[3]=0,B.__data[4]=V.elements[3],B.__data[5]=V.elements[4],B.__data[6]=V.elements[5],B.__data[7]=0,B.__data[8]=V.elements[6],B.__data[9]=V.elements[7],B.__data[10]=V.elements[8],B.__data[11]=0):(V.toArray(B.__data,ot),ot+=lt.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,j,B.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function x(I,O,D,H){const U=I.value,N=O+"_"+D;if(H[N]===void 0)return typeof U=="number"||typeof U=="boolean"?H[N]=U:H[N]=U.clone(),!0;{const G=H[N];if(typeof U=="number"||typeof U=="boolean"){if(G!==U)return H[N]=U,!0}else if(G.equals(U)===!1)return G.copy(U),!0}return!1}function T(I){const O=I.uniforms;let D=0;const H=16;for(let N=0,G=O.length;N<G;N++){const C=Array.isArray(O[N])?O[N]:[O[N]];for(let w=0,B=C.length;w<B;w++){const j=C[w],it=Array.isArray(j.value)?j.value:[j.value];for(let ot=0,ct=it.length;ot<ct;ot++){const V=it[ot],lt=A(V),q=D%H,_t=q%lt.boundary,St=q+_t;D+=_t,St!==0&&H-St<lt.storage&&(D+=H-St),j.__data=new Float32Array(lt.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=D,D+=lt.storage}}}const U=D%H;return U>0&&(D+=H-U),I.__size=D,I.__cache={},this}function A(I){const O={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(O.boundary=4,O.storage=4):I.isVector2?(O.boundary=8,O.storage=8):I.isVector3||I.isColor?(O.boundary=16,O.storage=12):I.isVector4?(O.boundary=16,O.storage=16):I.isMatrix3?(O.boundary=48,O.storage=48):I.isMatrix4?(O.boundary=64,O.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),O}function M(I){const O=I.target;O.removeEventListener("dispose",M);const D=h.indexOf(O.__bindingPointIndex);h.splice(D,1),o.deleteBuffer(l[O.id]),delete l[O.id],delete f[O.id]}function S(){for(const I in l)o.deleteBuffer(l[I]);h=[],l={},f={}}return{bind:v,update:p,dispose:S}}class CC{constructor(e={}){const{canvas:i=$E(),context:r=null,depth:l=!0,stencil:f=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:v=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:y=!1}=e;this.isWebGLRenderer=!0;let x;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=r.getContextAttributes().alpha}else x=h;const T=new Uint32Array(4),A=new Int32Array(4);let M=null,S=null;const I=[],O=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let H=!1;this._outputColorSpace=fi;let U=0,N=0,G=null,C=-1,w=null;const B=new rn,j=new rn;let it=null;const ot=new Te(0);let ct=0,V=i.width,lt=i.height,q=1,_t=null,St=null;const Ht=new rn(0,0,V,lt),re=new rn(0,0,V,lt);let xe=!1;const F=new Zp;let ft=!1,$=!1;const at=new $e,xt=new Q,Nt=new rn,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Mt=!1;function vt(){return G===null?q:1}let P=r;function oe(R,K){return i.getContext(R,K)}try{const R={alpha:!0,depth:l,stencil:f,antialias:d,premultipliedAlpha:v,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:m};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Fp}`),i.addEventListener("webglcontextlost",Ut,!1),i.addEventListener("webglcontextrestored",Yt,!1),i.addEventListener("webglcontextcreationerror",Et,!1),P===null){const K="webgl2";if(P=oe(K,R),P===null)throw oe(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Xt,Gt,wt,Zt,Bt,le,Ye,We,L,b,nt,pt,yt,ht,qt,Ct,Qt,$t,bt,Ot,ae,Jt,Pt,he;function k(){Xt=new B1(P),Xt.init(),Jt=new SC(P,Xt),Gt=new U1(P,Xt,e,Jt),wt=new vC(P,Xt),Gt.reversedDepthBuffer&&y&&wt.buffers.depth.setReversed(!0),Zt=new G1(P),Bt=new sC,le=new yC(P,Xt,wt,Bt,Gt,Jt,Zt),Ye=new L1(D),We=new I1(D),L=new WT(P),Pt=new w1(P,L),b=new F1(P,L,Zt,Pt),nt=new X1(P,b,L,Zt),bt=new V1(P,Gt,le),Ct=new N1(Bt),pt=new aC(D,Ye,We,Xt,Gt,Pt,Ct),yt=new AC(D,Bt),ht=new oC,qt=new dC(Xt),$t=new C1(D,Ye,We,wt,nt,x,v),Qt=new gC(D,nt,Gt),he=new RC(P,Zt,Gt,wt),Ot=new D1(P,Xt,Zt),ae=new H1(P,Xt,Zt),Zt.programs=pt.programs,D.capabilities=Gt,D.extensions=Xt,D.properties=Bt,D.renderLists=ht,D.shadowMap=Qt,D.state=wt,D.info=Zt}k();const Rt=new TC(D,P);this.xr=Rt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const R=Xt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Xt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(R){R!==void 0&&(q=R,this.setSize(V,lt,!1))},this.getSize=function(R){return R.set(V,lt)},this.setSize=function(R,K,rt=!0){if(Rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=R,lt=K,i.width=Math.floor(R*q),i.height=Math.floor(K*q),rt===!0&&(i.style.width=R+"px",i.style.height=K+"px"),this.setViewport(0,0,R,K)},this.getDrawingBufferSize=function(R){return R.set(V*q,lt*q).floor()},this.setDrawingBufferSize=function(R,K,rt){V=R,lt=K,q=rt,i.width=Math.floor(R*rt),i.height=Math.floor(K*rt),this.setViewport(0,0,R,K)},this.getCurrentViewport=function(R){return R.copy(B)},this.getViewport=function(R){return R.copy(Ht)},this.setViewport=function(R,K,rt,ut){R.isVector4?Ht.set(R.x,R.y,R.z,R.w):Ht.set(R,K,rt,ut),wt.viewport(B.copy(Ht).multiplyScalar(q).round())},this.getScissor=function(R){return R.copy(re)},this.setScissor=function(R,K,rt,ut){R.isVector4?re.set(R.x,R.y,R.z,R.w):re.set(R,K,rt,ut),wt.scissor(j.copy(re).multiplyScalar(q).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(R){wt.setScissorTest(xe=R)},this.setOpaqueSort=function(R){_t=R},this.setTransparentSort=function(R){St=R},this.getClearColor=function(R){return R.copy($t.getClearColor())},this.setClearColor=function(){$t.setClearColor(...arguments)},this.getClearAlpha=function(){return $t.getClearAlpha()},this.setClearAlpha=function(){$t.setClearAlpha(...arguments)},this.clear=function(R=!0,K=!0,rt=!0){let ut=0;if(R){let J=!1;if(G!==null){const Tt=G.texture.format;J=Tt===Yp||Tt===kp||Tt===Xp}if(J){const Tt=G.texture.type,zt=Tt===ta||Tt===Zs||Tt===vl||Tt===yl||Tt===Gp||Tt===Vp,Vt=$t.getClearColor(),Dt=$t.getClearAlpha(),Wt=Vt.r,ie=Vt.g,ee=Vt.b;zt?(T[0]=Wt,T[1]=ie,T[2]=ee,T[3]=Dt,P.clearBufferuiv(P.COLOR,0,T)):(A[0]=Wt,A[1]=ie,A[2]=ee,A[3]=Dt,P.clearBufferiv(P.COLOR,0,A))}else ut|=P.COLOR_BUFFER_BIT}K&&(ut|=P.DEPTH_BUFFER_BIT),rt&&(ut|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(ut)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",Ut,!1),i.removeEventListener("webglcontextrestored",Yt,!1),i.removeEventListener("webglcontextcreationerror",Et,!1),$t.dispose(),ht.dispose(),qt.dispose(),Bt.dispose(),Ye.dispose(),We.dispose(),nt.dispose(),Pt.dispose(),he.dispose(),pt.dispose(),Rt.dispose(),Rt.removeEventListener("sessionstart",mn),Rt.removeEventListener("sessionend",Nn),ea.stop()};function Ut(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),H=!0}function Yt(){console.log("THREE.WebGLRenderer: Context Restored."),H=!1;const R=Zt.autoReset,K=Qt.enabled,rt=Qt.autoUpdate,ut=Qt.needsUpdate,J=Qt.type;k(),Zt.autoReset=R,Qt.enabled=K,Qt.autoUpdate=rt,Qt.needsUpdate=ut,Qt.type=J}function Et(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function gt(R){const K=R.target;K.removeEventListener("dispose",gt),Kt(K)}function Kt(R){ce(R),Bt.remove(R)}function ce(R){const K=Bt.get(R).programs;K!==void 0&&(K.forEach(function(rt){pt.releaseProgram(rt)}),R.isShaderMaterial&&pt.releaseShaderCache(R))}this.renderBufferDirect=function(R,K,rt,ut,J,Tt){K===null&&(K=At);const zt=J.isMesh&&J.matrixWorld.determinant()<0,Vt=Rl(R,K,rt,ut,J);wt.setMaterial(ut,zt);let Dt=rt.index,Wt=1;if(ut.wireframe===!0){if(Dt=b.getWireframeAttribute(rt),Dt===void 0)return;Wt=2}const ie=rt.drawRange,ee=rt.attributes.position;let ye=ie.start*Wt,ze=(ie.start+ie.count)*Wt;Tt!==null&&(ye=Math.max(ye,Tt.start*Wt),ze=Math.min(ze,(Tt.start+Tt.count)*Wt)),Dt!==null?(ye=Math.max(ye,0),ze=Math.min(ze,Dt.count)):ee!=null&&(ye=Math.max(ye,0),ze=Math.min(ze,ee.count));const Qe=ze-ye;if(Qe<0||Qe===1/0)return;Pt.setup(J,ut,Vt,rt,Dt);let Le,we=Ot;if(Dt!==null&&(Le=L.get(Dt),we=ae,we.setIndex(Le)),J.isMesh)ut.wireframe===!0?(wt.setLineWidth(ut.wireframeLinewidth*vt()),we.setMode(P.LINES)):we.setMode(P.TRIANGLES);else if(J.isLine){let ne=ut.linewidth;ne===void 0&&(ne=1),wt.setLineWidth(ne*vt()),J.isLineSegments?we.setMode(P.LINES):J.isLineLoop?we.setMode(P.LINE_LOOP):we.setMode(P.LINE_STRIP)}else J.isPoints?we.setMode(P.POINTS):J.isSprite&&we.setMode(P.TRIANGLES);if(J.isBatchedMesh)if(J._multiDrawInstances!==null)El("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),we.renderMultiDrawInstances(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount,J._multiDrawInstances);else if(Xt.get("WEBGL_multi_draw"))we.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const ne=J._multiDrawStarts,Oe=J._multiDrawCounts,_e=J._multiDrawCount,gn=Dt?L.get(Dt).bytesPerElement:1,ti=Bt.get(ut).currentProgram.getUniforms();for(let De=0;De<_e;De++)ti.setValue(P,"_gl_DrawID",De),we.render(ne[De]/gn,Oe[De])}else if(J.isInstancedMesh)we.renderInstances(ye,Qe,J.count);else if(rt.isInstancedBufferGeometry){const ne=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,Oe=Math.min(rt.instanceCount,ne);we.renderInstances(ye,Qe,Oe)}else we.render(ye,Qe)};function Ge(R,K,rt){R.transparent===!0&&R.side===ba&&R.forceSinglePass===!1?(R.side=Jn,R.needsUpdate=!0,di(R,K,rt),R.side=hs,R.needsUpdate=!0,di(R,K,rt),R.side=ba):di(R,K,rt)}this.compile=function(R,K,rt=null){rt===null&&(rt=R),S=qt.get(rt),S.init(K),O.push(S),rt.traverseVisible(function(J){J.isLight&&J.layers.test(K.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),R!==rt&&R.traverseVisible(function(J){J.isLight&&J.layers.test(K.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),S.setupLights();const ut=new Set;return R.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const Tt=J.material;if(Tt)if(Array.isArray(Tt))for(let zt=0;zt<Tt.length;zt++){const Vt=Tt[zt];Ge(Vt,rt,J),ut.add(Vt)}else Ge(Tt,rt,J),ut.add(Tt)}),S=O.pop(),ut},this.compileAsync=function(R,K,rt=null){const ut=this.compile(R,K,rt);return new Promise(J=>{function Tt(){if(ut.forEach(function(zt){Bt.get(zt).currentProgram.isReady()&&ut.delete(zt)}),ut.size===0){J(R);return}setTimeout(Tt,10)}Xt.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let be=null;function tn(R){be&&be(R)}function mn(){ea.stop()}function Nn(){ea.start()}const ea=new eS;ea.setAnimationLoop(tn),typeof self<"u"&&ea.setContext(self),this.setAnimationLoop=function(R){be=R,Rt.setAnimationLoop(R),R===null?ea.stop():ea.start()},Rt.addEventListener("sessionstart",mn),Rt.addEventListener("sessionend",Nn),this.render=function(R,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Rt.enabled===!0&&Rt.isPresenting===!0&&(Rt.cameraAutoUpdate===!0&&Rt.updateCamera(K),K=Rt.getCamera()),R.isScene===!0&&R.onBeforeRender(D,R,K,G),S=qt.get(R,O.length),S.init(K),O.push(S),at.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),F.setFromProjectionMatrix(at,$i,K.reversedDepth),$=this.localClippingEnabled,ft=Ct.init(this.clippingPlanes,$),M=ht.get(R,I.length),M.init(),I.push(M),Rt.enabled===!0&&Rt.isPresenting===!0){const Tt=D.xr.getDepthSensingMesh();Tt!==null&&_o(Tt,K,-1/0,D.sortObjects)}_o(R,K,0,D.sortObjects),M.finish(),D.sortObjects===!0&&M.sort(_t,St),Mt=Rt.enabled===!1||Rt.isPresenting===!1||Rt.hasDepthSensing()===!1,Mt&&$t.addToRenderList(M,R),this.info.render.frame++,ft===!0&&Ct.beginShadows();const rt=S.state.shadowsArray;Qt.render(rt,R,K),ft===!0&&Ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const ut=M.opaque,J=M.transmissive;if(S.setupLights(),K.isArrayCamera){const Tt=K.cameras;if(J.length>0)for(let zt=0,Vt=Tt.length;zt<Vt;zt++){const Dt=Tt[zt];ps(ut,J,R,Dt)}Mt&&$t.render(R);for(let zt=0,Vt=Tt.length;zt<Vt;zt++){const Dt=Tt[zt];Al(M,R,Dt,Dt.viewport)}}else J.length>0&&ps(ut,J,R,K),Mt&&$t.render(R),Al(M,R,K);G!==null&&N===0&&(le.updateMultisampleRenderTarget(G),le.updateRenderTargetMipmap(G)),R.isScene===!0&&R.onAfterRender(D,R,K),Pt.resetDefaultState(),C=-1,w=null,O.pop(),O.length>0?(S=O[O.length-1],ft===!0&&Ct.setGlobalState(D.clippingPlanes,S.state.camera)):S=null,I.pop(),I.length>0?M=I[I.length-1]:M=null};function _o(R,K,rt,ut){if(R.visible===!1)return;if(R.layers.test(K.layers)){if(R.isGroup)rt=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(K);else if(R.isLight)S.pushLight(R),R.castShadow&&S.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||F.intersectsSprite(R)){ut&&Nt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(at);const zt=nt.update(R),Vt=R.material;Vt.visible&&M.push(R,zt,Vt,rt,Nt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||F.intersectsObject(R))){const zt=nt.update(R),Vt=R.material;if(ut&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Nt.copy(R.boundingSphere.center)):(zt.boundingSphere===null&&zt.computeBoundingSphere(),Nt.copy(zt.boundingSphere.center)),Nt.applyMatrix4(R.matrixWorld).applyMatrix4(at)),Array.isArray(Vt)){const Dt=zt.groups;for(let Wt=0,ie=Dt.length;Wt<ie;Wt++){const ee=Dt[Wt],ye=Vt[ee.materialIndex];ye&&ye.visible&&M.push(R,zt,ye,rt,Nt.z,ee)}}else Vt.visible&&M.push(R,zt,Vt,rt,Nt.z,null)}}const Tt=R.children;for(let zt=0,Vt=Tt.length;zt<Vt;zt++)_o(Tt[zt],K,rt,ut)}function Al(R,K,rt,ut){const J=R.opaque,Tt=R.transmissive,zt=R.transparent;S.setupLightsView(rt),ft===!0&&Ct.setGlobalState(D.clippingPlanes,rt),ut&&wt.viewport(B.copy(ut)),J.length>0&&na(J,K,rt),Tt.length>0&&na(Tt,K,rt),zt.length>0&&na(zt,K,rt),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function ps(R,K,rt,ut){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;S.state.transmissionRenderTarget[ut.id]===void 0&&(S.state.transmissionRenderTarget[ut.id]=new Qs(1,1,{generateMipmaps:!0,type:Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float")?Tl:ta,minFilter:js,samples:4,stencilBuffer:f,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ne.workingColorSpace}));const Tt=S.state.transmissionRenderTarget[ut.id],zt=ut.viewport||B;Tt.setSize(zt.z*D.transmissionResolutionScale,zt.w*D.transmissionResolutionScale);const Vt=D.getRenderTarget(),Dt=D.getActiveCubeFace(),Wt=D.getActiveMipmapLevel();D.setRenderTarget(Tt),D.getClearColor(ot),ct=D.getClearAlpha(),ct<1&&D.setClearColor(16777215,.5),D.clear(),Mt&&$t.render(rt);const ie=D.toneMapping;D.toneMapping=fs;const ee=ut.viewport;if(ut.viewport!==void 0&&(ut.viewport=void 0),S.setupLightsView(ut),ft===!0&&Ct.setGlobalState(D.clippingPlanes,ut),na(R,rt,ut),le.updateMultisampleRenderTarget(Tt),le.updateRenderTargetMipmap(Tt),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let ye=!1;for(let ze=0,Qe=K.length;ze<Qe;ze++){const Le=K[ze],we=Le.object,ne=Le.geometry,Oe=Le.material,_e=Le.group;if(Oe.side===ba&&we.layers.test(ut.layers)){const gn=Oe.side;Oe.side=Jn,Oe.needsUpdate=!0,ms(we,rt,ut,ne,Oe,_e),Oe.side=gn,Oe.needsUpdate=!0,ye=!0}}ye===!0&&(le.updateMultisampleRenderTarget(Tt),le.updateRenderTargetMipmap(Tt))}D.setRenderTarget(Vt,Dt,Wt),D.setClearColor(ot,ct),ee!==void 0&&(ut.viewport=ee),D.toneMapping=ie}function na(R,K,rt){const ut=K.isScene===!0?K.overrideMaterial:null;for(let J=0,Tt=R.length;J<Tt;J++){const zt=R[J],Vt=zt.object,Dt=zt.geometry,Wt=zt.group;let ie=zt.material;ie.allowOverride===!0&&ut!==null&&(ie=ut),Vt.layers.test(rt.layers)&&ms(Vt,K,rt,Dt,ie,Wt)}}function ms(R,K,rt,ut,J,Tt){R.onBeforeRender(D,K,rt,ut,J,Tt),R.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),J.onBeforeRender(D,K,rt,ut,R,Tt),J.transparent===!0&&J.side===ba&&J.forceSinglePass===!1?(J.side=Jn,J.needsUpdate=!0,D.renderBufferDirect(rt,K,ut,J,R,Tt),J.side=hs,J.needsUpdate=!0,D.renderBufferDirect(rt,K,ut,J,R,Tt),J.side=ba):D.renderBufferDirect(rt,K,ut,J,R,Tt),R.onAfterRender(D,K,rt,ut,J,Tt)}function di(R,K,rt){K.isScene!==!0&&(K=At);const ut=Bt.get(R),J=S.state.lights,Tt=S.state.shadowsArray,zt=J.state.version,Vt=pt.getParameters(R,J.state,Tt,K,rt),Dt=pt.getProgramCacheKey(Vt);let Wt=ut.programs;ut.environment=R.isMeshStandardMaterial?K.environment:null,ut.fog=K.fog,ut.envMap=(R.isMeshStandardMaterial?We:Ye).get(R.envMap||ut.environment),ut.envMapRotation=ut.environment!==null&&R.envMap===null?K.environmentRotation:R.envMapRotation,Wt===void 0&&(R.addEventListener("dispose",gt),Wt=new Map,ut.programs=Wt);let ie=Wt.get(Dt);if(ie!==void 0){if(ut.currentProgram===ie&&ut.lightsStateVersion===zt)return Ca(R,Vt),ie}else Vt.uniforms=pt.getUniforms(R),R.onBeforeCompile(Vt,D),ie=pt.acquireProgram(Vt,Dt),Wt.set(Dt,ie),ut.uniforms=Vt.uniforms;const ee=ut.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(ee.clippingPlanes=Ct.uniform),Ca(R,Vt),ut.needsLights=Cl(R),ut.lightsStateVersion=zt,ut.needsLights&&(ee.ambientLightColor.value=J.state.ambient,ee.lightProbe.value=J.state.probe,ee.directionalLights.value=J.state.directional,ee.directionalLightShadows.value=J.state.directionalShadow,ee.spotLights.value=J.state.spot,ee.spotLightShadows.value=J.state.spotShadow,ee.rectAreaLights.value=J.state.rectArea,ee.ltc_1.value=J.state.rectAreaLTC1,ee.ltc_2.value=J.state.rectAreaLTC2,ee.pointLights.value=J.state.point,ee.pointLightShadows.value=J.state.pointShadow,ee.hemisphereLights.value=J.state.hemi,ee.directionalShadowMap.value=J.state.directionalShadowMap,ee.directionalShadowMatrix.value=J.state.directionalShadowMatrix,ee.spotShadowMap.value=J.state.spotShadowMap,ee.spotLightMatrix.value=J.state.spotLightMatrix,ee.spotLightMap.value=J.state.spotLightMap,ee.pointShadowMap.value=J.state.pointShadowMap,ee.pointShadowMatrix.value=J.state.pointShadowMatrix),ut.currentProgram=ie,ut.uniformsList=null,ie}function gs(R){if(R.uniformsList===null){const K=R.currentProgram.getUniforms();R.uniformsList=Ac.seqWithValue(K.seq,R.uniforms)}return R.uniformsList}function Ca(R,K){const rt=Bt.get(R);rt.outputColorSpace=K.outputColorSpace,rt.batching=K.batching,rt.batchingColor=K.batchingColor,rt.instancing=K.instancing,rt.instancingColor=K.instancingColor,rt.instancingMorph=K.instancingMorph,rt.skinning=K.skinning,rt.morphTargets=K.morphTargets,rt.morphNormals=K.morphNormals,rt.morphColors=K.morphColors,rt.morphTargetsCount=K.morphTargetsCount,rt.numClippingPlanes=K.numClippingPlanes,rt.numIntersection=K.numClipIntersection,rt.vertexAlphas=K.vertexAlphas,rt.vertexTangents=K.vertexTangents,rt.toneMapping=K.toneMapping}function Rl(R,K,rt,ut,J){K.isScene!==!0&&(K=At),le.resetTextureUnits();const Tt=K.fog,zt=ut.isMeshStandardMaterial?K.environment:null,Vt=G===null?D.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:fo,Dt=(ut.isMeshStandardMaterial?We:Ye).get(ut.envMap||zt),Wt=ut.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,ie=!!rt.attributes.tangent&&(!!ut.normalMap||ut.anisotropy>0),ee=!!rt.morphAttributes.position,ye=!!rt.morphAttributes.normal,ze=!!rt.morphAttributes.color;let Qe=fs;ut.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(Qe=D.toneMapping);const Le=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,we=Le!==void 0?Le.length:0,ne=Bt.get(ut),Oe=S.state.lights;if(ft===!0&&($===!0||R!==w)){const nn=R===w&&ut.id===C;Ct.setState(ut,R,nn)}let _e=!1;ut.version===ne.__version?(ne.needsLights&&ne.lightsStateVersion!==Oe.state.version||ne.outputColorSpace!==Vt||J.isBatchedMesh&&ne.batching===!1||!J.isBatchedMesh&&ne.batching===!0||J.isBatchedMesh&&ne.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&ne.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&ne.instancing===!1||!J.isInstancedMesh&&ne.instancing===!0||J.isSkinnedMesh&&ne.skinning===!1||!J.isSkinnedMesh&&ne.skinning===!0||J.isInstancedMesh&&ne.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&ne.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&ne.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&ne.instancingMorph===!1&&J.morphTexture!==null||ne.envMap!==Dt||ut.fog===!0&&ne.fog!==Tt||ne.numClippingPlanes!==void 0&&(ne.numClippingPlanes!==Ct.numPlanes||ne.numIntersection!==Ct.numIntersection)||ne.vertexAlphas!==Wt||ne.vertexTangents!==ie||ne.morphTargets!==ee||ne.morphNormals!==ye||ne.morphColors!==ze||ne.toneMapping!==Qe||ne.morphTargetsCount!==we)&&(_e=!0):(_e=!0,ne.__version=ut.version);let gn=ne.currentProgram;_e===!0&&(gn=di(ut,K,J));let ti=!1,De=!1,wa=!1;const je=gn.getUniforms(),In=ne.uniforms;if(wt.useProgram(gn.program)&&(ti=!0,De=!0,wa=!0),ut.id!==C&&(C=ut.id,De=!0),ti||w!==R){wt.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),je.setValue(P,"projectionMatrix",R.projectionMatrix),je.setValue(P,"viewMatrix",R.matrixWorldInverse);const Ln=je.map.cameraPosition;Ln!==void 0&&Ln.setValue(P,xt.setFromMatrixPosition(R.matrixWorld)),Gt.logarithmicDepthBuffer&&je.setValue(P,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ut.isMeshPhongMaterial||ut.isMeshToonMaterial||ut.isMeshLambertMaterial||ut.isMeshBasicMaterial||ut.isMeshStandardMaterial||ut.isShaderMaterial)&&je.setValue(P,"isOrthographic",R.isOrthographicCamera===!0),w!==R&&(w=R,De=!0,wa=!0)}if(J.isSkinnedMesh){je.setOptional(P,J,"bindMatrix"),je.setOptional(P,J,"bindMatrixInverse");const nn=J.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),je.setValue(P,"boneTexture",nn.boneTexture,le))}J.isBatchedMesh&&(je.setOptional(P,J,"batchingTexture"),je.setValue(P,"batchingTexture",J._matricesTexture,le),je.setOptional(P,J,"batchingIdTexture"),je.setValue(P,"batchingIdTexture",J._indirectTexture,le),je.setOptional(P,J,"batchingColorTexture"),J._colorsTexture!==null&&je.setValue(P,"batchingColorTexture",J._colorsTexture,le));const un=rt.morphAttributes;if((un.position!==void 0||un.normal!==void 0||un.color!==void 0)&&bt.update(J,rt,gn),(De||ne.receiveShadow!==J.receiveShadow)&&(ne.receiveShadow=J.receiveShadow,je.setValue(P,"receiveShadow",J.receiveShadow)),ut.isMeshGouraudMaterial&&ut.envMap!==null&&(In.envMap.value=Dt,In.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),ut.isMeshStandardMaterial&&ut.envMap===null&&K.environment!==null&&(In.envMapIntensity.value=K.environmentIntensity),De&&(je.setValue(P,"toneMappingExposure",D.toneMappingExposure),ne.needsLights&&zc(In,wa),Tt&&ut.fog===!0&&yt.refreshFogUniforms(In,Tt),yt.refreshMaterialUniforms(In,ut,q,lt,S.state.transmissionRenderTarget[R.id]),Ac.upload(P,gs(ne),In,le)),ut.isShaderMaterial&&ut.uniformsNeedUpdate===!0&&(Ac.upload(P,gs(ne),In,le),ut.uniformsNeedUpdate=!1),ut.isSpriteMaterial&&je.setValue(P,"center",J.center),je.setValue(P,"modelViewMatrix",J.modelViewMatrix),je.setValue(P,"normalMatrix",J.normalMatrix),je.setValue(P,"modelMatrix",J.matrixWorld),ut.isShaderMaterial||ut.isRawShaderMaterial){const nn=ut.uniformsGroups;for(let Ln=0,er=nn.length;Ln<er;Ln++){const Fi=nn[Ln];he.update(Fi,gn),he.bind(Fi,gn)}}return gn}function zc(R,K){R.ambientLightColor.needsUpdate=K,R.lightProbe.needsUpdate=K,R.directionalLights.needsUpdate=K,R.directionalLightShadows.needsUpdate=K,R.pointLights.needsUpdate=K,R.pointLightShadows.needsUpdate=K,R.spotLights.needsUpdate=K,R.spotLightShadows.needsUpdate=K,R.rectAreaLights.needsUpdate=K,R.hemisphereLights.needsUpdate=K}function Cl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(R,K,rt){const ut=Bt.get(R);ut.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ut.__autoAllocateDepthBuffer===!1&&(ut.__useRenderToTexture=!1),Bt.get(R.texture).__webglTexture=K,Bt.get(R.depthTexture).__webglTexture=ut.__autoAllocateDepthBuffer?void 0:rt,ut.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,K){const rt=Bt.get(R);rt.__webglFramebuffer=K,rt.__useDefaultFramebuffer=K===void 0};const vo=P.createFramebuffer();this.setRenderTarget=function(R,K=0,rt=0){G=R,U=K,N=rt;let ut=!0,J=null,Tt=!1,zt=!1;if(R){const Dt=Bt.get(R);if(Dt.__useDefaultFramebuffer!==void 0)wt.bindFramebuffer(P.FRAMEBUFFER,null),ut=!1;else if(Dt.__webglFramebuffer===void 0)le.setupRenderTarget(R);else if(Dt.__hasExternalTextures)le.rebindTextures(R,Bt.get(R.texture).__webglTexture,Bt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const ee=R.depthTexture;if(Dt.__boundDepthTexture!==ee){if(ee!==null&&Bt.has(ee)&&(R.width!==ee.image.width||R.height!==ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");le.setupDepthRenderbuffer(R)}}const Wt=R.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(zt=!0);const ie=Bt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ie[K])?J=ie[K][rt]:J=ie[K],Tt=!0):R.samples>0&&le.useMultisampledRTT(R)===!1?J=Bt.get(R).__webglMultisampledFramebuffer:Array.isArray(ie)?J=ie[rt]:J=ie,B.copy(R.viewport),j.copy(R.scissor),it=R.scissorTest}else B.copy(Ht).multiplyScalar(q).floor(),j.copy(re).multiplyScalar(q).floor(),it=xe;if(rt!==0&&(J=vo),wt.bindFramebuffer(P.FRAMEBUFFER,J)&&ut&&wt.drawBuffers(R,J),wt.viewport(B),wt.scissor(j),wt.setScissorTest(it),Tt){const Dt=Bt.get(R.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+K,Dt.__webglTexture,rt)}else if(zt){const Dt=K;for(let Wt=0;Wt<R.textures.length;Wt++){const ie=Bt.get(R.textures[Wt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Wt,ie.__webglTexture,rt,Dt)}}else if(R!==null&&rt!==0){const Dt=Bt.get(R.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Dt.__webglTexture,rt)}C=-1},this.readRenderTargetPixels=function(R,K,rt,ut,J,Tt,zt,Vt=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=Bt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&zt!==void 0&&(Dt=Dt[zt]),Dt){wt.bindFramebuffer(P.FRAMEBUFFER,Dt);try{const Wt=R.textures[Vt],ie=Wt.format,ee=Wt.type;if(!Gt.textureFormatReadable(ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Gt.textureTypeReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=R.width-ut&&rt>=0&&rt<=R.height-J&&(R.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Vt),P.readPixels(K,rt,ut,J,Jt.convert(ie),Jt.convert(ee),Tt))}finally{const Wt=G!==null?Bt.get(G).__webglFramebuffer:null;wt.bindFramebuffer(P.FRAMEBUFFER,Wt)}}},this.readRenderTargetPixelsAsync=async function(R,K,rt,ut,J,Tt,zt,Vt=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=Bt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&zt!==void 0&&(Dt=Dt[zt]),Dt)if(K>=0&&K<=R.width-ut&&rt>=0&&rt<=R.height-J){wt.bindFramebuffer(P.FRAMEBUFFER,Dt);const Wt=R.textures[Vt],ie=Wt.format,ee=Wt.type;if(!Gt.textureFormatReadable(ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Gt.textureTypeReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ye=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,ye),P.bufferData(P.PIXEL_PACK_BUFFER,Tt.byteLength,P.STREAM_READ),R.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Vt),P.readPixels(K,rt,ut,J,Jt.convert(ie),Jt.convert(ee),0);const ze=G!==null?Bt.get(G).__webglFramebuffer:null;wt.bindFramebuffer(P.FRAMEBUFFER,ze);const Qe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await tT(P,Qe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,ye),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,Tt),P.deleteBuffer(ye),P.deleteSync(Qe),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,K=null,rt=0){const ut=Math.pow(2,-rt),J=Math.floor(R.image.width*ut),Tt=Math.floor(R.image.height*ut),zt=K!==null?K.x:0,Vt=K!==null?K.y:0;le.setTexture2D(R,0),P.copyTexSubImage2D(P.TEXTURE_2D,rt,0,0,zt,Vt,J,Tt),wt.unbindTexture()};const _s=P.createFramebuffer(),Ic=P.createFramebuffer();this.copyTextureToTexture=function(R,K,rt=null,ut=null,J=0,Tt=null){Tt===null&&(J!==0?(El("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Tt=J,J=0):Tt=0);let zt,Vt,Dt,Wt,ie,ee,ye,ze,Qe;const Le=R.isCompressedTexture?R.mipmaps[Tt]:R.image;if(rt!==null)zt=rt.max.x-rt.min.x,Vt=rt.max.y-rt.min.y,Dt=rt.isBox3?rt.max.z-rt.min.z:1,Wt=rt.min.x,ie=rt.min.y,ee=rt.isBox3?rt.min.z:0;else{const un=Math.pow(2,-J);zt=Math.floor(Le.width*un),Vt=Math.floor(Le.height*un),R.isDataArrayTexture?Dt=Le.depth:R.isData3DTexture?Dt=Math.floor(Le.depth*un):Dt=1,Wt=0,ie=0,ee=0}ut!==null?(ye=ut.x,ze=ut.y,Qe=ut.z):(ye=0,ze=0,Qe=0);const we=Jt.convert(K.format),ne=Jt.convert(K.type);let Oe;K.isData3DTexture?(le.setTexture3D(K,0),Oe=P.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(le.setTexture2DArray(K,0),Oe=P.TEXTURE_2D_ARRAY):(le.setTexture2D(K,0),Oe=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,K.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,K.unpackAlignment);const _e=P.getParameter(P.UNPACK_ROW_LENGTH),gn=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ti=P.getParameter(P.UNPACK_SKIP_PIXELS),De=P.getParameter(P.UNPACK_SKIP_ROWS),wa=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,Le.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Le.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Wt),P.pixelStorei(P.UNPACK_SKIP_ROWS,ie),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ee);const je=R.isDataArrayTexture||R.isData3DTexture,In=K.isDataArrayTexture||K.isData3DTexture;if(R.isDepthTexture){const un=Bt.get(R),nn=Bt.get(K),Ln=Bt.get(un.__renderTarget),er=Bt.get(nn.__renderTarget);wt.bindFramebuffer(P.READ_FRAMEBUFFER,Ln.__webglFramebuffer),wt.bindFramebuffer(P.DRAW_FRAMEBUFFER,er.__webglFramebuffer);for(let Fi=0;Fi<Dt;Fi++)je&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Bt.get(R).__webglTexture,J,ee+Fi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Bt.get(K).__webglTexture,Tt,Qe+Fi)),P.blitFramebuffer(Wt,ie,zt,Vt,ye,ze,zt,Vt,P.DEPTH_BUFFER_BIT,P.NEAREST);wt.bindFramebuffer(P.READ_FRAMEBUFFER,null),wt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(J!==0||R.isRenderTargetTexture||Bt.has(R)){const un=Bt.get(R),nn=Bt.get(K);wt.bindFramebuffer(P.READ_FRAMEBUFFER,_s),wt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Ic);for(let Ln=0;Ln<Dt;Ln++)je?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,un.__webglTexture,J,ee+Ln):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,un.__webglTexture,J),In?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,nn.__webglTexture,Tt,Qe+Ln):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,nn.__webglTexture,Tt),J!==0?P.blitFramebuffer(Wt,ie,zt,Vt,ye,ze,zt,Vt,P.COLOR_BUFFER_BIT,P.NEAREST):In?P.copyTexSubImage3D(Oe,Tt,ye,ze,Qe+Ln,Wt,ie,zt,Vt):P.copyTexSubImage2D(Oe,Tt,ye,ze,Wt,ie,zt,Vt);wt.bindFramebuffer(P.READ_FRAMEBUFFER,null),wt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else In?R.isDataTexture||R.isData3DTexture?P.texSubImage3D(Oe,Tt,ye,ze,Qe,zt,Vt,Dt,we,ne,Le.data):K.isCompressedArrayTexture?P.compressedTexSubImage3D(Oe,Tt,ye,ze,Qe,zt,Vt,Dt,we,Le.data):P.texSubImage3D(Oe,Tt,ye,ze,Qe,zt,Vt,Dt,we,ne,Le):R.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,Tt,ye,ze,zt,Vt,we,ne,Le.data):R.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,Tt,ye,ze,Le.width,Le.height,we,Le.data):P.texSubImage2D(P.TEXTURE_2D,Tt,ye,ze,zt,Vt,we,ne,Le);P.pixelStorei(P.UNPACK_ROW_LENGTH,_e),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,gn),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ti),P.pixelStorei(P.UNPACK_SKIP_ROWS,De),P.pixelStorei(P.UNPACK_SKIP_IMAGES,wa),Tt===0&&K.generateMipmaps&&P.generateMipmap(Oe),wt.unbindTexture()},this.initRenderTarget=function(R){Bt.get(R).__webglFramebuffer===void 0&&le.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?le.setTextureCube(R,0):R.isData3DTexture?le.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?le.setTexture2DArray(R,0):le.setTexture2D(R,0),wt.unbindTexture()},this.resetState=function(){U=0,N=0,G=null,wt.reset(),Pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Ne._getDrawingBufferColorSpace(e),i.unpackColorSpace=Ne._getUnpackColorSpace()}}const Ty={type:"change"},em={type:"start"},rS={type:"end"},xc=new Oc,by=new ls,wC=Math.cos(70*_l.DEG2RAD),vn=new Q,Qn=2*Math.PI,ke={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Wd=1e-6;class DC extends YT{constructor(e,i=null){super(e,i),this.state=ke.NONE,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ao.ROTATE,MIDDLE:ao.DOLLY,RIGHT:ao.PAN},this.touches={ONE:no.ROTATE,TWO:no.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new Q,this._lastQuaternion=new Ks,this._lastTargetPosition=new Q,this._quat=new Ks().setFromUnitVectors(e.up,new Q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Jv,this._sphericalDelta=new Jv,this._scale=1,this._panOffset=new Q,this._rotateStart=new fe,this._rotateEnd=new fe,this._rotateDelta=new fe,this._panStart=new fe,this._panEnd=new fe,this._panDelta=new fe,this._dollyStart=new fe,this._dollyEnd=new fe,this._dollyDelta=new fe,this._dollyDirection=new Q,this._mouse=new fe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=NC.bind(this),this._onPointerDown=UC.bind(this),this._onPointerUp=LC.bind(this),this._onContextMenu=HC.bind(this),this._onMouseWheel=zC.bind(this),this._onKeyDown=IC.bind(this),this._onTouchStart=BC.bind(this),this._onTouchMove=FC.bind(this),this._onMouseDown=OC.bind(this),this._onMouseMove=PC.bind(this),this._interceptControlDown=GC.bind(this),this._interceptControlUp=VC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ty),this.update(),this.state=ke.NONE}update(e=null){const i=this.object.position;vn.copy(i).sub(this.target),vn.applyQuaternion(this._quat),this._spherical.setFromVector3(vn),this.autoRotate&&this.state===ke.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(r)&&isFinite(l)&&(r<-Math.PI?r+=Qn:r>Math.PI&&(r-=Qn),l<-Math.PI?l+=Qn:l>Math.PI&&(l-=Qn),r<=l?this._spherical.theta=Math.max(r,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+l)/2?Math.max(r,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let f=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),f=h!=this._spherical.radius}if(vn.setFromSpherical(this._spherical),vn.applyQuaternion(this._quatInverse),i.copy(this.target).add(vn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=vn.length();h=this._clampDistance(d*this._scale);const v=d-h;this.object.position.addScaledVector(this._dollyDirection,v),this.object.updateMatrixWorld(),f=!!v}else if(this.object.isOrthographicCamera){const d=new Q(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const v=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),f=v!==this.object.zoom;const p=new Q(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),h=vn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(xc.origin.copy(this.object.position),xc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(xc.direction))<wC?this.object.lookAt(this.target):(by.setFromNormalAndCoplanarPoint(this.object.up,this.target),xc.intersectPlane(by,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),f=!0)}return this._scale=1,this._performCursorZoom=!1,f||this._lastPosition.distanceToSquared(this.object.position)>Wd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Wd||this._lastTargetPosition.distanceToSquared(this.target)>Wd?(this.dispatchEvent(Ty),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qn/60*this.autoRotateSpeed*e:Qn/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){vn.setFromMatrixColumn(i,0),vn.multiplyScalar(-e),this._panOffset.add(vn)}_panUp(e,i){this.screenSpacePanning===!0?vn.setFromMatrixColumn(i,1):(vn.setFromMatrixColumn(i,0),vn.crossVectors(this.object.up,vn)),vn.multiplyScalar(e),this._panOffset.add(vn)}_pan(e,i){const r=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;vn.copy(l).sub(this.target);let f=vn.length();f*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*f/r.clientHeight,this.object.matrix),this._panUp(2*i*f/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),l=e-r.left,f=i-r.top,h=r.width,d=r.height;this._mouse.x=l/h*2-1,this._mouse.y=-(f/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(r,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(r,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),r=e.pageX-i.x,l=e.pageY-i.y,f=Math.sqrt(r*r+l*l);this._dollyStart.set(0,f)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),l=.5*(e.pageX+r.x),f=.5*(e.pageY+r.y);this._rotateEnd.set(l,f)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(r,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),r=e.pageX-i.x,l=e.pageY-i.y,f=Math.sqrt(r*r+l*l);this._dollyEnd.set(0,f),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(e.pageX+i.x)*.5,d=(e.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new fe,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function UC(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function NC(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function LC(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rS),this.state=ke.NONE;break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function OC(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ao.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=ke.DOLLY;break;case ao.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=ke.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=ke.ROTATE}break;case ao.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=ke.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=ke.PAN}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(em)}function PC(o){switch(this.state){case ke.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case ke.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function zC(o){this.enabled===!1||this.enableZoom===!1||this.state!==ke.NONE||(o.preventDefault(),this.dispatchEvent(em),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(rS))}function IC(o){this.enabled!==!1&&this._handleKeyDown(o)}function BC(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case no.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=ke.TOUCH_ROTATE;break;case no.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=ke.TOUCH_PAN;break;default:this.state=ke.NONE}break;case 2:switch(this.touches.TWO){case no.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=ke.TOUCH_DOLLY_PAN;break;case no.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=ke.TOUCH_DOLLY_ROTATE;break;default:this.state=ke.NONE}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(em)}function FC(o){switch(this._trackPointer(o),this.state){case ke.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case ke.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case ke.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case ke.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=ke.NONE}}function HC(o){this.enabled!==!1&&o.preventDefault()}function GC(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function VC(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class XC extends $p{constructor(e){super(e)}load(e,i,r,l){const f=this,h=new BT(this.manager);h.setPath(this.path),h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setWithCredentials(this.withCredentials),h.load(e,function(d){try{i(f.parse(d))}catch(v){l?l(v):console.error(v),f.manager.itemError(e)}},r,l)}parse(e){function i(p){const g=new DataView(p),m=32/8*3+32/8*3*3+16/8,y=g.getUint32(80,!0);if(80+32/8+y*m===g.byteLength)return!0;const T=[115,111,108,105,100];for(let A=0;A<5;A++)if(r(T,g,A))return!1;return!0}function r(p,g,m){for(let y=0,x=p.length;y<x;y++)if(p[y]!==g.getUint8(m+y))return!1;return!0}function l(p){const g=new DataView(p),m=g.getUint32(80,!0);let y,x,T,A=!1,M,S,I,O,D;for(let B=0;B<70;B++)g.getUint32(B,!1)==1129270351&&g.getUint8(B+4)==82&&g.getUint8(B+5)==61&&(A=!0,M=new Float32Array(m*3*3),S=g.getUint8(B+6)/255,I=g.getUint8(B+7)/255,O=g.getUint8(B+8)/255,D=g.getUint8(B+9)/255);const H=84,U=50,N=new Yn,G=new Float32Array(m*3*3),C=new Float32Array(m*3*3),w=new Te;for(let B=0;B<m;B++){const j=H+B*U,it=g.getFloat32(j,!0),ot=g.getFloat32(j+4,!0),ct=g.getFloat32(j+8,!0);if(A){const V=g.getUint16(j+48,!0);(V&32768)===0?(y=(V&31)/31,x=(V>>5&31)/31,T=(V>>10&31)/31):(y=S,x=I,T=O)}for(let V=1;V<=3;V++){const lt=j+V*12,q=B*3*3+(V-1)*3;G[q]=g.getFloat32(lt,!0),G[q+1]=g.getFloat32(lt+4,!0),G[q+2]=g.getFloat32(lt+8,!0),C[q]=it,C[q+1]=ot,C[q+2]=ct,A&&(w.setRGB(y,x,T,fi),M[q]=w.r,M[q+1]=w.g,M[q+2]=w.b)}}return N.setAttribute("position",new hi(G,3)),N.setAttribute("normal",new hi(C,3)),A&&(N.setAttribute("color",new hi(M,3)),N.hasColors=!0,N.alpha=D),N}function f(p){const g=new Yn,m=/solid([\s\S]*?)endsolid/g,y=/facet([\s\S]*?)endfacet/g,x=/solid\s(.+)/;let T=0;const A=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,M=new RegExp("vertex"+A+A+A,"g"),S=new RegExp("normal"+A+A+A,"g"),I=[],O=[],D=[],H=new Q;let U,N=0,G=0,C=0;for(;(U=m.exec(p))!==null;){G=C;const w=U[0],B=(U=x.exec(w))!==null?U[1]:"";for(D.push(B);(U=y.exec(w))!==null;){let ot=0,ct=0;const V=U[0];for(;(U=S.exec(V))!==null;)H.x=parseFloat(U[1]),H.y=parseFloat(U[2]),H.z=parseFloat(U[3]),ct++;for(;(U=M.exec(V))!==null;)I.push(parseFloat(U[1]),parseFloat(U[2]),parseFloat(U[3])),O.push(H.x,H.y,H.z),ot++,C++;ct!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+T),ot!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+T),T++}const j=G,it=C-G;g.userData.groupNames=D,g.addGroup(j,it,N),N++}return g.setAttribute("position",new ln(I,3)),g.setAttribute("normal",new ln(O,3)),g}function h(p){return typeof p!="string"?new TextDecoder().decode(p):p}function d(p){if(typeof p=="string"){const g=new Uint8Array(p.length);for(let m=0;m<p.length;m++)g[m]=p.charCodeAt(m)&255;return g.buffer||g}else return p}const v=d(e);return i(v)?l(v):f(h(e))}}function kC(o){const e=new Map(o.components.map(l=>[l.id,l])),i=new Map;function r(l){const f=i.get(l.id);if(f)return f;const h=new Bi(...l.rotation_deg.map(_l.degToRad),"ZYX"),d=new $e().makeRotationFromEuler(h);return d.setPosition(...l.position_mm),l.parent_id&&d.premultiply(r(e.get(l.parent_id))),i.set(l.id,d),d}return o.components.filter(l=>l.primitive!=="group").map(l=>{const f=l.dimensions;let h;return l.primitive==="box"?h=new mo(f.x_mm,f.y_mm,f.z_mm):l.primitive==="sphere"?h=new Jp(f.radius_mm,32,20):(h=new Qp(l.primitive==="cone"?f.top_radius_mm:f.radius_mm,f.radius_mm,f.z_mm,48),h.rotateX(Math.PI/2)),h.applyMatrix4(r(l)),{geometry:h,color:l.color,id:l.id}})}const Ta=o=>o?.part_type==="assembly";function ZC(o){return Ta(o)?o.name:o.part_type==="bracket"?"L-bracket":o.part_type==="tray"?"Shallow tray":"Open box"}function KC(o){return Ta(o)?`${o.components.filter(e=>e.primitive!=="group").length} solid components · concept assembly`:`${o.length_mm} × ${o.width_mm} × ${o.height_mm} mm`}const QC={part_type:"enclosure",length_mm:100,width_mm:60,height_mm:35,wall_thickness_mm:3,base_thickness_mm:3,open_top:!0},JC={part_type:"bracket",length_mm:60,width_mm:40,height_mm:50,thickness_mm:3,hole_diameter_mm:5,holes_per_face:2},YC=[["length_mm","Length",500],["width_mm","Width",500],["height_mm","Height",300]],qC=[["wall_thickness_mm","Wall",20],["base_thickness_mm","Base",20]];function $C(o){if(!YC.every(([e,,i])=>Number.isFinite(o[e])&&o[e]>=.5&&o[e]<=i))return"Enter a size between 0.5 and 500 mm (height up to 300 mm).";if(o.part_type==="bracket"){const e=o.thickness_mm,i=o.hole_diameter_mm,r=o.holes_per_face;if(!Number.isFinite(e)||e<.5||e>20)return"Choose a thickness between 0.5 and 20 mm.";if(e>=Math.min(o.length_mm,o.height_mm))return"The thickness must be smaller than the foot length and upright height.";if(!Number.isFinite(i)||i<1||i>30)return"Choose a hole size between 1 and 30 mm.";if(r){const l=Math.max(1,e/2),f=o.width_mm/(r+1);if(Math.min(o.length_mm-e,o.height_mm-e)<i+2*l)return"The holes are too large for these arms. Increase length or height, or choose smaller holes.";if(f-i/2<l||r>1&&f<i+2*l)return"The holes need more room. Increase width, choose smaller holes, or use fewer holes."}}else{if(!qC.every(([e,,i])=>Number.isFinite(o[e])&&o[e]>=.5&&o[e]<=i))return"Choose wall and bottom thicknesses between 0.5 and 20 mm.";if(o.wall_thickness_mm*2>=Math.min(o.length_mm,o.width_mm))return"This part is too narrow for its walls. Increase the width or length, or make the walls thinner below.";if(o.base_thickness_mm>=o.height_mm)return"The bottom is thicker than the part is tall. Increase the height or reduce the bottom thickness."}return""}async function tw(o,e){const i=await fetch("/api/"+o,e===void 0?void 0:{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),r=await i.json();if(!i.ok)throw new Error(typeof r.detail=="string"?r.detail:Array.isArray(r.detail)?r.detail.map(l=>l.msg).join("; "):"Request failed");return r}function WC({id:o,spec:e,running:i,selected:r,onSelect:l,bounds:f,draft:h,meshUrl:d}){const v=kn.useRef(null),p=kn.useRef(()=>{}),g=kn.useRef(()=>{}),m=kn.useRef(l);m.current=l;const[y,x]=kn.useState("iso"),[T,A]=kn.useState("empty"),[M,S]=kn.useState(""),[I,O]=kn.useState("ISO");kn.useEffect(()=>g.current(r),[r,o]),kn.useEffect(()=>{const U=v.current;let N;try{N=new CC({antialias:!0})}catch{A("error"),S(h?"3D preview is unavailable. You can still review the proposal and measurements.":"WebGL is unavailable. Your model exports remain available.");return}N.setPixelRatio(Math.min(devicePixelRatio,2)),N.shadowMap.enabled=!0,N.shadowMap.type=wy,N.setClearColor("#eeede6"),N.domElement.setAttribute("aria-label","3D model. Drag to orbit; scroll to zoom. Click a component to select it."),U.appendChild(N.domElement);const G=new bT,C=new Ti(35,1,.1,1e4),w=new DC(C,N.domElement),B=new pl;G.add(B),w.enableDamping=!matchMedia("(prefers-reduced-motion: reduce)").matches;const j=new kT(1e3,100,11909550,14145742);G.add(j),(Array.isArray(j.material)?j.material:[j.material]).forEach(vt=>{vt.transparent=!0,vt.opacity=.35}),G.add(new FT(16776948,7438456,3));const it=new Zv(16777215,3);it.position.set(80,150,100),G.add(it),it.castShadow=!0,it.shadow.mapSize.set(1024,1024),it.shadow.bias=-3e-4,it.shadow.normalBias=.15;const ot=new Ai(new bl(8e3,8e3),new UT({opacity:.14}));ot.rotation.x=-Math.PI/2,ot.receiveShadow=!0,G.add(ot);const ct=new Zv(16765348,1);ct.position.set(-80,40,-100),G.add(ct);let V=75,lt=!1,q=0,_t=!0;const St=()=>{_t=!0};w.addEventListener("change",St);const Ht=[],re={iso:new Q(1,.85,1),top:new Q(0,1,.001),front:new Q(0,0,1),right:new Q(1,0,0)};p.current=vt=>{_t=!0;const P=vt?re[vt].clone():C.position.clone().sub(w.target).normalize(),oe=Math.min(C.fov,_l.radToDeg(2*Math.atan(Math.tan(_l.degToRad(C.fov/2))*C.aspect))),Xt=V/Math.sin(_l.degToRad(oe/2))*1.15;C.position.copy(P.normalize().multiplyScalar(Xt)),C.near=Math.max(.01,V/1e3),C.far=Math.max(1e4,Xt*10),C.updateProjectionMatrix(),w.target.set(0,0,0),w.update(),vt&&x(vt)};const xe=new ResizeObserver(()=>{!U.clientWidth||!U.clientHeight||(N.setSize(U.clientWidth,U.clientHeight),C.aspect=U.clientWidth/U.clientHeight,C.updateProjectionMatrix(),p.current())});xe.observe(U),p.current("iso");const F=new AbortController;S(""),A(o||h?"loading":"empty");function ft(vt,P,oe){vt.computeVertexNormals();const Xt=new Ai(vt,new NT({color:P,roughness:.55,metalness:.12}));Xt.castShadow=!0,Xt.receiveShadow=!0,Xt.userData.componentId=oe,B.add(Xt),Ht.push(Xt);const Gt=new Pp(new DT(vt,30),new Kp({color:2509883,transparent:!0,opacity:.35}));B.add(Gt)}g.current=vt=>{_t=!0;const P=new Set([vt]);if(Ta(e))for(let oe=0;oe<8;oe++)e.components.forEach(Xt=>{P.has(Xt.parent_id||void 0)&&P.add(Xt.id)});Ht.forEach(oe=>{const Xt=oe.material;Xt.emissive.set(P.has(oe.userData.componentId)&&vt?"#8a5a12":"#000000"),Xt.emissiveIntensity=.55})};async function $(){if(h){for(const Gt of kC(h))ft(Gt.geometry,Gt.color,Gt.id);B.rotation.x=-Math.PI/2}else{if(!o)return;const Gt=await fetch(d||"/api/artifacts/"+o+(Ta(e)?"/scene":"/stl"),{signal:F.signal});if(!Gt.ok)throw Error(Ta(e)?"Assembly preview could not be loaded. Retry or download its exports.":"STL preview could not be loaded. Retry the preview or download the artifact.");if(Ta(e)){const wt=await Gt.json();if(lt)return;for(const Zt of wt.meshes){const Bt=new Yn;Bt.setAttribute("position",new ln(Zt.positions,3)),Bt.setIndex(Zt.indices),ft(Bt,Zt.color,Zt.id)}B.rotation.x=-Math.PI/2}else{const wt=await Gt.arrayBuffer();if(lt)return;const Zt=new XC().parse(wt);Zt.rotateX(-Math.PI/2),ft(Zt,"#567a66")}}B.updateMatrixWorld(!0);let vt=new Js().setFromObject(B);const P=vt.getCenter(new Q);B.position.sub(P),B.updateMatrixWorld(!0),vt=new Js().setFromObject(B);const oe=vt.getSize(new Q);N.domElement.dataset.renderedSizeMm=JSON.stringify([oe.x,oe.z,oe.y]),V=1;const Xt=new Q;for(const Gt of Ht){const wt=Gt.geometry.getAttribute("position");for(let Zt=0;Zt<wt.count;Zt++)Xt.fromBufferAttribute(wt,Zt).applyMatrix4(Gt.matrixWorld),V=Math.max(V,Xt.length())}j.position.y=vt.min.y-.2,ot.position.y=vt.min.y-.4,it.position.set(1,2,1).normalize().multiplyScalar(V*4),it.shadow.camera.left=it.shadow.camera.bottom=-V*2,it.shadow.camera.right=it.shadow.camera.top=V*2,it.shadow.camera.far=Math.max(3e3,V*8),it.shadow.camera.updateProjectionMatrix(),p.current("iso"),g.current(r),A("ready")}$().catch(vt=>{!lt&&vt.name!=="AbortError"&&(A("error"),S(vt.message))});let at={x:0,y:0};const xt=vt=>{at={x:vt.clientX,y:vt.clientY}},Nt=vt=>{if(!Ta(e)||Math.hypot(vt.clientX-at.x,vt.clientY-at.y)>5)return;const P=N.domElement.getBoundingClientRect(),oe=new XT;oe.setFromCamera(new fe((vt.clientX-P.left)/P.width*2-1,-(vt.clientY-P.top)/P.height*2+1),C);const Xt=oe.intersectObjects(Ht)[0];m.current?.(Xt?.object.userData.componentId)};N.domElement.addEventListener("pointerdown",xt),N.domElement.addEventListener("pointerup",Nt);const At=["x","y","z"].map(vt=>U.parentElement.querySelector('[data-axis="'+vt+'"]'));N.setAnimationLoop(()=>{if(w.update(),!!_t&&(_t=!1,N.render(G,C),q++%6===0)){const vt=C.quaternion.clone().invert();[new Q(1,0,0),new Q(0,0,-1),new Q(0,1,0)].forEach((P,oe)=>{P.applyQuaternion(vt),At[oe]&&(At[oe].style.transform=`translate(${P.x*23}px,${-P.y*23}px)`)})}});const Mt=()=>O("ORBIT");return w.addEventListener("start",Mt),()=>{lt=!0,F.abort(),xe.disconnect(),N.setAnimationLoop(null),N.domElement.removeEventListener("pointerdown",xt),N.domElement.removeEventListener("pointerup",Nt),w.removeEventListener("start",Mt),w.removeEventListener("change",St),w.dispose(),B.traverse(vt=>{(vt instanceof Ai||vt instanceof Pp)&&(vt.geometry.dispose(),(Array.isArray(vt.material)?vt.material:[vt.material]).forEach(P=>P.dispose()))}),ot.geometry.dispose(),ot.material.dispose(),j.geometry.dispose(),(Array.isArray(j.material)?j.material:[j.material]).forEach(vt=>vt.dispose()),N.dispose(),U.removeChild(N.domElement),p.current=()=>{},g.current=()=>{}}},[o,h,d]);function D(U){p.current(U),O(U.toUpperCase())}const H=e?Ta(e)?f:[e.length_mm,e.width_mm,e.height_mm]:void 0;return Ft.jsxs("div",{className:"viewport","data-preview-state":T,"data-selected-component":r||"",children:[Ft.jsx("div",{className:"canvas-host",ref:v}),Ft.jsxs("div",{className:"viewport-tools","aria-label":"Camera controls",children:[Ft.jsx("button",{onClick:()=>p.current(),title:"Fit model to viewport",children:"Fit model"}),Ft.jsx("button",{onClick:()=>D("iso"),title:"Reset to isometric view",children:"Reset view"}),Ft.jsxs("details",{className:"view-menu",children:[Ft.jsx("summary",{children:"More views"}),Ft.jsx("div",{children:["iso","top","front","right"].map(U=>Ft.jsx("button",{"aria-pressed":y===U,onClick:()=>D(U),children:U==="iso"?"Angled":U[0].toUpperCase()+U.slice(1)},U))})]})]}),T==="empty"&&!i&&Ft.jsxs("div",{className:"empty-state",children:[Ft.jsx("svg",{className:"empty-box",viewBox:"0 0 200 160","aria-hidden":"true",children:Ft.jsx("path",{d:"m30 58 80-35 62 33-80 39Z M30 58v55l62 30 80-37V56 M92 95v48"})}),Ft.jsx("h2",{children:"Your idea, in 3D."}),Ft.jsxs("p",{children:["Describe a part or a concept assembly.",Ft.jsx("br",{}),"Your model will appear right here."]})]}),T==="loading"&&Ft.jsx("div",{className:"viewport-notice",role:"status",children:"Opening your model…"}),M&&Ft.jsxs("div",{className:"viewport-error",role:"alert",children:[M,Ft.jsx("button",{onClick:()=>location.reload(),children:"Reload workspace"})]}),i&&Ft.jsxs("div",{className:"generating-note",role:"status",children:[Ft.jsx("span",{className:"pulse"})," Creating your model…"]}),Ft.jsxs("div",{className:"orientation","aria-label":"Model orientation: X length, Y width, Z height",children:[Ft.jsx("b",{"data-axis":"x",children:"X"}),Ft.jsx("b",{"data-axis":"y",children:"Y"}),Ft.jsx("b",{"data-axis":"z",children:"Z"}),Ft.jsx("small",{children:I})]}),Ft.jsxs("div",{className:"viewport-bottom",children:[Ft.jsx("span",{children:T==="ready"&&H?H.map(U=>Math.round(U*100)/100).join(" × ")+" mm":""}),Ft.jsx("span",{children:T==="ready"?"Drag to rotate · Scroll to zoom":""})]})]})}const Ay="https://sketchless-cad-7931c5be.onrender.com",Ry=/^https:\/\//.test(Ay)?Ay:void 0;function ew({offline:o=!1}){const[e,i]=kn.useState([]),[r,l]=kn.useState("robot"),[f,h]=kn.useState(),[d,v]=kn.useState("");kn.useEffect(()=>{const m=new AbortController;return fetch("./samples/catalogue.json",{signal:m.signal}).then(y=>{if(!y.ok)throw Error("Sample models are not included in this build.");return y.json()}).then(y=>i(y.samples)).catch(y=>{y.name!=="AbortError"&&v(y.message)}),()=>m.abort()},[]);const p=e.find(m=>m.id===r)||e[0],g=p&&Ta(p.spec)?p.spec.components.find(m=>m.id===f):void 0;return Ft.jsxs("div",{className:"gallery-page",children:[Ft.jsxs("header",{className:"gallery-header",children:[Ft.jsxs("a",{className:"brand",href:"./gallery.html",children:["Sketchless",Ft.jsx("span",{className:"brand-period",children:"."})]}),Ft.jsx("a",{href:"https://github.com/kevincyril/Sketchless",target:"_blank",rel:"noreferrer",children:"View source ↗"})]}),Ft.jsxs("main",{children:[Ft.jsxs("section",{className:"gallery-intro",children:[Ft.jsx("span",{className:"eyebrow",children:"INTERACTIVE CAD EXAMPLES"}),Ft.jsx("h1",{children:"Explore the idea. Inspect the model."}),Ft.jsx("p",{children:"Rotate real saved CAD models, select their components and download the files."}),Ft.jsxs("div",{className:"gallery-status",role:"status",children:[Ft.jsx("strong",{children:o?"Live workspace is unavailable right now.":"You are exploring saved examples."}),Ft.jsx("p",{children:"These are pre-generated models, not new AI output. This gallery needs no AI service or account."})]}),o&&Ft.jsx("button",{className:"gallery-retry",onClick:()=>location.reload(),children:"Retry live workspace"}),Ry?Ft.jsxs(Ft.Fragment,{children:[Ft.jsx("a",{className:"gallery-live-link",href:Ry,children:"Open live modeling workspace ↗"}),Ft.jsx("p",{className:"gallery-pending",children:"The free live workspace can take about a minute to wake up. Generating a design can take a few more minutes."})]}):Ft.jsx("p",{className:"gallery-pending",children:"Live modeling deployment is pending. The examples below work independently."})]}),Ft.jsx("nav",{className:"gallery-choices","aria-label":"Sample models",children:e.map(m=>Ft.jsxs("button",{"aria-pressed":p?.id===m.id,onClick:()=>{l(m.id),h(void 0)},children:[Ft.jsx("strong",{children:m.name}),Ft.jsx("small",{children:m.description})]},m.id))}),d&&Ft.jsx("p",{role:"alert",children:d}),p&&Ft.jsxs("section",{className:"gallery-model","aria-label":"Saved CAD sample",children:[Ft.jsxs("div",{className:"gallery-model-title",children:[Ft.jsxs("div",{children:[Ft.jsx("span",{className:"eyebrow",children:"SAVED CAD MODEL"}),Ft.jsx("h2",{children:p.name})]}),Ft.jsxs("span",{children:[p.component_count," ",p.component_count===1?"solid":"separate solids"]})]}),Ft.jsx(WC,{id:"sample-"+p.id,spec:p.spec,meshUrl:p.mesh,bounds:p.bounds,running:!1,selected:f,onSelect:h}),g&&Ft.jsxs("div",{className:"gallery-component",children:[Ft.jsx("strong",{children:g.name}),Ft.jsxs("span",{children:[g.primitive," · ",Object.entries(g.dimensions).filter(([,m])=>m!==null).map(([m,y])=>m.replace("_mm","")+": "+y+" mm").join(" · ")]}),Ft.jsx("button",{onClick:()=>h(void 0),children:"Whole model"})]}),Ft.jsxs("div",{className:"gallery-downloads",children:[Ft.jsx("a",{href:p.files.step,download:!0,children:"Download STEP"}),Ft.jsx("a",{href:p.files.stl,download:!0,children:"Download STL"}),p.files.glb&&Ft.jsx("a",{href:p.files.glb,download:!0,children:"Download GLB"}),Ft.jsx("a",{href:p.files.design,download:!0,children:"Editable design JSON"})]}),Ft.jsx("p",{className:"gallery-limit",children:"Concepts are visual assemblies. Geometry checks do not establish motion, physical fit, strength or printability."})]}),Ft.jsxs("section",{className:"gallery-about",children:[Ft.jsx("h2",{children:"How Sketchless works"}),Ft.jsx("p",{children:"A small trained classifier recognizes three precise-part families. Gemini interprets descriptions and component edits. CadQuery builds and checks the actual geometry. Concept proposals require approval before building."}),Ft.jsx("p",{children:"The project includes version restoration, exported CAD files, offline tests and a frozen live evaluation. Read the repository for the measured results and limitations."})]})]}),Ft.jsx("footer",{className:"gallery-footer",children:"Sketchless · Standalone conversational CAD portfolio project"})]})}export{ew as G,WC as V,ZC as a,tw as b,jC as c,Ta as d,JC as e,YC as f,qC as g,QC as i,Ft as j,KC as m,kn as r,$C as s};
