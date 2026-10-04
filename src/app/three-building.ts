import { LanguageService } from './language';
import {
  Component,
  ElementRef,
  DestroyRef,
  NgZone,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import type * as Three from 'three';
import type { OrbitControls as Controls } from 'three/addons/controls/OrbitControls.js';
@Component({
  selector: 'resq-three-building',
  templateUrl: './three-building.html',
  styleUrl: './three-building.scss',
})
export class ThreeBuilding {
  language = inject(LanguageService);
  mode = input(0);
  ready = signal(false);
  unavailable = signal(false);
  reduced = signal(false);
  sensor = signal(-1);
  tooltip = signal('');
  labels = ['Temperatura', 'Humo', 'Gas', 'Movimiento'];
  states = ['Detección y alertas', 'Monitoreo centralizado', 'Respuesta coordinada'];
  private target = viewChild.required<ElementRef<HTMLElement>>('canvasHost');
  private zone = inject(NgZone);
  private destroy = inject(DestroyRef);
  private updateScene: () => void = () => {};
  private resetCamera: () => void = () => {};
  private cameraKey: (key: string) => void = () => {};
  constructor() {
    effect(() => {
      this.mode();
      this.sensor();
      this.updateScene();
    });
    afterNextRender(() => this.zone.runOutsideAngular(() => this.initializeLifecycle()));
  }
  selectSensor(index: number) {
    this.sensor.set(this.sensor() === index ? -1 : index);
    this.tooltip.set(this.sensor() < 0 ? '' : this.labels[index]);
  }
  resetView() {
    this.resetCamera();
  }
  keyboard(event: KeyboardEvent) {
    if (
      ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', 'Home'].includes(event.key)
    ) {
      event.preventDefault();
      this.cameraKey(event.key);
    }
  }
  private initializeLifecycle() {
    if (!('IntersectionObserver' in window) || !('ResizeObserver' in window)) return;
    const host = this.target().nativeElement;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    this.zone.run(() => this.reduced.set(media.matches));
    let disposed = false,
      visible = false,
      loading = false,
      timer: number | undefined;
    let renderer: Three.WebGLRenderer | undefined,
      scene: Three.Scene,
      camera: Three.PerspectiveCamera,
      controls: Controls | undefined;
    let hovered = -1;
    const nodes: Three.Mesh<Three.SphereGeometry, Three.MeshBasicMaterial>[] = [];
    const zones: Three.Mesh<Three.BoxGeometry, Three.MeshStandardMaterial>[] = [];
    const connections: Three.Line<Three.BufferGeometry, Three.LineBasicMaterial>[] = [];
    const particles: Three.Mesh[] = [];
    const geometries = new Set<Three.BufferGeometry>(),
      materials = new Set<Three.Material>();
    const draw = () => {
      if (renderer && !disposed) renderer.render(scene, camera);
    };
    const stop = () => {
      if (timer !== undefined) {
        clearInterval(timer);
        timer = undefined;
      }
    };
    const repaint = () => {
      if (!renderer) return;
      const mode = this.mode(),
        selected = this.sensor(),
        current = hovered >= 0 ? hovered : selected;
      nodes.forEach((node, i) => {
        node.material.color.setHex(
          current === i ? 0xffffff : (mode === 0 || mode === 2) && i === 2 ? 0xffa978 : 0x65baff,
        );
        node.scale.setScalar(current === i ? 1.8 : 1);
      });
      zones.forEach((zone, i) => {
        zone.material.emissive.setHex(
          mode === 1 ? 0x154f86 : i === (mode === 2 ? 2 : 1) ? 0x2467a2 : 0x071626,
        );
        zone.material.emissiveIntensity = mode === 1 ? 0.7 : 0.55;
      });
      connections.forEach((line) => {
        line.material.opacity = mode === 1 ? 0.75 : mode === 2 ? 0.55 : 0.2;
        line.material.color.setHex(mode === 2 ? 0x8dbfff : 0x4599e6);
      });
      particles.forEach((p) => (p.visible = mode !== 0));
      draw();
    };
    this.updateScene = repaint;
    const animate = () => {
      stop();
      repaint();
      if (renderer && visible && !document.hidden && !media.matches)
        timer = window.setInterval(() => {
          const time = performance.now() / 1000,
            mode = this.mode();
          nodes.forEach((node, i) => {
            if (i !== hovered && i !== this.sensor())
              node.scale.setScalar(1 + Math.sin(time * 2 + i) * 0.14);
          });
          particles.forEach((p, i) => {
            const route = connections[i].geometry.attributes['position'];
            const a = new THREEVector(route.getX(0), route.getY(0), route.getZ(0));
            const b = new THREEVector(route.getX(1), route.getY(1), route.getZ(1));
            p.position.copy(a.lerp(b, (time * 0.22 + i * 0.2) % 1));
          });
          if (mode === 2) zones[2].material.emissiveIntensity = 0.6 + Math.sin(time * 2) * 0.18;
          draw();
        }, 50);
    };
    let THREEVector: typeof Three.Vector3;
    const resize = () => {
      if (!renderer || !host.clientWidth || !host.clientHeight) return;
      renderer.setSize(host.clientWidth, host.clientHeight);
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      draw();
    };
    let pointerMove: (event: PointerEvent) => void = () => {},
      pointerLeave: () => void = () => {};
    const load = async () => {
      if (loading || renderer || disposed) return;
      loading = true;
      try {
        const [T, O] = await Promise.all([
          import('three'),
          import('three/addons/controls/OrbitControls.js'),
        ]);
        if (disposed) return;
        THREEVector = T.Vector3;
        renderer = new T.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.domElement.setAttribute('aria-hidden', 'true');
        renderer.domElement.style.display = 'block';
        host.appendChild(renderer.domElement);
        scene = new T.Scene();
        camera = new T.PerspectiveCamera(38, 1, 0.1, 80);
        camera.position.set(7, 5.5, 9);
        controls = new O.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 2.3, 0);
        controls.minDistance = 6;
        controls.maxDistance = 20;
        controls.maxPolarAngle = Math.PI * 0.49;
        controls.enableDamping = false;
        controls.panSpeed = 0.35;
        controls.rotateSpeed = 0.6;
        controls.zoomSpeed = 0.65;
        controls.update();
        controls.saveState();
        controls.addEventListener('change', draw);
        this.resetCamera = () => {
          controls?.reset();
        };
        this.cameraKey = (key) => {
          if (key === 'Home') {
            controls?.reset();
            return;
          }
          const offset = camera.position.clone().sub(controls!.target),
            spherical = new T.Spherical().setFromVector3(offset);
          if (key === 'ArrowLeft') spherical.theta -= 0.12;
          if (key === 'ArrowRight') spherical.theta += 0.12;
          if (key === 'ArrowUp') spherical.phi = Math.max(0.2, spherical.phi - 0.1);
          if (key === 'ArrowDown') spherical.phi = Math.min(Math.PI * 0.49, spherical.phi + 0.1);
          if (key === '+' || key === '=') spherical.radius = Math.max(6, spherical.radius * 0.9);
          if (key === '-') spherical.radius = Math.min(20, spherical.radius * 1.1);
          camera.position.copy(new T.Vector3().setFromSpherical(spherical).add(controls!.target));
          controls!.update();
          draw();
        };
        scene.add(new T.AmbientLight(0xa8cfff, 2));
        const light = new T.DirectionalLight(0xd0e6ff, 3);
        light.position.set(4, 8, 6);
        scene.add(light);
        const box = (
          w: number,
          h: number,
          d: number,
          color: number,
          x: number,
          y: number,
          z: number,
          glow = false,
        ) => {
          const geo = new T.BoxGeometry(w, h, d);
          geometries.add(geo);
          const mat = new T.MeshStandardMaterial({
            color,
            roughness: 0.4,
            metalness: 0.3,
            emissive: glow ? 0x154f86 : 0x000000,
            emissiveIntensity: 0.5,
          });
          materials.add(mat);
          const mesh = new T.Mesh(geo, mat);
          mesh.position.set(x, y, z);
          scene.add(mesh);
          return mesh;
        };
        box(5, 0.18, 4, 0x142b42, 0, -0.1, 0);
        box(2.7, 4.5, 1.9, 0x142d48, 0, 2.25, 0);
        for (let floor = 0; floor < 5; floor++) {
          box(2.88, 0.08, 2.08, 0x5983a5, 0, floor * 0.85 + 0.35, 0);
          const zone = box(2.74, 0.58, 0.04, 0x174569, 0, floor * 0.85 + 0.69, 0.98, true);
          zones.push(zone);
          for (let column = 0; column < 4; column++) {
            box(0.07, 0.65, 0.04, 0x96b6cf, -1.05 + column * 0.7, floor * 0.85 + 0.69, 1.02);
            box(0.04, 0.58, 0.36, 0x1c4c72, 1.37, floor * 0.85 + 0.69, -0.62 + column * 0.4, true);
          }
        }
        box(3, 0.16, 2.2, 0x487294, 0, 4.65, 0);
        box(0.5, 0.22, 0.6, 0x346186, 0.6, 4.84, -0.4);
        const outlineBox = new T.BoxGeometry(2.7, 4.5, 1.9);
        const edgeGeo = new T.EdgesGeometry(outlineBox);
        outlineBox.dispose();
        geometries.add(edgeGeo);
        const edgeMat = new T.LineBasicMaterial({
          color: 0x81b6df,
          transparent: true,
          opacity: 0.45,
        });
        materials.add(edgeMat);
        const edges = new T.LineSegments(edgeGeo, edgeMat);
        edges.position.set(0, 2.25, 0);
        scene.add(edges);
        const sphere = new T.SphereGeometry(0.11, 12, 8);
        geometries.add(sphere);
        const hub = new T.Vector3(2.3, 0.35, 1.1);
        const sensorPositions = [
          [-0.8, 3.25, 1.06],
          [0.7, 4.1, 1.06],
          [-0.6, 1.55, 1.06],
          [1.47, 2.4, 0.3],
        ];
        sensorPositions.forEach((pos, i) => {
          const mat = new T.MeshBasicMaterial({ color: 0x65baff });
          materials.add(mat);
          const node = new T.Mesh(sphere, mat);
          node.position.set(...(pos as [number, number, number]));
          node.userData['sensor'] = i;
          scene.add(node);
          nodes.push(node);
          const geo = new T.BufferGeometry().setFromPoints([node.position.clone(), hub]);
          geometries.add(geo);
          const lineMat = new T.LineBasicMaterial({
            color: 0x4599e6,
            transparent: true,
            opacity: 0.3,
          });
          materials.add(lineMat);
          const line = new T.Line(geo, lineMat);
          scene.add(line);
          connections.push(line);
          const particle = new T.Mesh(sphere, mat);
          particle.scale.setScalar(0.4);
          particle.position.copy(node.position);
          scene.add(particle);
          particles.push(particle);
        });
        const hubMat = new T.MeshBasicMaterial({ color: 0x8bcaff });
        materials.add(hubMat);
        const hubMesh = new T.Mesh(sphere, hubMat);
        hubMesh.scale.setScalar(1.9);
        hubMesh.position.copy(hub);
        scene.add(hubMesh);
        const ringGeo = new T.TorusGeometry(0.4, 0.025, 6, 36);
        geometries.add(ringGeo);
        const ring = new T.Mesh(ringGeo, hubMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(hub.x, 0.03, hub.z);
        scene.add(ring);
        const grid = new T.GridHelper(9, 18, 0x315576, 0x18334c);
        scene.add(grid);
        geometries.add(grid.geometry);
        (Array.isArray(grid.material) ? grid.material : [grid.material]).forEach((m) =>
          materials.add(m),
        );
        const ray = new T.Raycaster();
        const pointer = new T.Vector2();
        pointerMove = (event) => {
          if (event.buttons) return;
          const rect = renderer!.domElement.getBoundingClientRect();
          pointer.set(
            ((event.clientX - rect.left) / rect.width) * 2 - 1,
            (-(event.clientY - rect.top) / rect.height) * 2 + 1,
          );
          ray.setFromCamera(pointer, camera);
          const hit = ray.intersectObjects(nodes)[0];
          hovered = hit ? Number(hit.object.userData['sensor']) : -1;
          this.zone.run(() =>
            this.tooltip.set(
              hovered >= 0
                ? this.labels[hovered]
                : this.sensor() >= 0
                  ? this.labels[this.sensor()]
                  : '',
            ),
          );
          repaint();
        };
        pointerLeave = () => {
          hovered = -1;
          this.zone.run(() =>
            this.tooltip.set(this.sensor() >= 0 ? this.labels[this.sensor()] : ''),
          );
          repaint();
        };
        host.addEventListener('pointermove', pointerMove);
        host.addEventListener('pointerleave', pointerLeave);
        resize();
        this.zone.run(() => this.ready.set(true));
        animate();
      } catch {
        renderer?.dispose();
        renderer = undefined;
        host.replaceChildren();
        this.zone.run(() => this.unavailable.set(true));
      } finally {
        loading = false;
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible) void load();
        animate();
      },
      { rootMargin: '100px' },
    );
    observer.observe(host);
    const resizer = new ResizeObserver(resize);
    resizer.observe(host);
    const motionChange = () => {
      this.zone.run(() => this.reduced.set(media.matches));
      animate();
    };
    media.addEventListener('change', motionChange);
    document.addEventListener('visibilitychange', animate);
    this.destroy.onDestroy(() => {
      disposed = true;
      stop();
      observer.disconnect();
      resizer.disconnect();
      controls?.dispose();
      host.removeEventListener('pointermove', pointerMove);
      host.removeEventListener('pointerleave', pointerLeave);
      media.removeEventListener('change', motionChange);
      document.removeEventListener('visibilitychange', animate);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer?.dispose();
      renderer?.domElement.remove();
      this.updateScene = () => {};
    });
  }
}
