import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../tools/services/cart.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReceiptModalComponent } from '../receipt-modal/receipt-modal.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class CartComponent implements OnInit {
  products: any[] = [];

  totalAmount: any;
  subTotal: any;
  cartForm: FormGroup;
  discount = 0;
  discountType = 'percentage';
  discountCode: string;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private http: HttpClient
  ) {
    this.cartForm = this.fb.group({
      quantity: ['1', Validators.required],
    });

    // Simulate discounts in local storage
    if (!localStorage.getItem('discounts')) {
      localStorage.setItem(
        'discounts',
        JSON.stringify([
          { code: 'SUMMER20', value: 20, type: 'percentage' },
          { code: 'SAVE10', value: 10, type: 'fixed' },
        ])
      );
    }
  }

  ngOnInit(): void {
    this.cartService.cartItemsSubject.subscribe((data) => {
      this.products = data;
      this.updateSubTotal();
      this.totalAmount =
        this.products[0].sellingPrice * this.cartForm.value.quantity;
    });
  }
  applyDiscountOnQuantityChange() {
    this.applyDiscountCode();
  }
  updateSubTotal() {
    if (this.products && this.products.length > 0) {
      const quantity = parseInt(this.cartForm.value.quantity);
      const originalPrice = this.products[0].sellingPrice;
      let subTotal = originalPrice * quantity;

      if (this.discountType === 'percentage') {
        subTotal -= (subTotal * this.discount) / 100;
      } else if (this.discountType === 'fixed') {
        subTotal -= this.discount;
      } else {
        // If no discount applied, use original selling price * quantity
        subTotal = originalPrice * quantity;
      }

      this.subTotal = subTotal;
    }
  }

  applyDiscountCode() {
    const discounts = JSON.parse(localStorage.getItem('discounts') || '[]');
    const discount = discounts.find((d) => d.code === this.discountCode);

    if (discount) {
      this.discount = discount.value;
      this.discountType = discount.type;
      
    } else {
      // Handle invalid code - perhaps with a Swal.fire error message
      this.discount = 0; // If discount code is not found, reset discount
    this.discountType ='';
    }
    this.updateSubTotal();
  }

  onSubmit() {
    const productCode = this.products[0].productCode;
    const quantity = this.cartForm.value.quantity;
    Swal.fire({
      title: 'Confirm',
      text: 'Do You Confirm Order',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.updateSales();
        this.http
          .put<any>(
            `https://econimic-pricing.onrender.com/api/v1/product/update-sold-item/${productCode}/${quantity}`,
            {}
          )
          .subscribe(
            (response) => {
              // Handle success response if needed
              console.log('Sold item updated successfully:', response);
              // Optionally, show a success message using SweetAlert
              Swal.fire(
                'Success',
                'Purchase completed successfully',
                'success'
              );
            },
            (error) => {
              // Handle error response if needed
              console.error('Error updating sold item:', error);
              // Optionally, show an error message using SweetAlert
              Swal.fire('Error', 'Failed to update sold item', 'error');
            }
          );
        // Store the necessary details
        localStorage.setItem(
          'orderDetails',
          JSON.stringify({
            products: this.products,
            subTotal: this.subTotal,
            discount: this.discount,
            discountType: this.discountType,
          })
        );

        const modalRef = this.modalService.open(ReceiptModalComponent);
      }
    });
  }

  updateSales() {
    const productCode = this.products[0].productCode;
    const quantity = this.cartForm.value.quantity;

    // Calculate subtotal or use this.products.sellingPrice directly if available
    // const subTotal = this.products.sellingPrice * quantity;

    // Update the subtotal value
    // this.subTotal = subTotal;

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
        this.http
          .put<any>(
            `https://econimic-pricing.onrender.com/api/v1/product/update-sold-item/${productCode}/${quantity}`,
            {}
          )
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
