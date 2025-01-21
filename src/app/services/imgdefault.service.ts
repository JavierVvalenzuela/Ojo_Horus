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

  apiUrl: string= "https://ui-avatars.com/api/?"

  constructor(private http: HttpClient) { }

  obtenerImg(nombreusuario: string): Observable<any>{

    return this.http.get(this.apiUrl + 'name='+ nombreusuario, {responseType: "blob"})
  }
}
