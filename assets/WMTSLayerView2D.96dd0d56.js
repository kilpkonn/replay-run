import{cV as w,cW as g,cX as I,_ as S,bN as f,x as h,bK as d,s as T,a6 as n,a7 as m,a8 as V}from"./index.7ef8deff.js";import{t as v,n as y}from"./imageUtils.07de01d5.js";import{y as x,u as M}from"./LayerView.eb7992c7.js";import{i as q}from"./RefreshableLayerView.b3f993b0.js";import"./BitmapTileContainer.315d40f7.js";import"./Bitmap.65dacd62.js";import"./utils.9003965e.js";import"./Utils.00e1f49c.js";import"./enums.0295eb81.js";import"./enums.2d9e6f64.js";import"./Texture.8f1ca1c9.js";import"./VertexElementDescriptor.1fdca6da.js";import"./MaterialKey.ec6c6937.js";import"./TileContainer.78194cca.js";import"./WGLContainer.f4c084d0.js";import"./pixelUtils.7950f243.js";import"./VertexArrayObject.c6c5bc8f.js";import"./ProgramTemplate.7d90312b.js";import"./StyleDefinition.d56936e4.js";import"./config.82550349.js";import"./GeometryUtils.51c4032a.js";import"./earcut.afc1d357.js";const b=[102113,102100,3857,3785,900913],R=[0,0];let a=class extends q(v(x(M))){constructor(){super(...arguments),this._tileStrategy=null,this._fetchQueue=null,this._tileRequests=new Map,this.layer=null}get tileMatrixSet(){const e=this._getTileMatrixSetBySpatialReference(this.layer.activeLayer);return e?(e.id!==this.layer.activeLayer.tileMatrixSetId&&(this.layer.activeLayer.tileMatrixSetId=e.id),e):null}update(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume()}attach(){if(!this.tileMatrixSet)return;const{tileInfo:e}=this.tileMatrixSet;this._tileInfoView=new w(e),this._fetchQueue=new g({tileInfoView:this._tileInfoView,concurrency:16,process:(t,i)=>this.fetchTile(t,i)}),this._tileStrategy=new I({cachePolicy:"keep",resampling:!0,acquireTile:t=>this.acquireTile(t),releaseTile:t=>this.releaseTile(t),tileInfoView:this._tileInfoView}),this.handles.add(S(()=>{var t,i;return[(i=(t=this.layer)==null?void 0:t.activeLayer)==null?void 0:i.styleId,this.tileMatrixSet]},()=>this._refresh()),this.declaredClass),super.attach()}detach(){var e,t;super.detach(),this.handles.remove(this.declaredClass),(e=this._tileStrategy)==null||e.destroy(),(t=this._fetchQueue)==null||t.destroy(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.requestUpdate()}releaseTile(e){this._fetchQueue.abort(e.key.id),this._bitmapView.removeChild(e),e.once("detach",()=>e.destroy()),this.requestUpdate()}acquireTile(e){const t=this._bitmapView.createTile(e),i=t.bitmap;return[i.x,i.y]=this._tileInfoView.getTileCoords(R,t.key),i.resolution=this._tileInfoView.getTileResolution(t.key),[i.width,i.height]=this._tileInfoView.tileInfo.size,this._enqueueTileFetch(t),this._bitmapView.addChild(t),this.requestUpdate(),t}async doRefresh(){!this.attached||this.updateRequested||this.suspended||this._refresh()}isUpdating(){var e,t;return(t=(e=this._fetchQueue)==null?void 0:e.updating)!=null?t:!1}async fetchTile(e,t={}){const i="tilemapCache"in this.layer?this.layer.tilemapCache:null,{signal:s,resamplingLevel:o=0}=t;if(!i)return this._fetchImage(e,s);const r=new f(0,0,0,0);let c;try{await i.fetchAvailabilityUpsample(e.level,e.row,e.col,r,{signal:s}),c=await this._fetchImage(r,s)}catch(l){if(h(l))throw l;if(o<3){const u=this._tileInfoView.getTileParentId(e.id);if(u){const p=new f(u),_=await this.fetchTile(p,{...t,resamplingLevel:o+1});return y(this._tileInfoView,_,p,e)}}throw l}return y(this._tileInfoView,c,r,e)}canResume(){const e=super.canResume();return e&&this.tileMatrixSet!==null}supportsSpatialReference(e){return this.layer.activeLayer.tileMatrixSets.some(t=>d(t.tileInfo.spatialReference,e))}async _enqueueTileFetch(e){if(!this._fetchQueue.has(e.key.id)){try{const t=await this._fetchQueue.push(e.key);e.bitmap.source=t,e.bitmap.width=this._tileInfoView.tileInfo.size[0],e.bitmap.height=this._tileInfoView.tileInfo.size[1],e.once("attach",()=>this.requestUpdate())}catch(t){h(t)||T.getLogger(this.declaredClass).error(t)}this.requestUpdate()}}async _fetchImage(e,t){return this.layer.fetchImageBitmapTile(e.level,e.row,e.col,{signal:t})}_refresh(){this._fetchQueue.reset(),this._tileStrategy.tiles.forEach(e=>{if(!e.bitmap.source)return;const t={id:e.key.id,fulfilled:!1,promise:this._fetchQueue.push(e.key).then(i=>{e.bitmap.source=i}).catch(i=>{h(i)||(e.bitmap.source=null)}).finally(()=>{e.requestRender(),t.fulfilled=!0})};this._tileRequests.set(e,t)})}_getTileMatrixSetBySpatialReference(e){const t=this.view.spatialReference;if(!e.tileMatrixSets)return null;let i=e.tileMatrixSets.find(s=>d(s.tileInfo.spatialReference,t));return!i&&t.isWebMercator&&(i=e.tileMatrixSets.find(s=>b.includes(s.tileInfo.spatialReference.wkid))),i}};n([m()],a.prototype,"_fetchQueue",void 0),n([m({readOnly:!0})],a.prototype,"tileMatrixSet",null),a=n([V("esri.views.2d.layers.WMTSLayerView2D")],a);const Z=a;export{Z as default};
