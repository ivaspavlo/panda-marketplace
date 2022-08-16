import { DOCUMENT } from '@angular/common';
import { Directive, Input, ElementRef, Inject, AfterViewInit, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';


@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective implements AfterViewInit {

  @Input('ratio') parallaxRatio: number = 1;
  private observer: IntersectionObserver | undefined;
  private initialPos: number = 0;

  private threshold = 0.001;
  private visible = false;
  private scrollContainer: HTMLElement;

  constructor(
    private eleRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngAfterViewInit(): void {
    this.getScrollContainer();
    this.getInitialPos();
    this.createObserver();
    this.startObservingElements();
    this.addInitialStyles();
    this.startListenScroll();
  }

  private onWindowScroll(event: any) {
    this.renderer.setStyle(this.eleRef.nativeElement, 'transform', `translateY(${(event.target.scrollTop - this.initialPos) * this.parallaxRatio}px)`);
  }

  private createObserver(): void {
    const options = { rootMargin: '0px', threshold: this.threshold };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.visible = entry.isIntersecting;
      });
    }, options);
  }

  private startObservingElements(): void {
    if (!this.observer) {
      return;
    }
    this.observer.observe(this.eleRef.nativeElement);
  }

  private addInitialStyles(): void {
    this.renderer.setStyle(this.eleRef.nativeElement, 'willChange', 'transform');
    this.renderer.setStyle(this.eleRef.nativeElement, 'transition', '.1s');
  }

  private startListenScroll(): void {
    fromEvent(this.scrollContainer, 'scroll').pipe(
      filter(() => this.visible)
    ).subscribe((event: Event) => this.onWindowScroll(event));
  }

  private getInitialPos(): void {
    this.initialPos = this.eleRef.nativeElement.getBoundingClientRect().top;
  }

  private getScrollContainer(): void {
    this.scrollContainer = this.document.getElementById('app-scroll-container') as HTMLElement;
  }

}

