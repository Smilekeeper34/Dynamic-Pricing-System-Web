import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductService } from '../../tools/services/product.service';

@Component({
  selector: 'app-set-prices',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './set-prices.component.html',
  styleUrl: './set-prices.component.scss',
})
export class SetPricesComponent {
  productForm: FormGroup;
  products: any[] = [];
  selectedProduct: any;
  loading = false;
  productSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      productCode: ['', Validators.required],
      productQuantity: ['', Validators.required],
    });

    this.productSubscription = this.productService.getProductList().subscribe(
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

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  onSubmit() {
    console.log(this.productForm.value);
    
    if (this.productForm.valid) {
      const productCode = this.productForm.value.productCode;
      const quantity = this.productForm.value.productQuantity;
  

      console.log(productCode);
      Swal.fire({
        title: 'Please wait',
        html: 'Updating product quantity...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      // Perform PUT request to update quantity
      this.http.put<any>(`https://econimic-pricing.onrender.com/api/v1/product/update-quantity/${productCode}/${quantity}`, {})
        .subscribe(
          () => {
            Swal.close(); // Close Swal loader
            // Show success message using SweetAlert
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Product Quantity Updated Successfully!'
            });
            // Reset form after successful submission
            this.productForm.reset();
          },
          (error) => {
            Swal.close(); // Close Swal loader
            // Show error message using SweetAlert
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to update product quantity. Please try again!'
            });
            console.error('Error updating product quantity:', error);
          }
        );
    } else {
      // Show validation error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Form invalid. Please fill in all required fields!'
      });
    }
  }
  

  onProductSelected(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const productCode = selectElement.value;
    this.selectedProduct = this.products.find(product => product.productCode === productCode);
  }

}
