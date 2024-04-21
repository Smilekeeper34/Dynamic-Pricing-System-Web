import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { tableData } from '../product-list/table-data';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: any[];
  chart: any;
  plotOptions: any;
  xaxis: any;
};
@Component({
  selector: 'app-invetory-chart',
  standalone: true,
  imports: [ NgApexchartsModule,CommonModule],
  templateUrl: './invetory-chart.component.html',
  styleUrl: './invetory-chart.component.scss'
})
export class InvetoryChartComponent {
  // @ViewChild("chart") chart: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    const categories = tableData.map(item => item.productName);
    const quantities = tableData.map(item => item.quantity);

    this.chartOptions = {
      series: [
        {
          name: "Quantity",
          data: quantities
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        categories: categories
      }
    };
  }
}
