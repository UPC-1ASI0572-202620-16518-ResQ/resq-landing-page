import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LanguageService } from './language';
import { LEGAL_CONTENT } from './legal.content';
import { RESQ_LEGAL } from './resq.config';
@Component({ selector: 'resq-legal', imports: [RouterLink], templateUrl: './legal.html' })
export class LegalPage {
  language = inject(LanguageService);
  route = inject(ActivatedRoute);
  kind: 'privacy' | 'terms' = this.route.snapshot.data['kind'];
  sections = LEGAL_CONTENT[this.kind];
  legal = RESQ_LEGAL;
  t(es: string, en: string) {
    return this.language.t(es, en);
  }
  get title() {
    return this.kind === 'privacy'
      ? this.t('Política de privacidad', 'Privacy Policy')
      : this.t('Términos y condiciones', 'Terms & Conditions');
  }
  replace(text: string) {
    return text
      .replaceAll('[LEGAL ENTITY]', this.legal.entity)
      .replaceAll('[CONTACT EMAIL]', this.legal.email)
      .replaceAll('[JURISDICTION]', this.legal.jurisdiction)
      .replaceAll('[ADDRESS]', this.legal.address)
      .replaceAll('[LAST UPDATED]', this.legal.updated);
  }
}
