import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reportar-contenido',
  templateUrl: './reportar-contenido.page.html',
  styleUrls: ['./reportar-contenido.page.scss'],
  standalone: false,
})
export class ReportarContenidoPage implements OnInit {

  motivos: string[] = [
    'Contenido ofensivo',
    'Spam',
    'Contenido engañoso',
    'Violación de derechos de autor',
    'Incitación al odio',
    'Desinformación',
    'Lenguaje inapropiado',
    'Violencia gráfica',
    'Contenido sexual explícito',
    'Acoso o intimidación',
    'Contenido ilegal',
    'Infracción de normas de la comunidad',
  ];

  selectedMotivo: string = '';

  constructor(private alertController: AlertController, private router: Router, private navCtrl: NavController) {}

  ngOnInit() {}

  async enviarReporte() {
    if (!this.selectedMotivo) {
      await this.presentAlert('Error', 'Por favor selecciona un motivo para el reporte.');
      return;
    }

    // Mostrar alerta de confirmación
    await this.presentAlert('Reporte enviado', 'El contenido ha sido reportado.');

    // Redirigir a la página de inicio
    this.router.navigate(['/inicio']);
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
