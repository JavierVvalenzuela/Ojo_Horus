import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
  standalone: false,
})
export class ConfiguracionesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Método para redirigir a la página de seguridad
  goToSeguridad() {
    this.router.navigate(['/seguridad']);
  }

  // Método para redirigir a la página de inicio
  goToInicio() {
    this.router.navigate(['/inicio']);
  }

}