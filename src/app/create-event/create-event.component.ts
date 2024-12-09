import { Component } from '@angular/core';
import { CreateEventFormComponent } from './create-event-form/create-event-form.component';

@Component({
  selector: 'app-create-event',
  imports: [CreateEventFormComponent],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

}
