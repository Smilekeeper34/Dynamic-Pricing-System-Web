import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-prices',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './set-prices.component.html',
  styleUrl: './set-prices.component.scss'
})
export class SetPricesComponent {
  productForm: FormGroup;
  constructor(private fb: FormBuilder, ){
    this.productForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productId:[''],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      
    });
  }


  onSubmit() {
    if (this.productForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product Price Updated Successfully!'
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
