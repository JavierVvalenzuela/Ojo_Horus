import { TestBed } from '@angular/core/testing';

import { BdServicioService } from './bd-servicio.service';

describe('BdServicioService', () => {
  let service: BdServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdServicioService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
