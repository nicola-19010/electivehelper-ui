import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Elective } from '../domain/elective';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectiveService {
  private HttpClient: HttpClient;

  private electiveUrl = 'http://localhost:8080/api/elective/';

  constructor(httpClient: HttpClient) {
    this.HttpClient = httpClient;
  }

  getAllElectives(): Observable<Elective[]> {
    return this.HttpClient.get<Elective[]>(this.electiveUrl);
  }
}
