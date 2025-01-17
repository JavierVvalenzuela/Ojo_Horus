import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'acuerdos-legales',
    loadChildren: () => import('./pages/acuerdos-legales/acuerdos-legales.module').then( m => m.AcuerdosLegalesPageModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./pages/administrador/administrador.module').then( m => m.AdministradorPageModule)
  },
  {
    path: 'cambiar-password',
    loadChildren: () => import('./pages/cambiar-password/cambiar-password.module').then( m => m.CambiarPasswordPageModule)
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./pages/comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  },
  {
    path: 'comentariosreport',
    loadChildren: () => import('./pages/comentariosreport/comentariosreport.module').then( m => m.ComentariosreportPageModule)
  },
  {
    path: 'comunidad',
    loadChildren: () => import('./pages/comunidad/comunidad.module').then( m => m.ComunidadPageModule)
  },
  {
    path: 'comunidades',
    loadChildren: () => import('./pages/comunidades/comunidades.module').then( m => m.ComunidadesPageModule)
  },
  {
    path: 'configuraciones',
    loadChildren: () => import('./pages/configuraciones/configuraciones.module').then( m => m.ConfiguracionesPageModule)
  },
  {
    path: 'crearcomunidad',
    loadChildren: () => import('./pages/crearcomunidad/crearcomunidad.module').then( m => m.CrearcomunidadPageModule)
  },
  {
    path: 'desbanearusuarios',
    loadChildren: () => import('./pages/desbanearusuarios/desbanearusuarios.module').then( m => m.DesbanearusuariosPageModule)
  },
  {
    path: 'editar-com',
    loadChildren: () => import('./pages/editar-com/editar-com.module').then( m => m.EditarComPageModule)
  },
  {
    path: 'editarperfil',
    loadChildren: () => import('./pages/editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'perfilusuario',
    loadChildren: () => import('./pages/perfilusuario/perfilusuario.module').then( m => m.PerfilusuarioPageModule)
  },
  {
    path: 'politicadeprivacidad',
    loadChildren: () => import('./pages/politicadeprivacidad/politicadeprivacidad.module').then( m => m.PoliticadeprivacidadPageModule)
  },
  {
    path: 'politicadeusuario',
    loadChildren: () => import('./pages/politicadeusuario/politicadeusuario.module').then( m => m.PoliticadeusuarioPageModule)
  },
  {
    path: 'postreportados',
    loadChildren: () => import('./pages/postreportados/postreportados.module').then( m => m.PostreportadosPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./pages/recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reportar-contenido',
    loadChildren: () => import('./pages/reportar-contenido/reportar-contenido.module').then( m => m.ReportarContenidoPageModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./pages/seguridad/seguridad.module').then( m => m.SeguridadPageModule)
  },
  {
    path: 'usuariosbaneados',
    loadChildren: () => import('./pages/usuariosbaneados/usuariosbaneados.module').then( m => m.UsuariosbaneadosPageModule)
  },
  {
    path: 'perfiles',
    loadChildren: () => import('./pages/perfiles/perfiles.module').then( m => m.PerfilesPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
