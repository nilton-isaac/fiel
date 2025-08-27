import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;
  @Input() revealOnce = true;
  @Input() revealDistance = 50;
  @Input() revealDuration = 800;

  private observer?: IntersectionObserver;
  private hasRevealed = false;

  constructor(private el: ElementRef, private r: Renderer2) {}

  ngOnInit(): void {
    // Set initial state
    this.r.setStyle(this.el.nativeElement, 'opacity', '0');
    this.r.setStyle(this.el.nativeElement, 'transform', `translateY(${this.revealDistance}px)`);
    this.r.setStyle(this.el.nativeElement, 'transition', `opacity ${this.revealDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${this.revealDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`);

    // Create intersection observer with better threshold
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && (!this.hasRevealed || !this.revealOnce)) {
          // Add delay for staggered animations
          setTimeout(() => {
            this.r.setStyle(this.el.nativeElement, 'opacity', '1');
            this.r.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
            this.hasRevealed = true;
          }, this.revealDelay);

          // Unobserve if it should only reveal once
          if (this.revealOnce) {
            this.observer?.unobserve(this.el.nativeElement);
          }
        } else if (!this.revealOnce && !entry.isIntersecting) {
          // Reset for re-animation if not revealOnce
          this.r.setStyle(this.el.nativeElement, 'opacity', '0');
          this.r.setStyle(this.el.nativeElement, 'transform', `translateY(${this.revealDistance}px)`);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}


