import { Component, input, inject } from '@angular/core';
import { LanguageService } from './language';
import { RESQ_MEDIA } from './resq.config';
@Component({
  selector: 'resq-media',
  template: `
    <div [class]="'media-placeholder media-placeholder--' + kind()" [class.has-image]="source">
      @if (source) {
        <img
          [src]="source"
          [alt]="purpose()"
          [attr.loading]="priority() ? 'eager' : 'lazy'"
          [attr.fetchpriority]="priority() ? 'high' : 'auto'"
          decoding="async"
        />
      } @else {
        <div class="slot-corners" aria-hidden="true"></div>
        <div class="slot-label">
          <span class="slot-cross" aria-hidden="true">＋</span>
          <span>{{ language.t('RECURSO VISUAL PENDIENTE', 'VISUAL ASSET PENDING') }}</span>
          <strong>{{ asset() }}</strong
          ><small>{{ ratio() }} · {{ purpose() }}</small>
          @if (kind() === '3d') {
            <small
              >PNG / WebP · {{ language.t('fondo transparente', 'transparent background') }}</small
            >
          }
        </div>
      }
    </div>
  `,
})
export class MediaSlot {
  language = inject(LanguageService);
  asset = input.required<string>();
  kind = input('image');
  priority = input(false);
  ratio = input('16:9');
  purpose = input.required<string>();
  get source() {
    return RESQ_MEDIA[this.asset()];
  }
}
