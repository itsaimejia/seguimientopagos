import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetallePagoComponent } from './detalle-pago/detalle-pago.component';
import { NuevaRentaComponent } from './nueva-renta/nueva-renta.component';
import { HistorialPagosComponent } from './historial-pagos/historial-pagos.component';
import { NuevoGastoComponent } from './nuevo-gasto/nuevo-gasto.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { ServicesService } from 'src/services/services.service';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';

@NgModule({
  declarations: [AppComponent, DetallePagoComponent, NuevaRentaComponent, HistorialPagosComponent, NuevoGastoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage())],
  providers: [
    ServicesService,
    SpinnerDialog,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
