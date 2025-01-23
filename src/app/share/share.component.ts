import { Component, OnInit } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  fotografia: string | null = null;

  constructor(private shareService: ShareService, private cameraService: CameraService) { }

  async share() {
    // Si hay una foto, se comparte la URL de la foto, si no, se comparte una URL genérica
    await this.shareService.shareContent(
      'Increíble Mira esto',
      '¡Mira este increíble Foto!',
      this.fotografia || 'https://example.com' // Si no hay foto, se comparte una URL predeterminada
    );
  }

  async takePhoto() {
    this.fotografia = await this.cameraService.capturePhoto();  // Llamamos al servicio para capturar la foto
  }

  ngOnInit() {}
}