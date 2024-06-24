import{c as P,aA as k,c4 as z,a6 as n,a7 as h,dZ as D,c9 as Z,cU as L,aT as W,d_ as K,a8 as F,cx as q,d$ as X,d1 as O,d2 as Y,e0 as ee,e1 as te,dQ as re,e2 as ie,e3 as se,e4 as oe,U as ae,da as ne,dB as le,dn as pe,c$ as he,n as G,at as ue,e5 as ye,e6 as me,cq as de,j as ce,m as fe,cB as ge,de as we,x as ve,s as xe,_ as A,cE as be}from"./index.8e464a68.js";import{a as $e}from"./BitmapContainer.5d45d31f.js";import{y as _e,u as Ie}from"./LayerView.9cb12fd1.js";import{o as Ee}from"./BaseGraphicContainer.7beb48e1.js";import{n as Se}from"./HighlightGraphicContainer.476f9122.js";import{v as Pe}from"./ExportStrategy.155f58c3.js";import{i as Re,r as Fe}from"./scaleUtils.406335ec.js";import{c as je}from"./ExportImageParameters.cfe48b40.js";import{n as U}from"./floorFilterUtils.05eb8c6a.js";import{s as T,a as Ne}from"./drapedUtils.273d2f99.js";import{i as Oe}from"./sublayerUtils.0cac3e07.js";import{d as Ue,s as Ve}from"./popupUtils.a826b93c.js";import{i as Ge}from"./RefreshableLayerView.003c51ab.js";import"./WGLContainer.ba904af6.js";import"./enums.2d9e6f64.js";import"./pixelUtils.e1824b8b.js";import"./utils.793e4b31.js";import"./Utils.037c3ba6.js";import"./enums.0295eb81.js";import"./Texture.363b748f.js";import"./VertexElementDescriptor.1fdca6da.js";import"./MaterialKey.90aa1a8a.js";import"./VertexArrayObject.264f8e97.js";import"./ProgramTemplate.cfcb1633.js";import"./StyleDefinition.d56936e4.js";import"./config.82550349.js";import"./GeometryUtils.51c4032a.js";import"./earcut.afc1d357.js";import"./ExpandedCIM.b7d45465.js";import"./BidiEngine.d8bba3fc.js";import"./Rect.95b0fd2e.js";import"./quantizationUtils.51fde95f.js";import"./GeometryUtils.4f19e772.js";import"./floatRGBA.d4d22bdd.js";import"./normalizeUtilsSync.a9e83a8c.js";import"./projectionSupport.db812bfe.js";import"./json.879c9adc.js";import"./FeatureContainer.8bdcec83.js";import"./TileContainer.610dfe5f.js";import"./visualVariablesUtils.0560c111.js";import"./visualVariablesUtils.532b0a24.js";import"./Matcher.db69dce4.js";import"./tileUtils.9af14b54.js";import"./TileClipper.c8461f1b.js";import"./Geometry.d049a63c.js";import"./devEnvironmentUtils.d8d0484c.js";import"./schemaUtils.5bd2980c.js";import"./createSymbolSchema.4db779f1.js";import"./util.ed6e3896.js";import"./ComputedAttributeStorage.7145a88e.js";import"./centroid.c153c6a4.js";import"./vec3f32.1121a836.js";import"./Bitmap.22d4bb5f.js";const M=r=>r.spatialReference.wkid||JSON.stringify(r.spatialReference);function Ae(r,e){const{dpi:t,gdbVersion:i,geometry:s,geometryPrecision:o,height:m,layerOption:u,mapExtent:a,maxAllowableOffset:l,returnFieldName:p,returnGeometry:y,returnUnformattedValues:g,returnZ:_,spatialReference:b,timeExtent:$,tolerance:c,width:E}=r.toJSON(),{dynamicLayers:w,layerDefs:f,layerIds:v}=Te(r),V=e&&P(e.geometry)?e.geometry:null,x={geometryPrecision:o,maxAllowableOffset:l,returnFieldName:p,returnGeometry:y,returnUnformattedValues:g,returnZ:_,tolerance:c},S=V&&V.toJSON()||s;if(x.imageDisplay=`${E},${m},${t}`,i&&(x.gdbVersion=i),S&&(delete S.spatialReference,x.geometry=JSON.stringify(S),x.geometryType=k(S)),b?x.sr=b.wkid||JSON.stringify(b):S&&S.spatialReference?x.sr=M(S):a&&a.spatialReference&&(x.sr=M(a)),x.time=$?[$.start,$.end].join(","):null,a){const{xmin:B,ymin:C,xmax:H,ymax:Q}=a;x.mapExtent=`${B},${C},${H},${Q}`}return f&&(x.layerDefs=f),w&&!f&&(x.dynamicLayers=w),x.layers=u==="popup"?"visible":u,v&&!w&&(x.layers+=`:${v.join(",")}`),x}function Te(r){var b,$;const{mapExtent:e,floors:t,width:i,sublayers:s,layerIds:o,layerOption:m,gdbVersion:u}=r,a=($=(b=s==null?void 0:s.find(c=>c.layer!=null))==null?void 0:b.layer)==null?void 0:$.serviceSublayers,l=m==="popup",p={},y=Re({extent:e,width:i,spatialReference:e==null?void 0:e.spatialReference}),g=[],_=c=>{const E=y===0,w=c.minScale===0||y<=c.minScale,f=c.maxScale===0||y>=c.maxScale;if(c.visible&&(E||w&&f))if(c.sublayers)c.sublayers.forEach(_);else{if((o==null?void 0:o.includes(c.id))===!1||l&&(!c.popupTemplate||!c.popupEnabled))return;g.unshift(c)}};if(s==null||s.forEach(_),s&&!g.length)p.layerIds=[];else{const c=Oe(g,a,u),E=g.map(w=>{const f=U(t,w);return w.toExportImageJSON(f)});if(c)p.dynamicLayers=JSON.stringify(E);else{if(s){let f=g.map(({id:v})=>v);o&&(f=f.filter(v=>o.includes(v))),p.layerIds=f}else o!=null&&o.length&&(p.layerIds=o);const w=Me(t,g);if(P(w)&&w.length){const f={};for(const v of w)v.definitionExpression&&(f[v.id]=v.definitionExpression);Object.keys(f).length&&(p.layerDefs=JSON.stringify(f))}}}return p}function Me(r,e){const t=!!(r!=null&&r.length),i=e.filter(s=>s.definitionExpression!=null||t&&s.floorInfo!=null);return i.length?i.map(s=>{const o=U(r,s),m=z(o,s.definitionExpression);return{id:s.id,definitionExpression:m}}):null}var N;let d=N=class extends q{constructor(r){super(r),this.dpi=96,this.floors=null,this.gdbVersion=null,this.geometry=null,this.geometryPrecision=null,this.height=400,this.layerIds=null,this.layerOption="top",this.mapExtent=null,this.maxAllowableOffset=null,this.returnFieldName=!0,this.returnGeometry=!1,this.returnM=!1,this.returnUnformattedValues=!0,this.returnZ=!1,this.spatialReference=null,this.sublayers=null,this.timeExtent=null,this.tolerance=null,this.width=400}static from(r){return X(N,r)}};n([h({type:Number,json:{write:!0}})],d.prototype,"dpi",void 0),n([h()],d.prototype,"floors",void 0),n([h({type:String,json:{write:!0}})],d.prototype,"gdbVersion",void 0),n([h({types:D,json:{read:Z,write:!0}})],d.prototype,"geometry",void 0),n([h({type:Number,json:{write:!0}})],d.prototype,"geometryPrecision",void 0),n([h({type:Number,json:{write:!0}})],d.prototype,"height",void 0),n([h({type:[Number],json:{write:!0}})],d.prototype,"layerIds",void 0),n([h({type:["top","visible","all","popup"],json:{write:!0}})],d.prototype,"layerOption",void 0),n([h({type:L,json:{write:!0}})],d.prototype,"mapExtent",void 0),n([h({type:Number,json:{write:!0}})],d.prototype,"maxAllowableOffset",void 0),n([h({type:Boolean,json:{write:!0}})],d.prototype,"returnFieldName",void 0),n([h({type:Boolean,json:{write:!0}})],d.prototype,"returnGeometry",void 0),n([h({type:Boolean,json:{write:!0}})],d.prototype,"returnM",void 0),n([h({type:Boolean,json:{write:!0}})],d.prototype,"returnUnformattedValues",void 0),n([h({type:Boolean,json:{write:!0}})],d.prototype,"returnZ",void 0),n([h({type:W,json:{write:!0}})],d.prototype,"spatialReference",void 0),n([h()],d.prototype,"sublayers",void 0),n([h({type:K,json:{write:!0}})],d.prototype,"timeExtent",void 0),n([h({type:Number,json:{write:!0}})],d.prototype,"tolerance",void 0),n([h({type:Number,json:{write:!0}})],d.prototype,"width",void 0),d=N=n([F("esri.rest.support.IdentifyParameters")],d);const J=d;let I=class extends q{constructor(r){super(r),this.displayFieldName=null,this.feature=null,this.layerId=null,this.layerName=null}readFeature(r,e){return O.fromJSON({attributes:{...e.attributes},geometry:{...e.geometry}})}writeFeature(r,e){if(!r)return;const{attributes:t,geometry:i}=r;t&&(e.attributes={...t}),P(i)&&(e.geometry=i.toJSON(),e.geometryType=te.toJSON(i.type))}};n([h({type:String,json:{write:!0}})],I.prototype,"displayFieldName",void 0),n([h({type:O})],I.prototype,"feature",void 0),n([Y("feature",["attributes","geometry"])],I.prototype,"readFeature",null),n([ee("feature")],I.prototype,"writeFeature",null),n([h({type:Number,json:{write:!0}})],I.prototype,"layerId",void 0),n([h({type:String,json:{write:!0}})],I.prototype,"layerName",void 0),I=n([F("esri.rest.support.IdentifyResult")],I);const Le=I;async function qe(r,e,t){const i=(e=Be(e)).geometry?[e.geometry]:[],s=re(r);return s.path+="/identify",ie(i).then(o=>{const m=Ae(e,{geometry:o&&o[0]}),u=se({...s.query,f:"json",...m}),a=oe(u,t);return ae(s.path,a).then(Je).then(l=>Ce(l,e.sublayers))})}function Je(r){const e=r.data;return e.results=e.results||[],e.exceededTransferLimit=Boolean(e.exceededTransferLimit),e.results=e.results.map(t=>Le.fromJSON(t)),e}function Be(r){return r=J.from(r)}function Ce(r,e){if(!(e!=null&&e.length))return r;const t=new Map;function i(s){t.set(s.id,s),s.sublayers&&s.sublayers.forEach(i)}e.forEach(i);for(const s of r.results)s.feature.sourceLayer=t.get(s.layerId);return r}let j=null;const He=r=>{let e=class extends r{constructor(){super(...arguments),this._featuresResolutions=new WeakMap,this.highlightGraphics=new le,this.updateHighlightedFeatures=pe(async t=>{this.destroyed||this.updatingHandles.addPromise(this._updateHighlightedFeaturesGeometries(t).catch(()=>{}))})}initialize(){this.exportImageParameters=new je({layer:this.layer}),this.handles.add([he(()=>this.highlightGraphics,"change",t=>{this.updatingHandles.addPromise(this._updateHighlightedFeaturesSymbols(t.added).catch(()=>{})),this.updateHighlightedFeatures(this._highlightGeometriesResolution)})])}destroy(){this.exportImageParameters.destroy(),this.exportImageParameters=null}get exportImageVersion(){var t;return(t=this.exportImageParameters)==null||t.commitProperty("version"),this.commitProperty("timeExtent"),(this._get("exportImageVersion")||0)+1}async fetchPopupFeatures(t,i){var m,u,a,l,p,y;const{layer:s}=this;if(!t)throw new G("mapimagelayer:fetchPopupFeatures","Nothing to fetch without area",{layer:s});const o=(a=(u=(m=this.layer.capabilities)==null?void 0:m.operations)==null?void 0:u.supportsQuery)!=null?a:!0;if(!(((y=(p=(l=this.layer.capabilities)==null?void 0:l.operations)==null?void 0:p.supportsIdentify)!=null?y:!0)&&this.layer.version>=10.5)&&!o)throw new G("mapimagelayer:fetchPopupFeatures-not-supported","query operation is disabled for this service",{layer:s});return o?this._fetchPopupFeaturesUsingQueries(t,i):this._fetchPopupFeaturesUsingIdentify(t,i)}canResume(){var t;return!!super.canResume()&&!((t=this.timeExtent)!=null&&t.isEmpty)}async _updateHighlightedFeaturesSymbols(t){for(const i of t){const s="renderer"in i.sourceLayer&&i.sourceLayer.renderer;"geometryType"in i.sourceLayer&&i.sourceLayer.geometryType==="point"&&s&&"getSymbolAsync"in s&&s.getSymbolAsync(i).then(async o=>{var a;let m="width"in o&&"height"in o&&o.width!=null&&o.height!=null?Math.max(o.width,o.height):"size"in o?o.size:null;const u="visualVariables"in s&&((a=s.visualVariables)==null?void 0:a.find(l=>l.type==="size"));u&&(j||(j=(await ue(()=>import("./index.8e464a68.js").then(function(l){return l.k_}),["assets/index.8e464a68.js","assets/index.b377a08b.css"])).getSize),m=j(u,i,{view:this.view.type,scale:this.view.scale,shape:o.type==="simple-marker"?o.style:null})),this.highlightGraphics.includes(i)&&(i.symbol=new ye({style:"square",size:m,xoffset:"xoffset"in o?o.xoffset:0,yoffset:"yoffset"in o?o.yoffset:0}),i.visible=!0,this.highlightGraphicUpdated(i,"symbol"))})}}async _updateHighlightedFeaturesGeometries(t){this._highlightGeometriesResolution=t;const i=this.highlightGraphics;if(!i.length||!this.layer.capabilities.operations.supportsQuery)return;const s=this._getTargetResolution(t),o=new Map;for(const a of i)if(!this._featuresResolutions.has(a)||this._featuresResolutions.get(a)>s){const l=a.sourceLayer;me(o,l,()=>new Map).set(a.getObjectId(),a)}const m=Array.from(o,([a,l])=>{const p=a.createQuery();return p.objectIds=[...l.keys()],p.outFields=[a.objectIdField],p.returnGeometry=!0,p.maxAllowableOffset=s,p.outSpatialReference=this.view.spatialReference,a.queryFeatures(p)}),u=await Promise.all(m);if(!this.destroyed)for(const{features:a}of u)for(const l of a){const p=l.sourceLayer,y=o.get(p).get(l.getObjectId());y&&this.highlightGraphics.includes(y)&&(y.geometry=l.geometry,this.highlightGraphicUpdated(y,"geometry"),this._featuresResolutions.set(y,s))}}_getTargetResolution(t){const i=t*de(this.view.spatialReference),s=i/16;return s<=10?0:t/i*s}async _fetchPopupFeaturesUsingIdentify(t,i){const s=await this._createIdentifyParameters(t,i);if(ce(s))return[];const{results:o}=await qe(this.layer.parsedUrl,s);return o.map(m=>m.feature)}async _createIdentifyParameters(t,i){const{floors:s,spatialReference:o,scale:m}=this.view,u=P(i)?i.event:null,a=await this._collectPopupProviders(this.layer.sublayers,m,i);if(!a.length)return null;await Promise.all(a.map(({sublayer:b})=>b.load().catch(()=>{})));const l=Math.min(fe("mapimagelayer-popup-identify-max-tolerance"),this.layer.allSublayers.reduce((b,$)=>$.renderer?T({renderer:$.renderer,event:u}):b,2)),p=this.createFetchPopupFeaturesQueryGeometry(t,l),y=Fe(m,o),g=Math.round(p.width/y),_=new L({xmin:p.center.x-y*g,ymin:p.center.y-y*g,xmax:p.center.x+y*g,ymax:p.center.y+y*g,spatialReference:p.spatialReference});return new J({floors:s,gdbVersion:this.layer.gdbVersion,geometry:t,height:g,layerOption:"popup",mapExtent:_,returnGeometry:!0,spatialReference:o,sublayers:this.layer.sublayers,timeExtent:this.timeExtent,tolerance:l,width:g})}async _fetchPopupFeaturesUsingQueries(t,i){const s=await this._collectPopupProviders(this.layer.sublayers,this.view.scale,i),o=P(i)?i.event:null,m=s.map(async({sublayer:u,popupTemplate:a})=>{var E,w;await u.load().catch(()=>{});const l=u.createQuery(),p=T({renderer:u.renderer,event:o}),y=this.createFetchPopupFeaturesQueryGeometry(t,p);if(l.geometry=y,l.outFields=await Ue(u,a),l.timeExtent=this.timeExtent,"floors"in this.view){const f=(w=(E=this.view)==null?void 0:E.floors)==null?void 0:w.clone(),v=U(f,u);P(v)&&(l.where=l.where?`(${l.where}) AND (${v})`:v)}const g=this._getTargetResolution(y.width/p),_=await this._loadArcadeModules(a),b=u.geometryType==="point"||_&&_.arcadeUtils.hasGeometryOperations(a);b||(l.maxAllowableOffset=g);const{features:$}=await u.queryFeatures(l),c=b?0:g;for(const f of $)this._featuresResolutions.set(f,c);return $});return(await ge(m)).reverse().reduce((u,a)=>a.value?[...u,...a.value]:u,[]).filter(u=>u!=null)}async _collectPopupProviders(t,i,s){const o=[],m=async a=>{const l=a.minScale===0||i<=a.minScale,p=a.maxScale===0||i>=a.maxScale;if(a.visible&&l&&p){if(a.sublayers)a.sublayers.forEach(m);else if(a.popupEnabled){const y=Ve(a,{...s,defaultPopupTemplateEnabled:!1});P(y)&&o.unshift({sublayer:a,popupTemplate:y})}}},u=t.toArray().reverse().map(m);return await Promise.all(u),o}_loadArcadeModules(t){var i;if(((i=t.expressionInfos)==null?void 0:i.length)||Array.isArray(t.content)&&t.content.some(s=>s.type==="expression"))return we()}};return n([h()],e.prototype,"highlightGraphics",void 0),n([h()],e.prototype,"exportImageParameters",void 0),n([h({readOnly:!0})],e.prototype,"exportImageVersion",null),n([h()],e.prototype,"layer",void 0),n([h()],e.prototype,"suspended",void 0),n([h(ne)],e.prototype,"timeExtent",void 0),e=n([F("esri.views.layers.MapImageLayerView")],e),e};let R=class extends He(Ge(_e(Ie))){update(r){this.strategy.update(r).catch(e=>{ve(e)||xe.getLogger(this.declaredClass).error(e)}),r.stationary&&this.updateHighlightedFeatures(r.state.resolution),this._highlightView.processUpdate(r)}attach(){const{imageMaxWidth:r,imageMaxHeight:e,version:t}=this.layer,i=t>=10.3,s=t>=10;this._bitmapContainer=new $e,this.container.addChild(this._bitmapContainer),this._highlightView=new Ee({view:this.view,graphics:this.highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new Se(this.view.featuresTilingScheme)}),this.container.addChild(this._highlightView.container),this.strategy=new Pe({container:this._bitmapContainer,fetchSource:this.fetchImageBitmap.bind(this),requestUpdate:this.requestUpdate.bind(this),imageMaxWidth:r,imageMaxHeight:e,imageRotationSupported:i,imageNormalizationSupported:s,hidpi:!0}),this.handles.add(A(()=>this.exportImageVersion,()=>this.requestUpdate()),"exportImageVersion"),this.handles.add(A(()=>{var o;return(o=this.view)==null?void 0:o.floors},()=>this.requestUpdate()),"view.floors"),this.requestUpdate()}detach(){this.handles.remove("exportImageVersion"),this.handles.remove("view.floors"),this.strategy.destroy(),this.container.removeAllChildren(),this._bitmapContainer.removeAllChildren(),this._highlightView.destroy()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}highlight(r){let e=null;if(r instanceof O?e=[r]:be.isCollection(r)&&r.length>0?e=r.toArray():Array.isArray(r)&&r.length>0&&(e=r),e=e==null?void 0:e.filter(Boolean),!e||!e.length)return{remove:()=>{}};for(const t of e)"geometryType"in t.sourceLayer&&t.sourceLayer.geometryType==="point"&&(t.visible=!1);return this.highlightGraphics.addMany(e),{remove:()=>{this.highlightGraphics.removeMany(e)}}}supportsSpatialReference(r){return this.layer.serviceSupportsSpatialReference(r)}createFetchPopupFeaturesQueryGeometry(r,e){return Ne(r,e,this.view)}async doRefresh(){this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}highlightGraphicUpdated(r,e){this._highlightView.graphicUpdateHandler({graphic:r,property:e})}fetchImage(r,e,t,i){return this.layer.fetchImage(r,e,t,{timeExtent:this.timeExtent,floors:this.view.floors,...i})}fetchImageBitmap(r,e,t,i){return this.layer.fetchImageBitmap(r,e,t,{timeExtent:this.timeExtent,floors:this.view.floors,...i})}};n([h()],R.prototype,"strategy",void 0),n([h()],R.prototype,"updating",void 0),R=n([F("esri.views.2d.layers.MapImageLayerView2D")],R);const Ht=R;export{Ht as default};