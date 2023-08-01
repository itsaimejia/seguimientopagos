import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { getFechaActual } from 'src/generales/generales';
import { ServicesService } from 'src/services/services.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-nueva-renta',
  templateUrl: './nueva-renta.component.html',
  styleUrls: ['./nueva-renta.component.scss'],
})
export class NuevaRentaComponent implements OnInit {

  buscado?: boolean = false
  fecha_actual?: string
  celular?: string
  nombre?: string
  total?: number
  pagado?: number
  restante?: number
  idpago?: string
  notas?: string
  usuario?: any = []
  cliente_nuevo?: boolean = true
  timeout: any
  constructor(private modalController: ModalController,
    private service: ServicesService,
    private alertCtrl: AlertController,
    private navCtrl: NavController) { }

  async ngOnInit() {
    const ret: any = await Preferences.get({ key: 'seguimientopagos-user-data' });
    const res = JSON.parse(ret.value)
    this.usuario = res.usuario
    this.fecha_actual = getFechaActual()
    this.idpago = uuid.v4()
  }

  onBuscar() {
    if (this.validarCelular(this.celular)) {
      let data = {
        collection: 'clientes',
        action: 'obtenerCliente',
        celular: this.celular,
      };
      this.service.conFirestore(data, true)
        .then((response) => {
          if (response.result == 'success') {
            this.nombre = response.cliente.nombre
            this.cliente_nuevo = false
          }
        })
        .catch((e) => {
          this.service.showAlert('Error', e);
        });
      this.buscado = true
    }

  }

  async handlerAgregarRenta() {
    let valido = this.validarCampo(this.nombre, 'el nombre del cliente') &&
      this.validarCampo(this.total, 'el total') &&
      this.validarCampo(this.pagado, 'el pago') && this.validarPago(this.pagado!, this.total!) &&
      this.validarCelular(this.celular)
    if (valido) {
      const alert = await this.alertCtrl.create({
        header: 'Atención',
        subHeader: '¿Los montos ingresados son correctos?',
        message: `Total: $${this.total} | Pagado: $${this.pagado}`,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => { },
          },
          {
            text: 'Sí',
            handler: () => {
              this.agregarRenta()
            },
          },
        ],
      });
      await alert.present();
    }
  }

  agregarRenta() {
    let data = {
      collection: 'pagos',
      action: 'agregarPago',
      celular: this.celular,
      nombre: this.nombre,
      idpago: this.idpago,
      total: this.total,
      pagado: this.pagado,
      restante: this.restante,
      notas: this.notas ?? '',
      idusuario: this.usuario.idusuario,
      responsable: this.usuario.nombre,
      cliente_nuevo: this.cliente_nuevo
    };
    this.service.conFirestore(data, true)
      .then((response) => {
        if (response.result == 'success') {
          this.service.showAlert('Atención', response.mensaje);
          this.modalController.dismiss({ pago: response.pago })
        } else {
          this.service.showAlert('Error', response.mensaje);
        }
      })
      .catch((e) => {
        this.service.showAlert('Error', e);
      });

  }

  validarCampo(str: any, titulo: any) {
    str = str == undefined ? '' : str
    let res = str.trim().length > 0;
    if (!res) {
      this.service.showAlert(
        'Atención',
        `Ingresa ${titulo}`
      );
    }
    return res;
  }

  validarPago(pagado: number, total: number) {
    let res = Number(pagado ?? 0) <= Number(total ?? 0)
    if (!res) {
      this.service.showAlert(
        'Atención',
        'El valor del pago no puede superar el total'
      );
    }
    return res
  }

  validarCelular(celular: any) {
    let res = /^\d{10}$/.test(celular!)
    if (!res) {
      this.service.showAlert(
        'Atención',
        'Ingresa un número de teléfono a 10 dígitos'
      );
    }
    return res
  }

  calcularRestante(event: any) {
    if (this.timeout != null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.restante = Number(this.total ?? 0) - Number(this.pagado ?? 0)
    }, 500);
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}