import { Injectable } from '@angular/core';

export interface Sede {
  id: number;
  nombre: string;
  ubicacion: string;
  contacto: string;
}

@Injectable({
  providedIn: 'root'
})
export class SedeService {
  private sedesKey = 'sedes';

  constructor() { }

  getSedes(): Sede[] {
    const sedes = localStorage.getItem(this.sedesKey);
    return sedes ? JSON.parse(sedes) : [];
  }

  getSedeIdByName(name: any){
    const sedes = this.getSedes();
    const sedeId = sedes.find(i => i.nombre === name)?.id;
    return sedeId
  }


  addSede(sede: Sede): void {
    const sedes = this.getSedes();
    sedes.push(sede);
    localStorage.setItem(this.sedesKey, JSON.stringify(sedes));
  }

  updateSede(updatedSede: Sede): void {
    const sedes = this.getSedes();
    const i = sedes.findIndex(s => s.id === updatedSede.id);
    if (i !== -1) {
      sedes[i] = updatedSede;
      localStorage.setItem(this.sedesKey, JSON.stringify(sedes));
    }
  }

  deleteSede(id: number): void {
    let sedes = this.getSedes();
    sedes = sedes.filter(s => s.id !== id);
    localStorage.setItem(this.sedesKey, JSON.stringify(sedes));
  }
}
