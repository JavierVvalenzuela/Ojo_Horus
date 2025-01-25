import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  // Importa AlertController

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

  errores: { nickname: string | null} = {
    nickname: null,
  };

  constructor(private router: Router, private alertController: AlertController) {}

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

  // Función que muestra la alerta si el nickname no es encontrado
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Función que valida si el nickname existe
  async ingresar() {
    const nick = this.nickname.trim(); // Eliminamos posibles espacios en blanco
    const storedNick = localStorage.getItem('nick_usuario'); // Obtenemos el nickname del localStorage

    if (!nick) {
      this.errores.nickname = 'El campo Nickname es obligatorio.';
      return;
    }

    if (nick !== storedNick) {
      // Si el nick no coincide con el almacenado, mostramos la alerta
      await this.mostrarAlerta('El Nickname ingresado no existe.');
    } else {
      // Si el nick es correcto, redirigimos al formulario de cambiar contraseña
      this.router.navigate(['/cambiar-password']);
    }
  }

  cancelar() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}
