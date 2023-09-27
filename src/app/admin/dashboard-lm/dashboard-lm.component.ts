import { Component, OnInit } from '@angular/core';
import { OrderDataService } from 'app/_services/orderData.service';
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
import { SharingCloseOrderService } from 'app/_services/sharing-close-order.service';

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
  styleUrls: ['./dashboard-lm.component.scss'],
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
  statusOrder: string;

  //  color: ["#3FA7DC", "#F6A025", "#9BC311"],
  constructor(
    private orderDataService: OrderDataService,
    private sharingCloseOrderService: SharingCloseOrderService
  ) {
    // controller code
  }
  ngOnInit() {
    this.dataOrder = this.orderDataService.getSelectedOrder();

    this.statusOrder = this.dataOrder.data.status;
    this.orderId = this.dataOrder.id;

    console.log('Data: ', this.dataOrder);
    //this.orderId = this.dataOrder.id;
    console.log('OrderID ===>', this.orderId);
    this.getRegistByOrder();
    this.getTotalRequest();
    //this.porcentajes();

    this.sharingCloseOrderService
      .getStatusOrderObservable()
      .subscribe((status) => {
        this.statusOrder = status;
      });
    console.log('STATUS ORDER en dasboardLm: ', this.statusOrder);
  }
  //this.orderSelected = this.selectedOrder;

  getTotalRequest() {
    if (this.dataOrder.data.items) {
      this.dataOrder.data.items.forEach((request) => {
        this.totalRequest += request.quantity;
      });
    }
    console.log('Requested: ', this.dataOrder.data.items);
    this.dataItems = this.dataOrder.data.items;
    //this.totalRequeridos = this.dataOrder.data.items.length;
    // console.log("this.dataItems", this.dataItems)
    const positions = {};

    this.dataOrder.data.items.forEach((item) => {
      if (!positions[item.position]) {
        positions[item.position] = true;
        console.log('primera position', item.position);
      }
    });

    this.totalRequeridos = Object.keys(positions).length; //Cantidad de posiciones de la orden
  }

  getRegistByOrder() {
    fetch(
      `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`
      //  `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`
    )
      .then((response) => response.json())
      .then((data) => {
        //  console.log('Id Data: ', data)

        if (data.employees && Array.isArray(data.employees)) {
          this.checkIn = data.employees.filter(
            (employee) => employee.checkin === true
          ).length;
          this.checkOut = data.employees.filter(
            (employee) => employee.checkout === true
          ).length;
          this.noShow = data.employees.filter(
            (employee) => employee.status === 'No show'
          ).length;

          // this.totalConfirmed = data.employees.filter((employee) => employee.employee.status === "Confirmed").length;

          this.totalConfirmed = data.employees.filter((employee) => {
            return (
              employee.employee && employee.employee.status === 'Confirmed'
            );
          }).length;
          this.porcentajes(
            this.checkIn,
            this.checkOut,
            this.noShow,
            this.totalConfirmed,
            this.totalRequest
          );
        } else {
          console.error('data.employees is not an array or is undefined');
        }

        const positions: { [name: string]: Position } = {};
        
        data.employees.forEach((employee) => {
          const positionName = employee.position;
          const hourFrom = employee.hourFrom;
          // const rate = employee.employee.agmRate
          const rate = employee.employee
            ? employee.employee.agmRate
            : employee.rate;

          if (!positions[positionName]) {
            console.log(`Nueva posición encontrada: ${positionName}`);
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
              // rate: rate,
            };
          }

          positions[positionName].hours[hourFrom]['rate'] = rate;

          if (employee.employee && employee.employee.status === 'Confirmed') {
            if (employee.checkin) {
              // Incrementar el total de check-in para la posición y hora inicial
              positions[positionName].hours[hourFrom].totalCheckin++;
            }

            if (employee.checkout) {
              // Incrementar el total de check-out para la posición y hora inicial
              positions[positionName].hours[hourFrom].totalCheckout++;
            }

            if (employee.status == 'No show') {
              // Incrementar el total de check-out para la posición y hora inicial
              positions[positionName].hours[hourFrom].totalnoShow++;
            }
          } else {
            console.log(
              'Manejar el caso en que employee o employee.status estén indefinidos'
            );
          }
        });

        // console.log("positiions ",positions)

        localStorage.setItem('positions', JSON.stringify(positions));

        // Imprimir los totales por posición y hora inicial

        this.checkinValues = {};
        this.checkOutValues = {};
        this.noShowValues = {};

        for (const positionName in positions) {
          const position = positions[positionName];
          console.log(`Posición: ${position.name}`);
          for (const hourFrom in position.hours) {
            const hourTotals: {
              totalCheckin?: number;
              totalCheckout?: number;
              totalnoShow?: number;
            } = position.hours[hourFrom];
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
              this.checkinValues[positionName][hourFrom] =
                hourTotals.totalCheckin;
              console.log(`Total de check-in: ${hourTotals.totalCheckin}`);
            } else {
              this.checkinValues[positionName][hourFrom] = 0;
              console.log(`Total de check-in: 0`);
            }
            if (hourTotals.totalCheckout !== undefined) {
              this.checkOutValues[positionName][hourFrom] =
                hourTotals.totalCheckout;
              console.log(`Total de check-out: ${hourTotals.totalCheckout}`);
            } else if (hourTotals.totalCheckout === 0) {
              this.checkOutValues[positionName][hourFrom] = 0;
              console.log(`Total de check-out: 0`);
            }
            if (hourTotals.totalnoShow !== undefined) {
              this.noShowValues[positionName][hourFrom] =
                hourTotals.totalnoShow;
              console.log(`Total de noShow: ${hourTotals.totalnoShow}`);
            } else {
              this.noShowValues[positionName][hourFrom] = 0;
              console.log(`Total de noShow: 0`);
            }
            console.log('---');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  formatTimeTo12HourFormat(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
  }

  //Tarjetas superiores
  porcentajes(checkIn, checkOut, noShow, totalConfirmed, totalRequest) {
    if (this.totalConfirmed !== 0) {
      this.porcentajeCheckIn = Math.round((checkIn / totalConfirmed) * 100);
      this.porcentajeCheckOut = Math.round((checkOut / checkIn) * 100);
      this.porcentajeNoshow = Math.round((noShow / totalConfirmed) * 100);
      this.porcentajeConfirmed = Math.round(
        (totalConfirmed / totalRequest) * 100
      );
      console.log('Porcentaje checkIn: ', this.porcentajeCheckIn);
      console.log('Porcentaje checkOut: ', this.porcentajeCheckOut);
      console.log('Porcentaje Noshow: ', this.porcentajeNoshow);
      console.log('Porcentaje confirmed: ', this.porcentajeConfirmed);
    } else {
      // Manejo del caso cuando this.totalConfirmed es igual a cero
      console.log(
        'No es posible calcular los porcentajes. totalConfirmed es cero.'
      );
    }
  }
}
