import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilusuarioPage } from './perfilusuario.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImgdefaultService } from '../../services/imgdefault.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; 

describe('PerfilusuarioPage', () => {
  let component: PerfilusuarioPage;
  let fixture: ComponentFixture<PerfilusuarioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilusuarioPage],
      imports: [HttpClientTestingModule],
      providers: [
        ImgdefaultService,
        { provide: SQLite, useValue: {} },
      ], 
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
