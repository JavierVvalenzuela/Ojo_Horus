import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

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
  idPreguntaSeguridad: number = 0;

  // Variables para manejar los errores
  errores: {
    preguntaSeguridad: string | null;
    respuestaSeguridad: string | null;
  } = {
    preguntaSeguridad: null,
    respuestaSeguridad: null,
  };

  // Lista de preguntas de seguridad
  preguntas: any[] = [];

  constructor(
    private router: Router,
    private seguridadService: BdServicioService  // Inyecta el servicio
  ) {}

  ngOnInit() {
    // Obtener las preguntas de seguridad desde el servicio
    this.seguridadService.obtenerPreguntasSeguridad().subscribe(
      (preguntas) => {
        this.preguntas = preguntas;
      },
      (error) => {
        console.log('Error al obtener las preguntas:', error);
      }
    );
  }

  // Método que se ejecuta cuando el usuario selecciona una pregunta
  onPreguntaChange() {
    console.log('Pregunta seleccionada: ', this.idPreguntaSeguridad);
  }

  // Método para validar los campos y mostrar errores
  validarCampos() {
    let correcto = true;

    // Validación de pregunta de seguridad
    if (this.idPreguntaSeguridad === 0) {
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
    this.router.navigate(['/configuraciones']); // Redirigir al login o cualquier otra página
  }

  guardarRespuesta() {
    // Limpiar los errores antes de verificar
    this.errores.preguntaSeguridad = null;
    this.errores.respuestaSeguridad = null;
  
    // Validar los campos
    if (this.validarCampos()) {
      const id_usuario = parseInt(localStorage.getItem('id_usuario') || '0');
      // Llamamos al servicio para guardar o actualizar la respuesta de seguridad
      this.seguridadService.guardarRespuestaSeguridad(id_usuario, this.idPreguntaSeguridad, this.respuestaSeguridad).subscribe(
        (res) => {
          console.log(res.mensaje);  // Mensaje de éxito o error
          this.router.navigate(['/configuraciones']); // Redirigir a la siguiente página
        },
        (error) => {
          console.log('Error al guardar la respuesta:', error);
        }
      );
    }
  }  
}

