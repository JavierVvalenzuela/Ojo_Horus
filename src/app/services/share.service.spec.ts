import { TestBed } from '@angular/core/testing';

import { ShareService } from './share.service';

describe('ShareService', () => {
  let service: ShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
