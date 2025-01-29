import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportarContenidoPage } from './reportar-contenido.page';

describe('ReportarContenidoPage', () => {
  let component: ReportarContenidoPage;
  let fixture: ComponentFixture<ReportarContenidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportarContenidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
