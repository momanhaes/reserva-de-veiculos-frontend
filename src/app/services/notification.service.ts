import { EventEmitter } from '@angular/core';

export class NotificationService {
  notifier = new EventEmitter<any>();

  public notify(message: string): void {
    this.notifier.emit(message);
  }
}
