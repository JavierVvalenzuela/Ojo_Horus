import { Component, OnInit } from '@angular/core';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-usuariosbaneados',
  templateUrl: './usuariosbaneados.page.html',
  styleUrls: ['./usuariosbaneados.page.scss'],
  standalone: false,
})
export class UsuariosbaneadosPage implements OnInit {
  usuariosReportados: any[] = [];

  constructor(private bd: BdServicioService) {}

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
  banearUsuario(id_usuario: number, id_reporte: number, id_usuario_reportado: number) {
    if (this.esAdmin(id_usuario)) {
      alert('El administrador no puede ser baneado');
      return; // No continúa con la acción si es el admin
    }

    // Cambiar el estado del usuario reportado a baneado (id_estado 2)
    this.bd.actualizarEstadoUsuario(id_usuario_reportado, 2).then(() => {
      // Eliminar el reporte de la lista
      this.bd.eliminarReporte(id_reporte).then(() => {
        this.cargarUsuariosReportados(); // Refrescar la lista
      }).catch((e) => {
        alert('Error al eliminar reporte: ' + JSON.stringify(e));
      });
    }).catch((e) => {
      alert('Error al actualizar estado de usuario: ' + JSON.stringify(e));
    });
  }

  ignorarReporte(id_reporte: number) {
    this.bd.eliminarReporte(id_reporte).then(() => {
      this.cargarUsuariosReportados(); // Refrescar la lista
    }).catch((e) => {
      alert('Error al ignorar reporte: ' + JSON.stringify(e));
    });
  }
}




