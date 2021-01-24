import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AgregarArticuloPage} from './modals/agregar-articulo/agregar-articulo.page';
import { EditarArticuloPage } from './modals/editar-articulo/editar-articulo.page';

import { AlertController } from '@ionic/angular';

import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    public platform: Platform
  ) {}

  async agregarArticulo() {

    const modal = await this.modalController.create({
      component: AgregarArticuloPage,
    });

    return await modal.present();
  }

  async venderArticulo(){
    const alert = await this.alertController.create({
      header: 'Vender Articulo',
      message: 'Ingrese la cantidad',
      inputs: [
        {
          name: 'name7',
          type: 'number',
          min: '1',
          value: '1'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Vender',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async agregarArticuloAlCarrito(){
    const alert = await this.alertController.create({
      header: 'Agregar al carrito',
      message: 'Ingrese la cantidad',
      inputs: [
        {
          name: 'name7',
          type: 'number',
          min: '1',
          value: '1'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Agregar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async editarArticulo(){
    console.log("editar");

    const modal = await this.modalController.create({
      component: EditarArticuloPage,
    });
    
    return await modal.present();
  }

  async eliminarArticulo(){
    const alert = await this.alertController.create({
      header: 'Eliminar Articulo',
      message: '¿Esta seguro de querer eliminar este articulo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Si, Eliminar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
