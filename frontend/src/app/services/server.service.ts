import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private server: HttpClient) {}
  api_url = isDevMode() ? 'http://localhost:8000/api/' : '/api/';
  get_random_questions = () =>
    this.server.get(`${this.api_url}get-random-questions/`);
}
