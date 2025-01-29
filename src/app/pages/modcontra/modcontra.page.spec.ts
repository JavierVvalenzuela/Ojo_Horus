import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModcontraPage } from './modcontra.page';
import { BdServicioService } from '../../services/bd-servicio.service';
import { ImgdefaultService } from '../../services/imgdefault.service'; 
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';


// Mock vacío para SQLite
class SQLiteMock {
  executeSql(query: string, params: any[]): Promise<any> {
    return Promise.resolve({ rows: { length: 1, item: () => ({ id_usuario: 1, contrasena_usuario: 'hashedpass' }) } });
  }
}
const bdServicioMock = {
  fetchUsuarios: jasmine.createSpy('fetchUsuarios').and.returnValue({
    subscribe: (callback: any) => callback([{ id_usuario: 1, contrasena_usuario: 'hashedpass' }]),
  }),
  buscarUsuarios: jasmine.createSpy('buscarUsuarios'),
  cambiarContrasenaUsuario: jasmine.createSpy('cambiarContrasenaUsuario').and.returnValue(Promise.resolve(true)),
};

describe('ModcontraPage', () => {
  let component: ModcontraPage;
  let fixture: ComponentFixture<ModcontraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModcontraPage],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BdServicioService, useValue: bdServicioMock },
        ImgdefaultService,
        { provide: SQLite, useClass: SQLiteMock },
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(ModcontraPage);
    component = fixture.componentInstance;
  
    fixture.detectChanges();
    await fixture.whenStable(); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});