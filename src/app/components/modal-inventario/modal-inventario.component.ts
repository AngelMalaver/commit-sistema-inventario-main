import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { Producto, ProductoService } from '../../services/producto.service';
import { InventarioItem } from '../../services/inventario.service';

@Component({
  selector: 'app-modal-inventario',
  templateUrl: './modal-inventario.component.html',
  styleUrls: ['./modal-inventario.component.css']
})
export class ModalInventarioComponent implements OnChanges {
  @Input() inventarioItem: InventarioItem | null = null;
  @Input() sedeId: number = 0;
  @Output() closed = new EventEmitter<boolean>();
  showModal = false;
  form: InventarioItem = {
    id: this.inventarioService.getInventario().length + 1,
    sedeId: this.sedeId,
    productoId: 0,
    stock: 0,
    reorderPoint: 0
  };
  productos: Producto[] = [];
  maxChars = 50;

  
  constructor(private inventarioService: InventarioService, private productoService: ProductoService) { }

  ngOnChanges(changes: SimpleChanges) {

    this.productos = this.productoService.getProductos().map(producto => {
      return { ...producto, nombre: this.truncateText(producto.nombre, this.maxChars) };
    });
    if (changes['inventarioItem'] && changes['inventarioItem'].currentValue) {
      this.showModal = true;
      this.form = { ...changes['inventarioItem'].currentValue };
    } else {
      this.showModal = true;
      this.form = {
        id: this.inventarioService.getInventario().length + 1,
        sedeId: this.sedeId,
        productoId: this.productos.length ? this.productos[0].id : 0,
        stock: 0,
        reorderPoint: 0
      };
    }
  }
  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  submitForm() {
    if (this.form.stock < 0 || this.form.reorderPoint < 0) {
      alert('El Stock y el Punto de Reorden (ROP) no pueden ser negativos.');
      return;
    }
  
    const inventarioExistente = this.inventarioService.getInventario()
      .filter(item => item.sedeId === this.form.sedeId && item.productoId === this.form.productoId);
    console.log(inventarioExistente);
    
    if (this.inventarioItem) {
      if (inventarioExistente.length > 1 || (inventarioExistente.length === 1 && inventarioExistente[0].id !== this.form.id)) {
        alert('El producto ya está registrado en el inventario de esta sede.');
        return;
      }
      this.inventarioService.updateInventario(this.form);
    } else {
      if (inventarioExistente.length > 0) {
        alert('El producto ya está registrado en el inventario de esta sede.');
        return;
      }
      this.inventarioService.addInventario(this.form);
    }
  
    this.closed.emit(true);
    this.showModal = false;
  }
  close() {
    this.closed.emit(false);
    this.showModal = false;
  }
}
