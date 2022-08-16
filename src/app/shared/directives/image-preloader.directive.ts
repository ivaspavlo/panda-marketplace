import { ChangeDetectorRef, Directive, HostBinding, Input, OnInit } from '@angular/core';


@Directive({
  selector: '[appImgPreloader]'
})
export class ImagePreloaderDirective implements OnInit {

  @Input('appImgPreloader') targetSource: string;
  @Input() defaultImage = '/assets/img/placeholder.png';

  public downloadingImage: HTMLImageElement;

  @HostBinding('attr.src') finalImage: string;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.preloadImg();
  }

  private preloadImg(): void {
    this.finalImage = this.defaultImage;

    if (this.targetSource !== null) {
      this.downloadingImage = new Image();
      this.downloadingImage.onload = () => {
        this.finalImage = this.targetSource;
        this.cdr.detectChanges();
      }
      this.downloadingImage.src = this.targetSource;
    }
  }

}
