import { LanguageService } from './language';
import { Component, inject } from '@angular/core';
import { RESQ_PRODUCT_VIDEO, RESQ_VIDEOS } from './resq.config';
import { VideoSection } from './video';
@Component({
  selector: 'resq-product',
  imports: [VideoSection],
  templateUrl: './product-section.html',
  styleUrl: './product-section.scss',
})
export class ProductSection {
  language = inject(LanguageService);
  tr(value: string) {
    return this.language.text(value);
  }

  readonly video = RESQ_PRODUCT_VIDEO;
  readonly hostedVideo = RESQ_VIDEOS.product.url;
}
