import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';

export type AnimationType =
  | 'fade-in'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale-up'
  | 'zoom-in'
  | 'rotate-in';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private observer: IntersectionObserver | null = null;

  @Input() animationType: AnimationType = 'fade-in';
  @Input() animationDelay: number = 0;
  @Input() animationDuration: number = 800;
  @Input() animationThreshold: number = 0.2;
  @Input() animationOnce: boolean = true;

  ngOnInit() {
    // Set initial state
    this.setInitialState();

    // Create Intersection Observer
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animateIn();
              if (this.animationOnce && this.observer) {
                this.observer.unobserve(this.el.nativeElement);
              }
            } else if (!this.animationOnce) {
              this.setInitialState();
            }
          });
        },
        {
          threshold: this.animationThreshold,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setInitialState() {
    const element = this.el.nativeElement;

    // Set animation duration
    this.renderer.setStyle(
      element,
      'transition',
      `all ${this.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    );

    // Set delay
    if (this.animationDelay > 0) {
      this.renderer.setStyle(element, 'transition-delay', `${this.animationDelay}ms`);
    }

    // Set initial transform based on animation type
    switch (this.animationType) {
      case 'fade-in':
        this.renderer.setStyle(element, 'opacity', '0');
        break;

      case 'slide-up':
        this.renderer.setStyle(element, 'opacity', '0');
        this.renderer.setStyle(element, 'transform', 'translateY(60px)');
        break;

      case 'slide-down':
        this.renderer.setStyle(element, 'opacity', '0');
        this.renderer.setStyle(element, 'transform', 'translateY(-60px)');
        break;

      case 'slide-left':
        this.renderer.setStyle(element, 'opacity', '0');
        this.renderer.setStyle(element, 'transform', 'translateX(60px)');
        break;

      case 'slide-right':
        this.renderer.setStyle(element, 'opacity', '0');
        this.renderer.setStyle(element, 'transform', 'translateX(-60px)');
        break;

      case 'scale-up':
        this.renderer.setStyle(element, 'opacity', '0');
        this.renderer.setStyle(element, 'transform', 'scale(0.8)');
        break;

      case 'zoom-in':
        this.renderer.setStyle(element, 'opacity', '0');
        this.renderer.setStyle(element, 'transform', 'scale(0.5)');
        break;

      case 'rotate-in':
        this.renderer.setStyle(element, 'opacity', '0');
        this.renderer.setStyle(element, 'transform', 'rotate(-10deg) scale(0.9)');
        break;
    }
  }

  private animateIn() {
    const element = this.el.nativeElement;

    // Animate to final state
    this.renderer.setStyle(element, 'opacity', '1');
    this.renderer.setStyle(element, 'transform', 'translate(0, 0) scale(1) rotate(0)');
  }
}
