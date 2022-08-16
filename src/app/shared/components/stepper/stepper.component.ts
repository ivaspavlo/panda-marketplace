import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {

  @Input() qty: number = 4;
  @Input() current: number | null = 0;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public onStepClick(step: number): void {
    const scrollContainer = this.document.getElementById('app-scroll-container') as HTMLElement;
    scrollContainer.scrollTop = step * document.documentElement.clientHeight;
  }

}
