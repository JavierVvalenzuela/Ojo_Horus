import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {

  isAdmin: boolean = false;

  ngOnInit() {
    // Obtener los datos del usuario desde localStorage
    const id_rol = localStorage.getItem('id_rol');

    // Si el id_rol es 1 (admin), mostramos el botón de administración
    if (id_rol && parseInt(id_rol) === 1) {
      this.isAdmin = true;
    }
  }

}
