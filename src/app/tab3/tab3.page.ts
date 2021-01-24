import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private alertController: AlertController,
    public platform: Platform
  ) {}

  async removerDelCarrito(){
    const alert = await this.alertController.create({
      header: 'Remover Articulo',
      message: '¿Esta seguro de querer remover este articulo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Si, Remover',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async venderArticulos(){
    const alert = await this.alertController.create({
      header: 'Vender Articulos',
      message: '¿Esta seguro de querer vender los articulos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Si, Vender',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
