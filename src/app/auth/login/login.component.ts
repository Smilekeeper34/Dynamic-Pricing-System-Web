import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../tools/services/auth.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../../tools/services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn()
  }

  onSubmit(): void {
    this.loaderService.show();
    this.authService.generateToken(this.loginForm.value).subscribe({
      next: (res: any) => { 
         this.loaderService.hide();
        this.authService.setToken(res.token);
      },
      error: (err: any) => {
        this.loaderService.hide();
      }
    });
  }
  
}
