import { Component, OnInit } from '@angular/core';
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
  id_usuario: number = 0;
  id_post: number = 0;
  id_comentario: number = 0;
  descripcion_motivo: string = '';

  constructor(
    private bd: BdServicioService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Obtener el id_usuario desde el localStorage
    const id_usuario_str = localStorage.getItem('id_usuario');
    this.id_usuario = id_usuario_str ? parseInt(id_usuario_str) : 0;
    // Cargar lista de motivos
    this.bd.fetchMotivos().subscribe((motivos) => {
      this.motivos = motivos;
      console.log('Motivos cargados:', this.motivos);
    });
  }

  // Función para manejar el envío del reporte
  enviarReporte() {
    if (this.selectedMotivo === '') {
      this.presentAlert('Error', 'Por favor, selecciona un motivo.');
      return;
    }

    // Verificar si el motivo seleccionado es "Otro"
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

    // Determinar si se va a reportar un post o comentario
    let id_post = this.id_post;
    let id_comentario = this.id_comentario;

    // Si el motivo es "Otro", también se guarda la descripción personalizada
    if (this.selectedMotivo === 'otro') {
      this.descripcion_motivo = motivoSeleccionado; // Asignamos la descripción personalizada si es otro
    }
    // Insertar el reporte en la base de datos
    this.bd.insertarReporte('pendiente', this.id_usuario, id_post, id_comentario, id_motivo)
    .subscribe({
      next: () => {
        this.presentAlert('Éxito', 'El reporte ha sido enviado correctamente.');
        this.selectedMotivo = '';
        this.descripcion_motivo = '';
        this.id_post = 0;
        this.id_comentario = 0;
      },
      error: (e) => {
        // Si el error es un objeto, asegurémonos de convertirlo a texto
        const errorMessage = (typeof e === 'object' && e !== null && e.message) ? e.message : e;
        this.presentAlert('Error', errorMessage); // Muestra el mensaje de error
      }
    });
  }
    
  // Función para cancelar el reporte
  cancelarReporte() {
    this.selectedMotivo = ''; // Limpiar la selección de motivo
    console.log('Reporte cancelado');

     // Redirigir a la página de inicio
  this.navCtrl.navigateRoot('/inicio');
  }

  // Función para mostrar alertas utilizando AlertController de Ionic
  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}

