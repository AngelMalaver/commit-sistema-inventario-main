import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto, ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  busquedaForm: FormGroup;
  productos: Producto[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productoService: ProductoService,
  ) {
    this.busquedaForm = this.fb.group({
      nombre: [''],
      categoria: [''],
      precioMin: [null],
      precioMax: [null],
      proveedor: [''],
      marca:[''],
    });
  }

  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
  }

  buscarProductos() {
    const criterios = this.busquedaForm.value;
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    const resultados = productos.filter((producto: any) => {
      return (!criterios.nombre || producto.nombre.toLowerCase().includes(criterios.nombre.toLowerCase())) &&
             (!criterios.categoria || producto.categoria.toLowerCase() === criterios.categoria.toLowerCase()) &&
             (!criterios.marca || producto.marca.toLowerCase() === criterios.marca.toLowerCase()) &&
             (!criterios.precioMin || producto.precio >= criterios.precioMin) &&
             (!criterios.precioMax || producto.precio <= criterios.precioMax) &&
             (!criterios.proveedor || producto.proveedor.toLowerCase().includes(criterios.proveedor.toLowerCase()));
    });
    

    this.router.navigate(['/resultados'], { state: { resultados } });
  }
  
}
