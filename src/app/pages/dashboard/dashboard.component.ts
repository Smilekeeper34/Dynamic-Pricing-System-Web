import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../tools/services/user.service';
import { AuthService } from '../../tools/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [SidebarComponent,CommonModule,FormsModule,RouterModule]
})
export class DashboardComponent implements OnInit {
    currentUser: any;

    constructor(private userService: UserService,public authService: AuthService,){}
    ngOnInit(): void {
        this.authService.isLoggedIn()
    }
    
}
