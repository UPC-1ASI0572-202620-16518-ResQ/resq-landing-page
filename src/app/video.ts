import { Component, input, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from './language';

import { RESQ_VIDEOS } from './resq.config';
export function videoDestination(raw: string): { embed?: string; external?: string } {
  if (!raw) return {};
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:') return {};
    let id = '';
    if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
    if (
      [
        'youtube.com',
        'www.youtube.com',
        'youtube-nocookie.com',
        'www.youtube-nocookie.com',
      ].includes(url.hostname)
    ) {
      id = url.searchParams.get('v') || url.pathname.split('/').pop() || '';
    }
    if (/^[a-zA-Z0-9_-]{11}$/.test(id))
      return { embed: 'https://www.youtube-nocookie.com/embed/' + id };
    if (
      [
        'stream.microsoft.com',
        'web.microsoftstream.com',
        'clipchamp.com',
        'app.clipchamp.com',
      ].includes(url.hostname) ||
      url.hostname.endsWith('.sharepoint.com')
    )
      return { external: url.href };
  } catch {}
  return {};
}
@Component({
  selector: 'resq-video',

  template: `
    <div
      class="video-frame"
      [attr.data-video]="kind() === 'product' ? 'about-product' : 'about-team'"
      [attr.data-provider]="config.provider"
    >
      @if (playing() && destination.embed) {
        <iframe
          [src]="trusted"
          [title]="title()"
          allow="fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
        <button
          class="video-close"
          (click)="playing.set(false)"
          [attr.aria-label]="language.t('Cerrar video', 'Close video')"
        >
          ×
        </button>
      } @else {
        <div class="team-video-art" aria-hidden="true">
          <img src="media/resq-icon.png" alt="" width="100" height="100" />
        </div>
        @if (destination.embed || destination.external) {
          <button
            class="play"
            (click)="play()"
            [attr.aria-label]="language.t('Reproducir: ', 'Play: ') + title()"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
              <path d="m8 5 11 7-11 7V5Z" />
            </svg>
          </button>
        }
      }
    </div>
  `,
})
export class VideoSection {
  language = inject(LanguageService);
  sanitizer = inject(DomSanitizer);
  kind = input<'product' | 'team'>('product');
  title = input.required<string>();
  playing = signal(false);
  message = signal(false);
  get config() {
    return RESQ_VIDEOS[this.kind()];
  }
  get destination() {
    return videoDestination(this.config.url);
  }
  get trusted() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.destination.embed || '');
  }
  play() {
    if (this.destination.embed) this.playing.set(true);
    else if (this.destination.external)
      window.open(this.destination.external, '_blank', 'noopener,noreferrer');
    else this.message.set(true);
  }
}
