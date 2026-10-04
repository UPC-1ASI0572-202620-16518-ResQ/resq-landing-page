import { Directive, ElementRef, inject, afterNextRender, DestroyRef } from '@angular/core';
@Directive({ selector: '[resqReveal]' })
export class Reveal {
  private element = inject(ElementRef<HTMLElement>);
  private destroy = inject(DestroyRef);
  constructor() {
    afterNextRender(() => {
      if (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !('IntersectionObserver' in window)
      )
        return;
      const target = this.element.nativeElement;
      if (target.getBoundingClientRect().top <= window.innerHeight) return;
      target.classList.add('reveal-pending');
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            target.classList.remove('reveal-pending');
            observer.disconnect();
          }
        },
        { threshold: 0.06 },
      );
      observer.observe(target);
      this.destroy.onDestroy(() => observer.disconnect());
    });
  }
}
