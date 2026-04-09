import { Component } from '@angular/core';


interface GaugeValues {
  [key: number]: number;
}

@Component({
    selector: 'app-gauge',
    templateUrl: './gauge.component.html',
    styleUrls: ['./gauge.component.scss'],
    standalone: false
})
export class GaugeComponent {
  gaugeValue = 68;
  gaugeSize = 120;
  guageThick = 5;

  guageType1: 'full' | 'semi' | 'arch' = 'full';
  guageType2: 'full' | 'semi' | 'arch' = 'semi';
  guageType3: 'full' | 'semi' | 'arch' = 'arch';

  dynamicGaugeDemoValue = 10.2;

  constructor() {
    this.percentageValue = function (value: number): string {
      return `${Math.round(value)}`;
    };
  }

  percentageValue: (value: number) => string;
  gaugeValues: GaugeValues = {
    1: 100,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 50,
  };

  onUpdateClick() {
    this.dynamicGaugeDemoValue = Math.round(Math.random() * 1000) / 10;
  }

  markerConfig = {
    '0': { color: '#555', size: 8, label: '0', type: 'line' },
    '15': { color: '#555', size: 4, type: 'line' },
    '30': { color: '#555', size: 8, label: '30', type: 'line' },
    '40': { color: '#555', size: 4, type: 'line' },
    '50': { color: '#555', size: 8, label: '50', type: 'line' },
    '60': { color: '#555', size: 4, type: 'line' },
    '70': { color: '#555', size: 8, label: '70', type: 'line' },
    '85': { color: '#555', size: 4, type: 'line' },
    '100': { color: '#555', size: 8, label: '100', type: 'line' },
  };
}
