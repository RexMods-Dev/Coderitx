import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  // If instance already exists, return it
  if (lenisInstance) {
    return lenisInstance;
  }

  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
    autoRaf: false
  });

  lenisInstance = lenis;

  // Sync Lenis scroll events with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Hook into GSAP's high-precision RAF ticker
  const tickerCallback = (time) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // Store cleanup references
  lenis._cleanup = () => {
    gsap.ticker.remove(tickerCallback);
    lenis.destroy();
    lenisInstance = null;
  };

  return lenis;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToTarget(target, offset = -76) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.2 });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
