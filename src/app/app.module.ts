import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ModalProductoComponent } from './components/modal-producto/modal-producto.component';
import { ProductoService } from './services/producto.service';
import { SedesComponent } from './components/sedes/sedes.component';
import { ModalSedeComponent } from './components/modal-sede/modal-sede.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ModalInventarioComponent } from './components/modal-inventario/modal-inventario.component';
import { InventarioService } from './services/inventario.service';
import { SedeService } from './services/sede.service';

import { SearchFormComponent } from './components/search-form/search-form.component';
import { RickrollComponent } from './components/rickroll/rickroll.component';
import { LoginComponent } from './components/login/login.component';
import { ResultadosComponent } from './components/resultados/resultados.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ModalProductoComponent,
    SedesComponent,
    ModalSedeComponent,
    InventarioComponent,
    ModalInventarioComponent,
    SearchFormComponent,
    RickrollComponent,
    LoginComponent,
    ResultadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductoService, InventarioService, SedeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
