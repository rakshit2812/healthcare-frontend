import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'https://healthcare-backend-cs3j.onrender.com/api/doctors';

  constructor(private http: HttpClient) {}

  getTodayAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/today`);
  }

  prescribe(appointmentId: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prescribe/${appointmentId}`, data);
  }

  markAvailability(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/availability`, data);
  }
}