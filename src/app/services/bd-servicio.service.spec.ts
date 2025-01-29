import { TestBed } from '@angular/core/testing';
import { BdServicioService } from './bd-servicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Agregado para simular HttpClient

describe('BdServicioService', () => {
  let service: BdServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BdServicioService,
        { provide: SQLite, useValue: {} }  
      ]
    });
    service = TestBed.inject(BdServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
