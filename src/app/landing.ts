import { Component, inject } from '@angular/core';
import { Reveal } from './reveal';
import { LanguageService } from './language';
import { HeroCarousel } from './hero';
import { MediaSlot } from './media';
import { VideoSection } from './video';
import { RESQ_SEGMENTS, RESQ_LINKS } from './resq.config';
@Component({
  selector: 'resq-landing',
  imports: [HeroCarousel, MediaSlot, VideoSection, Reveal],
  templateUrl: './landing.html',
})
export class Landing {
  language = inject(LanguageService);
  segments = RESQ_SEGMENTS;
  steps = [
    {
      icon: '◉',
      es: 'Detectar',
      en: 'Detect',
      textEs: 'Reconocer señales de riesgo en el entorno con dispositivos IoT.',
      textEn: 'Recognize signs of risk in the environment with IoT devices.',
    },
    {
      icon: '⌁',
      es: 'Comprender',
      en: 'Understand',
      textEs: 'Convertir señales en información útil para entender lo que sucede.',
      textEn: 'Turn signals into useful information to understand what is happening.',
    },
    {
      icon: '⚑',
      es: 'Alertar',
      en: 'Alert',
      textEs: 'Hacer visible el riesgo mediante alertas con contexto.',
      textEn: 'Make risk visible through contextual alerts.',
    },
    {
      icon: '↗',
      es: 'Responder',
      en: 'Respond',
      textEs: 'Conectar la información con la gestión de una respuesta oportuna.',
      textEn: 'Connect information with timely response management.',
    },
  ];
  t(es: string, en: string) {
    return this.language.t(es, en);
  }
  detailLink(index: number) {
    return (
      (index === 0 ? RESQ_LINKS.segment01 : RESQ_LINKS.segment02) ||
      (index === 0 ? '#como-funciona' : '#tecnologia')
    );
  }
  segmentLink(index: number) {
    return (index === 0 ? RESQ_LINKS.segment01 : RESQ_LINKS.segment02) || '#segment-' + (index + 1);
  }
}
