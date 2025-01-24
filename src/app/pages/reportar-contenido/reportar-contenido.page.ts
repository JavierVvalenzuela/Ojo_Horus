import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
  selector: 'app-reportar-contenido',
  templateUrl: './reportar-contenido.page.html',
  styleUrls: ['./reportar-contenido.page.scss'],
  standalone: false,
})
export class ReportarContenidoPage implements OnInit {

  aregloReporte: any[] = [];//arreglo de reportes
  selectedMotivo: string = '';//motivo seleccionado
  idUsuario!: number;//id del usuario
  idContenido: number = 0;//id del contenido
  idPost: number = 0;//id del post
  motivos: any[] = []; // Lista de motivos

  constructor(
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private bd: BdServicioService,
    private user: Usuarios,
  ) { }

  ngOnInit() {
    // Cargar todos los motivos desde la base de datos
    this.bd.buscarMotivos();  // Llamamos al método que obtiene los motivos
    this.bd.listaMotivos.asObservable().subscribe((motivos) => {
      this.motivos = motivos;
    });

    // Obtener los reportes
    this.bd.buscarReportes();  
    this.bd.fetchReportes().subscribe((reportes: any[]) => {
      this.aregloReporte = reportes;
    });

    // Verificar si el usuario está logueado
    this.idUsuario = this.user.id_usuario;
    if (this.idUsuario === 0) {
      this.router.navigate(['/login']);
    }
  }
  async enviarReporte() {
    // Verificar si se ha seleccionado un motivo
    if (!this.selectedMotivo) {
      await this.presentAlert('Error', 'Por favor selecciona un motivo para el reporte.');
      return;
    }
  
    // Verificar si el usuario está logueado
    if (this.idUsuario === null || this.idUsuario === 0) {
      await this.presentAlert('Error', 'No estás logueado. Por favor inicia sesión.');
      return;
    }
  
    // Insertar el reporte en la base de datos
    const estadoReporte = 'pendiente'; 
    const idComunidad = 0; 
    const idComentario = 0;  
    const idMotivo = this.motivos.find(motivo => motivo.descripcion_motivo === this.selectedMotivo)?.id_motivo || 0;
  
    // Agregar el reporte a la base de datos
    this.bd.agregarReporte(estadoReporte, this.idUsuario,this.idContenido,idComunidad, idComentario, idMotivo);
  
    // Mostrar alerta de confirmación
    await this.presentAlert('Reporte enviado', 'El contenido ha sido reportado.');
  }

  cancelarReporte() {
    this.navCtrl.back();
  }

  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
