import { Injectable } from '@angular/core';
import { Firestore, docData, doc, addDoc, collection, updateDoc, getDocs, where, query, writeBatch, orderBy, serverTimestamp } from '@angular/fire/firestore';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  collection: string = 'pagos'
  constructor(private firestore: Firestore) { }

  conPagos(data: any) {
    let response: any = null
    let action = data.action;
    switch (action) {
      case 'obtenerPagos':
        response = this.obtenerPagos()
        break
      case 'agregarPago':
        response = this.agregarPago(data)
        break
      case 'actualizarPago':
        response = this.actualizarPago(data)
        break
      case 'eliminarPago':
        response = this.eliminarPago(data)
        break
      default:
        response = { result: "error", message: "No existe esta acción" }
        break
    }
    return response
  }

  async obtenerPagos() {
    let pagosPendientes: any = []
    let pagosCompletados: any = []

    let response: any = null
    try {
      const docRef = collection(this.firestore, this.collection)
      const querySnapshot = await getDocs(query(docRef, where('idcorte', '==', '')))
      querySnapshot.forEach((doc: any) => {
        let p: any = doc.data()
        p["idpago"] = doc.id
        p["seconds"] = p.fecha.seconds
        let fecha = new Date(p.fecha.seconds * 1000)
        p.fecha = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`
        if (p.restante == 0) {
          pagosCompletados.push(p)
        } else {
          pagosPendientes.push(p)
        }
      })
      pagosCompletados.sort((a: any, b: any) => {
        if (a.seconds > b.seconds) {
          return 1;
        }
        if (a.seconds < b.seconds) {
          return -1;
        }
        return 0
      })

      pagosPendientes.sort((a: any, b: any) => {
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
        pagosCompletados: pagosCompletados,
        pagosPendientes: pagosPendientes
      }
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }
  }
  async obtenerPago(data: any) { }

  async agregarPago(data: any) {
    let response: any = null
    try {
      const batch = writeBatch(this.firestore);

      if (data.cliente_nuevo == true) {
        const clienteRef = doc(this.firestore, 'clientes', data.celular)
        batch.set(clienteRef, {
          celular: data.celular,
          nombre: data.nombre,
        });
      }

      let pago = {
        fecha: serverTimestamp(),
        celular: data.celular,
        cliente: data.nombre,
        total: data.total,
        pagado: data.pagado,
        restante: data.restante,
        notas: data.notas,
        idcorte: ''
      }
      const pagoRef = doc(this.firestore, this.collection, data.idpago);
      batch.set(pagoRef, pago);

      const idhistorial = uuid.v4()
      const historialPagoRef = doc(this.firestore, 'historial-pagos', idhistorial);
      batch.set(historialPagoRef, {
        fecha: serverTimestamp(),
        idpago: data.idpago,
        idusuario: data.idusuario,
        monto: data.pagado,
        responsable: data.responsable,
        idcorte: ''
      });
      await batch.commit().then(() => {
        response = { result: "success", mensaje: "Renta agregada correctamente", pago: pago }
      }).catch((e) => {
        response = { result: "error", mensaje: `Ocurrió un error: ${e}` }
      })
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }
  }

  async actualizarPago(data: any) {
    let response: any = null
    try {
      const batch = writeBatch(this.firestore);
      const pagoRef = doc(this.firestore, this.collection, data.idpago);
      batch.update(pagoRef, {
        pagado: data.pagado,
        restante: data.restante,
        notas: data.notas
      });

      const idhistorial = uuid.v4()
      const historialPagoRef = doc(this.firestore, 'historial-pagos', idhistorial);
      batch.set(historialPagoRef, {
        fecha: data.fecha,
        idpago: data.idpago,
        idusuario: data.idusuario,
        monto: data.pagado,
        responsable: data.responsable,
        idcorte: ''
      });
      await batch.commit().then(() => {
        response = { result: "success", mensaje: "Renta agregada correctamente" }
      }).catch((e) => {
        response = { result: "error", mensaje: `Ocurrió un error: ${e}` }
      })
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }
  }

  async asignarIdCortePago(data: any) {
    let response: any = null
    try {
      await updateDoc(
        doc(this.firestore, this.collection, data.idpago),
        {
          idcorte: data.idcorte,
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

  async eliminarPago(data: any) {
    let response: any = null
    try {
      const batch = writeBatch(this.firestore);

      data.historialPagos.forEach((hp: any) => {
        const historialPagoRef = doc(this.firestore, 'historial-pagos', hp.idhistorial);
        batch.delete(historialPagoRef);
      });

      if (data.eliminar_cliente == true) {
        const clienteRef = doc(this.firestore, 'clientes', data.celular)
        batch.delete(clienteRef);
      }

      const pagoRef = doc(this.firestore, this.collection, data.idpago);
      batch.delete(pagoRef);

      await batch.commit().then(() => {
        response = { result: "success", mensaje: "Pago eliminado correctamente" }
      }).catch((e) => {
        response = { result: "error", mensaje: `Ocurrió un error: ${e}` }
      })
    } catch (e) {
      response = { result: "error", mensaje: e }
    } finally {
      return response
    }
  }
}
