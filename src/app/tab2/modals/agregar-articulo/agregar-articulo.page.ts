import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../interfaces/articulo';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.page.html',
  styleUrls: ['./agregar-articulo.page.scss'],
})
export class AgregarArticuloPage implements OnInit {

  public articulo:Articulo;

  constructor(private modalCtrl:ModalController, private firestoreService: FirestoreService) {
    this.articulo = {
      nombre: "", 
      image: "assets/img/thumbnail.jpg", 
      precio: 1, 
      cantidad:1, 
      enCarrito: 0
    };
  }

  ngOnInit() {

  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  agregarArticulo(){

    this.firestoreService.insertarArticulo(this.articulo).then(
      () => {

        console.log('Articulo creado correctamente!', this.articulo);
        
      }, (error) => {
  
        console.error("Error al crear articulo:", error);
      }
    );

    this.modalCtrl.dismiss();
  }

  cambiarImagen($evento){
    console.log("cambio", $evento);

    var reader = new FileReader();

    reader.onload = () => {

      this.articulo.image = reader.result.toString();  
    }

    reader.readAsDataURL($evento.target.files[0]);
    
  }

}
