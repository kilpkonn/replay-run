import{fU as g,M as v,fy as h,fD as m,fz as p,h7 as w,ad as x,a1 as A,fG as E}from"./index.7ef8deff.js";import{s as b,c as d}from"./sphere.5b2fd7b8.js";function l(r){return r?{origin:g(r.origin),vector:g(r.vector)}:{origin:v(),vector:v()}}function D(r,o,e=l()){return h(e.origin,r),m(e.vector,o,r),e}function G(r,o,e){return j(r,o,0,1,e)}function j(r,o,e,f,i){const{vector:s,origin:t}=r,n=m(d.get(),o,t),c=p(s,n)/w(s);return x(i,s,A(c,e,f)),E(i,i,r.origin)}new b(()=>l());class k{constructor(o){this.message=o}toString(){return`AssertException: ${this.message}`}}function M(r,o){if(!r)throw o=o||"assert",console.log(new Error(o).stack),new k(o)}function P(r,o,e,f){let i,s=(e[0]-r[0])/o[0],t=(f[0]-r[0])/o[0];s>t&&(i=s,s=t,t=i);let n=(e[1]-r[1])/o[1],c=(f[1]-r[1])/o[1];if(n>c&&(i=n,n=c,c=i),s>c||n>t)return!1;n>s&&(s=n),c<t&&(t=c);let u=(e[2]-r[2])/o[2],a=(f[2]-r[2])/o[2];return u>a&&(i=u,u=a,a=i),!(s>a||u>t)&&(a<t&&(t=a),!(t<0))}export{D as b,P as c,M as e,G as j,l as v};
