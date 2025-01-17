import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.page.html',
  styleUrls: ['./cambiar-password.page.scss'],
  standalone: false,
})
export class CambiarPasswordPage implements OnInit {
  preguntaSeguridad: string = '';
  clave: string = '';
  confirmarClave: string = '';
  respuestaSeguridad: string = '';

  errores: { preguntaSeguridad: string | null; clave: string | null; confirmarClave: string | null; respuestaSeguridad: string | null } = {
    preguntaSeguridad: null,
    clave: null,
    confirmarClave: null,
    respuestaSeguridad: null 
  };

  constructor(private alertController: AlertController, private router: Router) {}

  ngOnInit() {}

  cambiarContrasena() {
    this.limpiarErrores(); // Limpiar los errores previos antes de validar

    let valido = true;

    // Validación de la pregunta de seguridad
    if (!this.preguntaSeguridad) {
      this.errores.preguntaSeguridad = 'La pregunta de seguridad es requerida';
      valido = false;
    }

    // Validación de la respuesta de la pregunta de seguridad
    if (!this.respuestaSeguridad) {
      this.errores.respuestaSeguridad = 'La respuesta es requerida';
      valido = false;
    }

    // Validación de la contraseña
    if (this.clave !== this.confirmarClave) {
      this.errores.clave = 'Las contraseñas no coinciden';
      this.errores.confirmarClave = 'Las contraseñas no coinciden';
      valido = false;
    }

    // Validaciones adicionales de la contraseña
    if (this.clave.length < 8 || this.clave.length > 20) {
      this.errores.clave = 'La contraseña debe tener entre 8 y 20 caracteres';
      valido = false;
    }
    if (!/[A-Z]/.test(this.clave)) {
      this.errores.clave = 'La contraseña debe contener al menos una mayúscula';
      valido = false;
    }
    if (!/\d/.test(this.clave)) {
      this.errores.clave = 'La contraseña debe contener al menos un número';
      valido = false;
    }
    if (!/[-!@#$%^&*.]/.test(this.clave)) {
      this.errores.clave = 'La contraseña debe contener al menos un carácter especial';
      valido = false;
    }

    if (valido) {
      // Si todo es correcto, redirigir al login
      this.router.navigate(['/login']);
    }
  }

  limpiarErrores() {
    // Limpiar los mensajes de error
    this.errores.preguntaSeguridad = null;
    this.errores.clave = null;
    this.errores.confirmarClave = null;
    this.errores.respuestaSeguridad = null;  
  }

  async mostrarMensaje() {
    const alert = await this.alertController.create({
      header: 'Próximamente',
      message: 'Esta funcionalidad estará disponible pronto.',
      buttons: ['OK']
    });

    await alert.present();
  }
}