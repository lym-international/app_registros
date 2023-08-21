"use strict";(self.webpackChunkmain=self.webpackChunkmain||[]).push([[5657],{5657:(N,C,r)=>{r.r(C),r.d(C,{LeadsModule:()=>we});var c=r(4755),d=r(9401),T=r(5626),_=r(8629),Z=r(9085),x=r(1135),u=r(9186),e=r(2223),h=r(3144);let f=(()=>{class a extends u.n{constructor(t){super(),this.httpClient=t,this.API_URL="assets/data/leads.json",this.isTblLoading=!0,this.dataChange=new x.X([])}get data(){return this.dataChange.value}getDialogData(){return this.dialogData}getAllLeadss(){this.subs.sink=this.httpClient.get(this.API_URL).subscribe({next:t=>{this.isTblLoading=!1,this.dataChange.next(t)},error:t=>{this.isTblLoading=!1,console.log(t.name+" "+t.message)}})}addLeads(t){this.dialogData=t}updateLeads(t){this.dialogData=t}deleteLeads(t){console.log(t)}}return a.\u0275fac=function(t){return new(t||a)(e.LFG(h.eN))},a.\u0275prov=e.Yz7({token:a,factory:a.\u0275fac}),a})();var M=r(3276),L=r(2611),q=r(418),b=r(7406),S=r(4968),E=r(6451),J=r(4004),p=r(6286);class R{constructor(i){this.id=i.id||this.getRandomID(),this.img=i.img||"assets/images/user/user1.jpg",this.name=i.name||"",this.email=i.email||"",this.role=i.role||"",this.mobile=i.mobile||"",this.department=i.department||"",this.project=i.project||""}getRandomID(){const i=()=>65536*(1+Math.random())|0;return i()+i()}}var v=r(1728),D=r(9114),w=r(430),F=r(8097);function y(a,i){1&a&&(e.TgZ(0,"mat-error"),e._uU(1," Name is required "),e.qZA())}function I(a,i){1&a&&(e.TgZ(0,"mat-error"),e._uU(1," Department is required "),e.qZA())}function Y(a,i){1&a&&(e.TgZ(0,"mat-error"),e._uU(1," role is required "),e.qZA())}function Q(a,i){1&a&&(e.TgZ(0,"mat-error"),e._uU(1," Department is required "),e.qZA())}function O(a,i){1&a&&(e.TgZ(0,"mat-error"),e._uU(1," Mobile is required "),e.qZA())}function H(a,i){1&a&&(e.TgZ(0,"mat-error"),e._uU(1," Please enter a valid email address "),e.qZA())}let k=(()=>{class a{constructor(t,o,n,l){this.dialogRef=t,this.data=o,this.leadsService=n,this.fb=l,this.formControl=new d.p4("",[d.kI.required]),this.action=o.action,"edit"===this.action?(this.dialogTitle=o.leads.name,this.leads=o.leads):(this.dialogTitle="New Leads",this.leads=new R({})),this.leadsForm=this.createContactForm()}getErrorMessage(){return this.formControl.hasError("required")?"Required field":this.formControl.hasError("email")?"Not a valid email":""}createContactForm(){return this.fb.group({id:[this.leads.id],img:[this.leads.img],name:[this.leads.name],email:[this.leads.email],role:[this.leads.role],mobile:[this.leads.mobile],department:[this.leads.department],project:[this.leads.project]})}submit(){}onNoClick(){this.dialogRef.close()}confirmAdd(){this.leadsService.addLeads(this.leadsForm.getRawValue())}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(p.so),e.Y36(p.WI),e.Y36(f),e.Y36(d.QS))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-form-dialog",5,"i"]],decls:70,vars:11,consts:[[1,"addContainer"],[1,"modalHeader"],[1,"editRowModal"],[1,"modalHeader","clearfix"],["alt","avatar",3,"src"],[1,"modal-about"],["mat-icon-button","","aria-label","Close dialog",1,"modal-close-button",3,"click"],["mat-dialog-content",""],[1,"register-form","m-4",3,"formGroup","ngSubmit"],[1,"row"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12","mb-2"],["appearance","outline",1,"example-full-width"],["matInput","","formControlName","name","required",""],["matSuffix","",1,"material-icons-two-tone","color-icon","p-3"],[4,"ngIf"],["matInput","","formControlName","department","required",""],["matInput","","formControlName","role","required",""],["matInput","","formControlName","project","required",""],["matInput","","formControlName","mobile","type","number"],["matInput","","formControlName","email","required",""],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],["align","end",1,"example-button-row"],["mat-raised-button","","color","primary",3,"disabled","mat-dialog-close","click"],["mat-raised-button","","color","warn","tabindex","-1",3,"click"]],template:function(t,o){if(1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),e._UZ(4,"img",4),e.TgZ(5,"div",5),e._uU(6),e.qZA()()(),e.TgZ(7,"button",6),e.NdJ("click",function(){return o.dialogRef.close()}),e.TgZ(8,"mat-icon"),e._uU(9,"close"),e.qZA()()(),e.TgZ(10,"div",7)(11,"form",8),e.NdJ("ngSubmit",function(){return o.submit}),e.TgZ(12,"div",9)(13,"div",10)(14,"mat-form-field",11)(15,"mat-label"),e._uU(16,"Name"),e.qZA(),e._UZ(17,"input",12),e.TgZ(18,"mat-icon",13),e._uU(19,"face"),e.qZA(),e.YNc(20,y,2,0,"mat-error",14),e.qZA()(),e.TgZ(21,"div",10)(22,"mat-form-field",11)(23,"mat-label"),e._uU(24,"department"),e.qZA(),e._UZ(25,"input",15),e.TgZ(26,"mat-icon",13),e._uU(27,"business_center"),e.qZA(),e.YNc(28,I,2,0,"mat-error",14),e.qZA()()(),e.TgZ(29,"div",9)(30,"div",10)(31,"mat-form-field",11)(32,"mat-label"),e._uU(33,"role"),e.qZA(),e._UZ(34,"input",16),e.TgZ(35,"mat-icon",13),e._uU(36,"flag"),e.qZA(),e.YNc(37,Y,2,0,"mat-error",14),e.qZA()(),e.TgZ(38,"div",10)(39,"mat-form-field",11)(40,"mat-label"),e._uU(41,"Project"),e.qZA(),e._UZ(42,"input",17),e.TgZ(43,"mat-icon",13),e._uU(44,"content_paste_search"),e.qZA(),e.YNc(45,Q,2,0,"mat-error",14),e.qZA()()(),e.TgZ(46,"div",9)(47,"div",10)(48,"mat-form-field",11)(49,"mat-label"),e._uU(50,"Mobile"),e.qZA(),e._UZ(51,"input",18),e.TgZ(52,"mat-icon",13),e._uU(53,"phone"),e.qZA(),e.YNc(54,O,2,0,"mat-error",14),e.qZA()(),e.TgZ(55,"div",10)(56,"mat-form-field",11)(57,"mat-label"),e._uU(58,"Email"),e.qZA(),e._UZ(59,"input",19),e.TgZ(60,"mat-icon",13),e._uU(61,"email"),e.qZA(),e.YNc(62,H,2,0,"mat-error",14),e.qZA()()(),e.TgZ(63,"div",9)(64,"div",20)(65,"div",21)(66,"button",22),e.NdJ("click",function(){return o.confirmAdd()}),e._uU(67,"Save"),e.qZA(),e.TgZ(68,"button",23),e.NdJ("click",function(){return o.onNoClick()}),e._uU(69,"Cancel"),e.qZA()()()()()()()),2&t){let n,l,s,m,A,U;e.xp6(4),e.Q6J("src",o.leads.img,e.LSH),e.xp6(2),e.hij(" ",o.dialogTitle," "),e.xp6(5),e.Q6J("formGroup",o.leadsForm),e.xp6(9),e.Q6J("ngIf",null==(n=o.leadsForm.get("name"))?null:n.hasError("required")),e.xp6(8),e.Q6J("ngIf",null==(l=o.leadsForm.get("department"))?null:l.hasError("required")),e.xp6(9),e.Q6J("ngIf",null==(s=o.leadsForm.get("role"))?null:s.hasError("required")),e.xp6(8),e.Q6J("ngIf",null==(m=o.leadsForm.get("project"))?null:m.hasError("required")),e.xp6(9),e.Q6J("ngIf",null==(A=o.leadsForm.get("mobile"))?null:A.hasError("required")),e.xp6(8),e.Q6J("ngIf",(null==(U=o.leadsForm.get("email"))?null:U.hasError("required"))||(null==(U=o.leadsForm.get("email"))?null:U.touched)),e.xp6(4),e.Q6J("disabled",!o.leadsForm.valid)("mat-dialog-close",1)}},dependencies:[c.O5,d._Y,d.Fj,d.wV,d.JJ,d.JL,d.Q7,d.sg,d.u,v.lW,v.RK,p.ZT,p.xY,D.KE,D.hX,D.TO,D.R9,w.Hw,F.Nt]}),a})(),B=(()=>{class a{constructor(t,o,n){this.dialogRef=t,this.data=o,this.leadsService=n}onNoClick(){this.dialogRef.close()}confirmDelete(){this.leadsService.deleteLeads(this.data.id)}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(p.so),e.Y36(p.WI),e.Y36(f))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-delete",5,"j"]],decls:25,vars:4,consts:[[1,"container"],["mat-dialog-title",""],["mat-dialog-content",""],[1,"clearfix"],[1,"font-weight-bold"],["mat-dialog-actions","",1,"mb-1"],["mat-flat-button","","color","warn",3,"mat-dialog-close","click"],["mat-flat-button","","tabindex","-1",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"h3",1),e._uU(2,"Are you sure?"),e.qZA(),e.TgZ(3,"div",2)(4,"ul",3)(5,"li")(6,"p")(7,"span",4),e._uU(8," Name: "),e.qZA(),e._uU(9),e.qZA()(),e.TgZ(10,"li")(11,"p")(12,"span",4),e._uU(13," Department: "),e.qZA(),e._uU(14),e.qZA()(),e.TgZ(15,"li")(16,"p")(17,"span",4),e._uU(18,"Mobile: "),e.qZA(),e._uU(19),e.qZA()()()(),e.TgZ(20,"div",5)(21,"button",6),e.NdJ("click",function(){return o.confirmDelete()}),e._uU(22," Delete "),e.qZA(),e.TgZ(23,"button",7),e.NdJ("click",function(){return o.onNoClick()}),e._uU(24,"Cancel"),e.qZA()()()),2&t&&(e.xp6(9),e.Oqu(o.data.name),e.xp6(5),e.Oqu(o.data.department),e.xp6(5),e.hij("",o.data.mobile," "),e.xp6(2),e.Q6J("mat-dialog-close",1))},dependencies:[v.lW,p.ZT,p.uh,p.xY,p.H8]}),a})();var P=r(6035),j=r(2342),G=r(1299),K=r(1292),$=r(8467),z=r(1217),g=r(3627),W=r(3649),X=r(1676);const V=["filter"];function ee(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"mat-header-cell",61)(1,"mat-checkbox",62),e.NdJ("change",function(n){e.CHM(t);const l=e.oxw();return e.KtG(n?l.masterToggle():null)}),e.qZA()()}if(2&a){const t=e.oxw();e.Q6J("ngClass","tbl-col-width-per-7"),e.xp6(1),e.Q6J("checked",t.selection.hasValue()&&t.isAllSelected())("indeterminate",t.selection.hasValue()&&!t.isAllSelected())("ngClass","tbl-checkbox")}}function te(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"mat-cell",61)(1,"mat-checkbox",63),e.NdJ("click",function(n){return n.stopPropagation()})("change",function(n){const s=e.CHM(t).$implicit,m=e.oxw();return e.KtG(n?m.selection.toggle(s):null)}),e.qZA()()}if(2&a){const t=i.$implicit,o=e.oxw();e.Q6J("ngClass","tbl-col-width-per-7"),e.xp6(1),e.Q6J("checked",o.selection.isSelected(t))("ngClass","tbl-checkbox")}}function ae(a,i){1&a&&(e.TgZ(0,"mat-header-cell",64),e._uU(1,"Id"),e.qZA())}function oe(a,i){if(1&a&&(e.TgZ(0,"mat-cell"),e._uU(1),e.qZA()),2&a){const t=i.$implicit;e.xp6(1),e.Oqu(t.id)}}function ne(a,i){1&a&&(e.TgZ(0,"mat-header-cell",65),e._uU(1," Image "),e.qZA()),2&a&&e.Q6J("ngClass","tbl-col-width-per-7")}function ie(a,i){if(1&a&&(e.TgZ(0,"mat-cell",66)(1,"span",67),e._uU(2,"Image:"),e.qZA(),e._UZ(3,"img",68),e.qZA()),2&a){const t=i.$implicit;e.xp6(3),e.Q6J("src",t.img,e.LSH)}}function le(a,i){1&a&&(e.TgZ(0,"mat-header-cell",64),e._uU(1,"Name"),e.qZA())}function re(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"mat-cell",69),e.NdJ("contextmenu",function(n){const s=e.CHM(t).$implicit,m=e.oxw();return e.KtG(m.onContextMenu(n,s))}),e.TgZ(1,"span",67),e._uU(2,"Name:"),e.qZA(),e._uU(3),e.qZA()}if(2&a){const t=i.$implicit;e.xp6(3),e.Oqu(t.name)}}function se(a,i){1&a&&(e.TgZ(0,"mat-header-cell",64),e._uU(1,"Department"),e.qZA())}function ce(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"mat-cell",69),e.NdJ("contextmenu",function(n){const s=e.CHM(t).$implicit,m=e.oxw();return e.KtG(m.onContextMenu(n,s))}),e.TgZ(1,"span",67),e._uU(2,"Department:"),e.qZA(),e._uU(3),e.qZA()}if(2&a){const t=i.$implicit;e.xp6(3),e.hij(" ",t.department," ")}}function me(a,i){1&a&&(e.TgZ(0,"mat-header-cell",64),e._uU(1,"Role"),e.qZA())}function de(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"mat-cell",69),e.NdJ("contextmenu",function(n){const s=e.CHM(t).$implicit,m=e.oxw();return e.KtG(m.onContextMenu(n,s))}),e.TgZ(1,"span",67),e._uU(2,"Role:"),e.qZA(),e._uU(3),e.qZA()}if(2&a){const t=i.$implicit;e.xp6(3),e.Oqu(t.role)}}function ue(a,i){1&a&&(e.TgZ(0,"mat-header-cell",64),e._uU(1,"Project"),e.qZA())}function pe(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"mat-cell",69),e.NdJ("contextmenu",function(n){const s=e.CHM(t).$implicit,m=e.oxw();return e.KtG(m.onContextMenu(n,s))}),e.TgZ(1,"span",67),e._uU(2,"Project:"),e.qZA(),e._uU(3),e.qZA()}if(2&a){const t=i.$implicit;e.xp6(3),e.Oqu(t.project)}}function _e(a,i){1&a&&(e.TgZ(0,"mat-header-cell",64),e._uU(1,"Mobile"),e.qZA())}function ge(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"mat-cell",69),e.NdJ("contextmenu",function(n){const s=e.CHM(t).$implicit,m=e.oxw();return e.KtG(m.onContextMenu(n,s))}),e.TgZ(1,"span",67),e._uU(2,"Mobile:"),e.qZA(),e._uU(3),e.qZA()}if(2&a){const t=i.$implicit;e.xp6(3),e.hij(" ",t.mobile,"")}}function he(a,i){1&a&&(e.TgZ(0,"mat-header-cell",64),e._uU(1,"Email"),e.qZA())}function fe(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"mat-cell",69),e.NdJ("contextmenu",function(n){const s=e.CHM(t).$implicit,m=e.oxw();return e.KtG(m.onContextMenu(n,s))}),e.TgZ(1,"span",67),e._uU(2,"Email:"),e.qZA(),e._uU(3),e.qZA()}if(2&a){const t=i.$implicit;e.xp6(3),e.Oqu(t.email)}}function Ce(a,i){1&a&&(e.TgZ(0,"mat-header-cell",70),e._uU(1,"Actions"),e.qZA())}function Ze(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"mat-cell",70)(1,"button",71),e.NdJ("click",function(n){return n.stopPropagation()})("click",function(){const l=e.CHM(t).$implicit,s=e.oxw();return e.KtG(s.editCall(l))}),e._UZ(2,"app-feather-icons",72),e.qZA(),e.TgZ(3,"button",73),e.NdJ("click",function(n){return n.stopPropagation()})("click",function(){const n=e.CHM(t),l=n.index,s=n.$implicit,m=e.oxw();return e.KtG(m.deleteItem(l,s))}),e._UZ(4,"app-feather-icons",72),e.qZA()()}2&a&&(e.xp6(2),e.Tol("tbl-fav-edit"),e.Q6J("icon","edit"),e.xp6(2),e.Tol("tbl-fav-delete"),e.Q6J("icon","trash-2"))}function xe(a,i){1&a&&e._UZ(0,"mat-header-row")}function Te(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"mat-row",74),e.NdJ("click",function(){const l=e.CHM(t).$implicit,s=e.oxw();return e.KtG(s.editCall(l))}),e.qZA()}2&a&&e.Udp("cursor","pointer")}function be(a,i){1&a&&(e.TgZ(0,"div",75),e._UZ(1,"mat-progress-spinner",76),e.qZA()),2&a&&(e.xp6(1),e.Q6J("diameter",40))}function ve(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"button",77),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.addNew())}),e.TgZ(1,"mat-icon"),e._uU(2,"add_box"),e.qZA(),e.TgZ(3,"span"),e._uU(4,"Add Record"),e.qZA()(),e.TgZ(5,"button",77),e.NdJ("click",function(){const l=e.CHM(t).item,s=e.oxw();return e.KtG(s.editCall(l))}),e.TgZ(6,"mat-icon"),e._uU(7,"create"),e.qZA(),e.TgZ(8,"span"),e._uU(9,"Edit Record"),e.qZA()(),e.TgZ(10,"button",77),e.NdJ("click",function(){const l=e.CHM(t).item,s=e.oxw();return e.KtG(s.deleteItem(l.id,l))}),e.TgZ(11,"mat-icon"),e._uU(12,"delete"),e.qZA(),e.TgZ(13,"span"),e._uU(14,"Delete Record"),e.qZA()(),e.TgZ(15,"button",77),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.refresh())}),e.TgZ(16,"mat-icon"),e._uU(17,"refresh"),e.qZA(),e.TgZ(18,"span"),e._uU(19,"Refresh Record"),e.qZA()(),e.TgZ(20,"button",78)(21,"mat-icon"),e._uU(22,"no_encryption"),e.qZA(),e.TgZ(23,"span"),e._uU(24,"Disable"),e.qZA()(),e.TgZ(25,"button",79)(26,"mat-icon"),e._uU(27,"list_alt"),e.qZA(),e.TgZ(28,"span"),e._uU(29," Nested Menu"),e.qZA()()}if(2&a){e.oxw();const t=e.MAs(81);e.xp6(25),e.Q6J("matMenuTriggerFor",t)}}function De(a,i){if(1&a&&(e.TgZ(0,"div",80),e._uU(1," No results "),e.qZA()),2&a){const t=e.oxw();e.Udp("display",0===t.dataSource.renderedData.length?"":"none")}}const Ae=function(){return["Leads"]},Ue=function(){return[5,10,25,100]};let Le=(()=>{class a extends u.n{constructor(t,o,n,l){super(),this.httpClient=t,this.dialog=o,this.leadsService=n,this.snackBar=l,this.displayedColumns=["select","img","name","department","role","project","mobile","email","actions"],this.selection=new q.Ov(!0,[]),this.contextMenuPosition={x:"0px",y:"0px"}}ngOnInit(){this.loadData()}refresh(){this.loadData()}addNew(){let t;t="true"===localStorage.getItem("isRtl")?"rtl":"ltr";const o=this.dialog.open(k,{data:{leads:this.leads,action:"add"},direction:t});this.subs.sink=o.afterClosed().subscribe(n=>{1===n&&(this.exampleDatabase?.dataChange.value.unshift(this.leadsService.getDialogData()),this.refreshTable(),this.showNotification("snackbar-success","Add Record Successfully...!!!","bottom","center"))})}editCall(t){let o;this.id=t.id,o="true"===localStorage.getItem("isRtl")?"rtl":"ltr";const n=this.dialog.open(k,{data:{leads:t,action:"edit"},direction:o});this.subs.sink=n.afterClosed().subscribe(l=>{if(1===l){const s=this.exampleDatabase?.dataChange.value.findIndex(m=>m.id===this.id);null!=s&&this.exampleDatabase&&(this.exampleDatabase.dataChange.value[s]=this.leadsService.getDialogData(),this.refreshTable(),this.showNotification("black","Edit Record Successfully...!!!","bottom","center"))}})}deleteItem(t,o){let n;this.index=t,this.id=o.id,n="true"===localStorage.getItem("isRtl")?"rtl":"ltr";const l=this.dialog.open(B,{height:"250px",width:"300px",data:o,direction:n});this.subs.sink=l.afterClosed().subscribe(s=>{if(1===s){const m=this.exampleDatabase?.dataChange.value.findIndex(A=>A.id===this.id);null!=m&&this.exampleDatabase&&(this.exampleDatabase.dataChange.value.splice(m,1),this.refreshTable(),this.showNotification("snackbar-danger","Delete Record Successfully...!!!","bottom","center"))}})}refreshTable(){this.paginator._changePageSize(this.paginator.pageSize)}isAllSelected(){return this.selection.selected.length===this.dataSource.renderedData.length}masterToggle(){this.isAllSelected()?this.selection.clear():this.dataSource.renderedData.forEach(t=>this.selection.select(t))}removeSelectedRows(){const t=this.selection.selected.length;this.selection.selected.forEach(o=>{const n=this.dataSource.renderedData.findIndex(l=>l===o);this.exampleDatabase?.dataChange.value.splice(n,1),this.refreshTable(),this.selection=new q.Ov(!0,[])}),this.showNotification("snackbar-danger",t+" Record Delete Successfully...!!!","bottom","center")}loadData(){this.exampleDatabase=new f(this.httpClient),this.dataSource=new qe(this.exampleDatabase,this.paginator,this.sort),this.subs.sink=(0,S.R)(this.filter.nativeElement,"keyup").subscribe(()=>{this.dataSource&&(this.dataSource.filter=this.filter.nativeElement.value)})}exportExcel(){const t=this.dataSource.filteredData.map(o=>({Name:o.name,Email:o.email,Mobile:o.mobile,Department:o.department,Role:o.role,Project:o.project}));P.c.exportToExcel(t,"excel")}showNotification(t,o,n,l){this.snackBar.open(o,"",{duration:2e3,verticalPosition:n,horizontalPosition:l,panelClass:t})}onContextMenu(t,o){t.preventDefault(),this.contextMenuPosition.x=t.clientX+"px",this.contextMenuPosition.y=t.clientY+"px",void 0!==this.contextMenu&&null!==this.contextMenu.menu&&(this.contextMenu.menuData={item:o},this.contextMenu.menu.focusFirstItem("mouse"),this.contextMenu.openMenu())}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(h.eN),e.Y36(p.uw),e.Y36(f),e.Y36(j.ux))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-leads"]],viewQuery:function(t,o){if(1&t&&(e.Gf(M.NW,7),e.Gf(L.YE,7),e.Gf(V,7),e.Gf(b.p6,5)),2&t){let n;e.iGM(n=e.CRH())&&(o.paginator=n.first),e.iGM(n=e.CRH())&&(o.sort=n.first),e.iGM(n=e.CRH())&&(o.filter=n.first),e.iGM(n=e.CRH())&&(o.contextMenu=n.first)}},features:[e.qOj],decls:100,vars:20,consts:[[1,"content"],[1,"content-block"],[1,"block-header"],[3,"title","items","active_item"],[1,"row"],[1,"col-lg-12","col-md-12","col-sm-12","col-xs-12"],[1,"card"],[1,"materialTableHeader"],[1,"left"],[1,"header-buttons-left","ms-0"],[1,"tbl-title"],[1,"tbl-search-box"],["for","search-input"],[1,"material-icons","search-icon"],["placeholder","Search","type","text","aria-label","Search box",1,"browser-default","search-field"],["filter",""],[1,"right"],[1,"tbl-export-btn"],[1,"tbl-header-btn"],["matTooltip","ADD",1,"m-l-10"],["mat-mini-fab","","color","primary",3,"click"],[1,"col-white"],["matTooltip","REFRESH",1,"m-l-10"],["matTooltip","DELETE",1,"m-l-10",3,"hidden"],["mat-mini-fab","","color","warn",3,"click"],["matTooltip","XLSX",1,"export-button","m-l-10"],["src","assets/images/icons/xlsx.png","alt","",3,"click"],[1,"body","overflow-auto"],[1,"responsive_table"],["mat-table","","matSort","",1,"mat-cell",3,"dataSource"],["table",""],["matColumnDef","select"],[3,"ngClass",4,"matHeaderCellDef"],[3,"ngClass",4,"matCellDef"],["matColumnDef","id"],["mat-sort-header","",4,"matHeaderCellDef"],[4,"matCellDef"],["matColumnDef","img"],["mat-header-cell","",3,"ngClass",4,"matHeaderCellDef"],["mat-cell","","class","table-img tbl-col-width-per-7",4,"matCellDef"],["matColumnDef","name"],[3,"contextmenu",4,"matCellDef"],["matColumnDef","department"],["matColumnDef","role"],["matColumnDef","project"],["matColumnDef","mobile"],["matColumnDef","email"],["matColumnDef","actions"],["class","pr-0",4,"matHeaderCellDef"],["class","pr-0",4,"matCellDef"],[4,"matHeaderRowDef"],["matRipple","",3,"cursor","click",4,"matRowDef","matRowDefColumns"],["class","tbl-spinner",4,"ngIf"],[2,"visibility","hidden","position","fixed",3,"matMenuTriggerFor"],["contextMenu","matMenu"],["matMenuContent",""],["nestedmenu","matMenu"],["mat-menu-item",""],["class","no-results",3,"display",4,"ngIf"],[3,"length","pageIndex","pageSize","pageSizeOptions"],["paginator",""],[3,"ngClass"],[3,"checked","indeterminate","ngClass","change"],[3,"checked","ngClass","click","change"],["mat-sort-header",""],["mat-header-cell","",3,"ngClass"],["mat-cell","",1,"table-img","tbl-col-width-per-7"],[1,"mobile-label"],[3,"src"],[3,"contextmenu"],[1,"pr-0"],["mat-icon-button","","color","accent","matTooltip","Edit",1,"tbl-action-btn",3,"click"],[3,"icon"],["mat-icon-button","","color","accent","matTooltip","Delete",1,"tbl-action-btn",3,"click"],["matRipple","",3,"click"],[1,"tbl-spinner"],["color","primary","mode","indeterminate",3,"diameter"],["mat-menu-item","",3,"click"],["mat-menu-item","","disabled",""],["mat-menu-item","",3,"matMenuTriggerFor"],[1,"no-results"]],template:function(t,o){if(1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2),e._UZ(3,"app-breadcrumb",3),e.qZA(),e.TgZ(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"ul",9)(10,"li",10)(11,"h2"),e._uU(12,"Leaders"),e.qZA()(),e.TgZ(13,"li",11)(14,"label",12)(15,"i",13),e._uU(16,"search"),e.qZA()(),e._UZ(17,"input",14,15),e.qZA()()(),e.TgZ(19,"div",16)(20,"ul",17)(21,"li",18)(22,"div",19)(23,"button",20),e.NdJ("click",function(){return o.addNew()}),e.TgZ(24,"mat-icon",21),e._uU(25,"add"),e.qZA()()()(),e.TgZ(26,"li",18)(27,"div",22)(28,"button",20),e.NdJ("click",function(){return o.refresh()}),e.TgZ(29,"mat-icon",21),e._uU(30,"refresh"),e.qZA()()()(),e.TgZ(31,"li",18)(32,"div",23)(33,"button",24),e.NdJ("click",function(){return o.removeSelectedRows()}),e.TgZ(34,"mat-icon",21),e._uU(35,"delete "),e.qZA()()()(),e.TgZ(36,"li")(37,"div",25)(38,"img",26),e.NdJ("click",function(){return o.exportExcel()}),e.qZA()()()()()(),e.TgZ(39,"div",27)(40,"div",28)(41,"table",29,30),e.ynx(43,31),e.YNc(44,ee,2,4,"mat-header-cell",32),e.YNc(45,te,2,3,"mat-cell",33),e.BQk(),e.ynx(46,34),e.YNc(47,ae,2,0,"mat-header-cell",35),e.YNc(48,oe,2,1,"mat-cell",36),e.BQk(),e.ynx(49,37),e.YNc(50,ne,2,1,"mat-header-cell",38),e.YNc(51,ie,4,1,"mat-cell",39),e.BQk(),e.ynx(52,40),e.YNc(53,le,2,0,"mat-header-cell",35),e.YNc(54,re,4,1,"mat-cell",41),e.BQk(),e.ynx(55,42),e.YNc(56,se,2,0,"mat-header-cell",35),e.YNc(57,ce,4,1,"mat-cell",41),e.BQk(),e.ynx(58,43),e.YNc(59,me,2,0,"mat-header-cell",35),e.YNc(60,de,4,1,"mat-cell",41),e.BQk(),e.ynx(61,44),e.YNc(62,ue,2,0,"mat-header-cell",35),e.YNc(63,pe,4,1,"mat-cell",41),e.BQk(),e.ynx(64,45),e.YNc(65,_e,2,0,"mat-header-cell",35),e.YNc(66,ge,4,1,"mat-cell",41),e.BQk(),e.ynx(67,46),e.YNc(68,he,2,0,"mat-header-cell",35),e.YNc(69,fe,4,1,"mat-cell",41),e.BQk(),e.ynx(70,47),e.YNc(71,Ce,2,0,"mat-header-cell",48),e.YNc(72,Ze,5,6,"mat-cell",49),e.BQk(),e.YNc(73,xe,1,0,"mat-header-row",50),e.YNc(74,Te,1,2,"mat-row",51),e.qZA(),e.YNc(75,be,2,1,"div",52),e._UZ(76,"div",53),e.TgZ(77,"mat-menu",null,54),e.YNc(79,ve,30,1,"ng-template",55),e.qZA(),e.TgZ(80,"mat-menu",null,56)(82,"button",57)(83,"mat-icon"),e._uU(84,"mail_outline"),e.qZA(),e.TgZ(85,"span"),e._uU(86,"Item 1"),e.qZA()(),e.TgZ(87,"button",57)(88,"mat-icon"),e._uU(89,"call"),e.qZA(),e.TgZ(90,"span"),e._uU(91,"Item 2"),e.qZA()(),e.TgZ(92,"button",57)(93,"mat-icon"),e._uU(94,"chat"),e.qZA(),e.TgZ(95,"span"),e._uU(96,"Item 3"),e.qZA()()(),e.YNc(97,De,2,2,"div",58),e._UZ(98,"mat-paginator",59,60),e.qZA()()()()()()()),2&t){const n=e.MAs(78);e.xp6(3),e.Q6J("title","Leaders")("items",e.DdM(18,Ae))("active_item","Leaders"),e.xp6(29),e.Q6J("hidden",!o.selection.hasValue()),e.xp6(9),e.Q6J("dataSource",o.dataSource),e.xp6(32),e.Q6J("matHeaderRowDef",o.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",o.displayedColumns),e.xp6(1),e.Q6J("ngIf",null==o.exampleDatabase?null:o.exampleDatabase.isTblLoading),e.xp6(1),e.Udp("left",o.contextMenuPosition.x)("top",o.contextMenuPosition.y),e.Q6J("matMenuTriggerFor",n),e.xp6(21),e.Q6J("ngIf",!(null!=o.exampleDatabase&&o.exampleDatabase.isTblLoading)),e.xp6(1),e.Q6J("length",o.dataSource.filteredData.length)("pageIndex",0)("pageSize",10)("pageSizeOptions",e.DdM(19,Ue))}},dependencies:[c.mk,c.O5,G.L,v.RK,v.nh,K.oG,w.Hw,b.VK,b.OP,b.KA,b.p6,M.NW,$.Ou,z.wG,L.YE,L.nU,g.BZ,g.fO,g.as,g.w1,g.Dz,g.nj,g.ge,g.ev,g.XQ,g.Gk,W.gM,X.A]}),a})();class qe extends q.o2{get filter(){return this.filterChange.value}set filter(i){this.filterChange.next(i)}constructor(i,t,o){super(),this.exampleDatabase=i,this.paginator=t,this._sort=o,this.filterChange=new x.X(""),this.filteredData=[],this.renderedData=[],this.filterChange.subscribe(()=>this.paginator.pageIndex=0)}connect(){const i=[this.exampleDatabase.dataChange,this._sort.sortChange,this.filterChange,this.paginator.page];return this.exampleDatabase.getAllLeadss(),(0,E.T)(...i).pipe((0,J.U)(()=>{this.filteredData=this.exampleDatabase.data.slice().filter(n=>-1!==(n.name+n.department+n.role+n.project+n.email+n.mobile).toLowerCase().indexOf(this.filter.toLowerCase()));const t=this.sortData(this.filteredData.slice());return this.renderedData=t.splice(this.paginator.pageIndex*this.paginator.pageSize,this.paginator.pageSize),this.renderedData}))}disconnect(){}sortData(i){return this._sort.active&&""!==this._sort.direction?i.sort((t,o)=>{let n="",l="";switch(this._sort.active){case"id":[n,l]=[t.id,o.id];break;case"name":[n,l]=[t.name,o.name];break;case"email":[n,l]=[t.email,o.email];break;case"time":[n,l]=[t.department,o.department];break;case"mobile":[n,l]=[t.mobile,o.mobile]}return((isNaN(+n)?n:+n)<(isNaN(+l)?l:+l)?-1:1)*("asc"===this._sort.direction?1:-1)}):i}}const Ne=[{path:"",component:Le}];let Me=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[Z.Bz.forChild(Ne),Z.Bz]}),a})(),we=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({providers:[f],imports:[c.ez,Me,d.u5,d.UX,T.K,_.m]}),a})()},1299:(N,C,r)=>{r.d(C,{L:()=>x});var c=r(2223),d=r(4755),T=r(9085),_=r(1676);function Z(u,e){if(1&u&&(c.TgZ(0,"li",11),c._uU(1),c.qZA()),2&u){const h=e.$implicit;c.xp6(1),c.Oqu(h)}}let x=(()=>{class u{constructor(){}}return u.\u0275fac=function(h){return new(h||u)},u.\u0275cmp=c.Xpm({type:u,selectors:[["app-breadcrumb"]],inputs:{title:"title",items:"items",active_item:"active_item"},decls:14,vars:7,consts:[[1,"breadcrumb-main"],[1,"row"],[1,"col-6"],[1,"breadcrumb-title"],[1,"page-title"],[1,"breadcrumb-list"],[1,"breadcrumb-item","bcrumb-1"],[3,"routerLink"],[3,"icon"],["class","breadcrumb-item",4,"ngFor","ngForOf"],[1,"breadcrumb-item","active"],[1,"breadcrumb-item"]],template:function(h,f){1&h&&(c.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h4",4),c._uU(5),c.qZA()()(),c.TgZ(6,"div",2)(7,"ul",5)(8,"li",6)(9,"a",7),c._UZ(10,"app-feather-icons",8),c.qZA()(),c.YNc(11,Z,2,1,"li",9),c.TgZ(12,"li",10),c._uU(13),c.qZA()()()()()),2&h&&(c.xp6(5),c.Oqu(f.title),c.xp6(4),c.Q6J("routerLink","/admin/search-order"),c.xp6(1),c.Tol("breadcrumb-icon"),c.Q6J("icon","home"),c.xp6(1),c.Q6J("ngForOf",f.items),c.xp6(2),c.Oqu(f.active_item))},dependencies:[d.sg,T.rH,_.A]}),u})()},5626:(N,C,r)=>{r.d(C,{K:()=>T});var c=r(8629),d=r(2223);let T=(()=>{class _{}return _.\u0275fac=function(x){return new(x||_)},_.\u0275mod=d.oAB({type:_}),_.\u0275inj=d.cJS({imports:[c.m]}),_})()}}]);