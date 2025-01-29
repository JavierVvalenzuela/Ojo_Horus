import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModcontraPage } from './modcontra.page';
import { BdServicioService } from '../../services/bd-servicio.service';
import { ImgdefaultService } from '../../services/imgdefault.service'; 
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock vacío para SQLite
class SQLiteMock {
  executeSql() {
    return new Promise((resolve) => {
      resolve({ rows: { length: 0, item: () => null } });
    });
  }
}

describe('ModcontraPage', () => {
  let component: ModcontraPage;
  let fixture: ComponentFixture<ModcontraPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModcontraPage],
      imports: [HttpClientTestingModule],
      providers: [
        BdServicioService,
        ImgdefaultService,
        { provide: SQLite, useClass: SQLiteMock }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});