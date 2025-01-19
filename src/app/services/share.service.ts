import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  /**
   * Comparte contenido utilizando la funcionalidad nativa.
   * @param title El título del contenido.
   * @param message El mensaje del contenido.
   * @param url La URL opcional del contenido.
   */
  async shareContent(title: string, message: string, url?: string): Promise<void> {
    try {
      await Share.share({
        title,
        text: message,
        url,
        dialogTitle: 'Compartir contenido',
      });
    } catch (error) {
      console.error('Error al compartir contenido:', error);
    }
  }
}