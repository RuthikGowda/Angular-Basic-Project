import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselManageComponent } from './carousel-manage.component';

describe('CarouselManageComponent', () => {
  let component: CarouselManageComponent;
  let fixture: ComponentFixture<CarouselManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
