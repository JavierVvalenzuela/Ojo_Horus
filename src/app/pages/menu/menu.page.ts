import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  arreglopost: any;

  constructor(private bd :BdServicioService, private router: Router) {
   }


  logout() {
    console.log('Cerrar sesión');
  }

  ngOnInit() {
    this.bd.buscarPost();
    this.bd.fetchPost().subscribe(posts => {
      this.arreglopost = posts;
    });

    this.bd.buscarPost();
  }

  irAComentarios(post: any) {
    // Obtener el id_usuario del almacenamiento local
    const idUsuario = localStorage.getItem('id_usuario');
  
    // Almacena tanto el post seleccionado como el id_usuario en localStorage.
    localStorage.setItem('postSeleccionado', JSON.stringify(post));
    if (idUsuario !== null) {
      localStorage.setItem('id_usuario', idUsuario);
    }
  
    // Navega a la página de comentarios con el ID del post.
    this.router.navigate(['/comentarios', post.id_post]);
  }

  
}