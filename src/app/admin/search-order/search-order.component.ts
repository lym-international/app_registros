import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/_services/authentication.service';
import { OrderDataService } from 'app/_services/orderData.service';
import { Router, NavigationEnd } from '@angular/router';
import { OcultarSidebarService } from 'app/_services/ocultar-sidebar.service';
import { OrderService } from 'app/_services/order.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.scss']
})
export class SearchOrderComponent implements OnInit {

  data: any;
  selectedOrder: any;
  ocultar: any;
  orders: any[] = [];
  orderNumber = '';
  foundOrder: any | null = null;
  dataUser: any;
  ordenes: any[] = [];
  shouldReload = new BehaviorSubject<boolean>(false);
  
  loading = false;

  @ViewChild('orderInput') orderInput: ElementRef;

  constructor(
    private http: HttpClient, 
    private authenticationService: AuthenticationService,
    private orderDataService: OrderDataService,
    private router: Router,
    private ocultarSidebarService: OcultarSidebarService,
    private ordSvc: OrderService 
  ) { }

  ngOnInit() {
    this.ocultarSidebarService.ocultarSidebar();
    this.data = this.authenticationService.getData();
    const storedUserData = sessionStorage.getItem('currentUserData');
    
    if (storedUserData) {
      this.data = JSON.parse(storedUserData);
    } else {
      this.data = this.authenticationService.getData();
      sessionStorage.setItem('currentUserData', JSON.stringify(this.data));
    }

    this.initializeOrders();
  }

  // Método para manejar la selección de una orden
  orderOption(order: any) {
    this.selectedOrder = order;
    this.orderDataService.setSelectedOrder(order);
  }

  // Método para manejar la selección en mat-select
  onOrderSelection(selectedOption: any) {
    this.selectedOrder = selectedOption;
  }

  initializeOrders() {
    if (this.data.role === 'Client') {
      this.getOrderByIdUser(this.data.email, this.data.hkId);
      this.getSearchOrders();
    } else if (this.data.role === 'Administrator' || this.data.role === 'Executive') {
      const storedOrders = sessionStorage.getItem('currentOrders');
      if (storedOrders) {
        this.orders = JSON.parse(storedOrders);
      } else {
        this.getOrders();
        this.getSearchOrders();
      }
    } else if (this.data.role === 'Supervisor') {
      this.getOrdersBySupervisor(this.data.email);
      this.getSearchOrdersBySuperv(this.data.email);
    } else if (this.data.role === 'Employee') {
      this.getOrderByHKid(this.data.highkeyId);
      this.getSearchOrdersByEmp(this.data.highkeyId);
    }
  }

  getOrders() {
    this.ordSvc.getOrders().subscribe(
      (data) => {
        this.orders = data;
        this.orders.sort((a, b) => b.data.ordNumb - a.data.ordNumb);
        sessionStorage.setItem('currentOrders', JSON.stringify(this.orders));
      },
      (error) => {
        console.log('Error fetching orders:', error);
      }
    );
  }

  getOrderByHKid(hkId: string) {
    this.ordSvc.getOrderByHKid(hkId).subscribe(
      (data) => {
        this.orders = data;
        this.orders.sort((a, b) => b.data.ordNumb - a.data.ordNumb);
      },
      (error) => {
        console.log('Error fetching orders by HK id:', error);
      }
    );
  }

  getOrderByIdUser(user: string, hkId: string) {
    this.ordSvc.getOrdersByUser(user, hkId).subscribe(
      (data) => {
        this.orders = data;
        this.orders.sort((a, b) => b.data.ordNumb - a.data.ordNumb);
      },
      (error) => {
        console.log('Error fetching orders by user:', error);
      }
    );
  }

  getOrdersBySupervisor(user: string) {
    this.ordSvc.getOrdersBySupervisor(user).subscribe(
      (data) => {
        this.orders = data;
        this.orders.sort((a, b) => b.data.ordNumb - a.data.ordNumb);
      },
      (error) => {
        console.log('Error fetching orders by supervisor:', error);
      }
    );
  }

  getSearchOrders() {
    this.ordSvc.getSearchOrders().subscribe(
      (ordenes) => {
        this.ordenes = ordenes;
      },
      (error) => {
        console.log('Error fetching search orders:', error);
      }
    );
  }

  getSearchOrdersByEmp(hkId: string) {
    this.ordSvc.getSearchOrdersByEmp(hkId).subscribe(
      (ordenes) => {
        this.ordenes = ordenes;
      },
      (error) => {
        console.log('Error fetching search orders by employee:', error);
      }
    );
  }

  getSearchOrdersBySuperv(user: string) {
    this.ordSvc.getSearchOrdersBySuperv(user).subscribe(
      (ordenes) => {
        this.ordenes = ordenes;
      },
      (error) => {
        console.log('Error fetching search orders by supervisor:', error);
      }
    );
  }

  searchOrder() {
    let inputValue: string = this.orderNumber;
    inputValue = inputValue.replace(/-/g, '');
    if (inputValue.length >= 4) {
      inputValue = inputValue.substring(0, 4) + '-' + inputValue.substring(4);
    }
    this.orderNumber = inputValue;

    const storedOrders = sessionStorage.getItem('currentOrders');
    if (storedOrders) {
      this.ordenes = JSON.parse(storedOrders);
    }

    this.foundOrder = this.ordenes.find(order => order.data.orderId === this.orderNumber);

    if (this.foundOrder) {
      this.orderDataService.setSelectedOrder(this.foundOrder);
    } else {
      console.log("No se encontró ningún objeto con el orderId especificado.");
    }
  }

  navegar() {
    if (this.data.role === "Administrator" || this.data.role === "Supervisor" || this.data.role === "Client") {
      this.router.navigate(['/admin/dashboard-lm/']);
    } else if (this.data.role === "Employee") {
      this.router.navigate(['/admin/employees/admin-employees/']);
    }
    this.shouldReload.next(true);
  }
  
}
