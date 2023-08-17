import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-desglose-corte',
  templateUrl: './desglose-corte.component.html',
  styleUrls: ['./desglose-corte.component.scss'],
})
export class DesgloseCorteComponent implements OnInit {
  listaPagos = [
    {
      fecha: '10/12/2020',
      monto: 2002
    },
    {
      fecha: '10/12/2020',
      monto: 2003
    },
    {
      fecha: '10/12/2020',
      monto: 2004
    },
    {
      fecha: '10/12/2020',
      monto: 2004
    },
    {
      fecha: '10/12/2020',
      monto: 2004
    },
    {
      fecha: '10/12/2020',
      monto: 2002
    },
    {
      fecha: '10/12/2020',
      monto: 2003
    },
    {
      fecha: '10/12/2020',
      monto: 2004
    },
    {
      fecha: '10/12/2020',
      monto: 2004
    },
    {
      fecha: '10/12/2020',
      monto: 2004
    },
    {
      fecha: '10/12/2020',
      monto: 2002
    },
    {
      fecha: '10/12/2020',
      monto: 2003
    },
    {
      fecha: '10/12/2020',
      monto: 2004
    },
    {
      fecha: '10/12/2020',
      monto: 2004
    },
    {
      fecha: '10/12/2020',
      monto: 2004
    },
  ]

  listaGastos = [
    {
      fecha: '10/12/2020',
      monto: 2002
    },
    {
      fecha: '10/12/2020',
      monto: 2003
    },
    {
      fecha: '10/12/2020',
      monto: 2004
    },
    {
      fecha: '10/12/2020',
      monto: 2004
    },
  ]

  totalPagos?: number = 0
  totalGastos?: number = 0

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  cerrarModal() {
    this.modalController.dismiss();
  }

}
