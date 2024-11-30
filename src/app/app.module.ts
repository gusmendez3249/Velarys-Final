import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importa FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './velarys/admin/admin.module';
import { UserModule } from './velarys/user/user.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PagoComponent } from './pago/pago/pago.component';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    PagoComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Agrega FormsModule aquí
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    AdminModule,
    UserModule,
    FormsModule

  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
