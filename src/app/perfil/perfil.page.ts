import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ionViewWillEnter() {

  }
  
  ngOnInit() {

  }

  async cerrarSesion() {
    await Preferences.clear().then(() => {
      this.navCtrl.navigateRoot('/');
    });
  }

}
