import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { LanguageService } from './language';
import { LEGAL_CONTENT } from './legal.content';
import { vi } from 'vitest';
import { HeroCarousel } from './hero';
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
    expect(fixture.nativeElement.querySelectorAll('.legal-section')).toHaveLength(17);
    expect(document.title).toContain('Política de privacidad');
    TestBed.inject(LanguageService).set('en');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Privacy Policy');
    await router.navigateByUrl('/terms');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('main')?.textContent).toContain(
      'substitute for public emergency services',
    );
    await router.navigateByUrl('/');
    await fixture.whenStable();
    expect(document.title).toBe('ResQ · Detect. Alert. Protect.');
    expect(fixture.nativeElement.querySelectorAll('.hero-slide')).toHaveLength(2);
  });
  it('persists the language and translates all legal sections', () => {
    const language = TestBed.inject(LanguageService);
    expect(language.current()).toBe('es');
    language.set('en');
    expect(localStorage.getItem('resq-language')).toBe('en');
    expect(language.t('Español', 'English')).toBe('English');
    for (const sections of Object.values(LEGAL_CONTENT)) {
      expect(sections).toHaveLength(17);
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
