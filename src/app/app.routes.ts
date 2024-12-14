import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { ErrorComponent } from './errors/error/error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events/:event_id', component: EventComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent, data: {error: {status: 404, statusText: "Not Found"}} }
];
