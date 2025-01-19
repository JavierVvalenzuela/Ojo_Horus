import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  nickname: string = '';
  email: string = '';
  clave: string = '';
  cclave: string = '';

  errores: { nickname: string | null; email: string | null; clave: string | null; cclave: string | null } = {
    nickname: null,
    email: null,
    clave: null,
    cclave: null
  };

  constructor(private bd: BdServicioService, private alertController: AlertController, private router: Router) { }

  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  validarCampos(): boolean {
    let correcto = true;

    // Validación de nickname
    if (this.nickname.length < 3 || this.nickname.length > 25) {
      this.errores.nickname = 'El Nickname debe tener entre 3 y 25 caracteres.';
      correcto = false;
    } else {
      this.errores.nickname = null;
    }

    // Validación de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      this.errores.email = 'Ingrese un correo electrónico válido.';
      correcto = false;
    } else {
      this.errores.email = null;
    }

    // Validación de clave
    if (this.clave.length < 8 || this.clave.length > 20 || !/[A-Z]/.test(this.clave) || !/\d/.test(this.clave) || !/[-!@#$%^&*.]/.test(this.clave)) {
      this.errores.clave = 'La contraseña debe tener entre 8 y 20 caracteres, incluir una mayúscula, un número y un carácter especial.';
      correcto = false;
    } else {
      this.errores.clave = null;
    }

    // Validación de confirmación de clave
    if (this.clave !== this.cclave) {
      this.errores.cclave = 'Las contraseñas no coinciden.';
      correcto = false;
    } else {
      this.errores.cclave = null;
    }

    return correcto;
  }

  async registrar() {
    if (!this.validarCampos()) {
      return;
    }

    const usuario = {
      id_usuario: 0, 
      nombre_usuario: this.nickname,
      nick_usuario: this.nickname,
      correo_usuario: this.email,
      telefono_usuario: null, 
      contrasena_usuario: this.clave,
      img_perfil: null, 
      estado_cuenta: 1,
      razon_ban: null,
      id_rol: 2, 
    };

    try {
      await this.bd.registrarUsuario(usuario);
      this.presentAlert('Registro', 'Usuario registrado correctamente.');
      this.router.navigate(['/login']);
    } catch (error) {
      this.presentAlert('Error', `No se pudo registrar el usuario: ${(error as any).message || error}`);
    }
  }

  ngOnInit() { }
}
