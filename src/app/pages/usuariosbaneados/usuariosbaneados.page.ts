import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';  // Asegúrate de tener importado el AlertController
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-usuariosbaneados',
  templateUrl: './usuariosbaneados.page.html',
  styleUrls: ['./usuariosbaneados.page.scss'],
  standalone: false,
})
export class UsuariosbaneadosPage implements OnInit {
  usuariosReportados: any[] = [];

  constructor(private bd: BdServicioService, private alertController: AlertController) {}

  ngOnInit() {
    this.cargarUsuariosReportados();
  }

  cargarUsuariosReportados() {
    // Simula la carga de usuarios reportados desde la base de datos local
    this.bd.obtenerUsuariosReportados().subscribe((reportes) => {
      this.usuariosReportados = reportes;
    });
  }

  // Función para verificar si el usuario es admin
  esAdmin(id_usuario: number): boolean {
    const idAdmin = 1;
    return id_usuario === idAdmin;
  }

  // Función para banear al usuario
  async banearUsuario(id_reporte: number, id_usuario_reportado: number) {
    console.log(`Intentando banear al usuario reportado con ID: ${id_usuario_reportado}...`);

    // Verificamos que el usuario reportado no sea el administrador
    if (this.esAdmin(id_usuario_reportado)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No puedes banear al administrador.',
        buttons: ['OK'],
      });
      await alert.present();
      return; // Salir si se trata del administrador
    }

    try {
      // Llamar a la función banearUsuario para banear al usuario
      console.log(`Baneando al usuario con ID: ${id_usuario_reportado} y eliminando el reporte con ID: ${id_reporte}...`);
      this.bd.banearUsuario(id_usuario_reportado, id_reporte);

      // Mostrar alerta de éxito
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'El usuario ha sido baneado correctamente.',
        buttons: ['OK'],
      });
      await alert.present();

      // Refrescar la lista de usuarios reportados
      this.cargarUsuariosReportados();

    } catch (error) {
      console.error('Error al intentar banear al usuario:', error);

      // Mostrar alerta de error
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al intentar banear al usuario. Inténtalo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  // Función para ignorar el reporte
  ignorarReporte(id_reporte: number) {
    this.bd.eliminarReporte(id_reporte).then(() => {
      this.cargarUsuariosReportados(); // Refrescar la lista
    }).catch((e) => {
      alert('Error al ignorar reporte: ' + JSON.stringify(e));
    });
  }

  // Función para confirmar si se desea banear al usuario
async confirmarBaneo(id_reporte: number, id_usuario_reportado: number) {
  const alert = await this.alertController.create({
    header: 'Confirmación',
    message: '¿Estás seguro de que deseas banear a este usuario?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Baneo cancelado');
        }
      },
      {
        text: 'Confirmar',
        handler: () => {
          this.banearUsuario(id_reporte, id_usuario_reportado);
        }
      }
    ]
  });
  await alert.present();
}

}

