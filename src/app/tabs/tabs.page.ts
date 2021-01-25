import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public contadorCarrito:number;

  constructor(private firestoreService: FirestoreService,) {

    this.contadorCarrito = 0;

    this.obtenerContadorEnCarrito();
  }

  obtenerContadorEnCarrito(){
    
    this.firestoreService.consultarArticulos().subscribe(

      (resultadoConsulta) => {
        
        this.contadorCarrito = 0;

        resultadoConsulta.forEach((datos: any) => {

          if(datos.payload.doc.data().enCarrito > 0){
            this.contadorCarrito++;
          }

        });
      }
    )

  }
  

}
