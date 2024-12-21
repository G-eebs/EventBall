import { Component, signal, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatHint, MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field'; 
import { endAfterStartValidator } from '../../../shared/validators/end-after-start.directive';
import { futureStartValidator } from '../../../shared/validators/future-start.directive';
import { EventsService } from '../../../services/events/events.service';
import { Observable } from 'rxjs';
import iso3166_1 from "iso-3166-1"
import iso3166_2 from "iso-3166-2"
import { KeyValuePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-create-event-form',
  imports: [
    ReactiveFormsModule, 
    MatInputModule, 
    TextFieldModule, 
    MatSelectModule, 
    MatCheckboxModule, 
    MatButtonModule, 
    MatHint, 
    KeyValuePipe,
    MatProgressSpinner
  ],
  templateUrl: './create-event-form.component.html',
  styleUrl: './create-event-form.component.css'
})
export class CreateEventFormComponent {
  constructor(private eventsService: EventsService) {}
  timeZones = Intl.supportedValuesOf("timeZone");
  currencies = Intl.supportedValuesOf("currency");
  countries = iso3166_1.all()
  defaultTimeZone = "Europe/London"
  defaultCountryCode = "GB"
  defaultCurrencyCode = "GBP"
  venueCountry$!: Observable<any>
  regions = signal(iso3166_2.country(this.defaultCountryCode)?.sub)
  isEventSubmitted = signal(false);
  eventPublished = output<Object>();

  eventForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern(/^\S.*/)]),
      timeZone: new FormControl(this.defaultTimeZone, Validators.required),
      start: new FormControl("", Validators.required),
      end: new FormControl("", Validators.required),
      summary: new FormControl("", [Validators.required, Validators.pattern(/^\S.*/), Validators.maxLength(140)]),
      description: new FormControl(),
      currency: new FormControl(this.defaultCurrencyCode, Validators.required),
      online: new FormControl(true),
      venueName: new FormControl(),
      venueAddress1: new FormControl(),
      venueAddress2: new FormControl(),
      venueCity: new FormControl(),
      venueRegion: new FormControl(),
      venuePostCode: new FormControl(),
      venueCountry: new FormControl(this.defaultCountryCode),
      ticketName: new FormControl("", [Validators.required, Validators.pattern(/^\S.*/)]),
      ticketQuantity: new FormControl("", Validators.required),
      ticketFree: new FormControl(true),
      ticketCost: new FormControl()
    }, {validators: [futureStartValidator, endAfterStartValidator]}
  )

  ngOnInit() {
    this.venueCountry$ = this.eventForm.get("venueCountry")!.valueChanges
    this.venueCountry$.subscribe(country => {
      this.regions.set(iso3166_2.country(country)?.sub)
    })
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      this.isEventSubmitted.set(true);
      const eventBallOrganizationId = "2517053640201"
      const eventBallOrganizerId = "104041490841"
      const res = await this.eventsService.postEntireEvent(this.eventForm.value, eventBallOrganizationId, eventBallOrganizerId)
      this.eventPublished.emit(res)
    }
  }

}

