import { Component, Input } from '@angular/core';

export type IValidSizes = 'tiny' | 'small' | 'medium' | 'large' | 'x-large';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() label: string;
  @Input() value: any;
  @Input() type: string;
  @Input() labelFontSize: IValidSizes = 'small';
  @Input() valueFontSize: IValidSizes = 'medium';
  @Input() spacement: boolean;

  constructor() {}
}
