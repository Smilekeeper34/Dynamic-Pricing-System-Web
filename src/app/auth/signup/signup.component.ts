import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

registerForm:FormGroup;

constructor(private router: Router){
  this.registerForm = new FormGroup({});
}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }


  onSubmit() {
    if (this.registerForm.valid) {
      // Authentication logic here (e.g., send data to server)
      const formData = this.registerForm.value;
      console.log('Login data:', formData);
      this.router.navigate(['/dashboard']);
   }
    }
}
