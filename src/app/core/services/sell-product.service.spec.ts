import { TestBed } from '@angular/core/testing';

import { SellProductService } from './sell-product.service';

describe('SellProductService', () => {
  let service: SellProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
