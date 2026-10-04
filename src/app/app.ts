import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { LanguageService } from './language';
import { RESQ_LINKS, RESQ_SEGMENTS } from './resq.config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  language = inject(LanguageService);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  menu = signal(false);
  scrolled = signal(false);
  links = RESQ_LINKS;
  segments = RESQ_SEGMENTS;
  year = new Date().getFullYear();
  constructor() {
    this.viewportScroller.setOffset(() => [0, window.innerWidth <= 800 ? 88 : 104]);
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menu.set(false);
        const page = event.urlAfterRedirects.split(/[?#]/)[0];
        this.language.page.set(
          page === '/privacy' ? 'privacy' : page === '/terms' ? 'terms' : 'landing',
        );
      }
    });
    if (RESQ_LINKS.canonicalOrigin) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
        if (event instanceof NavigationEnd)
          canonical.href = new URL(
            event.urlAfterRedirects.split('#')[0],
            RESQ_LINKS.canonicalOrigin,
          ).href;
      });
      document.head.appendChild(canonical);
    }
  }
  t(es: string, en: string) {
    return this.language.t(es, en);
  }
  @HostListener('window:scroll') scroll() {
    this.scrolled.set(window.scrollY > 24);
  }
  @HostListener('document:keydown.escape') escape() {
    if (this.menu()) {
      this.menu.set(false);
      document.getElementById('menu-toggle')?.focus();
    }
  }
}
