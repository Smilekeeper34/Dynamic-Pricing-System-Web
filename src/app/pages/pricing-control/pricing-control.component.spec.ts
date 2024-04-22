import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingControlComponent } from './pricing-control.component';

describe('PricingControlComponent', () => {
  let component: PricingControlComponent;
  let fixture: ComponentFixture<PricingControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricingControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
