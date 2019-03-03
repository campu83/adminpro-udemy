import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router,
    public _subirArchivoService: SubirArchivoService) { }

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';

    return this.http.get( url );
   }

   obtenerHospital( id: string) {
      const url = URL_SERVICIOS + '/hospital/' + id;
      return this.http.get( url )
        .pipe(map( (resp: any) => resp.hospital ));
   }

   borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
    .pipe(map( resp => {
     swal('Hospital borrado!', 'El hospital ha sido eliminado correctamente', 'success');
     return true;
    }));
   }

   crearHospital( nombre: string ) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, { nombre } )
              .pipe(map((resp: any) => {
                swal('Hospital creado', nombre, 'success');
                return resp.hospital;
              }));
   }

   buscarHospital( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;

    return this.http.get( url ).pipe(map( (resp: any) => resp.hospital));
   }

   actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, hospital )
    .pipe(map( (resp: any) => {
      swal('Hospital actualizado', hospital.nombre, 'success');
      return resp.hospital;
    }));
   }
}
