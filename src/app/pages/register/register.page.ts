import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  nick_usuario: string = '';
  correo_usuario: string = '';
  contrasena_usuario: string = '';
  cclave: string = '';
  
  errores: { 
    nick_usuario: string | null; 
    correo_usuario: string | null; 
    contrasena_usuario: string | null; 
    cclave: string | null 
  } = {
    nick_usuario: null,
    correo_usuario: null,
    contrasena_usuario: null,
    cclave: null
  };
  
  constructor(
    private bd: BdServicioService, 
    private alertController: AlertController, 
    private router: Router, 
    private nativestorage: NativeStorage
  ) { }
  
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
    if (this.nick_usuario.length < 3 || this.nick_usuario.length > 25) {
      this.errores.nick_usuario = 'El Nickname debe tener entre 3 y 25 caracteres.';
      correcto = false;
    } else {
      this.errores.nick_usuario = null;
    }
  
    // Validación de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.correo_usuario)) {
      this.errores.correo_usuario = 'Ingrese un correo electrónico válido.';
      correcto = false;
    } else {
      this.errores.correo_usuario = null;
    }
  
    // Validación de clave
    if (this.contrasena_usuario.length < 8 || this.contrasena_usuario.length > 20 || !/[A-Z]/.test(this.contrasena_usuario) || !/\d/.test(this.contrasena_usuario) || !/[-!@#$%^&*.]/.test(this.contrasena_usuario)) {
      this.errores.contrasena_usuario = 'La contraseña debe tener entre 8 y 20 caracteres, incluir una mayúscula, un número y un carácter especial.';
      correcto = false;
    } else {
      this.errores.contrasena_usuario = null;
    }
  
    // Validación de confirmación de clave
    if (this.contrasena_usuario !== this.cclave) {
      this.errores.cclave = 'Las contraseñas no coinciden.';
      correcto = false;
    } else {
      this.errores.cclave = null;
    }
  
    return correcto;
  }
  
  async registrar() {
    // Validar que los campos sean correctos
    if (this.validarCampos()) {
      // Si los campos son correctos, agregar el usuario
      this.bd.agregarUsuario(
        this.nick_usuario,
        this.correo_usuario,
        this.contrasena_usuario
      );
    }
  }
  
  ngOnInit() { 

  }
}