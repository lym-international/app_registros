import { Component, OnInit } from '@angular/core';
import { OrderDataService } from 'app/_services/orderData.service';
import { Employees } from '../employees/allEmployees/employees.model';


import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexLegend,
  ApexFill,
  ApexResponsive,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';
import { Position } from 'app/interfaces/position.interface';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  series2: ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: 'app-dashboard-lm',
  templateUrl: './dashboard-lm.component.html',
  styleUrls: ['./dashboard-lm.component.scss']
})

export class DashboardLmComponent implements OnInit {
  public lineChartOptions!: Partial<ChartOptions>;
  public pieChartOptions!: Partial<ChartOptions>;
  public orderSelected!: any;
  public dataOrder!: any;
  public orderId!: string;
  public totalConfirmed!: number;
  public noShow: number;
  public checkIn: number;
  public checkOut: number;
  public totalRequest = 0; //
  public porcentajeCheckIn = 0;
  public porcentajeCheckOut = 0;
  public porcentajeNoshow = 0;
  public totalRequeridos = 0;
  public dataItems = [];
  public checkinPosicion: string;
  porcentajeConfirmed: number;
  checkinValues: { [position: string]: { [hourFrom: string]: number } } = {};
  checkOutValues: { [position: string]: { [hourFrom: string]: number } } = {};
  noShowValues: { [position: string]: { [hourFrom: string]: number } } = {};
  filteredCheckinValues: number[];
  
  //  color: ["#3FA7DC", "#F6A025", "#9BC311"],
  constructor(private orderDataService: OrderDataService) {
    // controller code
  }
  ngOnInit() {
    this.dataOrder = this.orderDataService.getSelectedOrder();
    //this.chart1(); //Plantilla
    //this.chart2(); //Plantilla
    console.log('Data: ', this.dataOrder)
    this.orderId = this.dataOrder.id;
    console.log('OrderID ===>', this.orderId)
    this.getRegistByOrder();
    this.getTotalRequest();
    //this.porcentajes();
    
  }
  //this.orderSelected = this.selectedOrder;
  
  getTotalRequest(){
    
    if(this.dataOrder.data.items){
        this.dataOrder.data.items.forEach(request => {
        this.totalRequest += request.quantity;
        });
        
    }
    
    console.log('Requested: ', this.dataOrder.data.items)  
    this.dataItems = this.dataOrder.data.items;
    //this.totalRequeridos = this.dataOrder.data.items.length;
// console.log("this.dataItems", this.dataItems)
    const positions = {};

    this.dataOrder.data.items.forEach(item => {
      if (item.m !== 0 && !positions[item.position]) {
        positions[item.position] = true;
        console.log("primera position", item.position)
      }
    });
    
    this.totalRequeridos = Object.keys(positions).length; //Cantidad de posiciones de la orden
    
    
    //this.empleadosPorPosicion = this.dataOrder.data.items.employees.length;

    //this.dataOrder.data.items.forEach(item => {console.log('Po: ',item)}) 

  }
  
  

