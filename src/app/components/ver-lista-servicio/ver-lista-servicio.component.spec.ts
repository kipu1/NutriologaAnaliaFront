import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListaServicioComponent } from './ver-lista-servicio.component';

describe('VerListaServicioComponent', () => {
  let component: VerListaServicioComponent;
  let fixture: ComponentFixture<VerListaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerListaServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerListaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
