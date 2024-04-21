import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.scss'
})
export class UploadProductComponent implements OnInit{

  productForm: FormGroup;
  constructor(private fb: FormBuilder, ){
    this.productForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productCategory: ['', Validators.required],
      productQuantity: ['', Validators.required],
      productBrand: ['', Validators.required],
      productMaterial: ['', Validators.required],
      productDescription: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.productForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product added successfully!'
      });
      // Reset form after successful submission
      this.productForm.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Form invalid. Please fill in all required fields!'
      });
    }
  }
}
