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
  totalRequest: number = 0;
  porcentajeCheckIn: number = 0;
  porcentajeCheckOut: number = 0;
  porcentajeNoshow: number = 0;
  totalRequeridos: number = 0;
  

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
    else {
    }
    console.log('Requested: ', this.dataOrder.data.items)  

    this.totalRequeridos = this.dataOrder.data.items.length;

    this.dataOrder.data.items.forEach(item => {console.log('Po: ',item)}) 

  }
  
  

  getRegistByOrder(){
    fetch(
      `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`
      
      )
    .then((response) => response.json())
    .then((data) => {
    console.log('Id Data: ', data.employees)
    this.checkIn = data.employees.filter((employee) => employee.checkin === true).length;
    
    this.checkOut = data.employees.filter((employee) => employee.checkout === true).length;
        
    this.noShow = data.employees.filter((employee) => employee.status === "No show").length;
      
    this.totalConfirmed = data.employees.filter((employee) => employee.employee.status === "Confirmed").length;
    
    this.porcentajes(this.checkIn, this.checkOut, this.noShow, this.totalConfirmed)
    
    })
    .catch((error)=> {
      console.log(error)
    }
    )   
  }

  porcentajes(checkIn,checkOut,noShow,totalConfirmed){
    if (this.totalConfirmed !== 0) {
      this.porcentajeCheckIn = Math.round((checkIn/totalConfirmed) * 100);
      this.porcentajeCheckOut = Math.round((checkOut/totalConfirmed) * 100);
      this.porcentajeNoshow = Math.round((noShow/totalConfirmed) * 100);
      
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
