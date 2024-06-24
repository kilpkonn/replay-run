import{x as o,s as p,a6 as r,a7 as a,a8 as m}from"./index.8e464a68.js";import{a as n}from"./BitmapContainer.5d45d31f.js";import{y as h,u as d}from"./LayerView.9cb12fd1.js";import{v as c}from"./ExportStrategy.155f58c3.js";import{i as u}from"./RefreshableLayerView.003c51ab.js";import"./WGLContainer.ba904af6.js";import"./enums.2d9e6f64.js";import"./pixelUtils.e1824b8b.js";import"./utils.793e4b31.js";import"./Utils.037c3ba6.js";import"./enums.0295eb81.js";import"./Texture.363b748f.js";import"./VertexElementDescriptor.1fdca6da.js";import"./MaterialKey.90aa1a8a.js";import"./VertexArrayObject.264f8e97.js";import"./ProgramTemplate.cfcb1633.js";import"./StyleDefinition.d56936e4.js";import"./config.82550349.js";import"./GeometryUtils.51c4032a.js";import"./earcut.afc1d357.js";import"./Bitmap.22d4bb5f.js";let t=class extends u(h(d)){update(e){this._strategy.update(e).catch(i=>{o(i)||p.getLogger(this.declaredClass).error(i)}),this.notifyChange("updating")}attach(){this._bitmapContainer=new n,this.container.addChild(this._bitmapContainer),this._strategy=new c({container:this._bitmapContainer,fetchSource:this.fetchBitmapData.bind(this),requestUpdate:this.requestUpdate.bind(this)})}detach(){this._strategy.destroy(),this._strategy=null,this.container.removeChild(this._bitmapContainer),this._bitmapContainer.removeAllChildren()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}fetchBitmapData(e,i,s){return this.layer.fetchImage(e,i,s)}async doRefresh(){this.requestUpdate()}isUpdating(){return this._strategy.updating||this.updateRequested}};r([a()],t.prototype,"_strategy",void 0),r([a()],t.prototype,"updating",void 0),t=r([m("esri.views.2d.layers.BaseDynamicLayerView2D")],t);const V=t;export{V as default};