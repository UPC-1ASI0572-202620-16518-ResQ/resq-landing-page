import { LanguageService } from './language';
import { Component, inject } from '@angular/core';
import { INFRASTRUCTURE_SOLUTIONS } from './solutions.config';

@Component({
  selector: 'resq-solutions',

  templateUrl: './solutions.html',
  styleUrl: './solutions.scss',
})
export class SolutionsSectionComponent {
  language = inject(LanguageService);
  tr(value: string) {
    return this.language.text(value);
  }

  solutions = INFRASTRUCTURE_SOLUTIONS;
}
