import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComunidadesPage } from './comunidades.page';

describe('ComunidadesPage', () => {
  let component: ComunidadesPage;
  let fixture: ComponentFixture<ComunidadesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
