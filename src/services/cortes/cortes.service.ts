import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CortesService {

  collection: string = 'cortes'
  constructor(private firestore: Firestore) { }

  conCortes(data: any) {
    let response: any = null
    let action = data.action;
    switch (action) {
      case 'obtenerCortes':
        response = this.obtenerCortes()
        break
      case 'obtenerCorte':
        response = this.obtenerCorte(data)
        break
      case 'agregarCorte':
        response = this.agregarCorte(data)
        break
      case 'actualizarCorte':
        response = this.actualizarCorte(data)
        break
      case 'eliminarCorte':
        response = this.eliminarCorte(data)
        break
      default:
        response = { result: "error", message: "No existe esta acción" }
        break
    }
    return response
  }

  obtenerCortes() { }
  obtenerCorte(data: any) { }
  agregarCorte(data: any) { }
  actualizarCorte(data: any) { }
  eliminarCorte(data: any) { }
}
