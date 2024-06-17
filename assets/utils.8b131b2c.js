import{ct as A,fg as J,e2 as B,c9 as E,j as S,aW as b,aC as q,aV as z,bK as I,dF as Z,fm as k,fn as P,bB as V,e_ as O,at as j,c as C,aG as D,aH as y,fo as K,aJ as g,fp as p,aI as H,fq as L,fr as T}from"./index.7ef8deff.js";import{f as G,g as N}from"./projectionSupport.bc37b740.js";const W=new A({esriSRUnit_Meter:"meters",esriSRUnit_Kilometer:"kilometers",esriSRUnit_Foot:"feet",esriSRUnit_StatuteMile:"miles",esriSRUnit_NauticalMile:"nautical-miles",esriSRUnit_USNauticalMile:"us-nautical-miles"}),v=Object.freeze({}),M=new g,X=new g,R=new g,l={esriGeometryPoint:p,esriGeometryPolyline:H,esriGeometryPolygon:L,esriGeometryMultipoint:T};function rt(t,a,r,n=t.hasZ,e=t.hasM){if(S(a))return null;const o=t.hasZ&&n,s=t.hasM&&e;if(r){const i=y(R,a,t.hasZ,t.hasM,"esriGeometryPoint",r,n,e);return p(i,o,s)}return p(a,o,s)}function st(t,a,r,n,e,o,s=a,i=r){var w,d,h,_,x,F;const u=a&&s,c=r&&i,f=C(n)?"coords"in n?n:n.geometry:null;if(S(f))return null;if(e){let m=D(X,f,a,r,t,e,s,i);return o&&(m=y(R,m,u,c,t,o)),(d=(w=l[t])==null?void 0:w.call(l,m,u,c))!=null?d:null}if(o){const m=y(R,f,a,r,t,o,s,i);return(_=(h=l[t])==null?void 0:h.call(l,m,u,c))!=null?_:null}return K(M,f,a,r,s,i),(F=(x=l[t])==null?void 0:x.call(l,M,u,c))!=null?F:null}async function ot(t,a,r){const{outFields:n,orderByFields:e,groupByFieldsForStatistics:o,outStatistics:s}=t;if(n)for(let i=0;i<n.length;i++)n[i]=n[i].trim();if(e)for(let i=0;i<e.length;i++)e[i]=e[i].trim();if(o)for(let i=0;i<o.length;i++)o[i]=o[i].trim();if(s)for(let i=0;i<s.length;i++)s[i].onStatisticField&&(s[i].onStatisticField=s[i].onStatisticField.trim());return t.geometry&&!t.outSR&&(t.outSR=t.geometry.spatialReference),Q(t,a,r)}async function Q(t,a,r){var o;if(!t)return null;let{where:n}=t;if(t.where=n=n&&n.trim(),(!n||/^1 *= *1$/.test(n)||a&&a===n)&&(t.where=null),!t.geometry)return t;let e=await tt(t);if(t.distance=0,t.units=null,t.spatialRel==="esriSpatialRelEnvelopeIntersects"){const{spatialReference:s}=t.geometry;e=J(e),e.spatialReference=s}if(e){await G(e.spatialReference,r),e=Y(e,r);const s=(await B(E(e)))[0];if(S(s))throw v;const i="quantizationParameters"in t&&((o=t.quantizationParameters)==null?void 0:o.tolerance)||"maxAllowableOffset"in t&&t.maxAllowableOffset||0,u=i&&U(e,r)?{densificationStep:8*i}:void 0,c=s.toJSON(),f=await N(c,c.spatialReference,r,u);if(!f)throw v;f.spatialReference=r,t.geometry=f}return t}function U(t,a){if(!t)return!1;const r=t.spatialReference;return(b(t)||q(t)||z(t))&&!I(r,a)&&!Z(r,a)}function Y(t,a){const r=t.spatialReference;return U(t,a)&&b(t)?{spatialReference:r,rings:[[[t.xmin,t.ymin],[t.xmin,t.ymax],[t.xmax,t.ymax],[t.xmax,t.ymin],[t.xmin,t.ymin]]]}:t}async function tt(t){const{distance:a,units:r}=t,n=t.geometry;if(a==null||"vertexAttributes"in n)return n;const e=n.spatialReference,o=r?W.fromJSON(r):k(e),s=e&&(P(e)||V(e))?n:await G(e,O).then(()=>N(n,O));return(await it())(s.spatialReference,s,a,o)}async function it(){return(await j(()=>import("./geometryEngineJSON.3d6e7890.js"),["assets/geometryEngineJSON.3d6e7890.js","assets/geometryEngineBase.82b25ca5.js","assets/geometryEngineJSON.f9e9a36f.js","assets/json.879c9adc.js"])).geodesicBuffer}function lt(t){return t&&$ in t?JSON.parse(JSON.stringify(t,et)):t}const $="_geVersion",et=(t,a)=>t!==$?a:void 0;export{lt as E,v as F,Q as J,rt as b,st as v,ot as z};
