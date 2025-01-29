import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { BdServicioService } from '../../services/bd-servicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';  
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

// Mock para NativeStorage
class NativeStorageMock {
  setItem() {}
  getItem() {}
  remove() {}
}

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [HttpClientTestingModule], 
      providers: [
        BdServicioService, 
        { provide: SQLite, useValue: {} },
        { provide: NativeStorage, useClass: NativeStorageMock }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
