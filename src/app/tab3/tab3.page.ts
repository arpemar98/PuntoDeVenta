import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Platform } from '@ionic/angular';

import { Articulo } from '../interfaces/articulo';

import { FirestoreService } from '../services/firestore.service';
import { DatePipe } from '@angular/common'

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public listaDeArticulos:{
    id: string,
    data: Articulo
  }[];

  public total:number;
  public ventaPosible:boolean;

  constructor(
    private alertController: AlertController,
    public platform: Platform,
    private firestoreService: FirestoreService,
    public datepipe: DatePipe,
    public loadingController: LoadingController
  ) {
    this.listaDeArticulos = [];
    this.obtenerArticulos();
    this.total = 0;
    this.ventaPosible = true;
  }

  async removerDelCarrito(articulo:{ id: string,data: Articulo} ){

    const alert = await this.alertController.create({
      header: 'Remover Articulo',
      message: '¿Esta seguro de querer remover este articulo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Si, Remover',
          handler: () => {
            
            articulo.data.enCarrito = 0;

            this.firestoreService.actualizarArticulo(articulo.id, articulo.data).then(() => {
              console.log("Quitado del carrito...");
            });

          }
        }
      ]
    });

    await alert.present();
  }

  async obtenerArticulos(){

    const loading = await this.loadingController.create({
      message: 'Cargando...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true,
      spinner: 'bubbles'
    });

    await loading.present();
        
    this.firestoreService.consultarArticulos().subscribe(
      
      (resultadoConsulta) => {

        this.listaDeArticulos = [];
        this.total = 0;
        this.ventaPosible = true;

        resultadoConsulta.forEach((datos: any) => {

          if(datos.payload.doc.data().enCarrito > 0){ // SI ESTA EN CARRITO

            this.listaDeArticulos.push({

              id: datos.payload.doc.id,
              data: datos.payload.doc.data(),
            });

            this.total += (datos.payload.doc.data().precio * datos.payload.doc.data().enCarrito);

            if(datos.payload.doc.data().enCarrito > datos.payload.doc.data().cantidad){
              this.ventaPosible = false;
            }

          }

        });
        
        console.log("collection:", this.listaDeArticulos);
        
        loading.dismiss();

      },
      (error) =>{

        console.error("Error al obtener articulos:", error);

        loading.dismiss();
      }
      
    );
  }

  async venderArticulos(){
    const alert = await this.alertController.create({
      header: 'Vender Articulos',
      subHeader: '¿Esta seguro de querer vender los articulos?',
      message: "$" + this.total.toString(),
      
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Si, Vender',
          handler: () => {

            console.log("Vendiendo delcarrito... ");

            let fecha = new Date();

            this.listaDeArticulos.forEach(articulo => { // RECORRER CADA ARTICULO DEL CARRITO

              this.firestoreService.insertarVenta({
                nombre: articulo.data.nombre,
                precio: articulo.data.precio,
                cantidad: articulo.data.enCarrito,
                fecha: this.datepipe.transform(fecha, 'yyyy-MM-dd HH:mm:ss')
              }).then(() =>{
                console.log("Vendiendo " + articulo.data.nombre + " el: " + fecha.toString() + "!");
              });

              articulo.data.enCarrito = 0;  // vaciar carrito

              this.firestoreService.actualizarArticulo(articulo.id, articulo.data).then(() => { });

            });
          }
        }
      ]
    });

    await alert.present();
  }

}
