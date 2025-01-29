import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliticadeusuarioPage } from './politicadeusuario.page';

describe('PoliticadeusuarioPage', () => {
  let component: PoliticadeusuarioPage;
  let fixture: ComponentFixture<PoliticadeusuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticadeusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
