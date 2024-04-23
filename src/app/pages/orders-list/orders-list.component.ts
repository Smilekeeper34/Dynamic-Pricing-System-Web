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
  ApexLegend,
} from 'ng-apexcharts';
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
  plotOptions?: {
    bar?: {
      horizontal: boolean;
      columnWidth: string;
      endingShape: string;
    };
  };
  fill?: {
    opacity: number;
  };
  tooltip?: {
    y: {
      formatter: (val: any) => string;
    };
  };
};

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent {
  public chartOptions: Partial<ChartOptions>;
  constructor(private productService: ProductService) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'area',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },title: {
        text: "Fundamental Analysis of Sales",
        align: "left"
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Retrival',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.productService.getSalesList().subscribe((response) => {
      const categories = response.content.map((item: any) => item.name);
      const quantities = response.content.map((item: any) => item.quantity);
      const costPrices = response.content.map((item: any) => item.costPrice);
      const sellingPrices = response.content.map(
        (item: any) => item.sellingPrice
      );

      this.chartOptions.series = [
        { name: 'Quantity', data: quantities },
        { name: 'Cost Price', data: costPrices },
        { name: 'Selling Price', data: sellingPrices },
      ];
      this.chartOptions.xaxis.categories = categories;
    });
  }
}
