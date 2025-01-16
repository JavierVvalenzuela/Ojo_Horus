import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcuerdosLegalesPage } from './acuerdos-legales.page';

describe('AcuerdosLegalesPage', () => {
  let component: AcuerdosLegalesPage;
  let fixture: ComponentFixture<AcuerdosLegalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcuerdosLegalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
