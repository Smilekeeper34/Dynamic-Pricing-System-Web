import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../tools/services/user.service';
import { AuthService } from '../../tools/services/auth.service';

@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.scss'
})
export class UploadProductComponent implements OnInit {
  currentUser: any;
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private userService: UserService,private authService: AuthService,) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productCurrency: ['', Validators.required],
      productPrice: ['', Validators.required],
      productCategory: ['', Validators.required],
      productQuantity: ['', Validators.required],
      productBrand: ['', ],
      productMaterial: ['', ],
      productDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.authService.isLoggedIn()
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = {
        name: this.productForm.value.productName,
        currency:this.productForm.value.productCurrency,
        costPrice: this.productForm.value.productPrice,
        description: this.productForm.value.productDescription,
        category: this.productForm.value.productCategory,
        quantity: this.productForm.value.productQuantity
      };

      // Show loading spinner
      Swal.fire({
        title: 'Please wait...',
        showConfirmButton: false,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading();
        }
      });

      // Make POST request to API
      this.http.post<any>('https://econimic-pricing.onrender.com/api/v1/product/save', formData).subscribe(
        (response) => {
          // Handle success
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Product added successfully!'
          });
          // Reset form after successful submission
          this.productForm.reset();
        },
        (error) => {
          // Handle error
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again later!'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Form invalid. Please fill in all required fields!'
      });
    }
  }
}
