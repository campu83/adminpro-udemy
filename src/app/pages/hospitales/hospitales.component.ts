import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales() );
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
    .subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  buscarHospital( termino: string ) {
    if (termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital( termino )
    .subscribe( (hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  mostrarModal( hospital: Hospital ) {
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }

  guardarHospital( hospital: Hospital ) {
    console.log('guardar hospital');
    this._hospitalService.actualizarHospital( hospital )
    .subscribe();
  }

  borrarHospital( hospital: Hospital ) {
    this._hospitalService.borrarHospital(hospital._id )
    .subscribe( () => this.cargarHospitales() );
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then( ( value: string ) => {
      if ( !value || value.length <= 0 ) {
        return;
      }
      this._hospitalService.crearHospital(value)
      .subscribe( () => this.cargarHospitales() );
    });
  }
}
