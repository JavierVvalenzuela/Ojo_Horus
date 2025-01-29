import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosbaneadosPage } from './usuariosbaneados.page';
import { BdServicioService } from '../../services/bd-servicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { ImgdefaultService } from '../../services/imgdefault.service';  

describe('UsuariosbaneadosPage', () => {
  let component: UsuariosbaneadosPage;
  let fixture: ComponentFixture<UsuariosbaneadosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosbaneadosPage],
      imports: [HttpClientTestingModule],  
      providers: [
        BdServicioService,
        ImgdefaultService,  
        { provide: SQLite, useValue: {} },  
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosbaneadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});