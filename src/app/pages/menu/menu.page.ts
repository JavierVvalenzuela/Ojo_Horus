import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
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
  contenido_post: string = ''; // Contenido del post

  // El título del post será el nick del usuario
  titulo_post: string = '';

  constructor(
    private bd: BdServicioService,
    private router: Router,
    private cameraService: CameraService,
    private share: ShareService,
    private cdRef: ChangeDetectorRef 
  ) {}

  logout() {
    console.log('Cerrar sesión');
  }

  public async takePhoto() {
    try {
      this.fotografia = await this.cameraService.capturePhoto(); // Llamamos al servicio para capturar la foto
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  public async shareContent(title: string, message: string, url: string) {
    try {
      await this.share.shareContent(title, message, url || ''); // Usar una URL válida o vacía si no hay URL
    } catch (error) {
      console.error('Error al compartir el contenido:', error);
    }
  }

  // Método que se ejecuta cuando se publica un post
  public publicarPost() {
    // Validación para asegurar que el contenido del post está lleno
    if (!this.contenido_post) {
      alert('Por favor, ingresa un contenido para el post.');
      return;
    }

    // Recuperamos el nick del usuario desde localStorage
    const nick_usuario = localStorage.getItem('nick_usuario');
    if (!nick_usuario) {
      alert('No se ha encontrado el nick del usuario.');
      return;
    }

    // Asignamos el nick del usuario al título del post
    this.titulo_post = nick_usuario;

    // Recuperamos el ID del usuario desde localStorage
    const id_usuario = localStorage.getItem('id_usuario');
    if (!id_usuario) {
      alert('No se ha encontrado el ID del usuario.');
      return;
    }

    // Crear el objeto del post
    const nuevoPost = {
      titulo_post: this.titulo_post, // Nick del usuario como título
      contenido_post: this.contenido_post, // Lo que el usuario escribe
      img_post: this.fotografia || null, // La imagen es opcional
      id_usuario: parseInt(id_usuario, 10),
      id_estado: 1, // Establecemos un estado por defecto
    };

    // Llamar al servicio para guardar el nuevo post en la base de datos
    this.bd
      .agregarPost(
        nuevoPost.titulo_post,
        nuevoPost.contenido_post,
        nuevoPost.img_post,
        nuevoPost.id_usuario
      )
      .then(() => {
        // Limpiar los campos después de publicar el post
        this.contenido_post = '';
        this.fotografia = null;

        // Actualizar la lista de posts en la pantalla
        this.bd.buscarPost();
        this.bd.fetchPost().subscribe((posts: any) => {
          this.arreglopost = posts;
        });
      })
      .catch((error: any) => {
        console.error('Error al publicar el post:', error);
      });
  }

  ngOnInit() {
    // Cargar los posts cuando se carga la página
    this.bd.buscarPost();
    this.bd.fetchPost().subscribe((posts: any) => {
      this.arreglopost = posts;
      this.cdRef.detectChanges(); 
    });
  }

  reportarPost(idPost: number, idUsuarioDelPost: number) {
    localStorage.setItem('id_post_reportado', idPost.toString());
    localStorage.setItem('id_usuario_del_post', idUsuarioDelPost.toString()); 
  
    // Navegar a la página de reportar contenido
    this.router.navigate(['/reportar-contenido']);
  }
  // Método para ir a los comentarios del post
  irAComentarios(post: any) {
    // Obtener el id_usuario del almacenamiento local
    const idUsuario = localStorage.getItem('id_usuario');

    // Almacenar el post completo y el id_usuario en localStorage.
    localStorage.setItem('postSeleccionado', JSON.stringify(post)); // Almacenar el post completo
    if (idUsuario !== null) {
      localStorage.setItem('id_usuario', idUsuario); // Asegurarnos que el id_usuario está también guardado
    }

    // Almacenar solo el id_post en localStorage.
    localStorage.setItem('id_post', post.id_post.toString());

    // Navegar a la página de comentarios sin pasar el id por la URL.
    this.router.navigate(['/comentarios']);
  }
}
