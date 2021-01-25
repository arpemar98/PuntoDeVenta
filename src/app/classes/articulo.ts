export class Articulo {
    id: string;
    nombre: string;
    image: string;
    precio: string;
    cantidad: string;

    constructor(id?: string, nombre?: string, image?: string, precio?: string, cantidad?: string){

        if(id && nombre && image && precio && cantidad){
            this.id = id;
            this.nombre = nombre;
            this.image = image;
            this.precio = precio;
            this.cantidad = cantidad;
        }
        else{
            this.id = "";
            this.nombre = "";
            this.image = "";
            this.precio = "";
            this.cantidad = "";
        }
    }
}
