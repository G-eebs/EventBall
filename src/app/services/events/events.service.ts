import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EventsService {
  constructor(private http: HttpClient) {}

  getEventsByOrganizer(id: string, params: HttpParams): Observable<any> {
    return this.http.get(`/eb-get-events-by-organizer/${id}`, {
      params
    })
  }
}
