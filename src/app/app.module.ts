import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GeneradorMultiplicativoComponent } from './generador-multiplicativo/generador-multiplicativo.component';
import { CentrosCuadradosComponent } from './centroscuadrados/centros-cuadrados.component';
import { CongruencialMixtoComponent } from './congruencialmixto/congruencial-mixto.component';
import { CongruencialComponent } from './congruencial/congruencial.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CentrosCuadradosComponent,
    CongruencialComponent,
    CongruencialMixtoComponent,
    GeneradorMultiplicativoComponent,
    FlashMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/centros_cuadrados',
        pathMatch: 'full'
      },
      {
        path: 'centros_cuadrados',
        component: CentrosCuadradosComponent
      },
      {
        path: 'congruencial',
        component: CongruencialComponent
      },
      {
        path: 'congruencial_mixto',
        component: CongruencialMixtoComponent
      },
      {
        path: 'generador_multiplicativo',
        component: GeneradorMultiplicativoComponent
      },
      {
        path: '**',
        redirectTo: '/centros_cuadrados'
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
