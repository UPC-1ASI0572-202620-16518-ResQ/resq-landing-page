import { Directive, ElementRef, DestroyRef, NgZone, afterNextRender, inject } from '@angular/core';

@Directive({ selector: '[resqSharedHeight]' })
export class SharedSectionHeight {
  private element = inject(ElementRef<HTMLElement>);
  private destroy = inject(DestroyRef);
  private zone = inject(NgZone);
  constructor() {
    afterNextRender(() =>
      this.zone.runOutsideAngular(() => {
        if (!('ResizeObserver' in window)) return;
        const section = this.element.nativeElement as HTMLElement;
        const content = section.querySelector<HTMLElement>('.container');
        if (!content) return;
        const update = () => {
          const style = getComputedStyle(section);
          const height =
            content.getBoundingClientRect().height +
            parseFloat(style.paddingTop) +
            parseFloat(style.paddingBottom);
          document.documentElement.style.setProperty(
            '--intro-sections-height',
            `${Math.ceil(height)}px`,
          );
        };
        const observer = new ResizeObserver(update);
        observer.observe(content);
        window.addEventListener('resize', update);
        update();
        this.destroy.onDestroy(() => {
          observer.disconnect();
          window.removeEventListener('resize', update);
          document.documentElement.style.removeProperty('--intro-sections-height');
        });
      }),
    );
  }
}
