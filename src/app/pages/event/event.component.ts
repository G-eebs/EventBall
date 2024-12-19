import { Component, inject, signal, WritableSignal } from '@angular/core';
import { EventsService } from '../../services/events/events.service';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, DatePipe, NgStyle } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AttendDialogComponent } from '../../shared/attend-dialog/attend-dialog.component';
import { Auth, User, user } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import organizers from '../../../assets/event-brite-organizers.json';


@Component({
  selector: 'app-event',
  imports: [AsyncPipe, NgStyle, DatePipe, MatProgressSpinner, MatButtonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent {
  event$!: Observable<any>;
  event!: any
  bannerSrc: string =
  'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F906018593%2F2517053640201%2F1%2Foriginal.png?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C940%2C470&s=7e1d320a3e7c98edd292813a0b99bb34';
  eventDescription$!: Observable<any>;
  private auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  currentUser: WritableSignal<User | null> = signal(null)
  organizers = organizers
  isDeleteSubmitted = signal(false)

  constructor(
    private eventsService: EventsService, 
    private route: ActivatedRoute,
    private router: Router, 
    private attendDialog: MatDialog,
    private eventDeletedSnackbar: MatSnackBar) {
      this.userSubscription = this.user$.subscribe((user: User | null) => {
        this.currentUser.set(user)
      })
    }

  ngOnInit(){
    const routeParams = this.route.snapshot.params   
    const eventId = routeParams["event_id"]
    this.event$ = this.eventsService.getEventById(eventId)
    this.event$.subscribe(event => {
      this.event = event
      if (this.event.logo) this.bannerSrc = this.event.logo.original.url
    })
    this.eventDescription$ = this.eventsService.getEventDescriptionById(eventId)
  }

  openAttendDialog() {
    this.attendDialog.open(AttendDialogComponent, {
      data: this.event,
    })
  }

  async onDeleteEvent() {
    this.isDeleteSubmitted.set(true)
    if (this.currentUser()) {
      const res: any = await firstValueFrom(this.eventsService.deleteEvent(this.event.id))
      if(res.deleted){
        this.eventDeletedSnackbar.open("Event deleted", "OK", {
          duration: 5000,
        });
        this.router.navigate([""])
      } else {
        this.isDeleteSubmitted.set(false)
      }
    } else {
      console.error("User must be signed in to delete events")
      this.isDeleteSubmitted.set(false)
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}