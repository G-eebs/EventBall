import { Component, inject } from '@angular/core';
import { EventCardComponent } from '../_shared/event-card/event-card.component';
import { EventsService } from '../services/events/events.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [EventCardComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private eventsService: EventsService) {}
  events$!: Observable<any>;

  ngOnInit(): void {
    this.events$ = this.eventsService.getEventsByOrganizer(
      "1077883737", 
      new HttpParams().set('status', 'live').set('order_by', 'start_asc'))
  }
}