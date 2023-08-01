import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  collection: string = 'gastos'
  constructor(private firestore: Firestore) { }

  conGastos(data: any) {
    let response: any = null
    let action = data.action;
    switch (action) {
      case 'obtenerGastos':
        response = this.obtenerGastos()
        break
      case 'obtenerGasto':
        response = this.obtenerGasto(data)
        break
      case 'agregarGasto':
        response = this.agregarGasto(data)
        break
      case 'actualizarGasto':
        response = this.actualizarGasto(data)
        break
      case 'eliminarGasto':
        response = this.eliminarGasto(data)
        break
      default:
        response = { result: "error", message: "No existe esta acción" }
        break
    }
    return response
  }

  obtenerGastos() { }
  obtenerGasto(data: any) { }
  agregarGasto(data: any) { }
  actualizarGasto(data: any) { }
  eliminarGasto(data: any) { }

}
