import { Injectable } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  collection: string = 'users'
  constructor(private firestore: Firestore) { }

  conUsers(data: any) {
    let response: any = null
    try {
      let method = data.method;

      switch (method) {
        case 'getUserData':
          response = this.getUserData(data)
          break
      }
    } catch (e) {
      response = { result: "error", message: e }
    } finally {
      return response
    }

  }

  async getUserData(data: any) {
    let phone = data.phone
    const userDocRef = doc(this.firestore, `${this.collection}/${phone}`)
    return docData(userDocRef);
  }
}
