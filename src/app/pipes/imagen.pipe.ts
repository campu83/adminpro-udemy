import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }
    // si la imagen es de google
    if ( img.indexOf('https') >= 0 ) {
      return img;
    }
    // sino es de google
    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
      break;
      case 'medico':
        url += '/medicos/' + img;
      break;
      case 'hospital':
        url += '/hospitales/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usuarios/xxx';
    }
    return url;
  }

}
