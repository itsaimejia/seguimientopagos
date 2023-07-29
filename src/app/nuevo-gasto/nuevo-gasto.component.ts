import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getFechaActual } from 'src/generales/generales';

@Component({
  selector: 'app-nuevo-gasto',
  templateUrl: './nuevo-gasto.component.html',
  styleUrls: ['./nuevo-gasto.component.scss'],
})
export class NuevoGastoComponent implements OnInit {

  fecha_actual?: string
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const now = new Date();
    this.fecha_actual = getFechaActual()
  }



  cerrarModal() {
    this.modalController.dismiss();
  }
}
