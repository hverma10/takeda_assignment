import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockProduct } from 'src/mock/productList';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let mockProductList = mockProduct;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.productList = mockProductList;
    fixture.detectChanges();
  });

  it('Product List : should create', () => {
    expect(component).toBeTruthy();
  });

  it('to verify Product name iPhone 9 after data load', () => {
    let prodName = fixture.nativeElement.querySelector('.product_name')
    expect(prodName.innerText).toBe('Product Name: iPhone 9');
  });
});
