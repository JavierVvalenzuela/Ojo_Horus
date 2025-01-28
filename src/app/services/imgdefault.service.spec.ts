import { TestBed } from '@angular/core/testing';

import { ImgdefaultService } from './imgdefault.service';

describe('ImgdefaultService', () => {
  let service: ImgdefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgdefaultService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
