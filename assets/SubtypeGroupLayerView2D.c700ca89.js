import{a6 as o,a8 as n,_ as p,$ as y,c as m,d9 as u}from"./index.7ef8deff.js";import d from"./FeatureLayerView2D.eebbf60b.js";import"./utils.9003965e.js";import"./Utils.00e1f49c.js";import"./enums.0295eb81.js";import"./enums.2d9e6f64.js";import"./Texture.8f1ca1c9.js";import"./VertexElementDescriptor.1fdca6da.js";import"./MaterialKey.ec6c6937.js";import"./LayerView.eb7992c7.js";import"./schemaUtils.d6360417.js";import"./visualVariablesUtils.9d0c189e.js";import"./createSymbolSchema.80307183.js";import"./ExpandedCIM.c57004cc.js";import"./BidiEngine.d8bba3fc.js";import"./Rect.95b0fd2e.js";import"./quantizationUtils.4cc289ed.js";import"./GeometryUtils.4f19e772.js";import"./floatRGBA.5849e806.js";import"./util.dfa8ada0.js";import"./floorFilterUtils.05eb8c6a.js";import"./popupUtils.f1420d09.js";import"./RefreshableLayerView.b3f993b0.js";function h(e,r){return!e.visible||e.minScale!==0&&r>e.minScale||e.maxScale!==0&&r<e.maxScale}let l=class extends d{initialize(){this.handles.add([p(()=>{var e;return(e=this.view)==null?void 0:e.viewpoint},()=>this._update(),y)])}_injectOverrides(e){let r=super._injectOverrides(e);const s=this.view.scale,t=this.layer.sublayers.filter(a=>h(a,s)).map(a=>a.subtypeCode);if(!t.length)return r;r=m(r)?r:new u().toJSON();const i=`NOT ${this.layer.subtypeField} IN (${t.join(",")})`;return r.where=r.where?`(${r.where}) AND (${i})`:i,r}_setLayersForFeature(e){const r=this.layer.fieldsIndex.get(this.layer.subtypeField),s=e.attributes[r.name],t=this.layer.sublayers.find(i=>i.subtypeCode===s);e.layer=t,e.sourceLayer=this.layer}_createSchemaConfig(){const e={subtypeField:this.layer.subtypeField,sublayers:Array.from(this.layer.sublayers).map(i=>({featureReduction:null,geometryType:this.layer.geometryType,labelingInfo:i.labelingInfo,labelsVisible:i.labelsVisible,renderer:i.renderer,subtypeCode:i.subtypeCode,orderBy:null}))},r=this.layer.sublayers.map(i=>i.subtypeCode).join(","),s=this.layer.sublayers.length?`${this.layer.subtypeField} IN (${r})`:"1=2";let t=this.layer.definitionExpression?this.layer.definitionExpression+" AND ":"";return t+=s,{...super._createSchemaConfig(),...e,definitionExpression:t}}};l=o([n("esri.views.2d.layers.SubtypeGroupLayerView2D")],l);const z=l;export{z as default};
