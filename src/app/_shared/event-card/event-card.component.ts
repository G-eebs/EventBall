import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-card',
  imports: [MatButton, DatePipe, RouterLink],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
})
export class EventCardComponent {
  event: any = input.required();
  bannerSrc: string =
    'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F906018593%2F2517053640201%2F1%2Foriginal.png?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C940%2C470&s=7e1d320a3e7c98edd292813a0b99bb34';

  ngOnInit(): void {
    if (this.event().logo) this.bannerSrc = this.event().logo.original.url;
  }
}
