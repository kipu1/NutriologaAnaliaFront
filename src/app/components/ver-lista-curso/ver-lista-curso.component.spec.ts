import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListaCursoComponent } from './ver-lista-curso.component';

describe('VerListaCursoComponent', () => {
  let component: VerListaCursoComponent;
  let fixture: ComponentFixture<VerListaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerListaCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerListaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
