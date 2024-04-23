import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // Discount rules
  private discountRules = [
    { quantityThreshold: 3, discountPercentage: 5 },
    { quantityThreshold: 5, discountPercentage: 10 },
    { quantityThreshold: 10, discountPercentage: 15 } 
  ];

  constructor(private router:Router) {}

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  addToCart(product: any) {
    const existingIndex = this.cartItemsSubject.getValue().findIndex(item => item.product.id === product.id);

    if (existingIndex >= 0) {
      this.cartItemsSubject.getValue()[existingIndex].quantity++;
    } else {
      this.cartItemsSubject.getValue().push(product);
    }

    this.cartItemsSubject.next(this.cartItemsSubject.getValue());
    
    this.router.navigate(['/cart']);
  }

  removeFromCart(cartItem: CartItem) {
    const index = this.cartItemsSubject.getValue().indexOf(cartItem);
    if (index >= 0) {
      this.cartItemsSubject.getValue().splice(index, 1);
      this.cartItemsSubject.next(this.cartItemsSubject.getValue());
    }
  }

  updateQuantity(cartItem: CartItem, newQuantity: number) {
    const index = this.cartItemsSubject.getValue().indexOf(cartItem);
    if (index >= 0) {
      this.cartItemsSubject.getValue()[index].quantity = newQuantity;
      this.cartItemsSubject.next(this.cartItemsSubject.getValue());
    }
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  calculateTotal(): number {
    let total = 0;
    this.cartItemsSubject.getValue().forEach(item => {
      let itemPrice = item.product.price * item.quantity;

      // Apply discounts
      this.discountRules.forEach(rule => {
        if (item.quantity >= rule.quantityThreshold) {
          itemPrice -= itemPrice * (rule.discountPercentage / 100); 
        }
      });

      total += itemPrice;
    });

    return total;
  }
}
