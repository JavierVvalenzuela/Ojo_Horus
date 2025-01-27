import { Component, OnInit } from '@angular/core';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-usuariosbaneados',
  templateUrl: './usuariosbaneados.page.html',
  styleUrls: ['./usuariosbaneados.page.scss'],
  standalone: false,
})
export class UsuariosbaneadosPage implements OnInit {
  listaRepPost: any[] = [];


  constructor(private bd : BdServicioService) { }

  ngOnInit() {
    this.bd.cargarReporte();
    this.bd.fetchCargarReporte().subscribe((reportes: any)=>{
      this.listaRepPost = reportes
    })
  }
  
  ignorarReporte(reporte: any) {
    // Lógica para ignorar el reporte
    console.log('Ignorando reporte:', reporte);
  }

  banearReporte(reporte: any) {
    // Lógica para banear al usuario relacionado con el reporte
    console.log('Baneando usuario:', reporte);
  }

}
