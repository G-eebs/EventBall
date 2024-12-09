import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-event-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-event-form.component.html',
  styleUrl: './create-event-form.component.css'
})
export class CreateEventFormComponent {
  eventForm = new FormGroup({
    name: new FormControl(""),
    timezone: new FormControl(""),
    startDate: new FormControl(""),
    startTime: new FormControl(""),
    endDate: new FormControl(""),
    endTime: new FormControl(""),
    currency: new FormControl("")
  })
}