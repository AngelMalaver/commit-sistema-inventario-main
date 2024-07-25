import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = []; 
  selectedProducto: any = null; 
  showModal = false;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
  }

  openModal(): void {
    this.selectedProducto = null;
    this.showModal = true;
  }

  closeModal(event: boolean): void {
    if (event) {
      this.productos = this.productoService.getProductos();
    }
    this.showModal = false; 
  }

  editProducto(producto: any): void {
    this.selectedProducto = producto;
    this.showModal = true;
  }

  deleteProducto(id: number): void { 
    this.productoService.deleteProducto(id);
    this.productos = this.productoService.getProductos();
  }
}
