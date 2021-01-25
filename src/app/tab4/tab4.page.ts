import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { DatePipe } from '@angular/common'
import { AlertController } from '@ionic/angular';

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

  public loadingMsn:string;
  
  public total:number;

  constructor(
    public loadingController: LoadingController, 
    private firestoreService: FirestoreService,
    public datepipe: DatePipe,
    private alertController: AlertController
  ) { 
    
    this.listaDeVentas = [];
    this.total = 0;
    this.obtenerVentas();
    this.loadingMsn = "Descargando datos...";
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
        this.loadingMsn = "Descargando datos...";

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

        if(this.listaDeVentas.length > 0){  // SI HAY ELEMENTOS, ORDENALOS
         
          this.listaDeVentas.sort( (a,b) => {
            return (a.data.fecha < b.data.fecha)? 1 : -1
          }); 

        }
        else{ // SI NO NO MOSTRAR

          this.loadingMsn = "Sin Ventas";

        }         

        console.log("[ReportsUpdated]");

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

    const alert = await this.alertController.create({
      header: 'Guardar PDF',
      message: 'Nombre del archivo',
      inputs: [
        {
          name: 'nombreArchivo',
          type: 'text',
          value: 'reporte_' + fecha
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Guardar',
          handler: (alertData) => {
          
            try{

              this.exportPDF(alertData.nombreArchivo).then( () =>
                console.log("Creating pdf...")
              ); 

            }catch(error){

              console.log("error::", error);

            }

          }
        }
      ]
    });

    await alert.present();   
  }

  async exportPDF(nombreArchivo:string){

    const loading = await this.loadingController.create({
      duration: 4000,
      message: 'Descargando PDF...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    
    await loading.present();

    var opt = {
      margin: 0.5,
      filename: nombreArchivo + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    var element:Element = document.getElementById('element-to-print');    
    
    html2pdf().from(element).set(opt).save();

  }

  getFormatDate() {

    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear().toString();
    let hour = date.getHours().toString();
    let min = date.getMinutes().toString();


    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    if (hour.length < 2) {
      hour = '0' + hour;
    }
    if (min.length < 2) {
      min = '0' + min;
    }

    return [year, month, day].join('-') + "_" + hour + "-" + min;
}
   

}
