import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoriesService } from 'src/app/service/repositories.service';
import { switchMap } from 'rxjs/operators'
import { Repository } from 'src/app/model/repository';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-repositories-list',
  templateUrl: './repositories-list.component.html',
  styleUrls: ['./repositories-list.component.scss']
})
export class RepositoriesListComponent implements OnInit {

  list$: Observable<Repository[]> = this.activatedRoute.params.pipe(
    switchMap( data => this.repositoriesService.getRepos(data.name) )
  );

  sortedList: Repository[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private repositoriesService: RepositoriesService,
    private toastr: ToastrService,
  ) {
    this.list$.subscribe(
      data => {
        this.sortedList = data
          .sort( (a, b) => b['updated_at'].localeCompare(a['updated_at']) );
      },
      error => this.showError(error)
    );
   }

  ngOnInit(): void {
  }

  showError(message: string) {
    this.toastr.error(message);
  }

}
