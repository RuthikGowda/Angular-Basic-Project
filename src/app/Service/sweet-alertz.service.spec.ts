import { TestBed } from '@angular/core/testing';

import { SweetAlertzService } from './sweet-alertz.service';

describe('SweetAlertzService', () => {
  let service: SweetAlertzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetAlertzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
