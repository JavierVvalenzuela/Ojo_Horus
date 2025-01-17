import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.page.html',
  styleUrls: ['./seguridad.page.scss'],
  standalone: false,
})
export class SeguridadPage implements OnInit {
  // Variables para manejar la pregunta de seguridad y su respuesta
  preguntaSeguridad: string = '';
  respuestaSeguridad: string = '';

  // Variables para manejar los errores
  errores: {
    preguntaSeguridad: string | null;
    respuestaSeguridad: string | null;
  } = {
    preguntaSeguridad: null,
    respuestaSeguridad: null,
  };

  constructor(private router: Router) {}

  // Método para validar los campos y mostrar errores
  validarCampos() {
    let correcto = true;

    // Validación de pregunta de seguridad
    if (!this.preguntaSeguridad) {
      this.errores.preguntaSeguridad =
        'Debe seleccionar una pregunta de seguridad.';
      correcto = false;
    } else {
      this.errores.preguntaSeguridad = null;
    }

    // Validación de respuesta de seguridad
    if (!this.respuestaSeguridad.trim()) {
      this.errores.respuestaSeguridad =
        'Debe ingresar la respuesta a la pregunta de seguridad.';
      correcto = false;
    } else {
      this.errores.respuestaSeguridad = null;
    }

    return correcto;
  }

  cancelar() {
    this.router.navigate(['/login']); // Redirigir al login o cualquier otra página que prefieras
  }

  ngOnInit() {}

  guardarRespuesta() {
    // Limpiar los errores antes de verificar
    this.errores.preguntaSeguridad = null;
    this.errores.respuestaSeguridad = null;

    // Validar los campos
    if (this.validarCampos()) {
      // Si todo está correcto, puedes proceder con la acción
      console.log('Respuesta guardada correctamente');
      this.router.navigate(['/configuraciones']); // Cambiar la ruta según tu flujo
    }
  }
}

