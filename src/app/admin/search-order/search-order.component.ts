import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/_services/authentication.service';
import { OrderDataService } from 'app/_services/orderData.service';
import { Router } from '@angular/router';
import { OcultarSidebarService } from 'app/_services/ocultar-sidebar.service';

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

  private orderFunctionsURL = "https://us-central1-highkeystaff.cloudfunctions.net/orders";
  public orders : any[] = [];
  public orderNumber: string;
  public foundOrder: any | null = null;
  public dataUser!: any;
  

  constructor(private http: HttpClient, 
              private authenticationService: AuthenticationService,
              private orderDataService: OrderDataService,
              private router:Router,
              private ocultarSidebarService: OcultarSidebarService,
              ) {}
  
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
    // Aquí tienes acceso a los datos del usuario en la variable data
    console.log('Datos en storedUserData desde el SearchOrder: ', storedUserData);

    //Inicio validación de rol para la visualización de las órdenes.

      if (this.data.role == "Client") {
      // this.router.navigate(['orders']);
      //this.loadClientOrders(this.currentUser.client);
    } else if (
      this.data.role == "Administrator" ||
      this.data.role == "Executive"
    ) {
      this.getOrders();
      this.getSearchOrders();
      //this.loadParameters();
    } else if (this.data.role == "Supervisor") {
      //this.loadSupervisorOrders();
      //this.loadParameters();
      this.getOrderByIdUser(this.data.email)

    }

    //Fin validación de rol para la visualización de las órdenes.
    console.log('Datos usuario: ',this.data);

  }

  public ordenes:any[];
  
  //Trae las órdenes en general desde la url de la API, más arriba se usa solo para los administradores y executives.
  getOrders(){
    fetch(
      `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getActiveOrders`
      // `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrders`
    )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      this.orders = data;
      this.orders.sort((a, b) => b.data.ordNum - a.data.ordNum);
      // console.log('Ordenes desde el método getOrders: ', this.orders)
    })
    .catch((error)=> {
      console.log(error)
    }
    )
  }
//Trae las órdenes por usuario desde la url de la API, más arriba se usa solo para los Supervisor.
  getOrderByIdUser(user){
    
    fetch(
      `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getActiveOrders`
      // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByUser/user?user==${user}`
      // `${this.orderFunctionsURL}/order/getOrdersByUser/user?user=${user}`
    )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      this.orders = data;
      this.orders.sort((a, b) => b.data.ordNum - a.data.ordNum);
    })
    .catch((error)=> {
      console.log(error)
    }
    )   
  }
  
  orderOption(order: any){
    this.selectedOrder = order;
    this.orderDataService.setSelectedOrder(order);
  }

  onOrderSelection(selectedOption: any) {
    this.selectedOrder = selectedOption;
  }

  navegar(){
    this.router.navigate(['/admin/dashboard-lm/']);
  }
  
  //Diego: Inicio búsqueda de órdenes por el input
  
  getSearchOrders(): void {
    const apiUrl = 'http://127.0.0.1:5001/highkeystaff/us-central1/orders/getActiveOrders';//'https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrders';

    this.http.get<any[]>(apiUrl).subscribe((ordenes) => {
      this.ordenes = ordenes;

      //console.log('Ordenes desde el getSearchOrders: ', this.ordenes )
    });
  }
  
  searchOrder(): void {
    //console.log('Ordenes desde el getSearchOrders2: ', this.ordenes )
    

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
  

