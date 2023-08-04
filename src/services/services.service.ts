import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';
import { ClientesService } from './clientes/clientes.service';
import { UsuariosService } from './usuarios/usuarios.service';
import { PagosService } from './pagos/pagos.service';
import { CortesService } from './cortes/cortes.service';
import { HistorialPagosService } from './historial-pagos/historial-pagos.service';
import { GastosService } from './gastos/gastos.service';



@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private spinnerDialog: SpinnerDialog,
    private clientesService: ClientesService,
    private usuariosService: UsuariosService,
    private pagosService: PagosService,
    private cortesService: CortesService,
    private historialPagosService: HistorialPagosService,
    private gastosService: GastosService,
    private toastCtrl: ToastController
  ) { }

  async conFirestore(data: any, loader: any): Promise<any> {
    let response: any = null

    if (loader) {
      this.spinnerDialog.show()
    }
    try {
      switch (data.collection) {
        case 'usuarios':
          response = await this.usuariosService.conUsuarios(data)
          break
        case 'pagos':
          response = await this.pagosService.conPagos(data)
          break
        case 'gastos':
          response = await this.gastosService.conGastos(data)
          break
        case 'clientes':
          response = await this.clientesService.conClientes(data)
          break
        case 'historial-pagos':
          response = await this.historialPagosService.conHistorialPagos(data)
          break
        case 'cortes':
          response = await this.cortesService.conCortes(data)
          break
        default:
          response = { result: "error", message: "No existe la colección" }
          break
      }
    } catch (e) {
      response = { result: "error", message: e }
    } finally {
      if (loader) {
        this.spinnerDialog.hide()
      }
      return response
    }
  }

  async showAlert(title: any, message: any) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      color: 'dark',
      position: 'top',
    });
    toast.present();
  }
}
