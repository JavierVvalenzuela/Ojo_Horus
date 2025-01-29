import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostreportadosPage } from './postreportados.page';

describe('PostreportadosPage', () => {
  let component: PostreportadosPage;
  let fixture: ComponentFixture<PostreportadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostreportadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
