import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CartService } from '../../tools/services/cart.service';
import { ProductService } from '../../tools/services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-shop',
    standalone: true,
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss',
    imports: [HeaderComponent,CommonModule,HttpClientModule]
})
export class ShopComponent implements OnInit{
product: any;
products: any[] = [];
    constructor(private cartService: CartService,private productService: ProductService) {} 


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
      
      

    addToCart(product: any) { // Assuming you have product data
      this.cartService.addToCart(product);
    }
}
