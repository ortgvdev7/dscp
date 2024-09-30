import { AuthService } from './../../servicios/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DatosPersonalesService } from 'src/app/servicios/datos-personales.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  usuario: string = '';
  clave: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();
  loginFailed: boolean;

  ngOnInit(): void {

  this.authService.loginFailed$.subscribe((loginFailed: boolean) => this.loginFailed = loginFailed);
  }

  constructor() { }

  isLoading: boolean = false;
  async login(usuario: string, clave: string) {
    this.isLoading = true;
    await this.authService.buscarBD(usuario, clave);
    this.isLoading = false;

    this.authService.isAuthenticated$.subscribe(isAuthenticated => {

      this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
        if(isAuthenticated) {
          this.usuario = '';
          this.clave = '';
        } else {
          this.loginFailed = true;
        }
      });
    });
    }
}
