import { Injectable } from '@angular/core';

export interface InventarioItem {
  id: number;
  sedeId: number;
  productoId: number;
  stock: number;
  reorderPoint: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private inventarioKey = 'inventario';

  constructor() { }

  getInventarioIdByName(name: any){
    const inventario = this.getInventario();
    const inventarioId = inventario.find(i => i.productoId === name);
    return inventarioId;
  }

  getInventario(): InventarioItem[] {
    const inventario = localStorage.getItem(this.inventarioKey);
    return inventario ? JSON.parse(inventario) : [];
  }

  addInventario(inventarioItem: InventarioItem): void {
    const inventario = this.getInventario();
    inventario.push(inventarioItem);
    localStorage.setItem(this.inventarioKey, JSON.stringify(inventario));
  }

  updateInventario(updatedInventarioItem: InventarioItem): void {
    const inventario = this.getInventario();
    const index = inventario.findIndex(i => i.id === updatedInventarioItem.id);
    if (index !== -1) {
      inventario[index] = updatedInventarioItem;
      localStorage.setItem(this.inventarioKey, JSON.stringify(inventario));
    }
  }

  deleteInventario(id: number): void {
    let inventario = this.getInventario();
    inventario = inventario.filter(i => i.id !== id);
    localStorage.setItem(this.inventarioKey, JSON.stringify(inventario));
  }
}
