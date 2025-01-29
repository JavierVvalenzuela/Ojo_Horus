import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarPasswordPage } from './cambiar-password.page';
import { BdServicioService } from '../../services/bd-servicio.service';
import { ImgdefaultService } from '../../services/imgdefault.service'; 
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';

class SQLiteMock {
  executeSql() {
    return new Promise((resolve) => {
      resolve({
        rows: { length: 0, item: () => ({}) }
      });
    });
  }
}

describe('CambiarPasswordPage', () => {
  let component: CambiarPasswordPage;
  let fixture: ComponentFixture<CambiarPasswordPage>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambiarPasswordPage],
      imports: [HttpClientTestingModule],
      providers: [
        BdServicioService,
        ImgdefaultService,
        { provide: SQLite, useClass: SQLiteMock },
        ChangeDetectorRef
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarPasswordPage);
    component = fixture.componentInstance;
    changeDetectorRef = TestBed.inject(ChangeDetectorRef);

    fixture.detectChanges(); 
    changeDetectorRef.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
