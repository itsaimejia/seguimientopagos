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
  phone?: string
  constructor(private service: ServicesService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.phone = "asdasda"
  }

  onLogin() {
    if (!/^\d{10}$/.test(this.phone!)) {
      this.service.showAlert(
        'Atención',
        'Ingresa un número de teléfono a 10 dígitos'
      );
    } else {
      let data = {
        collection: 'users',
        method: 'getUserData',
        phone: this.phone,
      };

      this.service.conFirestore(data, true)
        .then((response) => {
          if (response.result == 'success') {
            this.guardarSesion(response.user).then(() => {
              this.navCtrl.navigateForward([
                '/tabs',
              ]);
            })
          } else {
            this.service.showAlert('Atención', response.message);
          }
        })
        .catch((e) => {
          this.service.showAlert('Error', e);
        });
    }
  }

  async guardarSesion(user: any) {
    await Preferences.set({
      key: 'seguimientopagos-user-data',
      value: JSON.stringify({
        user: user,
      }),
    });
  }
}
