/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
} from '@angular/core';
import { ROUTES } from './sidebar-items';
import { AuthService, Role } from '@core';
import { RouteInfo } from './sidebar.metadata';
import { AuthenticationService } from 'app/_services/authentication.service';
import { Subscription } from 'rxjs';
import { OrderDataService } from 'app/_services/orderData.service';
import { SharingCloseOrderService } from 'app/_services/sharing-close-order.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit { 
  public sidebarItems!: RouteInfo[];
  public innerHeight?: number;
  public bodyTag!: HTMLElement;
  public dataUser!: any;
  listMaxHeight?: string;
  listMaxWidth?: string;
  userFullName?: string;
  userImg?: string;
  userType?: string;
  headerHeight = 60;
  currentRoute?: string;
  routerObj;
  mostrarMenu: boolean;
  dataOrder: any;
  orderId: any;
  statusOrder: string;
  orderStatus: any;

  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    public authenticationService: AuthenticationService,
    private orderDataService: OrderDataService,
    private sharingCloseOrderService: SharingCloseOrderService,
    
  ) {
    this.elementRef.nativeElement.closest('body');
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.mostrarMenu = !this.currentRoute.startsWith('/admin/search-order');
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall() {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callToggleMenu(event: Event, length: number) {
    if (length > 0) {
      const parentElement = (event.target as HTMLInputElement).closest('li');
      const activeClass = parentElement?.classList.contains('active');

      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
      } else {
        this.renderer.addClass(parentElement, 'active');
      }
    }
  }

  ngOnInit() {
    this.sharingCloseOrderService.getOrderIdObservable().subscribe(orderId => {
      console.log('OrderId recibido:', orderId);
      this.orderId = orderId;
     
    });
    
    this.dataUser = this.authenticationService.getData();
    
    // const storedUserData = localStorage.getItem('currentUserData');
    const storedUserData = sessionStorage.getItem('currentUserData');

    
    if (storedUserData) {
      this.dataUser = JSON.parse(storedUserData);
    } else {
      // Si no se encuentran los datos en el localStorage, obtenerlos del servicio
      this.dataUser = this.authenticationService.getData();
      // Almacenar los datos en el localStorage
      // localStorage.setItem('currentUserData', JSON.stringify(this.dataUser));
      sessionStorage.setItem('currentUserData', JSON.stringify(this.dataUser));
    }
    // Aquí tienes acceso a los datos del usuario en la variable dataUser
    //console.log('Datos en storedUserData desde el sideBar: ', storedUserData);
    //console.log('Datos usuario desde el sideBar: ', this.dataUser)
    
    //Validación del rol del usuario para la visualización de los items del sidebar
    if (this.dataUser) {
      const userRole = this.dataUser.role;
      this.sidebarItems = ROUTES.filter(
        (x) => x.role.indexOf(userRole) !== -1 || x.role.indexOf('All') !== -1
      );
      //console.log('SIDEBAR ITEMS: ', this.sidebarItems)
      
    }
    
    this.initLeftSidebar();
    this.bodyTag = this.document.body;

    // this.dataOrder = this.orderDataService.getSelectedOrder();
    // this.orderStatus = this.dataOrder.data.status;
    //console.log('Data Order: ', this.dataOrder);
    // this.orderStatus = this.dataOrder.data.status;
  
    // this.orderId = this.dataOrder.id;
    //console.log('this.orderId:', this.orderId)
    //console.log('this.dataUser.email: ',this.dataUser.email)
    
  }
  
  //Este método de validación es solo para la opción Close Order del sidebar
  isUserRoleValid(): boolean {
    if (this.dataUser && this.dataUser.role) {
      const userRole = this.dataUser.role;
      // Verifica si el rol del usuario es "Administrator" o "Client"
      return userRole === 'Administrator' || userRole === 'Supervisor';//|| userRole === 'Client';
    }
    // Si no se proporciona un rol de usuario válido, oculta el botón
    return false;
  }

  closeOrder() {
    const apiUrl =  `https://us-central1-highkeystaff-test.cloudfunctions.net/orders/order/close?id=${this.orderId}&updatedBy=${this.dataUser.email}`
    // const apiUrl = `http://127.0.0.1:5001/highkeystaff-test/us-central1/orders/order/close?id=${this.orderId}&updatedBy=${this.dataUser.email}`
    
    fetch(apiUrl, {
      method: 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        this.orderStatus = data.data.status;
        this.orderDataService.setSelectedOrder(data);
        sessionStorage.removeItem('currentOrders');

        // Notificar al componente AllemployeesComponent sobre el cierre de la orden
        this.sharingCloseOrderService.setStatusOrder(this.orderStatus);
      })
      .catch((error) => {
        console.error('Error al actualizar:', error);
      });
  }

  closeOrder1(){
    const apiUrl =
     `https://us-central1-highkeystaff.cloudfunctions.net/orders/order/close?id=${this.orderId}&updatedBy=${this.dataUser.email}`
    //  `http://127.0.0.1:5001/highkeystaff/us-central1/orders/order/close?id=${this.orderId}&updatedBy=${this.dataUser.email}`
    fetch(apiUrl, {
      method: 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        this.orderStatus = data.data.status;
        this.orderDataService.setSelectedOrder(data);
        sessionStorage.removeItem('currentOrders');
      })
      .catch((error) => {
        console.error('Error al actualizar:', error);
      });
      //console.log('ORDEN CERRADA')
  }
  
  
  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime: boolean) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  logout() {
    this.authenticationService.logout(); //jairo
    
    /* this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    }); */
  }
}


//Diego: código de plantilla
/*if (this.authService.currentUserValue) {
  const userRole = this.authService.currentUserValue.role;
  this.userFullName =
    this.authService.currentUserValue.firstName +
    ' ' +
    this.authService.currentUserValue.lastName;
  this.userImg = this.authService.currentUserValue.img;

  this.sidebarItems = ROUTES.filter(
    (x) => x.role.indexOf(userRole) !== -1 || x.role.indexOf('All') !== -1
  );
  if (userRole === Role.Admin) {
    this.userType = Role.Admin;
  } else if (userRole === Role.Client) {
    this.userType = Role.Client;
  } else if (userRole === Role.Employee) {
    this.userType = Role.Employee;
  } else {
    this.userType = Role.Admin;
  }
}

// this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
this.initLeftSidebar();
this.bodyTag = this.document.body;
}*/