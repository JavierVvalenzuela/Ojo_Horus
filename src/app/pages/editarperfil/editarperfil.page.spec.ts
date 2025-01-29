import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarperfilPage } from './editarperfil.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { BdServicioService } from '../../services/bd-servicio.service';

// Crea un mock del servicio SQLite
class SQLiteMock {
  executeSql = jasmine.createSpy('executeSql').and.returnValue(Promise.resolve());
}

describe('EditarperfilPage', () => {
  let component: EditarperfilPage;
  let fixture: ComponentFixture<EditarperfilPage>;

  beforeEach(() => {
    const mockUser = { nick_usuario: 'testUser' };  

    TestBed.configureTestingModule({
      declarations: [EditarperfilPage],
      imports: [HttpClientTestingModule],
      providers: [
        BdServicioService,
        { provide: SQLite, useClass: SQLiteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarperfilPage);
    component = fixture.componentInstance;


    component.Pusuario = mockUser;  

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
