import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarComPage } from './editar-com.page';

describe('EditarComPage', () => {
  let component: EditarComPage;
  let fixture: ComponentFixture<EditarComPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
