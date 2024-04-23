import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { tableData } from './table-data';
import { ProductService } from '../../tools/services/product.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  products: any[] = [];

  constructor(private productService: ProductService){}
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductList().subscribe(
      (data) => {
        if (data && data.content && Array.isArray(data.content)) {
          this.products = data.content;
        } else {
          console.error('Invalid product list format:', data);
        }
      },
      (error) => {
        console.error('Error fetching product list:', error);
      }
    );
  }
  
}
