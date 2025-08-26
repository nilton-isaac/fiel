import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;
  @Input() revealOnce = true;

  private observer?: IntersectionObserver;
  private hasRevealed = false;

  constructor(private el: ElementRef, private r: Renderer2) {}

  ngOnInit(): void {
    this.r.setStyle(this.el.nativeElement, 'opacity', '0');
    this.r.setStyle(this.el.nativeElement, 'transform', 'translateY(16px)');
    this.r.setStyle(this.el.nativeElement, 'transition', 'opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1)');

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && (!this.hasRevealed || !this.revealOnce)) {
          setTimeout(() => {
            this.r.setStyle(this.el.nativeElement, 'opacity', '1');
            this.r.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
            this.hasRevealed = true;
          }, this.revealDelay);
          if (this.revealOnce) {
            this.observer?.unobserve(this.el.nativeElement);
          }
        }
      });
    }, { threshold: 0.12 });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}


