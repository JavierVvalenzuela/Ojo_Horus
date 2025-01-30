import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPage } from './menu.page';
import { BdServicioService } from '../../services/bd-servicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('MenuPage', () => {
  let component: MenuPage;
  let fixture: ComponentFixture<MenuPage>;
  let sqliteMock: any;
  let bdServicioMock: any;

  beforeEach(() => {
    sqliteMock = {
      executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({ rows: { length: 0 } })),
    };

    bdServicioMock = {
      agregarPost: jasmine.createSpy('agregarPost').and.returnValue(Promise.resolve()),
      buscarPost: jasmine.createSpy('buscarPost').and.returnValue(Promise.resolve()),
      fetchPost: jasmine.createSpy('fetchPost').and.returnValue(of([])),
    };

    TestBed.configureTestingModule({
      declarations: [MenuPage],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BdServicioService, useValue: bdServicioMock },
        { provide: SQLite, useValue: sqliteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
