import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeguridadPage } from './seguridad.page';
import { BdServicioService } from '../../services/bd-servicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SeguridadPage', () => {
  let component: SeguridadPage;
  let fixture: ComponentFixture<SeguridadPage>;
  let sqliteMock: any;

  beforeEach(() => {
    sqliteMock = {
      executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve())
    };

    TestBed.configureTestingModule({
      declarations: [SeguridadPage],
      imports: [HttpClientTestingModule],
      providers: [
        BdServicioService,
        { provide: SQLite, useValue: sqliteMock },  
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
