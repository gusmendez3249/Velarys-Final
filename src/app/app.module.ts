import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursoComponent } from './velarys/curso/curso.component';
import { NivelesService } from './velarys/niveles/niveles.service';
@NgModule({
  declarations: [
    AppComponent,
    CursoComponent,
    // Otras declaraciones
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Otros módulos
  ],
  providers: [NivelesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

