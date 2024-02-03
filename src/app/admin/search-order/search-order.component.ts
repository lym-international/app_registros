import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/_services/authentication.service';
import { OrderDataService } from 'app/_services/orderData.service';
// import { Router } from '@angular/router';
import { OcultarSidebarService } from 'app/_services/ocultar-sidebar.service';
import { Router, NavigationEnd } from '@angular/router'

//import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.scss'],
  //standalone: true,
  //imports: [],
})


export class SearchOrderComponent{
  
  data: any;
  selectedOrder: any; //Diego
  ocultar:any;

  // private orderFunctionsURL = "https://us-central1-highkeystaff.cloudfunctions.net/orders";
  public orders : any[] = [];
  public orderNumber: string;
  public foundOrder: any | null = null;
  public dataUser!: any;
  @ViewChild('orderInput') orderInput: ElementRef;
  shouldReload: boolean;

  constructor(private http: HttpClient, 
              private authenticationService: AuthenticationService,
              private orderDataService: OrderDataService,
              private router:Router,
              private ocultarSidebarService: OcultarSidebarService,
              
              ) {
                this.shouldReload = false;

                // Escuchar el evento NavigationEnd
                this.router.events.subscribe((event) => {
                  if (event instanceof NavigationEnd) {
                    if (this.shouldReload) {
                      // Recargar la página una vez que la navegación haya finalizado
                      window.location.reload();
                      this.shouldReload = false; // Restablecer la bandera
                    }
                  }
                });
              }
  
  ngOnInit() {
    
    this.ocultarSidebarService.ocultarSidebar();

    this.data = this.authenticationService.getData(); // en data obtiene los datos guardados en el servicio authenticationService.
    
    const storedUserData = localStorage.getItem('currentUserData');
    if (storedUserData) {
      this.data = JSON.parse(storedUserData);
    } else {
      // Si no se encuentran los datos en el localStorage, obtenerlos del servicio
      this.data = this.authenticationService.getData();
      // Almacenar los datos en el localStorage
      localStorage.setItem('currentUserData', JSON.stringify(this.data));
    }
    // Aquí se tiene acceso a los datos del usuario en la variable data
    console.log('Datos en storedUserData desde el SearchOrder: ', storedUserData);

    //Inicio validación de rol para la visualización de las órdenes.

      if (this.data.role == "Client") {
      // this.router.navigate(['orders']);
      //this.loadClientOrders(this.currentUser.client);
        this.getOrderByIdUser(this.data.email,this.data.hkId)
        this.getSearchOrders()
        console.log('Orden por usuario: ', this.getOrderByIdUser(this.data.email,this.data.hkId))
    } else if (
      this.data.role == "Administrator" ||
      this.data.role == "Executive"
    ) {
        this.getOrders();
        this.getSearchOrders();
        //this.loadParameters();
    } else if (this.data.role == "Supervisor") {
      this.getOrdersBySupervisor(this.data.email);
      this.getSearchOrdersBySuperv(this.data.email);
      //this.loadParameters();
      // this.getOrderByIdUser(this.data.email, this.data.hkId)
    } else if (
      this.data.role == "Employee"
    ) {
        this.getOrderByHKid(this.data.highkeyId)  
        //this.getOrderByIdUser(this.data.email,this.data.highkeyId)
        
        this.getSearchOrdersByEmp(this.data.highkeyId)
    }

    //Fin validación de rol para la visualización de las órdenes.
    console.log('Datos usuario: ',this.data);

  }

  public ordenes:any[];
  
