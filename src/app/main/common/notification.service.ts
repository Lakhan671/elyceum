import { Injectable } from '@angular/core';
import { NotifierService } from "angular-notifier";
@Injectable({
  providedIn: 'root'
})
export class ElyNotificationService {
  constructor(private notifierService: NotifierService) {  
}
/**
	 * Show a notification
	 *
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 */
	public showNotification(notification): void {
		this.notifierService.notify(notification.type,notification.message);
	}

}
