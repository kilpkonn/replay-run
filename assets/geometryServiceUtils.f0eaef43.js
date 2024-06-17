import{a6 as c,a7 as l,a8 as h,cx as S,aA as m,hB as d,dQ as w,e4 as R,U as v,hC as J,F as u,n as f,bW as N}from"./index.684eabd6.js";let n=class extends S{constructor(r){super(r),this.geometries=null,this.outSpatialReference=null,this.transformation=null,this.transformForward=null}toJSON(){const r=this.geometries.map(o=>o.toJSON()),t=this.geometries[0],e={};return e.outSR=this.outSpatialReference.wkid||JSON.stringify(this.outSpatialReference.toJSON()),e.inSR=t.spatialReference.wkid||JSON.stringify(t.spatialReference.toJSON()),e.geometries=JSON.stringify({geometryType:m(t),geometries:r}),this.transformation&&(e.transformation=this.transformation.wkid||JSON.stringify(this.transformation)),this.transformForward!=null&&(e.transformForward=this.transformForward),e}};c([l()],n.prototype,"geometries",void 0),c([l({json:{read:{source:"outSR"}}})],n.prototype,"outSpatialReference",void 0),c([l()],n.prototype,"transformation",void 0),c([l()],n.prototype,"transformForward",void 0),n=c([h("esri.rest.support.ProjectParameters")],n);const p=n,O=d(p);async function j(r,t,e){t=O(t);const o=w(r),i={...o.query,f:"json",...t.toJSON()},a=t.outSpatialReference,s=m(t.geometries[0]),g=R(i,e);return v(o.path+"/project",g).then(({data:{geometries:y}})=>J(y,s,a))}async function $(r=null,t){var i,a;if(u.geometryServiceUrl)return u.geometryServiceUrl;if(!r)throw new f("internal:geometry-service-url-not-configured");let e;e="portal"in r?r.portal||N.getDefault():r,await e.load({signal:t});const o=(a=(i=e.helperServices)==null?void 0:i.geometry)==null?void 0:a.url;if(!o)throw new f("internal:geometry-service-url-not-configured");return o}async function U(r,t,e=null,o){const i=await $(e,o),a=new p;a.geometries=[r],a.outSpatialReference=t;const s=await j(i,a,{signal:o});if(s&&Array.isArray(s)&&s.length===1)return s[0];throw new f("internal:geometry-service-projection-failed")}export{$ as getGeometryServiceURL,U as projectGeometry};