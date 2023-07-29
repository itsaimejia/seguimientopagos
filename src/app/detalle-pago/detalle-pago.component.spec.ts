import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallePagoComponent } from './detalle-pago.component';

describe('DetallePagoComponent', () => {
  let component: DetallePagoComponent;
  let fixture: ComponentFixture<DetallePagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePagoComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});