import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdServicioService } from 'src/app/services/bd-servicio.service';
import { CameraService } from 'src/app/services/camera.service';
import { ShareService } from 'src/app/services/share.service';

// Definir la estructura de un post
interface Post {
  id_post: number;
  titulo_post: string;
  contenido_post: string;
  img_post?: string | null;
  id_usuario: number;
  id_estado: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  arreglopost: Post[] = [];
  fotografia: any;
  contenido_post: string = ''; // Contenido del post
  titulo_post: string = '';
  idRolUsuario: number = 2; // Por defecto, usuario normal

  constructor(
    private bd: BdServicioService,
    private router: Router,
    private cameraService: CameraService,
    private share: ShareService
  ) {}

  ngOnInit() {
    // Obtener el id_rol del usuario desde localStorage
    const idRol = localStorage.getItem('id_rol');
    if (idRol) {
      this.idRolUsuario = parseInt(idRol, 10);
    }

    // Cargar los posts cuando se carga la página
    this.bd.buscarPost();
    this.bd.fetchPost().subscribe((posts: Post[]) => {
      this.arreglopost = posts;
    });
  }

  logout() {
    console.log('Cerrar sesión');
  }

  public async takePhoto() {
    try {
      this.fotografia = await this.cameraService.capturePhoto();
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  public async shareContent(title: string, message: string, url: string) {
    try {
      await this.share.shareContent(title, message, url || '');
    } catch (error) {
      console.error('Error al compartir el contenido:', error);
    }
  }

  public publicarPost() {
    if (!this.contenido_post) {
      alert('Por favor, ingresa un contenido para el post.');
      return;
    }

    const nick_usuario = localStorage.getItem('nick_usuario');
    if (!nick_usuario) {
      alert('No se ha encontrado el nick del usuario.');
      return;
    }

    this.titulo_post = nick_usuario;

    const id_usuario = localStorage.getItem('id_usuario');
    if (!id_usuario) {
      alert('No se ha encontrado el ID del usuario.');
      return;
    }

    const nuevoPost: Post = {
      id_post: 0, // Se generará en la BD
      titulo_post: this.titulo_post,
      contenido_post: this.contenido_post,
      img_post: this.fotografia || null,
      id_usuario: parseInt(id_usuario, 10),
      id_estado: 1,
    };

    this.bd
      .agregarPost(
        nuevoPost.titulo_post,
        nuevoPost.contenido_post,
        nuevoPost.img_post,
        nuevoPost.id_usuario
      )
      .then(() => {
        this.contenido_post = '';
        this.fotografia = null;

        this.bd.buscarPost();
        this.bd.fetchPost().subscribe((posts: Post[]) => {
          this.arreglopost = posts;
        });
      })
      .catch((error: any) => {
        console.error('Error al publicar el post:', error);
      });
  }

  reportarPost(idPost: number, idUsuarioDelPost: number) {
    localStorage.setItem('id_post_reportado', idPost.toString());
    localStorage.setItem('id_usuario_del_post', idUsuarioDelPost.toString()); 
    this.router.navigate(['/reportar-contenido']);
  }

  eliminarPost(idPost: number) {
    if (this.idRolUsuario !== 1) {
      alert('No tienes permisos para eliminar este post.');
      return;
    }
  
    if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
      this.bd.eliminarPost(idPost).then(() => {
        alert('Post eliminado correctamente');
  
        // Filtrar la lista local sin recargar la página
        this.arreglopost = this.arreglopost.filter((post: Post) => post.id_post !== idPost);
      }).catch((error) => {
        console.error('Error al eliminar el post:', error);
      });
    }
  }
  

  irAComentarios(post: Post) {
    const idUsuario = localStorage.getItem('id_usuario');
    localStorage.setItem('postSeleccionado', JSON.stringify(post));
    if (idUsuario !== null) {
      localStorage.setItem('id_usuario', idUsuario);
    }
    localStorage.setItem('id_post', post.id_post.toString());
    this.router.navigate(['/comentarios']);
  }
}
