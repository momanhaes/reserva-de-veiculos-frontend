import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const SLIDE = trigger('slide', [
  state(
    'ready',
    style({
      opacity: 1,
    })
  ),
  transition('void => ready', [
    style({ opacity: 0, transform: 'translateY(-20px)' }),
    animate('300ms 0s ease-in'),
  ]),
]);
