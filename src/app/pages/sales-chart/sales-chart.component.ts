import { Component } from '@angular/core';


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
import { CommonModule } from '@angular/common';
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
  selector: 'app-sales-chart',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './sales-chart.component.html',
  styleUrl: './sales-chart.component.scss'
})
export class SalesChartComponent {
  public chartOptions: Partial<ChartOptions>;
  constructor(private productService: ProductService) {
    
  }

  ngOnInit(): void {
    this.productService.getSalesList().subscribe((response) => {
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
          type: "area",
          height: 450,
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Fundamental Analysis of Sales",
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
