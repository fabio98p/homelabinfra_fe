import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, CreateTodoRequest } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  draft: CreateTodoRequest = { title: '', description: '' };
  loading = true;
  error = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.todoService.getAll().subscribe({
      next: (data) => { this.todos = data ?? []; this.loading = false; },
      error: () => { this.error = 'Failed to load todos'; this.loading = false; }
    });
  }

  add(): void {
    if (!this.draft.title.trim()) return;
    this.todoService.create(this.draft).subscribe({
      next: (todo) => { this.todos.unshift(todo); this.draft = { title: '', description: '' }; },
      error: () => { this.error = 'Failed to create todo'; }
    });
  }

  toggle(todo: Todo): void {
    this.todoService.update(todo.id, {
      title: todo.title,
      description: todo.description,
      completed: !todo.completed
    }).subscribe({
      next: (updated) => {
        const i = this.todos.findIndex(t => t.id === todo.id);
        if (i !== -1) this.todos[i] = updated;
      },
      error: () => { this.error = 'Failed to update todo'; }
    });
  }

  delete(id: number): void {
    this.todoService.remove(id).subscribe({
      next: () => { this.todos = this.todos.filter(t => t.id !== id); },
      error: () => { this.error = 'Failed to delete todo'; }
    });
  }
}
