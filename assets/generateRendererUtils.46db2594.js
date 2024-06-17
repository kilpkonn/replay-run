import{ct as q,a6 as v,a7 as V,eV as I,eW as D,eX as F,a8 as z,cx as B,s as N}from"./index.7ef8deff.js";const S=new q({classBreaksDef:"class-breaks-definition",uniqueValueDef:"unique-value-definition"});let x=class extends B{constructor(){super(...arguments),this.baseSymbol=null,this.colorRamp=null,this.type=null}};v([V({type:I,json:{write:!0}})],x.prototype,"baseSymbol",void 0),v([V({types:D,json:{read:{reader:F},write:!0}})],x.prototype,"colorRamp",void 0),v([V({json:{read:S.read,write:S.write}})],x.prototype,"type",void 0),x=v([z("esri.rest.support.ClassificationDefinition")],x);const T=x,$=new q({esriClassifyEqualInterval:"equal-interval",esriClassifyManual:"manual",esriClassifyNaturalBreaks:"natural-breaks",esriClassifyQuantile:"quantile",esriClassifyStandardDeviation:"standard-deviation",esriClassifyDefinedInterval:"defined-interval"}),C=new q({esriNormalizeByLog:"log",esriNormalizeByPercentOfTotal:"percent-of-total",esriNormalizeByField:"field"});let y=class extends T{constructor(){super(...arguments),this.breakCount=null,this.classificationField=null,this.classificationMethod=null,this.normalizationField=null,this.normalizationType=null,this.type="class-breaks-definition"}set standardDeviationInterval(a){this.classificationMethod==="standard-deviation"&&this._set("standardDeviationInterval",a)}set definedInterval(a){this.classificationMethod==="defined-interval"&&this._set("definedInterval",a)}};v([V({json:{write:!0}})],y.prototype,"breakCount",void 0),v([V({json:{write:!0}})],y.prototype,"classificationField",void 0),v([V({type:String,json:{read:$.read,write:$.write}})],y.prototype,"classificationMethod",void 0),v([V({json:{write:!0}})],y.prototype,"normalizationField",void 0),v([V({json:{read:C.read,write:C.write}})],y.prototype,"normalizationType",void 0),v([V({value:null,json:{write:!0}})],y.prototype,"standardDeviationInterval",null),v([V({value:null,json:{write:!0}})],y.prototype,"definedInterval",null),v([V()],y.prototype,"type",void 0),y=v([z("esri.rest.support.ClassBreaksDefinition")],y);const W=y,E=N.getLogger("esri.rest.support.generateRendererUtils");function M(a,r){return Number(a.toFixed(r))}function X(a){const{normalizationTotal:r}=a;return{classBreaks:L(a),normalizationTotal:r}}function L(a){const r=a.definition,{classificationMethod:n,breakCount:i,normalizationType:u,definedInterval:h}=r,c=[];let l=a.values;if(l.length===0)return[];l=l.sort((s,f)=>s-f);const d=l[0],p=l[l.length-1];if(n==="equal-interval")if(l.length>=i){const s=(p-d)/i;let f=d;for(let t=1;t<i;t++){const e=M(d+t*s,6);c.push({minValue:f,maxValue:e,label:b(f,e,u)}),f=e}c.push({minValue:f,maxValue:p,label:b(f,p,u)})}else l.forEach(s=>{c.push({minValue:s,maxValue:s,label:b(s,s,u)})});else if(n==="natural-breaks"){const s=R(l),f=a.valueFrequency||s.valueFrequency,t=_(s.uniqueValues,f,i);let e=d;for(let o=1;o<i;o++)if(s.uniqueValues.length>o){const m=M(s.uniqueValues[t[o]],6);c.push({minValue:e,maxValue:m,label:b(e,m,u)}),e=m}c.push({minValue:e,maxValue:p,label:b(e,p,u)})}else if(n==="quantile")if(l.length>=i&&d!==p){let s=d,f=Math.ceil(l.length/i),t=0;for(let e=1;e<i;e++){let o=f+t-1;o>l.length&&(o=l.length-1),o<0&&(o=0),c.push({minValue:s,maxValue:l[o],label:b(s,l[o],u)}),s=l[o],t+=f,f=Math.ceil((l.length-t)/(i-e))}c.push({minValue:s,maxValue:p,label:b(s,p,u)})}else{let s=-1;for(let f=0;f<l.length;f++){const t=l[f];t!==s&&(s=t,c.push({minValue:s,maxValue:t,label:b(s,t,u)}),s=t)}}else if(n==="standard-deviation"){const s=O(l),f=P(l,s);if(f===0)c.push({minValue:l[0],maxValue:l[0],label:b(l[0],l[0],u)});else{const t=A(d,p,i,s,f)*f;let e=0,o=d;for(let g=i;g>=1;g--){const k=M(s-(g-.5)*t,6);c.push({minValue:o,maxValue:k,label:b(o,k,u)}),o=k,e++}let m=M(s+.5*t,6);c.push({minValue:o,maxValue:m,label:b(o,m,u)}),o=m,e++;for(let g=1;g<=i;g++)m=e===2*i?p:M(s+(g+.5)*t,6),c.push({minValue:o,maxValue:m,label:b(o,m,u)}),o=m,e++}}else if(n==="defined-interval"){if(!h)return c;const s=l[0],f=l[l.length-1],t=Math.ceil((f-s)/h);let e=s;for(let o=1;o<t;o++){const m=M(s+o*h,6);c.push({minValue:e,maxValue:m,label:b(e,m,u)}),e=m}c.push({minValue:e,maxValue:f,label:b(e,f,u)})}return c}function b(a,r,n){let i=null;return i=a===r?n&&n==="percent-of-total"?a+"%":a.toString():n&&n==="percent-of-total"?a+"% - "+r+"%":a+" - "+r,i}function R(a){const r=[],n=[];let i=Number.MIN_VALUE,u=1,h=-1;for(let c=0;c<a.length;c++){const l=a[c];l===i?(u++,n[h]=u):l!==null&&(r.push(l),i=l,u=1,n.push(u),h++)}return{uniqueValues:r,valueFrequency:n}}function _(a,r,n){const i=a.length,u=[];n>i&&(n=i);for(let c=0;c<n;c++)u.push(Math.round(c*i/n-1));u.push(i-1);let h=j(u,a,r,n);return U(h.mean,h.sdcm,u,a,r,n)&&(h=j(u,a,r,n)),u}function j(a,r,n,i){let u=[],h=[],c=[],l=0;const d=[],p=[];for(let e=0;e<i;e++){const o=w(e,a,r,n);d.push(o.sbMean),p.push(o.sbSdcm),l+=p[e]}let s,f=l,t=!0;for(;t||l<f;){t=!1,u=[];for(let e=0;e<i;e++)u.push(a[e]);for(let e=0;e<i;e++)for(let o=a[e]+1;o<=a[e+1];o++)if(s=r[o],e>0&&o!==a[e+1]&&Math.abs(s-d[e])>Math.abs(s-d[e-1]))a[e]=o;else if(e<i-1&&a[e]!==o-1&&Math.abs(s-d[e])>Math.abs(s-d[e+1])){a[e+1]=o-1;break}f=l,l=0,h=[],c=[];for(let e=0;e<i;e++){h.push(d[e]),c.push(p[e]);const o=w(e,a,r,n);d[e]=o.sbMean,p[e]=o.sbSdcm,l+=p[e]}}if(l>f){for(let e=0;e<i;e++)a[e]=u[e],d[e]=h[e],p[e]=c[e];l=f}return{mean:d,sdcm:p}}function U(a,r,n,i,u,h){let c=0,l=0,d=0,p=0,s=!0;for(let f=0;f<2&&s;f++){f===0&&(s=!1);for(let t=0;t<h-1;t++)for(;n[t+1]+1!==n[t+2];){n[t+1]=n[t+1]+1;const e=w(t,n,i,u);d=e.sbMean,c=e.sbSdcm;const o=w(t+1,n,i,u);if(p=o.sbMean,l=o.sbSdcm,!(c+l<r[t]+r[t+1])){n[t+1]=n[t+1]-1;break}r[t]=c,r[t+1]=l,a[t]=d,a[t+1]=p,s=!0}for(let t=h-1;t>0;t--)for(;n[t]!==n[t-1]+1;){n[t]=n[t]-1;const e=w(t-1,n,i,u);d=e.sbMean,c=e.sbSdcm;const o=w(t,n,i,u);if(p=o.sbMean,l=o.sbSdcm,!(c+l<r[t-1]+r[t])){n[t]=n[t]+1;break}r[t-1]=c,r[t]=l,a[t-1]=d,a[t]=p,s=!0}}return s}function A(a,r,n,i,u){let h=Math.max(i-a,r-i)/u/n;return h=h>=1?1:h>=.5?.5:.25,h}function O(a){let r=0;for(let n=0;n<a.length;n++)r+=a[n];return r/=a.length,r}function P(a,r){let n=0;for(let i=0;i<a.length;i++){const u=a[i];n+=(u-r)*(u-r)}return n/=a.length,Math.sqrt(n)}function w(a,r,n,i){let u=0,h=0;for(let d=r[a]+1;d<=r[a+1];d++){const p=i[d];u+=n[d]*p,h+=p}h<=0&&E.warn("Exception in Natural Breaks calculation");const c=u/h;let l=0;for(let d=r[a]+1;d<=r[a+1];d++)l+=i[d]*(n[d]-c)**2;return{sbMean:c,sbSdcm:l}}export{X as a,W as l};
