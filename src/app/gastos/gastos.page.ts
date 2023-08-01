import { Component, OnInit } from '@angular/core';
import { NuevoGastoComponent } from '../components/nuevo-gasto/nuevo-gasto.component';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  gastosRealizados = [
    {
      responsable: "Donato",
      fecha: "10/02/2022",
      monto: 200,
      descripcion: "se compro una capibara"
    },
    {
      responsable: "Donato",
      fecha: "10/02/2022",
      monto: 300,
      descripcion: "se compro una capibara"
    },
    {
      responsable: "Donato",
      fecha: "10/02/2022",
      monto: 400,
      descripcion: "se compro una capibara"
    },


  ]

  constructor(private modalController: ModalController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async modalNuevoGasto() {
    const modal = await this.modalController.create({
      component: NuevoGastoComponent,
    });

    modal.present()
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
    
  }

}
