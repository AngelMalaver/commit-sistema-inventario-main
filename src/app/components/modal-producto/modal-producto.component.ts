import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnChanges {
  @Input() producto: any; 
  @Output() closed = new EventEmitter<boolean>(); 
  showModal = false;
  form: Producto = { 
    id: 0,
    nombre: '',
    marca: '',
    proveedor: '',
    precio: 0,
    categoria: ''
  };

  constructor(private productoService: ProductoService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['producto'] && changes['producto'].currentValue) {
      this.showModal = true;
      this.form = { ...changes['producto'].currentValue };
    } else {
      this.showModal = true;
      this.form = {
        id: this.productoService.getProductos().length + 1,
        nombre: '',
        marca: '',
        proveedor: '',
        precio: 0,
        categoria: ''
      };
    }
  }
  onFileChange(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.imagen = reader.result as string;
      };
    }
  }
  
  submitForm(event: Event) {
    event.preventDefault();

    if (this.isValidForm()) {
      if (this.producto) {
        this.productoService.updateProducto(this.form);
      } else {
        this.productoService.addProducto(this.form);
      }
      this.closed.emit(true); 
      this.showModal = false;
    } 
  }

  isValidForm(): boolean {
    if (this.form.nombre.trim() === '' || this.form.marca.trim() === '' || this.form.proveedor.trim() === '' || this.form.precio === null || this.form.categoria.trim() === '') {
      alert('Por favor, complete todos los campos requeridos.');
      return false;
    }else if (this.form.precio <= 0) {
      alert('El precio debe ser un valor positivo.');
      return false;
    }

    return true;
  }

  onClose() { 
    this.closed.emit(false); 
    this.showModal = false;
  }
}
