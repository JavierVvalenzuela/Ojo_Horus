import { Component, OnInit } from '@angular/core';
import { BdServicioService } from 'src/app/services/bd-servicio.service';
import { AlertController } from '@ionic/angular';  // Asegúrate de tener importado el AlertController

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
    this.bd.obtenerUsuariosReportados().subscribe((reportes) => {
      this.usuariosReportados = reportes;
    });
  }

  // Función para verificar si el usuario es admin
  esAdmin(id_usuario: number): boolean {
    const idAdmin = 1; // Suponiendo que el id del admin es 1. Ajusta esto según tu lógica
    return id_usuario === idAdmin;
  }

  // Función para banear al usuario
  async banearUsuario(id_usuario: number, id_reporte: number, id_usuario_reportado: number) {
    console.log(`Intentando banear al usuario ${id_usuario_reportado}...`);

    // Recuperamos el nick del usuario reportado desde localStorage
    const nick_usuario_reportado = localStorage.getItem('nick_usuario');
    if (!nick_usuario_reportado) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se ha encontrado el usuario reportado en el localStorage.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Verificamos que el usuario no sea el admin
    if (id_usuario === 1) {
      alert('El administrador no puede ser baneado');
      return; // No continúa con la acción si es el admin
    }

    try {
      // Buscar el usuario reportado por su nick (extraído de localStorage) y cambiar su estado a 2 (baneado)
      console.log(`Actualizando estado del usuario con nick ${nick_usuario_reportado} a baneado (id_estado = 2)`);

      // Cambiar el estado del usuario reportado a baneado (id_estado = 2)
      await this.bd.actualizarEstadoPorNick(nick_usuario_reportado, 2);
      
      console.log(`Eliminando reporte con id ${id_reporte}`);
      // Eliminar el reporte de la lista
      await this.bd.eliminarReporte(id_reporte);
      
      // Mostrar alerta de que el usuario ha sido baneado
      const alert = await this.alertController.create({
        header: 'Usuario Baneado',
        message: 'El usuario ha sido baneado correctamente.',
        buttons: ['OK'],
      });
      await alert.present();

      // Refrescar la lista de reportes después de eliminar el reporte
      this.cargarUsuariosReportados();
    } catch (error) {
      console.error('Error al banear al usuario', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al banear al usuario.',
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
}


