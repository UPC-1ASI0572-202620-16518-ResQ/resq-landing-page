import { LanguageService } from './language';
import { Component, inject } from '@angular/core';
@Component({
  selector: 'resq-final-cta',
  templateUrl: './final-cta.html',
  styleUrl: './final-cta.scss',
})
export class FinalCtaSection {
  language = inject(LanguageService);
  tr(value: string) {
    return this.language.text(value);
  }
}
