import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AttendFormComponent } from './attend-form/attend-form.component';
import { DatePipe, DOCUMENT } from '@angular/common';
import 'add-to-calendar-button';

@Component({
  selector: 'app-attend-dialog',
  imports: [AttendFormComponent, MatDialogModule, MatButton, DatePipe],
  templateUrl: './attend-dialog.component.html',
  styleUrl: './attend-dialog.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AttendDialogComponent {
  attendeeSubmitted = signal(false)
  attendee = signal<Object | null>(null)
  eventLocationString: string
  eventDescriptionString: string

  constructor(@Inject(MAT_DIALOG_DATA) public event: any, @Inject(DOCUMENT) private document: Document) {
    this.eventLocationString = event.venue ? 
      `${event.venue.name}, ${event.venue.address.localized_address_display}`
    : "Online"
    this.eventDescriptionString = `${event.summary}[br][br][url]${this.document.location.origin}/events/${event.id}|Event Details[/url]`
  }

  onAttendeeSubmitted(attendee: Object) {
    this.attendee.set(attendee)
    this.attendeeSubmitted.set(true)
  }
}
