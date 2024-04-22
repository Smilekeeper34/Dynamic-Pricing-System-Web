import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CartService } from '../../tools/services/cart.service';

@Component({
    selector: 'app-shop',
    standalone: true,
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss',
    imports: [HeaderComponent]
})
export class ShopComponent {
product: any;
    constructor(private cartService: CartService) {} 

    addToCart(product: any) { // Assuming you have product data
      this.cartService.addToCart(product);
    }
}
