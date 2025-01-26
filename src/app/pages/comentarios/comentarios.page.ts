import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdServicioService } from 'src/app/services/bd-servicio.service';
import { Comentarios } from 'src/app/services/comentarios';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
  standalone: false,
})
export class ComentariosPage implements OnInit {
  arregloComentarios: Comentarios[] = [];
  postSeleccionado: any;
  nuevoComentario: string = '';
  titulo_Comentario: string = '';
  nick_usuario: string | null = '';
  comID: number | null = null;

  constructor(private bd: BdServicioService, private share: ShareService, private router: Router) {}

  // Método para compartir el contenido
  public async shareContent(title: string, message: string, url: string) {
    try {
      await this.share.shareContent(title, message, url || ''); // Usar una URL válida o vacía si no hay URL
    } catch (error) {
      console.error('Error al compartir el contenido:', error);
    }
  }

  cargarComentarios(): void {
    if (this.postSeleccionado && this.postSeleccionado.id_post) {
      this.bd.BuscarComentarioID(this.postSeleccionado.id_post).subscribe({
        next: (comentarios: Comentarios[]) => {
          console.log('Comentarios cargados:', comentarios);
          this.arregloComentarios = comentarios.filter(comentario => comentario.id_post === this.postSeleccionado.id_post);
        },
        error: (error) => {
          console.error('Error al cargar comentarios:', error);
        },
      });
    } else {
      console.error('El id_post no está disponible');
    }
  }

  // Agregar un nuevo comentario
  agregarComentario(): void {
    if (!this.nuevoComentario.trim()) {
      alert('Por favor, ingresa un comentario válido.');
      return;
    }

    // Obtener el nick del usuario desde localStorage
    this.nick_usuario = localStorage.getItem('nick_usuario');
    const id_usuario = localStorage.getItem('id_usuario');

    if (!this.nick_usuario || !id_usuario) {
      alert('No se ha encontrado el usuario o el id del usuario.');
      return;
    }

    const comentario: Comentarios = {
      id_comentario: 0,
      contenido_comentario: this.nuevoComentario,
      likes_comentario: 0,
      img_comentario: null,
      id_estado: 1,
      id_post: this.postSeleccionado.id_post,
      id_usuario: parseInt(id_usuario), // Convertir el id_usuario a número
      nick_usuario: this.nick_usuario, // Guardar el nick del usuario
    };

    // Agregar el comentario a la base de datos
    this.bd
      .agregarComentario(
        comentario.contenido_comentario,
        comentario.img_comentario,
        comentario.id_estado,
        comentario.id_post,
        comentario.id_usuario
      )
      .subscribe({
        next: () => {
          this.nuevoComentario = '';
          this.cargarComentarios(); // Actualizar la lista de comentarios
        },
        error: (error) => {
          console.error('Error al agregar comentario:', error);
          alert('Error al agregar el comentario. Intenta nuevamente más tarde.');
        },
      });
  }

  irAReportarComentario(comID: number, postID: number): void {
    this.router.navigate(['/reportar-contenido'], {
      state: { comID, postID }
    });
  }

  ngOnInit(): void {
    // Recuperar el id_post desde localStorage
    const storedPost = localStorage.getItem('postSeleccionado');
    if (storedPost) {
      this.postSeleccionado = JSON.parse(storedPost);
      this.cargarComentarios(); // Cargar los comentarios con el post seleccionado
    } else {
      console.error('No se encontró el post seleccionado en localStorage');
    }
  }

  darLike(): void {
    console.log('¡Le diste Me Gusta a esta publicación!');
    // Lógica para manejar los likes
  }
}
