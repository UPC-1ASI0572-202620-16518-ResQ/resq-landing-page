import { TestBed } from '@angular/core/testing';
import { ThreeBuilding } from './three-building';
import { WhyResqSection } from './why-resq';
import { vi } from 'vitest';
import type * as Three from 'three';
const graphics = vi.hoisted(() => ({
  render: vi.fn(),
  dispose: vi.fn(),
  controlsDispose: vi.fn(),
}));
vi.mock('three', async (original) => {
  const actual = await original<typeof import('three')>();
  return {
    ...actual,
    WebGLRenderer: class {
      domElement = document.createElement('canvas');
      setPixelRatio() {}
      setSize() {}
      render = graphics.render;
      dispose = graphics.dispose;
    },
  };
});
vi.mock('three/addons/controls/OrbitControls.js', async () => {
  const T = await import('three');
  return {
    OrbitControls: class {
      target = new T.Vector3();
      update() {}
      saveState() {}
      reset() {}
      addEventListener() {}
      dispose = graphics.controlsDispose;
    },
  };
});
describe('Interactive ResQ building', () => {
  let motion: EventTarget & { matches: boolean };
  let intersection: IntersectionObserverCallback;
  beforeEach(async () => {
    graphics.render.mockClear();
    graphics.dispose.mockClear();
    graphics.controlsDispose.mockClear();
    motion = Object.assign(new EventTarget(), { matches: true });
    vi.stubGlobal('matchMedia', () => motion);
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: IntersectionObserverCallback) {
          intersection = callback;
        }
        observe() {
          queueMicrotask(() =>
            intersection(
              [{ isIntersecting: true }] as IntersectionObserverEntry[],
              this as unknown as IntersectionObserver,
            ),
          );
        }
        disconnect() {}
      },
    );
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
      },
    );
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    await TestBed.configureTestingModule({
      imports: [ThreeBuilding, WhyResqSection],
    }).compileComponents();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  it('renders distinct card states, provides sensor labels and supports keyboard camera control', async () => {
    const fixture = TestBed.createComponent(ThreeBuilding);
    await fixture.whenStable();
    await vi.waitFor(() => expect(graphics.render).toHaveBeenCalled());
    const last = () => graphics.render.mock.calls.at(-1)!;
    const scene = last()[0] as Three.Scene;
    const camera = last()[1] as Three.PerspectiveCamera;
    const lines = scene.children.filter((c) => c.type === 'Line') as Three.Line<
      Three.BufferGeometry,
      Three.LineBasicMaterial
    >[];
    expect(lines[0].material.opacity).toBe(0.2);
    fixture.componentRef.setInput('mode', 1);
    await fixture.whenStable();
    expect(lines[0].material.opacity).toBe(0.75);
    fixture.componentRef.setInput('mode', 2);
    await fixture.whenStable();
    expect(lines[0].material.opacity).toBe(0.55);
    fixture.componentInstance.selectSensor(2);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.sensor-tooltip').textContent).toContain('Gas');
    const distance = camera.position.distanceTo(new (await import('three')).Vector3(0, 2.3, 0));
    fixture.componentInstance.keyboard(new KeyboardEvent('keydown', { key: '+' }));
    expect(camera.position.distanceTo(new (await import('three')).Vector3(0, 2.3, 0))).toBeLessThan(
      distance,
    );
    const position = camera.position.clone();
    fixture.componentInstance.keyboard(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(camera.position.equals(position)).toBe(false);
    fixture.destroy();
    expect(graphics.dispose).toHaveBeenCalledOnce();
    expect(graphics.controlsDispose).toHaveBeenCalledOnce();
  });
  it('stops animation for reduced motion and offscreen scenes', async () => {
    const fixture = TestBed.createComponent(ThreeBuilding);
    await fixture.whenStable();
    await vi.waitFor(() => expect(graphics.render).toHaveBeenCalled());
    vi.useFakeTimers();
    graphics.render.mockClear();
    vi.advanceTimersByTime(1000);
    expect(graphics.render).not.toHaveBeenCalled();
    motion.matches = false;
    motion.dispatchEvent(new Event('change'));
    graphics.render.mockClear();
    vi.advanceTimersByTime(500);
    expect(graphics.render).toHaveBeenCalledTimes(10);
    intersection(
      [{ isIntersecting: false }] as IntersectionObserverEntry[],
      {} as IntersectionObserver,
    );
    graphics.render.mockClear();
    vi.advanceTimersByTime(1000);
    expect(graphics.render).not.toHaveBeenCalled();
    fixture.destroy();
  });
});
