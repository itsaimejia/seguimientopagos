import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, docData, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  collection: string = 'clients'
  constructor(private firestore: Firestore) { }

  conClients(data: any) {
    let method = data.method;
    let response: any = null
    switch (method) {
      case 'getClienData':
        response = this.getClientData(data)
        break
      case 'setClient':
        response = 
    }
  }

  async getClientData(data: any) {
    const userDocRef = doc(this.firestore, `${this.collection}/${data.phone}`)
    return docData(userDocRef);
  }

  async setClient(data: any) {
    return setDoc(
      doc(this.firestore, this.collection, data.phone),
      {
        name: data.name,
        phone: data.phone
      }
    )
  }
}
