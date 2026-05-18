import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/_services/authentication.service';
import { OrderDataService } from 'app/_services/orderData.service';
import { Router, NavigationEnd } from '@angular/router';
import { OcultarSidebarService } from 'app/_services/ocultar-sidebar.service';
import { OrderService } from 'app/_services/order.service';

import { BehaviorSubject, Subject } from 'rxjs';
import { UserRoleService } from 'app/_services/UserRole.service';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.scss']
})
export class SearchOrderComponent implements OnInit, OnDestroy {

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
  selectedRole: string;
  currentRole: any;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient, 
    private authenticationService: AuthenticationService,
    private orderDataService: OrderDataService,
    private router: Router,
    private ocultarSidebarService: OcultarSidebarService,
    private ordSvc: OrderService,
    private userRoleService: UserRoleService
  ) { 
   
  }

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
    this.selectedRole = this.authenticationService.getSelectedRole();
    this.initializeOrders();

    // console.log('selectedRole ', this.selectedRole)

    this.searchSubject.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.performSearch(value);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
      // this.getOrderByIdUser(this.data.email, this.data.hkId);
      this.getOrdersByClient(this.data.client)
      // this.getSearchOrders();
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

        this.orders.sort((a, b) => {
          // Extraer año y número del orderId (formato: "2026-150" o "2025-2132")
          const getOrderParts = (orderId: string) => {
            if (!orderId || typeof orderId !== 'string') {
              return { year: 0, number: 0 };
            }
            const parts = orderId.split('-');
            return {
              year: parseInt(parts[0]) || 0,
              number: parseInt(parts[1]) || 0
            };
          };

          const orderA = getOrderParts(a.data.orderId);
          const orderB = getOrderParts(b.data.orderId);

          // Primero ordenar por año (descendente - más reciente primero)
          if (orderA.year !== orderB.year) {
            return orderB.year - orderA.year;
          }

          // Si el año es igual, ordenar por número (descendente)
          return orderB.number - orderA.number;
        });

        //console.log('✅ Órdenes ordenadas. Primera:', this.orders[0]?.data?.orderId);
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

  getOrdersByClient(clientId: string){
    this.ordSvc.getOrdersByClient(clientId).subscribe(
      (ordenes) => {
        this.ordenes = ordenes;
        this.orders = ordenes;
        this.orders.sort((a, b) => b.data.ordNumb - a.data.ordNumb);
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


  searchOrder_bn() {
    let inputValue: string = this.orderNumber;
    inputValue = inputValue.replace(/-/g, ''); // Elimina guiones
    if (inputValue.length >= 4) {
      inputValue = inputValue.substring(0, 4) + '-' + inputValue.substring(4); // Formatea el número de orden
    }
    this.orderNumber = inputValue;
  
    // Validar el formato del número de orden
    const orderNumberPattern = /^\d{4}-\d{1,4}$/; // Expresión regular para el formato
    if (!orderNumberPattern.test(this.orderNumber)) {
      // console.log('Formato de número de orden inválido. Debe ser como 2025-94 o 2024-1234.');
      return; // Detener la ejecución si el formato no es válido
    }
  
    // Buscar en sessionStorage
    const storedOrders = sessionStorage.getItem('currentOrders');
    if (storedOrders) {
      this.ordenes = JSON.parse(storedOrders);
    }
  
    // Buscar la orden en las órdenes almacenadas
    this.foundOrder = this.ordenes.find(order => order.data.orderId === this.orderNumber);
  
    if (this.foundOrder) {
      // Si se encuentra en sessionStorage, asignarla al servicio
      this.orderDataService.setSelectedOrder(this.foundOrder);
    } else {
      // console.log("No se encontró la orden en sessionStorage. Buscando en el servicio...");
  
      // Si no se encuentra en sessionStorage, buscar en el servicio
      this.ordSvc.getOrderByOrderId(this.orderNumber).subscribe(
        (orden) => {
          // console.log("Orden encontrada en el servicio:", orden);
          this.foundOrder = orden[0];
  
          // Asignar la orden encontrada al servicio
          this.orderDataService.setSelectedOrder(this.foundOrder);
        },
        (error) => {
          // console.log('Error al buscar la orden en el servicio:', error);
        }
      );
    }
  }

  searchOrder() {
    this.searchSubject.next(this.orderNumber);
  }

  performSearch(rawInput: string) {
  let inputValue = rawInput.replace(/-/g, '');

  if (inputValue.length >= 4) {
    inputValue = inputValue.substring(0, 4) + '-' + inputValue.substring(4);
  }
  this.orderNumber = inputValue;

  // Acepta desde 1 dígito final, pero solo dispara después del debounce
  const orderNumberPattern = /^\d{4}-\d{1,4}$/;
  if (!orderNumberPattern.test(this.orderNumber)) {
    return;
  }

  const storedOrders = sessionStorage.getItem('currentOrders');
  if (storedOrders) {
    this.ordenes = JSON.parse(storedOrders);
  }

  // Busca coincidencia EXACTA, nunca parcial
  this.foundOrder = this.ordenes.find(
    order => order.data.orderId === this.orderNumber
  ) ?? null;

  if (this.foundOrder) {
    this.orderDataService.setSelectedOrder(this.foundOrder);
  } else {
    this.ordSvc.getOrderByOrderId(this.orderNumber).subscribe(
      (orden) => {
        // Verificar que la respuesta coincide con lo que el usuario escribió
        // (evita race conditions si el usuario siguió escribiendo)
        if (orden?.length && orden[0]?.data?.orderId === this.orderNumber) {
          this.foundOrder = orden[0];
          this.orderDataService.setSelectedOrder(this.foundOrder);
        }
      },
      (error) => {
        console.log('Error al buscar la orden:', error);
      }
    );
  }
}


  navegar() {
    const sessionRole = (this.userRoleService.getSelectedRole() || '').trim();
    const accountRole = this.data?.role;

    // Solo ir a la vista de empleados si la cuenta es Employee o un Admin/Supervisor eligió actuar como Employee
    const goEmployeeView =
      accountRole === 'Employee' ||
      ((accountRole === 'Administrator' || accountRole === 'Supervisor') &&
        sessionRole === 'Employee');

    if (goEmployeeView) {
      this.router.navigate(['/admin/employees/admin-employees/']);
    } else if (
      accountRole === 'Administrator' ||
      accountRole === 'Supervisor' ||
      accountRole === 'Client'
    ) {
      this.router.navigate(['/admin/dashboard-lm/']);
    }
    this.shouldReload.next(true);
  }
  
  
}
