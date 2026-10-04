import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { LanguageService } from './language';
import { LEGAL_CONTENT } from './legal.content';
import { vi } from 'vitest';
import { HeroCarousel } from './hero';
import { LANDING_COPY } from './landing.copy';
import { videoDestination } from './video';
describe('ResQ', () => {
  beforeEach(async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: false })),
    );
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  it('renders shared navigation and both legal destinations', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('a[href="/privacy"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a[href="/terms"]')).toBeTruthy();
  });
  it('navigates legal routes, translates them and restores landing metadata', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/privacy');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.legal-section')).toHaveLength(4);
    expect(document.title).toContain('Política de privacidad');
    TestBed.inject(LanguageService).set('en');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Privacy Policy');
    await router.navigateByUrl('/terms');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('main')?.textContent).toContain(
      'replace emergency services',
    );
    await router.navigateByUrl('/');
    await fixture.whenStable();
    expect(document.title).toBe('ResQ');
    expect(fixture.nativeElement.querySelectorAll('.hero-slide')).toHaveLength(2);
  });
  it('keeps final navigation, contact actions and all landing sections translated', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const dom = fixture.nativeElement as HTMLElement;
    const telLinks = dom.querySelectorAll('resq-solutions a');
    expect(telLinks).toHaveLength(2);
    telLinks.forEach((link) => expect(link.getAttribute('href')).toBe('tel:+51948742332'));
    expect(dom.querySelector('a[aria-label="GitHub"]')?.getAttribute('href')).toBe(
      'https://github.com/UPC-1ASI0572-202620-16518-ResQ',
    );
    expect(dom.querySelector('footer .language-switch')).toBeNull();
    expect(dom.querySelector('.carousel-controls button[aria-label="Pausar carrusel"]')).toBeNull();
    expect(dom.querySelectorAll('.team-member')).toHaveLength(5);
    expect(dom.querySelector('.building-tools')).toBeNull();
    expect(dom.querySelector('.sensor-tools')).toBeNull();
    const language = TestBed.inject(LanguageService);
    language.set('en');
    await fixture.whenStable();
    expect(dom.querySelector('#benefits-heading')?.textContent).toContain('More control');
    expect(dom.querySelector('#product-heading')?.textContent).toContain('From detection');
    expect(dom.querySelector('#infrastructure-heading')?.textContent).toContain(
      'Protect your infrastructure',
    );
    expect(dom.querySelector('#closing-heading')?.textContent).toContain('Bring');
    const forbidden = /\bpendiente\b|por configurar|placeholder|to confirm|por confirmar/i;
    expect(forbidden.test(dom.textContent || '')).toBe(false);
    for (const sections of Object.values(LEGAL_CONTENT))
      for (const section of sections) {
        expect(forbidden.test(section.bodyEs + section.bodyEn)).toBe(false);
      }
    for (const [es, en] of Object.entries(LANDING_COPY)) expect(language.text(es)).toBe(en);
  });
  it('persists the language and translates all legal sections', () => {
    const language = TestBed.inject(LanguageService);
    expect(language.current()).toBe('es');
    language.set('en');
    expect(localStorage.getItem('resq-language')).toBe('en');
    expect(language.t('Español', 'English')).toBe('English');
    for (const sections of Object.values(LEGAL_CONTENT)) {
      expect(sections).toHaveLength(4);
      for (const section of sections) {
        expect(section.titleEs).toBeTruthy();
        expect(section.titleEn).toBeTruthy();
        expect(section.bodyEs).toBeTruthy();
        expect(section.bodyEn).toBeTruthy();
      }
    }
  });
  it('advances exactly two slides and stops automatic motion after manual interaction', () => {
    vi.useFakeTimers();
    const hero = TestBed.runInInjectionContext(() => new HeroCarousel());
    hero.reduced = { matches: false } as MediaQueryList;
    vi.advanceTimersByTime(6500);
    expect(hero.slide()).toBe(1);
    vi.advanceTimersByTime(6500);
    expect(hero.slide()).toBe(0);
    hero.select(1);
    vi.advanceTimersByTime(13000);
    expect(hero.slide()).toBe(1);
    hero.paused.set(false);
    hero.reduced = { matches: true } as MediaQueryList;
    vi.advanceTimersByTime(6500);
    expect(hero.slide()).toBe(1);
    hero.ngOnDestroy();
    vi.useRealTimers();
  });
  it('supports keyboard and horizontal swipe without hijacking vertical gestures', () => {
    const hero = TestBed.runInInjectionContext(() => new HeroCarousel());
    hero.keyboard(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(hero.slide()).toBe(1);
    const touch = (x: number, y: number) =>
      ({ changedTouches: [{ clientX: x, clientY: y }] }) as unknown as TouchEvent;
    hero.start(touch(200, 100));
    hero.end(touch(100, 105));
    expect(hero.slide()).toBe(0);
    hero.start(touch(100, 100));
    hero.end(touch(95, 250));
    expect(hero.slide()).toBe(0);
    hero.ngOnDestroy();
  });
  it('only embeds validated video providers after configuration', () => {
    expect(videoDestination('')).toEqual({});
    expect(videoDestination('javascript:alert(1)')).toEqual({});
    expect(videoDestination('https://untrusted.example/embed/123')).toEqual({});
    expect(videoDestination('https://youtu.be/abcdefghijk')).toEqual({
      embed: 'https://www.youtube-nocookie.com/embed/abcdefghijk',
    });
    expect(videoDestination('https://app.clipchamp.com/watch/confirmed')).toEqual({
      external: 'https://app.clipchamp.com/watch/confirmed',
    });
  });
});
