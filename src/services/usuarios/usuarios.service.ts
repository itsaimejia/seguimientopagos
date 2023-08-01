import { Injectable } from '@angular/core';
import { Firestore, doc, docData, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  collection: string = 'usuarios'
  constructor(private firestore: Firestore) { }

  conUsuarios(data: any) {

    let response: any = null
    try {
      let action = data.action;
      switch (action) {
        case 'obtenerUsuario':
          response = this.obtenerUsuario(data)
          break
        default:
          response = { result: "error", message: "No existe esta acción" }
          break
      }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }

  }

  async obtenerUsuario(data: any) {
    let response: any = null
    try {
      let usuario: any = await getDoc(
        doc(this.firestore, this.collection,
          data.celular
        ))
      if (usuario.exists()) {
        let u = usuario.data()
        u["idusuario"] = usuario.id
        response = { result: "success", usuario: u }
      } else {
        response = { result: "error", mensaje: "Ingresa un número válido" }
      }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }
  }
}
