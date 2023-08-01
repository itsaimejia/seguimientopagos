import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from 'src/services/services.service';

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.scss'],
})
export class HistorialPagosComponent implements OnInit {

  idpago?: string
  historialPagos?: any = []
  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  ionViewWillEnter() { }

  cerrarModal() {
    this.modalController.dismiss();
  }



}
