import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../tools/services/cart.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [HeaderComponent, CommonModule, FormsModule, RouterModule,ReactiveFormsModule],
})
export class CartComponent {
  totalAmount: any;
  subTotal:any;
  products: any;
  cartForm:FormGroup;
discount: any;
  constructor(private cartService: CartService,private fb: FormBuilder,private http: HttpClient) {
    this.cartForm = this.fb.group({
      quantity: ['', Validators.required],});
  }

  ngOnInit(): void {
    this.cartService.cartItemsSubject.subscribe((data) => {
      this.products = data;
      // console.log(this.products[0].productCode);
    });
  }
  onSubmit() {
    const productCode = this.products[0].productCode ;
    const quantity = this.cartForm.value.quantity; 

    // Calculate subtotal or use this.products.sellingPrice directly if available
    const subTotal = this.products.sellingPrice * quantity;

    // Update the subtotal value
    this.subTotal = subTotal;

    // Show confirmation using SweetAlert
    Swal.fire({
      title: 'Confirm',
      text: 'Do You Confirm Order',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, send request to update sold item
        this.http.put<any>(`https://econimic-pricing.onrender.com/api/v1/product/update-sold-item/${productCode}/${quantity}`, {})
          .subscribe(
            (response) => {
              // Handle success response if needed
              console.log('Sold item updated successfully:', response);
              // Optionally, show a success message using SweetAlert
              Swal.fire('Success', ' Item Sold successfully', 'success');
            },
            (error) => {
              // Handle error response if needed
              console.error('Error updating sold item:', error);
              // Optionally, show an error message using SweetAlert
              Swal.fire('Error', 'Failed to update sold item', 'error');
            }
          );
      }
    });
  }
}
