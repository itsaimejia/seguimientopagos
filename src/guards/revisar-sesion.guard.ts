import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RevisarSesionGuard implements CanActivate {

  constructor(private navCtrl: NavController) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validarSesion();
  }

  async validarSesion() {
    const ret: any = await Preferences.get({ key: 'seguimientopagos-user-data' });
    const user = JSON.parse(ret.value);
    if (user) {
      this.navCtrl.navigateRoot(["/tabs"]);
      return false;
    } else {
      return true;
    }
  }
}
