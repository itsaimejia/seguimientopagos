import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HistorialPagosService {
  collection: string = 'historial-pagos'
  constructor(private firestore: Firestore) { }

  conHistorialPagos(data: any) {

    let response: any = null
    let action = data.action;
    switch (action) {
      case 'obtenerHistorialPagos':
        response = this.obtenerHistorialPagos(data)
        break
      case 'obtenerHistorialPago':
        response = this.obtenerHistorialPago(data)
        break
      case 'agregarHistorialPago':
        response = this.agregarHistorialPago(data)
        break
      case 'actualizarHistorialPago':
        response = this.actualizarHistorialPago(data)
        break
      case 'eliminarHistorialPago':
        response = this.eliminarHistorialPago(data)
        break
      default:
        response = { result: "error", message: "No existe esta acción" }
        break
    }
    return response
  }

  async obtenerHistorialPagos(data: any) {
    let historialPagos: any = []
    let response: any = null
    try {
      const docRef = collection(this.firestore, this.collection)
      const querySnapshot = await getDocs(query(docRef, where('idpago', '==', data.idpago)))
      querySnapshot.forEach((doc: any) => {
        let hp = doc.data()
        hp["idhistorialpago"] = doc.id
        historialPagos.push(hp)
      })
      response = {
        result: "success",
        historialPagos: historialPagos,
      }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }
  }

  async agregarHistorialPago(data: any) {
    let response: any = null
    try {
      await addDoc(
        collection(this.firestore, this.collection),
        {
          fecha: data.fecha,
          idpago: data.idpago,
          idusuario: data.idusuario,
          monto: data.monto,
          receptor: data.receptor,
        }
      )
      response = {
        result: "success",
      }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }
  }

  obtenerHistorialPago(data: any) { }
  actualizarHistorialPago(data: any) { }
  async eliminarHistorialPago(data: any) {
    let response: any = null
    try {
      await deleteDoc(doc(this.firestore, this.collection,
        data.idhistorialpago
      ))
      response = {
        result: "success",
      }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }
  }
}
