import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EventsService {
  constructor(private http: HttpClient) {}

  defaultGetParams = {
    status: "live",
    order_by: "start_asc",
    expand: "venue,organizer,ticket_classes",
  }

  getEventsByOrganizer(id: string, params: any = this.defaultGetParams): Observable<any> {
    return this.http.get(`/eb-get-events-by-organizer/${id}`, {
      params
    })
  }

  async getEventsByOrganizerList(ids: Array<string>, params: any = this.defaultGetParams) {
    const allEvents = []
    try {
      for (let id of ids) {
        const res = await firstValueFrom(this.getEventsByOrganizer(id, params))
        allEvents.push(...res.events)
      }
      allEvents.sort((a, b) => a.start.utc - b.start.utc)
      return allEvents;
    } catch (err: any) {
      console.error(err)
      return new Response(JSON.stringify({error: err.message}), {status: err.statusCode || 500})
    }
  }
}
