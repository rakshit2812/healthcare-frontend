import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = 'https://healthcare-backend-cs3j.onrender.com/api/billing';

  constructor(private http: HttpClient) {}

  generateBill(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate`, data);
  }

  payBill(billId: string, provider: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay/${billId}`, { provider });
  }

  getBillStatus(billId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${billId}/status`);
  }
}