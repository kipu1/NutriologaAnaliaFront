import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServicioComponent } from './lista-servicio.component';

describe('ListaServicioComponent', () => {
  let component: ListaServicioComponent;
  let fixture: ComponentFixture<ListaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
