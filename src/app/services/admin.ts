import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://healthcare-backend-cs3j.onrender.com/api/admin';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors`);
  }

  addDoctor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-doctor`, data);
  }

  updateDoctor(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/doctor/${id}`, data);
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/doctor/${id}`);
  }

  getAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointments`);
  }

  getBills(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bills`);
  }

  getDailyReport(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/daily`, {
      params: { date }
    });
  }

  // Department management methods
  getDepartments(): Observable<any> {
    return this.http.get('https://healthcare-backend-cs3j.onrender.com/api/departments');
  }

  createDepartment(data: any): Observable<any> {
    return this.http.post('https://healthcare-backend-cs3j.onrender.com/api/departments/create-department', data);
  }

  updateDepartment(id: string, data: any): Observable<any> {
    return this.http.put(`https://healthcare-backend-cs3j.onrender.com/api/departments/update-department/${id}`, data);
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(`https://healthcare-backend-cs3j.onrender.com/api/departments/delete-department/${id}`);
  }
}