  getRegistByOrder(){
    fetch(
      //`http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`
      `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`
      
      )
    .then((response) => response.json())
    .then((data) => {
    console.log('Id Data: ', data.employees)
    this.checkIn = data.employees.filter((employee) => employee.checkin === true).length;
    
    this.checkOut = data.employees.filter((employee) => employee.checkout === true).length;
        
    this.noShow = data.employees.filter((employee) => employee.status === "No show").length;
      
    this.totalConfirmed = data.employees.filter((employee) => employee.employee.status === "Confirmed").length;
    
    this.porcentajes(this.checkIn, this.checkOut, this.noShow, this.totalConfirmed, this.totalRequest)
  
    const positions: { [name: string]: Position } = {};

    data.employees.forEach((employee)=>{
      // console.log('RR: ', employee.employee.data)  
      const positionName = employee.position;
      const hourFrom = employee.hourFrom;
    
    if (!positions[positionName]) {
      // Si la posición no existe en el objeto, crearla
      positions[positionName] = {
        name: positionName,
        hours: {},
      };
    }

    if (!positions[positionName].hours[hourFrom]) {
      // Si la hora inicial no existe para la posición, crearla
      positions[positionName].hours[hourFrom] = {
        totalCheckin: 0,
        totalCheckout: 0,
        totalnoShow: 0,
      };
    }
      
    if (employee.checkin) {
      // Incrementar el total de check-in para la posición y hora inicial
     positions[positionName].hours[hourFrom].totalCheckin++; 
    }
    
    if (employee.checkout) {
      // Incrementar el total de check-out para la posición y hora inicial
      positions[positionName].hours[hourFrom].totalCheckout++;
    }

    if (employee.status == "No show") {
      // Incrementar el total de check-out para la posición y hora inicial
      positions[positionName].hours[hourFrom].totalnoShow++;
    }
  

  
      /*const positionName = employee.position;

      if (!positions[positionName]) {
        // Si la posición no existe en el objeto, crearla
        positions[positionName] = {
        name: positionName,
        totalCheckin: 0,
        totalCheckout: 0,
        };
      }

      if (employee.checkin) {
        // Incrementar el total de check-in para la posición
        positions[positionName].totalCheckin++;
      }

      if (employee.checkout) {
        // Incrementar el total de check-out para la posición
        positions[positionName].totalCheckout++;
      }*/

      })
      
      // Imprimir los totales por posición y hora inicial
    
      this.checkinValues = {};
      this.checkOutValues = {};
      this.noShowValues = {};

      for (const positionName in positions) {
        const position = positions[positionName];
        console.log(`Posición: ${position.name}`);
      
        for (const hourFrom in position.hours) {
          const hourTotals: { totalCheckin?: number, totalCheckout?: number, totalnoShow?: number,} = position.hours[hourFrom];
          console.log(`Hora inicial: ${hourFrom}`);
      
          if (!this.checkinValues[positionName]) {
            this.checkinValues[positionName] = {};
          }
          
          if (!this.checkOutValues[positionName]) {
            this.checkOutValues[positionName] = {};
          }

          if (!this.noShowValues[positionName]) {
            this.noShowValues[positionName] = {};
          }

          if (hourTotals.totalCheckin !== undefined) {
            this.checkinValues[positionName][hourFrom] = hourTotals.totalCheckin;
            console.log(`Total de check-in: ${hourTotals.totalCheckin}`);
          } else {
            this.checkinValues[positionName][hourFrom] = 0;
            console.log(`Total de check-in: 0`);
          }
          
          if (hourTotals.totalCheckout !== undefined) {
            this.checkOutValues[positionName][hourFrom] = hourTotals.totalCheckout;
            console.log(`Total de check-out: ${hourTotals.totalCheckout}`);
          } else {
            console.log(`Total de check-out: 0`);
          }
          
          if (hourTotals.totalnoShow !== undefined) {
            this.noShowValues[positionName][hourFrom] = hourTotals.totalnoShow;
            console.log(`Total de noShow: ${hourTotals.totalnoShow}`);
          } else {
            this.noShowValues[positionName][hourFrom] = 0;
            console.log(`Total de noShow: 0`);
          }

          console.log('---');
        }
      }
    })
    
    .catch((error)=> {
      console.log(error)
    }
    )   
  }
  //Tarjetas superiores
  porcentajes(checkIn,checkOut,noShow,totalConfirmed, totalRequest){
    if (this.totalConfirmed !== 0) {
      this.porcentajeCheckIn = Math.round((checkIn/totalConfirmed) * 100);
      this.porcentajeCheckOut = Math.round((checkOut/checkIn) * 100);
      this.porcentajeNoshow = Math.round((noShow/totalConfirmed) * 100);
      this.porcentajeConfirmed = Math.round((totalConfirmed/totalRequest) * 100);
      console.log('Porcentaje checkIn: ', this.porcentajeCheckIn)
      console.log('Porcentaje checkOut: ', this.porcentajeCheckOut)
      console.log('Porcentaje Noshow: ', this.porcentajeNoshow)
      console.log('Porcentaje confirmed: ', this.porcentajeConfirmed)
    } else {
      // Manejo del caso cuando this.totalConfirmed es igual a cero
      console.log('No es posible calcular los porcentajes. totalConfirmed es cero.');
    } 
  } 

  //Plantilla
  /*private chart1() {
    this.lineChartOptions = {
      series: [
        {
          name: 'Employee 1',
          data: [70, 200, 80, 180, 170, 105, 210],
        },
        {
          name: 'Employee 2',
          data: [80, 250, 30, 120, 260, 100, 180],
        },
        {
          name: 'Employee 3',
          data: [85, 130, 85, 225, 80, 190, 120],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        foreColor: '#9aa0ac',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#A5A5A5', '#875692', '#4CB5AC'],
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      markers: {
        size: 3,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        // opposite: true,
        title: {
          text: 'Clients',
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }

  private chart2() {
    this.pieChartOptions = {
      series2: [44, 55, 13, 43, 22],
      chart: {
        type: 'donut',
        width: 225,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Science', 'Mathes', 'Economics', 'History', 'Music'],
      responsive: [
        {
          breakpoint: 480,
          options: {},
        },
      ],
    };
  }*/
} 
