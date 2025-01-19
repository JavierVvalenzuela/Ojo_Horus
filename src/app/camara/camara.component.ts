import { Component } from '@angular/core';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent {
  fotografia: string | null = null;

  constructor(private cameraService: CameraService) {}
  
  async takePhoto() {
    this.fotografia = await this.cameraService.capturePhoto();
  }


}