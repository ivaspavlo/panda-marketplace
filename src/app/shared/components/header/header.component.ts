import { DOCUMENT } from '@angular/common';
import { EventEmitter, Component, Inject, Input, Output, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input() set current(value: any) { this._current = value === null ? 0 : value; };
  @Input() account: null | string = null;
  @Output() connect = <EventEmitter<void>> new EventEmitter();

  get current() { return this._current; }
  private _current: number = 0;

  public menuItems = [
    { uiName: 'core.buy', link: '/' },
    { uiName: 'core.collection', link: '/' },
    { uiName: 'core.faq', link: '/' }
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  public onMenuItemClick(index: number): void {
    const scrollContainer = this.document.getElementById('app-scroll-container') as HTMLElement;
    scrollContainer.scrollTop = index * document.documentElement.clientHeight;
  }

  public onConnect(): void {
    this.connect.emit();
  }

}
