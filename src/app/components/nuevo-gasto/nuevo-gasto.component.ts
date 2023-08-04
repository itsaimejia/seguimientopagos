import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AlertController, ModalController } from '@ionic/angular';
import { getFechaActual, validarCampo } from 'src/generales/generales';
import { ServicesService } from 'src/services/services.service';

@Component({
  selector: 'app-nuevo-gasto',
  templateUrl: './nuevo-gasto.component.html',
  styleUrls: ['./nuevo-gasto.component.scss'],
})
export class NuevoGastoComponent implements OnInit {

  fecha_actual?: string
  descripcion?: string
  monto?: number
  responsable?: string

  constructor(private modalController: ModalController,
    private service: ServicesService,
    private alertCtrl: AlertController) { }

  async ngOnInit() {
    this.fecha_actual = getFechaActual()
    const ret: any = await Preferences.get({ key: 'seguimientopagos-user-data' });
    const user = JSON.parse(ret.value);
    this.responsable = user.usuario.nombre
  }

  async handlerAgregarGasto() {
    let valido = await validarCampo(this.descripcion, 'la descripción') &&
      await validarCampo(this.monto, 'el monto')
    if (valido) {
      const alert = await this.alertCtrl.create({
        header: 'Atención',
        subHeader: '¿El monto ingresado es correcto?',
        message: `Monto: $${this.monto}`,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => { },
          },
          {
            text: 'Sí',
            handler: () => {
              this.agregarGasto()
            },
          },
        ],
      });
      await alert.present();
    }
  }

  agregarGasto() {
    let data = {
      collection: 'gastos',
      action: 'agregarGasto',
      descripcion: this.descripcion,
      monto: this.monto,
      responsable: this.responsable
    };
    this.service.conFirestore(data, true)
      .then((response) => {
        if (response.result == 'success') {
          this.service.showToast(response.mensaje);
          this.modalController.dismiss({ gasto: response.gasto })
        } else {
          this.service.showAlert('Error 1', response.mensaje);
        }
      })
      .catch((e) => {
        this.service.showAlert('Error 2', e);
      });

  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
