import { Component, OnInit } from '@angular/core';
import { Articulo } from '../classes/articulo';
import { LoadingController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { DatePipe } from '@angular/common'

import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public listaDeVentas: {
    id:string,
    data: {
      nombre:string,
      precio:number,
      cantidad:number,
      fecha:Date
    }
  }[];
  
  public total:number;

  constructor(
    public loadingController: LoadingController, 
    private firestoreService: FirestoreService,
    public datepipe: DatePipe,
  ) { 
    
    this.listaDeVentas = [];
    this.total = 0;
    this.obtenerVentas();
  }

  ngOnInit() { }

  async obtenerVentas(){

    const loading = await this.loadingController.create({
      message: 'Cargando...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true,
      spinner: 'bubbles'
    });

    await loading.present();
        
    this.firestoreService.consultarVentas().subscribe(
      
      (resultadoConsulta) => {

        this.listaDeVentas = [];
        this.total = 0;

        resultadoConsulta.forEach((datos: any) => {

          this.listaDeVentas.push({
            id: datos.payload.doc.id,
            data: {
              nombre: datos.payload.doc.data().nombre,
              precio: datos.payload.doc.data().precio,
              cantidad: datos.payload.doc.data().cantidad,
              fecha: new Date(datos.payload.doc.data().fecha),
            }
          });

          this.total += (datos.payload.doc.data().precio * datos.payload.doc.data().cantidad);

        });
        
        this.listaDeVentas.sort( (a,b) => {
          return (a.data.fecha > b.data.fecha)? 1 : -1
        });
         

        console.log("collection:", this.listaDeVentas);

        loading.dismiss();
      },
      (error) =>{

        console.error("Error al obtener ventas:", error);

        loading.dismiss();
      }
      
    );
  }

  async generatePDF(){   

    let fecha = this.getFormatDate()

    const loading = await this.loadingController.create({
      duration: 300,
      message: 'Descargando PDF...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    
    await loading.present();

    var opt = {
      margin: 0.5,
      filename: 'reporte_' + fecha + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    var element:Element = document.getElementById('element-to-print');    
    
    html2pdf().from(element).set(opt).save();

    const { role, data } = await loading.onDidDismiss();
  }

  getFormatDate() {

    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear().toString();


    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('_');
}
   

}
