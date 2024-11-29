import { Component } from '@angular/core';
import { EventCardComponent } from '../_shared/event-card/event-card.component';

@Component({
  selector: 'app-home',
  imports: [EventCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
