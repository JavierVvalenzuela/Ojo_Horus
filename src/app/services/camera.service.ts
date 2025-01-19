import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraPhoto } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  /**
   * Captura una foto utilizando la cámara del dispositivo.
   * @returns La URL de la foto tomada.
   */
  async capturePhoto(): Promise<string | null> {
    try {
      const image: CameraPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
      return image.webPath || null;
    } catch (error) {
      console.error('Error al capturar la foto:', error);
      return null;
    }
  }
}