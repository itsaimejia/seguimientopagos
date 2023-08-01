import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  collection: string = 'clientes'
  constructor(private firestore: Firestore) { }

  conClientes(data: any) {
    let response: any = null
    let action = data.action;
    switch (action) {
      case 'obtenerCliente':
        response = this.obtenerCliente(data)
        break
      case 'agregarCliente':
        response = this.agregarCliente(data)
        break
      default:
        response = { result: "error", message: "No existe esta acción" }
        break
    }
    return response
  }


  async obtenerCliente(data: any) {
    let response: any = null
    try {
      let cliente: any = await getDoc(
        doc(this.firestore, this.collection,
          data.celular
        ))
      if (cliente.exists()) {
        response = { result: "success", cliente: cliente.data() }
      } else {
        response = { result: "error" }
      }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }
  }

  agregarCliente(data: any) { }
  actualizarCliente(data: any) { }
  eliminarCliente(data: any) { }
}
