import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';

export const routes: Routes = [
  { path: 'events/:event_id', component: EventComponent },
  { path: '', component: HomeComponent },
];
