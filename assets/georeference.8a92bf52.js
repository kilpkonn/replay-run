import{fy as ir,fJ as sr,dC as lr,a6 as T,a7 as A,a8 as fr,cx as cr,M as _,aj as ur,fK as pr,fL as K,fM as W,fN as M,fO as w,fP as yr,fQ as G,fR as gr,af as mr,c as S,fS as hr,fT as Tr,fU as B,s as Ar,fV as k,ec as J,eb as Z,fW as $r,fE as Pr,fX as dr,fY as Fr,fZ as Er,j as m,f_ as C,f$ as Q,g0 as Mr,cq as Rr,g1 as xr,g2 as vr}from"./index.684eabd6.js";import{e as X}from"./mat3f64.6d32a1d7.js";import{e as $,o as _r}from"./mat4f64.ff2a477c.js";import{v as z,y as wr,x as Cr}from"./quat.ce0088fd.js";import{e as I}from"./quatf64.4ae3e6f1.js";import{T as p,i as u}from"./BufferView.18f63d9f.js";import{t as F,e as Or,r as P,o as rr}from"./vec33.dbe7ee44.js";function E(r=br){return[r[0],r[1],r[2],r[3]]}function ct(r,t,e=E()){return ir(e,r),e[3]=t,e}function ut(r,t,e=E()){return z(R,r,j(r)),z(D,t,j(t)),wr(R,D,R),Nr(e,sr(Cr(e,R)))}function pt(r){return r}function j(r){return lr(r[3])}function Nr(r,t){return r[3]=t,r}const br=[0,0,1,0],R=I(),D=I();E();var Y;let g=Y=class extends cr{constructor(r){super(r),this.origin=_(),this.translation=_(),this.rotation=E(),this.scale=ur(1,1,1),this.geographic=!0}get localMatrix(){const r=$();return z(H,this.rotation,j(this.rotation)),pr(r,H,this.translation,this.scale),r}get localMatrixInverse(){return K($(),this.localMatrix)}applyLocal(r,t){return W(t,r,this.localMatrix)}applyLocalInverse(r,t){return W(t,r,this.localMatrixInverse)}project(r,t){const e=new Float64Array(r.length),o=p.fromTypedArray(e),n=p.fromTypedArray(r);if(this.geographic){const l=M(t),f=$();return w(t,this.origin,f,l),yr(f,f,this.localMatrix),F(o,n,f),G(e,l,0,e,t,0,e.length/3),e}const{localMatrix:a,origin:i}=this;gr(a,_r)?Or(o,n):F(o,n,a);for(let l=0;l<e.length;l+=3)e[l+0]+=i[0],e[l+1]+=i[1],e[l+2]+=i[2];return e}getOriginPoint(r){const[t,e,o]=this.origin;return new mr({x:t,y:e,z:o,spatialReference:r})}equals(r){return S(r)&&this.geographic===r.geographic&&hr(this.origin,r.origin)&&Tr(this.localMatrix,r.localMatrix)}clone(){const r={origin:B(this.origin),translation:B(this.translation),rotation:E(this.rotation),scale:B(this.scale),geographic:this.geographic};return new Y(r)}};T([A({type:[Number],nonNullable:!0,json:{write:!0}})],g.prototype,"origin",void 0),T([A({type:[Number],nonNullable:!0,json:{write:!0}})],g.prototype,"translation",void 0),T([A({type:[Number],nonNullable:!0,json:{write:!0}})],g.prototype,"rotation",void 0),T([A({type:[Number],nonNullable:!0,json:{write:!0}})],g.prototype,"scale",void 0),T([A({type:Boolean,nonNullable:!0,json:{write:!0}})],g.prototype,"geographic",void 0),T([A()],g.prototype,"localMatrix",null),T([A()],g.prototype,"localMatrixInverse",null),g=Y=T([fr("esri.geometry.support.MeshTransform")],g);const H=I(),Lr=g;function O(r,t){var e;return r.isGeographic||r.isWebMercator&&((e=t==null?void 0:t.geographic)!=null?e:!0)}const N=Ar.getLogger("esri.geometry.support.meshUtils.normalProjection");function Br(r,t,e,o,n){return L(o)?(b(h.TO_PCPF,u.fromTypedArray(r),p.fromTypedArray(t),p.fromTypedArray(e),o,u.fromTypedArray(n)),n):(N.error("Cannot convert spatial reference to PCPF"),n)}function Sr(r,t,e,o,n){return L(o)?(b(h.FROM_PCPF,u.fromTypedArray(r),p.fromTypedArray(t),p.fromTypedArray(e),o,u.fromTypedArray(n)),n):(N.error("Cannot convert to spatial reference from PCPF"),n)}function zr(r,t,e){return G(r,t,0,e,M(t),0,r.length/3),e}function jr(r,t,e){return G(r,M(e),0,t,e,0,r.length/3),t}function Yr(r,t,e){if(m(r))return t;const o=p.fromTypedArray(r),n=p.fromTypedArray(t);return F(n,o,e),t}function Vr(r,t,e){if(m(r))return t;C(c,e);const o=u.fromTypedArray(r),n=u.fromTypedArray(t);return P(n,o,c),Q(c)||rr(n,n),t}function qr(r,t,e){if(m(r))return t;C(c,e);const o=u.fromTypedArray(r,4*Float32Array.BYTES_PER_ELEMENT),n=u.fromTypedArray(t,4*Float32Array.BYTES_PER_ELEMENT);if(P(n,o,c),Q(c)||rr(n,n),r!==t)for(let a=3;a<r.length;a+=4)t[a]=r[a];return t}function Gr(r,t,e,o,n){if(!L(o))return N.error("Cannot convert spatial reference to PCPF"),n;b(h.TO_PCPF,u.fromTypedArray(r,4*Float32Array.BYTES_PER_ELEMENT),p.fromTypedArray(t),p.fromTypedArray(e),o,u.fromTypedArray(n,4*Float32Array.BYTES_PER_ELEMENT));for(let a=3;a<r.length;a+=4)n[a]=r[a];return n}function Ir(r,t,e,o,n){if(!L(o))return N.error("Cannot convert to spatial reference from PCPF"),n;b(h.FROM_PCPF,u.fromTypedArray(r,16),p.fromTypedArray(t),p.fromTypedArray(e),o,u.fromTypedArray(n,16));for(let a=3;a<r.length;a+=4)n[a]=r[a];return n}function b(r,t,e,o,n,a){if(!t)return;const i=e.count,l=M(n);if(tr(n))for(let f=0;f<i;f++)o.getVec(f,x),t.getVec(f,y),w(l,x,v,l),k(c,v),r===h.FROM_PCPF&&J(c,c),Z(y,y,c),a.setVec(f,y);else for(let f=0;f<i;f++){o.getVec(f,x),t.getVec(f,y),w(l,x,v,l),k(c,v);const d=$r(e.get(f,1));let s=Math.cos(d);r===h.TO_PCPF&&(s=1/s),c[0]*=s,c[1]*=s,c[2]*=s,c[3]*=s,c[4]*=s,c[5]*=s,r===h.FROM_PCPF&&J(c,c),Z(y,y,c),Pr(y,y),a.setVec(f,y)}return a}function L(r){return tr(r)||Ur(r)}function tr(r){return r.isWGS84||dr(r)||Fr(r)||Er(r)}function Ur(r){return r.isWebMercator}var h;(function(r){r[r.TO_PCPF=0]="TO_PCPF",r[r.FROM_PCPF=1]="FROM_PCPF"})(h||(h={}));const x=_(),y=_(),v=$(),c=X();function er(r,t,e){return O(t.spatialReference,e)?Zr(r,t,e):Jr(r,t,e)}function Wr(r,t,e){const{position:o,normal:n,tangent:a}=r;if(m(t))return{position:o,normal:n,tangent:a};const i=t.localMatrix;return er({position:Yr(o,new Float64Array(o.length),i),normal:S(n)?Vr(n,new Float32Array(n.length),i):null,tangent:S(a)?qr(a,new Float32Array(a.length),i):null},t.getOriginPoint(e),{geographic:t.geographic})}function yt(r,t,e){var o;if(e!=null&&e.useTransform){const{position:n,normal:a,tangent:i}=r;return{vertexAttributes:{position:n,normal:a,tangent:i},transform:new Lr({origin:[t.x,t.y,(o=t.z)!=null?o:0],geographic:O(t.spatialReference,e)})}}return{vertexAttributes:er(r,t,e),transform:null}}function kr(r,t,e){return O(t.spatialReference,e)?nr(r,t,e):V(r,t,e)}function gt(r,t,e,o){if(m(t))return kr(r,e,o);const n=Wr(r,t,e.spatialReference);return e.equals(t.getOriginPoint(e.spatialReference))?V(n,e,o):O(e.spatialReference,o)?nr(n,e,o):V(n,e,o)}function Jr(r,t,e){const o=new Float64Array(r.position.length),n=r.position,a=t.x,i=t.y,l=t.z||0,{horizontal:f,vertical:d}=U(e?e.unit:null,t.spatialReference);for(let s=0;s<n.length;s+=3)o[s+0]=n[s+0]*f+a,o[s+1]=n[s+1]*f+i,o[s+2]=n[s+2]*d+l;return{position:o,normal:r.normal,tangent:r.tangent}}function Zr(r,t,e){const o=t.spatialReference,n=or(t,e,q),a=new Float64Array(r.position.length),i=Dr(r.position,n,o,a),l=C(ar,n);return{position:i,normal:Hr(i,a,r.normal,l,o),tangent:Kr(i,a,r.tangent,l,o)}}function Dr(r,t,e,o){F(p.fromTypedArray(o),p.fromTypedArray(r),t);const n=new Float64Array(r.length);return jr(o,n,e)}function Hr(r,t,e,o,n){if(m(e))return null;const a=new Float32Array(e.length);return P(u.fromTypedArray(a),u.fromTypedArray(e),o),Sr(a,r,t,n,a),a}function Kr(r,t,e,o,n){if(m(e))return null;const a=new Float32Array(e.length);P(u.fromTypedArray(a,4*Float32Array.BYTES_PER_ELEMENT),u.fromTypedArray(e,4*Float32Array.BYTES_PER_ELEMENT),o);for(let i=3;i<a.length;i+=4)a[i]=e[i];return Ir(a,r,t,n,a),a}function V(r,t,e){const o=new Float64Array(r.position.length),n=r.position,a=t.x,i=t.y,l=t.z||0,{horizontal:f,vertical:d}=U(e?e.unit:null,t.spatialReference);for(let s=0;s<n.length;s+=3)o[s+0]=(n[s+0]-a)/f,o[s+1]=(n[s+1]-i)/f,o[s+2]=(n[s+2]-l)/d;return{position:o,normal:r.normal,tangent:r.tangent}}function nr(r,t,e){const o=t.spatialReference;or(t,e,q);const n=K(tt,q),a=new Float64Array(r.position.length),i=Qr(r.position,o,n,a),l=C(ar,n);return{position:i,normal:Xr(r.normal,r.position,a,o,l),tangent:rt(r.tangent,r.position,a,o,l)}}function or(r,t,e){w(r.spatialReference,[r.x,r.y,r.z||0],e,M(r.spatialReference));const{horizontal:o,vertical:n}=U(t?t.unit:null,r.spatialReference);return Mr(e,e,[o,o,n]),e}function Qr(r,t,e,o){const n=zr(r,t,o),a=p.fromTypedArray(n),i=new Float64Array(n.length),l=p.fromTypedArray(i);return F(l,a,e),i}function Xr(r,t,e,o,n){if(m(r))return null;const a=Br(r,t,e,o,new Float32Array(r.length)),i=u.fromTypedArray(a);return P(i,i,n),a}function rt(r,t,e,o,n){if(m(r))return null;const a=Gr(r,t,e,o,new Float32Array(r.length)),i=u.fromTypedArray(a,4*Float32Array.BYTES_PER_ELEMENT);return P(i,i,n),a}function U(r,t){if(m(r))return et;const e=t.isGeographic?1:Rr(t),o=t.isGeographic?1:xr(t),n=vr(1,r,"meters");return{horizontal:n*e,vertical:n*o}}const q=$(),tt=$(),ar=X(),et={horizontal:1,vertical:1};export{Ir as L,zr as M,jr as O,yt as _,Gr as a,kr as b,E as c,j as d,ct as e,Lr as f,pt as g,Sr as h,gt as i,Br as j,Wr as k,O as r,ut as v,er as x};