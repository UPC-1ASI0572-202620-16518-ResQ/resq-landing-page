import { LANDING_COPY } from './landing.copy';
import { Injectable, signal, effect, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
export type Language = 'es' | 'en';
@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly current = signal<Language>('es');
  readonly page = signal<'landing' | 'privacy' | 'terms'>('landing');
  private title = inject(Title);
  private meta = inject(Meta);
  constructor() {
    try {
      if (localStorage.getItem('resq-language') === 'en') this.current.set('en');
    } catch {}
    effect(() => {
      document.documentElement.lang = this.current();
      const title =
        this.page() === 'privacy'
          ? this.t('ResQ', 'ResQ')
          : this.page() === 'terms'
            ? this.t('ResQ', 'ResQ')
            : this.t('ResQ', 'ResQ');
      const description = this.t(
        'ResQ conecta detección de riesgos, información y respuesta para proteger a las personas y sus espacios.',
        'ResQ connects risk detection, information and response to protect people and their spaces.',
      );
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({
        property: 'og:locale',
        content: this.current() === 'es' ? 'es_PE' : 'en_US',
      });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    });
  }
  t(es: string, en: string) {
    return this.current() === 'es' ? es : en;
  }
  text(value: string) {
    return this.current() === 'es' ? value : LANDING_COPY[value] || value;
  }
  set(language: Language) {
    this.current.set(language);
    try {
      localStorage.setItem('resq-language', language);
    } catch {}
  }
}

