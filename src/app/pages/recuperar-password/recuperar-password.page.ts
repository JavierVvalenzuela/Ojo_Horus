import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';


@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
  standalone: false,
})
export class RecuperarPasswordPage implements OnInit {

  nickname: string = '';
  preguntaSeguridad: string = '';
  respuestaSeguridad: string = '';
  clave: string = '';
  confirmarClave: string = '';

  errores: { nickname: string | null } = {
    nickname: null,
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private usuarioService: BdServicioService // Inyectamos el servicio de usuario
  ) {}

  // Función que muestra la alerta si el nickname no es encontrado
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Función que valida los campos de entrada
  validarCampos() {
    let correcto = true;

    // Validación de nickname
    if (this.nickname.length < 3 || this.nickname.length > 25) {
      this.errores.nickname = 'El Nickname debe tener entre 3 y 25 caracteres.';
      correcto = false;
    } else {
      this.errores.nickname = null;
    }

    return correcto;
  }

  // Función que valida si el nickname existe en la base de datos
  async ingresar() {
    const nick = this.nickname.trim(); // Eliminamos posibles espacios en blanco

    if (!nick) {
      this.errores.nickname = 'El campo Nickname es obligatorio.';
      return;
    }

    // Obtenemos la lista de usuarios desde el servicio
    await this.usuarioService.buscarUsuarios(); // Asegúrate de llamar a buscarUsuarios para actualizar la lista

    // Verificamos si el nickname ingresado existe en la base de datos
    const usuarioExistente = this.usuarioService.Usuarios.find(usuario => usuario.nick_usuario.toLowerCase() === nick.toLowerCase());

    if (!usuarioExistente) {
      await this.mostrarAlerta('El Nickname ingresado no existe.');
    } else {
      // Al encontrar el nickname, verificamos si tiene una pregunta de seguridad asociada
      const respuestaExistente = await this.usuarioService.verificarPreguntaSeguridad(usuarioExistente.id_usuario);

      if (!respuestaExistente) {
        // Si no tiene pregunta de seguridad, mostramos una alerta
        await this.mostrarAlerta('Este usuario no tiene una pregunta de seguridad asignada.');
      } else {
        // Si tiene una pregunta de seguridad, almacenamos el id_usuario en localStorage
        localStorage.setItem('id_usuario', usuarioExistente.id_usuario.toString());
        localStorage.setItem('nick_usuario', usuarioExistente.nick_usuario);

        // Si el nick es correcto, redirigimos al formulario de cambiar contraseña
        this.router.navigate(['/cambiar-password']);
      }
    }
  }

  cancelar() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}
