import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiteBlock } from '../models/site-block.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getPublicSite(): Observable<SiteBlock[]> {
    return this.http.get<SiteBlock[]>(`${this.api}/public/site`);
  }

  sendContact(payload: { name: string; email: string; subject: string; message: string }): Observable<any> {
    return this.http.post(`${this.api}/public/contact`, payload);
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.api}/auth/login`, { username, password });
  }

  private authHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  getAdminSite(): Observable<SiteBlock[]> {
    return this.http.get<SiteBlock[]>(`${this.api}/admin/site`, { headers: this.authHeaders() });
  }

  createBlock(block: SiteBlock): Observable<SiteBlock> {
    return this.http.post<SiteBlock>(`${this.api}/admin/site`, block, { headers: this.authHeaders() });
  }

  updateBlock(id: number, block: SiteBlock): Observable<SiteBlock> {
    return this.http.put<SiteBlock>(`${this.api}/admin/site/${id}`, block, { headers: this.authHeaders() });
  }

  deleteBlock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/admin/site/${id}`, { headers: this.authHeaders() });
  }

  uploadImage(file: File): Observable<string> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<string>(`${this.api}/admin/upload`, fd, { headers: this.authHeaders() });
  }
}