  //Trae las órdenes en general desde la url de la API, más arriba se usa solo para los administradores y executives.
  getOrders(){
    fetch(
      //`http://127.0.0.1:5001/highkeystaff/us-central1/orders/getActiveOrders`
      //  `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrders`
      // `https://us-central1-highkeystaff.cloudfunctions.net/orders/totalOrders`
       `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrders`
    )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      this.orders = data;
      this.orders.sort((a, b) => b.data.ordNumb - a.data.ordNumb);
      // this.orders.sort((a,b)=>(a.data.orderId < b.data.orderId? 1: -1));
      // console.log('Ordenes desde el método getOrders: ', this.orders)
    })
    .catch((error)=> {
      console.log(error)
    }
    )
  }

  getOrderByHKid(hkId){
    if (hkId){

      fetch(
        // `https://us-central1-highkeystaff.cloudfunctions.net/orders/totalOrders`
        // `https://us-central1-highkeystaff.cloudfunctions.net/orders/getActiveOrders`
        // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getActiveOrders`
        // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByUser/user?user==${user}`
        // `${this.orderFunctionsURL}/order/getOrdersByUser/user?user=${user}`
        // `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrders`
        // `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByEmployee?hkId=${hkId}`
        `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByEmployee?hkId=${hkId}`
      )
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de la orden por usuario con highKey: ', data)
        this.orders = data;
        //this.orders.sort((a, b) => b.data.ordNum - a.data.ordNum);
        this.orders.sort((a,b)=>(a.data.orderId < b.data.orderId? 1: -1));
      })
      .catch((error)=> {
        console.log(error)
      }
      )
    }
  }

//Trae las órdenes por usuario desde la url de la API, más arriba se usa solo para los Supervisor.
  getOrderByIdUser(user, hkId){
    if (hkId){
      fetch(
        // `https://us-central1-highkeystaff.cloudfunctions.net/orders/totalOrders`
        // `https://us-central1-highkeystaff.cloudfunctions.net/orders/getActiveOrders`
        // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getActiveOrders`
        // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByUser/user?user==${user}`
        // `${this.orderFunctionsURL}/order/getOrdersByUser/user?user=${user}`
        // `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrders`
        // `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByEmployee?hkId=${hkId}`
        `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByEmployee?hkId=${hkId}`
      )
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de la orden por usuario con highKey: ', data)
        this.orders = data;
        //this.orders.sort((a, b) => b.data.ordNum - a.data.ordNum);
        this.orders.sort((a,b)=>(a.data.orderId < b.data.orderId? 1: -1));
      })
      .catch((error)=> {
        console.log(error)
      }
      )
    }
    else {
      
      fetch(
        //  `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByEmployee?email=${user}`
        `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByEmployee?email=${user}`
        
      )
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de la orden por usuario por email: ', data)
        this.orders = data;
        //this.orders.sort((a, b) => b.data.ordNum - a.data.ordNum);
        this.orders.sort((a,b)=>(a.data.orderId < b.data.orderId? 1: -1));
      })
      .catch((error)=> {
        console.log(error)
      }
      )
    }   
  }

  
  getOrdersBySupervisor(user){
    if(user){
      
      fetch(
        // `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByEmployee?email=${user}`
        // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByEmployee?email=${user}`

        //'http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByUser/user?user=paola@paola.com'
        //  `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByUser/user?user=${user}`
         `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByUser/user?user=${user}`
        // 'https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByUser/user?user=yenny@stafflm.com'
        
      )
      
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de la orden por supervisor: ', data)
        this.orders = data;
        //this.orders.sort((a, b) => b.data.ordNum - a.data.ordNum);
        this.orders.sort((a,b)=>(a.data.orderId < b.data.orderId? 1: -1));
      })
      .catch((error)=> {
        console.log(error)
      }
      )
    }  
  }

  orderOption(order: any){
    this.selectedOrder = order;
    this.orderDataService.setSelectedOrder(order);
  }

  onOrderSelection(selectedOption: any) {
    this.selectedOrder = selectedOption;
  }
  // método como estaba antes
 /*  navegar(){
    if (this.data.role == "Administrator"){
      this.router.navigate(['/admin/dashboard-lm/']);
    }
    else if(this.data.role == "Employee"){
      this.router.navigate(['/admin/employees/admin-employees/']);
    }
  } */

  //método aplicando un retraso en la recarga de la página
