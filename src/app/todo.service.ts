import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from './todo.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly baseUrl = `${environment.apiUrl}/todos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  create(req: CreateTodoRequest): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, req);
  }

  update(id: number, req: UpdateTodoRequest): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/${id}`, req);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
