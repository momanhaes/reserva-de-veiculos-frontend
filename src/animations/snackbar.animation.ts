import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const SNACKBAR = trigger('snack-visibility', [
  state(
    'hidden',
    style({
      opacity: 0,
      bottom: '0px',
    })
  ),
  state(
    'visible',
    style({
      opacity: 1,
      bottom: '120px',
    })
  ),
  transition('hidden => visible', animate('300ms 0s ease-in')),
  transition('visible => hidden', animate('300ms 0s ease-out')),
]);
