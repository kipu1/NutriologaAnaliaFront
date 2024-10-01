import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDireccionComponent } from './crear-direccion.component';

describe('CrearDireccionComponent', () => {
  let component: CrearDireccionComponent;
  let fixture: ComponentFixture<CrearDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDireccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
