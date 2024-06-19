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
import { RegistrationService } from 'app/_services/registration.service';

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
  public totalRequest = 0;
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

  constructor(
    private orderDataService: OrderDataService,
    private sharingCloseOrderService: SharingCloseOrderService,
    private regSvc: RegistrationService,
  ) {}

  ngOnInit() {
    this.dataOrder = this.orderDataService.getSelectedOrder();
    this.statusOrder = this.dataOrder.data.status;
    this.orderId = this.dataOrder.id;

    console.log('Data: ', this.dataOrder);
    console.log('OrderID ===>', this.orderId);
    this.getRegistrationsByOrder();
    this.getTotalRequest();

    this.sharingCloseOrderService.getStatusOrderObservable().subscribe((status) => {
      this.statusOrder = status;
    });
    console.log('STATUS ORDER en dasboardLm: ', this.statusOrder);
  }

  getTotalRequest() {
    if (this.dataOrder.data.items) {
      this.totalRequest = this.dataOrder.data.items.reduce((total, request) => total + request.quantity, 0);
    }
    console.log('Requested: ', this.dataOrder.data.items);
    this.dataItems = this.dataOrder.data.items;

    const positions = {};

    this.dataOrder.data.items.forEach((item) => {
      if (!positions[item.position]) {
        positions[item.position] = true;
        console.log('primera position', item.position);
      }
    });

    this.totalRequeridos = Object.keys(positions).length;
  }

  getRegistrationsByOrder() {
    this.regSvc.getRegistrationsByOrder(this.orderId).subscribe(
      (data) => {
        if (data.employees && Array.isArray(data.employees)) {
          this.checkIn = data.employees.filter((employee) => employee.checkin === true).length;
          this.checkOut = data.employees.filter((employee) => employee.checkout === true).length;
          this.noShow = data.employees.filter((employee) => employee.status === 'No show').length;

          this.totalConfirmed = data.employees.filter((employee) => {
            return employee.employee && employee.employee.status === 'Confirmed';
          }).length;
          
          this.calculatePercentages(this.checkIn, this.checkOut, this.noShow, this.totalConfirmed, this.totalRequest);
        } else {
          console.error('data.employees is not an array or is undefined');
        }

        const positions: { [name: string]: Position } = {};

        data.employees.forEach((employee) => {
          const positionName = employee.position;
          const hourFrom = employee.hourFrom;
          const rate = employee.employee ? employee.employee.agmRate : employee.rate;

          if (!positions[positionName]) {
            positions[positionName] = {
              name: positionName,
              hours: {},
            };
          }

          if (!positions[positionName].hours[hourFrom]) {
            positions[positionName].hours[hourFrom] = {
              totalCheckin: 0,
              totalCheckout: 0,
              totalnoShow: 0,
            };
          }

          positions[positionName].hours[hourFrom]['rate'] = rate;

          if (employee.employee && employee.employee.status === 'Confirmed') {
            if (employee.checkin) {
              positions[positionName].hours[hourFrom].totalCheckin++;
            }

            if (employee.checkout) {
              positions[positionName].hours[hourFrom].totalCheckout++;
            }

            if (employee.status === 'No show') {
              positions[positionName].hours[hourFrom].totalnoShow++;
            }
          }
        });

        localStorage.setItem('positions', JSON.stringify(positions));

        this.checkinValues = {};
        this.checkOutValues = {};
        this.noShowValues = {};

        for (const positionName in positions) {
          const position = positions[positionName];
          for (const hourFrom in position.hours) {
            const hourTotals = position.hours[hourFrom];
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
            } else {
              this.checkinValues[positionName][hourFrom] = 0;
            }
            if (hourTotals.totalCheckout !== undefined) {
              this.checkOutValues[positionName][hourFrom] = hourTotals.totalCheckout;
            } else {
              this.checkOutValues[positionName][hourFrom] = 0;
            }
            if (hourTotals.totalnoShow !== undefined) {
              this.noShowValues[positionName][hourFrom] = hourTotals.totalnoShow;
            } else {
              this.noShowValues[positionName][hourFrom] = 0;
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatTimeTo12HourFormat(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
  }

  calculatePercentages(checkIn: number, checkOut: number, noShow: number, totalConfirmed: number, totalRequest: number) {
    if (totalConfirmed !== 0) {
      this.porcentajeCheckIn = Math.round((checkIn / totalConfirmed) * 100);
      this.porcentajeCheckOut = Math.round((checkOut / checkIn) * 100);
      this.porcentajeNoshow = Math.round((noShow / totalConfirmed) * 100);
      this.porcentajeConfirmed = Math.round((totalConfirmed / totalRequest) * 100);
    } else {
      console.log('No es posible calcular los porcentajes. totalConfirmed es cero.');
    }
  }
}
