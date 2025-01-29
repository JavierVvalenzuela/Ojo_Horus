import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPage } from './menu.page';
import { BdServicioService } from '../../services/bd-servicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MenuPage', () => {
  let component: MenuPage;
  let fixture: ComponentFixture<MenuPage>;
  let sqliteMock: any;

  beforeEach(() => {
    sqliteMock = {
      executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({ rows: { length: 0 } })),
    };

    TestBed.configureTestingModule({
      declarations: [MenuPage],
      imports: [HttpClientTestingModule],
      providers: [
        BdServicioService,
        { provide: SQLite, useValue: sqliteMock },
      ],
    }).compileComponents();

    // Crear el fixture y componente
    fixture = TestBed.createComponent(MenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
