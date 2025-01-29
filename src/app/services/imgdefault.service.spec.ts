import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImgdefaultService } from './imgdefault.service';

describe('ImgdefaultService', () => {
  let service: ImgdefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImgdefaultService], 
    });
    service = TestBed.inject(ImgdefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
