import { Component } from '@angular/core';
import { EventCardComponent } from '../_shared/event-card/event-card.component';
import { EventsService } from '../services/events/events.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import organizers from '../../assets/event-brite-organizers.json';

@Component({
  selector: 'app-home',
  imports: [EventCardComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private eventsService: EventsService) {}
  events$!: Observable<any> | Promise<any>;

  ngOnInit(): void {
    this.events$ = this.eventsService.getEventsByOrganizerList(
      Object.values(organizers),
      {
        status: 'live',
        order_by: 'start_asc',
        expand: 'venue,organizer',
      }
    );
  }
}
