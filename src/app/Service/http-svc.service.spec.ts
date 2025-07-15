import { TestBed } from '@angular/core/testing';

import { HttpSvcService } from './http-svc.service';

describe('HttpSvcService', () => {
  let service: HttpSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
