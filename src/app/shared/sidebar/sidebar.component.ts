import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderBarComponent } from "../header-bar/header-bar.component";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [RouterModule, CommonModule, HeaderBarComponent]
})
export class SidebarComponent implements OnInit {

  constructor(){}
  
  ngOnInit(): void {
      
  }
}
