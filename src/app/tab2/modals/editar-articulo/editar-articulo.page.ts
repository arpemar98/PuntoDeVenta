import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from '../../../interfaces/articulo';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-editar-articulo',
  templateUrl: './editar-articulo.page.html',
  styleUrls: ['./editar-articulo.page.scss'],
})
export class EditarArticuloPage implements OnInit {

  @Input() articulo:{id:string, data: Articulo};

  constructor(private modalCtrl:ModalController, private firestoreService: FirestoreService) {
    
  }

  ngOnInit() {

  }

  cambiarImagen($evento){
    console.log("cambio", $evento);

    var reader = new FileReader();

    reader.onload = () => {

      this.articulo.data.image = reader.result.toString();  
    }

    reader.readAsDataURL($evento.target.files[0]);
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  actualizarArticulo(){

    this.firestoreService.actualizarArticulo(this.articulo.id, this.articulo.data).then(() => {
          
      console.log("actualizado");

    })

    this.modalCtrl.dismiss();
  }

}
