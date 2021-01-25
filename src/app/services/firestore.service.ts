import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Articulo } from '../interfaces/articulo';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { }

  public insertarArticulo(datos) {

    return this.angularFirestore.collection("Articulos").add(datos);
  }

  public consultarArticulos() {

    return this.angularFirestore.collection("Articulos").snapshotChanges();

  }

  public consultarArticuloPorId(documentId) {
    return this.angularFirestore.collection("Articulos").doc(documentId).snapshotChanges();
  }

  public actualizarArticulo(documentId, datos) {
    return this.angularFirestore.collection("Articulos").doc(documentId).set(datos);
   }

  public borrarArticulo(documentId) {
    return this.angularFirestore.collection("Articulos").doc(documentId).delete();
  }

  // VENTAS

  public insertarVenta(datos) {
    return this.angularFirestore.collection("Ventas").add(datos);
  }

  public consultarVentas() {
    return this.angularFirestore.collection("Ventas").snapshotChanges();
  }
  
}
