import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  errores: { nickname: string | null; preguntaSeguridad: string | null; respuestaSeguridad: string | null; clave: string | null; confirmarClave: string | null } = {
    nickname: null,
    preguntaSeguridad: null,
    respuestaSeguridad: null,
    clave: null,
    confirmarClave: null
  };

  constructor(private router: Router) {}

  validarCampos() {
    let correcto = true;

    // Validación de nickname
    if (this.nickname.length < 3 || this.nickname.length > 25) {
      this.errores.nickname = 'El Nickname debe tener entre 3 y 25 caracteres.';
      correcto = false;
    } else {
      this.errores.nickname = null;
    }

    // Validación de pregunta de seguridad
    if (!this.preguntaSeguridad) {
      this.errores.preguntaSeguridad = 'Debe seleccionar una pregunta de seguridad.';
      correcto = false;
    } else {
      this.errores.preguntaSeguridad = null;
    }

    // Validación de respuesta de seguridad
    if (!this.respuestaSeguridad.trim()) {
      this.errores.respuestaSeguridad = 'Debe ingresar la respuesta a la pregunta de seguridad.';
      correcto = false;
    } else {
      this.errores.respuestaSeguridad = null;
    }

    // Validación de clave
    if (
      this.clave.length < 8 || !/[A-Z]/.test(this.clave) || !/\d/.test(this.clave) || !/[-!@#$%^&*.]/.test(this.clave)
    ) {
      this.errores.clave = 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial.';
      correcto = false;
    } else {
      this.errores.clave = null;
    }

    // Validación de confirmación de clave
    if (this.clave !== this.confirmarClave) {
      this.errores.confirmarClave = 'Las contraseñas no coinciden.';
      correcto = false;
    } else {
      this.errores.confirmarClave = null;
    }

    // Si todo es correcto
    if (correcto) {
      this.router.navigate(['/login']);
    }
  }

  cancelar() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}