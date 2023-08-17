import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from 'src/services/services.service';
import { DesgloseCorteComponent } from '../components/desglose-corte/desglose-corte.component';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-corte',
  templateUrl: './corte.page.html',
  styleUrls: ['./corte.page.scss'],
})
export class CortePage implements OnInit {

  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  segment?: string = "actual"
  fecha_inicio?: string = '-'
  fecha_fin?: string = '-'
  ingresos: number = 0
  egresos: number = 0
  balance: number = 0
  porcentaje: number = 0.333333

  usuariosPorcentajes: any = [
    {
      titulo: 'Gastos',
      porcentaje: this.ingresos * this.porcentaje
    },
    {
      titulo: 'Donato',
      porcentaje: this.ingresos * this.porcentaje
    },
    {
      titulo: 'Adan',
      porcentaje: this.ingresos * this.porcentaje
    },
  ]

  gananciasFinales: any = [
    {
      nombre: 'Donato',
      ganancia: this.usuariosPorcentajes[0].porcentaje - this.egresos + this.usuariosPorcentajes[1].porcentaje
    },
    {
      nombre: 'Adan',
      ganancia: this.usuariosPorcentajes[2].porcentaje
    }
  ]
  
  montosPorUsuarios: any = [
    {
      usuario: 'Donato',
      pagos: 10000,
      gastos: 1000,
      restante: 9000
    },
    {
      usuario: 'Adan',
      pagos: 10000,
      gastos: 1000,
      restante: 9000
    },
  ]

  cortesRealizados?: any = []

  constructor(private service: ServicesService,
    private modalController: ModalController,
    private alertCtrl: AlertController) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    const dt = new Date()
    const ag0s = (n: any) => n > 9 ? n : '0' + n
    this.fecha_fin = `${ag0s(dt.getDate())}/${ag0s(dt.getMonth() + 1)}/${ag0s(dt.getFullYear())}`
    this.obtenerDatos()
  }

  obtenerDatos() {
    this.obtenerCortes()
  }

  obtenerCortes() {
    let data = {
      collection: 'cortes',
      action: 'obtenerCortes',
    };
    this.service.conFirestore(data, true)
      .then((response) => {
        if (response.result == 'success') {
          this.cortesRealizados = response.cortesRealizados
          if (this.cortesRealizados.length > 0) {
            let fechafin = this.cortesRealizados[0].fecha_fin
            this.fecha_inicio = fechafin == "" ? '-' : fechafin
          }
        }
      })
      .catch((e) => {
        this.service.showAlert('Error', e);
      });
  }

  obtenerCorteActual() {
    let data = {
      collection: 'cortes',
      action: 'obtenerCorteActual',
    };



  }

  async handlerGenerarCorte() {

    const alert = await this.alertCtrl.create({
      header: '¿Generar corte?',
      message: `Confirmar generar corte`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.generarCorte()
          },
        },
      ],
    });
    await alert.present();
  }
  generarCorte() {

  }
  cambiarListaSwiper() {
    let index = this.swiperRef?.nativeElement.swiper.activeIndex
    this.segment = index == 1 ? "anteriores" : index == 0 ? "actual" : ""
  }

  cambiarListaSegment(event: any) {
    let otherIndex = event.detail.value == "actual" ? 0 : "anteriores" ? 1 : 0
    this.swiperRef?.nativeElement.swiper.slideTo(otherIndex, 500, false)
  }

  async abrirDesgloseModal() {
    const modal = await this.modalController.create({
      component: DesgloseCorteComponent,
    });
    modal.present()
  }
  
  actualizarCorteActual(event: any) {
    setTimeout(() => {
      this.obtenerDatos()
      event.target.complete();
    }, 2000);
  }

  seleccionarCorte(c: any, i: any) {
    console.log(c)
  }

}
