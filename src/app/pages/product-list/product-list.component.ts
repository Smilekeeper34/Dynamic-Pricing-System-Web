import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { tableData } from './table-data';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: any[] = tableData;

  constructor(){}
}
