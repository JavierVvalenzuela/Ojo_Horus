import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-desbanearusuarios',
  templateUrl: './desbanearusuarios.page.html',
  styleUrls: ['./desbanearusuarios.page.scss'],
  standalone: false,
})
export class DesbanearusuariosPage implements OnInit {
  // Lista simulada de usuarios baneados
  usuariosBaneados: any[] = [
    { id_usuario: 1, nick_usuario: 'Juan666', motivo: 'Contenido ofensivo', id_estado: 2 },
    { id_usuario: 2, nick_usuario: 'PAPIGUILLE', motivo: 'Acoso o intimidación', id_estado: 2 },
  ];

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  // Función para desbanear al usuario
  async desbanearUsuario(id_usuario: number) {
    console.log(`Desbaneando al usuario con id ${id_usuario}...`);

    // Buscar al usuario en la lista simulada y cambiar su estado
    const usuarioIndex = this.usuariosBaneados.findIndex((usuario) => usuario.id_usuario === id_usuario);

    if (usuarioIndex > -1) {
      // Actualizar el estado a 1 (activo)
      this.usuariosBaneados[usuarioIndex].id_estado = 1;

      // Eliminar el usuario de la lista de baneados
      const usuarioDesbaneado = this.usuariosBaneados.splice(usuarioIndex, 1);

      // Mostrar alerta de éxito
      const alert = await this.alertController.create({
        header: 'Usuario Desbaneado',
        message: `${usuarioDesbaneado[0].nick_usuario} ha sido desbaneado correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      // Si no se encuentra el usuario, mostrar alerta de error
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El usuario no fue encontrado.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}

