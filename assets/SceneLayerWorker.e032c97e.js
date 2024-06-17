import{at as G,cs as q,hg as c,c as J}from"./index.7ef8deff.js";import"./sphere.5b2fd7b8.js";import"./mat3f64.6d32a1d7.js";import"./mat4f64.ff2a477c.js";import"./quatf64.4ae3e6f1.js";var L,D;(function(e){e[e.None=0]="None",e[e.Int16=1]="Int16",e[e.Int32=2]="Int32"})(L||(L={})),function(e){e[e.Replace=0]="Replace",e[e.Outside=1]="Outside",e[e.Inside=2]="Inside",e[e.Finished=3]="Finished"}(D||(D={}));function K(){return T||(T=new Promise(e=>G(()=>import("./i3s.87f8afd0.js"),[]).then(t=>t.i).then(({default:t})=>{const r=t({locateFile:Q,onRuntimeInitialized:()=>e(r)});delete r.then})).catch(e=>{throw e})),T}function Q(e){return q(`esri/libs/i3s/${e}`)}let T;var N,E,x,B,$;(function(e){e[e.Unmodified=0]="Unmodified",e[e.Culled=1]="Culled",e[e.NotChecked=2]="NotChecked"})(N||(N={})),function(e){e[e.Unmodified=0]="Unmodified",e[e.PotentiallyModified=1]="PotentiallyModified",e[e.Culled=2]="Culled",e[e.Unknown=3]="Unknown",e[e.NotChecked=4]="NotChecked"}(E||(E={}));(function(e){e[e.Unknown=0]="Unknown",e[e.Uncached=1]="Uncached",e[e.Cached=2]="Cached"})(x||(x={})),function(e){e[e.None=0]="None",e[e.MaxScreenThreshold=1]="MaxScreenThreshold",e[e.ScreenSpaceRelative=2]="ScreenSpaceRelative",e[e.RemovedFeatureDiameter=3]="RemovedFeatureDiameter",e[e.DistanceRangeFromDefaultCamera=4]="DistanceRangeFromDefaultCamera"}(B||(B={})),function(e){e[e.Hole=0]="Hole",e[e.Leaf=1]="Leaf"}($||($={}));async function re(e){await g();const t=[e.geometryBuffer];return{result:k(e,t),transferList:t}}async function ie(e){var w;await g();const t=[e.geometryBuffer],{geometryBuffer:r}=e,f=r.byteLength,i=o._malloc(f),d=new Uint8Array(o.HEAPU8.buffer,i,f);d.set(new Uint8Array(r));const s=o.dracoDecompressPointCloudData(i,d.byteLength);if(o._free(i),s.error.length>0)throw`i3s.wasm: ${s.error}`;const p=((w=s.featureIds)==null?void 0:w.length)>0?c(s.featureIds):null,h=c(s.positions);return p&&t.push(p.buffer),t.push(h.buffer),{result:{positions:h,featureIds:p},transferList:t}}async function se(e){await g(),X(e);const t={buffer:e.buffer};return{result:t,transferList:[t.buffer]}}async function ae(e){await g(),W(e)}async function fe(e){await g(),o.setLegacySchema(e.context,e.jsonSchema)}function ce(e){H(e)}let _,o;function W(e){const t=e.modifications,r=o._malloc(8*t.length),f=new Float64Array(o.HEAPU8.buffer,r,t.length);for(let i=0;i<t.length;++i)f[i]=t[i];o.setModifications(e.context,r,t.length,e.isGeodetic),o._free(r)}function k(e,t){if(!o)return null;const{context:r,localOrigin:f,globalTrafo:i,mbs:d,obb:s,elevationOffset:p,geometryBuffer:h,geometryDescriptor:w,indexToVertexProjector:Y,vertexToRenderProjector:V}=e,A=o._malloc(h.byteLength),F=33,I=o._malloc(F*Float64Array.BYTES_PER_ELEMENT),R=new Uint8Array(o.HEAPU8.buffer,A,h.byteLength);R.set(new Uint8Array(h));const a=new Float64Array(o.HEAPU8.buffer,I,F);b(a,f);let u=a.byteOffset+3*a.BYTES_PER_ELEMENT,l=new Float64Array(a.buffer,u);b(l,i),u+=16*a.BYTES_PER_ELEMENT,l=new Float64Array(a.buffer,u),b(l,d),u+=4*a.BYTES_PER_ELEMENT,J(s)&&(l=new Float64Array(a.buffer,u),b(l,s.center),u+=3*a.BYTES_PER_ELEMENT,l=new Float64Array(a.buffer,u),b(l,s.halfSize),u+=3*a.BYTES_PER_ELEMENT,l=new Float64Array(a.buffer,u),b(l,s.quaternion));const M=w,j={isDraco:!1,isLegacy:!1,color:e.layouts.some(m=>m.some(y=>y.name==="color")),normal:e.needNormals&&e.layouts.some(m=>m.some(y=>y.name==="normalCompressed")),uv0:e.layouts.some(m=>m.some(y=>y.name==="uv0")),uvRegion:e.layouts.some(m=>m.some(y=>y.name==="uvRegion")),featureIndex:M.featureIndex},n=o.process(r,!!e.obb,A,R.byteLength,M,j,I,p,Y,V,e.normalReferenceFrame);if(o._free(I),o._free(A),n.error.length>0)throw`i3s.wasm: ${n.error}`;if(n.discarded)return null;const U=n.componentOffsets.length>0?c(n.componentOffsets):null,P=n.featureIds.length>0?c(n.featureIds):null,S=c(n.interleavedVertedData).buffer,C=n.indicesType===L.Int16?c(new Uint16Array(n.indices.buffer,n.indices.byteOffset,n.indices.byteLength/2)):c(new Uint32Array(n.indices.buffer,n.indices.byteOffset,n.indices.byteLength/4)),O=c(n.positions),v=n.positionIndicesType===L.Int16?c(new Uint16Array(n.positionIndices.buffer,n.positionIndices.byteOffset,n.positionIndices.byteLength/2)):c(new Uint32Array(n.positionIndices.buffer,n.positionIndices.byteOffset,n.positionIndices.byteLength/4)),z={layout:e.layouts[0],interleavedVertexData:S,indices:C,hasColors:n.hasColors,hasModifications:n.hasModifications,positionData:{data:O,indices:v}};return P&&t.push(P.buffer),U&&t.push(U.buffer),t.push(S),t.push(C.buffer),t.push(O.buffer),t.push(v.buffer),{componentOffsets:U,featureIds:P,transformedGeometry:z,obb:n.obb}}function ue(e){return e===0?E.Unmodified:e===1?E.PotentiallyModified:e===2?E.Culled:E.Unknown}function X(e){const{context:t,buffer:r}=e,f=o._malloc(r.byteLength),i=r.byteLength/Float64Array.BYTES_PER_ELEMENT,d=new Float64Array(o.HEAPU8.buffer,f,i),s=new Float64Array(r);d.set(s),o.filterOBBs(t,f,i),s.set(d),o._free(f)}function H(e){o&&o.destroy(e)}function b(e,t){for(let r=0;r<t.length;++r)e[r]=t[r]}function g(){return o?Promise.resolve():(_||(_=K().then(e=>{o=e,_=null})),_)}const le={transform:k,destroy:H};export{ce as destroyContext,ie as dracoDecompressPointCloudData,se as filterObbsForModifications,X as filterObbsForModificationsSync,g as initialize,ue as interpretObbModificationResults,re as process,fe as setLegacySchema,ae as setModifications,W as setModificationsSync,le as test};
