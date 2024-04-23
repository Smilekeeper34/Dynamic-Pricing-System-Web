import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../tools/services/product.service';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss'
})

export class SalesReportComponent {
 sales:any[]=[];

 constructor(private productService: ProductService){}

 ngOnInit(){
  this.loadSales();
 }
  loadSales() {
    this.productService.getSalesList().subscribe(
      (data) => {
        if (data && data.content && Array.isArray(data.content)) {
          this.sales = data.content;
        } else {
          console.error('Invalid Sales list format:', data);
        }
      },
      (error) => {
        console.error('Error fetching sales list:', error);
      }
    );
  }
}
