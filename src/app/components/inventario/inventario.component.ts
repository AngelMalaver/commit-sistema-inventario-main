import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventarioItem,InventarioService } from '../../services/inventario.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  inventario: InventarioItem[] = [];
  selectedInventarioItem: InventarioItem | null = null;
  sedeId: number = 0;
  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private inventarioService: InventarioService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sedeId = params['sedeId'];
      this.inventario = this.inventarioService.getInventario().filter(i => i.sedeId === this.sedeId);
    });
  }

  openModal() {
    this.selectedInventarioItem = null;
    this.showModal = true;
  }

  closeModal(event: boolean) {
    if (event) {
      this.inventario = this.inventarioService.getInventario().filter(i => i.sedeId === this.sedeId);
      console.log(this.inventario);
      
    }
    this.showModal= false;
  }

  editInventario(item: InventarioItem) {
    this.selectedInventarioItem = item;
    this.showModal = true;
  }

  deleteInventario(id: number) {
    this.inventarioService.deleteInventario(id);
    this.inventario = this.inventarioService.getInventario().filter(i => i.sedeId === this.sedeId);
  }

  getProductName(productoId: number): string {
    const productos = this.productoService.getProductos()
    const productoEnc = productos.find(p => p.id == productoId);
    // console.log(this.productoService.getProductos())
    // console.log(productos)
    // console.log(`Hola soy el ${productos}`)
    return productoEnc ? productoEnc.nombre : 'Producto no encontrado';
    
  }
}
