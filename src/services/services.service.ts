import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';
import { UserService } from './user.service';
import { ClientsService } from './clients.service';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private spinnerDialog: SpinnerDialog,
    private userService: UserService,
    private clientService: ClientsService) { }

  async conFirestore(data: any, loader: any): Promise<any> {
    let response: any = null

    if (loader) {
      this.spinnerDialog.show()
    }
    try {
      let collection: any = data.collection
      switch (collection) {
        case 'users':
          let user: any = await this.userService.conUsers(data)
          if (user.result == "success") {
            response = { result: "success", user: user }
          } else {
            response = { result: "error", message: user.message }
          }
          break
        case 'pays':
          break
        case 'bills':
          break
        case 'clients':
          response = { result: "success", client: await this.clientService.conClients(data) }
          break
        default:
          response = { result: "error", message: "No existe esa coleccion" }
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
}
