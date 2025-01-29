import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarPasswordPage } from './recuperar-password.page';
import { BdServicioService } from '../../services/bd-servicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';  

describe('RecuperarPasswordPage', () => {
  let component: RecuperarPasswordPage;
  let fixture: ComponentFixture<RecuperarPasswordPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarPasswordPage],
      imports: [HttpClientTestingModule],  
      providers: [
        BdServicioService,
        { provide: SQLite, useValue: {} }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
