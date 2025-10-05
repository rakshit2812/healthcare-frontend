import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'https://healthcare-backend-cs3j.onrender.com/api/patients';

  constructor(private http: HttpClient) {}

  searchDoctors(specialization: string, hospital: string, date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search-doctors`, {
      params: { specialization, hospital, date }
    });
  }

  bookAppointment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, data);
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancel/${id}`, {});
  }

  getHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);
  }

  getDepartments(): Observable<any> {
    return this.http.get('https://healthcare-backend-cs3j.onrender.com/api/departments');
  }
}