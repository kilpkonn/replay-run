import{a6 as r,a7 as o,a8 as p}from"./index.d8ca6ba2.js";import s from"./FeatureLayerView2D.4fa7853e.js";import"./utils.7f2fb807.js";import"./Utils.3b17debd.js";import"./enums.0295eb81.js";import"./enums.2d9e6f64.js";import"./Texture.32bbc85c.js";import"./VertexElementDescriptor.1fdca6da.js";import"./MaterialKey.c22e0b9b.js";import"./LayerView.4c8297ae.js";import"./schemaUtils.3ce12c70.js";import"./visualVariablesUtils.0d64fe05.js";import"./createSymbolSchema.fe1d1a57.js";import"./ExpandedCIM.8734771f.js";import"./BidiEngine.d8bba3fc.js";import"./Rect.95b0fd2e.js";import"./quantizationUtils.5e469ab5.js";import"./GeometryUtils.4f19e772.js";import"./floatRGBA.f67e629a.js";import"./util.68618c2f.js";import"./floorFilterUtils.05eb8c6a.js";import"./popupUtils.7985c432.js";import"./RefreshableLayerView.a4659a4a.js";const m=t=>{let e=class extends t{get availableFields(){return this.layer.fieldsIndex.fields.map(a=>a.name)}};return r([o()],e.prototype,"layer",void 0),r([o({readOnly:!0})],e.prototype,"availableFields",null),e=r([p("esri.views.layers.OGCFeatureLayerView")],e),e};let i=class extends m(s){supportsSpatialReference(t){return this.layer.serviceSupportsSpatialReference(t)}};i=r([p("esri.views.2d.layers.OGCFeatureLayerView2D")],i);const I=i;export{I as default};
