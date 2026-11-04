import { useEffect, useRef } from 'react';

const CONTOUR_DENSITY = 13;
const ANIMATION_SPEED = 0.14;
const LINE_OPACITY = 0.3;
const CURSOR_STRENGTH = 0.2;
const GRID_SPACING = 0.82;
const GRID_OPACITY = 0.14;

const vertexShader = `
  attribute vec2 aPosition;
  varying vec2 vUv;

  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uPointerTime;
  uniform float uPointerActive;
  uniform float uContourDensity;
  uniform float uLineOpacity;
  uniform float uCursorStrength;
  uniform float uGridSpacing;
  uniform float uGridOpacity;

  float terrain(vec2 p) {
    float broad = sin(p.x * 0.62 + sin(p.y * 0.31) * 1.3);
    float sweep = sin(p.y * 0.56 + p.x * 0.24 + sin(p.x * 0.22) * 1.5);
    float ridge = sin(p.x * 0.34 - p.y * 0.26 + sin(p.y * 0.18 + p.x * 0.2) * 1.8);
    vec2 peakA = (p - vec2(-3.2, 9.0)) * vec2(0.24, 0.14);
    vec2 peakB = (p - vec2(2.4, 12.5)) * vec2(0.3, 0.17);
    vec2 peakC = (p - vec2(5.2, 7.8)) * vec2(0.22, 0.2);
    float peaks = exp(-dot(peakA, peakA)) * 0.42
      + exp(-dot(peakB, peakB)) * 0.34
      + exp(-dot(peakC, peakC)) * 0.28;
    return broad * 0.3 + sweep * 0.24 + ridge * 0.18 + peaks * 0.48;
  }

  void main() {
    float horizon = 0.91;
    float distanceFromHorizon = max(horizon - vUv.y, 0.045);
    float depth = 1.0 / distanceFromHorizon;
    vec2 p = vec2(
      (vUv.x - 0.5) * depth * 1.75 * (uResolution.x / uResolution.y),
      depth * 5.2
    );

    float height = terrain(p + vec2(uTime * 0.12, -uTime * 0.07));
    vec2 pointerDelta = (vUv - uPointer) * vec2(uResolution.x / uResolution.y, 1.0);
    float pointerDistance = length(pointerDelta);
    float pointerAge = max(uTime - uPointerTime, 0.0);
    float ripple = sin(pointerDistance * 46.0 - pointerAge * 4.0)
      * exp(-pointerDistance * 17.0)
      * exp(-pointerAge * 1.8)
      * uPointerActive;
    height += ripple * uCursorStrength;

    float contourValue = height * uContourDensity;
    float contourDistance = abs(fract(contourValue + 0.5) - 0.5);
    float antiAlias = 0.035;
    float contour = 1.0 - smoothstep(0.014, 0.014 + antiAlias, contourDistance);

    vec2 gridCoordinate = p + vec2(height * 0.72, height * 1.15);
    vec2 gridPosition = gridCoordinate / uGridSpacing;
    vec2 gridDistance = abs(fract(gridPosition + 0.5) - 0.5);
    vec2 gridAntialias = vec2(0.018);
    float gridX = 1.0 - smoothstep(0.018, 0.018 + gridAntialias.x, gridDistance.x);
    float gridY = 1.0 - smoothstep(0.018, 0.018 + gridAntialias.y, gridDistance.y);
    float grid = max(gridX, gridY);

    vec2 gridCell = floor(gridPosition + 0.5);
    float nodeHash = fract(sin(dot(gridCell, vec2(127.1, 311.7))) * 43758.5453);
    float nodeDistance = length((fract(gridPosition + 0.5) - 0.5) * uGridSpacing);
    float nodes = (1.0 - smoothstep(0.014, 0.04, nodeDistance)) * step(0.9, nodeHash);

    float markers = 0.0;
    for (int i = 0; i < 4; i++) {
      float seed = float(i + 1);
      float markerX = 0.64 + seed * 0.095 + sin(seed * 8.3) * 0.018;
      float markerY = 0.2 + fract(sin(seed * 41.7) * 43758.5453) * 0.14;
      float markerHeight = 0.055 + fract(sin(seed * 17.3) * 9137.17) * 0.09;
      float lineX = abs(vUv.x - markerX) * (uResolution.x / uResolution.y);
      float lineY = max(max(markerY - vUv.y, vUv.y - (markerY + markerHeight)), 0.0);
      float stem = 1.0 - smoothstep(0.0008, 0.0025, length(vec2(lineX, lineY)));
      float capY = vUv.y - (markerY + markerHeight);
      float cap = 1.0 - smoothstep(0.002, 0.005, length(vec2(lineX, capY)));
      markers = max(markers, max(stem, cap * 0.8));
    }

    float slopeX = (terrain(p + vec2(0.02, 0.0)) - terrain(p - vec2(0.02, 0.0))) * 25.0;
    float slopeY = (terrain(p + vec2(0.0, 0.02)) - terrain(p - vec2(0.0, 0.02))) * 25.0;
    vec3 normal = normalize(vec3(-slopeX * 34.0, -slopeY * 34.0, 1.0));
    float light = 0.35 + 0.65 * max(dot(normal, normalize(vec3(-0.45, 0.62, 0.8))), 0.0);
    float horizonFade = 1.0 - smoothstep(horizon - 0.55, horizon - 0.015, vUv.y);
    float edgeFade = smoothstep(0.0, 0.13, vUv.x) * (1.0 - smoothstep(0.86, 1.0, vUv.x) * 0.3);
    float depthFade = 0.58 + 0.42 * smoothstep(0.08, 0.9, distanceFromHorizon);
    float highlight = smoothstep(0.84, 0.98, light);
    float ink = mix(0.36, 0.95, highlight) * light;
    float terrainAlpha = horizonFade * edgeFade * depthFade;
    float gridInk = grid * uGridOpacity * terrainAlpha * mix(0.55, 1.0, light);
    float contourInk = contour * uLineOpacity * terrainAlpha;
    float markerInk = max(nodes * 0.3, markers * 0.65) * terrainAlpha;
    float alpha = max(max(contourInk, gridInk), markerInk);
    float brightness = max(max(contour * ink, grid * 0.58), max(nodes * 0.38, markers * 0.75));

    gl_FragColor = vec4(vec3(brightness), alpha);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error('Unable to allocate a topographic background shader.');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'Unknown shader compilation error.';
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

export function TopographicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let vertex: WebGLShader | null = null;
    let fragment: WebGLShader | null = null;
    let animationFrame = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let touchDevice = window.matchMedia('(pointer: coarse)').matches;
    let pointerActive = false;
    let pointerTime = 0;
    let startTime = performance.now();

    const uniforms: Record<string, WebGLUniformLocation | null> = {};

    const useFallback = (error: unknown) => {
      container.dataset.fallback = 'true';
      console.error('Topographic background WebGL initialization failed:', error);
    };

    try {
      gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
        premultipliedAlpha: false,
      });

      if (!gl) {
        useFallback(new Error('WebGL is unavailable in this browser.'));
        return;
      }

      vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
      fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
      program = gl.createProgram();
      if (!program) {
        throw new Error('Unable to allocate the topographic background program.');
      }

      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      vertex = null;
      fragment = null;

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'Unknown shader link error.');
      }

      buffer = gl.createBuffer();
      if (!buffer) {
        throw new Error('Unable to allocate the topographic background geometry.');
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      gl.useProgram(program);

      const position = gl.getAttribLocation(program, 'aPosition');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      for (const name of [
        'uResolution',
        'uPointer',
        'uTime',
        'uPointerTime',
        'uPointerActive',
        'uContourDensity',
        'uLineOpacity',
        'uCursorStrength',
        'uGridSpacing',
        'uGridOpacity',
      ]) {
        uniforms[name] = gl.getUniformLocation(program, name);
      }

      container.dataset.fallback = 'false';
    } catch (error) {
      if (gl) {
        if (program) gl.deleteProgram(program);
        if (buffer) gl.deleteBuffer(buffer);
        if (vertex) gl.deleteShader(vertex);
        if (fragment) gl.deleteShader(fragment);
      }
      useFallback(error);
      return;
    }

    if (!gl || !program) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, touchDevice ? 1 : 1.4);
      const width = Math.max(1, Math.round(rect.width * pixelRatio));
      const height = Math.max(1, Math.round(rect.height * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl!.viewport(0, 0, width, height);
      gl!.uniform2f(uniforms.uResolution, width, height);
    };

    const draw = (now: number) => {
      animationFrame = 0;
      if (!gl || !program) return;

      const elapsed = (now - startTime) / 1000;
      gl.useProgram(program);
      gl.uniform1f(uniforms.uTime, elapsed * ANIMATION_SPEED);
      gl.uniform1f(uniforms.uPointerTime, pointerTime * ANIMATION_SPEED);
      gl.uniform1f(uniforms.uPointerActive, pointerActive && !touchDevice ? 1 : 0);
      gl.uniform1f(uniforms.uContourDensity, CONTOUR_DENSITY);
      gl.uniform1f(uniforms.uLineOpacity, LINE_OPACITY);
      gl.uniform1f(uniforms.uCursorStrength, CURSOR_STRENGTH);
      gl.uniform1f(uniforms.uGridSpacing, GRID_SPACING);
      gl.uniform1f(uniforms.uGridOpacity, touchDevice ? GRID_OPACITY * 0.75 : GRID_OPACITY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reducedMotion && visible && pageVisible) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const renderIfActive = () => {
      if (!visible || !pageVisible) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        return;
      }
      if (!animationFrame) animationFrame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (touchDevice || reducedMotion) return;
      const rect = container.getBoundingClientRect();
      gl!.uniform2f(
        uniforms.uPointer,
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      );
      pointerTime = (performance.now() - startTime) / 1000;
      pointerActive = true;
    };

    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;
      renderIfActive();
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      renderIfActive();
    };

    const handlePointerChange = (event: MediaQueryListEvent) => {
      touchDevice = event.matches;
      resize();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      renderIfActive();
    });
    intersectionObserver.observe(container);

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerPreference = window.matchMedia('(pointer: coarse)');
    motionPreference.addEventListener('change', handleMotionChange);
    pointerPreference.addEventListener('change', handlePointerChange);

    resize();
    if (pageVisible && visible) {
      draw(performance.now());
    } else {
      renderIfActive();
    }

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionPreference.removeEventListener('change', handleMotionChange);
      pointerPreference.removeEventListener('change', handlePointerChange);
      if (gl) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="topography-background" aria-hidden="true">
      <canvas ref={canvasRef} className="topography-canvas" />
    </div>
  );
}
