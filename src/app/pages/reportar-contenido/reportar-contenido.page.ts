import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertController, NavController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';
import { Motivo } from 'src/app/services/motivo';

@Component({
  selector: 'app-reportar-contenido',
  templateUrl: './reportar-contenido.page.html',
  styleUrls: ['./reportar-contenido.page.scss'],
  standalone: false,
})
export class ReportarContenidoPage implements OnInit {
  motivos: Motivo[] = [];
  selectedMotivo: string = '';
  id_usuario_del_post: string = ''; 
  id_post: number = 0;
  descripcion_motivo: string = '';
  constructor(
    private bd: BdServicioService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
   // Recuperamos el id_usuario del post desde localStorage
   this.id_usuario_del_post = localStorage.getItem('id_usuario_del_post') || ''; // Aquí tomamos el id del usuario que hizo el post
   this.id_post = parseInt(localStorage.getItem('id_post_reportado') || '0', 10);

   // Cargar lista de motivos
   this.bd.fetchMotivos().subscribe((motivos) => {
     this.motivos = motivos;
     console.log('Motivos cargados:', this.motivos);
   });
 }

 enviarReporte() {
  if (this.selectedMotivo === '') {
    this.presentAlert('Error', 'Por favor, selecciona un motivo.');
    return;
  }

  let motivoSeleccionado = this.selectedMotivo;
  if (
    this.selectedMotivo === 'otro' &&
    this.descripcion_motivo.trim() !== ''
  ) {
    motivoSeleccionado = this.descripcion_motivo;
  }

  // Buscar el ID del motivo seleccionado
  let id_motivo =
    this.motivos.find(
      (motivo) => motivo.descripcion_motivo === motivoSeleccionado
    )?.id_motivo || 0;

  if (id_motivo === 0) {
    this.presentAlert('Error', 'El motivo seleccionado no es válido.');
    return;
  }

  // Convertir id_usuario_del_post a número
  let id_usuario = parseInt(this.id_usuario_del_post, 10);

  // Si no estás reportando un comentario, puedes asignar id_comentario a null o 0
  let id_comentario = 0; // Asignamos 0 si no es un comentario

  // Insertar el reporte en la base de datos con el id_usuario del post
  this.bd.insertarReporte(
      'pendiente',
      id_usuario,  // Aquí pasamos el id_usuario convertido a número
      this.id_post,
      id_comentario,
      id_motivo
    )
    .subscribe({
      next: () => {
        this.presentAlert(
          'Éxito',
          'El reporte ha sido enviado correctamente.'
        );
        this.selectedMotivo = '';
        this.descripcion_motivo = '';
      },
      error: (e) => {
        const errorMessage =
          typeof e === 'object' && e !== null && e.message ? e.message : e;
        this.presentAlert(
          'Error',
          `Hubo un problema al enviar el reporte: ${errorMessage}`
        );
      },
    });
  }
  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
  cancelarReporte() {
    this.selectedMotivo = ''; // Limpiar la selección de motivo
    console.log('Reporte cancelado');
    this.navCtrl.navigateBack('/inicio'); // Asegúrate de usar la navegación correcta
  }
}
