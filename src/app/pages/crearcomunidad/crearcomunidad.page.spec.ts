import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearcomunidadPage } from './crearcomunidad.page';

describe('CrearcomunidadPage', () => {
  let component: CrearcomunidadPage;
  let fixture: ComponentFixture<CrearcomunidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearcomunidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe mostrar un error si el nombre de la comunidad está vacío o supera los 20 caracteres', () => {
    // Caso: Nombre vacío
    component.nombreComunidad = '';
    component.validarNombre();
    expect(component.errores.nombre).toEqual('El nombre no puede estar vacío.');

    // Caso: Nombre válido
    component.nombreComunidad = 'Nombre válido';
    component.validarNombre();
    expect(component.errores.nombre).toBeNull();

    // Caso: Nombre demasiado largo
    component.nombreComunidad = 'EsteNombreEsDemasiadoLargo';
    component.validarNombre();
    expect(component.errores.nombre).toEqual('El nombre no puede superar los 20 caracteres.');
  });

  it('Debe mostrar un error si la descripción supera los 250 caracteres', () => {
    // Caso: Descripción vacía
    component.descripcionComunidad = '';
    component.validarDescripcion();
    expect(component.errores.descripcion).toEqual('La descripción no puede estar vacía.');

    // Caso: Descripción válida
    component.descripcionComunidad = 'Esta es una descripción válida.';
    component.validarDescripcion();
    expect(component.errores.descripcion).toBeNull();

    // Caso: Descripción demasiado larga
    component.descripcionComunidad = 'a'.repeat(251);
    component.validarDescripcion();
    expect(component.errores.descripcion).toEqual('La descripción no puede superar los 250 caracteres.');
  });

  it('Debe mostrar un error si no hay categorías seleccionadas', () => {
    // Caso: Sin categorías seleccionadas
    component.categoriasSeleccionadas = [];
    component.validarCategorias();
    expect(component.errores.categorias).toEqual('Debe seleccionar al menos una categoría.');

    // Caso: Al menos una categoría seleccionada
    component.categoriasSeleccionadas = ['Categoría 1'];
    component.validarCategorias();
    expect(component.errores.categorias).toBeNull();
  });
  
});
