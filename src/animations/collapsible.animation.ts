import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const COLLAPSIBLE = trigger('toggleSearch', [
  state(
    'hidden',
    style({
      opacity: 0,
      'max-height': '0px',
    })
  ),
  state(
    'visible',
    style({
      opacity: 1,
      'max-height': '70px',
      'margin-top': '20px',
    })
  ),
  transition('* => *', animate('250ms 0s ease-in-out')),
]);
