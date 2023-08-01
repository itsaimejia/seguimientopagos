import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DetallePagoComponent } from '../components/detalle-pago/detalle-pago.component';
import { NuevaRentaComponent } from '../components/nueva-renta/nueva-renta.component';
import { ServicesService } from 'src/services/services.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  pagosPendientes: any = []

  pagosCompletados: any = []

  on_buscar: boolean = false
  lista: string = "pendientes"

  constructor(public modalController: ModalController,
    private service: ServicesService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.obtenerDatos()
  }

  obtenerDatos() {
    let data = {
      collection: 'pagos',
      action: 'obtenerPagos',
    };

    this.service.conFirestore(data, true)
      .then((response) => {
        if (response.result == 'success') {
          this.pagosPendientes = response.pagosPendientes
          this.pagosCompletados = response.pagosCompletados
        }
      })
      .catch((e) => {
        this.service.showAlert('Error', e);
      });
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
    modal.onDidDismiss().then((data) => {
      if (data.data != undefined) {
        let pago = data.data.pago
        if (pago.restante == 0) {
          this.pagosCompletados.push(pago)
        } else {
          this.pagosPendientes.push(pago)
        }
      }
    })
  }

  cambiarLista(event: any) {
    this.lista = event.detail.value
  }

  actualizarPagos(event: any) {
    setTimeout(() => {
      this.obtenerDatos()
      event.target.complete();
    }, 2000);
  }
}
