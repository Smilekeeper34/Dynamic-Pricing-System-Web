import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderBarComponent } from "../header-bar/header-bar.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    imports: [SidebarComponent, HeaderBarComponent,RouterModule]
})
export class LayoutComponent {

}
