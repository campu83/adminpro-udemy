import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    // Hacemos esto como referencia local y no tener que escribir _usuarioService.usuario en todos
    // los sitios donde lo usemos.
    this.usuario = this._usuarioService.usuario;
  }

}
