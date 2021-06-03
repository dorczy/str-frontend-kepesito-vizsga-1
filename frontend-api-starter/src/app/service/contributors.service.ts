import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contributor } from '../model/contributor';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ContributorsService extends BaseService<Contributor> {

  constructor(
    public http: HttpClient,
  ) {
    super(http, "https://api.github.com/repos/angular/angular/contributors");
    // super(http, "http://localhost:3000/users");
  }
}
