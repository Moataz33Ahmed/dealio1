import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedProductsComponent } from './listed-products.component';

describe('ListedProductsComponent', () => {
  let component: ListedProductsComponent;
  let fixture: ComponentFixture<ListedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
