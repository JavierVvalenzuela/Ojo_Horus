import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public menuDisabled = false;

  constructor(private router: Router) {
    //sirve para desabilitar el menu deslizable en ciertas paginas
    this.router.events.subscribe(() => {
      const disabledRoutes = ['/login', '/register', '/recuperar-password', '/reportar-contenido', '/editarperfil', '/editar-com', '/cambiar-password'] //las rutas donde quiero que no aparezca el menu
      this.menuDisabled = disabledRoutes.includes(this.router.url);
    });
  }
}