import { Component, input } from '@angular/core';
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
        <img src="/media/resq-icon.png" alt="" aria-hidden="true" />
      }
    </div>
  `,
})
export class MediaSlot {
  asset = input.required<string>();
  kind = input('image');
  priority = input(false);
  purpose = input.required<string>();
  get source() {
    return RESQ_MEDIA[this.asset()];
  }
}
