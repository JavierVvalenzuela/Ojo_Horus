import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentariosPage } from './comentarios.page';
import { BdServicioService } from '../../services/bd-servicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

describe('ComentariosPage', () => {
  let component: ComentariosPage;
  let fixture: ComponentFixture<ComentariosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComentariosPage],
      imports: [HttpClientTestingModule], 
      providers: [
        BdServicioService,
        { provide: SQLite, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
