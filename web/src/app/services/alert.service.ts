import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    protected alerts: ToastrService,
  ) { }

  show(message, title = '', position = 'toast-top-right', override = {}) {
    this.alerts.show(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${message}`, title, {
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
      positionClass: position,
      ...override,
    });
  }

  info(message, title = '', position = 'toast-top-right', override = {}) {
    this.alerts.info(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${message}`, title, {
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-info alert-with-icon',
      positionClass: position,
      ...override,
    });
  }

  success(message, title = '', position = 'toast-top-right', override = {}) {
    this.alerts.success(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${message}`, title, {
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-success alert-with-icon',
      positionClass: position,
      ...override,
    });
  }

  warning(message, title = '', position = 'toast-top-right', override = {}) {
    this.alerts.warning(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${message}`, title, {
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-warning alert-with-icon',
      positionClass: position,
      ...override,
    });
  }

  error(message, title = '', position = 'toast-top-right', override = {}) {
    this.alerts.error(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${message}`, title, {
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-danger alert-with-icon',
      positionClass: position,
      ...override,
    });
  }
}
