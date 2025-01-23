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
   * @param url La URL opcional del contenido (puede ser de una imagen o una URL genérica).
   */
  async shareContent(title: string, message: string, url?: string): Promise<void> {
    try {
      // Si no se proporciona una URL, se puede generar una URL predeterminada o dejarla vacía
      const shareUrl = url || 'https://example.com'; // O cualquier URL predeterminada

      await Share.share({
        title,
        text: message,
        url: shareUrl,
        dialogTitle: 'Compartir contenido',
      });
    } catch (error) {
      console.error('Error al compartir contenido:', error);
    }
  }
}