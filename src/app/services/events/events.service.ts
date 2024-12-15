import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, firstValueFrom, map, combineLatest} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsService {
  constructor(private http: HttpClient) {}

  defaultGetOrganizerEventsParams = {
    status: 'live',
    order_by: 'start_asc',
    expand: 'venue,organizer',
  };

  getEventsByOrganizer(
    id: string,
    params: any = this.defaultGetOrganizerEventsParams
  ): Observable<[]> {
    return this.http.get<any>(`/eb-get-events-by-organizer/${id}`, {
      params,
    }).pipe(map(res => res["events"]));
  }

  getEventsByOrganizerList(
    ids: Array<string>,
    params: any = this.defaultGetOrganizerEventsParams
  ): Observable<any[]> {
    const allEvents: Observable<[]>[] = [];
    for (let id of ids) {
      allEvents.push(this.getEventsByOrganizer(id, params))
    }
    return combineLatest(allEvents).pipe(map(events => events.flat()))
  }

  defaultGetEventParams = {
    expand: 'venue,organizer,ticket_classes',
  };

  getEventById(
    id: string,
    params: any = this.defaultGetEventParams
  ) {
    return this.http.get(`/eb-get-event-by-id/${id}`, {
      params,
    });
  }

  getEventDescriptionById(id: string) {
    return this.http.get(`/eb-get-event-description-by-id/${id}`);
  }


  postVenueToOrganization(organizationId: string, venue: any) {
    return this.http.post(`/eb-post-venue-to-organization/${organizationId}`, {venue: venue})
  }

  postEventToOrganization(organizationId: string, event: any) {
    return this.http.post(`/eb-post-event-to-organization/${organizationId}`, {event: event})
  }

  postTicketClassToEvent(eventId: string, ticketClass: any) {
    return this.http.post(`/eb-post-ticket-class-to-event/${eventId}`, {ticket_class: ticketClass})
  }

  postContentToEvent(eventId: string, content: any, version: string = "1") {
    return this.http.post(`/eb-post-content-to-event/${eventId}/${version}`, content)
  }

  postPublishEvent(eventId: string) {
    return this.http.post(`/eb-post-publish-event/${eventId}`, null)
  }

  async postEntireEvent(eventData: any, organizationId: string, organizerId: string) {
    let isEventOnline = eventData.online || !eventData.venueName
    let venueId: string | null = null;
    let isEventFree = eventData.ticketFree || !eventData.ticketCost

    if (!isEventOnline) {
      const venue = {
        name: eventData.venueName,
        address: {
          address_1: eventData.venueAddress1,
          address_2: eventData.venueAddress2,
          city: eventData.venueCity,
          // region: eventData.venueRegion, //--DISABLED due to EventBrite API rejecting valid ISO 3166-2 region codes with or without country code prepended
          postal_code: eventData.venuePostCode,
          country: eventData.venueCountry,
        }
      }
      const venueResponse: any = await firstValueFrom(this.postVenueToOrganization(organizationId, venue))
      venueId = venueResponse.id
    }

    const startUTC = DateTime.fromISO(eventData.start, { zone: eventData.timeZone }).toUTC().startOf("second").toISO({ suppressMilliseconds: true })
    const endUTC = DateTime.fromISO(eventData.end, { zone: eventData.timeZone }).toUTC().startOf("second").toISO({ suppressMilliseconds: true })
    
    const event = {
      name: {html: eventData.name},
      summary: eventData.summary,
      start: {
        timezone: eventData.timeZone,
        utc: startUTC,
      },
      end: {
        timezone: eventData.timeZone,
        utc: endUTC,
      },
      currency: eventData.currency,
      online_event: isEventOnline,
      organizer_id: organizerId,
      venue_id: venueId,
    }

    const eventResponse: any = await firstValueFrom(this.postEventToOrganization(organizationId, event))
    const eventId = eventResponse.id
    
    const ticketClass = {
      name: eventData.ticketName,
      capacity: eventData.ticketQuantity,
      free: isEventFree,
      cost: isEventFree ? null : `${eventData.currency},${(eventData.ticketCost * 100)}`,
      hide_description: true,
    }
    await firstValueFrom(this.postTicketClassToEvent(eventId, ticketClass))

    if (eventData.description) {
      const description = {
        data: {
          body: {
            alignment: "left",
            text: eventData.description,
          }
        },
        type: "text"
      }
      const structuredContent = {
        access_type: "public",
        modules: [description],
        publish: true
      }
  
      await firstValueFrom(this.postContentToEvent(eventId, structuredContent))
    }


    const publishEventResponse: any = await firstValueFrom(this.postPublishEvent(eventId))

    const response = {
      ...publishEventResponse,
      eventId: eventId
    }

    return response;
  }
}
