import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getFechaActual } from 'src/generales/generales';

@Component({
  selector: 'app-nueva-renta',
  templateUrl: './nueva-renta.component.html',
  styleUrls: ['./nueva-renta.component.scss'],
})
export class NuevaRentaComponent implements OnInit {

  buscado?: boolean = false
  fecha_actual?: string

  constructor(private modalController: ModalController,) { }

  ngOnInit() {
    const now = new Date();
    this.fecha_actual = getFechaActual()
  }

  onBuscar() {
    this.buscado = true
  }

  cerrarModal() {
    this.modalController.dismiss();
  }


}
