"use strict";(self.webpackChunkmain=self.webpackChunkmain||[]).push([[8592],{153:(A,O,n)=>{n.d(O,{x:()=>U});var g=n(9085),e=n(2223),f=n(3144),_=n(2980),l=n(8572),p=n(5775),o=n(4755),h=n(9401),C=n(1299),y=n(1217),S=n(1728),E=n(9114),D=n(8097),L=n(787);const T=["orderInput"];function M(d,s){if(1&d){const a=e.EpF();e.TgZ(0,"mat-option",19),e.NdJ("click",function(){const i=e.CHM(a).$implicit,c=e.oxw();return e.KtG(c.orderOption(i))}),e._uU(1),e.qZA()}if(2&d){const a=s.$implicit;e.Q6J("value",a),e.xp6(1),e.HOy("",a.data.orderId," / ",a.data.clientName?a.data.clientName:a.data.company," / ",a.data.startDate," / ",a.data.place,"")}}let U=(()=>{class d{constructor(a,t,r,i,c){this.http=a,this.authenticationService=t,this.orderDataService=r,this.router=i,this.ocultarSidebarService=c,this.orders=[],this.foundOrder=null,this.shouldReload=!1,this.router.events.subscribe(v=>{v instanceof g.m2&&this.shouldReload&&(window.location.reload(),this.shouldReload=!1)})}ngOnInit(){this.ocultarSidebarService.ocultarSidebar(),this.data=this.authenticationService.getData();const a=localStorage.getItem("currentUserData");a?this.data=JSON.parse(a):(this.data=this.authenticationService.getData(),localStorage.setItem("currentUserData",JSON.stringify(this.data))),console.log("Datos en storedUserData desde el SearchOrder: ",a),"Client"==this.data.role||("Administrator"==this.data.role||"Executive"==this.data.role?(this.getOrders(),this.getSearchOrders()):"Supervisor"==this.data.role?(console.log("thiis.data",this.data),this.getOrderByIdUser(this.data.email,this.data.hkId)):"Employee"==this.data.role&&(this.getOrderByIdUser(this.data.email,this.data.hkId),console.log("Orden por usuario: ",this.getOrderByIdUser(this.data.email,this.data.hkId)))),console.log("Datos usuario: ",this.data)}getOrders(){fetch("https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrders").then(a=>a.json()).then(a=>{this.orders=a,this.orders.sort((t,r)=>r.data.ordNum-t.data.ordNum)}).catch(a=>{console.log(a)})}getOrderByIdUser(a,t){t?fetch(`https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByEmployee?hkId=${t}`).then(r=>r.json()).then(r=>{console.log("Datos de la orden por usuario con highKey: ",r),this.orders=r,this.orders.sort((i,c)=>c.data.ordNum-i.data.ordNum)}).catch(r=>{console.log(r)}):a&&fetch(`https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByEmployee?email=${a}`).then(r=>r.json()).then(r=>{console.log("Datos de la orden por usuario por email: ",r),this.orders=r,this.orders.sort((i,c)=>c.data.ordNum-i.data.ordNum)}).catch(r=>{console.log(r)})}orderOption(a){this.selectedOrder=a,this.orderDataService.setSelectedOrder(a)}onOrderSelection(a){this.selectedOrder=a}navegar(){"Administrator"===this.data.role?this.router.navigate(["/admin/dashboard-lm/"]):"Employee"===this.data.role&&this.router.navigate(["/admin/employees/admin-employees/"]),this.shouldReload=!0}getSearchOrders(){this.http.get("https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrders").subscribe(t=>{this.ordenes=t})}searchOrder(){let a=this.orderNumber;a=a.replace(/-/g,""),a.length>=4&&(a=a.substring(0,4)+"-"+a.substring(4)),this.orderNumber=a,this.foundOrder=null;for(const t of this.ordenes)if(t.data.orderId===this.orderNumber){this.foundOrder=t;break}this.foundOrder?this.orderDataService.setSelectedOrder(this.foundOrder):console.log("No se encontr\xf3 ning\xfan objeto con el orderId especificado.")}}return d.\u0275fac=function(a){return new(a||d)(e.Y36(f.eN),e.Y36(_.$),e.Y36(l.U),e.Y36(g.F0),e.Y36(p.S))},d.\u0275cmp=e.Xpm({type:d,selectors:[["app-search-order"]],viewQuery:function(a,t){if(1&a&&e.Gf(T,5),2&a){let r;e.iGM(r=e.CRH())&&(t.orderInput=r.first)}},decls:31,vars:6,consts:[[1,"content"],[1,"container","marginContainer",2,"margin-left","10px"],[1,"block-header",2,"margin-top","70px"],[3,"title","active_item"],[1,"row",2,"margin-top","130px"],[1,"col-sm-12","col-md-7","col-lg-7"],[1,"form-label"],[2,"display","inline"],[3,"value","valueChange","selectionChange"],[3,"value","click",4,"ngFor","ngForOf"],[1,"row"],[1,"col-sm-12","col-md-6"],[1,"col-sm-12","col-md-6","col-lg-6",2,"display","inline-flex","width","30%"],["matInput","",3,"ngModel","ngModelChange"],["orderInput",""],["mat-raised-button","","color","primary",3,"disabled","click"],[1,"ocultarImg","col-md-5","col-lg-5",2,"text-align","center"],["src","assets/images/search-order.png","alt","",2,"height","300px"],[2,"color","#414244"],[3,"value","click"]],template:function(a,t){1&a&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2),e._UZ(3,"app-breadcrumb",3),e.qZA(),e.TgZ(4,"div",4)(5,"div",5)(6,"div")(7,"label",6),e._uU(8,"List of orders"),e.qZA()(),e.TgZ(9,"mat-form-field",7)(10,"mat-label"),e._uU(11,"Select"),e.qZA(),e.TgZ(12,"mat-select",8),e.NdJ("valueChange",function(i){return t.selectedOrder=i})("selectionChange",function(i){return t.onOrderSelection(i.value)}),e.YNc(13,M,2,5,"mat-option",9),e.qZA()(),e.TgZ(14,"div",10)(15,"div",11)(16,"label",6),e._uU(17,"Order number"),e.qZA()(),e.TgZ(18,"div")(19,"mat-form-field",12)(20,"mat-label"),e._uU(21,"Input"),e.qZA(),e.TgZ(22,"input",13,14),e.NdJ("ngModelChange",function(i){return t.orderNumber=i})("ngModelChange",function(){return t.searchOrder()}),e.qZA()()()(),e.TgZ(24,"div")(25,"button",15),e.NdJ("click",function(){return t.navegar()}),e._uU(26,"Search"),e.qZA()()(),e.TgZ(27,"div",16),e._UZ(28,"img",17),e.qZA(),e.TgZ(29,"p",18),e._uU(30,"You will only be able to view the open orders in which you are a supervisor."),e.qZA()()()()),2&a&&(e.xp6(3),e.Q6J("title","Search Order")("active_item","Search order"),e.xp6(9),e.Q6J("value",t.selectedOrder),e.xp6(1),e.Q6J("ngForOf",t.orders),e.xp6(9),e.Q6J("ngModel",t.orderNumber),e.xp6(3),e.Q6J("disabled",!(t.selectedOrder||t.foundOrder)))},dependencies:[o.sg,h.Fj,h.JJ,h.On,C.L,y.ey,S.lW,E.KE,E.hX,D.Nt,L.gD],styles:['@charset "UTF-8";.label-form[_ngcontent-%COMP%]{font-size:20px}@media (max-width: 576px){.ocultarImg[_ngcontent-%COMP%]{display:none}.marginContainer[_ngcontent-%COMP%]{margin-left:20px!important;padding-left:5px!important;padding-right:5px!important;width:90%}}']}),d})()},7082:(A,O,n)=>{n.d(O,{Y:()=>_});var g=n(9401),e=n(2223),f=n(1728);let _=(()=>{class l{emitFiles(o){const h=o&&o.item(0);this.onChange(h),this.file=h}constructor(o){this.host=o,this.file=null}writeValue(o){this.host.nativeElement.value="",this.file=null}registerOnChange(o){this.onChange=o}registerOnTouched(o){}}return l.\u0275fac=function(o){return new(o||l)(e.Y36(e.SBq))},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-file-upload"]],hostBindings:function(o,h){1&o&&e.NdJ("change",function(y){return h.emitFiles(y.target.files)})},features:[e._Bn([{provide:g.JU,useExisting:l,multi:!0}])],decls:6,vars:1,consts:[[1,"file-drop-area"],["mat-raised-button","","color","primary"],["type","file",1,"file-input"]],template:function(o,h){1&o&&(e.TgZ(0,"div",0)(1,"button",1),e._uU(2,"Choose file"),e.qZA(),e.TgZ(3,"span"),e._uU(4),e.qZA(),e._UZ(5,"input",2),e.qZA()),2&o&&(e.xp6(4),e.Oqu(h.file?h.file.name:" or drag and drop file here"))},dependencies:[f.lW],styles:[".file-drop-area[_ngcontent-%COMP%]{border:1px dashed #7c7db3;border-radius:3px;position:relative;max-width:100%;margin-top:5px;padding:26px 20px 30px;transition:.2s}.file-input[_ngcontent-%COMP%]{position:absolute;left:0;top:0;height:100%;width:100%;cursor:pointer;opacity:0}.file-msg[_ngcontent-%COMP%]{display:inline-block;margin-left:5px;font-size:12px;font-weight:500;color:#5b5bff}"]}),l})()},2054:(A,O,n)=>{n.d(O,{_w:()=>U,Ns:()=>d});var g=n(5861),e=n(2223),f=n(4707),_=n(727),l=n(7579),p=n(4986),o=n(9751),h=n(4482),C=n(5403),y=n(8421),E=n(5963);var L=n(3900);class T{constructor(){this.subject=new f.t(1),this.subscriptions=new _.w0}doFilter(a){this.subject.next(a)}dispose(){this.subscriptions.unsubscribe()}notEmpty(a,t){this.subscriptions.add(this.subject.subscribe(r=>{if(r[a]){const i=r[a].currentValue;null!=i&&t(i)}}))}has(a,t){this.subscriptions.add(this.subject.subscribe(r=>{r[a]&&t(r[a].currentValue)}))}notFirst(a,t){this.subscriptions.add(this.subject.subscribe(r=>{r[a]&&!r[a].isFirstChange()&&t(r[a].currentValue)}))}notFirstAndEmpty(a,t){this.subscriptions.add(this.subject.subscribe(r=>{if(r[a]&&!r[a].isFirstChange()){const i=r[a].currentValue;null!=i&&t(i)}}))}}const M=new e.OlP("NGX_ECHARTS_CONFIG");let U=(()=>{class s{constructor(t,r,i){this.el=r,this.ngZone=i,this.options=null,this.theme=null,this.initOpts=null,this.merge=null,this.autoResize=!0,this.loading=!1,this.loadingType="default",this.loadingOpts=null,this.chartInit=new e.vpe,this.optionsError=new e.vpe,this.chartClick=this.createLazyEvent("click"),this.chartDblClick=this.createLazyEvent("dblclick"),this.chartMouseDown=this.createLazyEvent("mousedown"),this.chartMouseMove=this.createLazyEvent("mousemove"),this.chartMouseUp=this.createLazyEvent("mouseup"),this.chartMouseOver=this.createLazyEvent("mouseover"),this.chartMouseOut=this.createLazyEvent("mouseout"),this.chartGlobalOut=this.createLazyEvent("globalout"),this.chartContextMenu=this.createLazyEvent("contextmenu"),this.chartLegendSelectChanged=this.createLazyEvent("legendselectchanged"),this.chartLegendSelected=this.createLazyEvent("legendselected"),this.chartLegendUnselected=this.createLazyEvent("legendunselected"),this.chartLegendScroll=this.createLazyEvent("legendscroll"),this.chartDataZoom=this.createLazyEvent("datazoom"),this.chartDataRangeSelected=this.createLazyEvent("datarangeselected"),this.chartTimelineChanged=this.createLazyEvent("timelinechanged"),this.chartTimelinePlayChanged=this.createLazyEvent("timelineplaychanged"),this.chartRestore=this.createLazyEvent("restore"),this.chartDataViewChanged=this.createLazyEvent("dataviewchanged"),this.chartMagicTypeChanged=this.createLazyEvent("magictypechanged"),this.chartPieSelectChanged=this.createLazyEvent("pieselectchanged"),this.chartPieSelected=this.createLazyEvent("pieselected"),this.chartPieUnselected=this.createLazyEvent("pieunselected"),this.chartMapSelectChanged=this.createLazyEvent("mapselectchanged"),this.chartMapSelected=this.createLazyEvent("mapselected"),this.chartMapUnselected=this.createLazyEvent("mapunselected"),this.chartAxisAreaSelected=this.createLazyEvent("axisareaselected"),this.chartFocusNodeAdjacency=this.createLazyEvent("focusnodeadjacency"),this.chartUnfocusNodeAdjacency=this.createLazyEvent("unfocusnodeadjacency"),this.chartBrush=this.createLazyEvent("brush"),this.chartBrushEnd=this.createLazyEvent("brushend"),this.chartBrushSelected=this.createLazyEvent("brushselected"),this.chartRendered=this.createLazyEvent("rendered"),this.chartFinished=this.createLazyEvent("finished"),this.animationFrameID=null,this.chart$=new f.t(1),this.resize$=new l.x,this.changeFilter=new T,this.echarts=t.echarts}ngOnChanges(t){this.changeFilter.doFilter(t)}ngOnInit(){if(!window.ResizeObserver)throw new Error("please install a polyfill for ResizeObserver");this.resizeSub=this.resize$.pipe(function D(s,a=p.z,t){const r=(0,E.H)(s,a);return function S(s,a){return(0,h.e)((t,r)=>{const{leading:i=!0,trailing:c=!1}=a??{};let v=!1,z=null,u=null,b=!1;const I=()=>{u?.unsubscribe(),u=null,c&&(F(),b&&r.complete())},x=()=>{u=null,b&&r.complete()},P=m=>u=(0,y.Xf)(s(m)).subscribe((0,C.x)(r,I,x)),F=()=>{if(v){v=!1;const m=z;z=null,r.next(m),!b&&P(m)}};t.subscribe((0,C.x)(r,m=>{v=!0,z=m,(!u||u.closed)&&(i?F():P(m))},()=>{b=!0,(!(c&&v&&u)||u.closed)&&r.complete()}))})}(()=>r,t)}(100,p.z,{leading:!1,trailing:!0})).subscribe(()=>this.resize()),this.autoResize&&(this.resizeOb=this.ngZone.runOutsideAngular(()=>new window.ResizeObserver(()=>{this.animationFrameID=window.requestAnimationFrame(()=>this.resize$.next())})),this.resizeOb.observe(this.el.nativeElement)),this.changeFilter.notFirstAndEmpty("options",t=>this.onOptionsChange(t)),this.changeFilter.notFirstAndEmpty("merge",t=>this.setOption(t)),this.changeFilter.has("loading",t=>this.toggleLoading(!!t)),this.changeFilter.notFirst("theme",()=>this.refreshChart())}ngOnDestroy(){window.clearTimeout(this.initChartTimer),this.resizeSub&&this.resizeSub.unsubscribe(),this.animationFrameID&&window.cancelAnimationFrame(this.animationFrameID),this.resizeOb&&this.resizeOb.unobserve(this.el.nativeElement),this.loadingSub&&this.loadingSub.unsubscribe(),this.changeFilter.dispose(),this.dispose()}ngAfterViewInit(){this.initChartTimer=window.setTimeout(()=>this.initChart())}dispose(){this.chart&&(this.chart.isDisposed()||this.chart.dispose(),this.chart=null)}resize(){this.chart&&this.chart.resize()}toggleLoading(t){this.chart?t?this.chart.showLoading(this.loadingType,this.loadingOpts):this.chart.hideLoading():this.loadingSub=this.chart$.subscribe(r=>t?r.showLoading(this.loadingType,this.loadingOpts):r.hideLoading())}setOption(t,r){if(this.chart)try{this.chart.setOption(t,r)}catch(i){console.error(i),this.optionsError.emit(i)}}refreshChart(){var t=this;return(0,g.Z)(function*(){t.dispose(),yield t.initChart()})()}createChart(){const t=this.el.nativeElement;if(window&&window.getComputedStyle){const r=window.getComputedStyle(t,null).getPropertyValue("height");(!r||"0px"===r)&&(!t.style.height||"0px"===t.style.height)&&(t.style.height="400px")}return this.ngZone.runOutsideAngular(()=>("function"==typeof this.echarts?this.echarts:()=>Promise.resolve(this.echarts))().then(({init:i})=>i(t,this.theme,this.initOpts)))}initChart(){var t=this;return(0,g.Z)(function*(){yield t.onOptionsChange(t.options),t.merge&&t.chart&&t.setOption(t.merge)})()}onOptionsChange(t){var r=this;return(0,g.Z)(function*(){t&&(r.chart||(r.chart=yield r.createChart(),r.chart$.next(r.chart),r.chartInit.emit(r.chart)),r.setOption(r.options,!0))})()}createLazyEvent(t){return this.chartInit.pipe((0,L.w)(r=>new o.y(i=>(r.on(t,c=>this.ngZone.run(()=>i.next(c))),()=>{this.chart&&(this.chart.isDisposed()||r.off(t))}))))}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(M),e.Y36(e.SBq),e.Y36(e.R0b))},s.\u0275dir=e.lG2({type:s,selectors:[["echarts"],["","echarts",""]],inputs:{options:"options",theme:"theme",initOpts:"initOpts",merge:"merge",autoResize:"autoResize",loading:"loading",loadingType:"loadingType",loadingOpts:"loadingOpts"},outputs:{chartInit:"chartInit",optionsError:"optionsError",chartClick:"chartClick",chartDblClick:"chartDblClick",chartMouseDown:"chartMouseDown",chartMouseMove:"chartMouseMove",chartMouseUp:"chartMouseUp",chartMouseOver:"chartMouseOver",chartMouseOut:"chartMouseOut",chartGlobalOut:"chartGlobalOut",chartContextMenu:"chartContextMenu",chartLegendSelectChanged:"chartLegendSelectChanged",chartLegendSelected:"chartLegendSelected",chartLegendUnselected:"chartLegendUnselected",chartLegendScroll:"chartLegendScroll",chartDataZoom:"chartDataZoom",chartDataRangeSelected:"chartDataRangeSelected",chartTimelineChanged:"chartTimelineChanged",chartTimelinePlayChanged:"chartTimelinePlayChanged",chartRestore:"chartRestore",chartDataViewChanged:"chartDataViewChanged",chartMagicTypeChanged:"chartMagicTypeChanged",chartPieSelectChanged:"chartPieSelectChanged",chartPieSelected:"chartPieSelected",chartPieUnselected:"chartPieUnselected",chartMapSelectChanged:"chartMapSelectChanged",chartMapSelected:"chartMapSelected",chartMapUnselected:"chartMapUnselected",chartAxisAreaSelected:"chartAxisAreaSelected",chartFocusNodeAdjacency:"chartFocusNodeAdjacency",chartUnfocusNodeAdjacency:"chartUnfocusNodeAdjacency",chartBrush:"chartBrush",chartBrushEnd:"chartBrushEnd",chartBrushSelected:"chartBrushSelected",chartRendered:"chartRendered",chartFinished:"chartFinished"},exportAs:["echarts"],features:[e.TTD]}),s})(),d=(()=>{class s{static forRoot(t){return{ngModule:s,providers:[{provide:M,useValue:t}]}}static forChild(){return{ngModule:s}}}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({}),s})()}}]);