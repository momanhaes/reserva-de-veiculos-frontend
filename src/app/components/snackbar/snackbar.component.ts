import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { SNACKBAR } from 'src/animations/snackbar.animation';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [SNACKBAR],
})
export class SnackbarComponent implements OnInit {
  @Input() message: string;
  public snackVisibility = 'hidden';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifier
      .pipe(
        tap((message) => {
          this.message = message;
          this.snackVisibility = 'visible';
        }),
        switchMap((message) => timer(1500))
      )
      .subscribe((timer) => (this.snackVisibility = 'hidden'));
  }
}
