import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { tableData } from '../product-list/table-data';
import { ProductService } from '../../tools/services/product.service';
import { NgApexchartsModule } from 'ng-apexcharts';


//Charts
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-invetory-chart',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './invetory-chart.component.html',
  styleUrl: './invetory-chart.component.scss',
})
export class InvetoryChartComponent {

  public chartOptions: Partial<ChartOptions>;
  constructor(private productService: ProductService) {
    
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe((response) => {
      const categories = response.content.map((item: any) => item.name);
      const quantities = response.content.map((item: any) => item.quantity);

      // Update chart options with data from the service
      this.chartOptions = {
        series: [
          {
            name: "Stock Quantity",
            data: quantities
          }
        ],
        chart: {
          type: "bar",
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Fundamental Analysis of Stocks",
          align: "left"
        },
        subtitle: {
          text: "Stock Quantity",
          align: "left"
        },
        labels: categories,
        xaxis: {
          type: "category"
        },
        yaxis: {
          opposite: true
        },
        legend: {
          horizontalAlign: "left"
        }
      };
    });
  }
}
