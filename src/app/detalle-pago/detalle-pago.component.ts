import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getFechaActual } from 'src/generales/generales';
import { HistorialPagosComponent } from '../historial-pagos/historial-pagos.component';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: 'detalle-pago.component.html',
  styleUrls: ['detalle-pago.component.scss'],
})
export class DetallePagoComponent implements OnInit {

  data_pago?: any
  pago_completo?: boolean
  fecha_actual?: string
  constructor(private modalController: ModalController,) { }

  ngOnInit() {
    this.pago_completo = this.data_pago.restante == 0
    this.fecha_actual = getFechaActual()
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async abrirModalHistorialPagos() {
    const modal = await this.modalController.create({
      component: HistorialPagosComponent,
    });

    modal.present()
  }
}
