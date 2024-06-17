import{n as F,av as k,x as P,s as V,bX as L,U as G,eY as M,bK as Q,bB as R,bG as A,bM as Y,aT as Z,eZ as U,aJ as B,e_ as J,cA as z,ci as x}from"./index.7ef8deff.js";import{t as W}from"./json.879c9adc.js";import{u as K}from"./FeatureStore.ffde9cbc.js";import{f as X}from"./projectionSupport.bc37b740.js";import{Y as H}from"./QueryEngine.d96974d9.js";import{a as ee}from"./number.add21e35.js";import{i as te,o as ie}from"./clientSideDefaults.27b1a1ad.js";import"./PooledRBush.1955836d.js";import"./centroid.82f9e71d.js";import"./QueryEngineResult.507cabfa.js";import"./quantizationUtils.4cc289ed.js";import"./WhereClause.39610a62.js";import"./utils.6be6e6d3.js";import"./generateRendererUtils.46db2594.js";import"./utils.8b131b2c.js";import"./QueryEngineCapabilities.78217f95.js";import"./timeSupport.4d323576.js";const T=/^\s*"([\S\s]*)"\s*$/,E=/""/g,$=`
`,ne=[","," ",";","|","	"];function*S(r,t,e){let i=0;for(;i<=r.length;){const n=r.indexOf(t,i),s=r.substring(i,n>-1?n:void 0);i+=s.length+t.length,e&&!s.trim()||(yield s)}}function O(r){const t=r.includes(`\r
`)?`\r
`:$;return S(r,t,!0)}function q(r,t){return S(r,t,!1)}function re(r,t,e){var c;r=r.trim(),t=t==null?void 0:t.trim();const i=[],n=Array.from(new Set([e==null?void 0:e.delimiter,...ne])).filter(o=>o!=null);for(const o of n){const a=I(r,o).length,d=(c=I(t,o).length)!=null?c:a;a>1&&i.push({weight:Math.min(a,d),delimiter:o})}const s=i.sort(({weight:o},{weight:a})=>a-o).map(({delimiter:o})=>o);for(const o of s){const a=se(v(r,o).names,e==null?void 0:e.longitudeField,e==null?void 0:e.latitudeField);if(a.longitudeFieldName&&a.latitudeFieldName)return{delimiter:o,locationInfo:a}}return{delimiter:s[0],locationInfo:null}}function*C(r,t,e,i=()=>Object.create(null)){const n=O(r);n.next();let s="",c="",o=0,a=i(),d=0;e:for(const g of n){const h=q(g,e);for(const m of h)if(s+=c+m,c="",o+=D(m),o%2==0){if(o>0){const p=T.exec(s);if(!p){a=i(),d=0,s="",o=0;continue e}a[t[d]]=p[1].replace(E,'"'),d++}else a[t[d]]=s,d++;s="",o=0}else c=e;o===0?(yield a,a=i(),d=0):c=$}}function v(r,t){const e=I(r,t).filter(n=>n!=null),i=e.map(n=>N(n));for(let n=i.length-1;n>=0;n--)i[n]||(i.splice(n,1),e.splice(n,1));return{names:i,aliases:e}}function I(r,t){if(!(r!=null&&r.length))return[];const e=[];let i="",n="",s=0;const c=q(r,t);for(const o of c)if(i+=n+o,n="",s+=D(o),s%2==0){if(s>0){const a=T.exec(i);a&&e.push(a[1].replace(E,'"'))}else e.push(i);i="",s=0}else n=t;return e}function D(r){let t=0,e=0;for(e=r.indexOf('"',e);e>=0;)t++,e=r.indexOf('"',e+1);return t}function se(r,t,e){var c,o;t=(c=N(t))==null?void 0:c.toLowerCase(),e=(o=N(e))==null?void 0:o.toLowerCase();const i=r.map(a=>a.toLowerCase()),n=t?r[i.indexOf(t)]:null,s=e?r[i.indexOf(e)]:null;return{longitudeFieldName:n||r[i.indexOf(de.find(a=>i.includes(a)))],latitudeFieldName:s||r[i.indexOf(ce.find(a=>i.includes(a)))]}}function oe(r,t,e,i,n){const s=[],c=C(r,e,t),o=[];for(const a of c){if(o.length===10)break;o.push(a)}for(let a=0;a<e.length;a++){const d=e[a],g=i[a];if(d===n.longitudeFieldName||d===n.latitudeFieldName)s.push({name:d,type:"esriFieldTypeDouble",alias:g});else{let h,m;switch(ae(o.map(p=>p[d]))){case"integer":h="esriFieldTypeInteger";break;case"double":h="esriFieldTypeDouble";break;case"date":h="esriFieldTypeDate",m=36;break;default:h="esriFieldTypeString",m=255}s.push({name:d,type:h,alias:g,length:m})}}return s}function ae(r){if(!r.length)return"string";const t=/[^+-.,0-9]/;return r.map(e=>{let i=!1;if(e!==""){if(t.test(e))i=!0;else{let n=w(e);if(!isNaN(n))return/[.,]/.test(e)||!Number.isInteger(n)||n>214783647||n<-214783648?"double":"integer";if(e.includes("E")){if(n=Number(e),!isNaN(n))return"double";if(e.includes(",")){if(e=e.replace(",","."),n=Number(e),!isNaN(n))return"double";i=!0}else i=!0}else i=!0}return i?/^[-]?\d*[.,]?\d*$/.test(e)?"string":j(new Date(e),e)?"date":"string":"string"}}).reduce((e,i)=>e===void 0?i:i===void 0?e:e===i?i:e==="string"||i==="string"?"string":e==="double"||i==="double"?"double":void 0)}function j(r,t){if(!r||Object.prototype.toString.call(r)!=="[object Date]"||isNaN(r.getTime()))return!1;let e=!0;if(!ue&&/\d+\W*$/.test(t)){const i=t.match(/[a-zA-Z]{2,}/);if(i){let n=!1,s=0;for(;!n&&s<=i.length;)n=!le.test(i[s]),s++;e=!n}}return e}const w=function(){const r=ee(),t=new RegExp("^"+r.regexp+"$"),e=new RegExp("["+r.group+"\\s\\xa0]","g"),i=r.factor;return n=>{const s=t.exec(n);if(r.factor=i,!s)return NaN;let c=s[1];if(!s[1]){if(!s[2])return NaN;c=s[2],r.factor*=-1}return c=c.replace(e,"").replace(r.decimal,"."),+c*r.factor}}(),le=/^((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may)|(jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?)|(am)|(pm)|(gmt)|(utc))$/i,ue=Number.isNaN(new Date("technology 10").getTime()),ce=["lat","latitude","latitude83","latdecdeg","lat_dd","y","ycenter","point_y"],de=["lon","lng","long","longitude","longitude83","longdecdeg","long_dd","x","xcenter","point_x"],fe=/^([0-9])/,me=/[^A-Za-z0-9_\u0080-\uffff]/g,pe=/_{2,}/g,he=/^_/,ye=/_$/;function N(r){return r?r.trim().replace(me,"_").replace(pe,"_").replace(he,"").replace(ye,"").replace(fe,"F$1"):null}const ge=ie("esriGeometryPoint"),_e=["csv"],Fe=[0,0];class Ie{constructor(t,e){this.x=t,this.y=e}}class Ge{constructor(){this._queryEngine=null,this._snapshotFeatures=async t=>{const e=await this._fetch(t);return this._createFeatures(e)}}destroy(){var t;(t=this._queryEngine)==null||t.destroy(),this._queryEngine=null}async load(t,e={}){var c;this._loadOptions=t;const[i]=await Promise.all([this._fetch(e.signal),this._checkProjection((c=t==null?void 0:t.parsingOptions)==null?void 0:c.spatialReference)]),n=we(i,t);this._locationInfo=n.locationInfo,this._delimiter=n.delimiter,this._queryEngine=this._createQueryEngine(n);const s=await this._createFeatures(i);if(this._queryEngine.featureStore.addMany(s),n.layerDefinition.extent=this._queryEngine.fullExtent,n.layerDefinition.timeInfo){const{start:o,end:a}=this._queryEngine.timeExtent;n.layerDefinition.timeInfo.timeExtent=[o,a]}return n}async applyEdits(){throw new F("csv-layer:editing-not-supported","applyEdits() is not supported on CSVLayer")}async queryFeatures(t={},e={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQuery(t,e.signal)}async queryFeatureCount(t={},e={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForCount(t,e.signal)}async queryObjectIds(t={},e={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForIds(t,e.signal)}async queryExtent(t={},e={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForExtent(t,e.signal)}async querySnapping(t,e={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForSnapping(t,e.signal)}async refresh(t){var e;return this._loadOptions.customParameters=t,(e=this._snapshotTask)==null||e.abort(),this._snapshotTask=k(this._snapshotFeatures),this._snapshotTask.promise.then(i=>{this._queryEngine.featureStore.clear(),i&&this._queryEngine.featureStore.addMany(i)},i=>{this._queryEngine.featureStore.clear(),P(i)||V.getLogger("esri.layers.CSVLayer").error(new F("csv-layer:refresh","An error occurred during refresh",{error:i}))}),await this._waitSnapshotComplete(),{extent:this._queryEngine.fullExtent,timeExtent:this._queryEngine.timeExtent}}async _waitSnapshotComplete(){if(this._snapshotTask&&!this._snapshotTask.finished){try{await this._snapshotTask.promise}catch{}return this._waitSnapshotComplete()}}async _fetch(t){const{url:e,customParameters:i}=this._loadOptions;if(!e)throw new F("csv-layer:invalid-source","url not defined");const n=L(e);return(await G(n.path,{query:{...n.query,...i},responseType:"text",signal:t})).data}_createQueryEngine(t){const{objectIdField:e,fields:i,extent:n,timeInfo:s}=t.layerDefinition,c=new K({geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1});return new H({fields:i,geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1,timeInfo:s,objectIdField:e,spatialReference:n.spatialReference||{wkid:4326},cacheSpatialQueries:!0,featureStore:c})}async _createFeatures(t){const{latitudeFieldName:e,longitudeFieldName:i}=this._locationInfo,{objectIdField:n,fieldsIndex:s,spatialReference:c}=this._queryEngine;let o=[];const a=[],d=s.fields.filter(l=>l.name!==n).map(l=>l.name);let g=0;const h={};for(const l of s.fields)if(l.type!=="esriFieldTypeOID"&&l.type!=="esriFieldTypeGlobalID"){const y=M(l);y!==void 0&&(h[l.name]=y)}const m=C(t,d,this._delimiter,te(h,n));for(const l of m){const y=this._parseCoordinateValue(l[e]),_=this._parseCoordinateValue(l[i]);if(_!=null&&y!=null&&!isNaN(y)&&!isNaN(_)){l[e]=y,l[i]=_;for(const u in l)if(u!==e&&u!==i){if(s.isDateField(u)){const f=new Date(l[u]);l[u]=j(f,l[u])?f.getTime():null}else if(s.isNumericField(u)){const f=w(l[u]);isNaN(f)?l[u]=null:l[u]=f}}l[n]=g,g++,o.push(new Ie(_,y)),a.push(l)}}if(!Q({wkid:4326},c))if(R(c))for(const l of o)[l.x,l.y]=A(l.x,l.y,Fe);else o=Y(W,o,Z.WGS84,c,null,null);const p=[];for(let l=0;l<o.length;l++){const{x:y,y:_}=o[l],u=a[l];u[n]=l+1,p.push(new U(new B([],[y,_]),u,null,u[n]))}return p}_parseCoordinateValue(t){if(t==null||t==="")return null;let e=w(t);return(isNaN(e)||Math.abs(e)>181)&&(e=parseFloat(t)),e}async _checkProjection(t){try{await X(J,t)}catch{throw new F("csv-layer:projection-not-supported","Projection not supported")}}}function we(r,t){var l,y,_;const e=t.parsingOptions||{},i={delimiter:e.delimiter,layerDefinition:null,locationInfo:{latitudeFieldName:e.latitudeField,longitudeFieldName:e.longitudeField}},n=i.layerDefinition={name:z(t.url,_e)||"csv",drawingInfo:ge,geometryType:"esriGeometryPoint",objectIdField:null,fields:[],timeInfo:e.timeInfo,extent:{xmin:Number.POSITIVE_INFINITY,ymin:Number.POSITIVE_INFINITY,xmax:Number.NEGATIVE_INFINITY,ymax:Number.NEGATIVE_INFINITY,spatialReference:e.spatialReference||{wkid:102100}}},s=O(r),c=(l=s.next().value)==null?void 0:l.trim(),o=(y=s.next().value)==null?void 0:y.trim();if(!c)throw new F("csv-layer:empty-csv","CSV is empty",{csv:r});const{delimiter:a,locationInfo:d}=re(c,o,e);if(!a)throw new F("csv-layer:invalid-delimiter","Unable to detect the delimiter from CSV",{firstLine:c,secondLine:o,parsingOptions:e});if(!d)throw new F("csv-layer:location-fields-not-found","Unable to identify latitude and longitude fields from the CSV file",{firstLine:c,secondLine:o,parsingOptions:e});i.locationInfo=d,i.delimiter=a;const{names:g,aliases:h}=v(c,a),m=oe(r,i.delimiter,g,h,i.locationInfo);if((_=e.fields)!=null&&_.length){const u=new x(e.fields);for(const f of m){const b=u.get(f.name);b&&Object.assign(f,b)}}if(!m.some(u=>u.type==="esriFieldTypeOID"&&(n.objectIdField=u.name,!0))){const u={name:"__OBJECTID",alias:"__OBJECTID",type:"esriFieldTypeOID",editable:!1,nullable:!1};n.objectIdField=u.name,m.unshift(u)}n.fields=m;const p=new x(n.fields);if(i.locationInfo&&(i.locationInfo.latitudeFieldName=p.get(i.locationInfo.latitudeFieldName).name,i.locationInfo.longitudeFieldName=p.get(i.locationInfo.longitudeFieldName).name),n.timeInfo){const u=n.timeInfo;if(u.startTimeField){const f=p.get(u.startTimeField);f?(u.startTimeField=f.name,f.type="esriFieldTypeDate"):u.startTimeField=null}if(u.endTimeField){const f=p.get(u.endTimeField);f?(u.endTimeField=f.name,f.type="esriFieldTypeDate"):u.endTimeField=null}if(u.trackIdField){const f=p.get(u.trackIdField);u.trackIdField=f?f.name:null}u.startTimeField||u.endTimeField||(n.timeInfo=null)}return i}export{Ge as default};
