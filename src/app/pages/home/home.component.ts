import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ofertas = [
    {
      titulo: 'Secundario para Jóvenes y Adultos',
      descripcion: 'Completa tus estudios secundarios con orientación en Ciencias Sociales y Humanidades.'
    },
    {
      titulo: 'Talleres de Oficios',
      descripcion: 'Capacitación en oficios: informática, electricidad, carpintería, y más.'
    },
    {
      titulo: 'Apoyo Escolar',
      descripcion: 'Clases de apoyo para estudiantes de todos los niveles.'
    }
  ];
  ofertaActual = 0;

  prevOferta() {
    this.ofertaActual = (this.ofertaActual - 1 + this.ofertas.length) % this.ofertas.length;
  }
  nextOferta() {
    this.ofertaActual = (this.ofertaActual + 1) % this.ofertas.length;
  }
  goToOferta(i: number) {
    this.ofertaActual = i;
  }
}
