import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { AttendDialogComponent } from '../attend-dialog/attend-dialog.component';

@Component({
  selector: 'app-event-card',
  imports: [MatButton, MatAnchor, DatePipe, RouterLink],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
})
export class EventCardComponent {
  event: any = input.required();
  bannerSrc: string = 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F906018593%2F2517053640201%2F1%2Foriginal.png?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C940%2C470&s=7e1d320a3e7c98edd292813a0b99bb34';

  constructor(private attendDialog: MatDialog) {}
  
  openLoginDialog() {
    this.attendDialog.open(AttendDialogComponent, {
      data: this.event(),
    })
  }

  ngOnInit() {
    if (this.event().logo) this.bannerSrc = this.event().logo.original.url;
  }
}