/*   navegar() {
    if (this.data.role === "Administrator") {
      this.router.navigate(['/admin/dashboard-lm/']);
    } else if (this.data.role === "Employee") {
    this.router.  navigate(['/admin/employees/admin-employees/']);
    }
    // Recargar la página después de un pequeño retraso
    setTimeout(() => {
      window.location.reload();
    }, 500); // Ajusta el valor del retraso según tus necesidades
  } */

  //Recargando una vez se carga los datos (ligado al constructor)
  loading = false;

  navegar() {
    if (this.data.role === "Administrator" || this.data.role ==="Supervisor" || this.data.role ==="Client") {
      this.router.navigate(['/admin/dashboard-lm/']);
    } else if (this.data.role === "Employee") {
      this.router.navigate(['/admin/employees/admin-employees/']);
    }
    this.loading = true; // Mostrar la animación de carga
     setTimeout(() => {
      this.shouldReload = true;
     }, 200); // Establecer la bandera para recargar después de un breve retraso
  } 
  
  //Diego: Inicio búsqueda de órdenes por el input
  getSearchOrders(): void {
    
    const apiUrl =
    //  `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrders`  
    // `https://us-central1-highkeystaff.cloudfunctions.net/orders/totalOrders`;
     'http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrders';
    //  'https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrders';

    this.http.get<any[]>(apiUrl).subscribe((ordenes) => {
      this.ordenes = ordenes;
    //  console.log('Ordenes desde el getSearchOrders ADMIN: ', this.ordenes )
    });
  }
  getSearchOrdersByEmp(hkId): void {
    
    const apiUrl =`http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByEmployee?hkId=${hkId}`
    // `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByEmployee?hkId=${hkId}`

    this.http.get<any[]>(apiUrl).subscribe((ordenes) => {
      this.ordenes = ordenes;
    });
  }
  getSearchOrdersBySuperv(user): void {
    
    const apiUrl =
    // `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByUser/user?user=${user}`
    `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByUser/user?user=${user}`    

    this.http.get<any[]>(apiUrl).subscribe((ordenes) => {
      this.ordenes = ordenes;
    //  console.log('Ordenes desde el getSearchOrders ADMIN: ', this.ordenes )
    });
  }
  
  getSearchOrdersByEmp1(hkId): void {
    
    const apiUrl =`http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByEmployee?hkId=${hkId}`
    // `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByEmployee?hkId=${hkId}`

    this.http.get<any[]>(apiUrl).subscribe((ordenes) => {
      this.ordenes = ordenes;
    });
  }

  searchOrder(): void {
    // Obtén el valor actual del campo de entrada
  let inputValue: string = this.orderNumber;

  // Elimina todos los guiones existentes para evitar duplicados
  inputValue = inputValue.replace(/-/g, '');

  // Agrega un guión después de los primeros cuatro dígitos
  if (inputValue.length >= 4) {
    inputValue = inputValue.substring(0, 4) + '-' + inputValue.substring(4);
  }

  // Actualiza el valor del campo de entrada
  this.orderNumber = inputValue;
  
    //console.log('Ordenes desde el getSearchOrders2: ', this.ordenes )
    this.foundOrder = null;
    for (const order of this.ordenes) {
      if (order.data.orderId === this.orderNumber) {
        this.foundOrder = order;
        break;
      }
    }
    // Verificar si se encontró un objeto con el orderId especificado
    if (this.foundOrder) {
      //console.log("Se encontró el objeto:");
      this.orderDataService.setSelectedOrder(this.foundOrder);
      //console.log(this.foundOrder);
    } else {
      console.log("No se encontró ningún objeto con el orderId especificado.");
    }
        
    
    //console.log('órdenes filtradas en searchOrder: ', filteredOrders)
    /*if (filteredOrders.length > 0) {
      const order = filteredOrders[0];

      // Lógica para obtener las propiedades necesarias del objeto order

      this.orderDataService.setSelectedOrder(order); // Guarda el pedido seleccionado en el servicio OrderDataService

      console.log('Orden desde el search: ', this.orderDataService)
    } else {
      console.log('No se encontró el número de orden ingresado.');
    }*/
  }
  //Diego: Fin búsqueda de órdenes por el input
  
  
}