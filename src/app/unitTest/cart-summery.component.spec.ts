import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSummeryComponent } from 'shopping/components/cart-summery/cart-summery.component';

describe('CartSummeryComponent', () => {
  let component: CartSummeryComponent;
  let fixture: ComponentFixture<CartSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
