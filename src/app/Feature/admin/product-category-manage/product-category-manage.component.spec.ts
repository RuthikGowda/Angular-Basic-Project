import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryManageComponent } from './product-category-manage.component';

describe('ProductCategoryManageComponent', () => {
  let component: ProductCategoryManageComponent;
  let fixture: ComponentFixture<ProductCategoryManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCategoryManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
