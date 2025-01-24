import { Component, OnInit } from '@angular/core';
import { BdServicioService } from 'src/app/services/bd-servicio.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
  standalone: false,
})
export class ComentariosPage implements OnInit {
  arregloComentarios: any;
  postSeleccionado: any;
  idUsuario: number | null = null;
  nuevoComentario: any;

  constructor(
    private bd: BdServicioService,
    private router: ActivatedRoute,
    private alertController: AlertController  
  ) {}

  //cambira por metodo de suscribe
  ngOnInit() {
    // Obtener el id del post seleccionado desde la URL
    this.router.params.subscribe(params => {
      this.postSeleccionado = params['id'];
    });

    // Obtener el ID del usuario logueado desde localStorage
    const idUsuario = localStorage.getItem('id_usuario');
    if (idUsuario) {
      this.idUsuario = parseInt(idUsuario, 10);
    }

    // Si el post seleccionado está en localStorage, lo recuperamos
    const postData: string | null = localStorage.getItem('postSeleccionado');
    if (postData) {
      this.postSeleccionado = JSON.parse(postData);
    }

    // Obtener los comentarios asociados a este post desde la base de datos
    // Llamar a BuscarComentarioID con el id_post del post seleccionado
    this.bd.BuscarComentarioID(this.postSeleccionado.id_post);

    // Escuchar los comentarios desde el servicio
    this.bd.fetchComentarios().subscribe((comentarios: any) => {
      this.arregloComentarios = comentarios;
    });
  }

  // Función para enviar el comentario
  async enviarComentario(): Promise<void> {
    if (!this.nuevoComentario) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingresa un comentario',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    // Crear el objeto del comentario
    const comentario = {
      id_usuario: this.idUsuario,  // ID del usuario logueado
      contenido_comentario: this.nuevoComentario,
      id_post: this.postSeleccionado.id_post  // ID del post al que corresponde el comentario
    };

    // Llamar al servicio para guardar el comentario
    this.bd.guardarComentario(comentario).subscribe({
      next: () => {
        // Después de guardar el comentario, buscar y actualizar los comentarios asociados
        this.bd.fetchComentarios().subscribe((comentarios: any) => {
          this.arregloComentarios = comentarios;
        });
      },
      error: (error: any) => {
        console.error('Error al enviar comentario:', error);
      }
    });

    // Limpiar el campo de texto del comentario
    this.nuevoComentario = '';
  }
  
}
