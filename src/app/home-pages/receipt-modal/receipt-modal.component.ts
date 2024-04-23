import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt-modal.component.html',
  styleUrl: './receipt-modal.component.scss'
})
export class ReceiptModalComponent implements OnInit{
  orderDetails: any;

  constructor() { }

  ngOnInit(): void {
    this.orderDetails = JSON.parse(localStorage.getItem('orderDetails') || '{}');
  }
}
