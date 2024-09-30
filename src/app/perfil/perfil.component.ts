import { Subscription } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { DatosPersonalesService } from '../servicios/datos-personales.service';
import { Component, inject, OnInit } from '@angular/core';

interface UsuarioAPI {
  user: string,
  pass: string,
  name: string,
  phone: string,
  rol: string,
  id: string
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {

  nombre: string;
  private sharedService = inject(DatosPersonalesService)

  private authService = inject(AuthService);
  usuario: string;
  usuarioCompleto: UsuarioAPI;

  phone: string;

  subscriptionDatosPersonales: Subscription;
  subscriptionAuthService: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscriptionDatosPersonales = this.sharedService.nombre$.subscribe(nombre => {
      this.nombre = nombre
      console.log('Header', nombre);
    });

    this.subscriptionAuthService = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
      console.log('Header', usuario);
    });

    this.subscriptionAuthService = this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
      this.usuarioCompleto = usuarioCompleto;
    });
  }

  ngOnDestroy() {
    this.subscriptionDatosPersonales?.unsubscribe();
    this.subscriptionAuthService?.unsubscribe();
  }

}
