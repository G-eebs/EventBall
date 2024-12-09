import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './create-event/create-event.component';

export const routes: Routes = [
  { path: 'events/:event_id', component: EventComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: '', component: HomeComponent },
];
