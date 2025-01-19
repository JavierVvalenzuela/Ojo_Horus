import { Component, OnInit } from '@angular/core';
import { CameraService } from '../../services/camera.service';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
  standalone: false,
})
export class ComentariosPage implements OnInit {
  comentarios = [
    { id: 1, usuario: 'Usuario_extra', texto: 'Este mensaje es de prueba', foto: null as string | null },
    { id: 2, usuario: 'Usuario_extra2', texto: 'Yo creo sinceramente que estos alumnos se ganaron un 7 profe', foto: null as string | null },
    { id: 3, usuario: 'Usuario_extra3', texto: 'Estoy de acuerdo con el usuario extra 2 profe, 7 y aprueban esta materia', foto: null as string | null },
  ];

  constructor(
    private cameraService: CameraService,
    private shareService: ShareService
  ) {}

  ngOnInit() {}

  async takePhoto(comentarioId: number) {
    const comentario = this.comentarios.find((c) => c.id === comentarioId);
    if (comentario) {
      comentario.foto = await this.cameraService.capturePhoto();
    }
  }

  async shareContent(comentarioId: number) {
    const comentario = this.comentarios.find((c) => c.id === comentarioId);
    if (comentario && comentario.foto) {
      await this.shareService.shareContent(
        'Foto de Comentario',
        `Mira esta foto tomada por ${comentario.usuario}`,
        comentario.foto
      );
    }
  }
}