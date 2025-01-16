import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosbaneadosPage } from './usuariosbaneados.page';

describe('UsuariosbaneadosPage', () => {
  let component: UsuariosbaneadosPage;
  let fixture: ComponentFixture<UsuariosbaneadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosbaneadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
