import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { ErrorComponent } from './errors/error/error.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['']);

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'events/:event_id', component: EventComponent, title: "Event" },
  { path: 'create-event', component: CreateEventComponent, title: "Create Event", canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: 'error', component: ErrorComponent, title: "Error" },
  { path: '**', component: ErrorComponent, title: "Not Found", data: {error: {status: 404, statusText: "Not Found"}} }
];