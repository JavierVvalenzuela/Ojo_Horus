import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { BdServicioService } from '../../services/bd-servicio.service';
import { ImgdefaultService } from '../../services/imgdefault.service'; 
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock para SQLite que no devuelve datos
class SQLiteMock {
  executeSql(query: string, params: any[]) {
    return new Promise((resolve) => resolve({ rows: { length: 0 } }));
  }
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [HttpClientTestingModule],
      providers: [
        BdServicioService,
        ImgdefaultService,
        { provide: SQLite, useClass: SQLiteMock },  
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
