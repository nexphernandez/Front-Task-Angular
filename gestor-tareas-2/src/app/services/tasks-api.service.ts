import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewTask, Task } from '../models/task.model';

// Interfaz para lo que el backend espera/devuelve (en inglés)
interface TaskBackend {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface NewTaskBackend {
  title: string;
  description?: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TasksApiService {
    private baseUrl = 'http://localhost:8080/api/v1/tasks';

    constructor(private http: HttpClient) { }

    // Transforma de backend (inglés) a frontend (español)
    private fromBackend(backendTask: TaskBackend): Task {
      return {
        id: backendTask.id,
        titulo: backendTask.title,
        descripcion: backendTask.description,
        completada: backendTask.completed
      };
    }

    // Transforma de frontend (español) a backend (inglés)
    private toBackend(task: Task | NewTask): NewTaskBackend | TaskBackend {
      const base = {
        title: task.titulo,
        description: task.descripcion,
        completed: task.completada
      };
      
      if ('id' in task) {
        return { ...base, id: task.id } as TaskBackend;
      }
      return base;
    }

    list(): Observable<Task[]> {
        return this.http.get<TaskBackend[]>(this.baseUrl).pipe(
          map(tasks => tasks.map(t => this.fromBackend(t)))
        );
    }

    get(id: number): Observable<Task> {
        return this.http.get<TaskBackend>(`${this.baseUrl}/${id}`).pipe(
          map(t => this.fromBackend(t))
        );
    }

    create(data: NewTask): Observable<Task> {
        const backendData = this.toBackend(data);
        return this.http.post<TaskBackend>(this.baseUrl, backendData).pipe(
          map(t => this.fromBackend(t))
        );
    }

    remove(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    update(task: Task): Observable<Task> {
        const backendData = this.toBackend(task);
        return this.http.put<TaskBackend>(`${this.baseUrl}/${task.id}`, backendData).pipe(
          map(t => this.fromBackend(t))
        );
    }
}