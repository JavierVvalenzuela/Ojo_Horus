import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CamaraComponent } from './camara.component';

describe('CamaraComponent', () => {
  let component: CamaraComponent;
  let fixture: ComponentFixture<CamaraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CamaraComponent  // Importar el componente standalone directamente aquí
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CamaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
