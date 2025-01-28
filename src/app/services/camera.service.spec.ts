import { TestBed } from '@angular/core/testing';

import { CameraService } from './camera.service';

describe('CameraService', () => {
  let service: CameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
