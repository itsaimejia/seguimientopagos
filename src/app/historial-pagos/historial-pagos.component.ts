import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.scss'],
})
export class HistorialPagosComponent implements OnInit {

  historialPagos: any = [
    {
      fecha: "10/12/2012",
      responsable: "Donato",
      monto: 200
    },
    {
      fecha: "12/12/2012",
      responsable: "Donato",
      monto: 100
    },
  ]
  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  cerrarModal() {
    this.modalController.dismiss();
  }

}
