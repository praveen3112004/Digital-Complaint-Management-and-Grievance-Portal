import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = 'http://localhost:3000/api/complaints';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    // Manually setting headers as per our "Simple" backend auth
    return new HttpHeaders({
      'x-user-id': localStorage.getItem('x-user-id') || '',
      'x-user-role': localStorage.getItem('x-user-role') || ''
    });
  }

  getComplaints(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createComplaint(complaint: any): Observable<any> {
    return this.http.post(this.apiUrl, complaint, { headers: this.getHeaders() });
  }

  updateStatus(id: number, status: string, notes: string = ''): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status, resolution_notes: notes }, { headers: this.getHeaders() });
  }

  assignComplaint(id: number, staffId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/assign`, { staff_id: staffId }, { headers: this.getHeaders() });
  }
}
