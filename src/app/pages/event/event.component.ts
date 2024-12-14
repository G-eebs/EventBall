import { Component } from '@angular/core';
import { EventsService } from '../../services/events/events.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-event',
  imports: [AsyncPipe, NgStyle, DatePipe],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent {
  constructor(private eventsService: EventsService, private route: ActivatedRoute) {}
  event$!: Observable<any> | Promise<any>;
  event!: any
  bannerSrc: string =
  'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F906018593%2F2517053640201%2F1%2Foriginal.png?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C940%2C470&s=7e1d320a3e7c98edd292813a0b99bb34';
  eventDescription$!: Observable<any> | Promise<any>;

  async ngOnInit(): Promise<void> {
    const routeParams = await firstValueFrom(this.route.params);
    const eventId = routeParams["event_id"]
    this.event$ = this.eventsService.getEventById(eventId)
    this.event$.subscribe(res => {
      this.event = res
      if (this.event.logo) this.bannerSrc = res.logo.original.url
    })
    this.eventDescription$ = this.eventsService.getEventDescriptionById(eventId)
  }
}