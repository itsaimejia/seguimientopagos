import { Component, OnInit } from '@angular/core';
import { NuevoGastoComponent } from '../components/nuevo-gasto/nuevo-gasto.component';
import { AlertController, ModalController } from '@ionic/angular';
import { ServicesService } from 'src/services/services.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  gastosRealizados: any = []

  constructor(private modalController: ModalController,
    private alertCtrl: AlertController,
    private service: ServicesService) { }

  ngOnInit() {
    this.obtenerDatos()
  }

  obtenerDatos() {
    let data = {
      collection: 'gastos',
      action: 'obtenerGastos',
    };
    this.service.conFirestore(data, true)
      .then((response) => {
        if (response.result == 'success') {
          this.gastosRealizados = response.gastosRealizados
        }
      })
      .catch((e) => {
        this.service.showAlert('Error', e);
      });
  }
  async modalNuevoGasto() {
    const modal = await this.modalController.create({
      component: NuevoGastoComponent,
    });

    modal.present()
    modal.onDidDismiss().then((data) => {
      if (data.data != undefined) {
        let gasto = data.data.gasto
        this.gastosRealizados.unshift(gasto)
      }
    })
  }
  async mostrarDescripcion(d: any) {
    const alert = await this.alertCtrl.create({
      header: "Descripción",
      message: d,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  handleEliminar(g: any) {
    console.log(g)
  }

  handleEditar(g: any) {
    console.log(g)
  }

  actualizarGastos(event: any) {
    setTimeout(() => {
      this.obtenerDatos()
      event.target.complete();
    }, 2000);
  }

}
