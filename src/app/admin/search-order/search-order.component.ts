import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/_services/authentication.service';
import { OrderDataService } from 'app/_services/orderData.service';
import { Router } from '@angular/router';
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

  private orderFunctionsURL = "https://us-central1-highkeystaff.cloudfunctions.net/orders";
  public orders : any[] = [];

  constructor(private http: HttpClient, 
              private authenticationService: AuthenticationService,
              private orderDataService: OrderDataService,
              private router:Router) {}
  
  ngOnInit() {

    this.data = this.authenticationService.getData();

      if (this.data.role == "Client") {
      // this.router.navigate(['orders']);
      //this.loadClientOrders(this.currentUser.client);
    } else if (
      this.data.role == "Administrator" ||
      this.data.role == "Executive"
    ) {
      this.getOrders();
      //this.loadParameters();
    } else if (this.data.role == "Supervisor") {
      //this.loadSupervisorOrders();
      //this.loadParameters();
      this.getOrderByIdUser(this.data.email)

    }
    console.log(this.data);
  }

  public ordenes:any[];
  

  getOrders(){
    fetch(
      `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrders`
    )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      this.orders = data;
    })
  }
  


  getOrderByIdUser(user){
    
    fetch(
      `${this.orderFunctionsURL}/order/getOrdersByUser/user?user=${user}`
    )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      this.orders = data;
    })
    


    //return this.http.get(`${this.orderFunctionsURL}/order/getOrdersByUser/user?user=${user}`); // proporcionado por Jairo
  }
  
  orderOption(order: any){
    this.selectedOrder = order;
    this.orderDataService.setSelectedOrder(order);
    
    console.log(this.selectedOrder)
  }

  onOrderSelection(selectedOption: any) {
    this.selectedOrder = selectedOption;
  }

  navegar(){
    this.router.navigate(['/admin/dashboard-lm/']);
  }
  
}
  

