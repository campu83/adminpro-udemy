import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { NgZone } from '@angular/core';

declare function init_plugins();
// constante de google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  // variable de google
  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService, private zone: NgZone) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || ''; // si el email esta vacio coge comillas como valor por defecto.
    this.recuerdame = this.email.length > 1; // Si al cargar hay algún email es porque esta opción estaba marcada
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '758361611250-9umdiun1aqccam4g3fp8910lausrslhi.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;
      // Este modo de logado se realiza de esta forma porque se ejecuta fuera de una zona de ejecución
      // Metiendolo de este modo se resuelve.
      this.zone.run( () => {
      this._usuarioService.loginGoogle( token )
        .subscribe( () => this.router.navigate(['/dashboard']));
        // Fernandito propuso este modo
        // .subscribe( () => window.location.href = '#/dashboard' );
      });
    });
  }

  ingresar(forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password );

    this._usuarioService.login(usuario, forma.value.recuerdame )
        .subscribe( correcto => this.router.navigate(['/dashboard']));
  }
}
