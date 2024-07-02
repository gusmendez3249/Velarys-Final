import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarSecionComponent } from './cerrar-secion.component';

describe('CerrarSecionComponent', () => {
  let component: CerrarSecionComponent;
  let fixture: ComponentFixture<CerrarSecionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CerrarSecionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CerrarSecionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
