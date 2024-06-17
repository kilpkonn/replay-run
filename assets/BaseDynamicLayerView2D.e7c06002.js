import{x as o,s as p,a6 as r,a7 as a,a8 as m}from"./index.7ef8deff.js";import{a as n}from"./BitmapContainer.fd4faff6.js";import{y as h,u as d}from"./LayerView.eb7992c7.js";import{v as c}from"./ExportStrategy.27017034.js";import{i as u}from"./RefreshableLayerView.b3f993b0.js";import"./WGLContainer.f4c084d0.js";import"./enums.2d9e6f64.js";import"./pixelUtils.7950f243.js";import"./utils.9003965e.js";import"./Utils.00e1f49c.js";import"./enums.0295eb81.js";import"./Texture.8f1ca1c9.js";import"./VertexElementDescriptor.1fdca6da.js";import"./MaterialKey.ec6c6937.js";import"./VertexArrayObject.c6c5bc8f.js";import"./ProgramTemplate.7d90312b.js";import"./StyleDefinition.d56936e4.js";import"./config.82550349.js";import"./GeometryUtils.51c4032a.js";import"./earcut.afc1d357.js";import"./Bitmap.65dacd62.js";let t=class extends u(h(d)){update(e){this._strategy.update(e).catch(i=>{o(i)||p.getLogger(this.declaredClass).error(i)}),this.notifyChange("updating")}attach(){this._bitmapContainer=new n,this.container.addChild(this._bitmapContainer),this._strategy=new c({container:this._bitmapContainer,fetchSource:this.fetchBitmapData.bind(this),requestUpdate:this.requestUpdate.bind(this)})}detach(){this._strategy.destroy(),this._strategy=null,this.container.removeChild(this._bitmapContainer),this._bitmapContainer.removeAllChildren()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}fetchBitmapData(e,i,s){return this.layer.fetchImage(e,i,s)}async doRefresh(){this.requestUpdate()}isUpdating(){return this._strategy.updating||this.updateRequested}};r([a()],t.prototype,"_strategy",void 0),r([a()],t.prototype,"updating",void 0),t=r([m("esri.views.2d.layers.BaseDynamicLayerView2D")],t);const V=t;export{V as default};
