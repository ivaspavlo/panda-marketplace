import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-nft-board',
  templateUrl: './nft-board.component.html',
  styleUrls: ['./nft-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NftBoardComponent {

  public selectedQty: number = 0;
  public currentPrice: number = 0

  private tokenPrice: number = 0.08;

  constructor() { }

  public onPlus(): void {
    if (this.selectedQty < 10) {
      this.selectedQty = this.selectedQty + 1;
      this.getCurrentPrice();
    }
  }

  public onMinus(): void {
    if (this.selectedQty > 0) {
      this.selectedQty = this.selectedQty - 1;
      this.getCurrentPrice();
    }
  }

  public selectMax(): void {
    this.selectedQty = 10;
    this.getCurrentPrice();
  }

  private getCurrentPrice(): void {
    this.currentPrice = this.tokenPrice * this.selectedQty;
  }

}
