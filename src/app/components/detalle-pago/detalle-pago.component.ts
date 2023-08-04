import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, AlertInput, ModalController } from '@ionic/angular';
import { getFechaActual, validarCampo, validarCelular, validarPago } from 'src/generales/generales';
import { HistorialPagosComponent } from '../historial-pagos/historial-pagos.component';
import { ServicesService } from 'src/services/services.service';
import { reduce } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: 'detalle-pago.component.html',
  styleUrls: ['detalle-pago.component.scss'],
})
export class DetallePagoComponent implements OnInit {

  data_pago?: any
  pago_completo?: boolean
  fecha_actual?: string
  monto_pago?: number
  notas?: string
  pagado?: number
  restante?: number
  timeout: any

  usuario?: any = []
  historialPagos?: any = []
  eliminar_cliente?: boolean = false

  constructor(private modalController: ModalController,
    private actionSheet: ActionSheetController,
    private alertCtrl: AlertController,
    private service: ServicesService) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    const ret: any = await Preferences.get({ key: 'seguimientopagos-user-data' });
    const res = JSON.parse(ret.value)
    this.usuario = res.usuario
    this.obtenerHistorialPagos()
    this.pago_completo = this.restante == 0
    this.fecha_actual = getFechaActual()
    this.notas = this.data_pago.notas
    this.restante = this.data_pago.restante

  }

  obtenerHistorialPagos() {
    let data = {
      collection: 'historial-pagos',
      action: 'obtenerHistorialPagos',
      idpago: this.data_pago.idpago
    };

    this.service.conFirestore(data, true)
      .then((response) => {
        if (response.result == 'success') {
          this.historialPagos = response.historialPagos
          const sumPagado = this.historialPagos.map((hp: any) => Number(hp.monto)).reduce((a: number, b: number) => a + b)
          this.pagado = sumPagado
          this.restante = Number(this.data_pago.total) - Number(this.pagado ?? 0)
        }
      })
      .catch((e) => {
        this.service.showAlert('Error', e);
      });
  }

  async handlerActualizarPago() {
    let valido =
      await validarCampo(this.monto_pago, 'el pago') && (await validarPago(this.monto_pago!, this.restante!, 'restante'))
    if (valido) {
      const alert = await this.alertCtrl.create({
        header: 'Atención',
        subHeader: '¿El monto ingresado es correcto?',
        message: `Pagado: $${this.monto_pago}`,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => { },
          },
          {
            text: 'Sí',
            handler: () => {
              this.actualizarPago()
            },
          },
        ],
      });
      await alert.present();
    }
  }

  actualizarPago() {
    let data = {
      collection: 'pagos',
      action: 'actualizarPago',
      pagado: Number(this.pagado ?? 0) + Number(this.monto_pago ?? 0),
      monto_pago: this.monto_pago,
      idpago: this.data_pago.idpago,
      restante: this.restante,
      notas: this.notas ?? '',
      idusuario: this.usuario.idusuario,
      responsable: this.usuario.nombre,
    };
    this.service.conFirestore(data, true)
      .then((response) => {
        if (response.result == 'success') {
          this.service.showToast(response.mensaje);
          this.modalController.dismiss({ pago: response.pago })
        } else {
          this.service.showAlert('Error 1', response.mensaje);
        }
      })
      .catch((e) => {
        console.log(e)
        this.service.showAlert('Error 2', e);
      });

  }

  async handlerEliminarHistorialPagos() {
    let _inputs: any = []
    let idshp_eliminar: any = []
    this.historialPagos.forEach((e: any) => {
      _inputs.push({
        type: 'checkbox',
        label: `${e.responsable!}: $${e.monto!} - (${e.fecha!}) `,
        checked: false,
        value: e.idhistorialpago,
        handler(input: any) {
          if (input.checked) {
            idshp_eliminar.push(input.value)
          } else {
            if (idshp_eliminar.some((id: any) => input.value.includes(id))) {
              idshp_eliminar = idshp_eliminar.filter((id: any) => id != input.value)
            }
          }
        },
      })
    })
    const al = await this.alertCtrl.create({
      header: 'Atención',
      subHeader: 'Eliminar pagos del historial',
      message: 'Selecciona los pagos a eliminar',
      inputs: _inputs,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Sí',
          handler: () => {
            if (idshp_eliminar.length > 0) {
              idshp_eliminar.forEach((idhistorialpago: any) => {
                this.eliminarHistorialPago(idhistorialpago)
              });
              this.obtenerHistorialPagos()
            }
          },
        },
      ],
    });
    await al.present();
  }

  eliminarHistorialPago(idhistorialpago: any) {
    let data = {
      collection: 'historial-pagos',
      action: 'eliminarHistorialPago',
      idhistorialpago: idhistorialpago
    };
    this.service.conFirestore(data, true)
      .then(() => { })
      .catch((e) => {
        this.service.showAlert('Error', e);
      });
  }

  async handlerEliminarPago() {
    let eliminar_cliente: boolean = false
    const al = await this.alertCtrl.create({
      header: 'Atención',
      subHeader: 'Eliminar pago',
      message: 'También eliminaras el historial de pagos vinculados a este pago',
      inputs: [
        {
          type: 'checkbox',
          label: '¿Eliminar cliente?',
          checked: false,
          handler(input: any) {
            eliminar_cliente = input.checked
          },
        }
      ],
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Sí',
          handler: () => {
            this.eliminar_cliente = eliminar_cliente
            this.eliminarPago();
          },
        },
      ],
    });
    await al.present();

  }

  eliminarPago() {
    let data = {
      collection: 'pagos',
      action: 'eliminarPago',
      celular: this.data_pago.celular,
      historialPagos: this.historialPagos,
      idpago: this.data_pago.idpago,
      eliminar_cliente: this.eliminar_cliente,
    };
    this.service.conFirestore(data, true)
      .then((response) => {
        if (response.result == 'success') {
          this.service.showToast(response.mensaje);
          this.modalController.dismiss({ result: response.result });
        } else {
          this.service.showAlert('Error', response.mensaje);
        }
      })
      .catch((e) => {
        this.service.showAlert('Error', e);
      });
  }

  calcularRestante(event: any) {
    if (this.timeout != null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.restante = Number(this.data_pago.total) - Number(this.pagado) - Number(this.monto_pago ?? 0)
    }, 500);
  }

  async mostrarOpciones() {
    const action = await this.actionSheet.create({
      header: 'Acciones para este pago',
      buttons: [
        {
          text: 'Eliminar pago',
          handler: () => {
            this.handlerEliminarPago()
          }
        },
        {
          text: 'Eliminar pagos del historial',
          handler: () => {
            this.handlerEliminarHistorialPagos()
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    })
    action.present()
  }

  async abrirModalHistorialPagos() {
    const modal = await this.modalController.create({
      component: HistorialPagosComponent,
      componentProps: {
        historialPagos: this.historialPagos
      }
    });
    modal.present()
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
