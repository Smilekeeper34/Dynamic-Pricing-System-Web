import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPricesComponent } from './set-prices.component';

describe('SetPricesComponent', () => {
  let component: SetPricesComponent;
  let fixture: ComponentFixture<SetPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetPricesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
