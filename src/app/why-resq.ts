import { SharedSectionHeight } from './shared-section-height';
import { LanguageService } from './language';
import { Component, signal, inject } from '@angular/core';
import { ThreeBuilding } from './three-building';
@Component({
  selector: 'resq-why',
  imports: [ThreeBuilding, SharedSectionHeight],
  templateUrl: './why-resq.html',
  styleUrl: './why-resq.scss',
})
export class WhyResqSection {
  language = inject(LanguageService);
  tr(value: string) {
    return this.language.text(value);
  }

  active = signal(0);
  cards = [
    {
      title: 'Detección y alertas en tiempo real',
      text: 'Identifica condiciones de riesgo mediante sensores de gases, temperatura, humedad y otros parámetros de la infraestructura.',
      icon: 'M12 3 3 7v6c0 5 9 8 9 8s9-3 9-8V7l-9-4ZM12 8v5m0 3v1',
      indicator: 'Detección y alertas',
    },
    {
      title: 'Visión centralizada de tu infraestructura',
      text: 'Monitorea zonas, dispositivos y eventos desde una visión centralizada con información clara y actualizada.',
      icon: 'M3 4h18v13H3zM8 21h8m-4-4v4M7 8h3v5H7zm7 1h3m-3 4h3',
      indicator: 'Zonas conectadas',
    },
    {
      title: 'Respuesta automatizada',
      text: 'Activa respuestas de forma automática a partir de las condiciones detectadas en la infraestructura.',
      icon: 'm13 2-9 12h7l-1 8 10-13h-7l0-7Z',
      indicator: 'Respuesta coordinada',
    },
  ];
}
