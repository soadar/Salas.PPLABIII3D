import { Anuncio } from "./anuncio.js";

export function Anuncio_Autos(id, titulo, transaccion, descripcion, precio, num_puertas, num_kms, potencia) {
    Anuncio.call(this, id, titulo, transaccion, descripcion, precio);
    this.num_puertas = num_puertas;
    this.num_kms = num_kms;
    this.potencia = potencia;
}

