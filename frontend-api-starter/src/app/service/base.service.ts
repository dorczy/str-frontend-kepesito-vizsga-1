import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { id: number }> {

  url: string = "";

  constructor(
    public http: HttpClient,
    @Inject('apiUrl') apiUrl: string,
  ) {
    this.url = apiUrl;
  }

  get(item: T): Observable<T> {
    return this.http.get<T>(`${this.url}/${item.id}`);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  getPerPage(page: number, perPage: number): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}?page=${page}&per_page=${perPage}`);
  }

  getPerPageJSON(page: number, perPage: number): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}?_page=${page}&_limit=${perPage}`);
  }

  getRepos(name: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${name}/repos`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.url, item);
  }

  update(item: T): Observable<T> {
    return this.http.patch<T>(`${this.url}/${item.id}`, item);
  }

  delete(item: T): Observable<T> {
    return this.http.delete<T>(`${this.url}/${item.id}`);
  }

}
