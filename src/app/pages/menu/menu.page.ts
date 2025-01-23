import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdServicioService } from 'src/app/services/bd-servicio.service';
import { CameraService } from 'src/app/services/camera.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  arreglopost: any;
  fotografia: any;

  constructor(private bd: BdServicioService, private router: Router, private cameraService: CameraService, private share: ShareService) { }

  logout() {
    console.log('Cerrar sesión');
  }

  public async takePhoto() {
    try {
      this.fotografia = await this.cameraService.capturePhoto();  // Llamamos al servicio para capturar la foto
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
  
  public async shareContent(title: string, message: string, url: string) {
    try {
      await this.share.shareContent(title, message, url || '');  // Usar una URL válida o vacía si no hay URL
    } catch (error) {
      console.error('Error al compartir el contenido:', error);
    }
  }
  ngOnInit() {
    this.bd.buscarPost();
    this.bd.fetchPost().subscribe((posts: any) => {
      this.arreglopost = posts;
    });
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