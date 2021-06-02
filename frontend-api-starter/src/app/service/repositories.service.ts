import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from '../model/repository';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService extends BaseService<Repository> {

  constructor(
    public http: HttpClient,
  ) {
    super(http, "https://api.github.com/users");
  }
}
