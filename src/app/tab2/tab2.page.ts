import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AgregarArticuloPage} from './modals/agregar-articulo/agregar-articulo.page';
import { EditarArticuloPage } from './modals/editar-articulo/editar-articulo.page';

import { AlertController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { Articulo } from '../interfaces/articulo';

import { FirestoreService } from '../services/firestore.service';
import { DatePipe } from '@angular/common'

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public listaDeArticulos:{
    id: string,
    data: Articulo
  }[];

  public loadingMsn:string;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    public platform: Platform,
    private firestoreService: FirestoreService,
    public datepipe: DatePipe,
    public loadingController: LoadingController
  ) {
    
    this.listaDeArticulos = [];

    this.obtenerArticulos();

    this.loadingMsn = "Descargando datos...";
  }

  ngOnInit() {

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
        this.loadingMsn = "Descargando datos...";

        resultadoConsulta.forEach((datos: any) => {

          this.listaDeArticulos.push({

            id: datos.payload.doc.id,
            data: datos.payload.doc.data(),
          });

        });

        if(this.listaDeArticulos.length == 0){
          this.loadingMsn = "No hay Articulos";
        }
        
        console.log("[Articulos updated]");
        
        loading.dismiss();

      },
      (error) =>{

        console.error("Error al obtener articulos:", error);

        loading.dismiss();
      }
      
    );
  }

  async agregarArticulo() {

    const modal = await this.modalController.create({
      component: AgregarArticuloPage,
    });

    return await modal.present();    
  }

  async venderArticulo(articulo: {id:string, data:Articulo}){

    const alert = await this.alertController.create({
      header: 'Vender ' + articulo.data.nombre,
      message: 'Ingrese la cantidad',
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          min: 1,
          max: articulo.data.cantidad,
          value: 1
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Continuar',
          
          handler: (alertData) => {

            this.confirmarVenderArticulo(articulo, alertData.cantidad);

          }
        }
      ]
    });

    await alert.present();
  }

  async confirmarVenderArticulo(articulo: {id:string, data:Articulo}, cantidad:number){

    const alertConfirm = await this.alertController.create({
      header: 'Vender ' + articulo.data.nombre,
      message: 'Revise la información',
      inputs: [
        {
          type: 'text',
          disabled: true,
          value: 'Precio: $' + (articulo.data.precio).toString() + ' c/u'
        },
        {
          type: 'text',
          disabled: true,
          value: 'Cantidad: ' + cantidad.toString()
        },
        {
          type: 'text',
          disabled: true,
          value: 'Total: $' + (articulo.data.precio * cantidad).toString()
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Vender',
          handler: () => {

            console.log("Vendiendo " + articulo.data.nombre + "...");

            let fecha = new Date();

            articulo.data.cantidad = (articulo.data.cantidad - cantidad);  // restar

            this.firestoreService.actualizarArticulo(articulo.id, articulo.data).then(() => {
              console.log("Restando " + cantidad + "...");
            });

            this.firestoreService.insertarVenta(
              {
                nombre: articulo.data.nombre,
                precio: articulo.data.precio,
                cantidad: cantidad,
                fecha: this.datepipe.transform(fecha, 'yyyy-MM-dd HH:mm:ss')
              }
            ).then(() =>{
              console.log("Vendido el " + fecha.toString() + "!");
            })

          }
        }
      ]
    });

    await alertConfirm.present();
  }

  async agregarArticuloAlCarrito(articulo: {id:string, data:Articulo}){

    const alert = await this.alertController.create({
      header: 'Añadir al carrito',
      subHeader: 'En carrito: ' + articulo.data.enCarrito,
      message: 'Ingrese la cantidad',
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          min: 1,
          max: articulo.data.cantidad,
          value: 1
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Añadir',
          handler: (alertData) => {
            console.log('Añadiendo al carrito...');

            articulo.data.cantidad = articulo.data.cantidad - alertData.cantidad; // DISMINUIR DISPONIBLES

            let enCarro = (articulo.data.enCarrito + parseInt(alertData.cantidad) ); // SUMO AL CARRO

            articulo.data.enCarrito = enCarro;

            this.firestoreService.actualizarArticulo(articulo.id, articulo.data).then(() => {

              console.log("En carrito: " + enCarro + "...");

            });

          }
        }
      ]
    });

    await alert.present();
  }

  async agregarArticulos(articulo: {id:string, data:Articulo}){

    const alert = await this.alertController.create({
      header: 'Agregar ' + articulo.data.nombre,
      subHeader: 'Actual: ' + articulo.data.cantidad,
      message: '¿Cuantas unidades quiere agregar?',
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          min: 1,
          value: 1
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Agregar',
          handler: (alertData) => {
            console.log('Agregando unidades...');

            articulo.data.cantidad += parseInt(alertData.cantidad); // SUMAR

            this.firestoreService.actualizarArticulo(articulo.id, articulo.data).then(() => {

              console.log("Agregando: " + alertData.cantidad + "...");

            });

          }
        }
      ]
    });

    await alert.present();
  }

  async editarArticulo(articuloItem: {id:string, data: Articulo}){

    const modal = await this.modalController.create({
      component: EditarArticuloPage,
      componentProps: { 
        articulo: articuloItem
      }
    });

    modal.onDidDismiss().then(() => {
      this.obtenerArticulos();
      console.log("[Articulo updated...]");
    });
    
    return await modal.present();
  }

  async eliminarArticulo(articulo:{id:string, data:Articulo}){

    const alert = await this.alertController.create({

      header: 'Eliminar ' + articulo.data.nombre,
      message: '¿Esta seguro de querer eliminar este articulo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'primary',
        }, {
          text: 'Si, Eliminar',
          cssClass: 'secondary',
          handler: () => {
            
            this.firestoreService.borrarArticulo(articulo.id).then(() => {
              
              // Actualizar la lista completa
              //this.obtenerArticulos();
              console.log("[Eliminando " + articulo.data.nombre + "]");

            })
          }
        }
      ]
    });

    await alert.present();
  }

}
