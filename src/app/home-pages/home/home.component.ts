import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";
import { CartService } from '../../tools/services/cart.service';
import { ProductService } from '../../tools/services/product.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, RouterModule, HeaderComponent]
})
export class HomeComponent {
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
