import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { SedesComponent } from './components/sedes/sedes.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { RickrollComponent } from './components/rickroll/rickroll.component';
import { LoginComponent } from './components/login/login.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ResultadosComponent } from './components/resultados/resultados.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'rickroll', component: RickrollComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'sedes', component: SedesComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'busqueda', component: SearchFormComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: '', redirectTo: '/busqueda', pathMatch: 'full' },
  { path: '**', redirectTo: '/busqueda' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
