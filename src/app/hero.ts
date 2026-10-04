import { Component, inject, signal, OnDestroy } from '@angular/core';
import { LanguageService } from './language';
import { RESQ_SEGMENTS, RESQ_LINKS } from './resq.config';
import { MediaSlot } from './media';
@Component({
  selector: 'resq-hero',
  imports: [MediaSlot],
  templateUrl: './hero.html',
})
export class HeroCarousel implements OnDestroy {
  language = inject(LanguageService);
  segments = RESQ_SEGMENTS;
  slide = signal(0);
  paused = signal(false);
  hover = false;
  focused = false;
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  private touchX = 0;
  private touchY = 0;
  private timer = window.setInterval(() => {
    if (!this.paused() && !this.hover && !this.focused && !document.hidden && !this.reduced.matches)
      this.slide.update((v) => (v + 1) % 2);
  }, 6500);
  t(es: string, en: string) {
    return this.language.t(es, en);
  }
  select(index: number) {
    this.paused.set(true);
    this.slide.set((index + 2) % 2);
  }
  keyboard(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this.select(this.slide() + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }
  start(event: TouchEvent) {
    this.touchX = event.changedTouches[0].clientX;
    this.touchY = event.changedTouches[0].clientY;
  }
  end(event: TouchEvent) {
    const dx = event.changedTouches[0].clientX - this.touchX;
    const dy = event.changedTouches[0].clientY - this.touchY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
      this.select(this.slide() + (dx < 0 ? 1 : -1));
  }
  link(index: number) {
    return (
      (index === 0 ? RESQ_LINKS.segment01 : RESQ_LINKS.segment02) ||
      (index === 0 ? '#como-funciona' : '#segment-2')
    );
  }
  ngOnDestroy() {
    window.clearInterval(this.timer);
  }
}
