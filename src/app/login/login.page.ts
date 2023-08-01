import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from 'src/services/services.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  celular?: string
  constructor(private service: ServicesService,
    private navCtrl: NavController) { }

  ngOnInit() { }
  onLogin() {
    if (!/^\d{10}$/.test(this.celular!)) {
      this.service.showAlert(
        'Atención',
        'Ingresa un número de teléfono a 10 dígitos'
      );
    } else {
      let data = {
        collection: 'usuarios',
        action: 'obtenerUsuario',
        celular: this.celular,
      };

      this.service.conFirestore(data, true)
        .then((response) => {
          if (response.result == 'success') {
            this.guardarSesion(response.usuario).then(() => {
              this.navCtrl.navigateForward([
                '/tabs',
              ]);
            })
          } else {
            this.service.showAlert('Atención', response.mensaje);
          }
        })
        .catch((e) => {
          this.service.showAlert('Error', e);
        });
    }
  }

  async guardarSesion(usuario: any) {
    await Preferences.set({
      key: 'seguimientopagos-user-data',
      value: JSON.stringify({
        usuario: usuario,
      }),
    });
  }
}
