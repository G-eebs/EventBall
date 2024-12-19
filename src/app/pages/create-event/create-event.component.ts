import { Component, signal } from '@angular/core';
import { CreateEventFormComponent } from './create-event-form/create-event-form.component';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-event',
  imports: [CreateEventFormComponent, RouterLink, MatAnchor],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  eventPublishSuccessful = signal(false)
  publishedEventId = signal<String | null>(null)

  eventPublished(publishResponse: any) {
    this.eventPublishSuccessful.set(publishResponse.published)
    this.publishedEventId.set(publishResponse.eventId)
  }
}
