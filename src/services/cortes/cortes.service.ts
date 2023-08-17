import { Injectable } from '@angular/core';
import { Firestore, doc, runTransaction, getDoc, getDocs, collection } from '@angular/fire/firestore';
import { porFechasRecientes } from 'src/generales/generales';

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

  async obtenerCortes() {
    let response: any = null
    let cortesRealizados: any = []
    try {
      const cortesRef = await getDocs(collection(this.firestore, this.collection));
      cortesRef.forEach((doc: any) => {
        let c: any = doc.data()
        c["idcorte"] = doc.id
        c["seconds"] = c.fecha_fin.seconds
        let fecha = new Date(c.fecha_fin.seconds * 1000)
        const format = (n: any) => n > 9 ? `${n}` : `0${n}`
        c.fecha_fin = `${format(fecha.getDate())}/${format(fecha.getMonth() + 1)}/${fecha.getFullYear()}`
        cortesRealizados.push(c)
      });
      cortesRealizados.sort(porFechasRecientes)
      response = { result: "success", cortesRealizados: cortesRealizados }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }


  }

  async obtenerCorte(data: any) {
    let response: any = null
    try {
      const corteRef = doc(this.firestore, this.collection, data.idcorte);
      const corte = await getDoc(corteRef);
      response = { result: "success", }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }

  }

  async obtenerCorteActual(data: any) {
    let response: any = null
    try {
      const corteRef = doc(this.firestore, this.collection, data.idcorte);
      const corte = await getDoc(corteRef);
      response = { result: "success", }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }

  }
  
  agregarCorte(data: any) { }
  actualizarCorte(data: any) { }
  eliminarCorte(data: any) { }
}
