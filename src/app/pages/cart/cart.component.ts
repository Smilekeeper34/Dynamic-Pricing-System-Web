import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../tools/services/cart.service';

interface CartItem {
  product: Product;
  quantity: number;
}
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string; // Optional
}

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [HeaderComponent, CommonModule, FormsModule],
})
export class CartComponent {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => (this.cartItems = items));
  }

  onRemoveFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
  }

  onQuantityChange(cartItem: CartItem, newQuantity: number) {
    this.cartService.updateQuantity(cartItem, newQuantity);
  }

  getTotal(): number {
    return this.cartService.calculateTotal();
  }
}
