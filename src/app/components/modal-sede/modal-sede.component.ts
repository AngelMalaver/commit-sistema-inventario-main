import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SedeService } from '../../services/sede.service';
import { Sede } from '../../services/sede.service';


@Component({
  selector: 'app-modal-sede',
  templateUrl: './modal-sede.component.html',
  styleUrls: ['./modal-sede.component.css']
  
})
export class ModalSedeComponent implements OnChanges {
  @Input() sede: Sede | null = null;
  @Output() close = new EventEmitter<boolean>();
  showModal = false;
  
  form: Sede = {
    id: 0, 
    nombre: '',
    ubicacion: '',
    contacto: ''
  };

  constructor(private sedeService: SedeService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sede'] && changes['sede'].currentValue) {
      this.showModal = true;
      this.form = { ...changes['sede'].currentValue };
    } else {
      this.showModal = true;
      this.form = {
        id: this.sedeService.getSedes().length +1,
        nombre: '',
        ubicacion: '',
        contacto: ''
      };
    }
  }

  submitForm() {
    
    if (this.form.nombre.trim() && this.form.ubicacion.trim() && this.form.contacto.trim()) {
      if (this.sede) {
        this.sedeService.updateSede(this.form);
      } else {
        this.sedeService.addSede(this.form);
      }
      this.close.emit(true);
      this.showModal = false;
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  closeModal() {
    this.close.emit(false);
    this.showModal = false;
  }
}
