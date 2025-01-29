import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportarContenidoPage } from './reportar-contenido.page';
import { BdServicioService } from 'src/app/services/bd-servicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock de SQLite
class MockSQLite {
  // Mock de métodos de SQLite que se utilizan en el servicio
  executeSql(query: string, params: any[]) {
    return of({ rows: { length: 0, item: (index: number) => ({}) } });
  }
}

describe('ReportarContenidoPage', () => {
  let component: ReportarContenidoPage;
  let fixture: ComponentFixture<ReportarContenidoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportarContenidoPage],
      imports: [HttpClientTestingModule],
      providers: [
        BdServicioService,
        NavController,
        AlertController,
        { provide: SQLite, useClass: MockSQLite }, // Proporcionar el mock de SQLite
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportarContenidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
