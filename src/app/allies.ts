import { LanguageService } from './language';
import { Component, inject } from '@angular/core';
import { RESQ_ALLIES } from './allies.config';
@Component({ selector: 'resq-allies', templateUrl: './allies.html', styleUrl: './allies.scss' })
export class AlliesSection {
  language = inject(LanguageService);
  tr(value: string) {
    return this.language.text(value);
  }

  readonly allies = RESQ_ALLIES;
}
