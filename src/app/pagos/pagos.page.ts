import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DetallePagoComponent } from '../detalle-pago/detalle-pago.component';
import { NuevaRentaComponent } from '../nueva-renta/nueva-renta.component';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  pagosPendientes: any = [
    {
      fecha: '23/07/2023',
      cliente: 'Pedro algo',
      total: 4003,
      pagado: 2002,
      restante: 2002
    },
  ]

  pagosCompletados: any = [
    {
      fecha: '23/07/2023',
      cliente: 'Gonzalo algo',
      total: 400,
      pagado: 400,
      restante: 0
    },

  ]

  on_buscar: boolean = false

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  abrirBuscador() {
    this.on_buscar = !this.on_buscar;
  }

  async seleccionarPago(p: any) {
    const modal = await this.modalController.create({
      component: DetallePagoComponent,
      componentProps: {
        data_pago: p
      }
    });

    modal.present()
  }

  async modalNuevaRenta() {
    const modal = await this.modalController.create({
      component: NuevaRentaComponent,
    });

    modal.present()
  }




}
