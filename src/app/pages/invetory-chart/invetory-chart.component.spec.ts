import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvetoryChartComponent } from './invetory-chart.component';

describe('InvetoryChartComponent', () => {
  let component: InvetoryChartComponent;
  let fixture: ComponentFixture<InvetoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvetoryChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvetoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
