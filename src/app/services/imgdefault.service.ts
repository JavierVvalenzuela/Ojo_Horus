import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgdefaultService {
  httpOptions = { 
    headers: new HttpHeaders(
      { 
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*'
      })
  }

  apiUrl: string = "https://ui-avatars.com/api/?";

  constructor(private http: HttpClient) { }

  // Esta función obtiene la imagen desde la API y devuelve la URL
  obtenerImg(nombreusuario: string): Observable<Blob> {
    const url = `${this.apiUrl}name=${nombreusuario}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
