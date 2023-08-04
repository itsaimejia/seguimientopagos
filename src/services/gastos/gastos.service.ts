import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, serverTimestamp, where, writeBatch } from '@angular/fire/firestore';

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

  async obtenerGastos() {
    let gastosRealizados: any = []
    let response: any = null
    try {
      const docRef = collection(this.firestore, this.collection)
      const querySnapshot = await getDocs(query(docRef, where('idcorte', '==', '')))
      querySnapshot.forEach((doc: any) => {
        let p: any = doc.data()
        p["idgasto"] = doc.id
        p["seconds"] = p.fecha.seconds
        let fecha = new Date(p.fecha.seconds * 1000)
        const format = (n: any) => n > 9 ? `${n}` : `0${n}`
        p.fecha = `${format(fecha.getDate())}/${format(fecha.getMonth() + 1)}/${fecha.getFullYear()}`
        gastosRealizados.push(p)
      })
      gastosRealizados.sort((a: any, b: any) => {
        if (a.seconds > b.seconds) {
          return 1;
        }
        if (a.seconds < b.seconds) {
          return -1;
        }
        return 0
      })
      response = {
        result: "success",
        gastosRealizados: gastosRealizados,
      }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }
  }

  obtenerGasto(data: any) { }

  async agregarGasto(data: any) {
    let response: any = null
    try {
      let gasto = {
        fecha: serverTimestamp(),
        descripcion: data.descripcion,
        monto: data.monto,
        responsable: data.responsable,
        idcorte: ''
      }
      await addDoc(collection(this.firestore, this.collection), gasto);
      response = { result: "success", mensaje: "Gasto agregado.", gasto: this.gastoFormat(gasto) }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }
  }

  actualizarGasto(data: any) { }
  eliminarGasto(data: any) { }

  gastoFormat(gasto: any) {
    let fecha = new Date()
    const format = (n: any) => n > 9 ? `${n}` : `0${n}`
    gasto.fecha = `${format(fecha.getDate())}/${format(fecha.getMonth() + 1)}/${fecha.getFullYear()}`
    return gasto
  }
}
