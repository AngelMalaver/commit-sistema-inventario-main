import { Component, OnInit } from '@angular/core';
import { SedeService } from '../../services/sede.service';
import { Router } from '@angular/router';

interface Sede {
  id: number;
  nombre: string;
  ubicacion: string;
  contacto: string;
}

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {
  sedes: Sede[] = [];
  selectedSede: Sede | null = null;
  showModal = false;

  constructor(private sedeService: SedeService, private router: Router) { }

  ngOnInit(): void {
    this.sedes = this.sedeService.getSedes();
  }

  openModal() {
    this.selectedSede = null;
    this.showModal = true;
  }

  closeModal(event: boolean) {
    if (event) {
      this.sedes = this.sedeService.getSedes();
    }
    this.showModal = false; 
  }

  editSede(sede: Sede) {
    this.selectedSede = sede;
    this.showModal = true; 
  }

  deleteSede(id: number) {
    this.sedeService.deleteSede(id);
    this.sedes = this.sedeService.getSedes();
  }

  verInventario(sedeId: number) {
    this.router.navigate(['/inventario'], { queryParams: { sedeId } });
  }
}
