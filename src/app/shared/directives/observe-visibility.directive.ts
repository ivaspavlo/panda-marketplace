import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';


@Directive({
  selector: '[observeVisibility]',
})
export class ObserveVisibilityDirective implements OnDestroy, OnInit, AfterViewInit {
  
  @Input() debounceTime = 0;
  @Input() threshold = 0.01;

  @Output() visible = new EventEmitter<boolean>();

  private observer: IntersectionObserver | undefined;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.createObserver();
  }

  ngAfterViewInit() {
    this.startObservingElements();
  }

  private createObserver(): void {
    const options = { rootMargin: '0px', threshold: this.threshold };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.visible.emit(entry.isIntersecting);
      });
    }, options);
  }

  private startObservingElements(): void {
    if (!this.observer) {
      return;
    }
    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
  }
}
