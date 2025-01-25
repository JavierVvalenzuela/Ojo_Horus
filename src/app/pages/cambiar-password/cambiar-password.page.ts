import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.page.html',
  styleUrls: ['./cambiar-password.page.scss'],
  standalone: false,
})
export class CambiarPasswordPage implements OnInit {
  nickname: string = '';  // Asumimos que nickname es un string
  idUsuario: number = 0;  // idUsuario debe ser un número
  idPreguntaSeguridad: number = 0; // idPreguntaSeguridad debe ser un número
  respuestaSeguridad: string = '';
  nuevaClave: string = '';
  confirmarClave: string = '';

  errores: {
    nickname: string | null;
    idPreguntaSeguridad: string | null;
    respuestaSeguridad: string | null;
    nuevaClave: string | null;
    confirmarClave: string | null;
  } = {
    nickname: null,
    idPreguntaSeguridad: null,
    respuestaSeguridad: null,
    nuevaClave: null,
    confirmarClave: null,
  };

  preguntas: any[] = []; // Lista de preguntas de seguridad

  constructor(
    private router: Router,
    private bdServicio: BdServicioService // Servicio de la base de datos
  ) {}

  ngOnInit() {
    // Recuperar el idUsuario desde el localStorage
    const storedIdUsuario = localStorage.getItem('id_usuario');
    if (storedIdUsuario) {
      this.idUsuario = parseInt(storedIdUsuario, 10);  // Asegúrate de convertirlo a número
    }

    // Obtener preguntas de seguridad desde la base de datos
    this.bdServicio.obtenerPreguntasSeguridad().subscribe(
      (preguntas) => {
        this.preguntas = preguntas;
      },
      (error) => {
        console.error('Error al obtener las preguntas de seguridad:', error);
      }
    );
  }

  validarCampos() {
    let correcto = true;
  
    // Validación de pregunta de seguridad
    if (!this.idPreguntaSeguridad) {
      this.errores.idPreguntaSeguridad = 'Debe seleccionar una pregunta de seguridad.';
      correcto = false;
    } else {
      this.errores.idPreguntaSeguridad = null;
    }
  
    // Validación de respuesta de seguridad
    if (!this.respuestaSeguridad?.trim()) {
      this.errores.respuestaSeguridad = 'Debe ingresar la respuesta a la pregunta de seguridad.';
      correcto = false;
    } else {
      this.errores.respuestaSeguridad = null;
    }
  
    // Validación de nueva contraseña
    if (
      this.nuevaClave.length < 8 ||
      !/[A-Z]/.test(this.nuevaClave) ||
      !/\d/.test(this.nuevaClave) ||
      !/[-!@#$%^&*.]/.test(this.nuevaClave)
    ) {
      this.errores.nuevaClave = 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial.';
      correcto = false;
    } else {
      this.errores.nuevaClave = null;
    }
  
    // Validación de confirmación de clave
    if (this.nuevaClave !== this.confirmarClave) {
      this.errores.confirmarClave = 'Las contraseñas no coinciden.';
      correcto = false;
    } else {
      this.errores.confirmarClave = null;
    }
  
    return correcto;
  }
  
  actualizarContrasena() {
    console.log('Botón Ingresar presionado');  // Verificar si la función se llama

    // Verificar si se obtuvo el idUsuario antes de continuar
    if (!this.idUsuario) {
      console.error('Error: idUsuario no está definido.');
      return;
    }

    if (this.validarCampos()) {
      // Verificar pregunta y respuesta de seguridad
      this.bdServicio.verificarPreguntaRespuesta(this.idUsuario, this.idPreguntaSeguridad, this.respuestaSeguridad)
        .toPromise()  // Convierte el Observable a Promesa
        .then((valido: boolean | undefined) => {
          if (valido === undefined) {
            console.error('Error: la respuesta de seguridad no es válida');
            return;
          }
  
          console.log('Respuesta de seguridad válida:', valido);  // Verificar si la verificación pasa
          if (valido) {
            // Actualizar la contraseña del usuario
            this.bdServicio.actualizarContrasena(this.idUsuario, this.nuevaClave, this.confirmarClave)
              .toPromise()  // Convierte el Observable a Promesa
              .then(() => {
                console.log('Contraseña actualizada correctamente.');
                this.router.navigate(['/login']);
                console.log('Redirigiendo a login');
              })
              .catch((error) => {
                console.error('Error al actualizar la contraseña:', error);
              });
          } else {
            this.errores.respuestaSeguridad = 'La pregunta o respuesta de seguridad no coincide.';
          }
        })
        .catch((error) => {
          console.error('Error al verificar la pregunta y respuesta de seguridad:', error);
        });
    }
  }
  
  cancelar() {
    this.router.navigate(['/recuperar-password']);
  }
}
